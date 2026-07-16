import db, { table, trxTable } from '../db.js';
import { config, PAYMENT_CURRENCY } from '../config.js';
import { createRazorpayOrder, verifyPaymentSignature } from './razorpay.js';
import { sendPaymentEmails, sendZoomRegistrationFailureAlert } from '../mail.js';
import { addMeetingRegistrant, isZoomAuthConfigured, splitFullName } from './zoom.js';
import {
  decrementWebinarSeat,
  clearWebinarLiveCache,
  getActiveWebinarEvent,
  resolveActiveZoomMeetingId,
} from './webinarEvents.js';

const IDEMPOTENCY_TTL_HOURS = 24;
const WEBINAR_PLAN_SLUG = 'webinar-live';

function isWebinarOrder(plan, order) {
  return plan?.slug === WEBINAR_PLAN_SLUG || order?.metadata?.plan_slug === WEBINAR_PLAN_SLUG;
}

function getZoomMeta(order) {
  return order?.metadata?.zoom || null;
}

/**
 * Register paid webinar buyers on Zoom once. Idempotent via order.metadata.zoom.
 * Payment is never rolled back if Zoom fails.
 */
export async function ensureZoomRegistration(result) {
  const { order, plan, customer } = result || {};
  if (!order || !isWebinarOrder(plan, order)) {
    return result;
  }

  const existing = getZoomMeta(order);
  if (existing?.registrant_id && existing?.join_url) {
    return result;
  }

  if (!isZoomAuthConfigured()) {
    console.warn(
      'Zoom OAuth not configured — skipping registrant for order',
      order.id,
      '(set ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET)'
    );
    return result;
  }

  const meetingId = await resolveActiveZoomMeetingId();
  if (!meetingId) {
    console.warn(
      'No Zoom meeting ID on active webinar — create one from /sp-webinar-ops admin dashboard'
    );
    return result;
  }

  const { firstName, lastName } = splitFullName(customer?.name);

  try {
    const zoomResult = await addMeetingRegistrant({
      email: customer?.email,
      firstName,
      lastName,
      meetingId,
    });

    const zoomMeta = {
      registrant_id: zoomResult.registrantId,
      join_url: zoomResult.joinUrl,
      meeting_id: String(zoomResult.meetingId || meetingId),
      topic: zoomResult.topic || null,
      start_time: zoomResult.startTime || null,
      registered_at: new Date().toISOString(),
    };

    const nextMetadata = {
      ...(order.metadata || {}),
      zoom: zoomMeta,
    };

    await table('orders').where({ id: order.id }).update({
      metadata: nextMetadata,
      updated_at: db.fn.now(),
    });

    clearWebinarLiveCache();
    return getOrderById(order.id);
  } catch (err) {
    console.error('Zoom registration failed for order', order.id, err?.message || err);

    const failureMeta = {
      ...(order.metadata || {}),
      zoom: {
        ...(existing || {}),
        error: String(err?.message || err),
        failed_at: new Date().toISOString(),
      },
    };

    try {
      await table('orders').where({ id: order.id }).update({
        metadata: failureMeta,
        updated_at: db.fn.now(),
      });
    } catch (metaError) {
      console.error('Failed to store Zoom error on order:', metaError.message);
    }

    try {
      await sendZoomRegistrationFailureAlert({
        order,
        plan,
        customer,
        errorMessage: String(err?.message || err),
      });
    } catch (alertError) {
      console.error('Zoom failure alert email failed:', alertError.message);
    }

    return getOrderById(order.id);
  }
}

async function finalizePaidOrder(orderId) {
  let result = await getOrderById(orderId);
  result = await ensureZoomRegistration(result);

  if (isWebinarOrder(result.plan, result.order) && !result.order?.metadata?.seat_decremented) {
    try {
      const active = await getActiveWebinarEvent();
      await decrementWebinarSeat(active?.id);
      await table('orders')
        .where({ id: orderId })
        .update({
          metadata: {
            ...(result.order.metadata || {}),
            seat_decremented: true,
            webinar_event_id: active?.id || null,
          },
          updated_at: db.fn.now(),
        });
      result = await getOrderById(orderId);
    } catch (seatError) {
      console.error('Seat decrement failed:', seatError.message);
    }
  }

  try {
    await sendPaymentEmails(result);
  } catch (mailError) {
    console.error('Payment email failed:', mailError.message);
  }

  return result;
}

export async function getIdempotentResponse(key, route) {
  if (!key) return null;
  const row = await table('idempotency_keys')
    .where({ key, route })
    .andWhere('expires_at', '>', new Date())
    .first();
  if (!row) return null;
  return { statusCode: row.status_code, body: row.response_body };
}

export async function saveIdempotentResponse(key, route, statusCode, body) {
  const expiresAt = new Date(Date.now() + IDEMPOTENCY_TTL_HOURS * 60 * 60 * 1000);
  await table('idempotency_keys')
    .insert({
      key,
      route,
      status_code: statusCode,
      response_body: body,
      expires_at: expiresAt,
    })
    .onConflict('key')
    .merge({
      route,
      status_code: statusCode,
      response_body: body,
      expires_at: expiresAt,
      updated_at: db.fn.now(),
    });
}

export async function getPlanBySlug(slug) {
  return table('plans').where({ slug, active: true }).first();
}

/**
 * Block re-registration: same email cannot pay again for the same active webinar.
 */
export async function assertWebinarEmailAvailable(email, activeEvent) {
  if (!activeEvent) return;
  const normalized = String(email || '')
    .trim()
    .toLowerCase();
  if (!normalized) return;

  const { DB_SCHEMA } = await import('../db-schema.js');
  const eventId = String(activeEvent.id);
  const meetingId = activeEvent.zoom_meeting_id ? String(activeEvent.zoom_meeting_id) : null;

  const rows = await db
    .withSchema(DB_SCHEMA)
    .from('orders')
    .join('customers', 'customers.id', 'orders.customer_id')
    .join('plans', 'plans.id', 'orders.plan_id')
    .where('customers.email', normalized)
    .where('orders.status', 'paid')
    .where(function whereWebinarPlan() {
      this.where('plans.slug', WEBINAR_PLAN_SLUG).orWhereRaw(
        `orders.metadata->>'plan_slug' = ?`,
        [WEBINAR_PLAN_SLUG]
      );
    })
    .select('orders.id', 'orders.metadata');

  const already = rows.some((row) => {
    const meta = row.metadata || {};
    if (meta.webinar_event_id && String(meta.webinar_event_id) === eventId) return true;
    if (meetingId && meta.zoom?.meeting_id && String(meta.zoom.meeting_id) === meetingId) {
      return true;
    }
    return false;
  });

  if (already) {
    const error = new Error(
      'This email is already registered for the current webinar. Check your inbox for the Zoom join link.'
    );
    error.statusCode = 409;
    throw error;
  }
}

function serializeCreateOrderResponse(order, plan, customer, amountMinor) {
  return {
    orderId: order.id,
    razorpayOrderId: order.razorpay_order_id,
    keyId: config.razorpay.keyId,
    amount: amountMinor ?? order.amount_minor,
    currency: order.currency,
    plan: {
      slug: plan.slug,
      name: plan.name,
    },
    customer: {
      name: customer.name,
      email: customer.email,
      contact: customer.contact,
    },
  };
}

export async function createOrder({
  planSlug,
  name,
  email,
  contact,
  website,
  serviceRequirement,
  registration,
  idempotencyKey,
}) {
  const plan = await getPlanBySlug(planSlug);
  if (!plan) {
    const error = new Error(`Plan not found: ${planSlug}`);
    error.statusCode = 404;
    throw error;
  }

  // Replay same Idempotency-Key → return existing order (no second Razorpay charge)
  if (idempotencyKey) {
    const existingByKey = await table('orders').where({ idempotency_key: idempotencyKey }).first();
    if (existingByKey) {
      const [existingPlan, existingCustomer] = await Promise.all([
        table('plans').where({ id: existingByKey.plan_id }).first(),
        table('customers').where({ id: existingByKey.customer_id }).first(),
      ]);
      return serializeCreateOrderResponse(existingByKey, existingPlan || plan, existingCustomer, existingByKey.amount_minor);
    }
  }

  let activeWebinar = null;
  if (plan.slug === WEBINAR_PLAN_SLUG) {
    activeWebinar = await getActiveWebinarEvent();
    if (!activeWebinar) {
      const error = new Error(
        'No webinar is scheduled right now. Join the waitlist to get notified.'
      );
      error.statusCode = 409;
      throw error;
    }
    if (activeWebinar.seats_left <= 0) {
      const error = new Error('This webinar is sold out');
      error.statusCode = 409;
      throw error;
    }
    await assertWebinarEmailAvailable(email, activeWebinar);
    if (activeWebinar.price_cents > 0) {
      plan.amount_minor = activeWebinar.price_cents;
    }
  }

  if (!plan.amount_minor || plan.amount_minor <= 0) {
    const error = new Error(`Plan ${planSlug} is not available for purchase`);
    error.statusCode = 400;
    throw error;
  }

  const currency = (plan.currency || PAYMENT_CURRENCY).toUpperCase();
  if (currency !== PAYMENT_CURRENCY) {
    const error = new Error(`Only ${PAYMENT_CURRENCY} payments are supported`);
    error.statusCode = 400;
    throw error;
  }

  const registrationSummary = registration
    ? [
        registration.country && `Country: ${registration.country}`,
        registration.status && `Status: ${registration.status}`,
        registration.visa && `Visa: ${registration.visa}`,
        registration.experience && `Experience: ${registration.experience}`,
      ]
        .filter(Boolean)
        .join(' · ')
    : '';

  const [customer] = await table('customers')
    .insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      contact: contact?.trim() || null,
      website: website?.trim() || null,
      service_requirement: registrationSummary || serviceRequirement?.trim() || null,
    })
    .returning('*');

  const receipt = `sp_${Date.now()}`;
  const razorpayOrder = await createRazorpayOrder({
    amountMinor: plan.amount_minor,
    currency,
    receipt,
    notes: {
      plan_slug: plan.slug,
      customer_email: customer.email,
      site: 'surelyplaced',
    },
  });

  let order;
  try {
    [order] = await table('orders')
      .insert({
        plan_id: plan.id,
        customer_id: customer.id,
        razorpay_order_id: razorpayOrder.id,
        status: 'created',
        amount_minor: plan.amount_minor,
        currency,
        idempotency_key: idempotencyKey || null,
        metadata: {
          plan_slug: plan.slug,
          plan_name: plan.name,
          registration: registration || {},
          webinar_event_id: activeWebinar?.id || null,
        },
      })
      .returning('*');
  } catch (insertError) {
    // Unique idempotency_key race: another request won — return that order
    if (idempotencyKey && /idempotency_key|unique/i.test(String(insertError.message))) {
      const raced = await table('orders').where({ idempotency_key: idempotencyKey }).first();
      if (raced) {
        const [p, c] = await Promise.all([
          table('plans').where({ id: raced.plan_id }).first(),
          table('customers').where({ id: raced.customer_id }).first(),
        ]);
        return serializeCreateOrderResponse(raced, p || plan, c, raced.amount_minor);
      }
    }
    throw insertError;
  }

  return serializeCreateOrderResponse(order, plan, customer, plan.amount_minor);
}

export async function getOrderById(orderId) {
  const order = await table('orders').where({ id: orderId }).first();
  if (!order) return null;

  const [plan, customer, payment] = await Promise.all([
    table('plans').where({ id: order.plan_id }).first(),
    table('customers').where({ id: order.customer_id }).first(),
    table('payments').where({ order_id: order.id }).first(),
  ]);

  return { order, plan, customer, payment };
}

export async function verifyOrderPayment({
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) {
  const order = await table('orders').where({ id: orderId }).first();
  if (!order) {
    const error = new Error('Order not found');
    error.statusCode = 404;
    throw error;
  }

  if (order.razorpay_order_id !== razorpayOrderId) {
    const error = new Error('Order mismatch');
    error.statusCode = 400;
    throw error;
  }

  const valid = verifyPaymentSignature({
    orderId: razorpayOrderId,
    paymentId: razorpayPaymentId,
    signature: razorpaySignature,
  });

  if (!valid) {
    const error = new Error('Invalid payment signature');
    error.statusCode = 400;
    throw error;
  }

  if (order.status === 'paid') {
    let result = await getOrderById(order.id);
    const hadZoom = Boolean(getZoomMeta(result.order)?.registrant_id);
    if (isWebinarOrder(result.plan, result.order) && !hadZoom) {
      result = await ensureZoomRegistration(result);
      const hasZoomNow = Boolean(getZoomMeta(result.order)?.registrant_id);
      if (hasZoomNow) {
        try {
          await sendPaymentEmails(result);
        } catch (mailError) {
          console.error('Payment email failed after Zoom retry:', mailError.message);
        }
      }
    }
    return result;
  }

  await db.transaction(async (trx) => {
    await trxTable(trx, 'orders').where({ id: order.id }).update({
      status: 'paid',
      updated_at: trx.fn.now(),
    });

    const existingPayment = await trxTable(trx, 'payments')
      .where({ razorpay_payment_id: razorpayPaymentId })
      .first();

    if (!existingPayment) {
      await trxTable(trx, 'payments').insert({
        order_id: order.id,
        razorpay_payment_id: razorpayPaymentId,
        status: 'captured',
        amount_minor: order.amount_minor,
        currency: order.currency,
        raw_payload: {
          razorpay_order_id: razorpayOrderId,
          razorpay_payment_id: razorpayPaymentId,
        },
      });
    }
  });

  return finalizePaidOrder(order.id);
}

async function markOrderPaidFromWebhook(order, paymentEntity, orderEntity) {
  if (order.status === 'paid') {
    let result = await getOrderById(order.id);
    const hadZoom = Boolean(getZoomMeta(result.order)?.registrant_id);
    if (isWebinarOrder(result.plan, result.order) && !hadZoom) {
      result = await ensureZoomRegistration(result);
      const hasZoomNow = Boolean(getZoomMeta(result.order)?.registrant_id);
      if (hasZoomNow) {
        try {
          await sendPaymentEmails(result);
        } catch (mailError) {
          console.error('Payment email failed after Zoom retry:', mailError.message);
        }
      }
    }
    return result;
  }

  const paymentId = paymentEntity?.id;

  await db.transaction(async (trx) => {
    await trxTable(trx, 'orders').where({ id: order.id }).update({
      status: 'paid',
      updated_at: trx.fn.now(),
    });

    if (!paymentId) return;

    const existingPayment = await trxTable(trx, 'payments')
      .where({ razorpay_payment_id: paymentId })
      .first();

    if (!existingPayment) {
      await trxTable(trx, 'payments').insert({
        order_id: order.id,
        razorpay_payment_id: paymentId,
        status: paymentEntity?.status || 'captured',
        method: paymentEntity?.method || null,
        amount_minor: paymentEntity?.amount || orderEntity?.amount || order.amount_minor,
        currency: (paymentEntity?.currency || orderEntity?.currency || order.currency || PAYMENT_CURRENCY).toUpperCase(),
        raw_payload: paymentEntity || orderEntity || {},
      });
    }
  });

  return finalizePaidOrder(order.id);
}

function resolveWebhookEventId(event) {
  if (event?.id) return String(event.id);

  const eventType = event?.event;
  const paymentId = event?.payload?.payment?.entity?.id;
  const orderId = event?.payload?.order?.entity?.id || event?.payload?.payment?.entity?.order_id;
  const createdAt = event?.created_at;

  if (eventType && paymentId) return `${eventType}:${paymentId}`;
  if (eventType && orderId) return `${eventType}:${orderId}:${createdAt || ''}`;
  if (eventType && createdAt) return `${eventType}:${createdAt}`;

  return null;
}

export async function handleWebhookEvent(event) {
  const eventId = resolveWebhookEventId(event);
  const eventType = event?.event;
  const paymentEntity = event?.payload?.payment?.entity;
  const orderEntity = event?.payload?.order?.entity;

  if (!eventType) {
    const error = new Error('Invalid webhook payload: missing event type');
    error.statusCode = 400;
    throw error;
  }

  if (!eventId) {
    console.warn('Webhook missing event id, skipping dedupe key:', eventType);
  }

  if (eventId) {
    const existing = await table('payment_events').where({ event_id: eventId }).first();
    if (existing) {
      return { duplicate: true };
    }
  }

  await table('payment_events').insert({
    event_id: eventId || `${eventType}:${Date.now()}`,
    event_type: eventType,
    razorpay_payment_id: paymentEntity?.id || null,
    razorpay_order_id: paymentEntity?.order_id || orderEntity?.id || null,
    payload: event,
  });

  const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
  if (!razorpayOrderId) {
    return { processed: true };
  }

  const order = await table('orders').where({ razorpay_order_id: razorpayOrderId }).first();
  if (!order) {
    return { processed: true, orderMissing: true };
  }

  if (eventType === 'payment.captured' && paymentEntity?.id) {
    await markOrderPaidFromWebhook(order, paymentEntity, orderEntity);
  }

  if (eventType === 'order.paid') {
    await markOrderPaidFromWebhook(order, paymentEntity, orderEntity);
  }

  if (eventType === 'payment.failed') {
    if (order.status !== 'paid') {
      await table('orders').where({ id: order.id }).update({
        status: 'failed',
        updated_at: db.fn.now(),
      });
    }
  }

  return { processed: true };
}

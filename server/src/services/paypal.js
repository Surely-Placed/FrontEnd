import { config } from '../config.js';

function paypalApiBase() {
  return config.paypal.mode === 'live'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
}

let cachedToken = null;
let cachedTokenExpiresAt = 0;

export function isPayPalConfigured() {
  return Boolean(config.paypal.clientId && config.paypal.clientSecret);
}

async function getAccessToken() {
  if (!isPayPalConfigured()) {
    throw new Error('PayPal is not configured (missing PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)');
  }

  if (cachedToken && Date.now() < cachedTokenExpiresAt - 60_000) {
    return cachedToken;
  }

  const auth = Buffer.from(`${config.paypal.clientId}:${config.paypal.clientSecret}`).toString(
    'base64'
  );
  const response = await fetch(`${paypalApiBase()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `PayPal OAuth failed (${response.status}): ${body?.error_description || body?.error || response.statusText}`
    );
  }

  cachedToken = body.access_token;
  cachedTokenExpiresAt = Date.now() + (Number(body.expires_in) || 3600) * 1000;
  return cachedToken;
}

/**
 * Create a PayPal order (intent CAPTURE).
 * amountMinor is in cents (USD).
 */
export async function createPayPalOrder({ amountMinor, currency = 'USD', receipt, notes }) {
  if (!Number.isFinite(amountMinor) || amountMinor < 1) {
    throw new Error('Invalid PayPal order amount');
  }

  const token = await getAccessToken();
  const value = (amountMinor / 100).toFixed(2);
  const response = await fetch(`${paypalApiBase()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: receipt || undefined,
          description: notes?.plan_slug ? `Surely Placed — ${notes.plan_slug}` : 'Surely Placed',
          custom_id: notes?.plan_slug || undefined,
          amount: {
            currency_code: String(currency || 'USD').toUpperCase(),
            value,
          },
        },
      ],
      application_context: {
        brand_name: 'Surely Placed',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        shipping_preference: 'NO_SHIPPING',
      },
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `PayPal create order failed (${response.status}): ${body?.message || JSON.stringify(body)}`
    );
  }

  return {
    id: body.id,
    status: body.status,
    raw: body,
  };
}

/**
 * Capture an approved PayPal order. Returns capture id + status.
 */
export async function capturePayPalOrder(paypalOrderId) {
  if (!paypalOrderId) {
    throw new Error('PayPal order id is required');
  }

  const token = await getAccessToken();
  const response = await fetch(
    `${paypalApiBase()}/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}/capture`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
    }
  );

  const body = await response.json().catch(() => ({}));

  // Already captured (idempotent retry)
  if (response.status === 422 && /ORDER_ALREADY_CAPTURED/i.test(JSON.stringify(body))) {
    const existing = await getPayPalOrder(paypalOrderId);
    const captureId = extractCaptureId(existing);
    return {
      id: paypalOrderId,
      status: existing?.status || 'COMPLETED',
      captureId,
      raw: existing,
      alreadyCaptured: true,
    };
  }

  if (!response.ok) {
    throw new Error(
      `PayPal capture failed (${response.status}): ${body?.message || JSON.stringify(body)}`
    );
  }

  const captureId = extractCaptureId(body);
  if (!captureId) {
    throw new Error('PayPal capture succeeded but no capture id was returned');
  }

  if (body.status !== 'COMPLETED') {
    throw new Error(`PayPal order not completed (status: ${body.status})`);
  }

  return {
    id: body.id,
    status: body.status,
    captureId,
    raw: body,
  };
}

export async function getPayPalOrder(paypalOrderId) {
  const token = await getAccessToken();
  const response = await fetch(
    `${paypalApiBase()}/v2/checkout/orders/${encodeURIComponent(paypalOrderId)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `PayPal get order failed (${response.status}): ${body?.message || response.statusText}`
    );
  }
  return body;
}

function extractCaptureId(orderBody) {
  const units = orderBody?.purchase_units || [];
  for (const unit of units) {
    const captures = unit?.payments?.captures || [];
    if (captures[0]?.id) return captures[0].id;
  }
  return null;
}

/**
 * Verify PayPal webhook signature (optional; requires PAYPAL_WEBHOOK_ID).
 * PAYPAL_WEBHOOK_ID must be the dashboard webhook id (e.g. 1AB23...), never the listener URL.
 */
export async function verifyPayPalWebhook({ headers, body }) {
  const webhookId = String(config.paypal.webhookId || '').trim();

  if (!webhookId) {
    console.warn('PAYPAL_WEBHOOK_ID not set — skipping webhook signature verification');
    return true;
  }

  if (/^https?:\/\//i.test(webhookId)) {
    console.error(
      'PAYPAL_WEBHOOK_ID is a URL. Use the Webhook ID from PayPal Developer Dashboard, not the ngrok/API URL.'
    );
    return false;
  }

  const token = await getAccessToken();
  const transmissionId = headers['paypal-transmission-id'];
  const transmissionTime = headers['paypal-transmission-time'];
  const certUrl = headers['paypal-cert-url'];
  const authAlgo = headers['paypal-auth-algo'];
  const transmissionSig = headers['paypal-transmission-sig'];

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    console.error('PayPal webhook missing signature headers', {
      transmissionId: Boolean(transmissionId),
      transmissionTime: Boolean(transmissionTime),
      certUrl: Boolean(certUrl),
      authAlgo: Boolean(authAlgo),
      transmissionSig: Boolean(transmissionSig),
    });
    return false;
  }

  const response = await fetch(`${paypalApiBase()}/v1/notifications/verify-webhook-signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      auth_algo: authAlgo,
      cert_url: certUrl,
      transmission_id: transmissionId,
      transmission_sig: transmissionSig,
      transmission_time: transmissionTime,
      webhook_id: webhookId,
      webhook_event: typeof body === 'string' ? JSON.parse(body) : body,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (result?.verification_status !== 'SUCCESS') {
    console.error('PayPal webhook signature verification failed', {
      httpStatus: response.status,
      verification_status: result?.verification_status,
      name: result?.name,
      message: result?.message,
      details: result?.details,
    });
    return false;
  }

  return true;
}

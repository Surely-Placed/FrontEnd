import nodemailer from 'nodemailer';
import { config } from './config.js';

const WEBINAR_DATETIME = 'Sunday, July 20, 2026 · 8 PM ET';

let transporter;

function getTransporter() {
  if (!config.smtp.host || !config.smtp.user || !config.smtp.pass) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.port === 465,
      auth: {
        user: config.smtp.user,
        pass: config.smtp.pass,
      },
    });
  }

  return transporter;
}

function formatAmount(amountMinor, currency) {
  const major = (amountMinor / 100).toFixed(2);
  if (currency === 'USD') return `$${major}`;
  return `${currency} ${major}`;
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailHtml({ title, intro, lines, footer, cta }) {
  const rows = lines
    .filter((line) => line.value)
    .map(
      (line) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#555;font-size:14px;vertical-align:top;width:40%;">${escapeHtml(line.label)}</td><td style="padding:8px 0;color:#111;font-size:14px;font-weight:600;">${escapeHtml(line.value)}</td></tr>`
    )
    .join('');

  const ctaBlock =
    cta?.href && cta?.label
      ? `<p style="margin:24px 0 8px;"><a href="${escapeHtml(cta.href)}" style="display:inline-block;background:#1a56db;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:15px;font-weight:700;">${escapeHtml(cta.label)}</a></p>
         <p style="color:#666;font-size:12px;line-height:1.5;word-break:break-all;">If the button does not work, use this link:<br/><a href="${escapeHtml(cta.href)}" style="color:#1a56db;">${escapeHtml(cta.href)}</a></p>`
      : '';

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#ffffff;">
      <h2 style="color:#1a56db;margin:0 0 12px;font-size:22px;">${escapeHtml(title)}</h2>
      ${intro ? `<p style="color:#444;font-size:15px;line-height:1.6;margin:0 0 20px;">${intro}</p>` : ''}
      <table style="width:100%;border-collapse:collapse;">${rows}</table>
      ${ctaBlock}
      <p style="color:#666;font-size:13px;margin-top:24px;line-height:1.5;">${footer || `Surely Placed · ${config.siteUrl}`}</p>
    </div>
  `;
}

function getRegistrationLines(order, customer) {
  const registration = order?.metadata?.registration || {};
  return [
    { label: 'Name', value: customer?.name },
    { label: 'Email', value: customer?.email },
    { label: 'Phone', value: customer?.contact },
    { label: 'Country', value: registration.country },
    { label: 'Current status', value: registration.status },
    { label: 'Visa status', value: registration.visa },
    { label: 'Experience', value: registration.experience },
  ];
}

function isWebinarOrder(plan, order) {
  return plan?.slug === 'webinar-live' || order?.metadata?.plan_slug === 'webinar-live';
}

export async function sendZoomRegistrationFailureAlert({ order, plan, customer, errorMessage }) {
  const transport = getTransporter();
  const teamEmail = config.smtp.webinarNotify || config.smtp.to;
  if (!transport || !teamEmail || !config.smtp.from) return;

  await transport.sendMail({
    from: config.smtp.from,
    to: teamEmail,
    subject: `[Surely Placed] Zoom registration FAILED — ${customer?.name || order?.id}`,
    html: buildEmailHtml({
      title: 'Zoom webinar registration failed',
      intro:
        'Payment succeeded, but the attendee was not added to Zoom. Register them manually in Zoom or retry after checking ZOOM_* credentials.',
      lines: [
        { label: 'Customer', value: customer?.name },
        { label: 'Email', value: customer?.email },
        { label: 'Order ID', value: order?.id },
        { label: 'Plan', value: plan?.name || plan?.slug },
        { label: 'Error', value: errorMessage },
      ],
    }),
  });
}

export async function sendPaymentEmails({ order, plan, customer, payment }) {
  const transport = getTransporter();
  const teamEmail = config.smtp.webinarNotify || config.smtp.to;

  if (!transport || !teamEmail || !config.smtp.from) {
    console.warn('SMTP not configured — skipping payment emails');
    return;
  }

  const amount = formatAmount(order.amount_minor, order.currency);
  const webinar = isWebinarOrder(plan, order);
  const registrationLines = getRegistrationLines(order, customer);
  const zoom = order?.metadata?.zoom || {};
  const joinUrl = zoom.join_url || null;

  const paymentLines = [
    { label: 'Plan', value: plan?.name || 'N/A' },
    { label: 'Amount paid', value: amount },
    { label: 'Webinar date', value: webinar ? WEBINAR_DATETIME : null },
    { label: 'Order ID', value: order.id },
    { label: 'Payment ID', value: payment?.razorpay_payment_id || 'Confirmed' },
    { label: 'Zoom registrant ID', value: zoom.registrant_id || null },
    { label: 'Zoom join link', value: joinUrl },
    { label: 'Zoom status', value: zoom.error ? `FAILED: ${zoom.error}` : joinUrl ? 'Registered' : null },
    ...registrationLines,
  ];

  await transport.sendMail({
    from: config.smtp.from,
    to: teamEmail,
    subject: webinar
      ? `[Surely Placed] New webinar registration — ${customer?.name}`
      : `[Surely Placed] Payment received — ${plan?.name}`,
    html: buildEmailHtml({
      title: webinar ? 'New webinar registration' : 'New payment received',
      intro: webinar
        ? 'A new attendee has registered and paid for the live career webinar.'
        : 'A new payment has been completed on Surely Placed.',
      lines: paymentLines,
    }),
  });

  if (customer?.email) {
    const webinarIntro = joinUrl
      ? `Thank you for registering. Your seat is confirmed for our live webinar on ${WEBINAR_DATETIME}. Use the button below for your unique Zoom join link (only paid registrants can join). The Software Career Playbook will arrive in a separate email shortly.`
      : `Thank you for registering. Your seat is confirmed for our live webinar on ${WEBINAR_DATETIME}. Your unique Zoom join link will be emailed as soon as registration completes (usually within a few minutes). The Software Career Playbook will arrive in a separate email shortly.`;

    await transport.sendMail({
      from: config.smtp.from,
      to: customer.email,
      subject: webinar
        ? "You're registered! Surely Placed Live Webinar"
        : 'Your Surely Placed payment confirmation',
      html: buildEmailHtml({
        title: webinar ? "You're registered for the live webinar!" : 'Payment confirmed',
        intro: webinar
          ? webinarIntro
          : 'Thank you for your payment. Your registration is confirmed.',
        lines: [
          { label: 'Event', value: webinar ? 'Live Career Webinar' : plan?.name },
          { label: 'Date & time', value: webinar ? WEBINAR_DATETIME : null },
          { label: 'Amount paid', value: amount },
          { label: 'Status', value: 'Confirmed' },
          { label: 'Order ID', value: order.id },
        ],
        cta: webinar && joinUrl ? { href: joinUrl, label: 'Join Zoom Webinar' } : null,
        footer: `Questions? Reply to this email or contact us at ${config.smtp.from}.`,
      }),
    });
  }
}

export async function sendWaitlistSignupAlert({ name, email, contact }) {
  const transport = getTransporter();
  const teamEmail = config.smtp.webinarNotify || config.smtp.to;
  if (!transport || !teamEmail || !config.smtp.from) return;

  await transport.sendMail({
    from: config.smtp.from,
    to: teamEmail,
    subject: `[Surely Placed] Webinar waitlist — ${name}`,
    html: buildEmailHtml({
      title: 'New webinar waitlist signup',
      intro: 'Someone wants to be notified when the next webinar is scheduled.',
      lines: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Phone', value: contact },
      ],
    }),
  });
}

/** Notify waitlist leads that a webinar is now open for registration. */
export async function sendWaitlistOpenedEmails({ recipients, webinar }) {
  const transport = getTransporter();
  if (!transport || !config.smtp.from || !recipients?.length) return;

  const title = webinar?.title || 'Live Career Webinar';
  const when = webinar?.datetimeLabel || webinar?.datetime_label || 'soon';
  const href = `${config.siteUrl.replace(/\/$/, '')}/webinar`;

  for (const person of recipients) {
    if (!person?.email) continue;
    await transport.sendMail({
      from: config.smtp.from,
      to: person.email,
      subject: `Seats are open — ${title}`,
      html: buildEmailHtml({
        title: 'A new webinar is scheduled',
        intro: `Hi ${escapeHtml(person.name || 'there')}, seats are now open for <strong>${escapeHtml(title)}</strong> (${escapeHtml(when)}). Reserve yours before they fill up.`,
        lines: [
          { label: 'Event', value: title },
          { label: 'When', value: when },
        ],
        cta: { href, label: 'Reserve your seat' },
        footer: `You're receiving this because you joined the Surely Placed webinar waitlist.`,
      }),
    });
  }
}

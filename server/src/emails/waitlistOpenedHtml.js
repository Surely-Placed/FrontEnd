/**
 * Branded waitlist "seats are open" email — same visual system as webinar confirmation.
 */

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function detailRow(label, value, { alt = false } = {}) {
  if (!value) return '';
  const bg = alt ? '#F2F2F2' : '#FFFFFF';
  return `
    <tr>
      <td style="padding:14px 18px;background:${bg};border-top:1px solid #E5E7EB;font-size:13px;color:#6B7280;font-weight:500;width:38%;vertical-align:middle;">${escapeHtml(label)}</td>
      <td style="padding:14px 18px;background:${bg};border-top:1px solid #E5E7EB;text-align:right;vertical-align:middle;">
        <span style="font-size:14px;font-weight:700;color:#0D0D0D;">${escapeHtml(value)}</span>
      </td>
    </tr>`;
}

/**
 * @param {object} opts
 * @param {string} opts.customerName
 * @param {string} opts.eventTitle
 * @param {string} opts.datetimeLabel
 * @param {string} opts.reserveUrl
 * @param {string} opts.logoUrl
 * @param {string} opts.siteUrl
 * @param {string} opts.supportEmail
 * @param {string|number} [opts.priceLabel]
 * @param {number} [opts.seatsTotal]
 */
export function buildWaitlistOpenedHtml({
  customerName,
  eventTitle = 'Live Career Webinar',
  datetimeLabel,
  reserveUrl,
  logoUrl,
  siteUrl,
  supportEmail,
  priceLabel,
  seatsTotal,
}) {
  const name = escapeHtml(customerName || 'there');
  const title = escapeHtml(eventTitle);
  const when = escapeHtml(datetimeLabel || 'soon');
  const safeReserve = escapeHtml(reserveUrl);
  const safeLogo = escapeHtml(logoUrl);
  const safeSite = escapeHtml(siteUrl);
  const safeSupport = escapeHtml(supportEmail);

  const rows = [
    detailRow('Event', eventTitle, { alt: false }),
    detailRow('When', datetimeLabel || 'soon', { alt: true }),
    priceLabel ? detailRow('Price', priceLabel, { alt: false }) : '',
    seatsTotal
      ? detailRow('Seats', `${seatsTotal} available`, { alt: Boolean(priceLabel) })
      : '',
  ].join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>Seats are open</title>
</head>
<body style="margin:0;padding:0;background-color:#F2F2F2;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F2F2F2;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;font-family:Arial,Helvetica,sans-serif;">

          <tr>
            <td align="center" style="padding:0 0 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;padding-right:10px;">
                    <img src="${safeLogo}" width="28" height="28" alt="Surely Placed" style="display:block;width:28px;height:28px;border:0;">
                  </td>
                  <td style="vertical-align:middle;font-family:Arial,Helvetica,sans-serif;font-weight:800;font-size:22px;letter-spacing:0.02em;color:#0D0D0D;">
                    Surely<span style="color:#2857C4;">Placed</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="background:#ffffff;border:1px solid #E5E7EB;border-radius:20px;overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                <tr>
                  <td align="center" style="background-color:#2857C4;background:linear-gradient(135deg,#1E3F96 0%,#2857C4 55%,#2A8F86 100%);padding:40px 32px 36px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 18px;">
                      <tr>
                        <td align="center" style="width:68px;height:68px;border-radius:50%;background:#ffffff;vertical-align:middle;">
                          <img src="${safeLogo}" width="36" height="36" alt="" style="display:inline-block;width:36px;height:36px;border:0;vertical-align:middle;">
                        </td>
                      </tr>
                    </table>
                    <div style="text-transform:uppercase;letter-spacing:0.14em;font-size:12px;font-weight:600;color:rgba(255,255,255,0.8);margin-bottom:8px;">Seats Are Open</div>
                    <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:26px;line-height:1.3;color:#ffffff;">A new webinar is scheduled</h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px 32px 8px;">
                    <p style="margin:0 0 24px;font-size:15px;line-height:1.65;color:#555555;">
                      Hi <strong style="color:#0D0D0D;">${name}</strong>, seats are now open for
                      <strong style="color:#0D0D0D;">${title}</strong>
                      (<strong style="color:#0D0D0D;">${when}</strong>).
                      Reserve yours before they fill up.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #E5E7EB;border-radius:14px;overflow:hidden;">
                      ${rows}
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 12px;">
                    <a href="${safeReserve}" style="display:block;text-align:center;text-decoration:none;padding:16px 24px;border-radius:12px;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:16px;color:#ffffff;background-color:#2857C4;">
                      Reserve your seat →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px 28px;font-size:12px;color:#9CA3AF;text-align:center;line-height:1.5;">
                    Link not working? <a href="${safeReserve}" style="color:#2857C4;word-break:break-all;">${safeReserve}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:22px 32px;border-top:1px solid #E5E7EB;text-align:center;">
                    <p style="font-size:12px;color:#9CA3AF;margin:0 0 4px;line-height:1.5;">
                      You&apos;re receiving this because you joined the Surely Placed webinar waitlist.
                    </p>
                    <p style="font-size:12px;color:#9CA3AF;margin:0 0 4px;line-height:1.5;">
                      Questions? <a href="mailto:${safeSupport}" style="color:#2857C4;">${safeSupport}</a>
                    </p>
                    <p style="font-size:11px;color:#9CA3AF;margin:0;">
                      © ${new Date().getFullYear()} <a href="${safeSite}" style="color:#9CA3AF;text-decoration:none;">Surely Placed</a> · Talent That Sticks
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

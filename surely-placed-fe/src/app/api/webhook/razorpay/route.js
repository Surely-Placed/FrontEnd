export const dynamic = 'force-dynamic';

const PAYMENTS_API_URL =
  process.env.PAYMENTS_API_URL || process.env.NEXT_PUBLIC_PAYMENTS_API_URL || '';

export async function POST(request) {
  if (!PAYMENTS_API_URL) {
    return Response.json({ error: 'PAYMENTS_API_URL is not configured' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-razorpay-signature');
  const target = `${PAYMENTS_API_URL.replace(/\/$/, '')}/api/webhooks/razorpay`;

  const upstream = await fetch(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(signature ? { 'x-razorpay-signature': signature } : {}),
    },
    body: rawBody,
  });

  const text = await upstream.text();
  return new Response(text, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

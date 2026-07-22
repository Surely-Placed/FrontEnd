import { NextResponse } from 'next/server';

const PAYMENTS_API_URL =
  process.env.PAYMENTS_API_URL ||
  process.env.NEXT_PUBLIC_PAYMENTS_API_URL ||
  'http://localhost:8080';

export async function POST(request) {
  const body = await request.text();
  const target = `${PAYMENTS_API_URL.replace(/\/$/, '')}/api/webhooks/paypal`;

  const headers = {
    'Content-Type': 'application/json',
  };
  for (const name of [
    'paypal-transmission-id',
    'paypal-transmission-time',
    'paypal-cert-url',
    'paypal-auth-algo',
    'paypal-transmission-sig',
  ]) {
    const value = request.headers.get(name);
    if (value) headers[name] = value;
  }

  const upstream = await fetch(target, {
    method: 'POST',
    headers,
    body,
  });

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
}

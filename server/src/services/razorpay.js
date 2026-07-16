import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config, PAYMENT_CURRENCY } from '../config.js';

let client;

export function getRazorpayClient() {
  if (!client) {
    if (!config.razorpay.keyId || !config.razorpay.keySecret) {
      throw new Error('Razorpay credentials are not configured');
    }
    client = new Razorpay({
      key_id: config.razorpay.keyId,
      key_secret: config.razorpay.keySecret,
    });
  }
  return client;
}

export function verifyPaymentSignature({ orderId, paymentId, signature }) {
  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac('sha256', config.razorpay.keySecret)
    .update(body)
    .digest('hex');
  return expected === signature;
}

export function verifyWebhookSignature(rawBody, signature) {
  const expected = crypto
    .createHmac('sha256', config.razorpay.webhookSecret)
    .update(rawBody)
    .digest('hex');
  return expected === signature;
}

export async function createRazorpayOrder({ amountMinor, currency, receipt, notes }) {
  const orderCurrency = (currency || PAYMENT_CURRENCY).toUpperCase();
  if (orderCurrency !== PAYMENT_CURRENCY) {
    throw new Error(`Only ${PAYMENT_CURRENCY} payments are supported`);
  }

  const razorpay = getRazorpayClient();
  return razorpay.orders.create({
    amount: amountMinor,
    currency: orderCurrency,
    receipt,
    notes,
  });
}

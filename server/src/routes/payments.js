import { Router } from 'express';
import { config } from '../config.js';
import { requireIdempotencyKey, withIdempotency } from '../middleware/idempotency.js';
import { createOrder, getOrderById, verifyOrderPayment } from '../services/orders.js';

const router = Router();

router.get('/config', (_req, res) => {
  res.json({
    provider: 'paypal',
    clientId: config.paypal.clientId || null,
    mode: config.paypal.mode === 'live' ? 'live' : 'sandbox',
    currency: 'USD',
    configured: Boolean(config.paypal.clientId && config.paypal.clientSecret),
  });
});

router.post(
  '/orders',
  requireIdempotencyKey,
  withIdempotency('POST /api/payments/orders'),
  async (req, res, next) => {
    try {
      const { planSlug, name, email, contact, website, serviceRequirement, registration } =
        req.body || {};

      if (!planSlug || !name?.trim() || !email?.trim()) {
        return res.status(400).json({
          error: 'planSlug, name, and email are required',
        });
      }

      const result = await createOrder({
        planSlug,
        name,
        email,
        contact,
        website,
        serviceRequirement,
        registration,
        idempotencyKey: req.idempotencyKey,
      });

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  }
);

router.post(
  '/verify',
  requireIdempotencyKey,
  withIdempotency('POST /api/payments/verify'),
  async (req, res, next) => {
    try {
      const { orderId, paypalOrderId } = req.body || {};

      if (!orderId || !paypalOrderId) {
        return res.status(400).json({
          error: 'orderId and paypalOrderId are required',
        });
      }

      const result = await verifyOrderPayment({
        orderId,
        paypalOrderId,
      });

      return res.json({
        success: true,
        order: result.order,
        plan: result.plan,
        customer: result.customer,
        payment: result.payment,
      });
    } catch (error) {
      return next(error);
    }
  }
);

router.get('/orders/:id', async (req, res, next) => {
  try {
    const result = await getOrderById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Order not found' });
    }

    return res.json(result);
  } catch (error) {
    return next(error);
  }
});

export default router;

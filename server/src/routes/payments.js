import { Router } from 'express';
import { requireIdempotencyKey, withIdempotency } from '../middleware/idempotency.js';
import { createOrder, getOrderById, verifyOrderPayment } from '../services/orders.js';

const router = Router();

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
      const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body || {};

      if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
        return res.status(400).json({
          error: 'orderId, razorpayOrderId, razorpayPaymentId, and razorpaySignature are required',
        });
      }

      const result = await verifyOrderPayment({
        orderId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
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

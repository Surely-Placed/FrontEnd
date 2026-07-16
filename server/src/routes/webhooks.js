import { Router } from 'express';
import { verifyWebhookSignature } from '../services/razorpay.js';
import { handleWebhookEvent } from '../services/orders.js';

const router = Router();

router.post('/razorpay', async (req, res, next) => {
  try {
    const signature = req.get('x-razorpay-signature');
    const rawBody = req.rawBody;

    if (!signature || !rawBody) {
      return res.status(400).json({ error: 'Missing webhook signature or body' });
    }

    if (!verifyWebhookSignature(rawBody, signature)) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = JSON.parse(rawBody.toString('utf8'));
    console.log('Razorpay webhook received:', event?.event || 'unknown');
    await handleWebhookEvent(event);

    return res.json({ received: true });
  } catch (error) {
    return next(error);
  }
});

export default router;

import { Router } from 'express';
import { verifyPayPalWebhook } from '../services/paypal.js';
import { handleWebhookEvent, PAYPAL_WEBHOOK_EVENTS } from '../services/orders.js';

const router = Router();

router.post('/paypal', async (req, res, next) => {
  try {
    const rawBody = req.rawBody;
    if (!rawBody) {
      return res.status(400).json({ error: 'Missing webhook body' });
    }

    const headers = {
      'paypal-transmission-id': req.get('paypal-transmission-id'),
      'paypal-transmission-time': req.get('paypal-transmission-time'),
      'paypal-cert-url': req.get('paypal-cert-url'),
      'paypal-auth-algo': req.get('paypal-auth-algo'),
      'paypal-transmission-sig': req.get('paypal-transmission-sig'),
    };

    const ok = await verifyPayPalWebhook({
      headers,
      body: rawBody.toString('utf8'),
    });
    if (!ok) {
      console.error('Rejecting PayPal webhook: signature verification failed');
      return res.status(400).json({
        error:
          'Invalid PayPal webhook signature. Set PAYPAL_WEBHOOK_ID to the Webhook ID from PayPal Dashboard (not the URL).',
      });
    }

    const event = JSON.parse(rawBody.toString('utf8'));
    console.log('PayPal webhook received:', event?.event_type || 'unknown');
    await handleWebhookEvent(event);

    return res.json({ received: true });
  } catch (error) {
    return next(error);
  }
});

/** Helper for dashboard setup — which events to subscribe. */
router.get('/paypal/events', (_req, res) => {
  res.json({
    webhookUrl: 'https://api.surelyplaced.com/api/webhooks/paypal',
    events: PAYPAL_WEBHOOK_EVENTS,
  });
});

export default router;

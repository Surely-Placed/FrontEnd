import { Router } from 'express';
import { getPublicWebinarConfig } from '../services/webinarEvents.js';
import { addToWaitlist } from '../services/webinarWaitlist.js';

const router = Router();

router.get('/active', async (_req, res, next) => {
  try {
    const webinar = await getPublicWebinarConfig();
    res.json({ webinar });
  } catch (error) {
    next(error);
  }
});

router.post('/waitlist', async (req, res, next) => {
  try {
    const result = await addToWaitlist(req.body || {});
    res.status(201).json({
      ok: true,
      alreadyJoined: result.alreadyJoined,
      message: result.alreadyJoined
        ? 'You are already on the waitlist. We will email you when seats open.'
        : 'You are on the waitlist. We will email you when the next webinar is scheduled.',
    });
  } catch (error) {
    next(error);
  }
});

export default router;

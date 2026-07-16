import db, { table } from '../db.js';
import {
  sendWaitlistOpenedEmails,
  sendWaitlistSignupAlert,
} from '../mail.js';

function normalizeEmail(email) {
  return String(email || '')
    .trim()
    .toLowerCase();
}

export async function addToWaitlist({ name, email, contact }) {
  const cleanName = String(name || '').trim();
  const cleanEmail = normalizeEmail(email);
  const cleanContact = contact ? String(contact).trim() : null;

  if (!cleanName) {
    const error = new Error('Name is required');
    error.statusCode = 400;
    throw error;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(cleanEmail)) {
    const error = new Error('Valid email is required');
    error.statusCode = 400;
    throw error;
  }

  const existing = await table('webinar_waitlist').where({ email: cleanEmail }).first();
  let result;

  if (existing) {
    // Re-submit: refresh details, clear notified_at so they get the next
    // "seats open" email, and still alert the team.
    await table('webinar_waitlist')
      .where({ id: existing.id })
      .update({
        name: cleanName,
        contact: cleanContact || existing.contact,
        notified_at: null,
        updated_at: db.fn.now(),
      });
    result = { id: existing.id, alreadyJoined: true };
  } else {
    const [row] = await table('webinar_waitlist')
      .insert({
        name: cleanName,
        email: cleanEmail,
        contact: cleanContact,
        metadata: { source: 'webinar-page' },
      })
      .returning('*');
    result = { id: row.id, alreadyJoined: false };
  }

  try {
    await sendWaitlistSignupAlert({
      name: cleanName,
      email: cleanEmail,
      contact: cleanContact,
      alreadyJoined: result.alreadyJoined,
    });
  } catch (err) {
    console.error('Waitlist signup alert failed:', err.message);
  }

  return result;
}

export async function listWaitlist({ page = 1, pageSize = 20, pendingOnly = false } = {}) {
  const safePage = Math.max(1, Number(page) || 1);
  const safeSize = Math.min(100, Math.max(1, Number(pageSize) || 20));
  const offset = (safePage - 1) * safeSize;

  let countQ = table('webinar_waitlist');
  if (pendingOnly) countQ = countQ.whereNull('notified_at');
  const countRow = await countQ.clone().count({ total: '*' }).first();
  const total = Number(countRow?.total) || 0;

  let rowsQ = table('webinar_waitlist').orderBy('created_at', 'desc');
  if (pendingOnly) rowsQ = rowsQ.whereNull('notified_at');
  const rows = await rowsQ.limit(safeSize).offset(offset);

  return {
    waitlist: rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      contact: r.contact,
      notifiedAt: r.notified_at,
      createdAt: r.created_at,
    })),
    pagination: {
      page: safePage,
      pageSize: safeSize,
      total,
      totalPages: Math.max(1, Math.ceil(total / safeSize) || 1),
    },
  };
}

/** Email waitlist when a new webinar goes live. */
export async function notifyWaitlistOfNewWebinar(webinar) {
  const pending = await table('webinar_waitlist').whereNull('notified_at');
  if (!pending.length) return { notified: 0 };

  try {
    await sendWaitlistOpenedEmails({
      recipients: pending,
      webinar,
    });
  } catch (err) {
    console.error('Waitlist notify emails failed:', err.message);
    return { notified: 0, error: err.message };
  }

  const ids = pending.map((r) => r.id);
  await table('webinar_waitlist').whereIn('id', ids).update({
    notified_at: db.fn.now(),
    webinar_event_id: webinar?.id || null,
    updated_at: db.fn.now(),
  });

  return { notified: ids.length };
}

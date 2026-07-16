import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  const existing = await knex('plans').withSchema(DB_SCHEMA).where({ slug: 'webinar-live' }).first();
  if (existing) return;

  await knex('plans').withSchema(DB_SCHEMA).insert([
    {
      slug: 'webinar-live',
      name: 'Live Career Webinar',
      description: 'Live webinar + recording + Q&A + Software Career Playbook',
      amount_minor: 1999,
      currency: 'USD',
      active: true,
    },
    {
      slug: 'cohort-standard',
      name: 'Cohort Enrollment',
      description: 'Surely Placed cohort program enrollment',
      amount_minor: 0,
      currency: 'USD',
      active: false,
    },
  ]);
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex('plans').withSchema(DB_SCHEMA).whereIn('slug', ['webinar-live', 'cohort-standard']).del();
}

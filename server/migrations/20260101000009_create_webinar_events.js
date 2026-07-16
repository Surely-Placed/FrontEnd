import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.withSchema(DB_SCHEMA).createTable('webinar_events', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('title', 255).notNullable();
    table.text('description');
    table.timestamp('starts_at', { useTz: true });
    table.string('datetime_label', 255);
    table.integer('seats_total').notNullable().defaultTo(25);
    table.integer('seats_left').notNullable().defaultTo(25);
    table.integer('price_cents').notNullable().defaultTo(1999);
    table.string('currency', 3).notNullable().defaultTo('USD');
    table.string('zoom_meeting_id', 100);
    table.text('zoom_start_url');
    table.boolean('active').notNullable().defaultTo(false);
    table.jsonb('metadata').defaultTo('{}');
    table.timestamps(true, true);
    table.index(['active']);
  });

  // Seed one inactive row so admin can activate / edit; Zoom ID filled when creating from dashboard
  await knex
    .withSchema(DB_SCHEMA)
    .table('webinar_events')
    .insert({
      title: 'Live Career Webinar',
      description: 'Stop mass-applying. Start getting interviews.',
      starts_at: knex.raw(`timestamptz '2026-07-20 20:00:00-04'`),
      datetime_label: 'Sunday, July 20, 2026 · 8 PM ET',
      seats_total: 25,
      seats_left: 5,
      price_cents: 1999,
      currency: 'USD',
      active: true,
      metadata: JSON.stringify({ plan_slug: 'webinar-live' }),
    });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.withSchema(DB_SCHEMA).dropTableIfExists('webinar_events');
}

import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.withSchema(DB_SCHEMA).createTable('payment_events', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('event_id', 100).notNullable().unique();
    table.string('event_type', 100).notNullable();
    table.string('razorpay_payment_id', 100);
    table.string('razorpay_order_id', 100);
    table.jsonb('payload').notNullable();
    table.timestamps(true, true);
    table.index(['razorpay_order_id']);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.withSchema(DB_SCHEMA).dropTableIfExists('payment_events');
}

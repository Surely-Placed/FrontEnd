import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.withSchema(DB_SCHEMA).createTable('payments', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('order_id').notNullable().references('id').inTable(`${DB_SCHEMA}.orders`);
    table.string('razorpay_payment_id', 100).notNullable().unique();
    table.string('status', 50).notNullable();
    table.string('method', 50);
    table.integer('amount_minor').notNullable();
    table.string('currency', 3).notNullable();
    table.jsonb('raw_payload').defaultTo('{}');
    table.timestamps(true, true);
    table.index(['order_id']);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.withSchema(DB_SCHEMA).dropTableIfExists('payments');
}

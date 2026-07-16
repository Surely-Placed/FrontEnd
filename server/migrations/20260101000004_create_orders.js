import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.withSchema(DB_SCHEMA).createTable('orders', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('plan_id').notNullable().references('id').inTable(`${DB_SCHEMA}.plans`);
    table.uuid('customer_id').notNullable().references('id').inTable(`${DB_SCHEMA}.customers`);
    table.string('razorpay_order_id', 100).unique();
    table.string('status', 50).notNullable().defaultTo('created');
    table.integer('amount_minor').notNullable();
    table.string('currency', 3).notNullable();
    table.string('idempotency_key', 100).unique();
    table.jsonb('metadata').defaultTo('{}');
    table.timestamps(true, true);
    table.index(['status']);
    table.index(['razorpay_order_id']);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.withSchema(DB_SCHEMA).dropTableIfExists('orders');
}

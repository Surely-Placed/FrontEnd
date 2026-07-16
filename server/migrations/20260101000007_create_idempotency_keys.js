import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.withSchema(DB_SCHEMA).createTable('idempotency_keys', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('key', 100).notNullable().unique();
    table.string('route', 100).notNullable();
    table.integer('status_code').notNullable();
    table.jsonb('response_body').notNullable();
    table.timestamp('expires_at').notNullable();
    table.timestamps(true, true);
    table.index(['expires_at']);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.withSchema(DB_SCHEMA).dropTableIfExists('idempotency_keys');
}

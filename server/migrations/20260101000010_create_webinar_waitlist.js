import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.withSchema(DB_SCHEMA).createTable('webinar_waitlist', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable();
    table.string('contact', 50);
    table.uuid('webinar_event_id').nullable();
    table.jsonb('metadata').defaultTo('{}');
    table.timestamp('notified_at', { useTz: true });
    table.timestamps(true, true);
    table.unique(['email']);
    table.index(['notified_at']);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.withSchema(DB_SCHEMA).dropTableIfExists('webinar_waitlist');
}

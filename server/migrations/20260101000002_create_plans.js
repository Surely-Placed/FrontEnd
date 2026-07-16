import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.schema.withSchema(DB_SCHEMA).createTable('plans', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('slug', 100).notNullable().unique();
    table.string('name', 255).notNullable();
    table.text('description');
    table.integer('amount_minor').notNullable();
    table.string('currency', 3).notNullable().defaultTo('USD');
    table.boolean('active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.schema.withSchema(DB_SCHEMA).dropTableIfExists('plans');
}

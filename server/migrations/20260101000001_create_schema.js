import { DB_SCHEMA } from '../src/db-schema.js';

/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS ${DB_SCHEMA}`);
}

/**
 * @param {import('knex').Knex} knex
 */
export async function down(knex) {
  await knex.raw(`DROP SCHEMA IF EXISTS ${DB_SCHEMA} CASCADE`);
}

import './config.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import { DB_SCHEMA } from './db-schema.js';

const env = process.env.NODE_ENV || 'development';

const db = knex(knexConfig[env]);

export function schema() {
  return db.schema.withSchema(DB_SCHEMA);
}

export function table(name) {
  return db(name).withSchema(DB_SCHEMA);
}

export function trxTable(trx, name) {
  return trx(name).withSchema(DB_SCHEMA);
}

export default db;

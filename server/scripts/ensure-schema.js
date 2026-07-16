import '../src/config.js';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import { DB_SCHEMA } from '../src/db-schema.js';

const nodeEnv = process.env.NODE_ENV || 'development';
const db = knex(knexConfig[nodeEnv]);

await db.raw(`CREATE SCHEMA IF NOT EXISTS ${DB_SCHEMA}`);
await db.destroy();

console.log(`Schema ready: ${DB_SCHEMA}`);

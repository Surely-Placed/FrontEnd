import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const nodeEnv = process.env.NODE_ENV || 'development';
const envFile = nodeEnv === 'production' ? '.env.production' : '.env.development';

dotenv.config({ path: path.join(__dirname, envFile) });

const dbSchema = process.env.DB_SCHEMA || 'surelyplaced';

function buildConnection() {
  if (process.env.DATABASE_URL) {
    return {
      connectionString: process.env.DATABASE_URL,
      ssl: nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
    };
  }

  return {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'theplugin',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
  };
}

const connection = buildConnection();

/** @type {import('knex').Knex.Config} */
const knexConfig = {
  client: 'pg',
  connection,
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
    schemaName: dbSchema,
  },
  pool: {
    min: 0,
    max: 10,
  },
};

export default {
  development: knexConfig,
  production: knexConfig,
};

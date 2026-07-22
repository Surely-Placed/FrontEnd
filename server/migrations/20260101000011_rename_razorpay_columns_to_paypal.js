/**
 * Rename legacy Razorpay column names to PayPal (values already store PayPal IDs).
 * Uses raw SQL because knex hasColumn/renameColumn can mis-resolve schemas.
 */
export async function up(knex) {
  const { DB_SCHEMA } = await import('../src/db-schema.js');
  if (!/^[a-z_][a-z0-9_]*$/i.test(DB_SCHEMA)) {
    throw new Error(`Unsafe DB_SCHEMA: ${DB_SCHEMA}`);
  }

  await knex.raw(`
    DO $migration$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '${DB_SCHEMA}' AND table_name = 'orders' AND column_name = 'razorpay_order_id'
      ) THEN
        ALTER TABLE ${DB_SCHEMA}.orders RENAME COLUMN razorpay_order_id TO paypal_order_id;
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '${DB_SCHEMA}' AND table_name = 'payments' AND column_name = 'razorpay_payment_id'
      ) THEN
        ALTER TABLE ${DB_SCHEMA}.payments RENAME COLUMN razorpay_payment_id TO paypal_payment_id;
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '${DB_SCHEMA}' AND table_name = 'payment_events' AND column_name = 'razorpay_payment_id'
      ) THEN
        ALTER TABLE ${DB_SCHEMA}.payment_events RENAME COLUMN razorpay_payment_id TO paypal_payment_id;
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '${DB_SCHEMA}' AND table_name = 'payment_events' AND column_name = 'razorpay_order_id'
      ) THEN
        ALTER TABLE ${DB_SCHEMA}.payment_events RENAME COLUMN razorpay_order_id TO paypal_order_id;
      END IF;
    END
    $migration$;
  `);
}

export async function down(knex) {
  const { DB_SCHEMA } = await import('../src/db-schema.js');
  if (!/^[a-z_][a-z0-9_]*$/i.test(DB_SCHEMA)) {
    throw new Error(`Unsafe DB_SCHEMA: ${DB_SCHEMA}`);
  }

  await knex.raw(`
    DO $migration$
    BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '${DB_SCHEMA}' AND table_name = 'orders' AND column_name = 'paypal_order_id'
      ) THEN
        ALTER TABLE ${DB_SCHEMA}.orders RENAME COLUMN paypal_order_id TO razorpay_order_id;
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '${DB_SCHEMA}' AND table_name = 'payments' AND column_name = 'paypal_payment_id'
      ) THEN
        ALTER TABLE ${DB_SCHEMA}.payments RENAME COLUMN paypal_payment_id TO razorpay_payment_id;
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '${DB_SCHEMA}' AND table_name = 'payment_events' AND column_name = 'paypal_payment_id'
      ) THEN
        ALTER TABLE ${DB_SCHEMA}.payment_events RENAME COLUMN paypal_payment_id TO razorpay_payment_id;
      END IF;

      IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = '${DB_SCHEMA}' AND table_name = 'payment_events' AND column_name = 'paypal_order_id'
      ) THEN
        ALTER TABLE ${DB_SCHEMA}.payment_events RENAME COLUMN paypal_order_id TO razorpay_order_id;
      END IF;
    END
    $migration$;
  `);
}

# Surely Placed Payments API

Express + PostgreSQL + Knex payments backend for Razorpay. Deployed on **Fly.io**.

## Quick start (local)

```powershell
cd server
cp .env.development.example .env.development
# Edit .env.development with your Postgres + Razorpay test keys

npm install
npm run migrate:latest
npm run dev
```

Health check: `http://localhost:8080/health`

## Environment files

| File | Use |
|------|-----|
| `.env.development` | Local dev (`npm run dev`, `npm run migrate:latest`) |
| `.env.production` | Production reference — set real values as **Fly secrets** |

Copy from `.env.development.example` / `.env.production.example`.

## Migrations

```powershell
npm run migrate:latest
npm run migrate:rollback
```

Schema: **`surelyplaced`** inside the shared Postgres database (e.g. `theplugin` on Neon).  
Other projects use their own schemas (e.g. `the_plugin`) in the same database.

Set in `.env.development` / Fly secrets:

```env
DB_NAME=theplugin
DB_SCHEMA=surelyplaced
# or DATABASE_URL=postgresql://...@host/theplugin?sslmode=require
```

## API

| Method | Path | Notes |
|--------|------|-------|
| GET | `/health` | Health + DB check |
| POST | `/api/payments/orders` | `Idempotency-Key` header required |
| POST | `/api/payments/verify` | After Razorpay checkout |
| GET | `/api/payments/orders/:id` | Order status |
| POST | `/api/webhooks/razorpay` | Razorpay webhook (raw body + signature) |

## Currency

All payments are **USD** only. Amounts are stored in **cents** (`$19.99` → `1999`).

## Razorpay webhook events

Register these in Razorpay Dashboard → Webhooks:

| Event | Action |
|-------|--------|
| `payment.captured` | Mark order paid, store payment, Zoom register (webinar), send emails |
| `order.paid` | Mark order paid, store payment (if present), Zoom register (webinar), send emails |
| `payment.failed` | Mark order failed |

Public webhook URL: `https://www.surelyplaced.com/api/webhook/razorpay`

## Zoom webinar (paid-only access)

After a `webinar-live` order is marked **paid**, the API registers the buyer on Zoom and emails their unique `join_url`.

### Zoom UI checklist

1. Zoom **Pro + Webinar add-on** (Meetings alone is not enough)
2. Create/schedule a **Webinar** with **Registration = Required**, approval **Automatically Approve**
3. Create a **Server-to-Server OAuth** app with scope `webinar:write:registrant:admin` (or `webinar:write:admin`)
4. Copy Account ID, Client ID, Client Secret, and Webinar ID into env

### Env vars

```env
ZOOM_ACCOUNT_ID=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
ZOOM_WEBINAR_ID=
```

If these are missing, payment still succeeds; Zoom registration is skipped and logged. On Zoom API failure after pay, the team gets an alert email and the join link is omitted from the customer email until a retry succeeds (next verify/webhook while registrant is still missing).

## Deploy to Fly.io

```powershell
fly auth login
fly apps create surelyplaced-payments --org anurag-sarkar-254

fly secrets set `
  DATABASE_URL="postgresql://..." `
  DB_SCHEMA="surelyplaced" `
  RAZORPAY_KEY_ID="rzp_live_xxx" `
  RAZORPAY_KEY_SECRET="xxx" `
  RAZORPAY_WEBHOOK_SECRET="xxx" `
  RAZORPAY_WEBHOOK_URL="https://www.surelyplaced.com/api/webhooks/razorpay" `
  FRONTEND_ORIGIN="https://www.surelyplaced.com" `
  SITE_URL="https://www.surelyplaced.com" `
  SMTP_HOST="smtp.gmail.com" `
  SMTP_PORT="587" `
  SMTP_USER="you@surelyplaced.com" `
  SMTP_APP_PASSWORD="xxx" `
  CONTACT_TO_EMAIL="you@surelyplaced.com" `
  CONTACT_FROM_EMAIL="you@surelyplaced.com" `
  ZOOM_ACCOUNT_ID="xxx" `
  ZOOM_CLIENT_ID="xxx" `
  ZOOM_CLIENT_SECRET="xxx" `
  --app surelyplaced-payments

fly deploy --app surelyplaced-payments --ha=false
```

Public API (via Vercel rewrites): `https://www.surelyplaced.com/api/...`  
Direct Fly URL: `https://surelyplaced-payments.fly.dev`

## Frontend env (surely-placed-fe)

```env
NEXT_PUBLIC_PAYMENTS_API_URL=http://localhost:8080
PAYMENTS_API_URL=http://localhost:8080
```

Production (Vercel) — browser uses same-origin `/api` (rewritten to Fly):

```env
NEXT_PUBLIC_PAYMENTS_API_URL=https://www.surelyplaced.com
PAYMENTS_API_URL=https://surelyplaced-payments.fly.dev
```

See `RAZORPAY-INTEGRATION.md` in the repo root for the full architecture.

## Webinar ops admin

Hidden frontend route: `/sp-webinar-ops`

Hardcoded login (override with env if needed):

\\\env
WEBINAR_ADMIN_EMAIL=webinar@surelyplaced.com
WEBINAR_ADMIN_PASSWORD=webinarSSG@123
\\\

Admin APIs (Bearer token from `POST /api/admin/login`):

- `POST /api/admin/webinars` � create webinar + Zoom meeting (OAuth creds only)
- `PATCH /api/admin/webinars/:id/seats` � change seat limits
- `GET /api/admin/attendees` � payments / Zoom status

Public: `GET /api/webinars/active` � seats + datetime for `/webinar` page.


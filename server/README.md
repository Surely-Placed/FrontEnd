# Surely Placed Payments API

Express + PostgreSQL + Knex payments backend for **PayPal** webinar checkout. Deployed on **Fly.io**.

## Quick start (local)

```powershell
cd server
# Edit .env.development with your Postgres + PayPal sandbox credentials

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
| GET | `/api/payments/config` | PayPal client id + mode for Buttons |
| POST | `/api/payments/orders` | Create PayPal order (`Idempotency-Key` required) |
| POST | `/api/payments/verify` | Capture after PayPal approval |
| GET | `/api/payments/orders/:id` | Order status |
| POST | `/api/webhooks/paypal` | PayPal webhook (raw body + transmission headers) |
| GET | `/api/webhooks/paypal/events` | Suggested webhook event list |

## Currency

All payments are **USD** only. Amounts are stored in **cents** (`$19.99` → `1999`).

## PayPal webhook events

Register these in PayPal Dashboard → Webhooks (also listed at `GET /api/webhooks/paypal/events`):

| Event | Action |
|-------|--------|
| `PAYMENT.CAPTURE.COMPLETED` | Mark order paid, store payment, Zoom register (webinar), send emails |
| `CHECKOUT.ORDER.COMPLETED` | Mark paid only if a COMPLETED capture id is present |
| `CHECKOUT.ORDER.APPROVED` | Logged only — capture happens via `/verify` |
| `PAYMENT.CAPTURE.DENIED` / `DECLINED` / `REFUNDED` / `REVERSED` | Update order status |

Public webhook URL: `https://api.surelyplaced.com/api/webhooks/paypal`

Set `PAYPAL_WEBHOOK_ID` to the **Webhook ID** from the PayPal dashboard (not the URL).

## Zoom webinar (paid-only access)

After a `webinar-live` order is marked **paid**, the API registers the buyer on Zoom and emails their unique portal join link.

### Zoom UI checklist

1. Zoom **Pro** (or higher) with registration-enabled meetings
2. Create a **Server-to-Server OAuth** app with meeting registrant scopes
3. Copy Account ID, Client ID, Client Secret into env

### Env vars

```env
ZOOM_ACCOUNT_ID=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
```

If these are missing, payment still succeeds; Zoom registration is skipped and logged. On Zoom API failure after pay, the team gets an alert email and the join link is omitted from the customer email until a retry succeeds (next verify/webhook while registrant is still missing).

## Deploy to Fly.io

```powershell
fly auth login
fly apps create surelyplaced-payments --org anurag-sarkar-254

fly secrets set `
  DATABASE_URL="postgresql://..." `
  DB_SCHEMA="surelyplaced" `
  PAYPAL_MODE="live" `
  PAYPAL_CLIENT_ID="xxx" `
  PAYPAL_CLIENT_SECRET="xxx" `
  PAYPAL_WEBHOOK_ID="xxx" `
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

fly certs add api.surelyplaced.com --app surelyplaced-payments
# Then add DNS A / AAAA records (see fly certs show)

fly deploy --app surelyplaced-payments --ha=false
```

Public API: `https://api.surelyplaced.com`  
Fallback Fly URL: `https://surelyplaced-payments.fly.dev`

Unset any leftover Razorpay secrets if they are still on Fly:

```powershell
fly secrets unset RAZORPAY_KEY_ID RAZORPAY_KEY_SECRET RAZORPAY_WEBHOOK_SECRET RAZORPAY_WEBHOOK_URL --app surelyplaced-payments
```

## Frontend env (surely-placed-fe)

```env
NEXT_PUBLIC_PAYMENTS_API_URL=http://localhost:8080
PAYMENTS_API_URL=http://localhost:8080
```

Production (Vercel):

```env
NEXT_PUBLIC_PAYMENTS_API_URL=https://api.surelyplaced.com
PAYMENTS_API_URL=https://api.surelyplaced.com
```

## Webinar ops admin

Hidden frontend route: `/sp-webinar-ops`

Hardcoded login (override with env if needed):

```env
WEBINAR_ADMIN_EMAIL=webinar@surelyplaced.com
WEBINAR_ADMIN_PASSWORD=webinarSSG@123
```

Admin APIs (Bearer token from `POST /api/admin/login`):

- `POST /api/admin/webinars` — create webinar + Zoom meeting (OAuth creds only)
- `PATCH /api/admin/webinars/:id/seats` — change seat limits
- `GET /api/admin/attendees` — payments / Zoom status

## Google Sheets (paid webinar registrations only)

Uses a **Google Apps Script web app URL** only (no service account).

After successful payment, one row is appended:

**Full Name | Email | Phone | Country | Current Status | Visa Status | Year Of Experience**

Phone includes country code and is written as text (no `#ERROR!`).

### Setup

1. Create a sheet with that header row (tab name `Webinar Registrations` optional)
2. Extensions → Apps Script → paste `server/scripts/google-sheets-apps-script.js`
3. Deploy → New deployment → **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the `/exec` URL into env:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
```

If unset, Sheets sync is skipped (payments still work).

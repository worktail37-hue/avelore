# AVELORE — Haute Parfumerie

A luxury fragrance house website: **Avelore**. Editorial, scroll-driven storefront for fine perfumery — collections, product pages, a scent-matching engine, an olfactory concierge, and enquiry/notification plumbing behind an Express server.

---

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 8, React Router 7 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animation | Motion, Lenis smooth scroll |
| Icons | lucide-react |
| Maps | `@vis.gl/react-google-maps` |
| Backend | Express 4 (TypeScript via `tsx`), Helmet, CORS |
| AI | `@google/genai` — olfactory concierge + scent matching |
| Auth / DB | Firebase Auth + Firestore |
| Notifications | Nodemailer (SMTP) and Twilio WhatsApp, both optional |

---

## Features

**Storefront**
- Hero with video poster, rotating badge, craftsmanship strip, category showcase
- Collections and product detail pages with quick-view modal
- **Scent Finder** — quiz that maps preferences to matching fragrances
- **Olfactory concierge** — Gemini-backed chat that recommends notes and products
- Scent-notes explorer, fragrance "works wheel", scent-vibe section
- Store locator with a Google Maps view, branch list, press & journal
- Search modal, custom cursor, lazy-loaded sections, SEO component per route
- Patron profile and private-consultation modals

**Server (`server.ts`)**
- Enquiry intake with validation, rate limiting and sanitised error responses
- Notification fan-out: SMTP email and/or Twilio WhatsApp, with a click-to-chat fallback when unconfigured
- Firestore submission trigger endpoint and auto-reply service
- Admin endpoints for notification and WhatsApp channel configuration
- Data-erasure endpoint (`/api/user/delete-data`) for GDPR-style requests

---

## Getting started

**Requirements:** Node.js 20+ (or Bun — a `bun.lock` is included).

```bash
npm install
cp .env.example .env.local     # then fill in the values below
npm run dev                    # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production bundle into dist/
npm run preview  # preview the built bundle
npm run lint     # tsc --noEmit
npm start        # run the Express server
```

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | For the concierge / scent matching | Server-side Gemini calls |
| `APP_URL` | Optional | Public base URL |
| `OWNER_EMAIL` | Optional | Where enquiry notifications are delivered |
| `OWNER_WHATSAPP_NUMBER` | Optional | Owner number for WhatsApp alerts |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER` | Optional | Twilio WhatsApp delivery |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` | Optional | SMTP email delivery |

If the notification credentials are absent the server falls back to a logged simulation plus a WhatsApp click-to-chat link, so the site still works in preview.

> **Never** prefix `GEMINI_API_KEY` with `VITE_` — that would expose it to the browser.

---

## Project structure

```
api/index.ts            Vercel serverless entry — re-exports the Express app
server.ts               Express API: enquiries, notifications, concierge, admin
src/
  pages/                Home, Shop, ProductDetail, CollectionDetail, About, Contact, NotFound
  components/           Hero, collections, scent finder, concierge, modals, SEO, …
  components/ui/        shadcn-style primitives
  services/             Firebase, notification service, data access
  data/siteData.ts      Products, collections, journal, branches
  seo/                  Per-route metadata helpers
  context/              Auth and shared state
public/                 Video, images, OG image, robots.txt, sitemap.xml, manifest
firestore.rules         Firestore security rules
firebase-blueprint.json Firestore schema description
security_spec.md        Threat model and hardening notes
README-SEO.md           SEO implementation notes
test/                   Security-rules tests
```

---

## Deployment (Vercel)

The repo ships with `vercel.json` and `api/index.ts`:

- `npm run build` produces the static bundle in `dist/`
- `api/index.ts` mounts the Express app so every `/api/*` route runs as a serverless function
- All other routes rewrite to `index.html` so React Router deep links work

Add `GEMINI_API_KEY`, SMTP and/or Twilio credentials under **Project → Settings → Environment Variables**, then deploy.

---

## Security notes

- No API keys are committed. `firebase-applet-config.json` contains the Firebase **web** config, which is public by design — access is enforced by `firestore.rules` and Firebase Auth.
- Helmet sets security headers; CORS is restricted; error responses are sanitised so stack traces and database details never reach the client.
- Firestore rules and the accompanying test file live in the repo; see `security_spec.md` for the threat model.
- `.env*` is git-ignored (`!.env.example` is kept).

---

## License

Private project. All rights reserved.

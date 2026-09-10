# Nimbus

**Quiet luxury fashion for Nigeria & West Africa.**

Nimbus is an internal product of **Billion Codes Company** — a dual-surface ecommerce experience (Next.js web storefront + Expo React Native mobile) with a shared catalog package, editorial design system, and guest checkout oriented around Paystack (NGN).

> **Status:** Pre-production demo / internal sample of record. Browse → PDP → bag → guest checkout → orders works end-to-end with a **mock Paystack** receipt. Not a production payment or inventory system yet.

---

## Product

| Surface | Stack | Role |
|--------|--------|------|
| **Web** | Next.js 16, React 19, Tailwind CSS 4 | Primary marketing + shopping storefront |
| **Mobile** | Expo 57, React Native, React Navigation | Native iOS/Android shopping experience |
| **Catalog** | Shared TypeScript package (`@nimbus/catalog`) | Products, categories, imagery, types |

**Market:** Nigeria / West Africa · **Currency:** NGN · **Catalog focus:** Fashion / lifestyle  
**Taxonomy:** Women · Men · New · Accessories (Sale = promo filter only)

### Demo flows

1. Browse editorial home & category grids  
2. Product detail (gallery, sizes, swatches)  
3. Bag / cart with qty controls  
4. Guest checkout (mock Paystack)  
5. Order confirmation & order history (client-persisted)

---

## Repository layout

```
nimbus/
├── apps/
│   ├── web/          # Next.js storefront
│   └── mobile/       # Expo React Native app
├── packages/
│   └── catalog/      # Shared product catalog & types
├── docs/
│   ├── design/       # Editorial design system (source of truth)
│   └── mobile/       # Parity & harden checklists
├── package.json      # Workspace root
└── .env.example
```

Design source of truth: [`docs/design/nimbus-editorial-brief-tight.md`](docs/design/nimbus-editorial-brief-tight.md)

---

## Prerequisites

- Node.js **20+**
- npm 10+ (workspaces)
- For mobile: Expo Go or iOS Simulator / Android emulator

---

## Quick start

```bash
git clone https://github.com/Billioncodes001/nimbus.git
cd nimbus
npm install

# Web (http://localhost:3000)
npm run dev:web

# Mobile (Expo)
npm run dev:mobile
```

Individual apps can also be installed and run from their directories (`apps/web`, `apps/mobile`) using local `file:` catalog links.

---

## Web deployment (Cloudflare Pages)

The live demo targets **Cloudflare Pages**.

1. Connect this repository in the Cloudflare dashboard (or via Wrangler).  
2. Build configuration (recommended for Node Next.js on Pages / Workers):

| Setting | Value |
|--------|--------|
| Root directory | `apps/web` (or monorepo root with filter) |
| Build command | `npm install && npm run build` |
| Output / framework | Next.js (OpenNext / `@opennextjs/cloudflare` when enabled) |

Until OpenNext/Workers adapter is wired, a static export path may be used for pure marketing demos — see `apps/web/next.config.ts`.

Environment: copy `.env.example` → Pages project environment variables as needed.

---

## Mobile distribution

Expo app is **source-ready** for internal testing (`expo start`). Production store builds (EAS) are **not** configured in this demo phase.

---

## Architecture notes

- **Catalog:** In-memory / package data (`packages/catalog`) — no external DB required for the current demo.  
- **Cart & orders (web):** Client persistence (`localStorage`).  
- **Payments:** Mock Paystack reference generation only — **no live charges**.  
- **Auth:** Guest checkout path; full auth is out of scope for this demo band.

### Production readiness (honest)

| Area | Demo | Production gap |
|------|------|----------------|
| UI / UX (web + mobile) | Strong editorial sample | Polish, a11y, perf budgets |
| Catalog | Static package | CMS / admin + Postgres API |
| Checkout | Mock Paystack | Live Paystack + webhooks |
| Orders | Client-side | Server of record + email |
| Auth | Guest only | Accounts, sessions |
| Infra | Local / Pages demo | Staging + prod, monitoring |
| Mobile | Expo Go | EAS + store listing |

Estimated path to production MVP (dual-surface): historically **~10–12 weeks** with Node/TS + Postgres + Paystack as plan of record.

---

## Security

- Do not commit `.env`, secrets, or real Paystack keys.  
- Treat mock receipts as non-financial.  
- Report security issues privately to Billion Codes Company.

---

## License

Proprietary — **UNLICENSED**. © Billion Codes Company. All rights reserved.

---

## Maintainers

Built by the Billion Codes Company agent pod under product direction.  
Repository: [github.com/Billioncodes001/nimbus](https://github.com/Billioncodes001/nimbus)

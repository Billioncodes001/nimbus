# Nimbus Web Storefront

Quiet-luxury West African fashion demo built with **Next.js App Router**, **TypeScript**, and **Tailwind CSS v4**. Shared product catalog lives in `@nimbus/catalog`.

## Run locally

```bash
cd /workspace/nimbus-v2/apps/web
npm install
npm run dev
```

Open **http://localhost:3000**

## Demo flows

1. **Browse** — Home → category (Women / Men / New / Accessories) → product cards  
2. **PDP** — Multi-image gallery (~55/45 layout), color swatches, size chips  
3. **OOS** — Lagos Linen Midi Dress · **XS + Teal** is out of stock (Add to bag disabled)  
4. **Bag** — Add to bag → `/bag` (persisted in `localStorage`)  
5. **Checkout** — Guest form → **Pay with Paystack** (mock, ~1.4s)  
6. **Confirmation** → **Orders** list → order detail  

## Brand tokens

| Token   | Value     |
|---------|-----------|
| bg      | `#F7F5F2` |
| surface | `#FFFFFF` |
| text    | `#1A1A1A` |
| muted   | `#6B6560` |
| border  | `#E8E4DF` |
| accent  | `#0F6B5C` |
| pressed | `#0A4F44` |

Trust bar: *Secure Paystack checkout · Easy returns · Ships across Nigeria*

## Structure

```
apps/web/src/
  app/           # routes: /, /category/[slug], /product/[slug], /bag, /checkout, /confirmation/[id], /orders, /orders/[id]
  components/    # Header, Footer, ProductCard, SizeChips, ColorSwatches, TrustBar, Button
  context/       # Cart + Orders (localStorage)
  lib/           # format helpers
packages/catalog/
  src/           # 13 products, variants, Unsplash 3:4 imagery, categories
```

## Notes / gaps

- Paystack is **mocked** (no real keys or API).  
- Cart & orders persist in browser `localStorage` only.  
- Search icon links to home browse; no full-text search yet.  
- Do not modify `apps/mobile` or `nimbus-sample` from this app.

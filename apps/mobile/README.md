# Nimbus Mobile (Expo)

Editorial premium guest demo: browse → PDP → cart → Paystack mock checkout → orders.

## Run

```bash
cd /workspace/nimbus-v2/apps/mobile && npx expo start
```

Open in Expo Go, iOS Simulator, Android emulator.

If port **8081** is busy (common in this workspace):

```bash
cd /workspace/nimbus-v2/apps/mobile && npx expo start --port 8083
```

Dev server verified on `http://localhost:8083` (iOS bundle OK).

## Typecheck

```bash
cd /workspace/nimbus-v2/apps/mobile && npx tsc --noEmit
```

## Catalog

Consumes shared `@nimbus/catalog` (`file:../../packages/catalog`) with Metro `watchFolders` + `extraNodeModules`. Imagery: Design Unsplash 3:4 set from `docs/design/nimbus-editorial-brief-tight.md`.

## Guest walkthrough

1. Shop → category chips (All / Women / Men / New / Accessories)
2. Product → gallery, labeled color swatches, size chips; OOS variant disables **Add to bag**
3. Bag → thumbs, variant, qty stepper, Checkout
4. Checkout → **Pay with Paystack** (stub) → confirmation → Orders

## Design

Tokens exact from editorial brief. One teal accent per screen (CTAs / selection). System UI fonts (no custom font files).

# Nimbus mobile harden checklist (nimbus-v2 → production)

Owner: Mobile Engineer · Review: Engineering Lead  
Status: working checklist (2026-09-10) — refine when Backend prod API contract lands  
Constraint: keep Metro `:8083` warm until cutover; do not break walkthrough mid-harden

1. **Shared data** — consume `@nimbus/catalog` only; no local product fork
2. **API wire** — replace in-app mock with Node API contract (catalog, orders, Paystack mock→real); env base URL
3. **Paystack** — hosted/WebView checkout; return/deep-link URLs on real devices; no card data on device
4. **OOS UX** — disabled chips not pressable; explicit “Out of stock” when combo OOS (parity with web)
5. **Design polish** — TrustBar copy; accent selection rings; tap targets ≥44; OOS color per brief
6. **Release** — EAS profiles, bundle IDs, app name Nimbus, icons/splash placeholders→final later
7. **Deep links** — order/receipt + Paystack return hosts (placeholders until brand domains land)
8. **QA** — guest browse→PDP→bag→Paystack→orders on device; inventory ceiling on qty if API provides stock
9. **Demo** — keep `:8083` warm until cutover; don’t break walkthrough path mid-harden

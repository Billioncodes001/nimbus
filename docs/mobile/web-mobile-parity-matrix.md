# Web ↔ Mobile parity matrix (harden SoT)

Eng owns web · Mobile Engineer owns mobile · 2026-09-10  
Parity = same behaviors/copy/catalog — not pixel-identical chrome.  
Hold harden until after walk/cutover; refine when Backend prod contract lands.

| Area | Web (`apps/web`) | Mobile (`apps/mobile`) | Shared |
|------|------------------|------------------------|--------|
| Catalog | `@nimbus/catalog` | same | packages/catalog only |
| Browse / nav | Women Men New Accessories | same | category slugs |
| PDP | gallery, size+color, sticky ATC | same | variant SKUs |
| OOS | disabled chip + **explicit Out of stock CTA/copy** | same (fix pressable chips) | inventory from API/catalog |
| Cart | thumbs, stepper, trust under CTA | same; qty ≤ stock when API provides | line = size+color |
| Trust copy | header strip (post-demo) + bag/PDP | TrustBar same string | “Secure Paystack checkout · Easy returns · Ships across Nigeria” |
| Checkout | guest fields → Paystack hosted | guest → Paystack WebView | same order payload |
| Orders | list + detail | list + detail | order ids/status |
| Money | ₦ NGN whole | ₦ NGN whole | formatNGN parity |
| Tokens | canvas #F7F5F2 accent #0F6B5C | same | Design brief |
| API | real Node API (replace mock) | same base URL/env | OpenAPI/contract |
| Auth | guest MVP; bought auth later | same | — |

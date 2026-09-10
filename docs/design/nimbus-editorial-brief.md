# Nimbus — Editorial premium visual brief (sample rescue)
**Same-hour ship** · Not a full design system · Web (Next.js) + Mobile (Expo) = one brand  
**Locked colors:** bg `#F7F5F2` · accent `#0F6B5C`

## Brand feel (one sentence)
Quiet luxury for West African fashion/lifestyle — editorial photography, generous whitespace, confident type, teal used sparingly like a seal of trust.

## Color (elevated use — hex unchanged)
| Token | Hex | How to use (elevate) |
| --- | --- | --- |
| bg | `#F7F5F2` | Full page/app canvas — never pure gray |
| surface | `#FFFFFF` | Cards, sheets, sticky bars — soft shadow optional `0 8 24 rgba(26,26,26,0.06)` |
| text | `#1A1A1A` | Headlines + body |
| textMuted | `#6B6560` | Meta, trust lines, captions |
| border | `#E8E4DF` | 1px hairlines only; prefer spacing over boxes |
| accent | `#0F6B5C` | Primary CTA fill, text links, selected ring — **one accent per view** |
| accentPressed | `#0A4F44` | Pressed/hover CTA |
| success | `#1B7A4E` | Paid / delivered |
| warning | `#C47E00` | Low stock sparingly |
| danger | `#C62828` | Errors only |

Accent rule: never decorate chrome with teal; teal = action + selection.

## Type (shared rhythm — web + mobile)
**Web (Next.js):** `Inter` (or `Geist`) for UI; optional display: same family at heavier weight — no novelty fonts.  
**Mobile (Expo):** System UI (`SF Pro` / Roboto) sized to match the scale below so both feel like Nimbus.

| Role | Size / line | Weight | Use |
| --- | --- | --- | --- |
| Display | 32 / 40 (web 40/48) | Semibold | Home hero, PDP title |
| Title | 22 / 28 | Semibold | Section heads, cart title |
| Body | 16 / 26 | Regular | Descriptions |
| BodyStrong | 16 / 26 | Semibold | Prices, CTA labels |
| Caption | 13 / 18 | Regular | Trust, meta, badges |
| Micro | 11 / 14 | Medium | Uppercase nav labels / eyebrow (`letter-spacing: 0.06em`) |

Price always BodyStrong; never smaller than body.

## Spacing & layout
- Base 4 · denser UI 8 · section rhythm **24 / 32 / 48** (editorial air)
- Screen/page gutter: **20** mobile · **24–32** web content column
- Max content width web: **1200** · PDP split web: media 55% / buy box 45%
- Radius: **16** cards · **12** inputs/chips · **999** pills only for filters
- Tap/click ≥ 44 · sticky ATC / checkout bar with safe-area padding

## Header / nav (shared IA)
- Wordmark **Nimbus** left (text logo, semibold, tracking tight)
- Nav: **Women · Men · New · Accessories** (Sale = filter chip, not top nav)
- Right: Search · Bag (count badge) · Account
- Mobile: wordmark + search + bag; categories as horizontal chips under header
- Hairline border under header OR 8px shadow when scrolled — not both heavy

## Trust bar
Slim bar under header or above footer: muted caption — e.g. “Secure Paystack checkout · Easy returns · Ships across Nigeria”  
No loud banners. One line max.

## Key screens (polish bar)

### Browse / home
- Optional editorial hero (one full-bleed image + short headline + Shop CTA)
- Category chips
- Product grid: 2-col mobile / 4-col web; **3:4** images; name 2-line clamp; ₦ price; no clutter icons on card

### PDP (critical)
- Gallery: large primary + thumb row (web side-by-side); mobile swipe + dots
- Title, ₦ price, short fabric/line desc
- **Color:** swatches 28–32px, selected = 2px accent ring + color name caption
- **Size:** roomy chips; selected = filled near-black or accent outline + label; OOS = struck + disabled
- Sticky ATC bar: price + Add to bag (accent fill, full width mobile)
- Size guide = text link stub

### Cart
- Lines with thumb, name, color/size, qty stepper, line ₦
- Order summary card: subtotal, shipping estimate line, total
- Primary Checkout CTA; secondary Continue shopping
- Trust caption under CTA

### Checkout
- Linear, uncluttered; “Pay with Paystack” primary
- Show total + email/address summary before redirect

### Orders
- Clean list; status pill (border + muted/success text, not rainbow)

## Cross-platform sameness checklist
Same hex · same type roles · same nav labels · same chip/swatch behavior · same 3:4 card ratio · same trust line voice · same CTA copy (“Add to bag” / “Checkout” / “Pay with Paystack”)

## Explicitly still out
Full component library · custom logo mark · motion system · dark mode · real photography shoot

## Eng apply order (this hour)
1. Theme tokens file (web + Expo) from table above  
2. Header + trust bar  
3. Product card + PDP gallery/variants/sticky ATC  
4. Cart quality pass  
5. Quick AA check: accent on white, text on bg

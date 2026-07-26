# CB Dejvice Sanctuary — Design System

v1.0 · 2026-07-26 · for the fundraising chain: email → 1-page brochure (PDF) → landing page → donation CTA

---

## Design language

The system is built out of the building, not out of a nonprofit template. Three things in the renders do all the work: the **white perforated stone screen** with a pointed-arch void cut into it that fronts the new entrance, the **grey vertical ribbing** on the sanctuary's walls, and the **pale oak** of the seating under a skylight. Those become, respectively: the perforation texture that fills the unfunded remainder of the progress bar (what has been given is solid stone; what remains is still open to the light), the thin ribbed rule that marks the start of each section, and the cream tints that warm every ground that isn't paper. Everything else is restraint — paper-white grounds, ink for every word, a single gold button that appears nowhere else on the page, and no motion beyond a colour transition. This is a church asking humbly, so the design's job is to be dignified and get out of the way of the renders.

**The one risk:** the progress bar is a perforated wall rather than a bar or a thermometer. It is justified because it is literally the façade of the thing being paid for, and because it lets the graphic say "unfinished" without saying "urgent".

---

## Files

| File | What it is |
|---|---|
| `tokens.css` | Every colour, type, space, radius, shadow and texture token. The single source of truth. Import it; do not fork it. |
| `foundations-colors.html` | Swatches, hex values, usage notes, verified contrast table, approved pairings, forbidden colours. |
| `foundations-type.html` | Raleway specimen: full scale, weights, Czech diacritics, tabular figures, in-situ pairing. |
| `components-buttons.html` | Primary (gold), primary-on-ink, secondary, ghost, inline link. All states. Label voice. |
| `components-progress.html` | The fundraising progress bar. Default, compact, on-ink and print variants. |
| `components-cards.html` | Giving-details card (bank + QR), info cards, stat cards, verse block. |
| `blocks-hero.html` | Sticky header with persistent Give button, two-column desktop hero, 390px mobile hero, image slot inventory. |
| `blocks-sections.html` | Section header, before/after pair, dated timeline, footer. |

Every preview file carries a first-line `<!-- @dsCard group="…" -->` marker and links `tokens.css` from the same folder.

---

## Token reference

### Colour

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#264653` | Every word. Dark panels. Button label on gold. 10.1:1 on paper. |
| `--color-gold` | `#E9C46A` | The CTA fill, the progress fill, accent rules. Never text on paper. |
| `--color-gold-light` | `#FFD56E` | Hover lift on the primary button; the lit edge of the gold gradient. |
| `--color-paper` | `#FFFFFF` | The default ground. |
| `--color-ink-900 / -800 / -600` | `#16303A` `#1E3C47` `#3A6272` | Pressed / hover / dividers on ink surfaces. |
| `--color-ink-muted` | `#5A7480` | Secondary body copy. 4.96:1 — AA at any size. |
| `--color-ink-faint` | `#93A6AE` | Captions, credits, disabled. Not body copy. |
| `--color-gold-deep` | `#C9A24E` | Hairline gold: button borders, inline-link underlines. Still not text. |
| `--color-oak-300 / -200` | `#E7D3A8` `#F2E4C4` | Warm borders; verse and giving-card fills. |
| `--color-cream-100 / -50` | `#FAF3E4` `#FDFAF4` | Warm section grounds. |
| `--color-stone-500 → -100` | `#8E948F` `#C9CCC6` `#E2E4DF` `#F2F3F0` | Rib lines, borders, cool grounds, image placeholders. |
| `--color-facade-terracotta` | `#E08A62` | **Reference only.** The existing house in the renders. Never a UI colour. |

Semantic aliases (`--surface`, `--text`, `--border`, `--accent`, `--focus-ring`, …) sit on top; use those in components.

**Contrast, verified:** ink/paper 10.1 · ink-muted/paper 4.96 · ink/gold 6.1 · gold/ink 6.1 · **gold/paper 1.7 — never**.

**Banned:** `#E76F51` and any "cred" value (inferred from a malformed hex in the site CSS, unconfirmed by the client); `#1E87F0` from the legacy `logo.svg`; any red/green status hue.

### Type — Raleway only

| Role | Size | Weight | Leading | Tracking |
|---|---|---|---|---|
| Display | 40 → 64px | 600 | 1.06 | −0.022em |
| H1 | 32 → 42px | 600 | 1.14 | −0.016em |
| H2 | 24 → 30px | 600 | 1.22 | −0.01em |
| H3 | 19px | 600 | 1.34 | −0.004em |
| Body large | 18px | 400 | 1.62 | 0 |
| Body | 16px | 400 | 1.66 | 0 |
| Small | 14px | 400 | 1.55 | +0.004em |
| Eyebrow | 12px | 600 | 1.2 | +0.18em, uppercase |
| Figure | 28 → 38px | 700 | 1.0 | −0.02em, tabular |

Loaded from `https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap`. Self-hosted WOFF2 subsets are in `../Brand/fonts/`; a commented `@font-face` block at the foot of `tokens.css` switches to them. **The Czech build must load `latin-ext`** or ě š č ř ž ů fall back mid-word.

The wide-tracked uppercase eyebrow is the only echo of the Novecento Wide logo wordmark — it gets that flavour without licensing a commercial face. Measure caps at `--measure` (64ch) for body, `--measure-tight` (52ch) for leads.

### Space, radius, shadow

- Space: 4px base, `--space-3xs` (2px) → `--space-5xl` (128px). Section padding `--section-pad-y` is fluid 48 → 96px; page gutter `--gutter` is fluid 20 → 40px. Containers: `--container` 1152px, `--container-text` 672px.
- Radius: `--radius-xs` 2px · `sm` 4px · `md` 8px · `lg` 14px · `pill` 999px, plus **`--radius-arch`** — the segmental top-radius that quotes the pointed-arch glazing. One arched image per page.
- Shadow: `--shadow-xs → -lg`, all tinted `rgba(38,70,83, …)`. Cards are flat at rest; shadow means "this lifts".
- Texture: `--pattern-perforation` (+`-stone`) and `--pattern-ribbing` (+`-warm`).
- Motion: `--duration-fast/base/slow` with `--ease`. All three collapse to 1ms under `prefers-reduced-motion`.

---

## Per-component guidance

### Buttons
One gold button per screen. Primary is **ink label on gold** (`.cb-btn--primary`); inside the ink footer use **gold label on ink** (`.cb-btn--primary-on-ink`). Secondary is an ink outline that inverts on hover; ghost is for tertiary actions only. Keep the `--color-gold-deep` border on the primary — it is what makes the button survive greyscale print. Landing page gets three in-page buttons maximum (hero, giving tiers, after the trust block) plus the sticky header. Label the act in the church's voice: *Give to the Sanctuary*, *Give monthly*, *Read the project detail*, *Přispět na modlitebnu*. No "Donate now", no deadline language.

### Progress
Set `--pct` on `.cb-progress` and nothing else reads a number. Four variants: default (landing), `--compact` (email, brochure sidebar, header strip), `--on-ink` (trust panel/footer), `--print` (PDF and photocopy — full ink outline on the gold, stone perforation). Always expose `role="progressbar"` with real `aria-value*` and a spoken `aria-valuetext`. Never animate beyond the single width transition.

**Two content questions must be answered before this ships:** (1) the USD figures assume 21 CZK/USD — confirm the rate and rounding; (2) confirm whether 14M is *committed/pledged* or *received*, and label it accordingly. A US donor reads those very differently.

### Cards
Three types only. The **giving-details card** is cream with a warm border and reproduces the published Czech transfer details character for character — account `1031051032/5500`, variable symbol `5061999`, message `Na modlitebnu` — with the Paylibo QR beside them (download and embed it; do not hot-link in print). **There is no US giving route in the source material** — build the US card with the same layout and leave its rows as explicit blanks until the operator confirms a 501(c)(3) fiscal sponsor or partner agency. Do not present the Czech account as the US path. **Info cards** carry one fact each; only linked cards get hover lift. **Verse block** is italic Raleway with a ribbed leading rule, one per artefact, placed before the ask and never as the ask.

### Hero
Two columns on desktop (copy left, rendering right), stacked on mobile with the image cropping to a 16:9 banner above the copy. Hero image is `12_sanctuary-from-main-entrance.jpg`; `16_sanctuary-from-last-row.jpg` is the warmer alternate and the better email header. **Never overlay the headline on a render** — they are pale and low-contrast, and a scrim kills the light that makes them worth showing. The header keeps the Give button visible after the nav collapses.

### Sections
Alternate grounds paper → cream → paper → stone; the footer is the only ink panel. Section headers open with a 56px run of ribbing, then the eyebrow with the arch mark, then the title. The **before/after pair** (`01_current-building-exterior-photo.jpg` / `02_proposed-design-overlay-on-photo.jpg`) must use an identical crop and size — only the building may differ. The **timeline** uses real dates as markers, not 01/02/03, because the dates (permit granted 17 Jul 2025, congregation voted 5 Oct 2025) are the credibility argument. It goes stale: re-check cb6.cz/modlitebna before each publication. Footer carries `modlitebna@cb6.cz` (project), `hospodar@cb6.cz` (tax receipts) and `cb6.cz/modlitebna` — and nothing else.

---

## Print notes — brochure PDF

**Page sizes.** Produce both: **US Letter (8.5 × 11 in / 216 × 279 mm)** for the US mailing and **A4 (210 × 297 mm)** for the Czech version. They differ by 6 mm in width and 18 mm in height, so do not scale one into the other — build the layout inside a **common safe area of 190 × 250 mm** centred on the page, and let the margins absorb the difference. Bleed 3 mm if it goes to a commercial printer; none if it is only ever a downloaded PDF.

**Gold on white needs care.**
- `#E9C46A` on white is 1.7:1 and prints as a pale wash. **Every gold fill gets a `#C9A24E` or `#264653` hairline outline** (0.5pt minimum) so it holds an edge on an office laser printer and survives a black-and-white photocopy.
- No gold text at any size on white. In print, gold text is also a registration risk on cheap presses.
- Use `.cb-progress--print` for the progress bar: it swaps to a full ink outline on the fill and the stone perforation on the remainder.
- CMYK conversions to specify: `#264653` ≈ **C86 M60 Y47 K35**, `#E9C46A` ≈ **C8 M22 Y65 K0**. Confirm against the printer's profile before the final run; these are conversions, not brand-authored values.

**Fonts.** Raleway is SIL OFL 1.1 — free to embed in a PDF. Embed the subset, and embed `latin-ext` for the Czech version. If the toolchain needs static TTF/OTF rather than the variable WOFF2s in `../Brand/fonts/`, pull them from fonts.google.com/specimen/Raleway.

**Images.** The 2025 renders top out at 1920px — about **160 mm wide at 300 dpi**. That is fine for a half-page image inside the safe area and *not* fine for a full-bleed page. `01` and `02` (the before/after pair) are ~3950px and print at any size. If the brochure needs a full-page render, request the architect's originals from modlitebna@cb6.cz first. Permission to reuse the images is assumed from the client relationship but is undocumented — get it in writing before publication.

**Logo constraints (from BRAND NOTES §3 and §6).**
- `logo-var1.png` is 514 × 118 px and the wordmark is **white** — it is a dark-background asset and is invisible on paper. `logo-var1.svg` is white throughout *and* its wordmark is live text in **Novecento Wide DemiBold**, a commercial font that will substitute on any machine that lacks it.
- Consequences: on light grounds, house the logo in an ink plate (see the header and footer in `blocks-hero.html`), or use `favicon.png` — the gold mark alone, 96 × 96 px, no wordmark — as a small standalone symbol.
- 514 px caps the logo at roughly **40 mm wide** in print. Do not place it larger.
- **Ask the client for:** a vector logo with the text converted to outlines, in (a) full colour on light, (b) reversed on dark, (c) mark only. Until that arrives, the ink-plate treatment is the correct workaround, not a compromise to be quietly ignored.

**QR.** Generate once from the Paylibo endpoint the church already uses, at 440px or larger, and embed the file. Print it at **20 mm minimum** with a clear quiet zone. Do not hot-link it in a PDF.

---

## Open items for the operator

1. **US giving route.** No 501(c)(3) fiscal sponsor or partner agency is documented. The giving card and the trust block both have a hole in them until this is answered, and it is the single biggest friction point for a US donor.
2. **USD conversion.** The system uses 21 CZK/USD as a placeholder. Confirm the rate and whether USD figures should appear at all.
3. **"Committed" vs "received".** 14M Kč needs the right word.
4. **Print-resolution logo and image permission.** Both listed above; both are requests to the client.

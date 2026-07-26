# CB Dejvice — Brand Assets

Collected 2026-07-26 from https://www.cb6.cz/ via HTTP only (curl). No browser rendering used.
Site stack: Next.js (pages router, build `mz3x5D2keuQW6rG9TY3nk`) + Tailwind CSS v4, content from a Directus CMS at `content.cb6.cz`.
Source stylesheet: `https://www.cb6.cz/_next/static/css/aded03f5ddb4c100.css` (single bundle, no other CSS files).

---

## 1. Colour palette

Defined as Tailwind theme tokens in the site stylesheet. These are the only non-default (non-Tailwind-stock) colours in the whole bundle.

| Token | Hex | Where it is used |
|---|---|---|
| `--color-logo-100` | `#E9C46A` | **Primary brand gold.** The mark in the logo. Utility `.bg-logo-100`; used on the homepage and on `/modlitebna` for section/accent blocks. Also duplicated as `--color-cyellow`. |
| `--color-logo-200` | `#FFD56E` | Lighter gold, used alongside `logo-100` as a second accent block (`.bg-logo-200`) on the homepage and `/modlitebna`. |
| `--color-cblue` | `#264653` | **Deep teal-navy.** Dark background panels (`.bg-cblue`, twice on homepage) and heading/emphasis text on `/modlitebna` (`.text-cblue`). This is the natural "ink" colour of the brand. |
| `--color-cyellow` | `#E9C46A` | Same value as `logo-100`; used once on the homepage (`.bg-cyellow`). |
| `--color-cred` | `#E76F5` *(malformed)* | Declared as a 5-digit hex, so the `.bg-cred` rule is invalid CSS and never renders. Almost certainly intended to be **`#E76F51`** — `#264653` + `#E9C46A` + `#E76F51` is the well-known "Persian green / charcoal / sandy brown / burnt sienna" palette. Treat `#E76F51` as an *unconfirmed* tertiary accent; do not use without asking the client. |
| — | `#5EA3C6` | One-off arbitrary Tailwind value `bg-[#5EA3C6]` (mid blue). Appears twice in the bundle; a single component's background, not a theme token. Low confidence as a brand colour. |
| `--color-white` / `--color-black` | `#FFF` / `#000` | Stock. |
| — | `#1E87F0` | Fill colour inside `logo.svg` (see below). Legacy/leftover asset colour, **not** part of the live palette. |

Everything else in the stylesheet is stock Tailwind v4 (`gray-*`, `yellow-*`, `green-*`, `slate-*`, … in `oklch()`), i.e. framework defaults, not brand decisions.

**Recommended working palette for the fundraising chain:** ink `#264653`, primary accent `#E9C46A`, light accent `#FFD56E`, paper `#FFFFFF`.

Extra colours to be aware of, taken from the architectural renders (not from CSS): the existing building facade is a terracotta/salmon (~`#E08A62`), the new sanctuary volume is off-white perforated stone with pale-oak seating and grey ribbed wall panelling. The gold `#E9C46A` sits comfortably against those renders.

---

## 2. Typography

### Body / UI — Raleway
- Loaded from Google Fonts: `https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap`
- Declared in CSS as `--font-sans: "Raleway", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, …`
- Weights actually requested: 400 / 500 / 600 / 700, roman and italic.
- **Licence: SIL Open Font Licence 1.1** (Google Fonts). Free for print, PDF embedding and web.
- Files downloaded to `fonts/` — Raleway is served by Google as a **variable** font, one WOFF2 per unicode subset:
  - `Raleway-variable-normal-latin.woff2`, `-latin-ext`, `-cyrillic`, `-cyrillic-ext`, `-vietnamese`
  - `Raleway-variable-italic-…` (same five subsets)
  - `raleway-google.css` — the original `@font-face` CSS with `unicode-range` declarations, so it can be self-hosted verbatim.
  - **For the Czech version you need `latin-ext`** (ě š č ř ž ů). For English-only output `latin` is sufficient.
- If you need static TTF/OTF instead (e.g. for InDesign or a PDF toolchain), download from https://fonts.google.com/specimen/Raleway — not fetched here.

### Monospace
`--font-mono` is the stock system stack (`ui-monospace, SFMono-Regular, Menlo, …`). No brand mono.

### Logo wordmark — Novecento Wide DemiBold
- The text in `logo-var1.svg` is *live text*, not outlines, set in `font-family: 'Novecentowide-DemiBold', 'Novecento wide'` at `font-weight: 650`.
- **Novecento (Synthview Type Design) is a commercial font — NOT free, not on Google Fonts.** Available via MyFonts / Adobe Fonts.
- Consequence: `logo-var1.svg` will render with a substituted fallback font on any machine without Novecento installed. **Use `logo-var1.png` (rasterised) for the brochure/landing page**, or ask the client for the original vector with outlines converted.
- Free-ish visual substitutes if a wordmark must be re-set: Montserrat Alternates ExtraBold, Josefin Sans Bold, or Poppins SemiBold with wide tracking. None is an exact match.

### No custom @font-face
The site stylesheet contains **zero `@font-face` rules** and there are no `.woff/.woff2/.ttf` files hosted on `cb6.cz`. All webfont loading is via Google Fonts. Nothing custom to retrieve.

---

## 3. Logo files (in this folder)

| File | Size | Description |
|---|---|---|
| `logo-var1.png` | 514 × 118 px, RGBA | The live site logo (referenced on every page via Next.js image optimiser, `/images/logo-var1.png`). Horizontal lockup: **gold `#E9C46A` mark on the left + white wordmark "DEJVICE / CÍRKEV BRATRSKÁ" on the right.** The mark is an open book / two banner shapes forming a cross, with a gold bar beneath. **The wordmark is white, so this file is invisible on a white background — it is a dark-background asset.** Only 514 px wide; too low-res for print at any size above ~40 mm. Request a vector or high-res original from the client for the PDF. |
| `logo-var1.svg` | vector | Same lockup, but **entirely white** (mark included — `fill: white` on every path). Dark-background-only. Wordmark is live text in Novecento Wide DemiBold (see typography caveat). This is the file to recolour if you need a `#264653`-on-white or gold-on-white version: change `fill:white` and convert the text to outlines. |
| `favicon.png` | 96 × 96 px, RGBA | The mark alone, in gold `#E9C46A` / `#FFD56E`, no wordmark. Cleanest available standalone symbol. Small. |
| `logo.svg` | 154 × 154 px vector | A solid blue (`#1E87F0`) circle with a white lowercase "c". Present at `/images/logo.svg` but **not referenced anywhere on the live site** — appears to be a leftover/legacy or template asset. Do not use. |

Probed and confirmed 404 (no other variants exist at `/images/`): `logo-var2/3/4`, `logo.png`, `logo-white`, `logo-black` in png/svg/jpg.

---

## 4. Sanctuary design images

`/modlitebna` is **server-rendered** (Next.js `getServerSideProps`) — all image URLs and their Czech captions are present in the static HTML and in the embedded `__NEXT_DATA__` JSON. No browser was needed.

All 16 gallery images downloaded at **original resolution** (no `?key=gallery` transform) to
`../Modlitebna Images/`. Source pattern: `https://content.cb6.cz/assets/<uuid>` (Directus).

| File | Original px | Czech caption on site | Description |
|---|---|---|---|
| `01_current-building-exterior-photo.jpg` | 3948 × 2954 | Pohled na aktuální stav budovy | Photograph of the existing building at Evropská 88 today, seen across the street. The "before". |
| `02_proposed-design-overlay-on-photo.jpg` | 3949 × 2954 | Zákres navrhovaného cílového stavu | The same photograph with the proposed sanctuary rendered into it — terracotta main house plus the new white perforated-stone entrance volume with its pointed-arch glazing. **Strongest single "before/after" asset; pairs with 01.** |
| `03_exterior-street-view-render.jpg` | 960 × 540 | Pohled z ulice | Close-up render of the street frontage: new white entrance pavilion, glass doors, steps, and the wall lettering "CÍRKEV BRATRSKÁ DEJVICE". Best shot of the *public, welcoming presence* argument. Low res (960 px) — screen only. |
| `04_foyer-toward-cafe-and-hall.jpg` | 960 × 540 | Foyer. Vlevo vstup do kavárny, rovně pohled do sálu. | Foyer interior; café entrance on the left, view through to the hall ahead. |
| `05_foyer-toward-evropska-street.jpg` | 960 × 540 | Foyer. Pohled směrem k Evropské. Vpravo pohled do kavárny, nahoře okno do místnosti pro besídku. | Foyer looking back toward Evropská Street; café to the right, children's-programme room window above. |
| `06_foyer-view-into-cafe.jpg` | 960 × 540 | Foyer. Pohled do kavárny. | Foyer, looking into the café. |
| `07_cafe-toward-foyer.jpg` | 960 × 540 | Kavárna. Pohled do foyer. Vlevo průhled do sálu. | From inside the café back out to the foyer, with a glimpse into the hall on the left. |
| `08_floorplan-cafe-and-hall.png` | 3450 × 2772 | Půdorys kavárna + sál | Floor plan drawing: café + main hall level. |
| `09_floorplan-first-floor-flat-and-garden.png` | 3450 × 3080 | Půdorys byt 1.p a zahrada | Floor plan drawing: first-floor flat and garden level. |
| `10_floorplan-sanctuary-hall.jpg` | 1920 × 1080 | Půdorys sálu modlitebny | 2025 plan of the sanctuary hall itself. |
| `11_section-drawing-sanctuary-hall.jpg` | 1920 × 1080 | Řez sálu modlitebny | Cutaway section render — **the clearest visual proof that the sanctuary sits below ground**, tucked under the existing house. Directly supports the "largely underground, hence costly" point in the copy. |
| `12_sanctuary-from-main-entrance.jpg` | 1920 × 1080 | Pohled do modlitebny od hlavního vchodu do sálu | Interior of the finished sanctuary from the main door: rows of pale oak chairs, ribbed grey walls, vaulted white ceiling ribs, a slim black cross lit by a skylight. **Hero-quality image.** |
| `13_sanctuary-from-stage-preacher-view.jpg` | 1920 × 1080 | Pohled do sálu z podia. Jak uvidí modlitebnu kazatel | The preacher's view from the platform, out over the seating. |
| `14_sanctuary-from-stage.jpg` | 1920 × 1080 | Pohled do sálu z podia | Second view from the platform (near-duplicate of 13, slightly different angle). |
| `15_sanctuary-from-rear-of-hall.jpg` | 1920 × 1080 | Pohled ze zadní části sálu | Sanctuary seen from the back of the hall. |
| `16_sanctuary-from-last-row.jpg` | 1920 × 1080 | Pohled z poslední řady | Seated eye-level view from the last row toward the cross and platform. Warm and human; good secondary hero. |

Notes on the set:
- Images 03–07 are from the **March 2024** design round (960 × 540, low res). Images 10–16 are the **September 2025** round (1920 × 1080) and reflect the current design going into the building-permit documentation. Where they conflict, prefer the 2025 renders (10–16).
- Nothing in the set is larger than 1920 px on the 2025 renders. For a print PDF at 300 dpi that caps a full-bleed image at roughly 160 mm wide. **If the brochure needs a full-page render, ask the client (modlitebna@cb6.cz) for the architect's originals.**
- All images are the church's / their architect's property. Permission to reuse is assumed from the client relationship but has not been documented — worth confirming in writing before publication.

---

## 5. Other useful facts picked up while scraping

- Donation account for the sanctuary project, published on `/modlitebna`: **1031051032/5500**, variable symbol **5061999**, message "Na modlitebnu". Tax receipts via `hospodar@cb6.cz`. Project questions to `modlitebna@cb6.cz`.
- The homepage already generates Czech QR-payment codes via the Paylibo API, e.g.
  `https://api.paylibo.com/paylibo/generator/czech/image?compress=false&size=440&accountNumber=1031051032&bankCode=5500&currency=CZK&vs=5061999&message=Na+modlitebnu`
  — this is a working QR generator for the sanctuary fund and could be reused for the Czech brochure. (A US-donor QR will need a different destination.)
- `/modlitebna` project timeline (Czech, useful for credibility copy): building-permit project preparation started Oct 2025; 5 Oct 2025 members voted 100% of those present to continue; 17 Jul 2025 valid zoning decision (`územní rozhodnutí`) in hand; application filed 29 Jun 2024.

---

## 6. Not retrieved / open items

- **No print-resolution logo.** Best raster is 514 × 118 px; best vector (`logo-var1.svg`) is white-only and depends on a commercial font for its wordmark. Request from client: vector logo with text outlined, in (a) full colour on light, (b) reversed on dark, (c) mark-only.
- **Novecento Wide DemiBold** (logo wordmark) is a paid font and was not obtained.
- **No brand guidelines document** exists on the site; the palette above is reverse-engineered from the compiled Tailwind theme, not from a stated brand standard.
- `--color-cred` is malformed in the source CSS, so the intended third accent colour is inferred, not confirmed.
- Raleway static TTF/OTF files not downloaded (only the Google variable WOFF2 subsets). Grab from fonts.google.com if a desktop-publishing workflow needs them.
- The `content.cb6.cz` asset host presents a certificate issued for `bracelab.cz`; `curl` accepted it but Python's bundled CA store rejected it. Downloads succeeded — noting only in case a later tool chokes on it.

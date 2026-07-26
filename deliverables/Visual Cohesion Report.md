---
title: Visual Cohesion Report — CB Dejvice Fundraising Landing Pages
scope: Visual cohesion only (copy correctness out of scope)
pages:
  - EN: https://cb6-en.vercel.app
  - CZ: https://cb6-cz.vercel.app
date: 2026-07-27
---

# Visual Cohesion Report — CB Dejvice Fundraising Pages

Both pages returned 200 OK and loaded successfully. No down pages.

## Testing environment caveats (read before the findings — these are tooling limits, not site bugs)

- **Desktop viewport**: `resize_window` to 1440x900 silently failed to actually constrain the browser; the real rendering viewport for the desktop pass was **1920x911** (confirmed via `window.innerWidth`/`innerHeight`). Anywhere a finding depends on viewport width (e.g. blank right-column space), it's called out as viewport-dependent and should be re-checked at true 1440px.
- **Mobile viewport**: tested via a same-origin iframe harness at 390x844, per instructions (Chrome-on-Windows enforces a ~500px minimum window width). No horizontal-overflow, tap-target, or type-size finding below is an artifact of the harness — confirmed with `scrollWidth === clientWidth` checks on the iframe's own document for both languages.
- Both sites use scroll-reveal fade-in animations. Jumping the scroll position programmatically (instead of natural scrolling) sometimes left content mid-fade or produced a stale screenshot frame for several seconds. This was reproduced repeatedly and confirmed via computed-style checks (`opacity: 1` on the actual DOM even when the screenshot looked blank) — it's a testing artifact, not a rendering defect on the live site.

---

## Desktop (actual viewport 1920x911)

### EN — PASS with issues
### CZ — PASS with issues (identical structure to EN)

**Ranked issues (apply to both languages — shared components, confirmed pixel-identical):**

1. **[MED] Image treatment — "Built underground" / "Stavíme pod zemí" block.** The architectural section-drawing image (alt text: *"Section drawing showing the sanctuary hall built below ground, beneath the existing building"*) is roughly half solid black fill within its frame — a harsh, flat black rectangle beneath the cutaway illustration. Every other image on the page is a softly-cropped, arch-topped color photograph or render; this one reads as an unfinished/placeholder asset next to them, breaking image-treatment consistency. Confirmed identical on EN and CZ.
2. **[LOW] Whitespace at ultra-wide viewport.** At the actual tested width (1920px), the "Where we stand" stats table and the FAQ ("Questions people ask" / "Na co se lidé ptají") leave a large unused right-hand region (~40–50% of viewport width) with no visual counterweight — noticeably more empty than the hero or card-row blocks, which use the container width more fully. This is very likely proportionally smaller at the intended 1440px and may not be a real issue there — **recommend re-checking at true 1440px** before treating as a fix item.
3. Progress bar renders correctly and on-brand: gold fill only, ink text, accurate proportion (14M/54M ≈ 26%). **PASS.**
4. Palette discipline holds: gold appears only on CTAs, progress fill, and thin rule/mark accents; no gold body text or large gold-on-white blocks found anywhere on either page. **PASS.**
5. Raleway is evident throughout with no fallback-font/FOUT observed in final renders. **PASS.**
6. Ink (#264653) footer panel is consistent and matches pixel-for-pixel between languages. **PASS.**
7. Block-to-block ground alternation (paper white → light warm gold → cool grey) reads clean, no jarring transitions apart from item 1 above. **PASS.**
8. Arch-top motif is consistent across the hero photo and the "Today/Proposed" comparison photos on both languages. **PASS.**

---

## Mobile (390x844, iframe harness)

### EN — PASS with issues
### CZ — PASS with issues

**No horizontal overflow on either page** (`document.documentElement.scrollWidth === clientWidth`, confirmed 371/371 EN and 386/386 CZ). Type sizes are readable, tap targets (CTA pills, FAQ rows) are comfortably sized, hero legibility is good, and the sticky header keeps the Give button visible within the first scroll on both languages.

**Ranked issues:**

1. **[MED] Stats table overflows its card on mobile — "Where we stand" / "Kde stojíme."** The CZK/USD comparison table (Project cost / Committed by members / Remaining need) does not fit in 390px width and scrolls horizontally *inside its own card*, with a visible native scrollbar and truncated values at the edge (e.g. "$2.55 mil...", "$660,..."). The USD column is effectively hidden until the user notices and drags the inner scrollbar — no visual affordance (like a fade edge or arrow) hints that it's scrollable. Confirmed identical on EN and CZ. This is the single highest-priority fix: it hides real information (the USD equivalents) behind an undiscoverable interaction.
2. **[LOW-MED, EN vs CZ divergence] Sticky header CTA wraps to two lines in Czech only.** "Help build the sanctuary" fits on one line inside the sticky pill button (EN). "Pomozte postavit modlitebnu" wraps to two lines in the same pill (CZ), making the CZ sticky header visibly taller and the button more oval/rounded than its EN counterpart. Zoomed screenshot confirms this clearly. Since the sticky header is persistent on every scroll position, this is a constant, low-grade inconsistency between the two "identical" sites rather than a one-off.
3. Cards, comparison images, giving-details card, and FAQ all stack cleanly single-column with consistent spacing rhythm on both languages. **PASS.**
4. Footer renders identically (ink panel, same content structure, correct diacritics) on both languages. **PASS.**

---

## EN vs CZ consistency diff

The two sites are structurally identical — same nine blocks in the same order, same imagery, same footer, same FAQ question count and order. Diacritics (ř, ě, ů, á, í, ý, č, š, ž) render correctly and crisply everywhere checked, including headings ("Každou neděli odcházíme", "Stavíme pod zemí", "Na co se lidé ptají"). No broken-image, overlapping-text, or fallback-font defects were found on either language.

Two real divergences were found between the language versions:

1. **QR payment code present only on CZ.** The CZ giving-details card includes a "QR platba" QR-code graphic (top-right of the card on desktop, stacked below the fields on mobile) that has no equivalent element in the EN card — EN lists only Bank / Account / Payment Reference / Message. This is a sensible localization (QR bank transfers are a Czech convention, less relevant to international donors) but it does mean the "giving details" block is not laid out identically between the two "identical" sites — worth a conscious sign-off rather than an accidental gap.
2. **Sticky CTA button height differs on mobile** (see Mobile issue #2 above) — a direct consequence of Czech copy length, not a code bug, but visible every time a CZ mobile visitor scrolls.

---

## Overall cohesion verdict

**PASS with issues.** Both pages are visually cohesive, on-brand (ink/gold/paper palette discipline held everywhere, Raleway consistent, arch motif consistent), and structurally near-identical between languages. Nothing found rises to a launch-blocking defect. Three items are worth fixing before the campaign goes wide, in priority order:

1. Mobile stats table horizontal overflow/truncation (hides real USD figures behind an undiscoverable scroll — MED priority, both languages).
2. The black-filled section-drawing image in "Built underground" (image-treatment inconsistency — MED priority, both languages, though the alt text suggests the black fill may be an intentional "underground" visual metaphor that just reads harsh next to the photographic imagery elsewhere).
3. CZ mobile sticky-CTA two-line wrap (LOW-MED priority, CZ only).

One item needs a follow-up check rather than a fix: whitespace balance in the stats/FAQ blocks at the *actual* intended 1440px desktop width (this report tested at 1920x911 due to a tool/resize limitation).

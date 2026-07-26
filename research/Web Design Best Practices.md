# Web Design Best Practices — Donation Landing Pages

Research for the CB Dejvice fundraising chain (email → 1-page PDF brochure w/ QR → landing page → donation CTA).
Compiled 2026-07-26. Sources are third-party marketing/nonprofit publishers — treat as industry convention, not as rules the operator authored.

---

## 1. Source digest

### Source A — Fundraise Up, "Optimizing Donation Landing Pages"
https://fundraiseup.com/blog/Optimizing-Donation-Landing-Pages/

- **Benchmarks.** A "good" donation page conversion rate is ~10%+ (desktop ~11%, mobile ~8%). 88% of supporters who click an email link never complete the donation — the drop-off is in the page and form, not the appeal.
- **Form friction is the main lever.** Minimise required fields; limit steps; keep checkout on-site rather than bouncing the donor to a third-party processor page.
- **Payment breadth.** Digital wallets matter: 79% of nonprofits accept PayPal, 58% Google Pay, 57% Apple Pay.
- **Suggested amounts** displayed on the page (rather than an empty box) demonstrate accountability and anchor the gift.
- **Trust.** Explicit transparency about where money goes; testimonials/success stories as social proof.
- **Technical.** Responsive design; sub-3-second mobile load; A/B test headline, image, CTA.

### Source B — NonProfit PRO, "7 Best Practices for Creating High-Converting Donation Landing Pages"
https://www.nonprofitpro.com/article/7-best-practices-for-creating-high-converting-donation-landing-pages-for-nonprofits/

1. **Headline** — simple and specific; state impact, urgency, or a statistic. Cited example: "One in 10 people lack access to clean water. We're on a mission to change that."
2. **Body copy** — emotionally resonant story: cause, background, why give, what the gift does.
3. **Visuals** — photos of beneficiaries, infographics, video. Cites research that relevant visuals raise view rate by 94%.
4. **Stories + social proof** — beneficiary/participant stories, progress metrics. Named examples: CARE, Leukemia & Lymphoma Society.
5. **CTA button** — **above the fold**, contrasting colour, action language beyond a bare "Donate". Named example: International Rescue Committee.
6. **Simple form** — essentials only (name, email, payment); tiered amounts.
7. **Mobile** — minimal text, bold type, clean layout, compressed images, short forms. ~50%+ of nonprofit web visits are mobile.

### Source C — Servant Keeper, "4-Step Recipe for Church Capital Campaign Landing Pages That Work"
https://www.servantkeeper.com/resources/4-step-recipe-for-church-capital-campaign-landing-pages-that-work

The only source specific to *church capital campaigns*, so it is weighted most heavily here.

1. **Words first.** Clarity over cleverness — name the specific thing ("new 23-room children's center", not "new building"). Short words, short sentences, contractions. Lead with impact before logistics. Then edit ruthlessly; read aloud; re-read after 24 hours.
2. **Images + video.** Architect renderings, construction photos, community-impact shots. A phone-shot video of a passionate speaker beats no video; broadcast production is not required.
3. **Design.** Match the landing page to the main site so it reads as the same institution. Centred headline, subheadings for scannability, clean/digestible layout.
4. **Donation button.** Prominent, contrasting colour, at the top of the page and near the image gallery. **Cap it at 2–3 buttons** — more reads as pressure.

Note: this source is silent on page length and on mobile specifics.

### Supporting search findings (secondary)
- Feeding America converts dollars into units the donor already thinks in ("$1 helps provide at least 10 meals") rather than abstract currency.
- charity: water repeats its single trust promise (100% of public donations fund projects) above the form, beside the form, and in the confirmation.
- Givebutter's church-campaign write-up notes that **phasing** a large capital project ("here is what Phase 1 delivers") makes an intimidating number feel achievable. https://givebutter.com/blog/church-capital-campaign

---

## 2. Exemplary pages examined in-browser

Method note: window resize was blocked by the browser (window locked at 1920px; `resize_window` reported success but `window.innerWidth` stayed 1920 across four attempts). Desktop views were therefore captured at 1920px rather than the intended 1440px, and mobile views were captured by rendering each page in a same-origin 390×840 iframe, which triggers the site's real mobile breakpoints. Observations below are from actual rendered layouts, not from inspecting CSS.

### Exemplar 1 — charity: water — https://www.charitywater.org/donate

**Desktop (1920px)**
- Two-column hero that fills the viewport: full-bleed portrait photograph on the left, dark panel on the right holding headline → two short paragraphs → the donation widget. No scrolling required to reach the form.
- Headline is large serif, three lines, benefit-framed ("Help bring clean and safe water to every person on the planet.").
- Body copy above the form is exactly two paragraphs: the problem (with one number: 696 million) and the promise (100% of the gift funds water).
- Donation widget: Monthly / Give Once toggle, a **single pre-filled amount field ($120)**, an optional "give in honor of" disclosure link, a one-line impact anchor ("It only takes $40 to bring 1 person reliable access"), then one yellow GIVE button. That is the whole form on this page — identity and payment come after.
- Persistent yellow GIVE button top-right in the nav, present from the first pixel.
- Section 2 is a trust block: "You deserve to give with confidence" + four accreditation badges (CharityWatch, Candid Platinum, Charity Navigator, BBB).
- Below that: alternate giving paths as cards — monthly community ("The Spring"), sponsor a project at $10,000+, gift in honour, legacy giving, crypto, check/stock/wire.
- Total page is short: hero → trust → two feature blocks → a six-item "more ways to give" grid → footer.

**Mobile (390px)**
- Nav collapses to hamburger + logo, but **the GIVE button stays visible in the header** — it does not go into the hamburger.
- The hero un-stacks: the photograph becomes a short banner strip (~230px tall) at the top, then headline, then copy, then the form. The image is cropped, not scaled down, so the subject's face stays in frame.
- The donation widget sits just below the fold — roughly one thumb-scroll. The amount buttons and the GIVE button both go full-width and are comfortably tap-sized.
- Trust section and card grids collapse to a single centred column; nothing scrolls horizontally.

### Exemplar 2 — Doctors Without Borders / MSF — https://www.doctorswithoutborders.org/donate (redirects to give.doctorswithoutborders.org)

**Desktop (1920px)**
- A dedicated transactional page: **the site navigation is stripped entirely** — logo only, no menu, no footer links competing for the click.
- Two columns: donation card on the left (~40% width), reassurance on the right (photo + "Thank you for supporting our lifesaving work." + two short paragraphs).
- The form is the hero. Headline sits *inside* the card ("Help save lives. Donate now."), then Give once / Monthly toggle, then a **2×2 grid of preset amounts ($25 / $100 / $250 / $1,000) with $100 pre-selected**, then an editable amount field, an optional "Dedicate my donation" checkbox, then a single black Donate button.
- One line of fine print under the card explains what unrestricted gifts do.
- Only one CTA exists on the page. There is nothing else to click.

**Mobile (390px)**
- Single column, **form first** — the amount grid is above the fold; the photo and thank-you copy are pushed below it.
- The 2×2 amount grid holds its shape rather than becoming a 1×4 stack, which keeps all four price points on one screen.
- Header reduces to the logo alone; there is no hamburger because there is no menu to collapse.
- Cookie consent renders as a bottom sheet that covers the lower third of the form until dismissed — a real conversion cost worth avoiding in our own build.

### Exemplar 3 — Friends of Notre-Dame de Paris — https://www.friendsofnotredamedeparis.org/donate/
Closest structural analogue to CB Dejvice: a church building/restoration campaign raising from US donors for a European site.

**Desktop (1920px)**
- Three CTA layers stacked at the top: a **sticky announcement bar** ("Protect the Guardians of Notre-Dame" + DONATE NOW), then the main nav with a coral DONATE NOW button, then the page content.
- Centred serif page title ("WAYS TO GIVE") — matches the Servant Keeper advice on centred headings and site-consistent styling.
- First content block is a **named giving society** ("Join the 1163 Society", named for the year the first stone was laid) with its own JOIN NOW button — heritage used as a donor tier.
- Second block is a **specific, small, concrete sub-goal**: "Help us raise $80,000 to restore two of these legendary stone figures," with a photo of the gargoyles. A tangible micro-project sitting beside an enormous overall restoration.
- Then a card grid of giving mechanisms — Appreciated Securities, Cryptocurrency, Gifts By Check, Donate Monthly, Donate Online — each card image-topped and single-labelled. Three across, then two.
- Every image on the page is of the building itself: interiors, façade, scaffolding, stained glass. No stock photography.

**Mobile (390px)**
- Nav collapses to hamburger, but **both** the announcement-bar DONATE NOW and the header DONATE NOW survive — two donate affordances above the fold before any content.
- Content **reorders**: the "Protect the Guardians / $80,000" card jumps above the "WAYS TO GIVE" heading, so the first thing a phone visitor sees is a concrete, affordable ask rather than a menu of mechanisms.
- Card grid stacks to one column, image on top of label; images crop rather than letterbox.
- Announcement bar wraps to two lines (text above button) instead of truncating.

**Pattern common to all three:** hero image + one specific headline + the ask, all reachable without hunting; a single dominant CTA colour used nowhere else; trust/credibility as its own block after the ask, not before it; alternate giving methods relegated to a card grid at the bottom.

---

## 3. Recommendations for the CB Dejvice landing page

### Structure (top to bottom)
1. **Hero.** Architect's rendering of the new sanctuary (or, if no rendering exists, the Evropská building exterior) + headline + one-sentence subhead + primary Give button. On desktop, run the rendering and the ask side by side as charity: water does; on mobile, image crops to a banner and the button lands within one scroll.
   - Headline should carry the specific noun, per Servant Keeper: not "Support our church" but something like "Help build a permanent sanctuary in the heart of Prague 6."
2. **The number, immediately.** 54M CZK total / 14M CZK committed by members / 40M CZK remaining, shown as a **progress bar or thermometer**. This is the single strongest asset in the brief — members have already given ~26% sacrificially. Social proof and goal in one graphic. All three exemplars anchor early; none makes the visitor hunt for the maths.
3. **Why now.** Short block: 30 years of renting a communist-era hotel auditorium two kilometres away; permission finally granted; the sanctuary must be built underground to satisfy Prague regulations, which is why it costs what it costs. Two to three short paragraphs, not the full one-pager.
4. **What the building does.** The five bullets from the one-pager (welcoming place for worship and outreach; better service to families and students; visible public presence; room for growth and multiple services; less dependence on rented facilities). Bullets, not prose — this is the scan layer.
5. **Context / stakes.** Prague 6: 109,000 residents, 38,000 university students, one of Europe's most secular societies. Keep it to two sentences with the numbers doing the work.
6. **Second CTA + giving tiers.** Suggested amounts with a concrete unit attached, Feeding America style — translate CZK construction costs into something physical (a square metre of the sanctuary, a row of seating, a day of excavation). Include a monthly/pledge option; capital campaigns run on multi-year pledges, not one-off gifts.
7. **Trust block.** Who receives the funds, the fiscal/tax-deductibility route for US donors (this must be answered explicitly — it is the single biggest friction point for a US donor giving to a Czech church), denominational affiliation (Církev bratrská), and a link to https://www.cb6.cz/modlitebna for the full project detail.
8. **Alternate ways to give.** Card grid at the bottom: wire transfer, check, appreciated securities, donor-advised fund, gift in honour. Low visual weight — same treatment as the Notre-Dame grid.
9. **Footer.** Contact a human by name, plus the project link.

### Length
Target one long scroll — roughly 600–900 words of body copy across 7–9 blocks. Longer than a pure transactional page (MSF) because the ask is unfamiliar, foreign, and large; shorter than the full one-pager, which stays as the PDF the QR code points back to. The landing page's job is to get the reader to the form, not to tell the whole story.

### CTA placement and frequency
- Persistent Give button in the header at every viewport (charity: water and Notre-Dame both keep it visible after nav collapse).
- Primary CTA in the hero, above the fold on desktop and within one scroll on mobile.
- Mid-page CTA next to the giving tiers.
- Closing CTA after the trust block.
- That is **three in-page buttons plus the sticky header** — at the top of the Servant Keeper 2–3 range, justified by the page's length. Do not add more.
- One CTA colour, used for nothing else on the page. Given the church's existing brand, pick a single warm accent and reserve it.
- Copy the buttons in the church's own voice — "Give toward the sanctuary" or "Join us in building" rather than a bare "Donate". Humble, specific, not urgent-salesy.

### Imagery
- Renderings and photographs of the actual building and congregation only. No stock photography of generic worship — every exemplar used its own subject exclusively.
- One image per major block at most; hero image does the heavy lifting.
- Compress aggressively; target sub-3-second mobile load.
- Include a photograph of the current rented hotel auditorium alongside the rendering. The contrast is the argument.

### Mobile/desktop harmony
- Single-column stack on mobile; two-column hero on desktop. Nothing horizontally scrollable.
- Hero image crops rather than shrinks on mobile so the subject stays legible.
- Preset-amount buttons in a 2×2 grid, not a 1×4 stack (MSF pattern) — keeps all price points on one screen.
- Full-width, thumb-sized buttons and form fields on mobile.
- Consider reordering on mobile so the progress bar / concrete ask precedes the narrative, as Notre-Dame does.
- Handle the cookie/consent banner as a slim top bar or a dismissible corner chip, never a bottom sheet over the form — MSF loses the lower third of its own donation form to this.

### Form
- Amount first, identity second, payment third. Pre-select a default amount.
- Ask for name, email, amount. Nothing else on the first screen.
- Keep checkout on-page if the payment provider allows it; a redirect to an unfamiliar Czech banking interface will cost conversions with US donors.
- Offer card, PayPal, and wallet payment. State clearly, near the button, what currency the donor is charged in.

### Open questions for the operator
- Is there a US 501(c)(3) fiscal sponsor or partner mission agency through which US gifts can be made tax-deductible? The page copy changes materially depending on the answer, and this belongs above the fold in the trust block.
- Does an architect's rendering exist that can be used publicly? If not, the hero image strategy needs a fallback.
- Is a multi-year pledge option in scope, or one-time gifts only?

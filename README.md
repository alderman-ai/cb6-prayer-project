# CB6 Prayer Project

Fundraising materials for **CB Dejvice** (Církev bratrská v Praze 6 — Dejvicích) and their campaign
to build a new sanctuary — a permanent home for Sunday worship — on their property on Evropská
Street, Prague 6. Project cost 54 million CZK (~$2.55M); members have committed 14M CZK; the
campaign seeks the remaining 40M CZK (~$1.89M).

The campaign is a chain: **email → one-page brochure (PDF) → landing page → donation**. Each piece
has one job: move the reader to the next piece. Everything exists in **English** (primary audience:
warm US contacts of missionaries and partner institutions) and **Czech**.

---

# START HERE

Everything you need is linked from this section. You do not need to open any code.

## 1. There are two versions of the website — pick one

Both versions contain the same content, in both English and Czech. They exist because it wasn't
settled where the page would ultimately live.

**Version A — a page on your existing website.**
`deliverables/church-site-page/` — `index-cz.html` and `index-en.html`. These are complete, ready to
publish pages. Each is a single file with the images, fonts and styling already built in, so there
are no other files to upload. Your webmaster can drop them straight onto the existing site — either
as a page at an address like `cb6.cz/modlitebna-sbirka`, or on the `modlitebna.cb6.cz` subdomain.
Deployment instructions are in that folder's README.

*A note on your site's technology:* cb6.cz is a custom-built React (Next.js) application. These pages
are plain HTML so they can be published without a developer. If your developer would rather have them
as native React pages inside the existing app, they can convert them — step-by-step instructions are
in the folder's README, and the React source in `site/` is directly reusable. **Alex can also do that
conversion on request.**

**Version B — a standalone site on its own web address.**
`site/` — the same landing page built as a modern web application and already live at
[cb6-en.vercel.app](https://cb6-en.vercel.app) and [cb6-cz.vercel.app](https://cb6-cz.vercel.app).
These addresses are temporary working previews. If you would prefer the campaign to live at its own
custom domain rather than as a page on cb6.cz, this version can be pointed at that domain instead.

## 2. The documents you can edit

The email copy lives in Google Docs. **Anyone with the link can edit them** — no account needed.

| Document | Link |
|---|---|
| **Email — English** | [Open and edit](https://docs.google.com/document/d/1r5JokiFRAFIN5OhabHT3cAozmynBmKbF/edit) |
| **Email — Czech, informal (*tykání*)** | [Open and edit](https://docs.google.com/document/d/1cBYN4e7oCPPrXSZFj5rf1bZyUjseAJkt/edit) |
| **Email — Czech, formal (*vykání*)** | [Open and edit](https://docs.google.com/document/d/1PXg-Zfma4qbEw-AbxCTlnCL87WPjMi4O/edit) |

Each contains the subject line options, the preheader, and the full body, with `{{PLACEHOLDERS}}`
where the sender and recipient names go.

**Edit them freely.** Change any wording you like, directly in the document. Once you're happy,
tell Alex — **the revised text can be pushed back into the website and the brochures in minutes.**
The copy in the documents is the single source everything else is built from, so a change made once
in the document flows through to every other piece.

## 3. The brochures — leave comments, don't rewrite

The one-page brochures are Canva designs. **Anyone with the link can comment on them.**

| Brochure | Link |
|---|---|
| **Brochure — English** (US Letter) | [View and comment](https://canva.link/s3bcbz6pf10vgwx) |
| **Brochure — Czech** (A4) | [View and comment](https://canva.link/vpiwwulxbqxpfli) |

Click anywhere on the design to attach a comment — a wording change, a photo you'd rather use, a
section that should be bigger or smaller. **Alex can rebuild the brochure from your comments very
quickly**, so please comment rather than trying to redesign it yourself. Print-ready PDF exports of
both are in `deliverables/brochures/`.

## 4. Important — about the English materials and US tax deductibility

The English email, brochure and landing page were all written on the understanding that **there is
no US 501(c)(3) organisation able to receive gifts for this project.** A 501(c)(3) is the US
charitable entity that makes a donation tax-deductible for an American donor. Without one, US law
(IRC §170(c)(2)(A)) does not allow a deduction for a gift sent directly to a Czech church, and the
Czech Republic has no tax-treaty exception. The English materials therefore say plainly that gifts
are **not tax-deductible in the US**, because a vague claim would be discovered later by a donor's
accountant and cost you the gift.

**If that understanding is wrong — if a US 501(c)(3) already exists, or a US church, mission agency
or denominational fund is willing to receive these gifts under its own control — please say so.**
That single fact changes the English copy meaningfully, and **the web pages and brochure can be
updated in minutes.** The full legal research, including what a qualifying arrangement has to look
like, is in `research/US Tax Deductibility.md`.

## 5. Also worth confirming before wide distribution

- **Bank name.** "Raiffeisenbank" is inferred from bank code 5500 in your published account
  1031051032/5500. Please confirm, or it will be removed.
- **Image permission.** Written permission to reuse the architect's renders is assumed but not
  documented.
- **A print-resolution logo.** The best available is a 514px image that only works on dark
  backgrounds.
- **Where the page will live.** `modlitebna.cb6.cz` currently serves your own site, so the Czech
  QR code and the printed address point there. If the campaign page is meant to take over that
  address, the QR codes stay correct. If not, they need regenerating — a quick change.

---

## What's in this repository

| Folder | What it is |
|---|---|
| `deliverables/email-docx/` | The fundraising email as Word documents. One English version; two Czech versions (informal *tykání* and formal *vykání*). The editable Google Docs versions are linked in START HERE above. |
| `deliverables/brochures/` | The one-page brochure exported to print-ready PDF, English (US Letter) and Czech (A4). The editable, commentable originals are the Canva links in START HERE above. |
| `deliverables/copy/` | The approved copy (text) for every asset, English and Czech — the single source of truth the designs and sites were built from. Each file carries build notes. |
| `deliverables/church-site-page/` | **Website version A** — the landing page as self-contained HTML files (`index-cz.html`, `index-en.html`) to publish directly on the existing site. Deployment and React-conversion instructions in that folder's README. |
| `deliverables/qr/` | QR codes: EN landing page, CZ landing page, and the Czech payment QR (QR platba) for the sanctuary account. |
| `site/` | **Website version B** — source code of the standalone landing pages (Next.js), live at cb6-en.vercel.app and cb6-cz.vercel.app. Includes `npm run sync-copy` — regenerate the site text from edited copy documents, then redeploy with one command (see `site/README.md`, written for non-developers). |
| `resources/brand/` | The church's brand assets pulled from cb6.cz: logo files, color palette, Raleway fonts, and `BRAND NOTES.md` documenting all of it (including constraints — e.g. the logo only works on dark backgrounds). |
| `resources/modlitebna-images/` | Architectural renders and photos from cb6.cz/modlitebna (with captions/inventory in `BRAND NOTES.md`). |
| `resources/updated-pictures/` | **Newer, higher-resolution renders** supplied by the church (July 2026) — preferred for print and hero use. See `PICTURES NOTE.md` for the inventory. |
| `resources/design-system/` | The campaign design system: colors, typography, and reusable components (progress bar, giving card, page blocks) as HTML/CSS — the visual DNA all deliverables share. |
| `research/` | Background research the campaign was built on: US tax treatment of gifts to a foreign church, examples of similar campaigns, copywriting and web-design best practices, and the church website's technical stack. |
| `SPEC.md` | See below. |

## What is SPEC.md?

This entire campaign was produced in a single automated run by an AI system (Claude). `SPEC.md` is
the **instruction document** the operator (Alex Alderman) wrote before leaving the computer: what to
build, in what order, with which tools, and what decisions the AI was allowed to make on its own.
The AI's clarifying questions and the operator's answers, plus every judgment call the AI made along
the way, are recorded inside it. If you want to understand *why* any deliverable looks the way it
does, that document is the audit trail.

---

*Materials prepared July 2026 · Contact: modlitebna@cb6.cz (project) · hospodar@cb6.cz (gifts & receipts)*

# CB6 Prayer Project

Fundraising materials for **CB Dejvice** (Církev bratrská v Praze 6 — Dejvicích) and their campaign
to build a new sanctuary — a permanent home for Sunday worship — on their property on Evropská
Street, Prague 6. Project cost 54 million CZK (~$2.55M); members have committed 14M CZK; the
campaign seeks the remaining 40M CZK (~$1.89M).

The campaign is a chain: **email → one-page brochure (PDF) → landing page → donation**. Each piece
has one job: move the reader to the next piece. Everything exists in **English** (primary audience:
warm US contacts of missionaries and partner institutions) and **Czech**.

## What's in this repository

| Folder | What it is |
|---|---|
| `deliverables/email-docx/` | The fundraising email — Word documents ready to edit and send. One English version; two Czech versions (informal *tykání* and formal *vykání*). Sender/recipient names are `{{PLACEHOLDERS}}`. |
| `deliverables/brochures/` | The one-page brochure in two builds: **(Canva)** — the primary, human-editable design (US Letter for EN, A4 for CZ), exported to PDF from Canva where it can be edited; **(Claude Design)** — an independent one-shot build from the campaign design system, PDF + its editable HTML source. |
| `deliverables/copy/` | The approved copy (text) for every asset, English and Czech — the single source of truth the designs and sites were built from. Each file carries build notes. |
| `deliverables/church-site-page/` | The landing page as **self-contained HTML files** (`index-cz.html`, `index-en.html`) that the church's webmaster can host as-is (e.g. at `modlitebna.cb6.cz`) or port into their Next.js site — instructions in that folder's README. |
| `deliverables/qr/` | QR codes: EN landing page, CZ landing page, and the real Czech payment QR (QR platba) for the sanctuary account. |
| `site/` | Source code of the live landing pages (Next.js). Deployed at **https://cb6-en.vercel.app** and **https://cb6-cz.vercel.app**. Includes `npm run sync-copy` — regenerate the site text from edited copy documents, then redeploy with one command (see `site/README.md`, written for non-developers). |
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

## Important notes before publishing anything

- **Gifts to CB Dejvice are currently NOT tax-deductible in the US** (no US 501(c)(3) intermediary
  exists yet). All materials say so honestly. Details in `research/US Tax Deductibility.md`.
- The Czech landing page's permanent home `modlitebna.cb6.cz` is **not yet live** — the church's
  webmaster needs to point that subdomain (the CZ QR code targets it). The Vercel URLs work today.
- A few facts still need written client confirmation before print: the bank's name
  (Raiffeisenbank, inferred from bank code 5500), permission to reuse the architect's renders, and
  a print-resolution vector logo. These are flagged inside the deliverables themselves.

*Materials prepared July 2026 · Contact: modlitebna@cb6.cz (project) · hospodar@cb6.cz (gifts & receipts)*

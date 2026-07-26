# CB Dejvice — sanctuary appeal landing pages

Two live pages, one codebase:

| Page | Language | Vercel project | Address |
|---|---|---|---|
| English | English | `cb6-en` | https://cb6-en.vercel.app |
| Czech | Czech | `cb6-cz` | https://modlitebna.cb6.cz (once the domain is pointed at the `cb6-cz` project; until then the `cb6-cz.vercel.app` address works) |

The English address is the one printed into the QR code on the brochure, so it must not change.

---

## The only three things you need to know

**1. The words on the page come from your copy files.** Nothing is typed into the
website by hand. The English page is built from `Landing Copy EN.md` and the
Czech page from `Landing Copy CZ.md`, both in the sprint's `Deliverables/Copy/`
folder.

**2. When you change the copy, you run one command to pull it in.**

**3. Then you run one more command to put it live.**

That's it. Edit → sync-copy → deploy.

---

## The full flow, step by step

### Step 1 — Edit the copy

Open the file you want to change:

- English: `…/Deliverables/Copy/EN/Landing Copy EN.md`
- Czech: `…/Deliverables/Copy/CZ/Landing Copy CZ.md`

Change the words. Keep the structure — the block headings (`## Block 1 — Hero`,
`## Blok 1 — Hero`, and so on) and the bold labels (`**Section heading:**`,
`**Nadpis sekce:**`, `**Subhead:**`, …) are the signposts the sync step reads.
If you delete a signpost, the sync step will not know where the text belongs.

**Prefer Word?** Save your edited version as `Landing Copy EN.docx` or
`Landing Copy CZ.docx` directly in the `Deliverables/` folder (one level up from
`Copy/`). If a `.docx` is sitting there, it wins over the Markdown file. This
needs [pandoc](https://pandoc.org/installing.html) installed on the machine; if
it isn't, the sync step says so and falls back to the Markdown file rather than
failing silently.

> `Email EN.docx` and the other email files are **not** landing-page content and
> are ignored.

### Step 2 — Pull the copy in

Open a terminal in this folder and run:

```
npm run sync-copy
```

It reads the copy files, rewrites `content/en.json` and `content/cz.json`, and
then prints a plain list of what changed — old text on one line, new text on the
next. Read that list. It is your proof that the change landed where you meant it
to, before anything goes live.

Copy files living somewhere else? Point at them:

```
COPY_SOURCE_DIR="D:/wherever/Deliverables" npm run sync-copy
```

### Step 3 — Put it live

```
npm run deploy:en     (the English page)
npm run deploy:cz     (the Czech page)
```

Each command rebuilds that one page and pushes it to its own Vercel project.
When it finishes it prints the address it deployed to. Deploying one language
does not touch the other — if you only changed the Czech copy, only run
`deploy:cz`.

### Want to look at it before it goes live?

```
npm run dev        (English, at http://localhost:3000)
npm run dev:cz     (Czech, same address)
```

Press `Ctrl+C` in the terminal to stop it.

---

## What is in this folder

| Folder / file | What it holds |
|---|---|
| `content/en.json`, `content/cz.json` | The page text. **Generated — do not edit by hand**; your edits would be wiped the next time `sync-copy` runs. Edit the copy files instead. |
| `scripts/sync-copy.mjs` | The command in step 2. |
| `scripts/deploy.mjs` | The command in step 3. |
| `app/`, `components/` | The page itself: the nine blocks in order, top to bottom. |
| `styles/tokens.css` | The design system's colours, type and spacing, copied unchanged from `Resources/Design System/tokens.css`. The only edit is the removed Google Fonts line — this site carries its own copy of Raleway instead (see below). |
| `app/globals.css` | The components built from the design system: buttons, the progress bar, the giving card, sections, footer. |
| `public/img/` | The renders and photographs used on the page. |
| `public/fonts/` | Raleway, carried with the site so it loads fast and works offline. The `latin-ext` files are what make Czech letters (ě š č ř ž ů) render properly. |
| `public/qr/qr-platba.png` | The Czech payment QR code, shown in the giving card on the Czech page only. |
| `vercel-projects.json` | Which Vercel project each language deploys to. Set once; leave alone. |

---

## Decisions baked in, so you know what you are looking at

- **The nine blocks are in the order the copy files set out**: hero, the story,
  before/after, why it costs this much, where we stand, what the sanctuary makes
  possible, giving details, questions people ask, footer.
- **No navigation.** The header carries the logo and the give button, and
  nothing else. There is nowhere to click away to.
- **Three buttons in the page** — hero, after the underground section, after the
  giving details — plus the one in the sticky header. All four say the same
  thing and all four jump to the giving block. Gold is used for those buttons
  and for the progress bar, and for nothing else on the page.
- **The progress bar says "committed", never "raised" or "received".** The
  members' 14 million crowns is a commitment. The bar shows 14 of 54 million as
  solid gold; the rest is the perforated stone screen from the building's own
  façade. No deadline, no countdown, no red.
- **Bank details** are the published ones: account 1031051032/5500, variable
  symbol 5061999, message "Na modlitebnu", at Raiffeisenbank. No IBAN or SWIFT
  is shown — the English page tells international donors to write to
  hospodar@cb6.cz for what their bank needs, rather than printing a number
  nobody has confirmed.
- **Images.** Where the client's newer July 2026 set has a better version of an
  image the copy names, the newer one is used: the street render
  (`pohled_01s.jpg` in place of `03_exterior-street-view-render.jpg`) and the
  sanctuary interior (`A_06.jpg` in place of
  `12_sanctuary-from-main-entrance.jpg`). Everything else is exactly the file
  the copy names. The two AI-generated images in that folder are not used.

## Two things the copy files flag for the client, still open

- **The bank name.** "Raiffeisenbank" is inferred from bank code 5500 and the
  church has not confirmed it in writing. Confirm it, or say "the church's
  sanctuary account" instead — and if it changes, the wording lives in
  `scripts/sync-copy.mjs` under `BANK`.
- **Permission to use the images.** Assumed from the client relationship,
  undocumented. Worth getting in writing from modlitebna@cb6.cz before this is
  distributed widely.

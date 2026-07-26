# CB Dejvice — sanctuary appeal landing pages

Two standalone HTML files. Nothing else is needed to publish them.

| File | Language | Intended address |
|---|---|---|
| `index-cz.html` | Czech (primary) | `https://modlitebna.cb6.cz` |
| `index-en.html` | English | `https://cb6-en.vercel.app` |

Each file is ~1.1 MB and completely self-contained:

* all CSS is inlined in a single `<style>` block in `<head>`;
* every photograph, rendering, the logo, the favicon and the QR payment code are
  embedded as `data:` URIs — there are **no image files to upload**;
* Raleway is loaded from Google Fonts with the same URL the existing cb6.cz site
  uses, including the **latin-ext** subset so `ě š č ř ž ů` render correctly;
* no JavaScript, no cookies, no trackers, no third-party requests other than the
  Google Fonts stylesheet.

They work when opened straight from disk (double-click), which makes review easy.

---

## Option 1 — serve as static files on Apache

The simplest deployment. Assuming a virtual host for `modlitebna.cb6.cz`:

```bash
# on the server
mkdir -p /var/www/modlitebna/en
cp index-cz.html /var/www/modlitebna/index.html
cp index-en.html /var/www/modlitebna/en/index.html   # optional English copy
chown -R www-data:www-data /var/www/modlitebna
```

```apache
<VirtualHost *:443>
    ServerName modlitebna.cb6.cz
    DocumentRoot /var/www/modlitebna

    <Directory /var/www/modlitebna>
        Require all granted
        Options -Indexes
        DirectoryIndex index.html
    </Directory>

    # gzip helps: the base64 images do not compress much, but the HTML/CSS does
    AddOutputFilterByType DEFLATE text/html text/css

    # SSL directives (certbot etc.) go here
</VirtualHost>
```

Then `systemctl reload apache2`. No PHP, no database, no build step.

If the page instead lives under the existing site as `cb6.cz/modlitebna-sbirka`,
drop `index-cz.html` into that directory as `index.html` — everything is relative
to nothing, so it works from any path.

## Option 2 — port into the existing Next.js app

The site at cb6.cz is a custom Next.js app on a self-managed VPS. To make this a
route rather than a separate host:

1. Create `app/modlitebna/page.tsx` (App Router) or `pages/modlitebna.tsx`.
2. Copy everything between `<body>` and `</body>` from `index-cz.html` into the
   component's JSX return. Three mechanical edits are required:
   * `class=` → `className=`
   * self-close void tags: `<img …>` → `<img … />`, `<hr class="rule">` → `<hr className="rule" />`
   * inline `style="…"` attributes → object syntax, e.g.
     `style={{ marginTop: 'var(--space-2xl)' }}`
     (there are only a handful, all on `<figure>`/`<p>` elements)
3. Copy the contents of the `<style>` block into `app/modlitebna/sanctuary.css`
   and `import './sanctuary.css'` from the page. The CSS is plain, scoped by
   class names prefixed for this page; there are no global element resets beyond
   `*{box-sizing:border-box}`, `body`, `img` and `a`, so check those against the
   site's existing globals if you import it globally.
4. Move `<title>`, the meta description and the Open Graph tags into the route's
   `metadata` export.
5. The images are data URIs and will work as-is inside JSX. If you prefer real
   assets, the originals are in the sprint folder under
   `Resources/Updated Pictures/` and `Resources/Modlitebna Images/`; swap the
   `src` values for `next/image` components and keep the `alt` text as written.
6. Raleway: either keep the `<link>` to Google Fonts, or switch to
   `next/font/google` with `subsets: ['latin', 'latin-ext']`. **latin-ext is not
   optional** for the Czech page.

---

## What is on the page

Nine blocks, in this order, per the approved copy documents
(`Deliverables/Copy/CZ/Landing Copy CZ.md`, `.../EN/Landing Copy EN.md`):

1. Hero — headline, sub-headline, first call to action
2. The story — how the congregation got here
3. Before and after — the building today, and the proposal
4. Why it costs this much — the section drawing, second call to action
5. Where we stand — progress bar and the three figures
6. What the sanctuary makes possible
7. Giving details — bank account (CZ page also carries the QR payment code), third call to action
8. FAQ
9. Footer

Deliberate constraints, taken from the copy documents — please keep them if the
page is edited:

* **No header navigation.** Logo and one button only.
* **Three in-page buttons** plus the sticky header button, all with identical
  wording, all pointing at the giving block. More reads as pressure.
* **Gold `#E9C46A` is reserved for the call to action** and the progress fill.
  It is never used for text on white (1.7:1). The only other place it appears is
  as link and tagline colour inside the dark ink footer, where it clears 4.5:1.
* No popups, no exit overlays, no countdowns, no deadline widgets, no video.
* The members' 14 million CZK is described as **committed / upsáno** — never as
  raised, received or banked.

## Accessibility and behaviour

* Text is `#264653` on white (10.1:1) and `#5A7480` for secondary copy (4.96:1).
* The progress bar exposes `role="progressbar"` with real ARIA values.
* FAQ entries are native `<details>` elements — they work without JavaScript and
  are searchable when expanded.
* Every image has meaningful `alt` text in the page's language.
* All animation collapses under `prefers-reduced-motion`.
* Verified with headless Chrome at 1440 px and 390 px: no horizontal scrolling,
  no overflow, diacritics correct in both languages.

## Before publishing — three things to confirm with the church

1. **Bank name.** "Raiffeisenbank" is inferred from bank code 5500 in the
   published account 1031051032/5500. Confirm it, or delete the bank name and
   write "the church's sanctuary account".
2. **Image permission.** Reuse of the architect's renderings and the photographs
   is assumed from the client relationship but is not documented. Get it in
   writing (modlitebna@cb6.cz).
3. **Figures and dates.** Amounts, the permit dates and the vote date are current
   as of July 2026 and will go stale — re-check against cb6.cz/modlitebna before
   each new push.

Two things were deliberately left out and are the church's call, not ours:
suggested giving amounts / tiers, and a recurring monthly giving option. If they
are added, they belong in block 7, above the bank details.

## Editing

To change a figure or a sentence, edit the HTML directly — it is ordinary markup
with a comment header on every block. To change a colour or a size, edit the
custom properties in the `:root` block at the top of the `<style>` element; they
mirror `Resources/Design System/tokens.css`, which is the source of truth for the
whole campaign (email, brochure, landing page).

CB6 Prayer Project

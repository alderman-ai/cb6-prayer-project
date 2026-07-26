#!/usr/bin/env node
/**
 * sync-copy — regenerates content/en.json and content/cz.json from the
 * operator's copy files, then prints a diff summary.
 *
 * Source preference, per locale:
 *   1. <Deliverables>/Landing Copy EN.docx   (or CZ)   <- if the operator has
 *      dropped an edited Word file there, it wins. Text is extracted with pandoc.
 *   2. <Deliverables>/Copy/EN/Landing Copy EN.md  (or CZ/Landing Copy CZ.md)
 *
 * Override the Deliverables folder with:
 *   COPY_SOURCE_DIR="D:/some/other/Deliverables" npm run sync-copy
 *
 * Nothing here invents copy. Only two things are substituted, both under an
 * operator-approved policy: the {{LANDING_URL}} / {{LANDING_URL_CZ}} tokens and
 * the {{BANK_DETAILS}} token.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = join(ROOT, 'content');

const DEFAULT_DELIVERABLES =
  'C:/Users/alder/Desktop/Atlas OS/Projects/PROJ_Copywriting/Sprints/SPRI_CB Dejvice Fundraising/Deliverables';
const DELIVERABLES = process.env.COPY_SOURCE_DIR || DEFAULT_DELIVERABLES;

/* -------------------------------------------------------------------------
   Operator-approved resolutions
   ------------------------------------------------------------------------- */
const URLS = {
  en: 'https://cb6-en.vercel.app',
  cz: 'https://modlitebna.cb6.cz',
};

const BANK = {
  en: {
    title: 'The sanctuary account',
    rows: [
      { label: 'Bank', value: 'Raiffeisenbank a.s.' },
      { label: 'Account', value: '1031051032/5500' },
      { label: 'Payment reference', value: '5061999', note: 'variable symbol' },
      { label: 'Message', value: 'Na modlitebnu' },
    ],
    foot: 'Sending from outside Europe, or your bank asks for an IBAN or SWIFT code? Write to <a href="mailto:hospodar@cb6.cz">hospodar@cb6.cz</a> and a person will send you what your bank needs.',
    qr: null,
  },
  cz: {
    title: 'Sborový účet na modlitebnu',
    rows: [
      { label: 'Banka', value: 'Raiffeisenbank a.s.' },
      { label: 'Číslo účtu', value: '1031051032/5500' },
      { label: 'Variabilní symbol', value: '5061999' },
      { label: 'Zpráva pro příjemce', value: 'Na modlitebnu' },
    ],
    foot: null,
    qr: { src: '/qr/qr-platba.png', caption: 'QR platba' },
  },
};

/* Image assignments. Filenames on the left are the ones named in the copy
   files; the paths are the compressed copies in public/. Where the client's
   newer "Updated Pictures" set supersedes an image, the newer render is used
   and the swap is recorded in `from`. */
const IMAGES = {
  hero: {
    src: '/img/hero-overlay.jpg',
    from: '02_proposed-design-overlay-on-photo.jpg',
    width: 3949,
    height: 2954,
  },
  story: {
    src: '/img/foyer.jpg',
    from: '05_foyer-toward-evropska-street.jpg',
    width: 1920,
    height: 1080,
  },
  before: {
    src: '/img/before.jpg',
    from: '01_current-building-exterior-photo.jpg',
    width: 3948,
    height: 2954,
  },
  after: {
    src: '/img/after.jpg',
    from: 'pohled_01s.jpg (Updated Pictures — supersedes 03_exterior-street-view-render.jpg)',
    width: 1280,
    height: 720,
  },
  section: {
    src: '/img/section.jpg',
    from: '11_section-drawing-sanctuary-hall.jpg',
    width: 1920,
    height: 1080,
  },
  sanctuary: {
    src: '/img/sanctuary.jpg',
    from: 'A_06.jpg (Updated Pictures — supersedes 12_sanctuary-from-main-entrance.jpg)',
    width: 1920,
    height: 1080,
  },
};

/* Alt text, per locale. Descriptive, taken from the image notes in the copy. */
const ALT = {
  en: {
    hero: 'The proposed sanctuary — a white perforated stone screen with a pointed-arch entrance — rendered into a photograph of the church building on Evropská Street today.',
    story: 'The foyer of the church building, looking out toward Evropská Street past the café and the children’s-programme window.',
    before: 'The church building on Evropská Street as it stands today.',
    after: 'Architect’s render of the new entrance pavilion, with CÍRKEV BRATRSKÁ DEJVICE lettering on the wall.',
    section: 'Section drawing showing the sanctuary hall built below ground, beneath the existing building.',
    sanctuary: 'The finished sanctuary: pale oak seating, ribbed grey walls, and a slim cross lit by a skylight.',
  },
  cz: {
    hero: 'Navrhovaná modlitebna — bílá perforovaná kamenná stěna s lomeným obloukem vstupu — vsazená do dnešní fotografie budovy v Evropské ulici.',
    story: 'Foyer sborové budovy s výhledem do Evropské ulice, kolem kavárny a okna dětského programu.',
    before: 'Sborová budova v Evropské ulici, jak vypadá dnes.',
    after: 'Vizualizace nového vstupního pavilonu s nápisem CÍRKEV BRATRSKÁ DEJVICE na stěně.',
    section: 'Řez ukazující sál modlitebny pod úrovní terénu, pod stávající budovou.',
    sanctuary: 'Hotová modlitebna: světlé dubové židle, žebrované šedé stěny a štíhlý kříž pod světlíkem.',
  },
};

/* Progress bar. 14M of 54M committed — never "raised" or "received". */
const PROGRESS = {
  en: {
    committed: 14000000,
    total: 54000000,
    pct: 26,
    committedLabel: '14,000,000 CZK',
    committedCaption: 'Committed by members',
    totalLabel: '54,000,000 CZK',
    totalCaption: 'Total project',
    ariaLabel: 'Sanctuary fund',
    ariaText:
      '14 million koruna committed of a 54 million koruna project — 26 percent',
  },
  cz: {
    committed: 14000000,
    total: 54000000,
    pct: 26,
    committedLabel: '14 000 000 Kč',
    committedCaption: 'Upsáno členy sboru',
    totalLabel: '54 000 000 Kč',
    totalCaption: 'Náklady projektu',
    ariaLabel: 'Sbírka na modlitebnu',
    ariaText: 'Upsáno 14 milionů korun z projektu za 54 milionů — 26 procent',
  },
};

/* Header / a11y furniture that the copy files do not spell out. */
const CHROME = {
  en: {
    lang: 'en',
    skip: 'Skip to the giving details',
    brandAlt: 'Církev bratrská Dejvice',
    givingAnchor: 'give',
    eyebrow: 'CB Dejvice · Prague 6',
    beforeTag: 'Today',
    afterTag: 'Proposed',
    tableHead: ['', 'CZK', 'USD'],
  },
  cz: {
    lang: 'cs',
    skip: 'Přejít na platební údaje',
    brandAlt: 'Církev bratrská Dejvice',
    givingAnchor: 'darovat',
    eyebrow: 'CB Dejvice · Praha 6',
    beforeTag: 'Dnes',
    afterTag: 'Návrh',
    tableHead: ['', 'Kč', 'USD'],
  },
};

/* -------------------------------------------------------------------------
   Source resolution
   ------------------------------------------------------------------------- */
function sourceFor(locale) {
  const up = locale.toUpperCase();
  const docx = join(DELIVERABLES, `Landing Copy ${up}.docx`);
  const md = join(DELIVERABLES, 'Copy', up, `Landing Copy ${up}.md`);

  if (existsSync(docx)) {
    try {
      const text = execFileSync(
        'pandoc',
        ['-f', 'docx', '-t', 'markdown-smart', '--wrap=none', docx],
        { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
      );
      return { path: docx, kind: 'docx', text };
    } catch (err) {
      console.error(
        `\n  ! Found ${docx} but could not read it.\n` +
          `    This step needs pandoc (https://pandoc.org/installing.html).\n` +
          `    Falling back to the Markdown file instead.\n`
      );
    }
  }
  if (!existsSync(md)) {
    throw new Error(`No copy source found for ${up}. Looked for:\n  ${docx}\n  ${md}`);
  }
  return { path: md, kind: 'md', text: readFileSync(md, 'utf8') };
}

/* -------------------------------------------------------------------------
   Markdown helpers
   ------------------------------------------------------------------------- */
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Inline markdown -> HTML. Bold, italic, links, bare emails. */
function inline(src, locale) {
  let s = esc(src.trim());
  s = s.replace(/\{\{LANDING_URL_CZ\}\}/g, URLS.cz);
  s = s.replace(/\{\{LANDING_URL\}\}/g, URLS[locale]);
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_m, t, u) =>
      `<a class="cb-link" href="${u}"${
        /^https?:/.test(u) ? ' target="_blank" rel="noopener"' : ''
      }>${t}</a>`
  );
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  // bare email addresses that are not already inside an anchor
  s = s.replace(
    /(^|[\s(>])([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi,
    '$1<a class="cb-link" href="mailto:$2">$2</a>'
  );
  // a single newline inside a paragraph is a deliberate line break in the copy
  s = s.replace(/\n/g, '<br />');
  return s;
}

/** The copy files put the value on the line after "**Label:**". */
function underLabel(p) {
  const lines = p.split('\n');
  return lines.length > 1 ? lines.slice(1).join('\n').trim() : afterLabel(p);
}

/** Split a block body into paragraphs (blank-line separated). */
function paragraphs(body) {
  return body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Is this paragraph a build note rather than reader-facing copy? */
function isNote(p, labels) {
  return labels.some((l) => p.startsWith(l));
}

/** Strip a leading "**Label:**" from a paragraph. */
function afterLabel(p) {
  return p.replace(/^\*\*[^*]+:\*\*\s*/, '').trim();
}

function blocksOf(text) {
  const parts = text.split(/\n##\s+/);
  const map = {};
  for (const part of parts.slice(1)) {
    const head = part.split('\n', 1)[0];
    const n = head.match(/(\d+)/);
    if (!n) continue;
    map[Number(n[1])] = part.slice(head.length).replace(/\n---\s*$/, '').trim();
  }
  return { preamble: parts[0], blocks: map };
}

function findLabelled(paras, labelRe) {
  const hit = paras.find((p) => labelRe.test(p));
  return hit ? afterLabel(hit) : null;
}

/* Labels that mark a paragraph as a build instruction, per locale. */
const NOTE_LABELS = {
  en: [
    '**Image:**',
    '**Images:**',
    '**Display note:**',
    '**Section heading:**',
    '**Headline:**',
    '**Subhead:**',
    '**Primary CTA button:**',
    '**CTA button',
    '**Currency and tax line',
    '**Headline alternatives**',
    '**Credibility line beneath:**',
    '- **Option',
  ],
  cz: [
    '**Obrázek:**',
    '**Obrázky:**',
    '**Poznámka k zobrazení:**',
    '**Nadpis sekce:**',
    '**Nadpis:**',
    '**Podnadpis:**',
    '**Hlavní tlačítko:**',
    '**Tlačítko',
    '**Řádek pod tlačítkem',
    '**Alternativní nadpisy**',
    '**Věta o důvěryhodnosti pod tím:**',
    '- **Varianta',
  ],
};

const L = {
  en: {
    heading: /^\*\*Section heading:\*\*/,
    headline: /^\*\*Headline:\*\*/,
    subhead: /^\*\*Subhead:\*\*/,
    cta: /^\*\*Primary CTA button:\*\*/,
    reassure: /^\*\*Currency and tax line/,
    credibility: /^\*\*Credibility line beneath:\*\*/,
    ctaWording: /Single CTA wording[^:]*:\*\*\s*\*\*([^*]+)\*\*/,
    title: /^\*\*Page title \(SEO\):\*\*\s*(.+)$/m,
    desc: /^\*\*Meta description:\*\*\s*(.+)$/m,
    governing: /^\*\*Governing phrase:\*\*\s*\*(.+?)\*\s*$/m,
    bankToken: /^\{\{BANK_DETAILS\}\}$/,
  },
  cz: {
    heading: /^\*\*Nadpis sekce:\*\*/,
    headline: /^\*\*Nadpis:\*\*/,
    subhead: /^\*\*Podnadpis:\*\*/,
    cta: /^\*\*Hlavní tlačítko:\*\*/,
    reassure: /^\*\*Řádek pod tlačítkem/,
    credibility: /^\*\*Věta o důvěryhodnosti pod tím:\*\*/,
    ctaWording: /Jednotné znění CTA[^:]*:\*\*\s*\*\*([^*]+)\*\*/,
    title: /^\*\*Title \(SEO\):\*\*\s*(.+)$/m,
    desc: /^\*\*Meta description:\*\*\s*(.+)$/m,
    governing: /^\*\*Governing phrase:\*\*\s*\*(.+?)\*\s*$/m,
    bankToken: /^Číslo účtu:/,
  },
};

/* -------------------------------------------------------------------------
   Parse one locale
   ------------------------------------------------------------------------- */
function parse(locale, text) {
  const l = L[locale];
  const notes = NOTE_LABELS[locale];
  const { preamble, blocks } = blocksOf(text);

  const grab = (re, fallback = '') => {
    const m = preamble.match(re);
    return m ? m[1].trim() : fallback;
  };

  const ctaLabel = grab(l.ctaWording);
  if (!ctaLabel) throw new Error(`${locale}: could not find the single CTA wording`);

  const anchor = CHROME[locale].givingAnchor;
  const img = (k) => ({ ...IMAGES[k], alt: ALT[locale][k] });

  /* --- Block 1 hero --- */
  const b1 = paragraphs(blocks[1]);
  const under = (re) => underLabel(b1.find((p) => re.test(p)) || '');
  const hero = {
    headline: under(l.headline).replace(/^#\s*/, '').trim(),
    subhead: inline(under(l.subhead), locale),
    reassurance: inline(under(l.reassure), locale),
    image: img('hero'),
  };
  if (!hero.headline || !hero.subhead || !hero.reassurance) {
    throw new Error(`${locale}: hero block is missing headline, subhead or the line beneath the button`);
  }

  /* --- prose blocks --- */
  const prose = (n, image) => {
    const paras = paragraphs(blocks[n]);
    return {
      heading: findLabelled(paras, l.heading) || '',
      body: paras
        .filter((p) => !isNote(p, notes) && !p.startsWith('|') && !p.startsWith('-'))
        .map((p) => inline(p, locale)),
      image,
    };
  };

  const story = prose(2, img('story'));

  const b3 = paragraphs(blocks[3]);
  const beforeAfter = {
    heading: findLabelled(b3, l.heading) || '',
    body: b3
      .filter((p) => !isNote(p, notes))
      .map((p) => inline(p, locale)),
    before: { ...img('before'), tag: CHROME[locale].beforeTag },
    after: { ...img('after'), tag: CHROME[locale].afterTag },
  };

  const cost = { ...prose(4, img('section')), cta: ctaLabel };

  /* --- Block 5 money --- */
  const b5raw = blocks[5];
  const b5 = paragraphs(b5raw);
  const tableRows = b5raw
    .split('\n')
    .filter((r) => r.trim().startsWith('|') && !/^\|[\s|:-]+\|$/.test(r.trim()))
    .map((r) =>
      r
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((c) => inline(c, locale))
    )
    .filter((cells) => cells.some((c) => c.trim()))
    .slice(1); // drop the markdown header row; CHROME supplies the column heads

  const money = {
    heading: findLabelled(b5, l.heading) || '',
    table: { head: CHROME[locale].tableHead, rows: tableRows },
    body: b5
      .filter((p) => !isNote(p, notes) && !p.startsWith('|'))
      .map((p) => inline(p, locale)),
    credibility: inline(findLabelled(b5, l.credibility) || '', locale),
    progress: PROGRESS[locale],
  };

  /* --- Block 6 benefits --- */
  const b6 = paragraphs(blocks[6]);
  const bulletBlock = b6.find((p) => p.startsWith('- '));
  const benefits = {
    heading: findLabelled(b6, l.heading) || '',
    items: (bulletBlock || '')
      .split('\n')
      .filter((line) => line.trim().startsWith('- '))
      .map((line) => {
        const m = line.replace(/^\s*-\s*/, '').match(/^\*\*(.+?)\*\*\s*(.*)$/);
        return m
          ? { title: m[1].replace(/\.$/, ''), body: inline(m[2], locale) }
          : { title: '', body: inline(line.replace(/^\s*-\s*/, ''), locale) };
      }),
    image: img('sanctuary'),
  };

  /* --- Block 7 giving --- */
  const b7 = paragraphs(blocks[7]);
  const giveItems = [];
  let bankInserted = false;
  for (const p of b7) {
    if (l.heading.test(p)) continue;
    if (/^\*\*(CTA button|Tlačítko)/.test(p)) continue;
    if (l.bankToken.test(p)) {
      if (!bankInserted) {
        giveItems.push({ type: 'bank' });
        bankInserted = true;
      }
      continue;
    }
    // CZ: the three published account lines live in the bank card, not in prose
    if (locale === 'cz' && /^(Číslo účtu|Variabilní symbol|Zpráva pro příjemce):/m.test(p)) {
      if (!bankInserted) {
        giveItems.push({ type: 'bank' });
        bankInserted = true;
      }
      continue;
    }
    giveItems.push({ type: 'p', html: inline(p, locale) });
  }
  if (!bankInserted) giveItems.unshift({ type: 'bank' });

  const give = {
    heading: findLabelled(b7, l.heading) || '',
    items: giveItems,
    bank: BANK[locale],
    cta: ctaLabel,
  };

  /* --- Block 8 FAQ --- */
  const b8 = paragraphs(blocks[8]);
  const faq = { heading: findLabelled(b8, l.heading) || '', items: [] };
  for (const p of b8) {
    if (l.heading.test(p)) continue;
    const lines = p.split('\n');
    const q = lines[0].match(/^\*\*(.+?)\*\*$/);
    if (q) {
      faq.items.push({
        q: q[1],
        a: inline(lines.slice(1).join('\n'), locale),
      });
    } else if (faq.items.length) {
      const last = faq.items[faq.items.length - 1];
      last.a = `${last.a} ${inline(p, locale)}`.trim();
    }
  }

  /* --- Block 9 footer --- */
  const b9 = paragraphs(blocks[9]);
  const footer = {
    org: b9[0] ? b9[0].split('\n').map((x) => inline(x, locale)) : [],
    contacts: (b9[1] || '').split('\n').map((x) => inline(x, locale)).filter(Boolean),
    fine: b9.slice(2).map((p) => inline(p, locale)),
  };

  return {
    locale,
    lang: CHROME[locale].lang,
    url: URLS[locale],
    meta: {
      title: grab(l.title),
      description: grab(l.desc),
      governingPhrase: grab(l.governing),
    },
    chrome: {
      skip: CHROME[locale].skip,
      brandAlt: CHROME[locale].brandAlt,
      eyebrow: CHROME[locale].eyebrow,
      givingAnchor: anchor,
    },
    cta: { label: ctaLabel, href: `#${anchor}` },
    hero,
    story,
    beforeAfter,
    cost,
    money,
    benefits,
    give,
    faq,
    footer,
  };
}

/* -------------------------------------------------------------------------
   Diff summary
   ------------------------------------------------------------------------- */
function summarise(before, after, label) {
  if (!before) {
    console.log(`  ${label}: created (new file)`);
    return;
  }
  const flatten = (obj, prefix = '', out = {}) => {
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v && typeof v === 'object') flatten(v, key, out);
      else out[key] = String(v);
    }
    return out;
  };
  const a = flatten(before);
  const b = flatten(after);
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const changed = [];
  for (const k of keys) {
    if (a[k] !== b[k]) changed.push(k);
  }
  if (!changed.length) {
    console.log(`  ${label}: no change`);
    return;
  }
  console.log(`  ${label}: ${changed.length} field(s) changed`);
  for (const k of changed.slice(0, 25)) {
    const from = (a[k] ?? '(absent)').slice(0, 70);
    const to = (b[k] ?? '(absent)').slice(0, 70);
    console.log(`     · ${k}`);
    console.log(`         was: ${from}`);
    console.log(`         now: ${to}`);
  }
  if (changed.length > 25) console.log(`     … and ${changed.length - 25} more`);
}

/* -------------------------------------------------------------------------
   Main
   ------------------------------------------------------------------------- */
function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  console.log('\nsync-copy — rebuilding the landing page content\n');
  console.log(`  source folder: ${DELIVERABLES}\n`);

  for (const locale of ['en', 'cz']) {
    const src = sourceFor(locale);
    console.log(`  ${locale.toUpperCase()} read from: ${src.path} (${src.kind})`);
    const data = parse(locale, src.text.replace(/\r\n/g, '\n'));
    const outPath = join(OUT_DIR, `${locale}.json`);
    const prev = existsSync(outPath) ? JSON.parse(readFileSync(outPath, 'utf8')) : null;
    writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
    summarise(prev, data, `${locale}.json`);
    console.log('');
  }

  console.log('  Done. Next step: npm run deploy:en  /  npm run deploy:cz\n');
}

main();

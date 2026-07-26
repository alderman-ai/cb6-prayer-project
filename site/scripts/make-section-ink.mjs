#!/usr/bin/env node
/**
 * make-section-ink — derives public/img/section-ink.jpg from the raw
 * architectural section drawing (public/img/section.jpg).
 *
 * The supplied render has a pure-black ground occupying ~53% of the frame.
 * Next to the polished photographic renders elsewhere on the page that reads
 * as an unfinished asset. This remaps the black ground toward the brand's
 * deepest ink (--color-ink-900 #16303A) so the drawing sits on an intentional
 * ink panel — the same treatment the sibling church-html deliverable applies
 * with `.media--ink`.
 *
 * The lift is masked by per-pixel luminance (mask = (1 - lum) ** FALLOFF), so
 * only the shadows move: the terracotta facade, the white cast render and the
 * oak seating keep their full contrast.
 *
 *   node scripts/make-section-ink.mjs
 *
 * One-off: the derived file is committed, so this does not run at build time.
 * `sharp` is resolved from next's own install — it is deliberately NOT added to
 * package.json, so the Vercel build and the lockfile stay untouched.
 */
import sharp from 'sharp';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'public/img/section.jpg');
const OUT = join(ROOT, 'public/img/section-ink.jpg');

const INK = [0x16, 0x30, 0x3a]; // --color-ink-900
const FALLOFF = 2.0; // 1 = full screen blend, higher = shadows only

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const out = Buffer.alloc(data.length);

for (let i = 0; i < data.length; i += info.channels) {
  const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
  const m = Math.pow(1 - lum, FALLOFF);
  for (let c = 0; c < 3; c++) {
    const a = data[i + c];
    // screen(a, ink) at full mask; untouched at zero mask
    const screened = a + INK[c] * (1 - a / 255);
    out[i + c] = Math.max(0, Math.min(255, Math.round(a * (1 - m) + screened * m)));
  }
}

await sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } })
  .jpeg({ quality: 90, chromaSubsampling: '4:4:4', mozjpeg: true })
  .toFile(OUT);

const stats = await sharp(OUT).stats();
console.log(
  `wrote ${OUT}\n  channel minima: ${stats.channels.map((c) => c.min).join(', ')} (was 0,0,0)`
);

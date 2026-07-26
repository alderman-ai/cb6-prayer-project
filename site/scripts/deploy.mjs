#!/usr/bin/env node
/**
 * deploy — rebuilds and redeploys one of the two live pages.
 *
 *   npm run deploy:en   ->  the English page   (Vercel project cb6-en)
 *   npm run deploy:cz   ->  the Czech page     (Vercel project cb6-cz)
 *
 * Both pages come out of this one codebase; SITE_LOCALE decides which copy
 * file is baked in. Project ids live in vercel-projects.json so the two
 * deploys can share a single folder.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const locale = (process.argv[2] || 'en').toLowerCase();
if (!['en', 'cz'].includes(locale)) {
  console.error('Usage: node scripts/deploy.mjs <en|cz>');
  process.exit(1);
}

const cfgPath = join(ROOT, 'vercel-projects.json');
if (!existsSync(cfgPath)) {
  console.error(
    `\nMissing ${cfgPath}.\nRun once per project:\n` +
      `  vercel link --yes --project cb6-${locale}\n` +
      `then copy .vercel/project.json's orgId/projectId into vercel-projects.json.\n`
  );
  process.exit(1);
}
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
const target = cfg[locale];
if (!target) {
  console.error(`vercel-projects.json has no "${locale}" entry.`);
  process.exit(1);
}

console.log(`\nDeploying the ${locale.toUpperCase()} page to Vercel project ${target.name}…\n`);

const r = spawnSync(
  'vercel',
  [
    'deploy',
    '--prod',
    '--yes',
    '--build-env',
    `SITE_LOCALE=${locale}`,
    '--env',
    `SITE_LOCALE=${locale}`,
  ],
  {
    cwd: ROOT,
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      SITE_LOCALE: locale,
      VERCEL_ORG_ID: cfg.orgId,
      VERCEL_PROJECT_ID: target.projectId,
    },
  }
);
process.exit(r.status ?? 1);

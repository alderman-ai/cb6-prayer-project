#!/usr/bin/env node
/** Run any command with SITE_LOCALE set. Usage: node scripts/with-locale.mjs cz next dev */
import { spawnSync } from 'node:child_process';

const [locale, ...cmd] = process.argv.slice(2);
const r = spawnSync(cmd[0], cmd.slice(1), {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, SITE_LOCALE: locale },
});
process.exit(r.status ?? 1);

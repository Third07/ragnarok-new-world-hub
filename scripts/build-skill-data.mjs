#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import process from 'node:process';

const result = spawnSync(
  process.execPath,
  ['scripts/sync-roworlddb-skills.mjs', '--apply'],
  { stdio: 'inherit' },
);

if (result.error) {
  console.warn(`Skill data sync could not start: ${result.error.message}`);
  console.warn('Continuing with the committed English fallback dataset.');
  process.exit(0);
}

if (result.status !== 0) {
  console.warn(`Skill data sync exited with status ${result.status}.`);
  console.warn('Continuing with the committed English fallback dataset.');
  process.exit(0);
}

console.log('Validated RoworldDB SEA skill data is ready for this build.');

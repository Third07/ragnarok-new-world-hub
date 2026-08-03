#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import process from 'node:process';

const result = spawnSync(
  process.execPath,
  ['scripts/sync-roworlddb-tools.mjs', '--apply'],
  { stdio: 'inherit' },
);

if (result.error) {
  console.warn(`Tool data sync could not start: ${result.error.message}`);
  console.warn('Continuing with committed tool data.');
  process.exit(0);
}

if (result.status !== 0) {
  console.warn(`Tool data sync exited with status ${result.status}.`);
  console.warn('Continuing with committed tool data.');
  process.exit(0);
}

console.log('Validated RoworldDB SEA tool data is ready for this build.');

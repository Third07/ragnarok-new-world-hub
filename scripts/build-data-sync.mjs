#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import process from 'node:process';

const tasks = [
  {
    label: 'SEA skill data',
    script: 'scripts/sync-roworlddb-skills.mjs',
    args: ['--apply'],
    success: 'Validated RoworldDB SEA skill data is ready for this build.',
    fallback: 'Continuing with the committed English skill dataset.',
  },
  {
    label: 'reviewed HMT skill overlay',
    script: 'scripts/apply-hmt-skill-overlay.mjs',
    args: [],
    success: 'Reviewed HMT mechanical skill overlay is ready for this build.',
    fallback: 'Continuing with the current SEA skill values.',
  },
  {
    label: 'SEA tool data',
    script: 'scripts/sync-roworlddb-tools.mjs',
    args: ['--apply'],
    success: 'Validated RoworldDB SEA tool data is ready for this build.',
    fallback: 'Continuing with committed tool data.',
  },
];

for (const task of tasks) {
  const result = spawnSync(process.execPath, [task.script, ...task.args], {
    stdio: 'inherit',
  });

  if (result.error) {
    console.warn(`${task.label} could not start: ${result.error.message}`);
    console.warn(task.fallback);
    continue;
  }

  if (result.status !== 0) {
    console.warn(`${task.label} exited with status ${result.status}.`);
    console.warn(task.fallback);
    continue;
  }

  console.log(task.success);
}

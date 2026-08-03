#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import process from 'node:process';

const tasks = [
  {
    label: 'Skill data',
    script: 'scripts/sync-roworlddb-skills.mjs',
    fallback: 'Continuing with the committed English skill dataset.',
  },
  {
    label: 'Tool data',
    script: 'scripts/sync-roworlddb-tools.mjs',
    fallback: 'Continuing with committed tool data.',
  },
];

for (const task of tasks) {
  const result = spawnSync(process.execPath, [task.script, '--apply'], {
    stdio: 'inherit',
  });

  if (result.error) {
    console.warn(`${task.label} sync could not start: ${result.error.message}`);
    console.warn(task.fallback);
    continue;
  }

  if (result.status !== 0) {
    console.warn(`${task.label} sync exited with status ${result.status}.`);
    console.warn(task.fallback);
    continue;
  }

  console.log(`Validated RoworldDB SEA ${task.label.toLowerCase()} is ready for this build.`);
}

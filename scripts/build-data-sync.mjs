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
  {
    label: 'SEA exploration markers',
    script: 'scripts/sync-roworlddb-maps.mjs',
    args: ['--apply'],
    success: 'Validated exploration marker packs and icons are ready for this build.',
    fallback: 'Continuing with committed map marker packs for unavailable locales.',
  },
  {
    label: 'SEA catalogue images',
    script: 'scripts/sync-roworlddb-catalogue-assets.mjs',
    args: ['--apply'],
    success: 'Referenced catalogue images are available locally.',
    fallback: 'Available catalogue images were retained; unresolved source images use the existing fallback.',
  },
  {
    label: 'SEA Wardrobe catalogue',
    script: 'scripts/sync-roworlddb-wardrobe.mjs',
    args: ['--apply'],
    success: 'Validated Wardrobe catalogue and local thumbnails are ready for this build.',
    fallback: 'Continuing with the committed Wardrobe catalogue.',
  },
  {
    label: 'MVP guide directory',
    script: 'scripts/sync-map-guide-data.mjs',
    args: [],
    success: 'MVP guide marker counts match the refreshed SEA data.',
    fallback: 'Continuing with the reviewed MVP guide; source needs review.',
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

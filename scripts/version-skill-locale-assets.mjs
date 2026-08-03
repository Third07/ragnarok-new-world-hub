#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';

const path = 'public/sea/skill_planner/index.html';
const version = '20260804-i18n1';
const original = await readFile(path, 'utf8');
const updated = original.replace(
  /\/shared\/share_link\.js\?v=[^"']+/,
  `/shared/share_link.js?v=${version}`,
);

if (updated === original) {
  throw new Error(`Could not find the versioned share_link.js reference in ${path}`);
}

await writeFile(path, updated, 'utf8');
console.log(`Skill locale asset version set to ${version}.`);

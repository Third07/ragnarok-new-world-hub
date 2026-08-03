#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';

const path = 'public/sea/skill_planner/index.html';
const version = '20260804-i18n1';
const pattern = /\/shared\/share_link\.js\?v=[^"']+/;
const original = await readFile(path, 'utf8');

if (!pattern.test(original)) {
  throw new Error(`Could not find the versioned share_link.js reference in ${path}`);
}

const updated = original.replace(pattern, `/shared/share_link.js?v=${version}`);
if (updated !== original) await writeFile(path, updated, 'utf8');
console.log(`Skill locale asset version is ${version}.`);

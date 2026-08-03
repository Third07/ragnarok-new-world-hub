import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

test('HMT comparison is read-only and covers full mechanical fields', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  const script = await read('scripts/compare-roworlddb-hmt-skills.mjs');

  assert.equal(packageJson.scripts['skills:compare:hmt'], 'node scripts/compare-roworlddb-hmt-skills.mjs');
  assert.match(script, /skills_index_zh-TW\.json/);
  assert.match(script, /jobs_zh-TW/);
  assert.match(script, /jobs_en-US/);
  assert.match(script, /pve_percent|comparableObject/);
  assert.match(script, /cooldown|mechanical\/structural differences|Mechanical\/structural differences/);
  assert.match(script, /hmt-vs-sea-report\.json/);
  assert.match(script, /hmt-vs-sea-differences\.csv/);
  assert.match(script, /The command is read-only/);
  assert.doesNotMatch(script, /--apply/);
});

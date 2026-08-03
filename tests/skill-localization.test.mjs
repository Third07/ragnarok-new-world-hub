import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('build performs a nonfatal validated SEA skill sync', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  const wrapper = await read('scripts/build-data-sync.mjs');
  const importer = await read('scripts/sync-roworlddb-skills.mjs');

  assert.equal(packageJson.scripts['data:sync:build'], 'node scripts/build-data-sync.mjs');
  assert.match(packageJson.scripts.prebuild, /data:sync:build/);
  assert.match(wrapper, /sync-roworlddb-skills\.mjs/);
  assert.match(wrapper, /--apply/);
  assert.match(wrapper, /committed English skill dataset/);

  for (const locale of ['en-US', 'zh-CN', 'th-TH', 'id-ID']) {
    assert.match(importer, new RegExp(locale));
  }
});

test('skill planner loads locale routing before simulator requests', async () => {
  const html = await read('public/sea/skill_planner/index.html');
  const shareIndex = html.indexOf('/shared/share_link.js');
  const simulatorIndex = html.indexOf('/sea/skill-simulator/simulator.js');
  assert.ok(shareIndex >= 0, 'share_link.js must be present');
  assert.ok(simulatorIndex > shareIndex, 'share_link.js must load before simulator.js');

  const share = await read('public/shared/share_link.js');
  assert.match(share, /skill_locale_bootstrap\.js/);
  assert.match(share, /document\.write/);
});

test('skill locale bootstrap supports automatic and manual SEA languages', async () => {
  const bootstrap = await read('public/sea/skill-simulator/skill_locale_bootstrap.js');

  for (const locale of ['en-US', 'zh-CN', 'th-TH', 'id-ID']) {
    assert.match(bootstrap, new RegExp(locale));
  }

  assert.match(bootstrap, /navigator\.language/);
  assert.match(bootstrap, /localStorage\.getItem\("ro_lang"\)/);
  assert.match(bootstrap, /url\.searchParams\.set\("lang", next\)/);
  assert.match(bootstrap, /skills_index_\$\{locale\}\.json/);
  assert.match(bootstrap, /jobs_\$\{locale\}/);
  assert.match(bootstrap, /using English/);
});

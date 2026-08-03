import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('build runs guarded tool data synchronization', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  const wrapper = await read('scripts/build-data-sync.mjs');

  assert.equal(packageJson.scripts['tools:data:sync:preview'], 'node scripts/sync-roworlddb-tools.mjs');
  assert.equal(packageJson.scripts['tools:data:sync:apply'], 'node scripts/sync-roworlddb-tools.mjs --apply');
  assert.equal(packageJson.scripts['data:sync:build'], 'node scripts/build-data-sync.mjs');
  assert.match(packageJson.scripts.prebuild, /tools:locales:enable/);
  assert.match(packageJson.scripts.prebuild, /data:sync:build/);
  assert.match(wrapper, /sync-roworlddb-tools\.mjs/);
  assert.match(wrapper, /Continuing with committed tool data/);
});

test('tool sync covers current SEA datasets and validates minimum record counts', async () => {
  const sync = await read('scripts/sync-roworlddb-tools.mjs');

  for (const locale of ['en-US', 'zh-CN', 'th-TH', 'id-ID']) {
    assert.match(sync, new RegExp(locale));
  }

  for (const dataset of [
    'engine_runes',
    'stunt_skill_library',
    'apocalypse_planner',
    'shop',
    'equipment',
    'handbook_cards',
    'monster_album',
    'map_monster_spawns',
    'events',
    'pet_library',
  ]) {
    assert.match(sync, new RegExp(dataset));
  }

  assert.match(sync, /items\) >= 2500/);
  assert.match(sync, /monsters\) >= 2500/);
  assert.match(sync, /entries\) >= 900/);
  assert.match(sync, /packages\) >= 300/);
  assert.match(sync, /source: 'fallback'/);
});

test('SEA locale bootstrap enables manual and automatic language selection', async () => {
  const patcher = await read('scripts/enable-sea-locales.mjs');

  assert.match(patcher, /CLIENT_LOCALES\.SEA/);
  assert.match(patcher, /normalizedQueryLocale \|\| normalizedStoredLocale/);
  assert.match(patcher, /navigator\.languages/);
  assert.match(patcher, /localStorage\.setItem\(\"ro_lang\", activeLocale\)/);
  assert.match(patcher, /zh-CN/);
  assert.match(patcher, /th-TH/);
  assert.match(patcher, /id-ID/);
  assert.match(patcher, /localized source-data fallback/);
});

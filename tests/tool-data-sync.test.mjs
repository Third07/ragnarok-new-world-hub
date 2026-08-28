import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import { validateWeatherData, validatePlacingIndex, validateRefineData, validateQuestionData } from '../scripts/lib/roworlddb-validation.mjs';
import { downloadPlacingPack } from '../scripts/sync-roworlddb-maps.mjs';
import { buildWardrobeIndex } from '../scripts/sync-roworlddb-wardrobe.mjs';
import { loadClientComponent, findNodes } from './helpers/client-component.mjs';

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

test('SEA events, quizzes and refine sync target the files actually read by the tools', async () => {
  const sync = await read('scripts/sync-roworlddb-tools.mjs');
  assert.match(sync, /remote: '\/sea\/events\/data\/events_\{locale\}\.json'/);
  assert.match(sync, /public\/sea\/events\/data\/events_\{locale\}\.json/);
  assert.match(sync, /locale\.toLowerCase\(\)\.replace\('-', '_'\)/);
  assert.match(sync, /public\/sea\/refine\/refine_\$\{locale\}\.json/);
  const events = JSON.parse(await read('public/sea/events/data/events_en-US.json'));
  assert.equal(events.client, 'SEA');
  assert.equal(events.serverOffsetHours, 7);
  assert.ok(events.weeklyEvents.length >= 38);
  assert.ok(events.calendarEvents.length >= 18);
  validateRefineData(JSON.parse(await read('public/sea/refine/refine_en-US.json')));
  for (const bank of ['guild_banquet', 'lucky_rabbit', 'scholar_exam']) validateQuestionData(JSON.parse(await read(`public/sea/study/data/${bank}_questions_en_us.json`)));
});

test('weather validation rejects duplicate IDs, unknown types and invalid coordinates', async () => {
  const weather = JSON.parse(await read('public/sea/map-simulator/data/map_weather_placements.json'));
  const summary = validateWeatherData(weather);
  assert.ok(summary.placements >= 298);
  assert.equal(Object.keys(summary.types).length, 6);
  const maps = JSON.parse(await read('public/sea/map-simulator/data/map_index_en-US.json'));
  assert.ok(weather.placements.every(item => maps.map_configs[item.map_id]), 'Every weather location needs map geometry');
  const item = weather.placements[0];
  assert.throws(() => validateWeatherData({ views: {}, placements: [item, item] }), /duplicate/);
  assert.throws(() => validateWeatherData({ views: {}, placements: [{ ...item, x: null }] }), /coordinates/);
  assert.throws(() => validateWeatherData({ views: {}, placements: [{ ...item, type: 'unreviewed' }] }), /Unsupported/);
});

test('marker import validates an entire pack and refuses unsafe filenames or incomplete files', async () => {
  const index = Array.from({ length: 10 }, (_, i) => ({ file: i === 0 ? 'expl_chest.json' : `type_${i}.json`, mapIds: [101] }));
  const payload = { meta: { infoType: 'Chest' }, data: { '101': [{ id: 1, mapRegionId: 101, objectPos: [1, 2, 3] }] } };
  const get = async (url) => url.endsWith('_index.json') ? index : payload;
  const pack = await downloadPlacingPack('en-US', 'https://example.test', get);
  assert.equal(pack.files.length, 10);
  assert.equal(pack.files[0].summary.positioned, 1);
  await assert.rejects(downloadPlacingPack('en-US', 'https://example.test', async url => url.endsWith('type_8.json') ? { meta: {}, data: {} } : get(url)), /Empty marker file/);
  assert.throws(() => validatePlacingIndex([{ file: '../escape.json', mapIds: [101] }]), /filename/);
  await assert.rejects(downloadPlacingPack('zh-TW', 'https://example.test', get), /Unsupported SEA locale/);
});

async function mapContext(storage = new Map()) {
  const context = vm.createContext({
    window: { location: { pathname: '/sea/maps/', search: '?lang=en-US' }, RO_ACTIVE_LOCALE: 'en-US', addEventListener() {} },
    document: { documentElement: { getAttribute: () => 'en-US', setAttribute() {} }, getElementById: () => null },
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: key => storage.delete(key) },
    navigator: { language: 'en-US', languages: ['en-US'] }, URLSearchParams, console,
  });
  vm.runInContext((await read('public/sea/map-simulator/map_view.js')).replace(/main\(\);\s*$/, ''), context);
  context.maps = JSON.parse(await read('public/sea/map-simulator/data/map_index_en-US.json'));
  context.maps.map_configs[10199999] = { ...context.maps.map_configs[101], map_id: 10199999, scene_id: 999, pic_res: 'icon_map_99999' };
  context.weather = { placements: [
    { id: 1, type: 'butterfly', map_id: 10105, x: 357.94, z: 538.98 },
    { id: 2, type: 'bubble', map_id: 10101, x: 285.12, z: 607.4 },
    { id: 3, type: 'butterfly', map_id: 102, x: 100, z: 100 },
    { id: 4, type: 'bubble', map_id: 10199999, x: 285.12, z: 607.4 },
  ] };
  vm.runInContext('state.mapIndex = maps; state.weatherData = weather; state.currentCenterSceneId = 101; state.openWorldCenters = new Set([101, 102]); state.enabledFiles = new Set(["weather:butterfly", "weather:bubble"]);', context);
  return context;
}

test('weather layers use current-map coordinates, filters and persistent completion without touching chest progress', async () => {
  const storage = new Map();
  const context = await mapContext(storage);
  const run = code => vm.runInContext(code, context);
  assert.equal(run('isRelevantMapRegionId(10199999)'), false, 'An unrelated map sharing the 101 prefix must not leak into Prontera');
  assert.equal(run('getWeatherMarkers(2048, 2048).length'), 2);
  assert.equal(run('getWeatherMarkers(2048, 2048)[0].worldX'), 357.94);
  assert.ok(run('getWeatherMarkers(2048, 2048).every(marker => Number.isFinite(marker.x) && Number.isFinite(marker.y))'));
  run('state.enabledFiles.delete("weather:bubble")');
  assert.equal(run('getWeatherMarkers(2048, 2048).length'), 1);
  run('closeQuestModal = () => {}; renderMarkers = () => {}; refreshCheckedVisibility = () => {}; setQuestCompleted({ id: 1, weatherType: "butterfly" }, true); state.hideCollectedChests = true;');
  assert.equal(run('getWeatherMarkers(2048, 2048).length'), 0);
  assert.equal(storage.get('sea_weather_butterfly'), '[1]');
  assert.equal(storage.has('sea_monster_chest'), false);
  const reloaded = await mapContext(storage);
  assert.equal(vm.runInContext('isQuestCompleted({ id: 1, weatherType: "butterfly" })', reloaded), true);
  assert.equal(vm.runInContext('isQuestCompleted({ id: 1, weatherType: "bubble" })', reloaded), false);
  assert.equal(run('getQuestStorageType({ file: "landmark_photography.json", id: 10 })'), 'photo');
  assert.equal(run('getQuestStorageId({ file: "landmark_photography.json", id: 10 })'), 10);
  run('state.mapIndex.map_configs[101].scene_id = 4321');
  assert.equal(run('isRelevantMapRegionId(4321)'), true);
  assert.equal(run('getItemMapCfgMatch({ sceneId: 4321 }, getMapCfg(101)) === getMapCfg(101)'), true);
});

test('Wardrobe catalogue excludes placeholders and uses existing local image assets', async () => {
  const fixture = { tabs: [{ part_id: 101, name: 'Set' }], jobs: [{ id: 201, name: 'Swordman' }], items: Array.from({ length: 505 }, (_, i) => ({ id: i, name: i === 2 ? '' : `Set ${i}`, picture_path: 'ui_icons/set.webp', part_id: 101, sex: 1, if_blocked: i === 3 })) };
  fixture.items.push({ ...fixture.items[1], id: 506, sex: 2 });
  const generated = buildWardrobeIndex(fixture);
  assert.equal(generated.items.some(item => [0, 2, 3].includes(item.id)), false);
  assert.equal(generated.items.find(item => item.id === 506).gender, 'female');
  const catalogue = JSON.parse(await read('public/sea/wardrobe/data/wardrobe_index_en-US.json'));
  assert.ok(catalogue.items.length >= 776);
  assert.equal(catalogue.items.length, new Set(catalogue.items.map(item => item.id)).size);
  for (const image of new Set(catalogue.items.map(item => item.image))) {
    assert.match(image, /^\/(?:media\/images|sea\/wardrobe\/assets)\/[a-zA-Z0-9_/-]+\.webp$/);
    await access(new URL(`../public${image}`, import.meta.url));
  }
});

test('Wardrobe filters, pagination and shared URLs operate on the real catalogue', async () => {
  const catalogue = JSON.parse(await read('public/sea/wardrobe/data/wardrobe_index_en-US.json'));
  const location = { href: 'https://rtnw.online/database/wardrobe/?gender=female&lang=en-US', search: '?gender=female&lang=en-US' };
  const copied = [];
  const harness = await loadClientComponent('app/database/wardrobe/WardrobeCatalogue.tsx', { globals: {
    AbortController,
    fetch: async () => ({ ok: true, json: async () => catalogue }),
    navigator: { clipboard: { writeText: async value => copied.push(value) } },
    window: { location, addEventListener() {}, removeEventListener() {}, history: { replaceState(_, __, url) { location.href = new URL(url, location.href).href; location.search = new URL(location.href).search; } } },
  } });
  harness.render();
  await new Promise(resolve => setImmediate(resolve));
  let tree = harness.render();
  const cards = current => findNodes(current, node => node.type === 'article');
  assert.equal(cards(tree).length, 36);
  const gender = findNodes(tree, node => node.props.id === 'wardrobe-gender')[0];
  assert.equal(gender.props.value, 'female');
  findNodes(tree, node => node.type === 'button' && node.props.children === 'Show more items')[0].props.onClick();
  tree = harness.render();
  assert.equal(cards(tree).length, 72);
  findNodes(tree, node => node.props.id === 'wardrobe-search')[0].props.onChange({ target: { value: 'Bunny Sailor' } });
  tree = harness.render();
  const expected = catalogue.items.filter(item => item.name.toLowerCase().includes('bunny sailor') && item.gender !== 'male');
  assert.equal(cards(tree).length, expected.length);
  await findNodes(tree, node => node.type === 'button' && node.props.children === 'Copy filter link')[0].props.onClick();
  assert.match(copied[0], /q=Bunny\+Sailor/);
  assert.match(copied[0], /lang=en-US/);
  harness.unmount();
});

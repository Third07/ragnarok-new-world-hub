#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';

const guidePath = 'app/guides/source-guide-data/mvp-hunting.ts';
const json = async (file) => JSON.parse(await readFile(file, 'utf8'));
const [monsters, maps, spawns, original] = await Promise.all([
  json('source-data/sea/monster-album/data/monster_album_en-US.json'),
  json('public/sea/map-simulator/data/map_index_en-US.json'),
  json('public/sea/map-simulator/data/map_monster_spawns_en-US.json'),
  readFile(guidePath, 'utf8'),
]);
const directoryPattern = /(id: "mapped-directory"[\s\S]*?rows: \[)([\s\S]*?)(\n        \])/;
const current = original.match(directoryPattern);
if (!current) throw new Error('MVP guide directory not found');
const order = [...current[2].matchAll(/\["([^"]+) · Lv\./g)].map((match) => match[1]);
const byId = new Map(monsters.monsters.map((monster) => [monster.id, monster]));
const records = Object.values(spawns.views).flatMap((view) => view.monsters.filter((monster) => monster.family === 'mvp').map((spawn) => ({ ...spawn, mapId: view.map_id })));
if (records.length < 20 || records.length < order.length * 0.8) throw new Error('Incomplete MVP source; preserving guide');
records.sort((a, b) => {
  const ai = order.indexOf(a.name), bi = order.indexOf(b.name);
  return (ai < 0 ? Infinity : ai) - (bi < 0 ? Infinity : bi) || a.name.localeCompare(b.name);
});
const rows = records.map((spawn) => {
  const monster = byId.get(spawn.monster_id);
  const map = maps.map_configs[spawn.mapId];
  if (!monster?.element?.name || !monster?.race?.name || !monster?.body?.name || !map?.name) throw new Error(`Incomplete MVP record: ${spawn.name}`);
  return [`${spawn.name} · Lv.${monster.level}`, map.name, `${monster.element.name} · ${monster.race.name} · ${monster.body.name}`, `${spawn.collected_spawn_spots} of ${spawn.total_spawn_spots}`];
});
const table = rows.map((row) => `\n          [${row.map((value) => JSON.stringify(value)).join(', ')}],`).join('');
let updated = original.replace(directoryPattern, (_, start, oldRows, end) => `${start}${table}${end}`)
  .replace(/\d+ mapped MVP records included/, `${rows.length} mapped MVP records included`)
  .replace(/\d+ current SEA map records/, `${rows.length} current SEA map records`);
if (updated !== original) {
  const date = new Date().toISOString().slice(0, 10);
  updated = updated.replace(/modified: "[^"]+"/, `modified: "${date}"`);
  await writeFile(guidePath, updated);
  for (const file of ['public/sitemap.xml', 'public/content-sitemap.xml']) {
    const sitemap = await readFile(file, 'utf8');
    await writeFile(file, sitemap.replace(/(<loc>https:\/\/rtnw\.online\/guides\/mvp-hunting\/<\/loc>[\s\S]*?<lastmod>)[^<]+/, `$1${date}`));
  }
}
console.log(`MVP guide: ${rows.length} mapped records aligned with current SEA data.`);

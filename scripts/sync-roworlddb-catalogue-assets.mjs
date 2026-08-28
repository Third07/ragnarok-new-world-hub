#!/usr/bin/env node
import { mkdir, readFile, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';

const apply = process.argv.includes('--apply');
const origin = 'https://www.roworlddb.com';
const json = async (file) => JSON.parse(await readFile(file, 'utf8'));
const iconPaths = await json('public/sea/skill-simulator/data/icon_paths.json');
const files = [
  'source-data/sea/equipment/data/equipment_en-US.json',
  'source-data/sea/shop/data/shop_en-US.json',
  'source-data/sea/monster-album/data/monster_album_en-US.json',
  'source-data/sea/affix-simulator/data/stunt_skill_library_en-US.json',
  'public/sea/skill-simulator/data/engine_runes_en-US.json',
  'public/sea/apocalypse-simulator/data/apocalypse_planner_en-US.json',
  'public/sea/card-simulator/data/handbook_cards_en-US.json',
  'public/sea/pet/data/pet_library_en-US.json',
  'public/sea/events/data/events_en-US.json',
];
const images = new Set();
function addImage(value) {
  if (/^\/media\/images\/[a-zA-Z0-9_/-]+\.webp$/.test(value)) images.add(value);
}
function collect(value) {
  if (Array.isArray(value)) value.forEach(collect);
  else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  else if (typeof value === 'string') {
    addImage(value);
    if (/^icon_[a-zA-Z0-9_]+$/.test(value) && typeof iconPaths[value] === 'string') {
      addImage(`/media/images/${iconPaths[value].replace(/\\/g, '/').replace(/\.png$/i, '.webp')}`);
    }
  }
}
for (const file of files) collect(await json(file));

const report = { checkedAt: new Date().toISOString(), apply, referenced: images.size, present: 0, downloaded: [], unavailable: [] };
async function inspectImage(image) {
  const file = `public${image}`;
  try { await readFile(file); report.present += 1; return; } catch {}
  try {
    const response = await fetch(`${origin}${image}`, { signal: AbortSignal.timeout(20_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw new Error('Not a WebP image');
    if (apply) {
      await mkdir(path.dirname(file), { recursive: true });
      const temp = `${file}.tmp-${process.pid}`;
      await writeFile(temp, bytes);
      await rename(temp, file);
    }
    report.downloaded.push({ image, bytes: bytes.length, saved: apply });
  } catch (error) { report.unavailable.push({ image, reason: error.message }); }
}
const references = [...images].sort();
for (let offset = 0; offset < references.length; offset += 4) await Promise.all(references.slice(offset, offset + 4).map(inspectImage));
await mkdir('.tool-data-import/roworlddb-sea', { recursive: true });
await writeFile('.tool-data-import/roworlddb-sea/catalogue-image-report.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(`Catalogue images: ${report.present} present, ${report.downloaded.length} ${apply ? 'downloaded' : 'available'}, ${report.unavailable.length} unavailable at source.`);
if (report.unavailable.length) process.exitCode = 1;

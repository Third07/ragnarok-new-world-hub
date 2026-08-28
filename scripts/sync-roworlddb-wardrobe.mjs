#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SOURCE = 'https://www.roworlddb.com/sea/wardrobe/assets/wardrobe_schema.json';
const OUTPUT = 'public/sea/wardrobe/data/wardrobe_index_en-US.json';
const REPORT = '.tool-data-import/roworlddb-sea/wardrobe-report.json';
const hash = (value) => createHash('sha256').update(value).digest('hex');

export function buildWardrobeIndex(source) {
  if (!Array.isArray(source?.items) || source.items.length < 500 || !Array.isArray(source.tabs) || !Array.isArray(source.jobs)) throw new Error('Incomplete Wardrobe schema');
  const categories = new Map(source.tabs.filter((tab) => Number.isInteger(tab.part_id)).map((tab) => [tab.part_id, tab.name]));
  for (const item of source.items) {
    if (Number.isInteger(item.part_id) && !categories.has(item.part_id)) categories.set(item.part_id, 'Other');
  }
  const ids = new Set();
  const items = source.items.filter((item) => item.id > 0 && String(item.name || '').trim() && !item.if_blocked).map((item) => {
    if (ids.has(item.id) || !Number.isInteger(item.id) || !categories.has(item.part_id) || !/^ui_icons\/[a-zA-Z0-9_-]+\.webp$/.test(item.picture_path || '')) throw new Error(`Invalid Wardrobe item: ${item.id}`);
    ids.add(item.id);
    return {
      id: item.id, name: item.name, categoryId: item.part_id, category: categories.get(item.part_id),
      gender: item.sex === 1 ? 'male' : item.sex === 2 ? 'female' : 'any',
      jobId: Number(item.job) || null,
      dyeable: Boolean(item.if_dye), highlights: Boolean(item.if_highlight),
      image: `/sea/wardrobe/assets/${item.picture_path}`,
    };
  });
  if (items.length < 500) throw new Error('Wardrobe catalogue has too few usable items');
  return {
    schemaVersion: 1, client: 'SEA', locale: 'en-US', source: SOURCE,
    categories: [...categories].filter(([id]) => items.some((item) => item.categoryId === id)).map(([id, name]) => ({ id, name })),
    jobs: source.jobs.map(({ id, name }) => ({ id, name })), items,
  };
}

async function writeAtomic(file, contents) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.tmp-${process.pid}`;
  await writeFile(temporary, contents);
  await rename(temporary, file);
}

async function localImages(directory, result = new Map()) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await localImages(file, result);
    else if (entry.name.endsWith('.webp') && !result.has(entry.name)) result.set(entry.name, `/${file.replace(/^public\//, '')}`);
  }
  return result;
}

export async function syncWardrobe({ apply = false } = {}) {
  const response = await fetch(SOURCE, { signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`Wardrobe schema: HTTP ${response.status}`);
  const raw = await response.text();
  const index = buildWardrobeIndex(JSON.parse(raw));
  const images = await localImages('public/media/images');
  const missing = new Map();
  let reused = 0;
  for (const item of index.items) {
    const name = path.basename(item.image);
    if (images.has(name)) { item.image = images.get(name); reused += 1; }
    else missing.set(item.image, `https://www.roworlddb.com${item.image}`);
  }
  const assets = [];
  const entries = [...missing];
  for (let offset = 0; offset < entries.length; offset += 4) {
    const batch = await Promise.all(entries.slice(offset, offset + 4).map(async ([file, url]) => {
      try { await readFile(`public${file}`); return { file, status: 'present' }; } catch {}
      const response = await fetch(url, { signal: AbortSignal.timeout(20_000) });
      if (!response.ok) throw new Error(`Wardrobe thumbnail ${file}: HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw new Error(`Invalid Wardrobe thumbnail: ${file}`);
      if (apply) await writeAtomic(`public${file}`, bytes);
      return { file, status: apply ? 'downloaded' : 'available', bytes: bytes.length, sha256: hash(bytes) };
    }));
    assets.push(...batch);
  }
  let previous;
  try { previous = JSON.parse(await readFile(OUTPUT, 'utf8')); } catch {}
  if (previous?.items && index.items.length < previous.items.length * 0.8) throw new Error('Wardrobe shrank by more than 20%; review required');
  const report = { checkedAt: new Date().toISOString(), source: SOURCE, sourceSha256: hash(raw), apply, sourceItems: JSON.parse(raw).items.length, items: index.items.length, categories: index.categories.length, reusedImages: reused, assets };
  if (apply) await writeAtomic(OUTPUT, `${JSON.stringify(index)}\n`);
  await writeAtomic(REPORT, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Wardrobe: ${index.items.length} named items, ${index.categories.length} categories, ${reused} reused thumbnails.`);
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { await syncWardrobe({ apply: process.argv.includes('--apply') }); }
  catch (error) { console.error(`Wardrobe preserved: ${error.message}`); process.exitCode = 1; }
}

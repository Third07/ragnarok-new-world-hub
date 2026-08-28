#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePlacingIndex, validatePlacingData } from './lib/roworlddb-validation.mjs';

const LOCALES = ['en-US', 'zh-CN', 'th-TH', 'id-ID'];
const DATA_ROOT = 'public/sea/map-simulator/data';
const sha = (value) => createHash('sha256').update(value).digest('hex');

async function getJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30_000), headers: { 'User-Agent': 'RTNW-Hub map-data sync (+https://rtnw.online/)' } });
  if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
  return response.json();
}

async function readJson(file) {
  try { return JSON.parse(await readFile(file, 'utf8')); } catch { return null; }
}

async function writeAtomic(file, contents) {
  await mkdir(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp-${process.pid}`;
  await writeFile(temp, contents);
  await rename(temp, file);
}

// The full index and every referenced file must validate before the caller can apply a pack.
export async function downloadPlacingPack(locale, origin, fetchJson = getJson) {
  if (!LOCALES.includes(locale)) throw new Error(`Unsupported SEA locale: ${locale}`);
  const root = `${origin}/sea/map-simulator/data/interactive_placing_${locale}/`;
  const index = validatePlacingIndex(await fetchJson(`${root}_index.json`));
  if (index.length < 10 || !index.some((entry) => entry.file === 'expl_chest.json')) throw new Error('Incomplete marker category index');
  const files = [];
  // Bounded parallel requests; no independent request can publish part of a pack.
  for (let offset = 0; offset < index.length; offset += 4) {
    const batch = await Promise.all(index.slice(offset, offset + 4).map(async (entry) => {
      const data = await fetchJson(`${root}${entry.file}`);
      const summary = validatePlacingData(data, entry);
      return { file: entry.file, data, summary, source: `${root}${entry.file}` };
    }));
    files.push(...batch);
  }
  return { index, files, source: root };
}

async function syncIcon(relativePath, origin, apply) {
  const destination = path.join('public', relativePath);
  try { await readFile(destination); return { path: relativePath, status: 'present' }; } catch {}
  const response = await fetch(`${origin}/${relativePath}`, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) throw new Error(`${relativePath}: HTTP ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') throw new Error(`Invalid WebP: ${relativePath}`);
  if (apply) await writeAtomic(destination, bytes);
  return { path: relativePath, status: apply ? 'downloaded' : 'available', bytes: bytes.length, sha256: sha(bytes) };
}

export async function syncMaps({ apply = false, origin = 'https://www.roworlddb.com', locales = LOCALES } = {}) {
  const reportDir = '.tool-data-import/roworlddb-sea/maps';
  const report = { checkedAt: new Date().toISOString(), origin, apply, locales: [], assets: [], errors: [] };
  const icons = new Set(['butterfly', 'bubble', 'sunchest', 'snow'].map((name) => `media/images/custom_art_cs/${name}.webp`));
  for (const locale of locales) {
    const destination = `${DATA_ROOT}/interactive_placing_${locale}`;
    try {
      const pack = await downloadPlacingPack(locale, origin);
      const previousIndex = await readJson(`${destination}/_index.json`);
      if (previousIndex && pack.index.length < previousIndex.length * 0.8) throw new Error('Marker categories shrank by more than 20%; review required');
      for (const file of pack.files) {
        const previous = await readJson(`${destination}/${file.file}`);
        file.previousRecords = previous ? Object.values(previous.data || {}).flat().length : 0;
        if (file.previousRecords && file.summary.records < file.previousRecords * 0.8) throw new Error(`${file.file} shrank by more than 20%; review required`);
        file.changed = JSON.stringify(previous) !== JSON.stringify(file.data);
        file.contents = `${JSON.stringify(file.data)}\n`;
        file.sha256 = sha(file.contents);
        for (const icon of [file.data.meta.typeIcon, ...Object.values(file.data.data).flat().map((row) => row.markIcon)]) {
          if (typeof icon === 'string' && /^[a-zA-Z0-9_]+$/.test(icon) && icon !== 'null') icons.add(`media/images/map_mark/${icon}.webp`);
        }
      }
      // Staging is always written. The live index is written last, after the entire pack is validated.
      for (const file of pack.files) await writeAtomic(`${reportDir}/${locale}/${file.file}`, file.contents);
      await writeAtomic(`${reportDir}/${locale}/_index.json`, `${JSON.stringify(pack.index)}\n`);
      if (apply) {
        for (const file of pack.files) await writeAtomic(`${destination}/${file.file}`, file.contents);
        await writeAtomic(`${destination}/_index.json`, `${JSON.stringify(pack.index)}\n`);
      }
      const summary = { locale, status: apply ? 'updated' : 'validated', categories: pack.index.length, records: pack.files.reduce((n, file) => n + file.summary.records, 0), files: pack.files.map(({ data, contents, ...file }) => file) };
      report.locales.push(summary);
      console.log(`${locale}: ${summary.categories} categories, ${summary.records} marker records`);
    } catch (error) {
      report.errors.push({ locale, error: error.message });
      console.warn(`${locale}: preserved existing marker pack (${error.message})`);
    }
  }
  for (const icon of icons) {
    try { report.assets.push(await syncIcon(icon, origin, apply)); }
    catch (error) { report.errors.push({ asset: icon, error: error.message }); }
  }
  await writeAtomic(`${reportDir}/map-data-report.json`, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await syncMaps({ apply: process.argv.includes('--apply') });
  if (report.errors.length) process.exitCode = 1;
}

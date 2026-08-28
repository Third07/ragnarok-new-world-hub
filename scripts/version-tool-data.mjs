#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Version fetch URLs from canonical source data, not the date or generated chunks.
const groups = {
  rune_planner: ['public/sea/skill-simulator/data', /^engine_runes_.*\.json$/],
  affix_planner: ['source-data/sea/affix-simulator/data', /\.json$/],
  apocalypse_planner: ['public/sea/apocalypse-simulator/data', /\.json$/],
  shop: ['source-data/sea/shop/data', /\.json$/],
  equipment: ['source-data/sea/equipment/data', /\.json$/],
  cards: ['public/sea/card-simulator/data', /^(handbook_cards_|card_fusion_simulator_)/],
  monster_album: ['source-data/sea/monster-album/data', /\.json$/],
  maps: ['public/sea/map-simulator/data', /\.json$/],
  events: ['public/sea/events/data', /\.json$/],
  study: ['public/sea/study/data', /\.json$/],
  pet: ['public/sea/pet/data', /\.json$/],
  refine: ['public/sea/refine', /^refine_.*\.json$/],
};

async function filesIn(directory, match) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(file, match));
    else if (match.test(entry.name)) files.push(file);
  }
  return files.sort();
}
const icons = await readFile('public/sea/skill-simulator/data/icon_paths.json');
const versions = new Map();
for (const [tool, [directory, match]] of Object.entries(groups)) {
  const hash = createHash('sha256').update(icons);
  const dataFiles = await filesIn(directory, match);
  if (tool === 'cards') dataFiles.push('source-data/sea/monster-album/data/monster_album_en-US.json');
  if (tool === 'affix_planner') dataFiles.push(...await filesIn('public/sea/affix-simulator/data', /^stunt_package_index_/));
  for (const file of dataFiles) hash.update(file).update(await readFile(file));
  const file = `public/sea/${tool}/index.html`;
  let html = await readFile(file, 'utf8');
  const original = html;
  const version = `data-${hash.digest('hex').slice(0, 16)}`;
  html = html.replace(/(<meta name="asset-version" content=")[^"]+/, `$1${version}`);
  // Entry scripts and styles must also refresh when their contents change.
  for (const match of html.matchAll(/(?:src|href)="([^"#]+\.(?:css|m?js)(?:\?[^"#]*)?)"/g)) {
    const url = new URL(match[1], `https://rtnw.online/sea/${tool}/`);
    if (url.origin !== 'https://rtnw.online') continue;
    const asset = `public${url.pathname}`;
    try {
      if (!(await stat(asset)).isFile()) continue;
      if (!versions.has(asset)) versions.set(asset, createHash('sha256').update(await readFile(asset)).digest('hex').slice(0, 16));
      url.searchParams.set('v', versions.get(asset));
      html = html.replaceAll(`"${match[1]}"`, `"${url.pathname}${url.search}"`);
    } catch { /* Keep existing references for optional files. */ }
  }
  if (html !== original) await writeFile(file, html);
  console.log(`${tool}: ${version}`);
}

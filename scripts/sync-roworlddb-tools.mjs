#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const ORIGIN = 'https://www.roworlddb.com';
const LOCALES = ['en-US', 'zh-CN', 'th-TH', 'id-ID'];
const REPORT_DIR = path.resolve('.tool-data-import/roworlddb-sea');

function parseArgs(argv) {
  const args = { apply: false, strict: false, origin: ORIGIN, reportDir: REPORT_DIR };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--apply') args.apply = true;
    else if (value === '--strict') args.strict = true;
    else if (value === '--origin') args.origin = String(argv[++index] || '').replace(/\/+$/, '');
    else if (value === '--report-dir') args.reportDir = path.resolve(argv[++index] || '');
    else if (value === '--help' || value === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${value}`);
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/sync-roworlddb-tools.mjs [options]\n\nOptions:\n  --apply                 Write validated data into source-data/public\n  --strict                Exit non-zero if any remote dataset fails\n  --origin <url>          Override RoworldDB origin\n  --report-dir <dir>      Report destination\n  --help                  Show this message\n\nDefault mode downloads, validates, and reports without changing production data.`);
}

function count(value) {
  return Array.isArray(value) ? value.length : value && typeof value === 'object' ? Object.keys(value).length : 0;
}

const DATASETS = [
  {
    tool: 'rune_planner', key: 'engine_runes',
    remote: '/sea/skill-simulator/data/engine_runes_{locale}.json',
    destinations: ['public/sea/skill-simulator/data/engine_runes_{locale}.json'],
    fallback: ['public/sea/skill-simulator/data/engine_runes_en-US.json'],
    validate: (data) => count(data?.baseItems) >= 10 && count(data?.effectConfigs) >= 100,
    summarize: (data) => ({ baseItems: count(data?.baseItems), effectConfigs: count(data?.effectConfigs), effects: count(data?.effectGroups) }),
  },
  {
    tool: 'affix_planner', key: 'stunt_package_index',
    remote: '/sea/affix-simulator/data/stunt_package_index_{locale}.json',
    destinations: ['public/sea/affix-simulator/data/stunt_package_index_{locale}.json'],
    fallback: ['public/sea/affix-simulator/data/stunt_package_index_en-US.json'],
    validate: (data) => count(data?.weapon_types) >= 15 && count(data?.assembly_types) >= 10,
    summarize: (data) => ({ weaponTypes: count(data?.weapon_types), assemblyTypes: count(data?.assembly_types) }),
  },
  {
    tool: 'affix_planner', key: 'stunt_skill_library',
    remote: '/sea/affix-simulator/data/stunt_skill_library_{locale}.json',
    destinations: ['source-data/sea/affix-simulator/data/stunt_skill_library_{locale}.json'],
    fallback: ['source-data/sea/affix-simulator/data/stunt_skill_library_en-US.json', 'public/sea/affix-simulator/data/stunt_skill_library_en-US.json'],
    validate: (data) => count(data?.packages) >= 300,
    summarize: (data) => ({ packages: count(data?.packages) }),
  },
  {
    tool: 'apocalypse_planner', key: 'apocalypse_planner',
    remote: '/sea/apocalypse-simulator/data/apocalypse_planner_{locale}.json',
    destinations: ['public/sea/apocalypse-simulator/data/apocalypse_planner_{locale}.json'],
    fallback: ['public/sea/apocalypse-simulator/data/apocalypse_planner_en-US.json'],
    validate: (data) => count(data?.entries) >= 900,
    summarize: (data) => ({ entries: count(data?.entries) }),
  },
  {
    tool: 'shop', key: 'shop',
    remote: '/sea/shop/data/shop_{locale}.json',
    destinations: ['source-data/sea/shop/data/shop_{locale}.json'],
    fallback: ['source-data/sea/shop/data/shop_en-US.json', 'public/sea/shop/data/shop_en-US.json'],
    validate: (data) => count(data?.items) >= 600,
    summarize: (data) => ({ items: count(data?.items), currencies: count(data?.currencies) }),
  },
  {
    tool: 'equipment', key: 'equipment',
    remote: '/sea/equipment/data/equipment_{locale}.json',
    destinations: ['source-data/sea/equipment/data/equipment_{locale}.json'],
    fallback: ['source-data/sea/equipment/data/equipment_en-US.json', 'public/sea/equipment/data/equipment_en-US.json'],
    validate: (data) => count(data?.items) >= 2500 && count(data?.jobs) >= 35,
    summarize: (data) => ({ items: count(data?.items), jobs: count(data?.jobs), suits: count(data?.suits) }),
  },
  {
    tool: 'cards', key: 'handbook_cards',
    remote: '/sea/card-simulator/data/handbook_cards_{locale}.json',
    destinations: ['public/sea/card-simulator/data/handbook_cards_{locale}.json'],
    fallback: ['public/sea/card-simulator/data/handbook_cards_en-US.json'],
    validate: (data) => count(data?.cards) >= 150,
    summarize: (data) => ({ cards: count(data?.cards) }),
  },
  {
    tool: 'monster_album', key: 'monster_album',
    remote: '/sea/monster-album/data/monster_album_{locale}.json',
    destinations: ['source-data/sea/monster-album/data/monster_album_{locale}.json'],
    fallback: ['source-data/sea/monster-album/data/monster_album_en-US.json', 'public/sea/monster-album/data/monster_album_en-US.json'],
    validate: (data) => count(data?.monsters) >= 2500,
    summarize: (data) => ({ monsters: count(data?.monsters) }),
  },
  {
    tool: 'maps', key: 'map_index',
    remote: '/sea/map-simulator/data/map_index_{locale}.json',
    destinations: ['public/sea/map-simulator/data/map_index_{locale}.json'],
    fallback: ['public/sea/map-simulator/data/map_index_en-US.json'],
    validate: (data) => count(data?.map_configs) >= 300,
    summarize: (data) => ({ maps: count(data?.map_configs), worldMaps: count(data?.world_maps) }),
  },
  {
    tool: 'maps', key: 'map_monster_spawns',
    remote: '/sea/map-simulator/data/map_monster_spawns_{locale}.json',
    destinations: ['public/sea/map-simulator/data/map_monster_spawns_{locale}.json'],
    fallback: ['public/sea/map-simulator/data/map_monster_spawns_en-US.json'],
    validate: (data) => count(data?.views) >= 20,
    summarize: (data) => ({ views: count(data?.views) }),
  },
  {
    tool: 'maps', key: 'map_subregions',
    remote: '/sea/map-simulator/data/map_subregions_{locale}.json',
    destinations: ['public/sea/map-simulator/data/map_subregions_{locale}.json'],
    fallback: ['public/sea/map-simulator/data/map_subregions_en-US.json'],
    validate: (data) => count(data?.subregions) >= 40,
    summarize: (data) => ({ subregions: count(data?.subregions) }),
  },
  {
    tool: 'events', key: 'events',
    remote: '/events/data/events_{locale}.json',
    destinations: ['public/events/data/events_{locale}.json'],
    fallback: ['public/events/data/events_en-US.json'],
    validate: (data) => count(data?.weeklyEvents) >= 20,
    summarize: (data) => ({ weeklyEvents: count(data?.weeklyEvents), calendarEvents: count(data?.calendarEvents) }),
  },
  {
    tool: 'pet', key: 'pet_library',
    remote: '/sea/pet/data/pet_library_{locale}.json',
    destinations: ['public/sea/pet/data/pet_library_{locale}.json'],
    fallback: ['public/sea/pet/data/pet_library_en-US.json'],
    validate: (data) => count(data?.pets) >= 20,
    summarize: (data) => ({ pets: count(data?.pets) }),
  },
];

const SHARED_DATASETS = [
  {
    tool: 'maps', key: 'map_weather_placements',
    remote: '/sea/map-simulator/data/map_weather_placements.json',
    destinations: ['public/sea/map-simulator/data/map_weather_placements.json'],
    fallback: ['public/sea/map-simulator/data/map_weather_placements.json'],
    validate: (data) => count(data?.placements) >= 200,
    summarize: (data) => ({ placements: count(data?.placements) }),
  },
  {
    tool: 'cards', key: 'card_fusion_simulator',
    remote: '/sea/card-simulator/data/card_fusion_simulator_zh-TW.json',
    destinations: ['public/sea/card-simulator/data/card_fusion_simulator_zh-TW.json'],
    fallback: ['public/sea/card-simulator/data/card_fusion_simulator_zh-TW.json'],
    validate: (data) => count(data?.cards) >= 150 && count(data?.random_options) >= 250,
    summarize: (data) => ({ cards: count(data?.cards), randomOptions: count(data?.random_options) }),
  },
  {
    tool: 'shared', key: 'icon_paths',
    remote: '/sea/skill-simulator/data/icon_paths.json',
    destinations: ['public/sea/skill-simulator/data/icon_paths.json'],
    fallback: ['public/sea/skill-simulator/data/icon_paths.json'],
    validate: (data) => count(data) >= 5000,
    summarize: (data) => ({ icons: count(data) }),
  },
];

const OPTIONAL_DATASETS = LOCALES.flatMap((locale) => [
  {
    tool: 'study', key: 'guild_banquet_questions', locale,
    remote: `/sea/study/data/guild_banquet_questions_${locale}.json`,
    destination: `public/sea/study/data/guild_banquet_questions_${locale}.json`,
  },
  {
    tool: 'study', key: 'lucky_rabbit_questions', locale,
    remote: `/sea/study/data/lucky_rabbit_questions_${locale}.json`,
    destination: `public/sea/study/data/lucky_rabbit_questions_${locale}.json`,
  },
  {
    tool: 'study', key: 'scholar_exam_questions', locale,
    remote: `/sea/study/data/scholar_exam_questions_${locale}.json`,
    destination: `public/sea/study/data/scholar_exam_questions_${locale}.json`,
  },
  {
    tool: 'refine', key: 'refine', locale,
    remote: `/sea/refine-simulator/data/refine_${locale}.json`,
    destination: `public/sea/refine-simulator/data/refine_${locale}.json`,
  },
]);

function formatPath(template, locale) {
  return template.replaceAll('{locale}', locale);
}

function sha256(text) {
  return createHash('sha256').update(text).digest('hex');
}

async function fetchJson(url, timeoutMs = 30_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json,text/plain;q=0.9,*/*;q=0.1',
        'user-agent': 'RTNW-Hub tool-data verifier/1.0 (+https://rtnw.online/)',
      },
      redirect: 'follow',
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch (error) { throw new Error(`Invalid JSON: ${error.message}`); }
    return { data, text, url: response.url };
  } finally {
    clearTimeout(timer);
  }
}

async function readLocalJson(paths) {
  for (const candidate of paths) {
    try {
      const text = await readFile(path.resolve(candidate), 'utf8');
      return { data: JSON.parse(text), text, url: `local:${candidate}` };
    } catch {}
  }
  return null;
}

async function writeAtomic(destination, text) {
  const absolute = path.resolve(destination);
  await mkdir(path.dirname(absolute), { recursive: true });
  const temporary = `${absolute}.tmp-${process.pid}`;
  await writeFile(temporary, `${JSON.stringify(JSON.parse(text))}\n`, 'utf8');
  await rename(temporary, absolute);
}

async function resolveDataset(dataset, locale, origin) {
  const remotePath = formatPath(dataset.remote, locale);
  const remoteUrl = `${origin}${remotePath}`;
  try {
    const result = await fetchJson(remoteUrl);
    if (!dataset.validate(result.data)) throw new Error('Validation failed');
    return { ...result, source: 'remote', remoteUrl };
  } catch (error) {
    const fallback = await readLocalJson(dataset.fallback.map((entry) => formatPath(entry, locale)));
    if (!fallback || !dataset.validate(fallback.data)) {
      throw new Error(`${remoteUrl}: ${error.message}; no valid local fallback`);
    }
    return { ...fallback, source: 'fallback', remoteUrl, warning: error.message };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return printHelp();
  await mkdir(args.reportDir, { recursive: true });

  const report = {
    schemaVersion: 1,
    source: 'RoworldDB SEA public tool data',
    origin: args.origin,
    checkedAt: new Date().toISOString(),
    apply: args.apply,
    records: [],
    optional: [],
    errors: [],
  };

  for (const dataset of DATASETS) {
    for (const locale of LOCALES) {
      try {
        const result = await resolveDataset(dataset, locale, args.origin);
        const destinations = dataset.destinations.map((entry) => formatPath(entry, locale));
        if (args.apply) {
          for (const destination of destinations) await writeAtomic(destination, result.text);
        }
        report.records.push({
          tool: dataset.tool,
          key: dataset.key,
          locale,
          source: result.source,
          sourceUrl: result.url,
          remoteUrl: result.remoteUrl,
          destinations,
          bytes: Buffer.byteLength(result.text),
          sha256: sha256(result.text),
          summary: dataset.summarize(result.data),
          warning: result.warning || null,
        });
        console.log(`${dataset.tool}/${dataset.key}/${locale}: ${result.source}`);
      } catch (error) {
        report.errors.push({ tool: dataset.tool, key: dataset.key, locale, error: error.message });
        console.warn(`${dataset.tool}/${dataset.key}/${locale}: ${error.message}`);
      }
    }
  }

  for (const dataset of SHARED_DATASETS) {
    try {
      const result = await resolveDataset(dataset, '', args.origin);
      if (args.apply) {
        for (const destination of dataset.destinations) await writeAtomic(destination, result.text);
      }
      report.records.push({
        tool: dataset.tool,
        key: dataset.key,
        locale: null,
        source: result.source,
        sourceUrl: result.url,
        remoteUrl: result.remoteUrl,
        destinations: dataset.destinations,
        bytes: Buffer.byteLength(result.text),
        sha256: sha256(result.text),
        summary: dataset.summarize(result.data),
        warning: result.warning || null,
      });
      console.log(`${dataset.tool}/${dataset.key}: ${result.source}`);
    } catch (error) {
      report.errors.push({ tool: dataset.tool, key: dataset.key, locale: null, error: error.message });
      console.warn(`${dataset.tool}/${dataset.key}: ${error.message}`);
    }
  }

  for (const dataset of OPTIONAL_DATASETS) {
    const remoteUrl = `${args.origin}${dataset.remote}`;
    try {
      const result = await fetchJson(remoteUrl);
      if (!result.data || typeof result.data !== 'object' || count(result.data) === 0) throw new Error('Empty dataset');
      if (args.apply) await writeAtomic(dataset.destination, result.text);
      report.optional.push({ ...dataset, status: 'updated', sourceUrl: result.url, bytes: Buffer.byteLength(result.text), sha256: sha256(result.text) });
      console.log(`${dataset.tool}/${dataset.key}/${dataset.locale}: remote`);
    } catch (error) {
      report.optional.push({ ...dataset, status: 'preserved', error: error.message });
      console.warn(`${dataset.tool}/${dataset.key}/${dataset.locale}: preserved (${error.message})`);
    }
  }

  report.summary = {
    validated: report.records.length,
    remote: report.records.filter((entry) => entry.source === 'remote').length,
    fallback: report.records.filter((entry) => entry.source === 'fallback').length,
    optionalUpdated: report.optional.filter((entry) => entry.status === 'updated').length,
    optionalPreserved: report.optional.filter((entry) => entry.status === 'preserved').length,
    errors: report.errors.length,
  };

  await writeFile(path.join(args.reportDir, 'tool-data-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  const markdown = [
    '# RoworldDB SEA tool-data report',
    '',
    `- Checked: ${report.checkedAt}`,
    `- Apply mode: ${args.apply}`,
    `- Validated datasets: ${report.summary.validated}`,
    `- Remote datasets: ${report.summary.remote}`,
    `- Local fallbacks: ${report.summary.fallback}`,
    `- Optional updated: ${report.summary.optionalUpdated}`,
    `- Optional preserved: ${report.summary.optionalPreserved}`,
    `- Errors: ${report.summary.errors}`,
    '',
    '| Tool | Dataset | Locale | Source | Summary |',
    '|---|---|---|---|---|',
    ...report.records.map((entry) => `| ${entry.tool} | ${entry.key} | ${entry.locale || 'shared'} | ${entry.source} | ${Object.entries(entry.summary).map(([key, value]) => `${key}=${value}`).join(', ')} |`),
    '',
  ];
  await writeFile(path.join(args.reportDir, 'tool-data-report.md'), markdown.join('\n'), 'utf8');

  console.log(`Report: ${path.join(args.reportDir, 'tool-data-report.json')}`);
  if (report.errors.length && args.strict) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});

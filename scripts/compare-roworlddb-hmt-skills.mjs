#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SEA_DATA_DIR = path.resolve('public/sea/skill-simulator/data');
const DEFAULT_OUTPUT = path.resolve('.skill-data-import/hmt-vs-sea');
const HMT_ROOTS = [
  'https://www.roworlddb.com/skill-simulator/data',
  'https://roworlddb.com/skill-simulator/data',
  'https://www.roworlddb.com/skill_planner/data',
  'https://roworlddb.com/skill_planner/data',
];

const TEXT_KEYS = new Set([
  'locale',
  'job_name',
  'name',
  'skilldes',
  'des',
  'desc',
  'description',
  'title',
  'text',
  'tips',
]);

function parseArgs(argv) {
  const args = {
    output: DEFAULT_OUTPUT,
    hmtRoot: '',
    timeoutMs: 30_000,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--output') args.output = path.resolve(argv[++index] || '');
    else if (value === '--hmt-root') args.hmtRoot = String(argv[++index] || '').replace(/\/+$/, '');
    else if (value === '--timeout') args.timeoutMs = Number(argv[++index] || 30_000);
    else if (value === '--help' || value === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${value}`);
  }

  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs < 1_000) {
    throw new Error('--timeout must be at least 1000ms');
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/compare-roworlddb-hmt-skills.mjs [options]\n\nOptions:\n  --output <directory>   Report and HMT snapshot destination\n  --hmt-root <url>       Override the HMT skill data root\n  --timeout <ms>         Per-request timeout (default: 30000)\n  --help                 Show this message\n\nThe command is read-only. It never replaces RTNW Hub production data.`);
}

async function fetchText(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json,text/plain;q=0.9,*/*;q=0.1',
        'accept-language': 'zh-TW,zh;q=0.9,en;q=0.5',
        'user-agent': 'RTNW-Hub HMT skill comparator/1.0 (+https://rtnw.online/)',
      },
      redirect: 'follow',
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return { text: await response.text(), finalUrl: response.url };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson(url, timeoutMs) {
  const { text, finalUrl } = await fetchText(url, timeoutMs);
  try {
    return { data: JSON.parse(text), text, finalUrl };
  } catch (error) {
    throw new Error(`Invalid JSON from ${url}: ${error.message}`);
  }
}

function jobsFromIndex(index) {
  const jobs = index?.jobs ?? index;
  if (!jobs || typeof jobs !== 'object' || Array.isArray(jobs)) {
    throw new Error('Skill index does not contain a jobs object.');
  }
  return jobs;
}

function validateIndex(index, label) {
  const jobs = jobsFromIndex(index);
  const ids = Object.keys(jobs);
  if (ids.length < 10) throw new Error(`${label} index has only ${ids.length} jobs.`);
  for (const id of ids) {
    const job = jobs[id];
    if (!job || typeof job !== 'object') throw new Error(`${label} job ${id} is invalid.`);
    if (Number(job.job_id ?? id) !== Number(id)) throw new Error(`${label} job ${id} has a mismatched job_id.`);
  }
  return jobs;
}

async function resolveHmtRoot(args) {
  const roots = args.hmtRoot ? [args.hmtRoot] : HMT_ROOTS;
  const failures = [];
  for (const root of roots) {
    try {
      const result = await fetchJson(`${root}/skills_index_zh-TW.json`, args.timeoutMs);
      validateIndex(result.data, 'HMT');
      return { root, ...result };
    } catch (error) {
      failures.push(`${root}: ${error.message}`);
    }
  }
  throw new Error(`Unable to locate HMT skill data.\n${failures.join('\n')}`);
}

async function readLocalJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

function hasJobData(job) {
  return Boolean(job?.has_skills || job?.has_unique_skills || job?.has_traits);
}

function normalizeTagList(value) {
  if (!Array.isArray(value)) return value;
  return value.map((tag) => {
    if (!tag || typeof tag !== 'object') return tag;
    const copy = { ...tag };
    delete copy.name;
    delete copy.text;
    delete copy.title;
    return copy;
  });
}

function comparableObject(value) {
  if (Array.isArray(value)) return value.map(comparableObject);
  if (!value || typeof value !== 'object') return value;
  const output = {};
  for (const [key, child] of Object.entries(value)) {
    if (TEXT_KEYS.has(key)) continue;
    output[key] = key === 'skill_tags' ? normalizeTagList(child) : comparableObject(child);
  }
  return output;
}

function valueType(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function addDifference(differences, context, field, seaValue, hmtValue, kind = 'changed') {
  differences.push({
    ...context,
    field,
    kind,
    seaValue,
    hmtValue,
  });
}

function diffValues(seaValue, hmtValue, field, differences, context) {
  if (seaValue === undefined && hmtValue !== undefined) {
    addDifference(differences, context, field, null, hmtValue, 'added-in-hmt');
    return;
  }
  if (hmtValue === undefined && seaValue !== undefined) {
    addDifference(differences, context, field, seaValue, null, 'missing-in-hmt');
    return;
  }

  const seaType = valueType(seaValue);
  const hmtType = valueType(hmtValue);
  if (seaType !== hmtType) {
    addDifference(differences, context, field, seaValue, hmtValue, 'type-changed');
    return;
  }

  if (seaType === 'array') {
    const length = Math.max(seaValue.length, hmtValue.length);
    for (let index = 0; index < length; index += 1) {
      diffValues(seaValue[index], hmtValue[index], `${field}[${index}]`, differences, context);
    }
    return;
  }

  if (seaType === 'object' && seaValue !== null) {
    const keys = new Set([...Object.keys(seaValue), ...Object.keys(hmtValue)]);
    for (const key of [...keys].sort()) {
      diffValues(seaValue[key], hmtValue[key], field ? `${field}.${key}` : key, differences, context);
    }
    return;
  }

  if (!Object.is(seaValue, hmtValue)) {
    addDifference(differences, context, field, seaValue, hmtValue);
  }
}

function entryName(entry) {
  return String(entry?.name ?? entry?.job_name ?? '').trim();
}

function compareEntryMaps({ seaMap, hmtMap, section, jobId, seaJobName, hmtJobName, differences }) {
  const sea = seaMap && typeof seaMap === 'object' ? seaMap : {};
  const hmt = hmtMap && typeof hmtMap === 'object' ? hmtMap : {};
  const ids = new Set([...Object.keys(sea), ...Object.keys(hmt)]);

  for (const entryId of [...ids].sort((a, b) => Number(a) - Number(b) || a.localeCompare(b))) {
    const seaEntry = sea[entryId];
    const hmtEntry = hmt[entryId];
    const context = {
      jobId: Number(jobId),
      seaJobName,
      hmtJobName,
      section,
      entryId,
      seaEntryName: entryName(seaEntry),
      hmtEntryName: entryName(hmtEntry),
    };

    if (!seaEntry) {
      addDifference(differences, context, section, null, 'present', 'entry-added-in-hmt');
      continue;
    }
    if (!hmtEntry) {
      addDifference(differences, context, section, 'present', null, 'entry-missing-in-hmt');
      continue;
    }

    diffValues(comparableObject(seaEntry), comparableObject(hmtEntry), section, differences, context);
  }
}

function compareJobPayloads(jobId, seaJob, hmtJob, differences) {
  const seaJobName = entryName(seaJob);
  const hmtJobName = entryName(hmtJob);

  const reserved = new Set(['skills', 'unique_skills', 'traits']);
  const seaTop = comparableObject(Object.fromEntries(Object.entries(seaJob).filter(([key]) => !reserved.has(key))));
  const hmtTop = comparableObject(Object.fromEntries(Object.entries(hmtJob).filter(([key]) => !reserved.has(key))));
  diffValues(seaTop, hmtTop, 'job', differences, {
    jobId: Number(jobId),
    seaJobName,
    hmtJobName,
    section: 'job',
    entryId: String(jobId),
    seaEntryName: seaJobName,
    hmtEntryName: hmtJobName,
  });

  compareEntryMaps({ seaMap: seaJob.skills, hmtMap: hmtJob.skills, section: 'skills', jobId, seaJobName, hmtJobName, differences });
  compareEntryMaps({ seaMap: seaJob.unique_skills, hmtMap: hmtJob.unique_skills, section: 'unique_skills', jobId, seaJobName, hmtJobName, differences });
  compareEntryMaps({ seaMap: seaJob.traits, hmtMap: hmtJob.traits, section: 'traits', jobId, seaJobName, hmtJobName, differences });
}

function csvCell(value) {
  if (value === undefined || value === null) return '';
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function formatValue(value) {
  if (value === undefined || value === null) return '—';
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return printHelp();

  await mkdir(args.output, { recursive: true });
  const hmtSnapshotDir = path.join(args.output, 'hmt');
  const hmtJobsDir = path.join(hmtSnapshotDir, 'jobs_zh-TW');
  await mkdir(hmtJobsDir, { recursive: true });

  const seaIndex = await readLocalJson(path.join(SEA_DATA_DIR, 'skills_index_en-US.json'));
  const seaJobs = validateIndex(seaIndex, 'SEA English');
  const hmtSource = await resolveHmtRoot(args);
  const hmtIndex = hmtSource.data;
  const hmtJobs = validateIndex(hmtIndex, 'HMT Traditional Chinese');

  await writeFile(path.join(hmtSnapshotDir, 'skills_index_zh-TW.json'), `${JSON.stringify(hmtIndex, null, 2)}\n`, 'utf8');

  const differences = [];
  const failures = [];
  const seaIds = new Set(Object.keys(seaJobs));
  const hmtIds = new Set(Object.keys(hmtJobs));
  const allJobIds = [...new Set([...seaIds, ...hmtIds])].sort((a, b) => Number(a) - Number(b));

  for (const jobId of allJobIds) {
    const seaIndexJob = seaJobs[jobId];
    const hmtIndexJob = hmtJobs[jobId];
    const indexContext = {
      jobId: Number(jobId),
      seaJobName: entryName(seaIndexJob),
      hmtJobName: entryName(hmtIndexJob),
      section: 'index',
      entryId: jobId,
      seaEntryName: entryName(seaIndexJob),
      hmtEntryName: entryName(hmtIndexJob),
    };

    if (!seaIndexJob) {
      addDifference(differences, indexContext, 'index', null, 'present', 'job-added-in-hmt');
      continue;
    }
    if (!hmtIndexJob) {
      addDifference(differences, indexContext, 'index', 'present', null, 'job-missing-in-hmt');
      continue;
    }

    diffValues(comparableObject(seaIndexJob), comparableObject(hmtIndexJob), 'index', differences, indexContext);

    if (!hasJobData(seaIndexJob) && !hasJobData(hmtIndexJob)) continue;

    try {
      const seaPath = path.join(SEA_DATA_DIR, 'jobs_en-US', `${jobId}.json`);
      const seaJob = await readLocalJson(seaPath);
      const hmtResult = await fetchJson(`${hmtSource.root}/jobs_zh-TW/${jobId}.json`, args.timeoutMs);
      const hmtJob = hmtResult.data;
      await writeFile(path.join(hmtJobsDir, `${jobId}.json`), `${JSON.stringify(hmtJob, null, 2)}\n`, 'utf8');
      compareJobPayloads(jobId, seaJob?.job ?? seaJob, hmtJob?.job ?? hmtJob, differences);
      console.log(`Compared job ${jobId}: ${entryName(seaIndexJob)} / ${entryName(hmtIndexJob)}`);
    } catch (error) {
      failures.push({ jobId: Number(jobId), error: error.message });
      console.warn(`Could not compare job ${jobId}: ${error.message}`);
    }
  }

  const changedJobs = new Set(differences.map((item) => item.jobId));
  const changedEntries = new Set(differences.map((item) => `${item.jobId}:${item.section}:${item.entryId}`));
  const bySection = Object.fromEntries(
    [...new Set(differences.map((item) => item.section))].sort().map((section) => [section, differences.filter((item) => item.section === section).length]),
  );
  const byKind = Object.fromEntries(
    [...new Set(differences.map((item) => item.kind))].sort().map((kind) => [kind, differences.filter((item) => item.kind === kind).length]),
  );

  const report = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    seaSource: path.relative(process.cwd(), SEA_DATA_DIR),
    hmtSourceRoot: hmtSource.root,
    hmtIndexUrl: hmtSource.finalUrl,
    summary: {
      seaJobs: Object.keys(seaJobs).length,
      hmtJobs: Object.keys(hmtJobs).length,
      changedJobs: changedJobs.size,
      changedEntries: changedEntries.size,
      mechanicalDifferences: differences.length,
      failures: failures.length,
      bySection,
      byKind,
    },
    failures,
    differences,
  };

  await writeFile(path.join(args.output, 'hmt-vs-sea-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

  const csv = [
    ['Job ID', 'SEA Job', 'HMT Job', 'Section', 'Entry ID', 'SEA Entry', 'HMT Entry', 'Kind', 'Field', 'SEA Value', 'HMT Value'].map(csvCell).join(','),
    ...differences.map((item) => [
      item.jobId,
      item.seaJobName,
      item.hmtJobName,
      item.section,
      item.entryId,
      item.seaEntryName,
      item.hmtEntryName,
      item.kind,
      item.field,
      item.seaValue,
      item.hmtValue,
    ].map(csvCell).join(',')),
  ].join('\n');
  await writeFile(path.join(args.output, 'hmt-vs-sea-differences.csv'), `${csv}\n`, 'utf8');

  const markdown = [
    '# HMT Traditional Chinese vs SEA English skill comparison',
    '',
    `- Generated: ${report.generatedAt}`,
    `- HMT source: ${hmtSource.root}`,
    `- SEA jobs: ${report.summary.seaJobs}`,
    `- HMT jobs: ${report.summary.hmtJobs}`,
    `- Jobs with differences: ${report.summary.changedJobs}`,
    `- Skills/traits/index entries with differences: ${report.summary.changedEntries}`,
    `- Mechanical/structural differences: ${report.summary.mechanicalDifferences}`,
    `- Failed job downloads: ${report.summary.failures}`,
    '',
    'Localized names and descriptions are intentionally excluded. The report compares IDs, levels, coefficients, cooldowns, costs, ranges, targeting, requirements, positions, flags, and other non-text fields.',
    '',
    '| Job | Entry | Field | SEA English | HMT zh-TW |',
    '|---|---|---|---|---|',
    ...differences.map((item) => {
      const job = `${item.jobId} ${item.seaJobName || item.hmtJobName || ''}`.trim();
      const entry = `${item.section}:${item.entryId} ${item.seaEntryName || item.hmtEntryName || ''}`.trim();
      return `| ${job.replaceAll('|', '\\|')} | ${entry.replaceAll('|', '\\|')} | ${item.field.replaceAll('|', '\\|')} | ${formatValue(item.seaValue).replaceAll('|', '\\|')} | ${formatValue(item.hmtValue).replaceAll('|', '\\|')} |`;
    }),
    '',
  ].join('\n');
  await writeFile(path.join(args.output, 'hmt-vs-sea-report.md'), markdown, 'utf8');

  console.log('');
  console.log(`Comparison complete: ${args.output}`);
  console.log(`Mechanical differences: ${differences.length}`);
  console.log(`Changed jobs: ${changedJobs.size}`);
  console.log(`Failures: ${failures.length}`);
  console.log(`Report: ${path.join(args.output, 'hmt-vs-sea-report.md')}`);
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});

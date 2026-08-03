#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import process from 'node:process';

const LOCALES = ['en-US', 'zh-CN', 'th-TH', 'id-ID'];
const DEFAULT_SOURCE_ROOTS = [
  'https://www.roworlddb.com/sea/skill-simulator/data',
  'https://roworlddb.com/sea/skill-simulator/data',
  'https://www.roworlddb.com/sea/skill_planner/data',
  'https://roworlddb.com/sea/skill_planner/data',
];
const LOCAL_DATA_DIR = resolve('public/sea/skill-simulator/data');
const DEFAULT_OUTPUT_DIR = resolve('.skill-data-import/roworlddb-sea');

function parseArgs(argv) {
  const args = {
    apply: false,
    output: DEFAULT_OUTPUT_DIR,
    sourceRoot: '',
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--apply') {
      args.apply = true;
    } else if (value === '--output') {
      args.output = resolve(argv[++index] || '');
    } else if (value === '--source-root') {
      args.sourceRoot = String(argv[++index] || '').replace(/\/+$/, '');
    } else if (value === '--help' || value === '-h') {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${value}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/sync-roworlddb-skills.mjs [options]\n\nOptions:\n  --output <directory>   Staging directory (default: .skill-data-import/roworlddb-sea)\n  --source-root <url>    Override the RoworldDB SEA data root\n  --apply                Replace public skill JSON after validation\n  --help                 Show this message\n\nThe default mode is read-only for production data. It downloads source files,\nvalidates them, and creates JSON/Markdown comparison reports.`);
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function fetchWithTimeout(url, timeoutMs = 30_000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json,text/plain;q=0.9,*/*;q=0.1',
        'user-agent': 'RTNW-Hub skill-data verifier/1.0 (+https://rtnw.online/)',
      },
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchJson(url) {
  const response = await fetchWithTimeout(url);
  const text = await response.text();

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    throw new Error(`Invalid JSON from ${url}: ${error.message}`);
  }

  return { parsed, text, finalUrl: response.url };
}

function getJobs(indexData) {
  const jobs = indexData?.jobs ?? indexData;
  if (!jobs || typeof jobs !== 'object' || Array.isArray(jobs)) {
    throw new Error('Skill index does not contain a jobs object.');
  }
  return jobs;
}

function validateIndex(indexData, locale) {
  const jobs = getJobs(indexData);
  const ids = Object.keys(jobs);
  if (ids.length < 10) {
    throw new Error(`${locale} index has only ${ids.length} jobs; refusing incomplete data.`);
  }

  for (const id of ids) {
    const job = jobs[id];
    if (!job || typeof job !== 'object') throw new Error(`${locale} job ${id} is invalid.`);
    if (Number(job.job_id ?? id) !== Number(id)) throw new Error(`${locale} job ${id} has a mismatched job_id.`);
    if (!String(job.job_name ?? job.name ?? '').trim()) throw new Error(`${locale} job ${id} has no name.`);
  }

  return jobs;
}

function validateJobFile(payload, expectedJob, locale) {
  const job = payload?.job ?? payload;
  if (!job || typeof job !== 'object' || Array.isArray(job)) {
    throw new Error(`${locale} job ${expectedJob.job_id} payload is invalid.`);
  }

  const jobId = Number(job.job_id ?? expectedJob.job_id);
  if (jobId !== Number(expectedJob.job_id)) {
    throw new Error(`${locale} job ${expectedJob.job_id} returned job ${jobId}.`);
  }

  for (const key of ['skills', 'unique_skills', 'traits']) {
    if (job[key] != null && (typeof job[key] !== 'object' || Array.isArray(job[key]))) {
      throw new Error(`${locale} job ${jobId} has an invalid ${key} collection.`);
    }
  }

  return job;
}

function countCollection(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? Object.keys(value).length : 0;
}

function summarizeDataset(indexData, jobPayloads) {
  const jobs = getJobs(indexData);
  const summary = {
    jobs: Object.keys(jobs).length,
    jobsWithDownloadedPayloads: Object.keys(jobPayloads).length,
    skills: 0,
    uniqueSkills: 0,
    traits: 0,
  };

  for (const payload of Object.values(jobPayloads)) {
    const job = payload?.job ?? payload;
    summary.skills += countCollection(job?.skills);
    summary.uniqueSkills += countCollection(job?.unique_skills);
    summary.traits += countCollection(job?.traits);
  }

  return summary;
}

async function readJsonIfPresent(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (error) {
    if (error?.code === 'ENOENT') return null;
    throw error;
  }
}

async function loadLocalDataset(locale) {
  const indexPath = join(LOCAL_DATA_DIR, `skills_index_${locale}.json`);
  const indexData = await readJsonIfPresent(indexPath);
  if (!indexData) return null;

  const jobs = getJobs(indexData);
  const payloads = {};
  for (const id of Object.keys(jobs)) {
    const payload = await readJsonIfPresent(join(LOCAL_DATA_DIR, `jobs_${locale}`, `${id}.json`));
    if (payload) payloads[id] = payload;
  }

  return { indexData, payloads, summary: summarizeDataset(indexData, payloads) };
}

async function probeSourceRoot(explicitRoot) {
  const roots = explicitRoot ? [explicitRoot] : DEFAULT_SOURCE_ROOTS;
  const errors = [];

  for (const root of roots) {
    const url = `${root}/skills_index_en-US.json`;
    try {
      const result = await fetchJson(url);
      validateIndex(result.parsed, 'en-US');
      return { root, probeUrl: result.finalUrl };
    } catch (error) {
      errors.push(`${url}: ${error.message}`);
    }
  }

  throw new Error(`Could not locate the RoworldDB SEA skill-data root.\n${errors.join('\n')}`);
}

async function downloadLocale(sourceRoot, locale, outputDir) {
  const indexUrl = `${sourceRoot}/skills_index_${locale}.json`;
  const indexResult = await fetchJson(indexUrl);
  const jobs = validateIndex(indexResult.parsed, locale);
  const localeJobDir = join(outputDir, `jobs_${locale}`);
  await mkdir(localeJobDir, { recursive: true });

  const indexPath = join(outputDir, `skills_index_${locale}.json`);
  await writeFile(indexPath, stableJson(indexResult.parsed), 'utf8');

  const payloads = {};
  const files = [{
    path: `skills_index_${locale}.json`,
    sourceUrl: indexResult.finalUrl,
    bytes: Buffer.byteLength(indexResult.text),
    sha256: sha256(indexResult.text),
  }];

  for (const [id, jobMeta] of Object.entries(jobs)) {
    const shouldHavePayload = Boolean(jobMeta.has_skills || jobMeta.has_unique_skills || jobMeta.has_traits);
    if (!shouldHavePayload) continue;

    const url = `${sourceRoot}/jobs_${locale}/${id}.json`;
    try {
      const result = await fetchJson(url);
      validateJobFile(result.parsed, jobMeta, locale);
      payloads[id] = result.parsed;
      const relativePath = `jobs_${locale}/${id}.json`;
      await writeFile(join(outputDir, relativePath), stableJson(result.parsed), 'utf8');
      files.push({
        path: relativePath,
        sourceUrl: result.finalUrl,
        bytes: Buffer.byteLength(result.text),
        sha256: sha256(result.text),
      });
    } catch (error) {
      throw new Error(`Failed to download required ${locale} job ${id}: ${error.message}`);
    }
  }

  return {
    locale,
    indexData: indexResult.parsed,
    payloads,
    files,
    summary: summarizeDataset(indexResult.parsed, payloads),
  };
}

function makeDiff(source, local) {
  if (!local) {
    return {
      status: 'new-locale',
      source: source.summary,
      local: null,
      delta: null,
    };
  }

  const delta = {};
  for (const key of Object.keys(source.summary)) {
    delta[key] = Number(source.summary[key] || 0) - Number(local.summary[key] || 0);
  }

  return {
    status: Object.values(delta).some(value => value !== 0) ? 'changed' : 'same-counts',
    source: source.summary,
    local: local.summary,
    delta,
  };
}

function makeMarkdownReport({ sourceRoot, fetchedAt, localeReports }) {
  const lines = [
    '# RoworldDB SEA skill-data import report',
    '',
    `- Source root: ${sourceRoot}`,
    `- Fetched: ${fetchedAt}`,
    '- Mode: staging only unless `--apply` was supplied',
    '',
    '| Locale | Status | Source jobs | Source skills | Local jobs | Local skills | Skill delta |',
    '|---|---:|---:|---:|---:|---:|---:|',
  ];

  for (const report of localeReports) {
    lines.push(`| ${report.locale} | ${report.diff.status} | ${report.diff.source.jobs} | ${report.diff.source.skills} | ${report.diff.local?.jobs ?? '—'} | ${report.diff.local?.skills ?? '—'} | ${report.diff.delta?.skills ?? '—'} |`);
  }

  lines.push('', 'Review the JSON manifest and per-locale files before applying them to production.', '');
  return lines.join('\n');
}

async function applyDataset(stagingDir) {
  const backupDir = resolve(`.skill-data-import/backups/${new Date().toISOString().replace(/[:.]/g, '-')}`);
  await mkdir(dirname(backupDir), { recursive: true });
  await cp(LOCAL_DATA_DIR, backupDir, { recursive: true, force: false, errorOnExist: false });

  for (const locale of LOCALES) {
    await cp(
      join(stagingDir, `skills_index_${locale}.json`),
      join(LOCAL_DATA_DIR, `skills_index_${locale}.json`),
      { force: true },
    );
    await rm(join(LOCAL_DATA_DIR, `jobs_${locale}`), { recursive: true, force: true });
    await cp(join(stagingDir, `jobs_${locale}`), join(LOCAL_DATA_DIR, `jobs_${locale}`), { recursive: true });
  }

  return backupDir;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  await rm(args.output, { recursive: true, force: true });
  await mkdir(args.output, { recursive: true });

  const source = await probeSourceRoot(args.sourceRoot);
  console.log(`Using source: ${source.root}`);

  const fetchedAt = new Date().toISOString();
  const localeReports = [];
  const allFiles = [];

  for (const locale of LOCALES) {
    console.log(`Downloading ${locale}…`);
    const sourceData = await downloadLocale(source.root, locale, args.output);
    const localData = await loadLocalDataset(locale);
    const diff = makeDiff(sourceData, localData);
    localeReports.push({ locale, diff });
    allFiles.push(...sourceData.files.map(file => ({ locale, ...file })));
    console.log(`  ${sourceData.summary.jobs} jobs, ${sourceData.summary.skills} skills, ${sourceData.summary.uniqueSkills} unique skills`);
  }

  const manifest = {
    schemaVersion: 1,
    source: 'RoworldDB SEA Skill Planner',
    sourceRoot: source.root,
    fetchedAt,
    locales: LOCALES,
    localeReports,
    files: allFiles,
  };

  await writeFile(join(args.output, 'import-manifest.json'), stableJson(manifest), 'utf8');
  await writeFile(join(args.output, 'import-report.md'), makeMarkdownReport({
    sourceRoot: source.root,
    fetchedAt,
    localeReports,
  }), 'utf8');

  console.log(`Staged data: ${args.output}`);
  console.log(`Report: ${join(args.output, 'import-report.md')}`);

  if (args.apply) {
    const backupDir = await applyDataset(args.output);
    console.log(`Applied validated data to ${LOCAL_DATA_DIR}`);
    console.log(`Backup: ${backupDir}`);
  } else {
    console.log('Production data was not changed. Re-run with --apply only after reviewing the report.');
  }
}

main().catch(error => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});

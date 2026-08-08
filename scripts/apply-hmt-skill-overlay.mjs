#!/usr/bin/env node

import { access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const LOCALES = ['en-US', 'zh-CN', 'th-TH', 'id-ID'];
const DEFAULT_DATA_DIR = path.resolve('public/sea/skill-simulator/data');

const DRUID_CURVE = [
  70, 90, 110, 130, 150, 170, 190, 210, 230, 250,
  270, 290, 300, 310, 320, 330, 340, 350, 360, 370,
  380, 390, 400, 410, 420, 430, 440, 450, 460, 470,
];

const SHARP_WHIRLWIND_CURVE = [
  300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
  800, 850, 880, 910, 940, 970, 1000, 1030, 1060, 1090,
  1120, 1150, 1180, 1210, 1240, 1270, 1300, 1330, 1360, 1390,
];

const NATURAL_HARMONY = {
  name: 'Natural Harmony',
  skilldes: 'Harmonizes with the power of nature, reducing variable cast time by <color=#ed9053>35%</color>.',
  natural_max_level: 1,
  max_level: 1,
  levels: {
    '1': {
      skill_id: 19131501,
      des: 'Harmonizes with the power of nature, reducing variable cast time by <color=#ed9053>35%</color>.',
      chant_fixed: 0,
      chant_float: 0,
      elements_type: 0,
      cooldown: 0,
      range_max: 0,
      mana_cost: 0,
      gcd: 0,
      skill_tags: [{ name: 'Passive', icon: 'icon_skilltype_24' }],
    },
  },
  icon: 'icon_skill_deluyi_ziranzhenli',
  position: 0,
  is_trait: true,
};

function parseArgs(argv) {
  const args = { dataDir: DEFAULT_DATA_DIR, check: false };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--data-dir') args.dataDir = path.resolve(argv[++index] || '');
    else if (value === '--check') args.check = true;
    else if (value === '--help' || value === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${value}`);
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/apply-hmt-skill-overlay.mjs [options]\n\nOptions:\n  --data-dir <directory>  Skill data directory\n  --check                 Validate without writing files\n  --help                  Show this message\n\nApplies the reviewed HMT mechanical overlay while preserving SEA text,\nSEA-only skills, and the SEA job list.`);
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

function stableJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function jobPayload(payload) {
  return payload?.job ?? payload;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceNumberToken(text, oldValue, newValue) {
  if (typeof text !== 'string' || oldValue === newValue) return text;
  const pattern = new RegExp(`(^|[^0-9])${escapeRegExp(oldValue)}(?=[^0-9]|$)`, 'g');
  return text.replace(pattern, (_, prefix) => `${prefix}${newValue}`);
}

function updatePercentCurve(skill, curve) {
  if (!skill?.levels || curve.length !== 30) throw new Error('Invalid skill curve target.');
  const naturalLevel = String(skill.natural_max_level || 10);
  const natural = skill.levels[naturalLevel];
  if (!natural) throw new Error(`Missing natural level ${naturalLevel}.`);
  const oldNatural = natural.pve_percent;
  const newNatural = curve[Number(naturalLevel) - 1];
  skill.skilldes = replaceNumberToken(skill.skilldes, oldNatural, newNatural);

  for (let level = 1; level <= curve.length; level += 1) {
    const entry = skill.levels[String(level)];
    if (!entry) throw new Error(`Missing level ${level}.`);
    const oldPercent = entry.pve_percent;
    const nextPercent = curve[level - 1];
    entry.des = replaceNumberToken(entry.des, oldPercent, nextPercent);
    entry.pve_percent = nextPercent;
    entry.pvp_percent = nextPercent;
  }

  // Keep the summary aligned with the natural-level description even when the
  // mechanical overlay was already applied by an earlier build.
  skill.skilldes = skill.levels[naturalLevel].des;
}

function setAllLevels(skill, field, value) {
  if (!skill?.levels) throw new Error(`Missing levels for ${field}.`);
  for (const level of Object.values(skill.levels)) level[field] = value;
}

function patchAcidBomb(skill) {
  if (!skill?.levels) throw new Error('Missing Acid Bomb levels.');
  const naturalLevel = String(skill.natural_max_level || 10);
  const natural = skill.levels[naturalLevel];
  const oldDivisor = Number(natural.pve_value3) / 100;
  const newDivisor = 100;
  skill.skilldes = replaceNumberToken(skill.skilldes, oldDivisor, newDivisor);

  for (const level of Object.values(skill.levels)) {
    const levelOldDivisor = Number(level.pve_value3) / 100;
    level.des = replaceNumberToken(level.des, levelOldDivisor, newDivisor);
    level.range_max = 8;
    level.pve_value3 = 10000;
    level.pvp_value3 = 10000;
  }

  skill.skilldes = natural.des;
}

function requireSkill(job, skillId) {
  const skill = job?.skills?.[skillId];
  if (!skill) throw new Error(`Missing skill ${skillId} in job ${job?.job_id ?? 'unknown'}.`);
  return skill;
}

function patchJob(jobId, job) {
  if (jobId === '722') {
    for (const skillId of ['172210', '172212', '172221']) {
      setAllLevels(requireSkill(job, skillId), 'range_max', 10);
    }
  } else if (jobId === '723') {
    patchAcidBomb(requireSkill(job, '172231'));
  } else if (jobId === '901') {
    updatePercentCurve(requireSkill(job, '190106'), DRUID_CURVE);
    const birdFeather = requireSkill(job, '190110');
    updatePercentCurve(birdFeather, DRUID_CURVE);
    setAllLevels(birdFeather, 'aspd_cast_speed_pre', 1500);
  } else if (jobId === '912') {
    updatePercentCurve(requireSkill(job, '191205'), SHARP_WHIRLWIND_CURVE);
    requireSkill(job, '191211').pre_skill = [19120803, 19120903, 19121003];
  } else if (jobId === '913') {
    job.traits ??= {};
    job.traits['191315'] = structuredClone(NATURAL_HARMONY);
  }
}

function verifyIndex(index) {
  const jobs = index?.jobs ?? index;
  if (!jobs?.['913']) throw new Error('Alithea job 913 is missing from the index.');
  jobs['913'].has_traits = true;
  for (const hmtOnlyId of ['323', '324', '424', '434', '724']) {
    if (jobs[hmtOnlyId]) throw new Error(`HMT-only job ${hmtOnlyId} must not be added to SEA.`);
  }
}

function verifyPatchedJobs(jobs) {
  const get = (jobId, skillId, level = null) => {
    const skill = requireSkill(jobs[jobId], skillId);
    return level ? skill.levels[String(level)] : skill;
  };

  if (get('722', '172210', 10).range_max !== 10) throw new Error('Demonstration range overlay failed.');
  if (get('722', '172212', 10).range_max !== 10) throw new Error('Acid Terror range overlay failed.');
  if (get('722', '172221', 10).range_max !== 10) throw new Error('Life Potion Pitcher range overlay failed.');
  if (get('723', '172231', 10).range_max !== 8) throw new Error('Acid Bomb range overlay failed.');
  if (get('723', '172231', 10).pve_value3 !== 10000) throw new Error('Acid Bomb formula overlay failed.');
  if (get('901', '190106', 10).pve_percent !== 250) throw new Error('Merciless Claw overlay failed.');
  if (get('901', '190110', 10).pve_percent !== 250) throw new Error('Bird Feather Shot overlay failed.');
  if (get('901', '190110', 10).aspd_cast_speed_pre !== 1500) throw new Error('Bird Feather Shot ASPD overlay failed.');
  if (get('912', '191205', 10).pve_percent !== 750) throw new Error('Sharp Whirlwind overlay failed.');
  if (JSON.stringify(get('912', '191211').pre_skill) !== JSON.stringify([19120803, 19120903, 19121003])) {
    throw new Error('Force of Nature prerequisite overlay failed.');
  }
  if (!jobs['913']?.traits?.['191315']) throw new Error('Natural Harmony trait overlay failed.');
}

async function patchLocale(dataDir, locale, check) {
  const indexPath = path.join(dataDir, `skills_index_${locale}.json`);
  if (!(await fileExists(indexPath))) {
    if (locale === 'en-US') throw new Error(`Required English index is missing: ${indexPath}`);
    console.warn(`Skipping ${locale}: index not available; runtime will use English fallback.`);
    return false;
  }

  const index = await readJson(indexPath);
  verifyIndex(index);
  const jobs = {};

  for (const jobId of ['722', '723', '901', '912', '913']) {
    const filePath = path.join(dataDir, `jobs_${locale}`, `${jobId}.json`);
    if (!(await fileExists(filePath))) {
      if (locale === 'en-US') throw new Error(`Required English job file is missing: ${filePath}`);
      console.warn(`Skipping ${locale} overlay: missing job ${jobId}; runtime will use English fallback.`);
      return false;
    }
    const payload = await readJson(filePath);
    const job = jobPayload(payload);
    patchJob(jobId, job);
    jobs[jobId] = job;
    if (!check) await writeFile(filePath, stableJson(payload), 'utf8');
  }

  for (const [jobId, skillId] of [['513', '151306'], ['613', '161306']]) {
    const filePath = path.join(dataDir, `jobs_${locale}`, `${jobId}.json`);
    if (!(await fileExists(filePath))) continue;
    const payload = await readJson(filePath);
    if (!jobPayload(payload)?.skills?.[skillId]) {
      throw new Error(`SEA-only skill ${skillId} is missing from ${locale} job ${jobId}.`);
    }
  }

  verifyPatchedJobs(jobs);
  if (!check) await writeFile(indexPath, stableJson(index), 'utf8');
  console.log(`${check ? 'Validated' : 'Applied'} reviewed HMT skill overlay for ${locale}.`);
  return true;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return printHelp();

  let applied = 0;
  for (const locale of LOCALES) {
    if (await patchLocale(args.dataDir, locale, args.check)) applied += 1;
  }
  console.log(`HMT skill overlay complete for ${applied} locale(s).`);
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});

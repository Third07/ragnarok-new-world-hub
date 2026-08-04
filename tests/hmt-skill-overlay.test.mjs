import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const dataRoot = 'public/sea/skill-simulator/data';
const locales = ['en-US', 'zh-CN', 'th-TH', 'id-ID'];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function json(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'));
}

function jobPayload(payload) {
  return payload?.job ?? payload;
}

async function loadJob(locale, jobId) {
  return jobPayload(await json(`${dataRoot}/jobs_${locale}/${jobId}.json`));
}

test('build runs the HMT overlay after the SEA skill refresh', async () => {
  const buildSync = await readFile('scripts/build-data-sync.mjs', 'utf8');
  const seaIndex = buildSync.indexOf('sync-roworlddb-skills.mjs');
  const overlayIndex = buildSync.indexOf('apply-hmt-skill-overlay.mjs');
  const toolIndex = buildSync.indexOf('sync-roworlddb-tools.mjs');

  assert.ok(seaIndex >= 0, 'SEA skill sync must remain in the build');
  assert.ok(overlayIndex > seaIndex, 'HMT overlay must run after the SEA skill sync');
  assert.ok(toolIndex > overlayIndex, 'tool sync should run after the skill overlay');
});

test('reviewed HMT values are applied without importing HMT-only jobs', async () => {
  for (const locale of locales) {
    const indexPath = `${dataRoot}/skills_index_${locale}.json`;
    if (!(await exists(indexPath))) continue;

    const index = await json(indexPath);
    const jobs = index.jobs ?? index;
    assert.equal(jobs['913'].has_traits, true, `${locale} should expose Alithea traits`);
    for (const hmtOnlyId of ['323', '324', '424', '434', '724']) {
      assert.equal(jobs[hmtOnlyId], undefined, `${locale} must not import HMT-only job ${hmtOnlyId}`);
    }

    const alchemist = await loadJob(locale, 722);
    assert.equal(alchemist.skills['172210'].levels['10'].range_max, 10);
    assert.equal(alchemist.skills['172212'].levels['10'].range_max, 10);
    assert.equal(alchemist.skills['172221'].levels['10'].range_max, 10);

    const creator = await loadJob(locale, 723);
    const acidBomb = creator.skills['172231'].levels['10'];
    assert.equal(acidBomb.range_max, 8);
    assert.equal(acidBomb.pve_value3, 10000);
    assert.equal(acidBomb.pvp_value3, 10000);

    const druid = await loadJob(locale, 901);
    assert.equal(druid.skills['190106'].levels['10'].pve_percent, 250);
    assert.equal(druid.skills['190106'].levels['10'].pvp_percent, 250);
    assert.equal(druid.skills['190110'].levels['10'].pve_percent, 250);
    assert.equal(druid.skills['190110'].levels['10'].aspd_cast_speed_pre, 1500);

    const kanos = await loadJob(locale, 912);
    assert.equal(kanos.skills['191205'].levels['10'].pve_percent, 750);
    assert.equal(kanos.skills['191205'].levels['10'].pvp_percent, 750);
    assert.deepEqual(kanos.skills['191211'].pre_skill, [19120803, 19120903, 19121003]);

    const alithea = await loadJob(locale, 913);
    assert.equal(alithea.traits['191315'].levels['1'].skill_id, 19131501);
  }
});

test('English descriptions and SEA-only skills are preserved', async () => {
  const sharpWhirlwind = (await loadJob('en-US', 912)).skills['191205'];
  assert.match(sharpWhirlwind.skilldes, /750%/);
  assert.match(sharpWhirlwind.levels['10'].des, /750%/);

  const acidBomb = (await loadJob('en-US', 723)).skills['172231'];
  assert.match(acidBomb.skilldes, /\/100\b/);
  assert.match(acidBomb.levels['10'].des, /\/100\b/);

  const highPriest = await loadJob('en-US', 513);
  const assassinCross = await loadJob('en-US', 613);
  assert.ok(highPriest.skills['151306'], 'Mana Recharge must remain available');
  assert.ok(assassinCross.skills['161306'], 'Advanced Two-handed Mastery must remain available');
});

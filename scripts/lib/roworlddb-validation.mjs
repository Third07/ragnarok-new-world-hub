// Only public SEA payloads are accepted. Throw before an importer writes files.
export const WEATHER_TYPES = ['butterfly', 'bubble', 'sunchest', 'snow', 'monster_chest', 'season_chest'];
const record = (value) => value && typeof value === 'object' && !Array.isArray(value);
const integer = (value) => Number.isInteger(value) && value >= 0;
const finite = (value) => typeof value === 'number' && Number.isFinite(value);

export function validateWeatherData(data) {
  if (!record(data?.views) || !Array.isArray(data?.placements) || !data.placements.length) throw new Error('Empty weather placements');
  const ids = new Set();
  const types = {};
  for (const item of data.placements) {
    if (!integer(item?.id) || item.id === 0 || ids.has(item.id)) throw new Error('Invalid or duplicate weather ID');
    if (!WEATHER_TYPES.includes(item.type)) throw new Error(`Unsupported weather type: ${item.type}`);
    if (!integer(item.map_id) || item.map_id === 0 || !finite(item.x) || !finite(item.z)) throw new Error('Invalid weather map or coordinates');
    ids.add(item.id);
    types[item.type] = (types[item.type] || 0) + 1;
  }
  return { placements: ids.size, types };
}

export function validatePlacingIndex(index) {
  if (!Array.isArray(index) || !index.length) throw new Error('Empty map marker index');
  const files = new Set();
  for (const entry of index) {
    if (!/^[a-z0-9][a-z0-9_]*\.json$/.test(entry?.file || '') || files.has(entry.file)) throw new Error('Invalid or duplicate marker filename');
    if (!Array.isArray(entry.mapIds) || !entry.mapIds.every(integer)) throw new Error(`Invalid map IDs: ${entry.file}`);
    files.add(entry.file);
  }
  return index;
}

export function validatePlacingData(data, entry) {
  if (!record(data?.meta) || !record(data?.data)) throw new Error(`Invalid marker payload: ${entry.file}`);
  const mapIds = new Set(entry.mapIds);
  let records = 0;
  let positioned = 0;
  for (const rows of Object.values(data.data)) {
    if (!Array.isArray(rows)) throw new Error(`Invalid marker rows: ${entry.file}`);
    for (const item of rows) {
      if (!record(item) || !integer(item.id) || !integer(item.mapRegionId) || !mapIds.has(item.mapRegionId)) throw new Error(`Invalid marker identity or unindexed map: ${entry.file}`);
      // Upstream includes non-positioned quest records; preserve, but don't invent coordinates.
      if (item.objectPos != null) {
        if (!Array.isArray(item.objectPos) || item.objectPos.length !== 3 || !item.objectPos.every(finite)) throw new Error(`Invalid marker coordinates: ${entry.file}`);
        positioned += 1;
      }
      records += 1;
    }
  }
  if (!records) throw new Error(`Empty marker file: ${entry.file}`);
  return { records, positioned };
}

export function validateRefineData(data) {
  if (data?.client !== 'SEA' || !Number.isInteger(data.maxLevel) || !Array.isArray(data.levels) || data.levels.length !== data.maxLevel) throw new Error('Incomplete SEA refine levels');
  for (const [index, level] of data.levels.entries()) {
    if (level.level !== index || ![level.success, level.downgrade, level.fail].every((n) => finite(n) && n >= 0 && n <= 100) || Math.abs(level.success + level.downgrade + level.fail - 100) > 0.001) throw new Error(`Invalid refine probabilities at ${index}`);
  }
  return true;
}

export function validateQuestionData(data) {
  if (!Array.isArray(data?.questions) || !data.questions.length) throw new Error('Empty question bank');
  const ids = new Set();
  for (const question of data.questions) {
    const hasAnswer = Array.isArray(question?.answers) ? question.answers.length > 0 : typeof question?.answer === 'string' && question.answer.trim().length > 0;
    if (!integer(question?.id) || ids.has(question.id) || !String(question.question || '').trim() || !hasAnswer) throw new Error('Invalid or duplicate question');
    ids.add(question.id);
  }
  return true;
}

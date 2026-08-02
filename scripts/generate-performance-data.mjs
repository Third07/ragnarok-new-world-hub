import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicRoot = path.join(root, "public");

async function readJson(relativePath) {
  const sourcePath = path.join(root, "source-data", relativePath);
  try {
    return JSON.parse(await readFile(sourcePath, "utf8"));
  } catch {
    return JSON.parse(await readFile(path.join(publicRoot, relativePath), "utf8"));
  }
}

async function writeJson(relativePath, value) {
  const outputPath = path.join(publicRoot, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(value));
}

function monsterSearchText(monster) {
  const values = [];
  const add = (value) => {
    const text = String(value || "").trim();
    if (text) values.push(text);
  };
  add(monster.name);
  for (const record of [
    ...(monster.drops || []),
    ...(monster.drop_rate_entries || []),
    ...(monster.mvp_drop_rate_entries || []),
  ]) add(record?.name);
  for (const source of monster.activity_sources || []) {
    add(source?.activity);
    add(source?.encounter_name);
    for (const group of source?.groups || []) {
      for (const item of group?.items || []) add(item?.name);
    }
  }
  return values.join("\n").toLowerCase();
}

function monsterSummary(monster, detailChunk) {
  const usefulRates = (monster.drop_rate_entries || []).filter((entry) =>
    entry?.kind === "card_variant" ||
    (entry?.kind === "equipment_quality" && Number(entry?.quality) === 6 && /weapon|武器/i.test(String(entry?.name || ""))),
  );
  const cardDrops = (monster.drops || []).filter((entry) =>
    entry?.is_card || String(entry?.icon || "").startsWith("icon_item_card_"),
  );
  return {
    id: monster.id,
    name: monster.name,
    level: monster.level,
    type: monster.type,
    race: monster.race,
    element: monster.element,
    body: monster.body,
    is_handbook: monster.is_handbook,
    image: monster.image,
    guaranteed_card_drop_progress: monster.guaranteed_card_drop_progress,
    guaranteed_card_drop_kills: monster.guaranteed_card_drop_kills,
    guaranteed_card: monster.guaranteed_card,
    drops: cardDrops,
    drop_rate_entries: usefulRates,
    mvp_drop_rate_entries: [],
    activities: monster.activities || [],
    activity_sources: (monster.activity_sources || []).map((source) => ({
      activity: source?.activity,
      activity_id: source?.activity_id,
      encounter_name: source?.encounter_name,
      section_order: source?.section_order,
      groups: [],
    })),
    _searchText: monsterSearchText(monster),
    _detailChunk: detailChunk,
  };
}

async function buildMonsterData(locale) {
  const source = await readJson(`sea/monster-album/data/monster_album_${locale}.json`);
  const monsters = Array.isArray(source?.monsters) ? source.monsters : [];
  const chunkSize = 100;
  const summaries = [];
  for (let offset = 0; offset < monsters.length; offset += chunkSize) {
    const chunkNumber = Math.floor(offset / chunkSize);
    const chunkName = `chunk-${String(chunkNumber).padStart(3, "0")}.json`;
    const records = monsters.slice(offset, offset + chunkSize);
    await writeJson(`sea/monster-album/data/optimized/${locale}/${chunkName}`, { monsters: records });
    summaries.push(...records.map((monster) => monsterSummary(monster, chunkName)));
  }
  await writeJson(`sea/monster-album/data/monster_index_${locale}.json`, {
    meta: source?.meta || {},
    monsters: summaries,
  });
}

function decodeRate(entry) {
  for (const [value, scaled] of [
    [entry?.farm_rate_percent, false],
    [entry?.f, true],
    [entry?.regular_rate_percent, false],
    [entry?.r, true],
    [entry?.mvp_drop_chance_percent, false],
    [entry?.c, true],
  ]) {
    const number = Number(value);
    if (value !== null && value !== "" && Number.isFinite(number) && number >= 0) return scaled ? number / 1e6 : number;
  }
  return null;
}

function monsterDropRecords(monster) {
  const records = [...(monster.drop_rate_entries || []), ...(monster.mvp_drop_rate_entries || [])];
  for (const source of monster.activity_sources || []) {
    for (const group of source?.groups || []) records.push(...(group?.items || []));
  }
  return records;
}

async function buildCardSources() {
  const source = await readJson("sea/monster-album/data/monster_album_en-US.json");
  const cards = {};
  for (const monster of source?.monsters || []) {
    const bestByCard = new Map();
    for (const entry of monsterDropRecords(monster)) {
      const itemId = Number(entry?.item_id);
      if (!Number.isFinite(itemId) || itemId <= 0) continue;
      const rate = decodeRate(entry);
      const previous = bestByCard.get(itemId);
      if (!previous || (Number.isFinite(rate) && (!Number.isFinite(previous.rate) || rate > previous.rate))) {
        bestByCard.set(itemId, {
          monsterId: Number(monster.id),
          name: String(monster.name || `#${monster.id ?? ""}`),
          level: Number(monster.level),
          type: String(monster.type?.name || ""),
          image: String(monster.image || ""),
          handbook: Boolean(monster.is_handbook),
          rate,
        });
      }
    }
    for (const [itemId, record] of bestByCard) (cards[itemId] ||= []).push(record);
  }
  for (const sources of Object.values(cards)) {
    sources.sort((a, b) => Number(b.handbook) - Number(a.handbook) || (b.rate || 0) - (a.rate || 0) || a.name.localeCompare(b.name));
  }
  await writeJson("sea/card-simulator/data/card_monster_sources_en-US.json", { cards });
}

async function buildAffixData(locale) {
  const source = await readJson(`sea/affix-simulator/data/stunt_skill_library_${locale}.json`);
  const entries = Object.entries(source?.packages || {});
  const shardSize = 20;
  const packageToShard = {};
  const stuntToPackage = {};
  for (let offset = 0; offset < entries.length; offset += shardSize) {
    const shardNumber = Math.floor(offset / shardSize);
    const shardName = `shard-${String(shardNumber).padStart(2, "0")}.json`;
    const packages = Object.fromEntries(entries.slice(offset, offset + shardSize));
    for (const [packageId, pkg] of Object.entries(packages)) {
      packageToShard[packageId] = shardName;
      for (const entry of pkg?.entries || []) {
        if (entry?.stunt?.id) stuntToPackage[String(entry.stunt.id)] = packageId;
      }
    }
    await writeJson(`sea/affix-simulator/data/optimized/${locale}/${shardName}`, { packages });
  }
  await writeJson(`sea/affix-simulator/data/stunt_shard_manifest_${locale}.json`, {
    packageToShard,
    stuntToPackage,
  });
}

async function buildChunkedCatalogue({ locale, sourcePath, indexPath, detailBase, rootKey, summarize }) {
  const source = await readJson(sourcePath.replace("{locale}", locale));
  const records = Array.isArray(source?.[rootKey]) ? source[rootKey] : [];
  const chunkSize = 100;
  const summaries = [];
  for (let offset = 0; offset < records.length; offset += chunkSize) {
    const chunkName = `chunk-${String(Math.floor(offset / chunkSize)).padStart(3, "0")}.json`;
    const chunkRecords = records.slice(offset, offset + chunkSize);
    await writeJson(detailBase.replace("{locale}", locale) + chunkName, { [rootKey]: chunkRecords });
    summaries.push(...chunkRecords.map((record) => summarize(record, chunkName, source)));
  }
  await writeJson(indexPath.replace("{locale}", locale), { ...source, [rootKey]: summaries });
}

async function buildEquipmentData(locale) {
  const compactSearchText = (value) => {
    const strings = new Set;
    const visit = (entry, key = "") => {
      if (typeof entry === "string") {
        const text = entry.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
        if (text && !/icon|path/i.test(key) && !/^icon_[a-z0-9_]+$/i.test(text)) strings.add(text);
      } else if (Array.isArray(entry)) entry.forEach((child) => visit(child, key));
      else if (entry && typeof entry === "object") Object.entries(entry).forEach(([childKey, child]) => visit(child, childKey));
    };
    visit(value);
    return Array.from(strings).join(" ");
  };
  await buildChunkedCatalogue({
    locale,
    sourcePath: "sea/equipment/data/equipment_{locale}.json",
    indexPath: "sea/equipment/data/equipment_index_{locale}.json",
    detailBase: "sea/equipment/data/optimized/{locale}/",
    rootKey: "items",
    summarize: (item, chunkName) => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      quality: item.quality,
      isHandBook: item.isHandBook,
      itemType: item.itemType,
      itemSubtype: item.itemSubtype,
      assemblyType: item.assemblyType,
      openLevel: item.openLevel,
      jobAll: item.jobAll,
      jobLimits: item.jobLimits || [],
      suits: item.suits || [],
      suitQuality: item.suitQuality,
      _statText: compactSearchText(item),
      _detailChunk: chunkName,
    }),
  });
}

async function buildShopData(locale) {
  await buildChunkedCatalogue({
    locale,
    sourcePath: "sea/shop/data/shop_{locale}.json",
    indexPath: "sea/shop/data/shop_index_{locale}.json",
    detailBase: "sea/shop/data/optimized/{locale}/",
    rootKey: "items",
    summarize: (item, chunkName) => ({
      id: item.id,
      itemId: item.itemId,
      name: item.name,
      iconPath: item.iconPath,
      quality: item.quality,
      itemNum: item.itemNum,
      storeName: item.storeName,
      tabName: item.tabName,
      requiredLevel: item.requiredLevel,
      limitNum: item.limitNum,
      timeRefresh: item.timeRefresh,
      binding: item.binding,
      isShow: item.isShow,
      price: item.price,
      purchaseOptions: item.purchaseOptions || [],
      currencyIds: item.currencyIds || [],
      unlockDescriptions: item.unlockDescriptions || [],
      showUnlockDescriptions: item.showUnlockDescriptions || [],
      tabUnlockDescriptions: item.tabUnlockDescriptions || [],
      searchText: item.searchText,
      _detailChunk: chunkName,
    }),
  });
}

for (const locale of ["en-US", "zh-TW"]) {
  await buildMonsterData(locale);
  await buildAffixData(locale);
  await buildEquipmentData(locale);
  await buildShopData(locale);
}
await buildCardSources();

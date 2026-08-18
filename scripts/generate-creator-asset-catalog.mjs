import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");
const mediaRoot = path.join(publicRoot, "media", "images");
const outputRoot = path.join(publicRoot, "creator-assets", "catalog");
const manifestChunkSize = 320;

const categories = [
  {
    id: "skills",
    label: "Skill images",
    shortLabel: "Skills",
    description: "Class, pet, trait, and combat skill icons.",
    source: "/sea/skill_planner/",
  },
  {
    id: "cards",
    label: "Card images",
    shortLabel: "Cards",
    description: "Full card art and compact card icons.",
    source: "/sea/cards/",
  },
  {
    id: "equipment",
    label: "Weapon & equipment images",
    shortLabel: "Equipment",
    description: "Weapons, armor, accessories, headwear, and item icons.",
    source: "/sea/equipment/",
  },
  {
    id: "monsters",
    label: "Monster images",
    shortLabel: "Monsters",
    description: "Normal, Elite, Mini, MVP, boss, and summon icons.",
    source: "/sea/monster_album/",
  },
  {
    id: "pets",
    label: "Pet images",
    shortLabel: "Pets",
    description: "Pet portraits, quality marks, and related pet graphics.",
    source: "/sea/pet/",
  },
  {
    id: "maps",
    label: "Map images",
    shortLabel: "Maps",
    description: "World maps, regional maps, and location markers.",
    source: "/sea/maps/?lang=en-US",
  },
  {
    id: "more",
    label: "More game icons",
    shortLabel: "More",
    description: "Activities, items, jobs, buffs, UI, weather, and other indexed graphics.",
    source: "/database/",
  },
];

const categoryById = new Map(categories.map((category) => [category.id, category]));
const buckets = new Map(categories.map((category) => [category.id, new Map()]));

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"));
}

async function walkFiles(directory, base = directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walkFiles(absolute, base)));
    if (entry.isFile()) files.push(path.relative(base, absolute).replaceAll(path.sep, "/"));
  }
  return files;
}

function publicImage(relativePath) {
  return `/media/images/${relativePath.replace(/^\/+/, "")}`;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 90) || "rtnw-asset";
}

function prettyName(relativePath) {
  const basename = path.basename(relativePath, path.extname(relativePath));
  const cleaned = basename
    .replace(/^icon_/i, "")
    .replace(/^(?:item|skill|monster|pet|map|activity|job|equip|weapon|buff)_/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b(?:min|dark)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned.replace(/\b\w/g, (letter) => letter.toUpperCase()) || basename;
}

function folderLabel(relativePath) {
  const folder = relativePath.split("/")[0] || "game";
  return `${folder.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())} icon`;
}

function downloadName(name, image) {
  return `${slugify(name)}${path.extname(image).toLowerCase() || ".webp"}`;
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function addAsset(categoryId, asset, named = true) {
  const bucket = buckets.get(categoryId);
  if (!bucket || !mediaPaths.has(asset.image)) return;

  const current = bucket.get(asset.image);
  if (current) {
    if (asset.name !== current.name && !current.aliases.includes(asset.name)) {
      current.aliases.push(asset.name);
    }
    if (named && !current.named) {
      current.name = asset.name;
      current.kind = asset.kind;
      current.source = asset.source;
      current.named = true;
    }
    return;
  }

  bucket.set(asset.image, {
    id: `${categoryId}:${asset.image.replace("/media/images/", "")}`,
    name: asset.name,
    image: asset.image,
    kind: asset.kind,
    source: asset.source || categoryById.get(categoryId)?.source || "/database/",
    downloadName: downloadName(asset.name, asset.image),
    aliases: [],
    named,
  });
}

function iconImage(iconPaths, icon) {
  if (!icon || typeof icon !== "string") return "";
  if (icon.startsWith("/media/images/")) return icon;
  const mapped = iconPaths[icon] || iconPaths[icon.toLowerCase()];
  if (typeof mapped === "string") return publicImage(mapped.replace(/\.png$/i, ".webp"));
  return "";
}

function addNamedIcons(value, iconPaths, categoryId, kind, source) {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item) => addNamedIcons(item, iconPaths, categoryId, kind, source));
    return;
  }

  const name = typeof value.name === "string" ? value.name.trim() : "";
  const icon = typeof value.icon === "string" ? value.icon : "";
  const image = iconImage(iconPaths, icon);
  if (name && image) addAsset(categoryId, { name, image, kind, source });
  Object.values(value).forEach((item) => addNamedIcons(item, iconPaths, categoryId, kind, source));
}

const mediaFiles = (await walkFiles(mediaRoot)).filter((file) => /\.(?:webp|png|jpe?g|svg)$/i.test(file));
const mediaPaths = new Set(mediaFiles.map(publicImage));
const iconPaths = await readJson("public/sea/skill-simulator/data/icon_paths.json");

const jobDirectory = path.join(publicRoot, "sea", "skill-simulator", "data", "jobs_en-US");
const jobFiles = (await readdir(jobDirectory)).filter((file) => file.endsWith(".json")).sort();
for (const file of jobFiles) {
  const job = await readJson(`public/sea/skill-simulator/data/jobs_en-US/${file}`);
  addNamedIcons(job.skills, iconPaths, "skills", `${job.job_name || "Class"} skill`, "/sea/skill_planner/");
  addNamedIcons(job.unique_skills, iconPaths, "skills", `${job.job_name || "Class"} unique skill`, "/sea/skill_planner/");
  addNamedIcons(job.traits, iconPaths, "skills", `${job.job_name || "Class"} trait`, "/sea/skill_planner/");
}

const petLibrary = await readJson("public/sea/pet/data/pet_library_en-US.json");
addNamedIcons(petLibrary.pets, iconPaths, "skills", "Pet skill", "/sea/pet/");

const cardLibrary = await readJson("public/sea/card-simulator/data/handbook_cards_en-US.json");
for (const card of cardLibrary.cards || []) {
  const fullImage = iconImage(iconPaths, card.item_icon);
  const miniImage = iconImage(iconPaths, card.mini_icon);
  const kind = card.card_type_name ? `${card.card_type_name} card` : "Card art";
  if (fullImage) addAsset("cards", { name: card.name, image: fullImage, kind, source: "/sea/cards/" });
  if (miniImage) addAsset("cards", { name: `${card.name} — small icon`, image: miniImage, kind, source: "/sea/cards/" });
}

const equipmentLibrary = await readJson("public/sea/equipment/data/equipment_index_en-US.json");
for (const item of equipmentLibrary.items || []) {
  if (!item.name || /^(?:royal\s+)?gm(?:[-\s·]|$)/i.test(item.name)) continue;
  const image = iconImage(iconPaths, item.icon);
  const type = equipmentLibrary.itemTypes?.[item.itemType]?.name || "Equipment";
  const subtype = equipmentLibrary.itemSubtypes?.[item.itemSubtype]?.name || "";
  const kind = subtype && subtype !== type ? `${type} · ${subtype}` : type;
  if (image) addAsset("equipment", { name: item.name, image, kind, source: "/sea/equipment/" });
}

const monsterLibrary = await readJson("public/sea/monster-album/data/monster_index_en-US.json");
for (const monster of monsterLibrary.monsters || []) {
  if (!monster.name) continue;
  const image = iconImage(iconPaths, monster.image);
  const kind = monster.type?.name ? `${monster.type.name} monster` : "Monster";
  if (image) addAsset("monsters", { name: monster.name, image, kind, source: "/sea/monster_album/" });
}

for (const pet of petLibrary.pets || []) {
  const image = pet.iconUrl || iconImage(iconPaths, pet.icon);
  const kind = pet.quality?.name ? `${pet.quality.name} pet` : "Pet";
  if (image) addAsset("pets", { name: pet.name, image, kind, source: "/sea/pet/" });
}

const mapLibrary = await readJson("public/sea/map-simulator/data/map_index_en-US.json");
for (const map of Object.values(mapLibrary.map_configs || {})) {
  const image = iconImage(iconPaths, map.pic_res);
  const name = map.name || `Map ${map.map_id}`;
  if (image) addAsset("maps", { name, image, kind: "World map", source: `/sea/maps/?lang=en-US#map=${map.map_id}` });
}
for (const map of mapLibrary.world_maps || []) {
  const image = iconImage(iconPaths, map.pic_res);
  if (image) addAsset("maps", { name: map.name, image, kind: "Regional map", source: `/sea/maps/?lang=en-US#map=${map.center_scene_id}` });
}

const claimed = new Set();
for (const bucket of buckets.values()) {
  for (const image of bucket.keys()) claimed.add(image);
}

const equipmentFolders = new Set(["equip", "equipslot", "helmet", "item", "itemtype", "shadowequip", "weapon", "weapontype"]);
const monsterFolders = new Set(["boss", "monster", "summon"]);
const mapFolders = new Set(["map", "map_mark"]);

for (const relativePath of mediaFiles.sort()) {
  const image = publicImage(relativePath);
  if (claimed.has(image)) continue;

  const folder = relativePath.split("/")[0];
  const basename = path.basename(relativePath).toLowerCase();
  let categoryId = "more";
  if (folder === "skill") categoryId = "skills";
  else if (folder === "item" && basename.includes("card")) categoryId = "cards";
  else if (equipmentFolders.has(folder)) categoryId = "equipment";
  else if (monsterFolders.has(folder)) categoryId = "monsters";
  else if (folder === "pet") categoryId = "pets";
  else if (mapFolders.has(folder)) categoryId = "maps";

  addAsset(
    categoryId,
    {
      name: prettyName(relativePath),
      image,
      kind: folderLabel(relativePath),
      source: categoryById.get(categoryId)?.source,
    },
    false,
  );
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

const summaryCategories = [];
const catalogImages = new Set();
const sitemapGroups = [];
for (const category of categories) {
  const assets = Array.from(buckets.get(category.id).values())
    .sort((a, b) => Number(b.named) - Number(a.named) || a.name.localeCompare(b.name))
    .map((entry) => ({
      id: entry.id,
      name: entry.name,
      image: entry.image,
      kind: entry.kind,
      source: entry.source,
      downloadName: entry.downloadName,
      ...(entry.aliases.length ? { aliases: entry.aliases.slice(0, 12) } : {}),
    }));

  assets.forEach((asset) => catalogImages.add(asset.image));
  sitemapGroups.push(assets);
  const manifests = [];
  for (let offset = 0; offset < assets.length; offset += manifestChunkSize) {
    const part = String(Math.floor(offset / manifestChunkSize) + 1).padStart(2, "0");
    const filename = `${category.id}-${part}.json`;
    manifests.push(`/creator-assets/catalog/${filename}`);
    await writeFile(
      path.join(outputRoot, filename),
      `${JSON.stringify({ category: category.id, assets: assets.slice(offset, offset + manifestChunkSize) })}\n`,
    );
  }
  summaryCategories.push({
    ...category,
    count: assets.length,
    manifests,
  });
}

const total = catalogImages.size;
if (total !== mediaFiles.length) {
  throw new Error(`Creator asset catalog covers ${total} images, but ${mediaFiles.length} image files exist.`);
}

await writeFile(
  path.join(outputRoot, "summary.json"),
  `${JSON.stringify({ total, categories: summaryCategories }, null, 2)}\n`,
);

const sitemapImages = [];
for (let index = 0; sitemapImages.length < 1000; index += 1) {
  let added = false;
  for (const assets of sitemapGroups) {
    if (!assets[index]) continue;
    sitemapImages.push(assets[index]);
    added = true;
    if (sitemapImages.length === 1000) break;
  }
  if (!added) break;
}

const imageEntries = sitemapImages.map((asset) => [
  "    <image:image>",
  `      <image:loc>https://rtnw.online${escapeXml(asset.image)}</image:loc>`,
  `      <image:title>${escapeXml(asset.name)}</image:title>`,
  `      <image:caption>${escapeXml(`${asset.name} — ${asset.kind} image in the RTNW creator library.`)}</image:caption>`,
  "    </image:image>",
].join("\n")).join("\n");

await writeFile(
  path.join(publicRoot, "creator-images-sitemap.xml"),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    "  <url>",
    "    <loc>https://rtnw.online/creator-kit/</loc>",
    imageEntries,
    "  </url>",
    "</urlset>",
    "",
  ].join("\n"),
);

console.log(`Creator asset catalog: ${total} unique images across ${categories.length} categories.`);
for (const category of summaryCategories) console.log(`${category.label}: ${category.count}`);
console.log(`Creator image sitemap: ${sitemapImages.length} representative images.`);

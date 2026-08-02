import { readFile, writeFile } from "node:fs/promises";

const pages = [
  {
    file: "public/sea/maps/index.html",
    slug: "world-map",
    title: "Ragnarok: The New World World Map",
    description: "Find monsters, quests, chests, landmarks, recipes, and services on the RTNW World Map.",
  },
  {
    file: "public/sea/monster_album/index.html",
    slug: "monster-index",
    title: "Ragnarok: The New World Monster Index",
    description: "Search RTNW monsters, habitats, elements, races, sizes, drops, stats, and linked cards.",
  },
  {
    file: "public/sea/cards/index.html",
    slug: "card-index",
    title: "Ragnarok: The New World Card Index",
    description: "Search RTNW card effects, slots, rarity, obtain sources, monster drops, and fusion data.",
  },
  {
    file: "public/sea/equipment/index.html",
    slug: "equipment-index",
    title: "Ragnarok: The New World Equipment Index",
    description: "Browse RTNW equipment, stats, slots, set effects, and upgrade planning data.",
  },
];

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function upsertMeta(html, attribute, key, content, anchorPattern) {
  const pattern = new RegExp(`<meta\\s+${escapeRegExp(attribute)}=["']${escapeRegExp(key)}["'][^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${content}">`;
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace(anchorPattern, (match) => `${match}${tag}`);
}

for (const page of pages) {
  let html = await readFile(page.file, "utf8");
  const image = `https://rtnw.online/social/${page.slug}`;
  const ogAnchor = /<meta\s+property=["']og:url["'][^>]*>/i;
  const twitterAnchor = /<meta\s+name=["']twitter:card["'][^>]*>/i;

  html = upsertMeta(html, "property", "og:image", image, ogAnchor);
  html = upsertMeta(html, "property", "og:image:width", "1200", /<meta\s+property=["']og:image["'][^>]*>/i);
  html = upsertMeta(html, "property", "og:image:height", "630", /<meta\s+property=["']og:image:width["'][^>]*>/i);
  html = upsertMeta(html, "property", "og:image:alt", page.title, /<meta\s+property=["']og:image:height["'][^>]*>/i);
  html = upsertMeta(html, "name", "twitter:title", page.title, twitterAnchor);
  html = upsertMeta(html, "name", "twitter:description", page.description, /<meta\s+name=["']twitter:title["'][^>]*>/i);
  html = upsertMeta(html, "name", "twitter:image", image, /<meta\s+name=["']twitter:description["'][^>]*>/i);
  html = upsertMeta(html, "name", "twitter:image:alt", page.title, /<meta\s+name=["']twitter:image["'][^>]*>/i);

  await writeFile(page.file, html, "utf8");
  console.log(`Synchronized social metadata: ${page.file}`);
}

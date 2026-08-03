import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const pageFiles = [
  "public/sea/maps/index.html",
  "public/sea/monster_album/index.html",
  "public/sea/cards/index.html",
  "public/sea/equipment/index.html",
];

const commonReplacements = [
  ['title="Maps" aria-label="Maps"', 'title="World Map" aria-label="World Map"'],
  ['alt="Maps"', 'alt="World Map"'],
  ['<span class="site-nav-label">Maps</span>', '<span class="site-nav-label">World Map</span>'],
  ['title="Monster Album" aria-label="Monster Album"', 'title="Monster Index" aria-label="Monster Index"'],
  ['alt="Monster Album"', 'alt="Monster Index"'],
  ['<span class="site-nav-label">Monster Album</span>', '<span class="site-nav-label">Monster Index</span>'],
  ['title="Cards" aria-label="Cards"', 'title="Card Index" aria-label="Card Index"'],
  ['alt="Cards"', 'alt="Card Index"'],
  ['<span class="site-nav-label">Cards</span>', '<span class="site-nav-label">Card Index</span>'],
  ['title="Equipment" aria-label="Equipment"', 'title="Equipment Index" aria-label="Equipment Index"'],
  ['alt="Equipment"', 'alt="Equipment Index"'],
  ['<span class="site-nav-label">Equipment</span>', '<span class="site-nav-label">Equipment Index</span>'],
  ["Ragnarok: The New World Interactive Map", "Ragnarok: The New World World Map"],
  ["Ragnarok: The New World Monster Database", "Ragnarok: The New World Monster Index"],
  ["Ragnarok: The New World Card Database", "Ragnarok: The New World Card Index"],
  ["Ragnarok: The New World Equipment Database", "Ragnarok: The New World Equipment Index"],
  ["Interactive Map", "World Map"],
  ["Monster Database", "Monster Index"],
  ["Card Database", "Card Index"],
  ["Equipment Database", "Equipment Index"],
  ["interactive map", "World Map"],
  ["monster database", "monster index"],
  ["card database", "card index"],
  ["equipment database", "equipment index"],
  ["Monster Album", "Monster Index"],
];

const pageSpecificReplacements = {
  "public/sea/maps/index.html": [
    ['<h1 class="header-title">Maps</h1>', '<h1 class="header-title">World Map</h1>'],
    ["20260803-mapclean1", "20260804-mapclean2"],
  ],
  "public/sea/monster_album/index.html": [
    ['<h1 class="header-title">Monster Album</h1>', '<h1 class="header-title">Monster Index</h1>'],
  ],
  "public/sea/cards/index.html": [
    ['<h1 id="page-header-title" class="header-title">Cards</h1>', '<h1 id="page-header-title" class="header-title">Card Index</h1>'],
  ],
  "public/sea/equipment/index.html": [
    ['<h1 class="header-title">Equipment</h1>', '<h1 class="header-title">Equipment Index</h1>'],
  ],
};

function replaceAll(source, replacements) {
  return replacements.reduce(
    (result, [from, to]) => result.split(from).join(to),
    source,
  );
}

let changedFiles = 0;

for (const relativePath of pageFiles) {
  const fileUrl = new URL(relativePath, root);
  const original = await readFile(fileUrl, "utf8");
  const updated = replaceAll(
    replaceAll(original, commonReplacements),
    pageSpecificReplacements[relativePath] ?? [],
  );

  if (updated !== original) {
    await writeFile(fileUrl, updated);
    changedFiles += 1;
  }
}

const assetVersionUrl = new URL("public/shared/asset_version.js", root);
const originalAssetVersion = await readFile(assetVersionUrl, "utf8");
let updatedAssetVersion = originalAssetVersion;

for (const [pageKey, oldTitle, newTitle] of [
  ["equipment", "Equipment", "Equipment Index"],
  ["cards", "Cards", "Card Index"],
  ["monster_album", "Monster Album", "Monster Index"],
  ["maps", "Maps", "World Map"],
]) {
  const pattern = new RegExp(`(${pageKey}:\\s*\\{[\\s\\S]*?"en-US":\\s*)"${oldTitle}"`);
  updatedAssetVersion = updatedAssetVersion.replace(pattern, `$1"${newTitle}"`);
}

updatedAssetVersion = updatedAssetVersion
  .replace('"en-US": "RO World Journey"', '"en-US": "RTNW Hub"')
  .replace(
    'const fullTitle = `${pageTitle} | ${brandTitle}`;',
    'const fullTitle = `Ragnarok: The New World ${pageTitle} | ${brandTitle}`;',
  );

if (updatedAssetVersion !== originalAssetVersion) {
  await writeFile(assetVersionUrl, updatedAssetVersion);
  changedFiles += 1;
}

console.log(`Synchronized RTNW index naming in ${changedFiles} file${changedFiles === 1 ? "" : "s"}.`);

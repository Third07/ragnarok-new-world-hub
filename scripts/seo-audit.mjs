import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const siteOrigin = "https://rtnw.online";
const reportPath = path.join(root, "public", "seo-audit.json");
const indexNowKey = "4cc78cf9b31d099f4de23a0874b08a5e";

const expectedRoutes = [
  "/",
  "/search/",
  "/database/",
  "/database/wardrobe/",
  "/updates/",
  "/creator-kit/",
  "/guides/",
  "/guides/classes-builds/",
  "/guides/guild-events/",
  "/guides/guild-management/",
  "/guides/guild-league/",
  "/guides/polarity-zone/",
  "/guides/hazy-forest/",
  "/guides/beginner-guides/",
  "/guides/progression-equipment/",
  "/guides/monsters-cards-farming/",
  "/guides/class-tier-list/",
  "/guides/swordman-builds/",
  "/guides/lord-knight-builds/",
  "/guides/mage-builds/",
  "/guides/high-wizard-builds/",
  "/guides/archer-builds/",
  "/guides/sniper-builds/",
  "/guides/acolyte-builds/",
  "/guides/high-priest-builds/",
  "/guides/monk-build/",
  "/guides/thief-builds/",
  "/guides/assassin-cross-builds/",
  "/guides/merchant-builds/",
  "/guides/whitesmith-builds/",
  "/guides/gunslinger-builds/",
  "/guides/night-walker-builds/",
  "/guides/beginner-progression/",
  "/guides/redeem-codes/",
  "/guides/druid-builds/",
  "/guides/refining-equipment/",
  "/guides/farming-card-progression/",
  "/guides/mvp-hunting/",
  "/guides/zeny-farming/",
  "/guides/technical/",
  "/guides/play-on-pc/",
  "/guides/emulator-settings/",
  "/guides/top-up-safely/",
  "/guides/cloud-gaming/",
  "/guides/redfinger-cloud-phone/",
  "/tools/farming-target-finder/",
  "/tools/pc-setup-checker/",
  "/tools/top-up-calculator/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/disclaimer/",
  "/sea/skill_planner/",
  "/sea/rune_planner/",
  "/sea/affix_planner/",
  "/sea/apocalypse_planner/",
  "/sea/equipment/",
  "/sea/cards/",
  "/sea/monster_album/",
  "/sea/maps/",
  "/sea/events/",
  "/sea/study/",
  "/sea/pet/",
  "/sea/shop/",
  "/sea/refine/",
];

const routeSources = {
  "/": "app/page.tsx",
  "/search/": "app/search/page.tsx",
  "/database/": "app/database/page.tsx",
  "/database/wardrobe/": "app/database/wardrobe/page.tsx",
  "/updates/": "app/updates/page.tsx",
  "/creator-kit/": "public/creator-kit/index.html",
  "/guides/": "app/guides/page.tsx",
  "/guides/classes-builds/": "app/guides/classes-builds/page.tsx",
  "/guides/guild-events/": "app/guides/guild-events/page.tsx",
  "/guides/guild-management/": "app/guides/guild-management/page.tsx",
  "/guides/guild-league/": "app/guides/guild-league/page.tsx",
  "/guides/polarity-zone/": "app/guides/polarity-zone/page.tsx",
  "/guides/hazy-forest/": "app/guides/hazy-forest/page.tsx",
  "/guides/beginner-guides/": "app/guides/beginner-guides/page.tsx",
  "/guides/progression-equipment/": "app/guides/progression-equipment/page.tsx",
  "/guides/monsters-cards-farming/": "app/guides/monsters-cards-farming/page.tsx",
  "/guides/class-tier-list/": "app/guides/class-tier-list/page.tsx",
  "/guides/swordman-builds/": "app/guides/swordman-builds/page.tsx",
  "/guides/lord-knight-builds/": "app/guides/lord-knight-builds/page.tsx",
  "/guides/mage-builds/": "app/guides/mage-builds/page.tsx",
  "/guides/high-wizard-builds/": "app/guides/high-wizard-builds/page.tsx",
  "/guides/archer-builds/": "app/guides/archer-builds/page.tsx",
  "/guides/sniper-builds/": "app/guides/sniper-builds/page.tsx",
  "/guides/acolyte-builds/": "app/guides/acolyte-builds/page.tsx",
  "/guides/high-priest-builds/": "app/guides/high-priest-builds/page.tsx",
  "/guides/monk-build/": "app/guides/monk-build/page.tsx",
  "/guides/thief-builds/": "app/guides/thief-builds/page.tsx",
  "/guides/assassin-cross-builds/": "app/guides/assassin-cross-builds/page.tsx",
  "/guides/merchant-builds/": "app/guides/merchant-builds/page.tsx",
  "/guides/whitesmith-builds/": "app/guides/whitesmith-builds/page.tsx",
  "/guides/gunslinger-builds/": "app/guides/gunslinger-builds/page.tsx",
  "/guides/night-walker-builds/": "app/guides/night-walker-builds/page.tsx",
  "/guides/beginner-progression/": "app/guides/beginner-progression/page.tsx",
  "/guides/redeem-codes/": "app/guides/redeem-codes/page.tsx",
  "/guides/druid-builds/": "app/guides/druid-builds/page.tsx",
  "/guides/refining-equipment/": "app/guides/refining-equipment/page.tsx",
  "/guides/farming-card-progression/": "app/guides/farming-card-progression/page.tsx",
  "/guides/mvp-hunting/": "app/guides/mvp-hunting/page.tsx",
  "/guides/zeny-farming/": "app/guides/zeny-farming/page.tsx",
  "/guides/technical/": "app/guides/technical/page.tsx",
  "/guides/play-on-pc/": "app/guides/play-on-pc/page.tsx",
  "/guides/emulator-settings/": "app/guides/emulator-settings/page.tsx",
  "/guides/top-up-safely/": "app/guides/top-up-safely/page.tsx",
  "/guides/cloud-gaming/": "app/guides/cloud-gaming/page.tsx",
  "/guides/redfinger-cloud-phone/": "app/guides/redfinger-cloud-phone/page.tsx",
  "/tools/farming-target-finder/": "app/tools/farming-target-finder/page.tsx",
  "/tools/pc-setup-checker/": "app/tools/pc-setup-checker/page.tsx",
  "/tools/top-up-calculator/": "app/tools/top-up-calculator/page.tsx",
  "/about/": "app/(info)/about/page.tsx",
  "/contact/": "app/(info)/contact/page.tsx",
  "/privacy/": "app/(info)/privacy/page.tsx",
  "/terms/": "app/(info)/terms/page.tsx",
  "/disclaimer/": "app/(info)/disclaimer/page.tsx",
  "/sea/skill_planner/": "public/sea/skill_planner/index.html",
  "/sea/rune_planner/": "public/sea/rune_planner/index.html",
  "/sea/affix_planner/": "public/sea/affix_planner/index.html",
  "/sea/apocalypse_planner/": "public/sea/apocalypse_planner/index.html",
  "/sea/equipment/": "public/sea/equipment/index.html",
  "/sea/cards/": "public/sea/cards/index.html",
  "/sea/monster_album/": "public/sea/monster_album/index.html",
  "/sea/maps/": "public/sea/maps/index.html",
  "/sea/events/": "public/sea/events/index.html",
  "/sea/study/": "public/sea/study/index.html",
  "/sea/pet/": "public/sea/pet/index.html",
  "/sea/shop/": "public/sea/shop/index.html",
  "/sea/refine/": "public/sea/refine/index.html",
};

const modernRoutes = [
  "/search/",
  "/updates/",
  "/guides/technical/",
  "/guides/play-on-pc/",
  "/guides/emulator-settings/",
  "/guides/top-up-safely/",
  "/guides/cloud-gaming/",
  "/guides/redfinger-cloud-phone/",
  "/tools/farming-target-finder/",
  "/tools/pc-setup-checker/",
  "/tools/top-up-calculator/",
];

const staticContentRoutes = ["/creator-kit/"];

const socialSources = [
  "app/opengraph-image.tsx",
  "app/twitter-image.tsx",
  "app/guides/opengraph-image.tsx",
  "app/guides/twitter-image.tsx",
  "app/guides/class-tier-list/opengraph-image.tsx",
  "app/guides/beginner-progression/opengraph-image.tsx",
  "app/guides/druid-builds/opengraph-image.tsx",
  "app/guides/refining-equipment/opengraph-image.tsx",
  "app/guides/farming-card-progression/opengraph-image.tsx",
  "app/social/[slug]/route.tsx",
];

const results = [];
const add = (status, id, message, details) =>
  results.push({ status, id, message, ...(details ? { details } : {}) });
const read = (file) => readFile(path.join(root, file), "utf8");
async function exists(file) {
  try {
    await access(path.join(root, file));
    return true;
  } catch {
    return false;
  }
}

const [sitemap, robots, packageText] = await Promise.all([
  read("public/sitemap.xml"),
  read("public/robots.txt"),
  read("package.json"),
]);
const packageJson = JSON.parse(packageText);
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const duplicates = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
const missingRoutes = expectedRoutes.filter((route) => !sitemapUrls.includes(`${siteOrigin}${route}`));
const invalidDomains = sitemapUrls.filter((url) => !url.startsWith(`${siteOrigin}/`));
const invalidSlashes = sitemapUrls.filter((url) => !url.endsWith("/") && !url.endsWith(".xml"));

add(
  sitemap.includes("http://www.sitemaps.org/schemas/sitemap/0.9") ? "pass" : "error",
  "sitemap-namespace",
  "Sitemap uses the standard XML namespace.",
);
add(
  duplicates.length ? "error" : "pass",
  "sitemap-duplicates",
  duplicates.length ? "Duplicate sitemap URLs were found." : "Sitemap URLs are unique.",
  duplicates,
);
add(
  missingRoutes.length ? "error" : "pass",
  "sitemap-coverage",
  missingRoutes.length
    ? "Expected public routes are missing from the sitemap."
    : `All ${expectedRoutes.length} expected public routes are listed.`,
  missingRoutes,
);
add(
  invalidDomains.length ? "error" : "pass",
  "sitemap-domain",
  invalidDomains.length ? "Unexpected sitemap domains were found." : "All sitemap URLs use rtnw.online.",
  invalidDomains,
);
add(
  invalidSlashes.length ? "warn" : "pass",
  "sitemap-trailing-slashes",
  invalidSlashes.length ? "Some sitemap page URLs omit a trailing slash." : "Public page URLs use trailing slashes.",
  invalidSlashes,
);

const missingSources = [];
for (const [route, source] of Object.entries(routeSources)) {
  if (!(await exists(source))) missingSources.push({ route, source });
}
add(
  missingSources.length ? "error" : "pass",
  "route-sources",
  missingSources.length
    ? "Some sitemap routes have no matching source file."
    : "Every expected sitemap route has a repository source.",
  missingSources,
);

const robotsRules = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /sea/cache/",
  "Disallow: /sea/logs/",
  `Sitemap: ${siteOrigin}/sitemap.xml`,
  `Sitemap: ${siteOrigin}/content-sitemap.xml`,
];
const missingRobotsRules = robotsRules.filter((rule) => !robots.includes(rule));
add(
  missingRobotsRules.length ? "error" : "pass",
  "robots-policy",
  missingRobotsRules.length
    ? "robots.txt is missing required rules."
    : "robots.txt contains the required crawl and sitemap rules.",
  missingRobotsRules,
);
add(
  /^Disallow:\s*\/$/m.test(robots) ? "error" : "pass",
  "robots-not-blocked",
  /^Disallow:\s*\/$/m.test(robots)
    ? "robots.txt blocks the entire site."
    : "robots.txt does not block the entire site.",
);

const legacyProblems = [];
for (const [route, source] of Object.entries(routeSources).filter(([route]) => route.startsWith("/sea/"))) {
  const html = await read(source);
  const required = [
    "<title>",
    'name="description"',
    'rel="canonical"',
    'name="robots"',
    'property="og:title"',
    'property="og:image"',
    'name="twitter:card"',
    "<h1",
  ];
  const missing = required.filter((token) => !html.includes(token));
  if (missing.length) legacyProblems.push({ route, source, missing });
}
add(
  legacyProblems.length ? "error" : "pass",
  "legacy-page-metadata",
  legacyProblems.length
    ? "Some legacy tool pages are missing essential metadata."
    : "All 13 legacy tool pages expose essential crawl and sharing metadata.",
  legacyProblems,
);

const modernProblems = [];
for (const route of modernRoutes) {
  const source = routeSources[route];
  const text = await read(source);
  const required = [
    "export const metadata",
    "description:",
    "alternates:",
    `canonical: \"${route}\"`,
    "application/ld+json",
    "<h1",
  ];
  const missing = required.filter((token) => !text.includes(token));
  if (missing.length) modernProblems.push({ route, source, missing });
}
add(
  modernProblems.length ? "error" : "pass",
  "new-content-metadata",
  modernProblems.length
    ? "Some modern guide, search, update, or tool pages are missing essential metadata or structured data."
    : "All modern content pages expose canonical metadata, structured data, and an H1.",
  modernProblems,
);

const staticContentProblems = [];
for (const route of staticContentRoutes) {
  const source = routeSources[route];
  const text = await read(source);
  const required = [
    "<!doctype html>",
    "<title>",
    'name="description"',
    'rel="canonical"',
    "application/ld+json",
    "<h1",
    'name="rtnw-delivery" content="static"',
  ];
  const missing = required.filter((token) => !text.includes(token));
  if (missing.length) staticContentProblems.push({ route, source, missing });
}
add(
  staticContentProblems.length ? "error" : "pass",
  "static-content-metadata",
  staticContentProblems.length
    ? "Some static content pages are missing essential metadata or static-delivery markers."
    : "Static content pages expose crawl metadata and bypass dynamic rendering.",
  staticContentProblems,
);

const internalLinkFiles = ["app/page.tsx", "app/guides/page.tsx", "app/SiteHeader.tsx", "app/SiteFooter.tsx"];
const internalLinkText = Object.fromEntries(
  await Promise.all(internalLinkFiles.map(async (file) => [file, await read(file)])),
);
const missingInternalLinks = [...modernRoutes, ...staticContentRoutes]
  .filter((route) => !Object.values(internalLinkText).some((text) => text.includes(route)))
  .map((route) => ({ route, checked: internalLinkFiles }));
add(
  missingInternalLinks.length ? "warn" : "pass",
  "new-content-internal-links",
  missingInternalLinks.length
    ? "Some modern pages are not linked from the homepage, guide library, or shared navigation."
    : "Every modern page is linked from at least one primary discovery surface.",
  missingInternalLinks,
);

const missingSocialSources = [];
for (const source of socialSources) {
  if (!(await exists(source))) missingSocialSources.push(source);
}
add(
  missingSocialSources.length ? "warn" : "pass",
  "social-image-sources",
  missingSocialSources.length
    ? "Some social-card handlers are missing."
    : "Expected social-card handlers are present.",
  missingSocialSources,
);

const keyPath = `public/${indexNowKey}.txt`;
const indexNowKeyReady = (await exists(keyPath)) && (await read(keyPath)).trim() === indexNowKey;
const indexNowClientReady = await exists("scripts/indexnow-submit.mjs");
const indexNowVerifierReady = await exists("scripts/indexnow-verify.mjs");
const automaticCommand = packageJson.scripts?.postbuild || packageJson.scripts?.deploy || "";
const indexNowCommandsReady = Boolean(
  packageJson.scripts?.["indexnow:submit"] &&
    packageJson.scripts?.["indexnow:submit:all"] &&
    packageJson.scripts?.["indexnow:verify"] &&
    automaticCommand.includes("indexnow-submit.mjs"),
);
add(
  indexNowKeyReady ? "pass" : "error",
  "indexnow-key",
  indexNowKeyReady
    ? "The IndexNow verification key is hosted from the public root."
    : "The IndexNow key file is missing or does not match its filename.",
);
add(
  indexNowClientReady && indexNowVerifierReady && indexNowCommandsReady ? "pass" : "error",
  "indexnow-submission",
  indexNowClientReady && indexNowVerifierReady && indexNowCommandsReady
    ? "IndexNow verification, manual submission, and automatic deployment submission are configured."
    : "IndexNow verification or deployment wiring is incomplete.",
  {
    client: indexNowClientReady,
    verifier: indexNowVerifierReady,
    commands: indexNowCommandsReady,
  },
);

const verification = {
  google: Boolean(process.env.GOOGLE_SITE_VERIFICATION?.trim()),
  bing: Boolean(process.env.BING_SITE_VERIFICATION?.trim()),
  indexNow: indexNowKeyReady && indexNowClientReady && indexNowVerifierReady && indexNowCommandsReady,
};
add(
  verification.google ? "pass" : "warn",
  "google-verification",
  verification.google
    ? "Google ownership verification is configured."
    : "Google ownership verification is not configured in this build environment.",
);
add(
  verification.bing ? "pass" : "warn",
  "bing-verification",
  verification.bing
    ? "Bing ownership verification is configured."
    : "Bing ownership verification is not configured in this build environment.",
);

const summary = results.reduce(
  (counts, result) => {
    counts[result.status] += 1;
    return counts;
  },
  { pass: 0, warn: 0, error: 0 },
);

const report = {
  generatedAt: new Date().toISOString(),
  site: siteOrigin,
  sitemap: {
    url: `${siteOrigin}/sitemap.xml`,
    urlCount: sitemapUrls.length,
    expectedRouteCount: expectedRoutes.length,
  },
  verification,
  summary,
  results,
};

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`SEO audit: ${summary.pass} passed, ${summary.warn} warnings, ${summary.error} errors.`);
console.log(`Report written to ${path.relative(root, reportPath)}.`);
if (strict && summary.error > 0) process.exitCode = 1;

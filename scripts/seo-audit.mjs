import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const strict = process.argv.includes("--strict");
const siteOrigin = "https://rtnw.online";
const reportPath = path.join(root, "public", "seo-audit.json");
const indexNowKey = "4cc78cf9b31d099f4de23a0874b08a5e";
const indexNowKeyPath = `public/${indexNowKey}.txt`;

const expectedRoutes = [
  "/",
  "/guides/",
  "/guides/classes-builds/",
  "/guides/beginner-guides/",
  "/guides/progression-equipment/",
  "/guides/monsters-cards-farming/",
  "/guides/class-tier-list/",
  "/guides/beginner-progression/",
  "/guides/druid-builds/",
  "/guides/refining-equipment/",
  "/guides/farming-card-progression/",
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
  "/guides/": "app/guides/page.tsx",
  "/guides/classes-builds/": "app/guides/classes-builds/page.tsx",
  "/guides/beginner-guides/": "app/guides/beginner-guides/page.tsx",
  "/guides/progression-equipment/": "app/guides/progression-equipment/page.tsx",
  "/guides/monsters-cards-farming/": "app/guides/monsters-cards-farming/page.tsx",
  "/guides/class-tier-list/": "app/guides/class-tier-list/page.tsx",
  "/guides/beginner-progression/": "app/guides/beginner-progression/page.tsx",
  "/guides/druid-builds/": "app/guides/druid-builds/page.tsx",
  "/guides/refining-equipment/": "app/guides/refining-equipment/page.tsx",
  "/guides/farming-card-progression/": "app/guides/farming-card-progression/page.tsx",
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

const socialImageSources = [
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

function add(status, id, message, details = undefined) {
  results.push({ status, id, message, ...(details ? { details } : {}) });
}

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

const sitemap = await read("public/sitemap.xml");
const robots = await read("public/robots.txt");
const packageJson = JSON.parse(await read("package.json"));
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
const duplicateUrls = sitemapUrls.filter((url, index) => sitemapUrls.indexOf(url) !== index);
const missingSitemapRoutes = expectedRoutes.filter((route) => !sitemapUrls.includes(`${siteOrigin}${route}`));
const invalidDomainUrls = sitemapUrls.filter((url) => !url.startsWith(`${siteOrigin}/`));
const invalidSlashUrls = sitemapUrls.filter((url) => !url.endsWith("/") && !url.endsWith(".xml"));

add(
  sitemap.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"') ? "pass" : "error",
  "sitemap-namespace",
  "Sitemap uses the standard XML namespace.",
);
add(
  duplicateUrls.length === 0 ? "pass" : "error",
  "sitemap-duplicates",
  duplicateUrls.length === 0 ? "Sitemap URLs are unique." : "Duplicate sitemap URLs were found.",
  duplicateUrls,
);
add(
  missingSitemapRoutes.length === 0 ? "pass" : "error",
  "sitemap-coverage",
  missingSitemapRoutes.length === 0
    ? `All ${expectedRoutes.length} expected public routes are listed.`
    : "Expected public routes are missing from the sitemap.",
  missingSitemapRoutes,
);
add(
  invalidDomainUrls.length === 0 ? "pass" : "error",
  "sitemap-domain",
  invalidDomainUrls.length === 0 ? "All sitemap URLs use rtnw.online." : "Unexpected sitemap domains were found.",
  invalidDomainUrls,
);
add(
  invalidSlashUrls.length === 0 ? "pass" : "warn",
  "sitemap-trailing-slashes",
  invalidSlashUrls.length === 0 ? "Public page URLs use trailing slashes." : "Some sitemap page URLs omit a trailing slash.",
  invalidSlashUrls,
);

const sourceMissing = [];
for (const [route, source] of Object.entries(routeSources)) {
  if (!(await exists(source))) sourceMissing.push({ route, source });
}
add(
  sourceMissing.length === 0 ? "pass" : "error",
  "route-sources",
  sourceMissing.length === 0 ? "Every expected sitemap route has a repository source." : "Some sitemap routes have no matching source file.",
  sourceMissing,
);

const robotsChecks = [
  ["User-agent: *", "default user-agent rule"],
  ["Allow: /", "site-wide allow rule"],
  ["Disallow: /sea/cache/", "cache exclusion"],
  ["Disallow: /sea/logs/", "log exclusion"],
  [`Sitemap: ${siteOrigin}/sitemap.xml`, "sitemap declaration"],
];
const missingRobotsRules = robotsChecks.filter(([rule]) => !robots.includes(rule)).map(([, label]) => label);
add(
  missingRobotsRules.length === 0 ? "pass" : "error",
  "robots-policy",
  missingRobotsRules.length === 0 ? "robots.txt contains the required crawl rules." : "robots.txt is missing required rules.",
  missingRobotsRules,
);
add(
  /^Disallow:\s*\/$/m.test(robots) ? "error" : "pass",
  "robots-not-blocked",
  /^Disallow:\s*\/$/m.test(robots) ? "robots.txt blocks the entire site." : "robots.txt does not block the entire site.",
);

const legacyRoutes = Object.entries(routeSources).filter(([route]) => route.startsWith("/sea/"));
const legacyProblems = [];
for (const [route, source] of legacyRoutes) {
  if (!(await exists(source))) continue;
  const html = await read(source);
  const required = [
    ["title", /<title>[^<]+<\/title>/i],
    ["description", /<meta\s+name=["']description["'][^>]+>/i],
    ["canonical", /<link\s+rel=["']canonical["'][^>]+>/i],
    ["robots", /<meta\s+name=["']robots["'][^>]+>/i],
    ["Open Graph title", /<meta\s+property=["']og:title["'][^>]+>/i],
    ["Open Graph image", /<meta\s+property=["']og:image["'][^>]+>/i],
    ["Twitter card", /<meta\s+name=["']twitter:card["'][^>]+>/i],
    ["H1", /<h1\b[^>]*>[^<]+<\/h1>/i],
  ];
  const missing = required.filter(([, pattern]) => !pattern.test(html)).map(([label]) => label);
  if (missing.length) legacyProblems.push({ route, source, missing });
}
add(
  legacyProblems.length === 0 ? "pass" : "error",
  "legacy-page-metadata",
  legacyProblems.length === 0
    ? `All ${legacyRoutes.length} legacy tool pages expose essential crawl and sharing metadata.`
    : "Some legacy tool pages are missing essential metadata.",
  legacyProblems,
);

const missingSocialSources = [];
for (const source of socialImageSources) {
  if (!(await exists(source))) missingSocialSources.push(source);
}
add(
  missingSocialSources.length === 0 ? "pass" : "warn",
  "social-image-sources",
  missingSocialSources.length === 0 ? "Expected social-card handlers are present." : "Some social-card handlers are missing.",
  missingSocialSources,
);

const indexNowKeyReady =
  (await exists(indexNowKeyPath)) && (await read(indexNowKeyPath)).trim() === indexNowKey;
const indexNowClientReady = await exists("scripts/indexnow-submit.mjs");
const indexNowVerifierReady = await exists("scripts/indexnow-verify.mjs");
const indexNowCommandsReady = Boolean(
  packageJson.scripts?.["indexnow:submit"] &&
  packageJson.scripts?.["indexnow:submit:all"] &&
  packageJson.scripts?.["indexnow:verify"] &&
  packageJson.scripts?.deploy?.includes("indexnow-submit.mjs"),
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
    ? "IndexNow verification, manual submission, and post-deploy submission commands are configured."
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
  indexNow:
    indexNowKeyReady && indexNowClientReady && indexNowVerifierReady && indexNowCommandsReady,
};
add(
  verification.google ? "pass" : "warn",
  "google-verification",
  verification.google ? "Google ownership verification is configured." : "Google ownership verification is not configured yet.",
);
add(
  verification.bing ? "pass" : "warn",
  "bing-verification",
  verification.bing ? "Bing ownership verification is configured." : "Bing ownership verification is not configured yet.",
);

const counts = results.reduce(
  (summary, result) => {
    summary[result.status] += 1;
    return summary;
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
  summary: counts,
  results,
};

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log(`SEO audit: ${counts.pass} passed, ${counts.warn} warnings, ${counts.error} errors.`);
console.log(`Report written to ${path.relative(root, reportPath)}.`);

if (strict && counts.error > 0) process.exitCode = 1;

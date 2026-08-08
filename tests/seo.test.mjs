import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const siteOrigin = "https://rtnw.online";
const socialProfileUrls = [
  "https://www.youtube.com/@rtnw.online",
  "https://www.tiktok.com/@rtnw.online",
  "https://www.facebook.com/RtnwOnline",
];
const toolRoutes = [
  "skill_planner",
  "rune_planner",
  "affix_planner",
  "apocalypse_planner",
  "equipment",
  "cards",
  "monster_album",
  "maps",
  "events",
  "study",
  "pet",
  "shop",
  "refine",
];

const classGuideRoutes = [
  "/guides/swordman-builds/",
  "/guides/mage-builds/",
  "/guides/archer-builds/",
  "/guides/acolyte-builds/",
  "/guides/thief-builds/",
  "/guides/merchant-builds/",
  "/guides/gunslinger-builds/",
];

const advancedClassGuideRoutes = [
  "/guides/lord-knight-builds/",
  "/guides/high-wizard-builds/",
  "/guides/sniper-builds/",
  "/guides/high-priest-builds/",
  "/guides/assassin-cross-builds/",
  "/guides/whitesmith-builds/",
  "/guides/night-walker-builds/",
];

const refreshedGuideRoutes = [
  "/guides/guild-management/",
  "/guides/guild-league/",
  "/guides/polarity-zone/",
  "/guides/hazy-forest/",
  ...classGuideRoutes,
  ...advancedClassGuideRoutes,
];

const publicPageRoutes = [
  "/",
  "/search/",
  "/database/",
  "/updates/",
  "/guides/",
  "/guides/classes-builds/",
  "/guides/guild-events/",
  ...refreshedGuideRoutes,
  "/guides/beginner-guides/",
  "/guides/progression-equipment/",
  "/guides/monsters-cards-farming/",
  "/guides/class-tier-list/",
  "/guides/monk-build/",
  "/guides/beginner-progression/",
  "/guides/redeem-codes/",
  "/guides/druid-builds/",
  "/guides/refining-equipment/",
  "/guides/farming-card-progression/",
  "/guides/technical/",
  "/guides/play-on-pc/",
  "/guides/emulator-settings/",
  "/guides/top-up-safely/",
  "/guides/cloud-gaming/",
  "/tools/farming-target-finder/",
  "/tools/pc-setup-checker/",
  "/tools/top-up-calculator/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/disclaimer/",
  ...toolRoutes.map((route) => `/sea/${route}/`),
];

function matchContent(html, pattern, label) {
  const match = html.match(pattern);
  assert.ok(match, `Missing ${label}`);
  return match[1];
}

async function findFiles(directory, filename) {
  const results = [];
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const candidate = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...(await findFiles(candidate, filename)));
    if (entry.isFile() && entry.name === filename) results.push(candidate);
  }
  return results;
}

async function loadBuiltWorker() {
  const configs = await findFiles("dist", "wrangler.json");
  assert.ok(configs.length > 0, "Cloudflare build did not emit an output wrangler.json");

  for (const configPath of configs) {
    const config = JSON.parse(await readFile(configPath, "utf8"));
    if (typeof config.main !== "string") continue;
    const workerPath = path.resolve(path.dirname(configPath), config.main);
    try {
      await access(workerPath);
    } catch {
      continue;
    }
    const workerUrl = pathToFileURL(workerPath);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    const workerModule = await import(workerUrl.href);
    if (workerModule.default && typeof workerModule.default.fetch === "function") {
      return workerModule.default;
    }
  }

  assert.fail("No generated Cloudflare Worker entry exported default.fetch");
}

function createTestRuntime() {
  const assets = {
    async fetch(request) {
      const pathname = new URL(request.url).pathname;
      try {
        const body = await readFile(`public${pathname}`);
        const contentType = pathname.endsWith(".xml")
          ? "application/xml; charset=utf-8"
          : pathname.endsWith(".txt")
            ? "text/plain; charset=utf-8"
            : "application/octet-stream";
        return new Response(request.method === "HEAD" ? null : body, {
          status: 200,
          headers: { "Content-Type": contentType },
        });
      } catch {
        return new Response("Not found", { status: 404 });
      }
    },
  };

  return {
    env: { ASSETS: assets },
    context: { waitUntil() {}, passThroughOnException() {} },
  };
}

test("every indexable tool page has unique static SEO signals", async () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const route of toolRoutes) {
    const html = await readFile(`public/sea/${route}/index.html`, "utf8");
    const title = matchContent(html, /<title>([^<]+)<\/title>/i, `${route} title`);
    const description = matchContent(
      html,
      /<meta\s+name="description"\s+content="([^"]+)"/i,
      `${route} description`,
    );
    const canonical = matchContent(
      html,
      /<link\s+rel="canonical"\s+href="([^"]+)"/i,
      `${route} canonical`,
    );

    assert.match(title, /Ragnarok: The New World/i, `${route} title should name the game`);
    assert.match(title, /RTNW Hub/i, `${route} title should include the site name`);
    assert.ok(
      description.length >= 100 && description.length <= 180,
      `${route} description length is ${description.length}`,
    );
    assert.equal(canonical, `${siteOrigin}/sea/${route}/`);
    assert.match(html, /<meta\s+name="robots"\s+content="index,follow/i);
    assert.match(html, /<link\s+rel="icon"\s+href="\/favicon\.ico"/i);
    assert.match(html, /<link\s+rel="stylesheet"\s+href="\/sea\/shared\/seo\.css/i);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} should contain one H1`);
    assert.match(html, /<section\s+class="seo-guide"/i, `${route} should include visible guide copy`);

    const schemas = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    assert.ok(schemas.length >= 1, `${route} should include JSON-LD`);
    for (const schema of schemas) JSON.parse(schema[1]);

    assert.ok(!titles.has(title), `Duplicate title: ${title}`);
    assert.ok(!descriptions.has(description), `Duplicate description: ${description}`);
    titles.add(title);
    descriptions.add(description);
  }
});

test("sitemap, robots, manifest, and favicon are current", async () => {
  const [sitemap, robots, manifest, favicon] = await Promise.all([
    readFile("public/sitemap.xml", "utf8"),
    readFile("public/robots.txt", "utf8"),
    readFile("public/site.webmanifest", "utf8"),
    readFile("public/favicon.ico"),
  ]);

  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length, "Sitemap URLs should be unique");
  for (const route of publicPageRoutes) {
    assert.ok(urls.includes(`${siteOrigin}${route}`), `Sitemap is missing ${route}`);
  }
  assert.match(
    robots,
    new RegExp(`Sitemap: ${siteOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/sitemap\\.xml`),
  );
  assert.equal(JSON.parse(manifest).name, "Ragnarok: The New World Hub");
  assert.equal(
    favicon.subarray(0, 4).toString("hex"),
    "00000100",
    "favicon.ico should have a valid ICO header",
  );
});

test("rendered home page exposes canonical metadata, social identity, and WebSite schema", async () => {
  const worker = await loadBuiltWorker();
  const { env, context } = createTestRuntime();
  const response = await worker.fetch(
    new Request(`${siteOrigin}/`, { headers: { accept: "text/html" } }),
    env,
    context,
  );
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<link[^>]+rel="canonical"[^>]+href="https:\/\/rtnw\.online\/"/i);
  assert.match(html, /Ragnarok: The New World Guides, Builds &amp; Tools/i);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"SearchAction"/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /href="(?:https:\/\/rtnw\.online)?\/favicon\.ico"/i);
  for (const profileUrl of socialProfileUrls) {
    assert.ok(html.includes(profileUrl), `Missing social profile in Organization.sameAs: ${profileUrl}`);
  }
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
});

test("application pages render one shared shell without social or provenance UI", async () => {
  const worker = await loadBuiltWorker();
  const { env, context } = createTestRuntime();
  const routes = [
    "/guides/",
    "/guides/guild-management/",
    "/guides/acolyte-builds/",
    "/guides/high-priest-builds/",
    "/guides/monk-build/",
    "/database/",
  ];

  for (const pathname of routes) {
    const response = await worker.fetch(
      new Request(`${siteOrigin}${pathname}`, { headers: { accept: "text/html" } }),
      env,
      context,
    );
    const html = await response.text();
    assert.equal(response.status, 200, `${pathname} should render`);
    assert.equal((html.match(/shared-site-header/g) ?? []).length, 1, `${pathname} should have one shared header`);
    assert.equal((html.match(/<footer\s+class="shared-site-footer"/g) ?? []).length, 1, `${pathname} should have one shared footer`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${pathname} should have one H1`);
    assert.doesNotMatch(html, /social[-_ ]bar|source and editorial note|source status/i);

    if (pathname.includes("guild-management") || pathname.includes("acolyte-builds") || pathname.includes("high-priest") || pathname.includes("monk-build")) {
      assert.match(html, /src="\/assets\//, `${pathname} should render local guide imagery`);
      assert.ok((html.match(/data-ad-placement=/g) ?? []).length >= 2, `${pathname} should reserve two guide ads`);
    }

    if (pathname.includes("high-priest") || pathname.includes("monk-build") || pathname === "/database/") {
      assert.match(html, /class="faq-accordion"/, `${pathname} should use the shared FAQ accordion`);
    }
  }
});

test("advanced-job and Monk guides render complete styled article pages", async () => {
  const worker = await loadBuiltWorker();
  const { env, context } = createTestRuntime();

  for (const pathname of [...advancedClassGuideRoutes, "/guides/monk-build/"]) {
    const response = await worker.fetch(
      new Request(`${siteOrigin}${pathname}`, { headers: { accept: "text/html" } }),
      env,
      context,
    );
    const html = await response.text();

    assert.equal(response.status, 200, `${pathname} should render`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${pathname} should have one H1`);
    assert.match(html, new RegExp(`rel="canonical"[^>]+href="${siteOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${pathname.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "i"));
    assert.match(html, /class="faq-accordion"/, `${pathname} should use the shared FAQ component`);
    assert.ok((html.match(/data-ad-placement=/g) ?? []).length >= 2, `${pathname} should reserve two guide ads`);
    assert.match(html, /src="\/assets\//, `${pathname} should use a local image`);
    assert.doesNotMatch(html, /cdnimages\.awselbcombine\.com|source and editorial note|source status/i);
  }
});

test("Cloudflare build serves guides and active discovery routes", async () => {
  const worker = await loadBuiltWorker();
  const { env, context } = createTestRuntime();

  for (const pathname of [
    "/guides/",
    "/guides/classes-builds/",
    "/guides/guild-events/",
    ...refreshedGuideRoutes,
    "/guides/druid-builds/",
    "/guides/redeem-codes/",
    "/search/",
    "/database/",
    "/updates/",
    "/seo-status/",
    "/robots.txt",
    "/4cc78cf9b31d099f4de23a0874b08a5e.txt",
  ]) {
    const response = await worker.fetch(
      new Request(`${siteOrigin}${pathname}`, {
        headers: { accept: "text/html,text/plain" },
      }),
      env,
      context,
    );
    assert.equal(response.status, 200, `${pathname} should return 200`);
  }

  for (const pathname of ["/feed.xml", "/deployment-version.txt"]) {
    let response = await worker.fetch(
      new Request(`${siteOrigin}${pathname}`),
      env,
      context,
    );
    if ([307, 308].includes(response.status)) {
      const location = response.headers.get("location");
      assert.ok(location, `${pathname} redirect should include a location`);
      response = await worker.fetch(new Request(new URL(location, siteOrigin)), env, context);
    }
    assert.equal(response.status, 404, `${pathname} should remain removed`);
  }

  const robotTypo = await worker.fetch(
    new Request(`${siteOrigin}/robot.txt`),
    env,
    context,
  );
  assert.equal(robotTypo.status, 308);
  assert.equal(robotTypo.headers.get("location"), `${siteOrigin}/robots.txt`);
});

test("refreshed guides use local images without visible provenance annotations", async () => {
  const [template, navigation] = await Promise.all([
    readFile("app/guides/SourceGuidePage.tsx", "utf8"),
    readFile("app/GuideNavigation.tsx", "utf8"),
  ]);

  assert.doesNotMatch(template, /Source and editorial note|Source status|isBasedOn/);
  assert.doesNotMatch(navigation, /SOCIAL_LINKS|social-footer-links|YouTube|TikTok|Facebook/);

  const dataFiles = (await readdir("app/guides/source-guide-data"))
    .filter((name) => name.endsWith(".ts"));
  assert.equal(dataFiles.length, 13);

  for (const filename of dataFiles) {
    const text = await readFile(path.join("app/guides/source-guide-data", filename), "utf8");
    assert.doesNotMatch(text, /"sourceUrl"|"sourceTitle"|cdnimages\.awselbcombine\.com/);
    assert.match(text, /["']?heroImage["']?\s*:\s*["']\/assets\//);
  }
});

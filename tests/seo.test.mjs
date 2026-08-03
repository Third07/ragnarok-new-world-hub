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

const publicPageRoutes = [
  "/",
  "/guides/",
  "/guides/classes-builds/",
  "/guides/beginner-guides/",
  "/guides/progression-equipment/",
  "/guides/monsters-cards-farming/",
  "/guides/class-tier-list/",
  ...classGuideRoutes,
  "/guides/beginner-progression/",
  "/guides/redeem-codes/",
  "/guides/druid-builds/",
  "/guides/refining-equipment/",
  "/guides/farming-card-progression/",
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
    const module = await import(workerUrl.href);
    if (module.default && typeof module.default.fetch === "function") {
      return module.default;
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
  assert.deepEqual(urls, publicPageRoutes.map((route) => `${siteOrigin}${route}`));
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
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    env,
    context,
  );
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<link[^>]+rel="canonical"[^>]+href="https:\/\/rtnw\.online\/"/i);
  assert.match(html, /Ragnarok: The New World Guides, Builds &amp; Tools/i);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /href="(?:https:\/\/rtnw\.online)?\/favicon\.ico"/i);
  for (const profileUrl of socialProfileUrls) {
    assert.ok(html.includes(profileUrl), `Missing social profile in Organization.sameAs: ${profileUrl}`);
  }
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
});

test("Cloudflare build serves guides and active discovery routes", async () => {
  const worker = await loadBuiltWorker();
  const { env, context } = createTestRuntime();

  for (const pathname of [
    "/guides/",
    "/guides/classes-builds/",
    ...classGuideRoutes,
    "/guides/druid-builds/",
    "/guides/redeem-codes/",
    "/seo-status/",
    "/robots.txt",
    "/4cc78cf9b31d099f4de23a0874b08a5e.txt",
  ]) {
    const response = await worker.fetch(
      new Request(`http://localhost${pathname}`, {
        headers: { accept: "text/html,text/plain" },
      }),
      env,
      context,
    );
    assert.equal(response.status, 200, `${pathname} should return 200`);
  }

  for (const pathname of ["/updates/", "/feed.xml", "/deployment-version.txt"]) {
    const response = await worker.fetch(
      new Request(`http://localhost${pathname}`),
      env,
      context,
    );
    assert.equal(response.status, 404, `${pathname} should remain removed`);
  }

  const robotTypo = await worker.fetch(
    new Request("http://localhost/robot.txt"),
    env,
    context,
  );
  assert.equal(robotTypo.status, 308);
  assert.equal(robotTypo.headers.get("location"), "http://localhost/robots.txt");
});

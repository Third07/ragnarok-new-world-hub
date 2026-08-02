import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const siteOrigin = "https://rtnw.online";
const routes = [
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

function matchContent(html, pattern, label) {
  const match = html.match(pattern);
  assert.ok(match, `Missing ${label}`);
  return match[1];
}

test("every indexable tool page has unique static SEO signals", async () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const route of routes) {
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
    assert.ok(description.length >= 100 && description.length <= 180, `${route} description length is ${description.length}`);
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

test("sitemap, robots, manifest, and favicon use the canonical domain", async () => {
  const [sitemap, robots, manifest, favicon] = await Promise.all([
    readFile("public/sitemap.xml", "utf8"),
    readFile("public/robots.txt", "utf8"),
    readFile("public/site.webmanifest", "utf8"),
    readFile("public/favicon.ico"),
  ]);

  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls, [
    `${siteOrigin}/`,
    ...routes.map((route) => `${siteOrigin}/sea/${route}/`),
  ]);
  assert.match(robots, new RegExp(`Sitemap: ${siteOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\/sitemap\\.xml`));
  assert.equal(JSON.parse(manifest).name, "Ragnarok: The New World Hub");
  assert.equal(favicon.subarray(0, 4).toString("hex"), "00000100", "favicon.ico should have a valid ICO header");
});

test("rendered home page exposes canonical metadata and WebSite schema", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("seo-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<link[^>]+rel="canonical"[^>]+href="https:\/\/rtnw\.online\/"/i);
  assert.match(html, /Ragnarok: The New World Guides, Builds &amp; Tools/i);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /href="(?:https:\/\/rtnw\.online)?\/favicon\.ico"/i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
});

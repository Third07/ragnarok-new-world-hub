import assert from "node:assert/strict";
import test from "node:test";

test("renders the production homepage through the built worker", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("https://rtnw.online/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Ragnarok: The New World Database &amp; Skill Planner \| RTNW Hub<\/title>/i);
  assert.doesNotMatch(html, /codex-preview/i);
});

test("renders the Wardrobe catalogue with canonical metadata and useful filter guidance", async () => {
  const { default: worker } = await import(new URL("../dist/server/index.js", import.meta.url).href);
  const response = await worker.fetch(new Request("https://rtnw.online/database/wardrobe/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /rel="canonical" href="https:\/\/rtnw\.online\/database\/wardrobe\/"/);
  assert.match(html, /Ragnarok: The New World Wardrobe/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /id="wardrobe-search"/);
  assert.match(html, /Availability varies by server/);
  assert.match(html, /Gender and job filters include unrestricted cosmetics/);
  assert.match(html, /https:\/\/www\.roworlddb\.com\/sea\/wardrobe\/\?lang=en-US/);
  assert.doesNotMatch(html, /Local item images|dye flags come from|About these records/);
});

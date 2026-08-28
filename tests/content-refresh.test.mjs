import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { loadClientComponent, loadDataModule, findNodes } from "./helpers/client-component.mjs";

const [codeData, imageData, advancedGuides, polarityData] = await Promise.all([
  "app/guides/redeem-codes/redeem-code-data.ts",
  "app/guides/guide-image-dimensions.ts",
  "app/guides/source-guide-data/advanced-second-job-guides.ts",
  "app/guides/source-guide-data/polarity-zone.ts",
].map(loadDataModule));
const { activeCodes, reportedCodes, codeSources, codesReviewedAt, partnerPromotion } = codeData;
const { guideImageDimensions } = imageData;
const { guide: polarityGuide } = polarityData;

const refreshedGuides = [advancedGuides.assassinCrossGuide, advancedGuides.highWizardGuide, advancedGuides.sniperGuide, advancedGuides.lordKnightGuide, polarityGuide];

test("code records distinguish source agreement from live redemption and resolve every citation", () => {
  const ids = new Set(codeSources.map((source) => source.id));
  assert.equal(activeCodes.length, 9);
  assert.equal(reportedCodes.length, 3);
  const codes = [...activeCodes, ...reportedCodes];
  assert.equal(new Set(codes.map((item) => item.code)).size, codes.length);
  for (const item of codes) {
    assert.match(item.code, /^[A-Z0-9]+$/);
    assert.ok(item.sources.length > 0);
    for (const source of item.sources) assert.ok(ids.has(source), `${item.code}: ${source}`);
  }
  assert.ok(activeCodes.every((item) => item.confidence === "Source listed" && item.sources.length >= 2));
  assert.ok(reportedCodes.every((item) => item.confidence !== "Source listed"));
  assert.match(codesReviewedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(partnerPromotion.expiresAt).toISOString(), "2026-08-31T15:59:00.000Z");
});

test("new guide sections have unique anchors, complete tables, and accurate sitemap dates", async () => {
  const sitemaps = await Promise.all(["public/sitemap.xml", "public/content-sitemap.xml"].map((file) => readFile(file, "utf8")));
  for (const guide of refreshedGuides) {
    assert.equal(guide.modified, "2026-08-28");
    assert.ok(guide.quickAnswer.length > 100);
    assert.equal(new Set(guide.sections.map((section) => section.id)).size, guide.sections.length);
    for (const section of guide.sections) {
      if (section.table) assert.ok(section.table.rows.every((row) => row.length === section.table.headers.length), section.id);
    }
    for (const sitemap of sitemaps) {
      const entry = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find(([, value]) => value.includes(`<loc>https://rtnw.online/guides/${guide.slug}/</loc>`));
      assert.ok(entry?.[1].includes(`<lastmod>${guide.modified}</lastmod>`), guide.slug);
    }
    for (const source of guide.dataSources || []) {
      if (source.href.endsWith(".json")) assert.ok(JSON.parse(await readFile(`public${source.href}`, "utf8")));
    }
  }
  assert.equal(advancedGuides.highPriestGuide.modified, "2026-08-08", "Do not claim unedited guides were reviewed");
});

function webpDimensions(bytes) {
  assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
  assert.equal(bytes.toString("ascii", 8, 12), "WEBP");
  for (let offset = 12; offset + 8 < bytes.length;) {
    const type = bytes.toString("ascii", offset, offset + 4);
    const size = bytes.readUInt32LE(offset + 4);
    const data = offset + 8;
    if (type === "VP8X") return [1 + bytes.readUIntLE(data + 4, 3), 1 + bytes.readUIntLE(data + 7, 3)];
    if (type === "VP8 ") return [bytes.readUInt16LE(data + 6) & 0x3fff, bytes.readUInt16LE(data + 8) & 0x3fff];
    if (type === "VP8L") {
      const bits = bytes.readUInt32LE(data + 1);
      return [1 + (bits & 0x3fff), 1 + ((bits >>> 14) & 0x3fff)];
    }
    offset = data + size + (size % 2);
  }
  throw new Error("Missing WebP image dimensions");
}

test("all guide screenshots reserve their real intrinsic image dimensions", async () => {
  for (const [src, dimensions] of Object.entries(guideImageDimensions)) {
    assert.deepEqual(dimensions, webpDimensions(await readFile(`public${src}`)), src);
  }
  const files = (await readdir("app/guides/source-guide-data")).filter((file) => file.endsWith(".ts"));
  for (const file of files) {
    const source = await readFile(`app/guides/source-guide-data/${file}`, "utf8");
    for (const [, src] of source.matchAll(/\bsrc"?\s*:\s*"(\/assets\/guides\/[^\"]+)"/g)) {
      assert.ok(guideImageDimensions[src], `Missing intrinsic dimensions for ${src}`);
    }
  }
});

test("Redfinger illustrations are responsive local WebP files with matching sitemap entries", async () => {
  const directory = "public/assets/guides/redfinger-cloud-phone";
  const expected = {
    "redfinger-devices-360.webp": [360, 377],
    "redfinger-devices-602.webp": [602, 631],
    "redfinger-session-360.webp": [360, 361],
    "redfinger-session-600.webp": [600, 602],
  };
  assert.deepEqual((await readdir(directory)).sort(), Object.keys(expected).sort());
  let totalBytes = 0;
  for (const [file, dimensions] of Object.entries(expected)) {
    const bytes = await readFile(`${directory}/${file}`);
    assert.deepEqual(webpDimensions(bytes), dimensions, file);
    totalBytes += bytes.length;
  }
  assert.ok(totalBytes < 250_000, "Do not import the large saved marketing page or unoptimized images");
  const contentSitemap = await readFile("public/content-sitemap.xml", "utf8");
  const entry = [...contentSitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].find(([, value]) => value.includes("https://rtnw.online/guides/redfinger-cloud-phone/"))?.[1];
  assert.ok(entry);
  for (const image of ["redfinger-devices-602.webp", "redfinger-session-600.webp"]) {
    assert.ok(entry.includes(`<image:loc>https://rtnw.online/assets/guides/redfinger-cloud-phone/${image}</image:loc>`));
  }
  assert.match(await readFile("app/search/SearchClient.tsx", "utf8"), /href: "\/guides\/redfinger-cloud-phone\/"/);
});

test("redeem codes are discoverable from the homepage, guide index, and site search", async () => {
  for (const file of ["app/page.tsx", "app/guides/page.tsx", "app/search/SearchClient.tsx"]) {
    assert.match(await readFile(file, "utf8"), /\/guides\/redeem-codes\//, file);
  }
});

const codeComponent = "app/guides/redeem-codes/RedeemCodeList.tsx";
const button = (tree, label) => findNodes(tree, (node) => node.type === "button" && node.props["aria-label"] === label)[0];
const status = (tree) => findNodes(tree, (node) => node.props?.role === "status")[0].props.children;

test("copy buttons await the clipboard and report failures without false success", async () => {
  let fail = true;
  const copied = [];
  const harness = await loadClientComponent(codeComponent, { globals: {
    navigator: { clipboard: { async writeText(text) { if (fail) throw new Error("Blocked"); copied.push(text); } } },
    setTimeout: () => 1, clearTimeout() {},
  } });
  const props = { codes: activeCodes };
  let tree = harness.render(props);
  await button(tree, "Copy ROWGO1ST").props.onClick();
  tree = harness.render(props);
  assert.match(status(tree), /Clipboard unavailable/);
  assert.equal(button(tree, "Copy ROWGO1ST").props.children, "Copy code");
  fail = false;
  await button(tree, "Copy ROWGO1ST").props.onClick();
  tree = harness.render(props);
  assert.deepEqual(copied, ["ROWGO1ST"]);
  assert.equal(status(tree), "ROWGO1ST copied.");
  assert.equal(button(tree, "Copy ROWGO1ST").props.children, "Copied");
  harness.unmount();
});

test("copy all excludes disputed codes and older asynchronous requests cannot overwrite feedback", async () => {
  const pending = [];
  const harness = await loadClientComponent(codeComponent, { globals: {
    navigator: { clipboard: { writeText(text) { return new Promise((resolve) => pending.push({ text, resolve })); } } },
    setTimeout: () => 1, clearTimeout() {},
  } });
  const props = { codes: activeCodes };
  let tree = harness.render(props);
  const all = findNodes(tree, (node) => node.type === "button" && node.props.children === "Copy all codes")[0];
  const first = all.props.onClick();
  const second = button(tree, "Copy ROW0716").props.onClick();
  assert.deepEqual(pending[0].text.split("\n"), activeCodes.map((item) => item.code));
  pending[1].resolve(); await second;
  pending[0].resolve(); await first;
  tree = harness.render(props);
  assert.equal(status(tree), "ROW0716 copied.");
  tree = harness.render({ codes: reportedCodes, allowCopyAll: false });
  assert.equal(findNodes(tree, (node) => node.type === "button").length, reportedCodes.length);
  const late = button(tree, "Copy BABYMONSTER").props.onClick();
  harness.unmount();
  const writes = harness.stateWrites;
  pending[2].resolve(); await late;
  assert.equal(harness.stateWrites, writes, "Pending copy should not update an unmounted component");
});

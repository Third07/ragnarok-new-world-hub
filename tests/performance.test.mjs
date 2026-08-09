import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("homepage uses responsive modern images and defers non-critical icons", async () => {
  const page = await readFile("app/page.tsx", "utf8");

  assert.match(page, /rtnw-hero-800\.avif 800w/);
  assert.match(page, /type="image\/avif"/);
  assert.match(page, /loading="lazy"/);
  assert.match(page, /assets\/home-icons/);

  const heroAssets = [640, 800, 960, 1280, 1672].map(
    (width) => `public/assets/rtnw-hero-${width}.avif`,
  );
  const iconAssets = [...page.matchAll(/icon: "([^"]+\.webp)"/g)]
    .map((match) => match[1].split("/").pop().replace(/\.webp$/, ""))
    .flatMap((filename) => ["avif", "webp"].map(
      (extension) => `public/assets/home-icons/${filename}-96.${extension}`,
    ));

  for (const asset of [...heroAssets, "public/assets/rtnw-hero-800.webp", ...iconAssets]) {
    await access(asset);
  }
});

test("shared navigation avoids framework prefetch redirect loops", async () => {
  const [header, footer, config] = await Promise.all([
    readFile("app/SiteHeader.tsx", "utf8"),
    readFile("app/SiteFooter.tsx", "utf8"),
    readFile("next.config.ts", "utf8"),
  ]);

  assert.doesNotMatch(`${header}\n${footer}`, /from "next\/link"/);
  assert.match(header, /href="\/search\/"/);
  assert.match(header, /href="\/updates\/"/);
  assert.doesNotMatch(config, /source: "\/search"/);
  assert.doesNotMatch(config, /source: "\/updates"/);
});

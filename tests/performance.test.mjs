import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("homepage uses responsive modern images and defers non-critical icons", async () => {
  const [page, hero, icon, library, globals] = await Promise.all([
    readFile("app/page.tsx", "utf8"),
    readFile("app/ResponsiveHeroImage.tsx", "utf8"),
    readFile("app/HomeToolIcon.tsx", "utf8"),
    readFile("app/HomeToolLibrary.tsx", "utf8"),
    readFile("app/globals.css", "utf8"),
  ]);

  assert.match(hero, /rtnw-hero-800\.avif 800w/);
  assert.match(hero, /type="image\/avif"/);
  assert.match(icon, /loading="lazy"/);
  assert.match(icon, /assets\/home-icons/);
  assert.doesNotMatch(page, /"use client"/);
  assert.match(page, /<HomeToolLibrary tools=\{tools\}/);
  assert.match(library, /"use client"/);
  assert.match(globals, /--rtnw-hero-art: image-set/);
  assert.match(globals, /--rtnw-hero-art-mobile: image-set/);

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

test("modern content pages share the responsive hero component", async () => {
  const routes = [
    "app/search/page.tsx",
    "app/database/page.tsx",
    "app/updates/page.tsx",
    "app/guides/emulator-settings/page.tsx",
    "app/guides/top-up-safely/page.tsx",
    "app/guides/technical/page.tsx",
    "app/guides/cloud-gaming/page.tsx",
    "app/guides/play-on-pc/page.tsx",
    "app/tools/pc-setup-checker/page.tsx",
    "app/tools/top-up-calculator/page.tsx",
    "app/tools/farming-target-finder/page.tsx",
  ];

  for (const route of routes) {
    const source = await readFile(route, "utf8");
    assert.match(source, /<ResponsiveHeroImage className=\{styles\.heroImage\}/, route);
    assert.doesNotMatch(source, /<img className=\{styles\.heroImage\} src="\/assets\/rtnw-hero-1280\.webp"/, route);
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

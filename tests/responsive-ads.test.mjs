import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("ad system uses only the approved non-disruptive formats", async () => {
  const source = await read("public/shared/responsive_ads.js");

  for (const key of [
    "3a45272816c2d16fa93a679c03e183cf",
    "7b4253e26d5b14e096014f7bb1c2ac5b",
    "4ac48f926626c7e677d10446bfb6319a",
    "ba9a2456823c4edef223cb0c9106837c"
  ]) {
    assert.match(source, new RegExp(key));
  }

  for (const excludedKey of [
    "4b58d95a47f7bc1bd8d6a5f6ae55873f",
    "21b672094ccfbba7914238fab77741b6",
    "25abd16aaf6af6c6c19f0c80ad2fabf8",
    "eab97fc273edaa8390c0dfa888649419",
    "158dc0acc511d457696e1827cf9d79ed"
  ]) {
    assert.doesNotMatch(source, new RegExp(excludedKey));
  }

  assert.match(source, /width:\s*728,\s*height:\s*90/);
  assert.match(source, /width:\s*320,\s*height:\s*50/);
  assert.match(source, /width:\s*300,\s*height:\s*250/);
  assert.match(source, /IntersectionObserver/);
  assert.match(source, /rail\.dataset\.adPlacement = "desktop-rail"/);
  assert.doesNotMatch(source, /popunder|social[- ]bar|push notification/i);
});

test("homepage and legacy tools receive restrained placements", async () => {
  const [page, layout, ads, legacyBootstrap] = await Promise.all([
    read("app/page.tsx"),
    read("app/layout.tsx"),
    read("public/shared/responsive_ads.js"),
    read("public/shared/asset_version.js")
  ]);

  assert.equal((page.match(/data-ad-slot/g) || []).length, 2);
  assert.match(page, /data-ad-format="responsive"/);
  assert.match(page, /data-ad-format="rectangle"/);
  assert.doesNotMatch(page, /responsive_ads\.js/);
  assert.match(layout, /responsive_ads\.css/);
  assert.match(layout, /responsive_ads\.js\?v=20260808-ads5/);
  assert.match(legacyBootstrap, /loadResponsiveAds\(\)/);
  assert.match(ads, /banner\.dataset\.adPlacement = "tool-footer"/);
  assert.match(ads, /IntersectionObserver/);
  assert.match(ads, /guide-inline/);
  assert.match(ads, /guide-end/);
});

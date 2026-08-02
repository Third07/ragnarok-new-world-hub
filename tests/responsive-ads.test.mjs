import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = path => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("ad system uses only the approved non-disruptive formats", async () => {
  const source = await read("public/shared/responsive_ads.js");

  for (const key of [
    "91fde19eac5358fcbb0ccc7f92fcf7e8",
    "4281407f118f027b278a4d1dbbd94232",
    "0e2fb144411b70df25b2a26a11d69c2b"
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
  assert.match(page, /responsive_ads\.js/);
  assert.match(layout, /responsive_ads\.css/);
  assert.match(legacyBootstrap, /loadResponsiveAds\(\)/);
  assert.match(ads, /banner\.dataset\.adPlacement = "tool-footer"/);
  assert.match(ads, /IntersectionObserver/);
  assert.match(ads, /sandbox/);
});

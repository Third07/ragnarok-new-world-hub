import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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

test("AdSense ownership and authorized-seller records use the same publisher", async () => {
  const [layout, adsTxt, loader, worker] = await Promise.all([
    readFile("app/layout.tsx", "utf8"),
    readFile("public/ads.txt", "utf8"),
    readFile("public/shared/adsense.js", "utf8"),
    readFile("worker/index.ts", "utf8"),
  ]);

  assert.equal(
    adsTxt.trim(),
    "google.com, pub-9432875628134875, DIRECT, f08c47fec0942fa0",
  );
  assert.match(layout, /google-adsense-account/);
  assert.match(layout, /ca-pub-9432875628134875/);
  assert.match(layout, /\/shared\/adsense\.js\?v=20260809-adsense1/);
  assert.match(loader, /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/);
  assert.match(loader, /ca-pub-9432875628134875/);
  assert.match(worker, /url\.pathname === "\/ads\.txt"/);
});

test("removed networks and disruptive formats cannot load", async () => {
  const files = await Promise.all([
    readFile("app/layout.tsx", "utf8"),
    readFile("app/page.tsx", "utf8"),
    readFile("app/guides/SourceGuidePage.tsx", "utf8"),
    readFile("public/shared/adsense.js", "utf8"),
    readFile("public/shared/client_switcher.js", "utf8"),
    readFile("public/shared/asset_version.js", "utf8"),
  ]);
  const source = files.join("\n");

  assert.doesNotMatch(source, /flaskledgeheadquarters|5gvci|omg10|monetag/i);
  assert.doesNotMatch(source, /popunder|onclick ad|social bar/i);
  assert.doesNotMatch(source, /responsive_ads|data-ad-slot|rtnw-ad-slot/);
});

test("legacy SEA tools load the shared AdSense bootstrap", async () => {
  const clientSwitcher = await readFile("public/shared/client_switcher.js", "utf8");

  assert.match(clientSwitcher, /\/shared\/adsense\.js\?v=20260809-adsense1/);
  assert.match(clientSwitcher, /dataset\.rtnwAdsense/);

  for (const route of toolRoutes) {
    const html = await readFile(`public/sea/${route}/index.html`, "utf8");
    assert.match(
      html,
      /\/shared\/client_switcher\.js/,
      `${route} must load the shared client bootstrap`,
    );
  }
});

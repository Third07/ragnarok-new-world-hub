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

test("application layout loads the shared responsive ad system", async () => {
  const [layout, homepage, ads] = await Promise.all([
    readFile("app/layout.tsx", "utf8"),
    readFile("app/page.tsx", "utf8"),
    readFile("public/shared/responsive_ads.js", "utf8"),
  ]);

  assert.match(layout, /responsive_ads\.css/);
  assert.match(layout, /responsive_ads\.js\?v=20260804-ads3/);
  assert.match(layout, /data-rtnw-ads/);

  assert.ok(
    (homepage.match(/data-ad-slot/g) ?? []).length >= 2,
    "Homepage should retain at least two intentional ad slots",
  );

  assert.match(ads, /function addApplicationPlacements\(/);
  assert.match(ads, /data-ad-placement=\\"guide-inline\\"|guide-inline/);
  assert.match(ads, /guide-end/);
  assert.match(ads, /info-end/);
  assert.match(ads, /tool-footer/);
  assert.match(ads, /pathname === "\/seo-status\/"/);
});

test("legacy SEA tools use the common bootstrap that loads ads", async () => {
  const clientSwitcher = await readFile("public/shared/client_switcher.js", "utf8");

  assert.match(clientSwitcher, /responsive_ads\.css\?v=20260804-ads3/);
  assert.match(clientSwitcher, /responsive_ads\.js\?v=20260804-ads3/);
  assert.match(clientSwitcher, /data-rtnw-ads-style|rtnwAdsStyle/);
  assert.match(clientSwitcher, /data-rtnw-ads|rtnwAds/);

  for (const route of toolRoutes) {
    const html = await readFile(`public/sea/${route}/index.html`, "utf8");
    assert.match(
      html,
      /\/shared\/client_switcher\.js/,
      `${route} must load the shared client bootstrap`,
    );
  }
});

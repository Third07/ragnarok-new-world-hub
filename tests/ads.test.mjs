import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

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

const scriptPath = "public/shared/popunder.js";
const scriptVersion = "20260811-popunder1";

async function assertMissing(path) {
  await assert.rejects(
    access(path),
    (error) => error?.code === "ENOENT",
    `${path} should not exist`,
  );
}

function createHarness(source, { storageEnabled = true, popupBlocked = false } = {}) {
  let nowMs = new Date(2026, 7, 11, 9, 0, 0).getTime();
  let openAttempts = 0;
  const openedUrls = [];
  const listeners = new Map();
  const values = new Map();

  class FakeDate extends Date {
    constructor(...args) {
      super(...(args.length ? args : [nowMs]));
    }

    static now() {
      return nowMs;
    }
  }

  const location = new URL("https://rtnw.online/");
  const window = {
    location,
    localStorage: {
      getItem(key) {
        if (!storageEnabled) throw new Error("storage blocked");
        return values.get(key) ?? null;
      },
      setItem(key, value) {
        if (!storageEnabled) throw new Error("storage blocked");
        values.set(key, String(value));
      },
    },
    open(url) {
      openAttempts += 1;
      if (popupBlocked) return null;
      openedUrls.push(url);
      return { opener: window, blur() {} };
    },
    focus() {},
  };
  const document = {
    addEventListener(type, listener) {
      listeners.set(type, listener);
    },
  };

  vm.runInNewContext(source, {
    Date: FakeDate,
    JSON,
    Math,
    Number,
    Set,
    String,
    URL,
    document,
    window,
  });

  function link(href, { insideMain = true, target = "" } = {}) {
    const absoluteHref = new URL(href, location.href).href;
    return {
      href: absoluteHref,
      target,
      closest(selector) {
        if (selector === "a[href]") return this;
        if (selector === "main") return insideMain ? {} : null;
        return null;
      },
      getAttribute(name) {
        return name === "href" ? href : null;
      },
      hasAttribute() {
        return false;
      },
    };
  }

  function click(target) {
    listeners.get("click")?.({
      altKey: false,
      button: 0,
      ctrlKey: false,
      defaultPrevented: false,
      isTrusted: true,
      metaKey: false,
      shiftKey: false,
      target,
    });
  }

  return {
    advance(milliseconds) {
      nowMs += milliseconds;
    },
    click,
    link,
    get openAttempts() {
      return openAttempts;
    },
    openedUrls,
    values,
  };
}

test("tracked pop-under is capped, deferred, and absent from indexable content", async () => {
  const [layout, loader, worker, privacy] = await Promise.all([
    readFile("app/layout.tsx", "utf8"),
    readFile(scriptPath, "utf8"),
    readFile("worker/index.ts", "utf8"),
    readFile("app/(info)/privacy/page.tsx", "utf8"),
  ]);

  assert.match(layout, new RegExp(`/shared/popunder\\.js\\?v=${scriptVersion}`));
  assert.match(layout, /data-rtnw-popunder/);
  assert.doesNotMatch(layout, /cutt\.ly|flaskledgeheadquarters/i);
  assert.match(loader, /TRACKING_URL = "https:\/\/cutt\.ly\/eyashdLg"/);
  assert.match(loader, /MAX_DAILY_OPENS = 3/);
  assert.match(loader, /MIN_INTERVAL_MS = 10 \* 60 \* 1000/);
  assert.match(loader, /event\.isTrusted/);
  assert.match(loader, /link\.closest\("main"\)/);
  assert.match(loader, /destination\.origin !== window\.location\.origin/);
  assert.match(loader, /window\.localStorage/);
  assert.match(privacy, /three successful opens per browser per day/i);
  assert.doesNotMatch(worker, /url\.pathname === "\/ads\.txt"/);
  await assertMissing("public/ads.txt");
  await assertMissing("public/shared/adsense.js");
});

test("AdSense and retired direct destinations cannot load", async () => {
  const files = await Promise.all([
    readFile("app/layout.tsx", "utf8"),
    readFile("app/page.tsx", "utf8"),
    readFile("app/guides/SourceGuidePage.tsx", "utf8"),
    readFile(scriptPath, "utf8"),
    readFile("public/shared/client_switcher.js", "utf8"),
    readFile("public/shared/asset_version.js", "utf8"),
  ]);
  const source = files.join("\n");

  assert.doesNotMatch(source, /adsense|adsbygoogle|googlesyndication|ca-pub-|google-adsense-account/i);
  assert.doesNotMatch(source, /flaskledgeheadquarters|5gvci|omg10|monetag/i);
  assert.doesNotMatch(source, /responsive_ads|data-ad-slot|rtnw-ad-slot|social bar/i);
});

test("legacy SEA tools load the same guarded pop-under handler", async () => {
  const [clientSwitcher, assetVersion] = await Promise.all([
    readFile("public/shared/client_switcher.js", "utf8"),
    readFile("public/shared/asset_version.js", "utf8"),
  ]);

  for (const source of [clientSwitcher, assetVersion]) {
    assert.match(source, new RegExp(`/shared/popunder\\.js\\?v=${scriptVersion}`));
    assert.match(source, /dataset\.rtnwPopunder/);
  }

  for (const route of toolRoutes) {
    const html = await readFile(`public/sea/${route}/index.html`, "utf8");
    assert.match(
      html,
      /\/shared\/client_switcher\.js/,
      `${route} must load the shared client bootstrap`,
    );
  }
});

test("runtime opens at most three tracked windows per browser day", async () => {
  const source = await readFile(scriptPath, "utf8");
  const harness = createHarness(source);

  for (let attempt = 0; attempt < 4; attempt += 1) {
    harness.click(harness.link("/guides/"));
    harness.advance(10 * 60 * 1000 + 1);
  }

  assert.equal(harness.openAttempts, 3);
  assert.deepEqual(harness.openedUrls, Array(3).fill("https://cutt.ly/eyashdLg"));
  const record = JSON.parse(harness.values.get("rtnw_popunder_daily_v1"));
  assert.equal(record.count, 3);
});

test("runtime fails closed and ignores links that should not carry ads", async () => {
  const source = await readFile(scriptPath, "utf8");

  const blockedPopup = createHarness(source, { popupBlocked: true });
  blockedPopup.click(blockedPopup.link("/guides/"));
  assert.equal(blockedPopup.openAttempts, 1);
  assert.equal(JSON.parse(blockedPopup.values.get("rtnw_popunder_daily_v1")).count, 0);

  const blockedStorage = createHarness(source, { storageEnabled: false });
  blockedStorage.click(blockedStorage.link("/guides/"));
  assert.equal(blockedStorage.openAttempts, 0);

  const guarded = createHarness(source);
  guarded.click(guarded.link("https://example.com/"));
  guarded.click(guarded.link("/guides/", { insideMain: false }));
  guarded.click(guarded.link("#tools"));
  guarded.click(guarded.link("/guides/", { target: "_blank" }));
  assert.equal(guarded.openAttempts, 0);
});

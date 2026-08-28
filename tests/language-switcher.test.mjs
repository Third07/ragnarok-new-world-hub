import assert from "node:assert/strict";
import test from "node:test";
import { loadClientComponent, findNodes } from "./helpers/client-component.mjs";

class ElementStub {
  constructor(href = "") { this.href = href; }
  getAttribute() { return this.href; }
  setAttribute(_, value) { this.href = value; }
  closest() { return this.href.startsWith("/sea/") ? this : null; }
}

async function fixture({ search = "", stored = null, blocked = false } = {}) {
  const links = [new ElementStub("/sea/maps/?mode=world#map=101")];
  const listeners = new Map();
  const documentElement = { lang: "en" };
  const header = new ElementStub();
  const menu = new ElementStub();
  let scans = 0;
  let pathname = "/guides/high-wizard-builds/";
  const replaced = [];
  const historyState = { router: "keep this" };
  const location = new URL(`https://rtnw.online${pathname}${search}`);
  const harness = await loadClientComponent("app/LanguageSwitcher.tsx", {
    modules: {
      "next/navigation": { usePathname: () => pathname },
      "react-dom": { createPortal: (node) => node },
    },
    globals: {
      Element: ElementStub,
      CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
      MutationObserver: class { constructor() { assert.fail("Do not observe and rescan the whole page"); } },
      document: {
        documentElement,
        querySelectorAll() { scans++; return links; },
        querySelector(selector) { return selector === ".header-actions" ? header : selector === ".mobile-menu" ? menu : null; },
        addEventListener(name, callback, capture) { assert.equal(capture, true); listeners.set(name, callback); },
        removeEventListener(name, callback, capture) { assert.equal(capture, true); if (listeners.get(name) === callback) listeners.delete(name); },
      },
      window: {
        location,
        navigator: { language: "en-US" },
        localStorage: {
          getItem() { if (blocked) throw new Error("Storage blocked"); return stored; },
          setItem(_, next) { if (blocked) throw new Error("Storage blocked"); stored = next; },
        },
        history: { state: historyState, replaceState(...args) { replaced.push(args); } },
        dispatchEvent() {},
      },
    },
  });
  harness.render();
  await Promise.resolve();
  return {
    harness, links, listeners, replaced, documentElement, historyState,
    get scans() { return scans; },
    controls() { return findNodes(harness.render(), (node) => node.type === "select"); },
    async navigate(next) { pathname = next; harness.render(); await Promise.resolve(); },
  };
}

test("tool preference preserves link parameters and never relabels English guide content", async () => {
  const f = await fixture({ search: "?lang=th" });
  assert.equal(f.controls()[0].props.value, "th-TH");
  assert.equal(f.links[0].href, "/sea/maps/?mode=world&lang=th-TH#map=101");
  assert.equal(f.documentElement.lang, "en");
  f.controls()[0].props.onChange({ target: { value: "id-ID" } });
  assert.equal(f.replaced[0][0], f.historyState);
  assert.equal(f.replaced[0][2], "/guides/high-wizard-builds/?lang=id-ID");
  assert.equal(f.documentElement.lang, "en");
  f.harness.unmount();
  assert.equal(f.listeners.size, 0);
});

test("blocked storage does not break the selector or lose a preference across app routes", async () => {
  const f = await fixture({ blocked: true });
  f.controls()[0].props.onChange({ target: { value: "th-TH" } });
  assert.equal(f.controls()[0].props.value, "th-TH");
  assert.equal(f.replaced.length, 0, "A preference must not add a duplicate guide URL");
  await f.navigate("/guides/sniper-builds/");
  assert.equal(f.controls()[0].props.value, "th-TH");
  f.harness.unmount();
});

test("newly filtered tool links inherit language on activation without repeated page scans", async () => {
  const f = await fixture({ stored: "id-ID" });
  assert.equal(f.scans, 1);
  f.controls(); f.controls();
  assert.equal(f.scans, 1, "Ordinary component renders should not rescan links");
  const newLink = new ElementStub("/sea/cards/?q=poring#results");
  f.listeners.get("click")({ target: newLink });
  assert.equal(newLink.href, "/sea/cards/?q=poring&lang=id-ID#results");
  const middleClickLink = new ElementStub("/sea/skill_planner/");
  f.listeners.get("auxclick")({ target: middleClickLink });
  assert.equal(middleClickLink.href, "/sea/skill_planner/?lang=id-ID");
  const guideLink = new ElementStub("/guides/redeem-codes/");
  f.listeners.get("click")({ target: guideLink });
  assert.equal(guideLink.href, "/guides/redeem-codes/");
  assert.equal(f.scans, 1);
  f.harness.unmount();
});

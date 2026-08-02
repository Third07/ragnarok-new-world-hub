(() => {
  "use strict";

  if (window.__RTNW_ADS_READY__) return;
  window.__RTNW_ADS_READY__ = true;

  const AD_UNITS = {
    leaderboard: {
      key: "91fde19eac5358fcbb0ccc7f92fcf7e8",
      width: 728,
      height: 90
    },
    mobileBanner: {
      key: "4281407f118f027b278a4d1dbbd94232",
      width: 320,
      height: 50
    },
    rectangle: {
      key: "0e2fb144411b70df25b2a26a11d69c2b",
      width: 300,
      height: 250
    }
  };

  const AD_HOST = "https://flaskledgeheadquarters.com";
  const PREVIEW_HOSTS = new Set(["terminal.local", "localhost", "127.0.0.1"]);
  const previewMode = PREVIEW_HOSTS.has(window.location.hostname);

  function responsiveUnit() {
    return window.matchMedia("(min-width: 760px)").matches
      ? AD_UNITS.leaderboard
      : AD_UNITS.mobileBanner;
  }

  function adDocument(unit, name) {
    if (previewMode) {
      return `<!doctype html><html><head><meta charset="utf-8"><style>
        *{box-sizing:border-box}html,body{width:100%;height:100%;margin:0}
        body{display:grid;place-items:center;background:linear-gradient(135deg,#fffaf0,#f8f0df);color:#687c72;font:700 11px/1.4 system-ui,sans-serif;text-align:center;border:1px dashed rgba(22,78,69,.26)}
        span{padding:8px}strong{display:block;color:#164e45;font-size:12px}
      </style></head><body><span><strong>Advertisement preview</strong>${name} · ${unit.width}×${unit.height}</span></body></html>`;
    }

    const options = JSON.stringify({
      key: unit.key,
      format: "iframe",
      height: unit.height,
      width: unit.width,
      params: {}
    }).replace(/</g, "\\u003c");

    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{width:100%;height:100%;margin:0;overflow:hidden;background:transparent}body{display:grid;place-items:center}</style></head><body><script>window.atOptions=${options};<\/script><script src="${AD_HOST}/${unit.key}/invoke.js"><\/script></body></html>`;
  }

  function createFrame(slot, unit, name) {
    if (slot.querySelector("iframe")) return;

    const frame = document.createElement("iframe");
    frame.className = "rtnw-ad-frame";
    frame.title = "Advertisement";
    frame.width = String(unit.width);
    frame.height = String(unit.height);
    frame.loading = "lazy";
    frame.scrolling = "no";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.setAttribute("sandbox", "allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox");
    frame.setAttribute("aria-label", `Advertisement, ${unit.width} by ${unit.height}`);
    frame.addEventListener("load", () => {
      slot.dataset.adState = "loaded";
    }, { once: true });
    frame.srcdoc = adDocument(unit, name);
    slot.appendChild(frame);
  }

  function prepareSlot(slot) {
    if (!(slot instanceof HTMLElement)) return;
    if (slot.dataset.adPrepared === "true" && slot.querySelector(".rtnw-ad-label")) return;
    slot.dataset.adPrepared = "true";
    slot.dataset.adState = "waiting";
    slot.classList.add("rtnw-ad-slot");
    slot.setAttribute("role", "complementary");
    slot.setAttribute("aria-label", "Advertisement");

    const format = slot.dataset.adFormat === "rectangle" ? "rectangle" : "responsive";
    if (format === "rectangle") slot.classList.add("rtnw-ad-slot--rectangle");

    if (!slot.querySelector(".rtnw-ad-label")) {
      const label = document.createElement("span");
      label.className = "rtnw-ad-label";
      label.textContent = "Advertisement";
      slot.appendChild(label);
    }

    const load = () => {
      const unit = format === "rectangle" ? AD_UNITS.rectangle : responsiveUnit();
      createFrame(slot, unit, format === "rectangle" ? "Medium rectangle" : "Responsive banner");
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      load();
    }, { rootMargin: "500px 0px" });
    observer.observe(slot);
  }

  function newSlot(format, extraClass) {
    const slot = document.createElement("aside");
    slot.dataset.adSlot = "true";
    slot.dataset.adFormat = format;
    if (extraClass) slot.className = extraClass;
    return slot;
  }

  function addLegacyPlacements() {
    const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
    if (!pathname.startsWith("/sea")) return;

    if (pathname === "/sea") {
      const hero = document.querySelector(".hub-hero");
      const grid = document.querySelector(".hub-grid");
      if (hero && !document.querySelector('[data-ad-placement="hub-inline"]')) {
        const banner = newSlot("responsive");
        banner.dataset.adPlacement = "hub-inline";
        hero.insertAdjacentElement("afterend", banner);
      }
      if (grid && !document.querySelector('[data-ad-placement="hub-end"]')) {
        const rectangle = newSlot("rectangle");
        rectangle.dataset.adPlacement = "hub-end";
        grid.insertAdjacentElement("afterend", rectangle);
      }
      return;
    }

    if (document.querySelector('[data-ad-placement="tool-footer"]')) return;
    const app = document.querySelector(".app");
    const main = app?.querySelector(":scope > main.main-content");
    if (!app || !main) return;

    const banner = newSlot("responsive", "rtnw-ad-slot--tool-footer");
    banner.dataset.adPlacement = "tool-footer";
    main.insertAdjacentElement("afterend", banner);
  }

  function init() {
    addLegacyPlacements();
    document.querySelectorAll("[data-ad-slot]").forEach(prepareSlot);
  }

  let initQueued = false;
  function scheduleInit() {
    if (initQueued) return;
    initQueued = true;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        initQueued = false;
        init();
      });
    });
  }

  function observePlacements() {
    if (!document.body || document.body.dataset.rtnwAdsObserved === "true") return;
    document.body.dataset.rtnwAdsObserved = "true";
    new MutationObserver(mutations => {
      const adChanged = mutations.some(mutation => {
        if (mutation.target instanceof Element && mutation.target.closest("[data-ad-slot]")) return true;
        return Array.from(mutation.addedNodes).some(node =>
          node instanceof Element && (node.matches("[data-ad-slot]") || node.querySelector("[data-ad-slot]"))
        );
      });
      if (adChanged) scheduleInit();
    }).observe(document.body, { childList: true, subtree: true });
  }

  function bootstrap() {
    scheduleInit();
    observePlacements();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else {
    bootstrap();
  }
  window.addEventListener("load", scheduleInit, { once: true });
})();

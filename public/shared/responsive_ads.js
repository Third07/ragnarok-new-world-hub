(() => {
  "use strict";

  if (window.__RTNW_ADS_READY__) return;
  window.__RTNW_ADS_READY__ = true;

  const AD_UNITS = {
    leaderboard: {
      key: "91fde19eac5358fcbb0ccc7f92fcf7e8",
      width: 728,
      height: 90,
      frame: "/shared/ads/leaderboard.html?v=20260804-ads4"
    },
    mobileBanner: {
      key: "4281407f118f027b278a4d1dbbd94232",
      width: 320,
      height: 50,
      frame: "/shared/ads/mobile-banner.html?v=20260804-ads4"
    },
    rectangle: {
      key: "0e2fb144411b70df25b2a26a11d69c2b",
      width: 300,
      height: 250,
      frame: "/shared/ads/rectangle.html?v=20260804-ads4"
    }
  };

  const PREVIEW_HOSTS = new Set(["terminal.local", "localhost", "127.0.0.1"]);
  const previewMode = PREVIEW_HOSTS.has(window.location.hostname);

  function normalizedPathname() {
    const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
    return pathname === "/guides" ? "/guides/" : pathname;
  }

  function responsiveUnit() {
    return window.matchMedia("(min-width: 760px)").matches
      ? AD_UNITS.leaderboard
      : AD_UNITS.mobileBanner;
  }

  function previewDocument(unit, name) {
    return `<!doctype html><html><head><meta charset="utf-8"><style>
      *{box-sizing:border-box}html,body{width:100%;height:100%;margin:0}
      body{display:grid;place-items:center;background:linear-gradient(135deg,#fffaf0,#f8f0df);color:#687c72;font:700 11px/1.4 system-ui,sans-serif;text-align:center;border:1px dashed rgba(22,78,69,.26)}
      span{padding:8px}strong{display:block;color:#164e45;font-size:12px}
    </style></head><body><span><strong>Advertisement preview</strong>${name} · ${unit.width}×${unit.height}</span></body></html>`;
  }

  function createFrame(slot, unit, name) {
    if (slot.querySelector("iframe")) return;

    const frame = document.createElement("iframe");
    frame.className = "rtnw-ad-frame";
    frame.title = "Advertisement";
    frame.width = String(unit.width);
    frame.height = String(unit.height);
    frame.loading = "eager";
    frame.scrolling = "no";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox");
    frame.setAttribute("aria-label", `Advertisement, ${unit.width} by ${unit.height}`);
    frame.addEventListener("load", () => {
      slot.dataset.adState = "loaded";
    }, { once: true });
    if (previewMode) {
      frame.srcdoc = previewDocument(unit, name);
    } else {
      frame.src = unit.frame;
    }
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

  function findArticle(main) {
    return main.querySelector("article") || main.querySelector(":scope > section");
  }

  function addGuidePlacements(main) {
    const article = findArticle(main);

    if (!document.querySelector('[data-ad-placement="guide-inline"]')) {
      const banner = newSlot("responsive", "rtnw-ad-slot--content-break");
      banner.dataset.adPlacement = "guide-inline";

      if (article) {
        const headings = article.querySelectorAll(":scope > h2");
        const sectionBreak = headings[2] || headings[1] || null;
        if (sectionBreak) sectionBreak.insertAdjacentElement("beforebegin", banner);
        else {
          const lead = article.querySelector(":scope > p");
          if (lead) lead.insertAdjacentElement("afterend", banner);
          else article.prepend(banner);
        }
      } else {
        const firstSection = main.querySelector(":scope > section") || main.firstElementChild;
        if (firstSection) firstSection.insertAdjacentElement("afterend", banner);
        else main.prepend(banner);
      }
    }

    if (!document.querySelector('[data-ad-placement="guide-end"]')) {
      const rectangle = newSlot("rectangle", "rtnw-ad-slot--content-end");
      rectangle.dataset.adPlacement = "guide-end";

      if (article) {
        const parent = article.parentElement;
        const articleHasSidebar = Boolean(parent?.querySelector(":scope > aside"));
        if (parent && articleHasSidebar) parent.insertAdjacentElement("afterend", rectangle);
        else article.insertAdjacentElement("afterend", rectangle);
      } else {
        main.appendChild(rectangle);
      }
    }
  }

  function findToolShell(main) {
    return main.querySelector('[data-tool-shell="true"]') ||
      main.querySelector(":scope > div:not([data-ad-slot])") ||
      main.querySelector(":scope > section > div:not([data-ad-slot])") ||
      main.querySelector(":scope > article > div:not([data-ad-slot])");
  }

  function addToolPlacements(main) {
    const tool = findToolShell(main);
    const article = main.querySelector("article");

    if (tool && !document.querySelector('[data-ad-placement="tool-inline"]')) {
      const banner = newSlot("responsive", "rtnw-ad-slot--content-break");
      banner.dataset.adPlacement = "tool-inline";
      tool.insertAdjacentElement("afterend", banner);
    }

    if (!document.querySelector('[data-ad-placement="tool-end"]')) {
      const rectangle = newSlot("rectangle", "rtnw-ad-slot--content-end");
      rectangle.dataset.adPlacement = "tool-end";
      if (article) article.insertAdjacentElement("afterend", rectangle);
      else main.appendChild(rectangle);
    }
  }

  function addApplicationPlacements() {
    const pathname = normalizedPathname();
    if (pathname.startsWith("/sea") || pathname === "/seo-status/") return;

    const main = document.querySelector("main");
    if (!main) return;

    // The homepage already declares two intentional slots in its React markup.
    if (pathname === "/") return;

    if (pathname === "/guides/" || pathname.startsWith("/guides/")) {
      addGuidePlacements(main);
      return;
    }

    if (pathname.startsWith("/tools/")) {
      addToolPlacements(main);
      return;
    }

    if (["/about", "/contact", "/privacy", "/terms", "/disclaimer", "/updates", "/search"].includes(pathname)) {
      if (!document.querySelector('[data-ad-placement="info-end"]')) {
        const banner = newSlot("responsive", "rtnw-ad-slot--content-end");
        banner.dataset.adPlacement = "info-end";
        main.appendChild(banner);
      }
    }
  }

  function addLegacyPlacements() {
    const pathname = normalizedPathname();
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
    addApplicationPlacements();
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
      const relevantChange = mutations.some(mutation => {
        if (mutation.target instanceof Element && mutation.target.closest("[data-ad-slot]")) return true;
        return Array.from(mutation.addedNodes).some(node => {
          if (!(node instanceof Element)) return false;
          return node.matches("main, .app, .site-shell, [data-ad-slot]") ||
            Boolean(node.querySelector("main, .app, .site-shell, [data-ad-slot]"));
        });
      });
      if (relevantChange) scheduleInit();
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

(() => {
  "use strict";

  if (window.__RTNW_ADS_READY__) return;
  window.__RTNW_ADS_READY__ = true;

  const VERSION = "20260806-ads4";
  const AD_UNITS = {
    leaderboard: { key: "3a45272816c2d16fa93a679c03e183cf", width: 728, height: 90 },
    tabletBanner: { key: "7b4253e26d5b14e096014f7bb1c2ac5b", width: 468, height: 60 },
    mobileBanner: { key: "4ac48f926626c7e677d10446bfb6319a", width: 320, height: 50 },
    rectangle: { key: "ba9a2456823c4edef223cb0c9106837c", width: 300, height: 250 },
    skyscraper: { key: "958b269e20f0bcfc3708dc1b1069a4d6", width: 160, height: 600 },
    halfSkyscraper: { key: "24e9b91c2aece2552123ef7d013f6250", width: 160, height: 300 }
  };

  const PREVIEW_HOSTS = new Set(["terminal.local", "localhost", "127.0.0.1"]);
  const previewMode = PREVIEW_HOSTS.has(window.location.hostname);
  const compactMobile = () => window.matchMedia("(max-width: 519px)").matches;
  const directLoadQueue = [];
  let directLoadActive = false;

  function normalizedPathname() {
    const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
    return pathname === "/guides" ? "/guides/" : pathname;
  }

  function responsiveUnit() {
    if (window.matchMedia("(min-width: 900px)").matches) return AD_UNITS.leaderboard;
    if (window.matchMedia("(min-width: 520px)").matches) return AD_UNITS.tabletBanner;
    return AD_UNITS.mobileBanner;
  }

  function railUnit() {
    return window.matchMedia("(min-height: 760px)").matches
      ? AD_UNITS.skyscraper
      : AD_UNITS.halfSkyscraper;
  }

  function enqueueDirectLoad(task) {
    directLoadQueue.push(task);
    runDirectLoadQueue();
  }

  function runDirectLoadQueue() {
    if (directLoadActive || !directLoadQueue.length) return;
    directLoadActive = true;
    const task = directLoadQueue.shift();
    task(() => {
      directLoadActive = false;
      window.setTimeout(runDirectLoadQueue, 120);
    });
  }

  function showPreview(mount, unit, name) {
    const preview = document.createElement("div");
    preview.className = "rtnw-ad-preview";
    preview.innerHTML = `<strong>Advertisement preview</strong>${name} · ${unit.width}×${unit.height}`;
    mount.appendChild(preview);
  }

  function mountDirectAd(slot, unit, name) {
    if (slot.dataset.adInjected === "true") return;
    slot.dataset.adInjected = "true";
    slot.style.setProperty("--rtnw-ad-width", `${unit.width}px`);
    slot.style.setProperty("--rtnw-ad-height", `${unit.height}px`);

    const mount = document.createElement("div");
    mount.className = "rtnw-ad-mount";
    mount.dataset.adKey = unit.key;
    mount.setAttribute("aria-label", `Advertisement, ${unit.width} by ${unit.height}`);
    slot.appendChild(mount);

    if (previewMode) {
      showPreview(mount, unit, name);
      slot.dataset.adState = "loaded";
      return;
    }

    enqueueDirectLoad((done) => {
      if (!slot.isConnected || !mount.isConnected) {
        done();
        return;
      }

      /* Adsterra's generated code is executed directly in the publisher page.
         There is no RTNW-owned iframe and no sandbox attribute. The network may
         create its own iframe because the supplied format is "iframe". */
      window.atOptions = {
        key: unit.key,
        format: "iframe",
        height: unit.height,
        width: unit.width,
        params: {}
      };

      const invoke = document.createElement("script");
      invoke.src = `https://flaskledgeheadquarters.com/${unit.key}/invoke.js`;
      invoke.async = false;
      invoke.dataset.rtnwAdInvoke = unit.key;
      invoke.addEventListener("load", () => {
        slot.dataset.adState = "loaded";
        window.setTimeout(done, 250);
      }, { once: true });
      invoke.addEventListener("error", () => {
        slot.dataset.adState = "error";
        done();
      }, { once: true });
      mount.appendChild(invoke);

      window.setTimeout(() => {
        if (slot.dataset.adState === "waiting") slot.dataset.adState = "loaded";
        done();
      }, 5000);
    });
  }

  function prepareSlot(slot) {
    if (!(slot instanceof HTMLElement)) return;
    if (slot.dataset.adPrepared === "true") return;

    slot.dataset.adPrepared = "true";
    slot.dataset.adState = "waiting";
    slot.classList.add("rtnw-ad-slot");
    slot.setAttribute("role", "complementary");
    slot.setAttribute("aria-label", "Advertisement");

    const format = ["rectangle", "rail"].includes(slot.dataset.adFormat || "")
      ? slot.dataset.adFormat
      : "responsive";
    if (format === "rectangle") slot.classList.add("rtnw-ad-slot--rectangle");
    if (format === "rail") slot.classList.add("rtnw-ad-slot--rail");

    if (!slot.querySelector(".rtnw-ad-label")) {
      const label = document.createElement("span");
      label.className = "rtnw-ad-label";
      label.textContent = "Advertisement";
      slot.appendChild(label);
    }

    const load = () => {
      const unit = format === "rectangle"
        ? AD_UNITS.rectangle
        : format === "rail"
          ? railUnit()
          : responsiveUnit();
      const label = format === "rectangle"
        ? "Medium rectangle"
        : format === "rail"
          ? "Desktop side rail"
          : "Responsive banner";
      mountDirectAd(slot, unit, label);
    };

    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      load();
    }, { rootMargin: "420px 0px" });
    observer.observe(slot);
  }

  function newSlot(format, extraClass) {
    const slot = document.createElement("aside");
    slot.dataset.adSlot = "true";
    slot.dataset.adFormat = format;
    if (extraClass) slot.className = extraClass;
    return slot;
  }

  function insertGuideBanner(article, banner) {
    const directHeadings = Array.from(article.querySelectorAll(":scope > h2"));
    const laterHeading = directHeadings[3] || directHeadings[2] || null;
    if (laterHeading) {
      laterHeading.insertAdjacentElement("beforebegin", banner);
      return;
    }

    const blocks = Array.from(article.children).filter(node =>
      !node.matches("script, style, [data-ad-slot]")
    );
    if (blocks.length) {
      const targetIndex = Math.min(blocks.length - 1, Math.max(4, Math.floor(blocks.length * .42)));
      blocks[targetIndex].insertAdjacentElement("beforebegin", banner);
      return;
    }

    article.appendChild(banner);
  }

  function addGuidePlacements(main) {
    const article = main.querySelector("article");

    if (!document.querySelector('[data-ad-placement="guide-inline"]')) {
      const banner = newSlot("responsive", "rtnw-ad-slot--content-break");
      banner.dataset.adPlacement = "guide-inline";
      if (article) insertGuideBanner(article, banner);
      else {
        const sections = Array.from(main.querySelectorAll(":scope > section"));
        const anchor = sections[1] || sections[0] || main.firstElementChild;
        if (anchor) anchor.insertAdjacentElement("afterend", banner);
        else main.appendChild(banner);
      }
    }

    if (!compactMobile() && !document.querySelector('[data-ad-placement="guide-end"]')) {
      const rectangle = newSlot("rectangle", "rtnw-ad-slot--content-end");
      rectangle.dataset.adPlacement = "guide-end";
      if (article) {
        const parent = article.parentElement;
        const articleHasSidebar = Boolean(parent?.querySelector(":scope > aside"));
        if (parent && articleHasSidebar) parent.insertAdjacentElement("afterend", rectangle);
        else article.insertAdjacentElement("afterend", rectangle);
      } else main.appendChild(rectangle);
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

    if (!compactMobile() && !document.querySelector('[data-ad-placement="tool-end"]')) {
      const rectangle = newSlot("rectangle", "rtnw-ad-slot--content-end");
      rectangle.dataset.adPlacement = "tool-end";
      if (article) article.insertAdjacentElement("afterend", rectangle);
      else main.appendChild(rectangle);
    }
  }

  function addDesktopRail() {
    const pathname = normalizedPathname();
    if (!window.matchMedia("(min-width: 1480px) and (min-height: 560px)").matches) return;
    if (pathname === "/" || pathname === "/sea/maps" || pathname === "/sea/maps/") return;
    if (document.querySelector('[data-ad-placement="desktop-rail"]')) return;

    const rail = newSlot("rail", "rtnw-ad-slot--desktop-rail");
    rail.dataset.adPlacement = "desktop-rail";
    document.body.appendChild(rail);
  }

  function addApplicationPlacements() {
    const pathname = normalizedPathname();
    if (pathname.startsWith("/sea") || pathname === "/seo-status/") return;

    const main = document.querySelector("main");
    if (!main || pathname === "/") return;

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
      if (!compactMobile() && grid && !document.querySelector('[data-ad-placement="hub-end"]')) {
        const rectangle = newSlot("rectangle");
        rectangle.dataset.adPlacement = "hub-end";
        grid.insertAdjacentElement("afterend", rectangle);
      }
      return;
    }

    /* client_switcher.js creates this reserved slot synchronously before this
       script is loaded. The fallback below covers pages that do not use it. */
    if (document.querySelector('[data-ad-placement="tool-footer"]')) return;
    const app = document.querySelector(".app");
    const main = app?.querySelector(":scope > main.main-content");
    if (!app || !main) return;

    const banner = newSlot("responsive", "rtnw-ad-slot--tool-footer");
    banner.dataset.adPlacement = "tool-footer";
    main.insertAdjacentElement("afterend", banner);
  }

  function pruneAdjacentSlots() {
    document.querySelectorAll("[data-ad-slot] + [data-ad-slot]").forEach(slot => slot.remove());
  }

  function init() {
    addApplicationPlacements();
    addLegacyPlacements();
    addDesktopRail();
    pruneAdjacentSlots();
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
        if (mutation.target instanceof Element && mutation.target.closest("[data-ad-slot]")) return false;
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

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  else bootstrap();
  window.addEventListener("load", scheduleInit, { once: true });
  window.addEventListener("resize", scheduleInit);

  window.__RTNW_ADS_VERSION__ = VERSION;
})();

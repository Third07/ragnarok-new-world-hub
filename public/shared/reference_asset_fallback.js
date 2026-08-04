(() => {
  "use strict";
  const REFERENCE_ORIGIN = "https://www.roworlddb.com";
  const LOCAL_PREFIXES = ["/media/", "/sea/"];
  const MAP_CLEAN_VERSION = "20260803-mapclean1";

  function loadMapCleanup() {
    if (!/^\/sea\/maps(?:\/|$)/.test(window.location.pathname)) return;

    if (!document.querySelector('link[data-rtnw-map-clean]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = `/sea/shared/map_clean_mobile.css?v=${MAP_CLEAN_VERSION}`;
      stylesheet.dataset.rtnwMapClean = "true";
      document.head.appendChild(stylesheet);
    }

    if (!document.querySelector('script[data-rtnw-map-clean]')) {
      const script = document.createElement("script");
      script.src = `/sea/shared/map_clean_mobile.js?v=${MAP_CLEAN_VERSION}`;
      script.defer = true;
      script.dataset.rtnwMapClean = "true";
      document.body.appendChild(script);
    }
  }

  function applyEquipmentSearchQuery() {
    if (!/^\/sea\/equipment(?:\/|$)/.test(window.location.pathname)) return;
    const query = new URLSearchParams(window.location.search).get("q")?.trim();
    if (!query) return;

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const input = document.getElementById("equipment-filter-keyword");
      if (input instanceof HTMLInputElement) {
        if (input.value !== query) input.value = query;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }

      const count = document.getElementById("equipment-count");
      const finishedLoading = count && !/loading/i.test(String(count.textContent || ""));
      if (finishedLoading || attempts >= 40) window.clearInterval(timer);
    }, 250);
  }

  function localPath(value) {
    try {
      const url = new URL(value, window.location.href);
      if (url.origin !== window.location.origin) return null;
      return LOCAL_PREFIXES.some(prefix => url.pathname.startsWith(prefix))
        ? url.pathname + url.search
        : null;
    } catch (_) {
      return null;
    }
  }

  loadMapCleanup();
  applyEquipmentSearchQuery();

  document.addEventListener("error", event => {
    const el = event.target;
    if (!(el instanceof HTMLImageElement) || el.dataset.referenceFallback === "1") return;
    const path = localPath(el.currentSrc || el.src);
    if (!path) return;
    el.dataset.referenceFallback = "1";
    el.src = REFERENCE_ORIGIN + path;
  }, true);
})();

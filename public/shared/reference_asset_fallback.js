(() => {
  "use strict";
  const REFERENCE_ORIGIN = "https://www.roworlddb.com";
  const LOCAL_PREFIXES = ["/media/", "/sea/"];

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

  document.addEventListener("error", event => {
    const el = event.target;
    if (!(el instanceof HTMLImageElement) || el.dataset.referenceFallback === "1") return;
    const path = localPath(el.currentSrc || el.src);
    if (!path) return;
    el.dataset.referenceFallback = "1";
    el.src = REFERENCE_ORIGIN + path;
  }, true);
})();

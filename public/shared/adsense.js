(() => {
  "use strict";

  if (window.__RTNW_ADSENSE_READY__) return;
  window.__RTNW_ADSENSE_READY__ = true;

  const VERSION = "20260809-adsense2";
  const PUBLISHER_ID = "ca-pub-9432875628134875";
  const FALLBACK_DELAY_MS = 12000;
  const PREVIEW_HOSTS = new Set(["terminal.local", "localhost", "127.0.0.1"]);

  window.__RTNW_ADSENSE_VERSION__ = VERSION;

  if (PREVIEW_HOSTS.has(window.location.hostname)) return;
  if (document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;

  let loadTimer = 0;
  let loading = false;
  const activationEvents = ["pointerdown", "touchstart", "keydown", "scroll"];

  function cleanupActivationListeners() {
    activationEvents.forEach((eventName) => {
      window.removeEventListener(eventName, loadAdsense);
    });
    if (loadTimer) window.clearTimeout(loadTimer);
  }

  function loadAdsense() {
    if (loading) return;
    loading = true;
    cleanupActivationListeners();

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
    script.dataset.adClient = PUBLISHER_ID;
    (document.head || document.documentElement).appendChild(script);
  }

  activationEvents.forEach((eventName) => {
    window.addEventListener(eventName, loadAdsense, { once: true, passive: true });
  });
  loadTimer = window.setTimeout(loadAdsense, FALLBACK_DELAY_MS);
})();

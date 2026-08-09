(() => {
  "use strict";

  if (window.__RTNW_ADSENSE_READY__) return;
  window.__RTNW_ADSENSE_READY__ = true;

  const VERSION = "20260809-adsense1";
  const PUBLISHER_ID = "ca-pub-9432875628134875";
  const PREVIEW_HOSTS = new Set(["terminal.local", "localhost", "127.0.0.1"]);

  window.__RTNW_ADSENSE_VERSION__ = VERSION;

  if (PREVIEW_HOSTS.has(window.location.hostname)) return;
  if (document.querySelector('script[src^="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;

  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
  script.dataset.adClient = PUBLISHER_ID;
  (document.head || document.documentElement).appendChild(script);
})();

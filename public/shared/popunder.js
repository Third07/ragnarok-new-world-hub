(() => {
  "use strict";

  if (window.__RTNW_POPUNDER_READY__) return;
  window.__RTNW_POPUNDER_READY__ = true;

  const VERSION = "20260811-popunder1";
  const TRACKING_URL = "https://cutt.ly/eyashdLg";
  const STORAGE_KEY = "rtnw_popunder_daily_v1";
  const MAX_DAILY_OPENS = 3;
  const MIN_INTERVAL_MS = 10 * 60 * 1000;
  const PREVIEW_HOSTS = new Set(["terminal.local", "localhost", "127.0.0.1"]);

  window.__RTNW_POPUNDER_VERSION__ = VERSION;

  if (PREVIEW_HOSTS.has(window.location.hostname)) return;

  function localDayKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function readRecord(now) {
    try {
      const day = localDayKey(now);
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved || saved.day !== day) return { day, count: 0, lastOpenedAt: 0 };

      return {
        day,
        count: Math.min(MAX_DAILY_OPENS, Math.max(0, Number(saved.count) || 0)),
        lastOpenedAt: Math.max(0, Number(saved.lastOpenedAt) || 0),
      };
    } catch {
      return null;
    }
  }

  function writeRecord(record) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      return true;
    } catch {
      return false;
    }
  }

  function eligibleLink(event) {
    if (
      !event.isTrusted ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return null;

    const target = event.target;
    if (!target || typeof target.closest !== "function") return null;

    const link = target.closest("a[href]");
    if (!link || !link.closest("main") || link.closest("form, [data-no-popunder]")) return null;
    if (link.hasAttribute("download") || link.target === "_blank") return null;

    const rawHref = String(link.getAttribute("href") || "").trim();
    if (!rawHref || rawHref.startsWith("#") || /^(?:javascript|mailto|tel):/i.test(rawHref)) return null;

    try {
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return null;
      if (
        destination.pathname === window.location.pathname &&
        destination.search === window.location.search &&
        destination.hash
      ) return null;
    } catch {
      return null;
    }

    return link;
  }

  function openTrackedAd() {
    const popup = window.open(TRACKING_URL, "_blank");
    if (!popup) return false;

    try {
      popup.opener = null;
      popup.blur();
      window.focus();
    } catch {
      // The browser may restrict focus control after opening a new tab.
    }
    return true;
  }

  document.addEventListener("click", (event) => {
    if (!eligibleLink(event)) return;

    const now = new Date();
    const record = readRecord(now);
    if (!record || record.count >= MAX_DAILY_OPENS) return;
    if (record.lastOpenedAt && now.getTime() - record.lastOpenedAt < MIN_INTERVAL_MS) return;

    const nextRecord = {
      day: record.day,
      count: record.count + 1,
      lastOpenedAt: now.getTime(),
    };
    if (!writeRecord(nextRecord)) return;

    if (!openTrackedAd()) writeRecord(record);
  });
})();

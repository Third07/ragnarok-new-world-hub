/**
 * share_link.js — Share/copy build link to clipboard
 * Provides build-sharing functionality for planner tools.
 */
(function () {
  "use strict";

  function getShareUrl() {
    return window.location.href;
  }

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {}
    // Fallback for older browsers / non-HTTPS
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  }

  function showToast(message, duration) {
    duration = duration || 2000;
    let toast = document.getElementById("share-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "share-toast";
      toast.style.cssText =
        "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);" +
        "background:#333;color:#fff;padding:10px 24px;border-radius:8px;" +
        "font-size:14px;z-index:99999;opacity:0;transition:opacity .3s;" +
        "pointer-events:none;white-space:nowrap;";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = "1";
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.style.opacity = "0";
    }, duration);
  }

  const TOAST_TEXT = {
    "en-US": { ok: "Link copied!", fail: "Copy failed" },
    "zh-TW": { ok: "連結已複製！", fail: "複製失敗" },
    "zh-CN": { ok: "链接已复制！", fail: "复制失败" },
    "th-TH": { ok: "คัดลอกลิงก์แล้ว!", fail: "คัดลอกไม่สำเร็จ" },
    "id-ID": { ok: "Tautan disalin!", fail: "Gagal menyalin" },
  };

  document.addEventListener("click", async function (e) {
    const btn = e.target.closest("#share-link-btn, [data-share-link]");
    if (!btn) return;
    e.preventDefault();
    const url = getShareUrl();
    const locale =
      window.RO_ACTIVE_LOCALE ||
      localStorage.getItem("ro_lang") ||
      "en-US";
    const text = TOAST_TEXT[locale] || TOAST_TEXT["en-US"];
    const ok = await copyToClipboard(url);
    showToast(ok ? text.ok : text.fail);
  });
})();

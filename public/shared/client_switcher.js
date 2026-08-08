(() => {
    const t = {
        SEA: "SEA"
    }, e = [ "skill_planner", "rune_planner", "affix_planner", "apocalypse_planner", "shop", "equipment", "cards", "monster_album", "maps", "events", "study", "pet", "refine" ], n = window.location, r = /^\/sea(?:\/|$)/.test(n.pathname), a = "SEA";
    function s(t) {
        return "SEA" === t ? n.pathname.startsWith("/sea") ? n.pathname : `/sea${"/" === n.pathname ? "/" : n.pathname}` : n.pathname.replace(/^\/sea/, "") || "/";
    }
    function o(t) {
        if (!t) return null;
        let e;
        try {
            e = new URL(t, window.location.href).pathname;
        } catch {
            return null;
        }
        const n = e.match(/^\/(?:sea\/)?([^/]+)(?:\/|$)/);
        return n ? "monster-album" === n[1] ? "monster_album" : n[1].toLowerCase() : null;
    }
    function i() {
        !function() {
            const t = document.querySelector(".site-nav");
            if (!t) return;
            const a = new Set, s = Array.from(t.querySelectorAll(".site-nav-item[href]"));
            for (const t of s) {
                const e = t.getAttribute("href") || "";
                !r || !e.startsWith("/") || e.startsWith("/sea/") || e.startsWith("/media/") || e.startsWith("/shared/") || t.setAttribute("href", `/sea${e}`);
                const n = o(t.getAttribute("href"));
                n && (a.has(n) ? t.remove() : a.add(n));
            }
            const i = n.pathname.replace(/\/index\.html$/, "/"), c = Array.from(t.querySelectorAll(".site-nav-item[href]")).sort((t, n) => {
                const r = e.indexOf(o(t.getAttribute("href"))), a = e.indexOf(o(n.getAttribute("href")));
                return (r < 0 ? e.length : r) - (a < 0 ? e.length : a);
            });
            for (const t of c) {
                const e = new URL(t.getAttribute("href"), window.location.href).pathname.replace(/\/index\.html$/, "/"), n = "/" !== e && (e === i || i.startsWith(e));
                t.classList.toggle("active", n);
            }
            const l = Array.from(t.querySelectorAll(".site-nav-item[href]"));
            if (l.length !== c.length || !l.every((t, e) => t === c[e])) {
                const e = document.createDocumentFragment();
                for (const t of c) e.appendChild(t);
                t.appendChild(e);
            }
        }(), function() {
            if (document.getElementById("ro-client-switcher")) return;
            const e = document.querySelector(".header");
            if (!e) return;
            let r = e.querySelector(".header-controls");
            r || (r = document.createElement("div"), r.className = "header-controls", e.insertBefore(r, e.firstChild));
            const o = document.createElement("div");
            o.className = "quick-select-wrapper", o.id = "ro-client-switcher";
            const i = document.createElement("select");
            i.id = "ro-client-select", i.className = "form-select", i.setAttribute("aria-label", "Client");
            for (const [e, n] of Object.entries(t)) {
                const t = document.createElement("option");
                t.value = e, t.textContent = n, t.selected = e === a, i.appendChild(t);
            }
            i.addEventListener("change", () => {
                const e = t[i.value] ? i.value : "SEA";
                localStorage.setItem("ro_client", e), n.href = `${s(e)}${n.search}${n.hash}`;
            }), o.appendChild(i);
            const c = document.getElementById("ro-lang-switcher");
            c ? c.insertAdjacentElement("afterend", o) : r.appendChild(o);
        }();
    }
    (function() {
        if (!("/" === n.pathname || "/index.html" === n.pathname || "/sea/" === n.pathname || "/sea/index.html" === n.pathname)) return localStorage.setItem("ro_client", a), !1;
        const e = localStorage.getItem("ro_client"), r = e && t[e] || function() {
            const t = [ new URLSearchParams(n.search).get("lang"), localStorage.getItem("ro_lang"), navigator.language, ...Array.isArray(navigator.languages) ? navigator.languages : [] ].filter(Boolean);
            for (const e of t) {
                const t = String(e).trim().toLowerCase();
                if (t) {
                    if (t.startsWith("zh-tw") || t.startsWith("zh-hk") || t.startsWith("zh-mo") || t.startsWith("zh-hant")) return "HMT";
                    if (t.startsWith("zh-cn") || t.startsWith("zh-sg") || t.startsWith("zh-hans") || t.startsWith("en") || t.startsWith("th") || t.startsWith("id") || t.startsWith("in")) return "SEA";
                }
            }
            return "SEA";
        }();
        return r !== a ? (localStorage.setItem("ro_client", r), n.replace(`${s(r)}${n.search}${n.hash}`), !0) : (localStorage.setItem("ro_client", a), !1);
    })() || (window.RO_ACTIVE_CLIENT = a, document.body ? i() : document.addEventListener("DOMContentLoaded", i, {
        once: !0
    }));
})();

(() => {
    function addHubShortcut() {
        const nav = document.querySelector(".site-nav");
        if (!nav || nav.querySelector('[data-rtnw-hub-link]')) return;
        const link = document.createElement("a");
        link.className = "site-nav-item rtnw-hub-link";
        link.href = "/";
        link.title = "Game Hub";
        link.setAttribute("aria-label", "Return to Game Hub");
        link.setAttribute("data-rtnw-hub-link", "");
        link.innerHTML = '<span class="rtnw-hub-mark" aria-hidden="true">✦</span><span class="site-nav-label">Hub</span>';
        nav.insertBefore(link, nav.firstChild);
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addHubShortcut, { once: true });
    else addHubShortcut();
})();

(() => {
    const src = "/shared/tool_structured_data.js?v=20260803-schema1";
    function loadToolStructuredData() {
        if (document.querySelector("script[data-rtnw-tool-schema]")) return;
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.dataset.rtnwToolSchema = "true";
        (document.head || document.documentElement).appendChild(script);
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadToolStructuredData, { once: true });
    else loadToolStructuredData();
})();

(() => {
    const version = "20260808-ads5";
    const styleHref = `/shared/responsive_ads.css?v=${version}`;
    const scriptSrc = `/shared/responsive_ads.js?v=${version}`;
    const clsHref = "/sea/shared/cls-stability.css?v=20260806-cls1";

    function reservedBannerHeight() {
        if (window.matchMedia("(min-width: 900px)").matches) return 112;
        if (window.matchMedia("(min-width: 520px)").matches) return 82;
        return 70;
    }

    function ensureLegacyAdPlaceholder() {
        if (!/^\/sea(?:\/|$)/.test(window.location.pathname)) return;
        if (window.location.pathname === "/sea" || window.location.pathname === "/sea/") return;
        if (document.querySelector('[data-ad-placement="tool-footer"]')) return;

        const app = document.querySelector(".app");
        const main = app?.querySelector(":scope > main.main-content");
        if (!app || !main) return;

        const slot = document.createElement("aside");
        slot.dataset.adSlot = "true";
        slot.dataset.adFormat = "responsive";
        slot.dataset.adPlacement = "tool-footer";
        slot.className = "rtnw-ad-slot rtnw-ad-slot--tool-footer";
        slot.setAttribute("role", "complementary");
        slot.setAttribute("aria-label", "Advertisement");
        slot.style.width = "min(100%, 860px)";
        slot.style.minHeight = `${reservedBannerHeight()}px`;
        slot.style.margin = "56px auto 48px";
        main.insertAdjacentElement("afterend", slot);
    }

    function loadClsStability() {
        if (!/^\/sea(?:\/|$)/.test(window.location.pathname)) return;
        const existing = document.querySelector("link[data-rtnw-cls-stability]");
        if (existing instanceof HTMLLinkElement) {
            existing.href = clsHref;
            return;
        }
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = clsHref;
        style.dataset.rtnwClsStability = "true";
        (document.head || document.documentElement).appendChild(style);
    }

    function resetOldAds() {
        document.querySelectorAll("[data-ad-slot]").forEach(slot => {
            slot.querySelectorAll(".rtnw-ad-mount, .rtnw-ad-label, script[data-rtnw-ad-invoke]").forEach(node => node.remove());
            delete slot.dataset.adPrepared;
            delete slot.dataset.adInjected;
            delete slot.dataset.adState;
        });
        try { delete window.__RTNW_ADS_READY__; } catch { window.__RTNW_ADS_READY__ = false; }
    }

    function loadResponsiveAds() {
        /* This parser-blocking client script runs before the first normal paint on
           legacy pages. Reserve the footer-ad geometry before loading ad code. */
        ensureLegacyAdPlaceholder();
        loadClsStability();

        const style = document.querySelector("link[data-rtnw-ads-style], link[data-rtnw-ads]");
        if (style instanceof HTMLLinkElement) {
            style.href = styleHref;
            style.dataset.rtnwAdsStyle = "true";
        } else {
            const nextStyle = document.createElement("link");
            nextStyle.rel = "stylesheet";
            nextStyle.href = styleHref;
            nextStyle.dataset.rtnwAdsStyle = "true";
            (document.head || document.documentElement).appendChild(nextStyle);
        }

        const existingScript = document.querySelector("script[data-rtnw-ads]");
        if (existingScript instanceof HTMLScriptElement) {
            const current = existingScript.getAttribute("src") || "";
            if (current.includes(version)) return;
            existingScript.remove();
            resetOldAds();
        }

        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;
        script.dataset.rtnwAds = "true";
        (document.head || document.documentElement).appendChild(script);
    }

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", loadResponsiveAds, { once: true });
    else loadResponsiveAds();
})();

(() => {
    const styleHref = "/sea/shared/panel-site-theme.css?v=20260805-panel-site2";
    function loadPanelSiteTheme() {
        if (!/^\/sea(?:\/|$)/.test(window.location.pathname)) return;
        const existing = document.querySelector("link[data-rtnw-panel-site-theme]");
        if (existing instanceof HTMLLinkElement) {
            existing.href = styleHref;
            return;
        }
        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = styleHref;
        style.dataset.rtnwPanelSiteTheme = "true";
        (document.head || document.documentElement).appendChild(style);
    }
    loadPanelSiteTheme();
})();

(() => {
    const styleHref = "/sea/skill_planner/panel-theme.css?v=20260805-panel3";
    function loadSkillPlannerPanelTheme() {
        const pathname = window.location.pathname.replace(/\/index\.html$/, "/");
        if (pathname !== "/sea/skill_planner/" && pathname !== "/sea/skill_planner") return;

        const existing = document.querySelector("link[data-rtnw-skill-planner-theme]");
        if (existing instanceof HTMLLinkElement) {
            existing.href = styleHref;
            return;
        }

        const style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = styleHref;
        style.dataset.rtnwSkillPlannerTheme = "true";
        (document.head || document.documentElement).appendChild(style);
    }
    loadSkillPlannerPanelTheme();
})();

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
        if (!("/" === n.pathname || "/index.html" === n.pathname || "/sea/" === n.pathname || "/sea/index.html" === n.pathname)) return localStorage.setItem("ro_client", a), 
        !1;
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
        return r !== a ? (localStorage.setItem("ro_client", r), n.replace(`${s(r)}${n.search}${n.hash}`), 
        !0) : (localStorage.setItem("ro_client", a), !1);
    })() || (window.RO_ACTIVE_CLIENT = a, document.body ? i() : document.addEventListener("DOMContentLoaded", i, {
        once: !0
    }));
})();

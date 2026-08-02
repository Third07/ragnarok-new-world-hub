(() => {
    const ALL_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];
    const ACTIVE_CLIENT = /^\/sea(?:\/|$)/.test(window.location.pathname) ? "SEA" : "HMT";
    const CLIENT_LOCALES = {
        HMT: [ "zh-TW" ],
        SEA: [ "en-US", "zh-CN", "th-TH", "id-ID" ]
    };
    const SUPPORTED_LOCALES = [ "en-US" ];
    const DEFAULT_LOCALE = "en-US";
    const LOCALE_LABELS = {
        "zh-TW": "繁中",
        "en-US": "English",
        "zh-CN": "简中",
        "th-TH": "ไทย",
        "id-ID": "Bahasa Indonesia"
    };
    const PAGE_TITLES = {
        skill_planner: {
            "zh-TW": "技能模擬器",
            "en-US": "Skill Planner",
            "zh-CN": "技能规划器",
            "th-TH": "วางแผนสกิล",
            "id-ID": "Skill Planner"
        },
        rune_planner: {
            "zh-TW": "符文模擬器",
            "en-US": "Rune Planner",
            "zh-CN": "符文规划器",
            "th-TH": "วางแผนรูน",
            "id-ID": "Rune Planner"
        },
        affix_planner: {
            "zh-TW": "特技模擬器",
            "en-US": "Affix Planner",
            "zh-CN": "特技规划器",
            "th-TH": "วางแผนออฟฟิกซ์",
            "id-ID": "Affix Planner"
        },
        apocalypse_planner: {
            "zh-TW": "天啟規劃器",
            "en-US": "Apocalypse Planner",
            "zh-CN": "天启规划器",
            "th-TH": "วางแผน Apocalypse",
            "id-ID": "Apocalypse Planner"
        },
        shop: {
            "zh-TW": "商店",
            "en-US": "Shop",
            "zh-CN": "商店",
            "th-TH": "ร้านค้า",
            "id-ID": "Toko"
        },
        equipment: {
            "zh-TW": "裝備",
            "en-US": "Equipment",
            "zh-CN": "装备",
            "th-TH": "อุปกรณ์",
            "id-ID": "Equipment"
        },
        cards: {
            "zh-TW": "卡片",
            "en-US": "Cards",
            "zh-CN": "卡片",
            "th-TH": "การ์ด",
            "id-ID": "Kartu"
        },
        monster_album: {
            "zh-TW": "魔物圖鑑",
            "en-US": "Monster Album",
            "zh-CN": "魔物图鉴",
            "th-TH": "สารานุกรมมอนสเตอร์",
            "id-ID": "Monster Album"
        },
        maps: {
            "zh-TW": "地圖",
            "en-US": "Maps",
            "zh-CN": "地图",
            "th-TH": "แผนที่",
            "id-ID": "Maps"
        },
        events: {
            "zh-TW": "\u6d3b\u52d5",
            "en-US": "Events",
            "zh-CN": "\u6d3b\u52a8",
            "th-TH": "\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
            "id-ID": "Aktivitas"
        },
        study: {
            "zh-TW": "問答",
            "en-US": "Study",
            "zh-CN": "问答",
            "th-TH": "แบบฝึกหัด",
            "id-ID": "Study"
        },
        pet: {
            "zh-TW": "寵物",
            "en-US": "Pet",
            "zh-CN": "宠物",
            "th-TH": "สัตว์เลี้ยง",
            "id-ID": "Pet"
        },
        refine: {
            "zh-TW": "精煉",
            "en-US": "Refine",
            "zh-CN": "精炼",
            "th-TH": "ตีบวก",
            "id-ID": "Refine"
        }
    };
    const BRAND_TITLES = {
        "zh-TW": "RO\u4ed9\u5883\u50b3\u8aaa\uff1a\u4e16\u754c\u4e4b\u65c5",
        "zh-CN": "RO\u4ed9\u5883\u4f20\u8bf4\uff1a\u4e16\u754c\u4e4b\u65c5",
        "en-US": "RO World Journey",
        "th-TH": "RO World Journey",
        "id-ID": "RO World Journey"
    };
    const PAGE_KEY_BY_PATH = {
        "skill-simulator": "skill_planner",
        skill_planner: "skill_planner",
        "rune-simulator": "rune_planner",
        rune_planner: "rune_planner",
        "affix-simulator": "affix_planner",
        affix_planner: "affix_planner",
        "apocalypse-simulator": "apocalypse_planner",
        apocalypse_planner: "apocalypse_planner",
        shop: "shop",
        equipment: "equipment",
        cards: "cards",
        "card-simulator": "cards",
        "monster-album": "monster_album",
        monster_album: "monster_album",
        maps: "maps",
        events: "events",
        study: "study",
        pet: "pet",
        "refine-simulator": "refine",
        refine: "refine",
        "map-test": "maps"
    };

    function canonicalizeLocale(value) {
        const normalized = String(value || "").trim().toLowerCase();
        if (!normalized) return null;
        const exact = ALL_LOCALES.find(locale => locale.toLowerCase() === normalized);
        if (exact) return exact;
        if (normalized.startsWith("zh-tw") || normalized.startsWith("zh-hk") || normalized.startsWith("zh-mo") || normalized.startsWith("zh-hant")) return "zh-TW";
        if (normalized.startsWith("zh-cn") || normalized.startsWith("zh-sg") || normalized.startsWith("zh-hans")) return "zh-CN";
        if (normalized === "zh" || normalized.startsWith("zh-")) return "zh-TW";
        if (normalized.startsWith("en")) return "en-US";
        if (normalized.startsWith("th")) return "th-TH";
        if (normalized.startsWith("id") || normalized.startsWith("in")) return "id-ID";
        return null;
    }

    function normalizeLocale(value) {
        const canonical = canonicalizeLocale(value);
        if (!canonical) return null;
        return SUPPORTED_LOCALES.includes(canonical) ? canonical : DEFAULT_LOCALE;
    }

    function localizeHref(href, locale) {
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return null;
        let url;
        try {
            url = new URL(href, window.location.href);
        } catch {
            return null;
        }
        if (url.origin !== window.location.origin) return null;
        url.searchParams.set("lang", locale);
        return `${url.pathname}${url.search}${url.hash}`;
    }

    function getPathSection(href) {
        if (!href) return null;
        let pathname;
        try {
            pathname = new URL(href, window.location.href).pathname;
        } catch {
            return null;
        }
        const match = pathname.match(/^\/(?:sea\/)?([^/]+)(?:\/|$)/);
        if (!match) return null;
        return match[1] === "monster-album" ? "monster_album" : match[1];
    }

    function getTitleForPage(pageKey, locale) {
        if (!pageKey || !Object.prototype.hasOwnProperty.call(PAGE_TITLES, pageKey)) return "";
        const titles = PAGE_TITLES[pageKey];
        return titles[locale] || titles[DEFAULT_LOCALE] || titles["en-US"] || "";
    }

    function applyNavLabels(locale) {
        document.querySelectorAll(".site-nav-item[href]").forEach(node => {
            const pageKey = getPathSection(node.getAttribute("href"));
            const label = getTitleForPage(pageKey, locale);
            if (!label) return;
            const labelNode = node.querySelector(".site-nav-label");
            if (labelNode) labelNode.textContent = label;
            node.setAttribute("title", label);
            node.setAttribute("aria-label", label);
            const imageNode = node.querySelector("img");
            if (imageNode) imageNode.setAttribute("alt", label);
        });
    }

    function applyHeaderTitle(locale) {
        const pageKey = getPathSection(window.location.href);
        const title = getTitleForPage(pageKey, locale);
        if (!title) return;
        const titleNode = document.querySelector(".header-title");
        if (titleNode) titleNode.textContent = title;
    }

    function setPageTitle(title, locale) {
        const pageTitle = String(title || "").trim();
        if (!pageTitle) return "";
        const brandTitle = BRAND_TITLES[locale] || BRAND_TITLES[DEFAULT_LOCALE] || BRAND_TITLES["en-US"];
        const fullTitle = `${pageTitle} | ${brandTitle}`;
        document.title = fullTitle;
        return fullTitle;
    }

    function getCurrentPageTitle(locale) {
        const match = window.location.pathname.match(/^\/(?:sea\/)?([^/]+)(?:\/|$)/);
        if (!match) return "";
        const pageKey = PAGE_KEY_BY_PATH[match[1]];
        return getTitleForPage(pageKey, locale);
    }

    function syncCompactNav() {
        const nav = document.querySelector(".site-nav");
        if (!nav || !window.matchMedia) return;
        const compact = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;
        nav.classList.toggle("site-nav--compact", compact);
    }

    function getSelectLabel(select) {
        const explicit = select.getAttribute("aria-label");
        if (explicit) return explicit;
        const labelledBy = select.getAttribute("aria-labelledby");
        if (labelledBy) {
            const node = document.getElementById(labelledBy);
            if (node?.textContent?.trim()) return node.textContent.trim();
        }
        const label = select.closest("label");
        const labelText = label?.querySelector(":scope > span")?.textContent?.trim();
        return labelText || select.name || "Choose an option";
    }

    function enhanceSelect(select) {
        if (!(select instanceof HTMLSelectElement) || select.multiple || select.dataset.nativeSelect === "true" || select.classList.contains("job-select-native") || select.closest(".rtnw-select")) return;

        const shell = document.createElement("span");
        shell.className = "rtnw-select";
        select.parentNode.insertBefore(shell, select);
        shell.appendChild(select);
        select.classList.add("rtnw-select-native");

        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "rtnw-select-trigger";
        trigger.setAttribute("aria-haspopup", "listbox");
        trigger.setAttribute("aria-expanded", "false");
        trigger.innerHTML = '<span class="rtnw-select-value"></span><span class="rtnw-select-caret" aria-hidden="true"></span>';
        shell.appendChild(trigger);

        const sync = () => {
            const selected = select.options[select.selectedIndex];
            trigger.querySelector(".rtnw-select-value").textContent = selected?.textContent?.trim() || select.getAttribute("placeholder") || "Select";
            trigger.disabled = select.disabled;
            trigger.setAttribute("aria-label", `${getSelectLabel(select)}: ${selected?.textContent?.trim() || "Select"}`);
        };

        const closeMenu = () => {
            document.querySelector(".rtnw-select-layer")?.remove();
            document.body.classList.remove("rtnw-select-open");
            document.querySelectorAll(".rtnw-select-trigger[aria-expanded='true']").forEach(button => button.setAttribute("aria-expanded", "false"));
        };

        const openMenu = event => {
            event.preventDefault();
            event.stopPropagation();
            if (select.disabled) return;
            closeMenu();

            const layer = document.createElement("div");
            layer.className = "rtnw-select-layer";
            layer.innerHTML = '<button class="rtnw-select-backdrop" type="button" aria-label="Close options"></button><div class="rtnw-select-menu" role="dialog" aria-modal="true"><div class="rtnw-select-menu-head"><strong></strong><button class="rtnw-select-close" type="button" aria-label="Close options">\u00d7</button></div><div class="rtnw-select-options" role="listbox"></div></div>';
            layer.querySelector("strong").textContent = getSelectLabel(select);
            const optionsHost = layer.querySelector(".rtnw-select-options");

            Array.from(select.options).forEach((option, index) => {
                const item = document.createElement("button");
                item.type = "button";
                item.className = "rtnw-select-option";
                item.textContent = option.textContent.trim();
                item.disabled = option.disabled;
                item.setAttribute("role", "option");
                item.setAttribute("aria-selected", String(index === select.selectedIndex));
                if (index === select.selectedIndex) item.classList.add("selected");
                item.addEventListener("click", () => {
                    if (select.selectedIndex !== index) {
                        select.selectedIndex = index;
                        select.dispatchEvent(new Event("input", { bubbles: true }));
                        select.dispatchEvent(new Event("change", { bubbles: true }));
                    }
                    sync();
                    closeMenu();
                    trigger.focus({ preventScroll: true });
                });
                optionsHost.appendChild(item);
            });

            layer.querySelector(".rtnw-select-backdrop").addEventListener("click", closeMenu);
            layer.querySelector(".rtnw-select-close").addEventListener("click", closeMenu);
            document.body.appendChild(layer);
            document.body.classList.add("rtnw-select-open");
            trigger.setAttribute("aria-expanded", "true");
            requestAnimationFrame(() => {
                layer.classList.add("is-open");
                optionsHost.querySelector(".selected")?.scrollIntoView({ block: "nearest" });
            });
        };

        trigger.addEventListener("click", openMenu);
        select.addEventListener("change", sync);
        new MutationObserver(sync).observe(select, { childList: true, subtree: true, attributes: true });
        sync();
    }

    function enhanceSelects(root = document) {
        root.querySelectorAll?.("select").forEach(enhanceSelect);
    }

    window.RO_ASSET_VERSION = (() => {
        const meta = document.querySelector('meta[name="asset-version"]');
        return meta ? String(meta.getAttribute("content") || "") : "";
    })();

    window.withAssetVersion = path => {
        const version = window.RO_ASSET_VERSION;
        if (!path) return path;
        const [base, ...hashParts] = String(path).split("#");
        const hash = hashParts.length ? `#${hashParts.join("#")}` : "";
        if (!version) return `${base}${hash}`;
        const versionedBase = /[?&]v=/.test(base) ? base.replace(/([?&])v=[^&]*/g, `$1v=${encodeURIComponent(version)}`) : `${base}${base.includes("?") ? "&" : "?"}v=${encodeURIComponent(version)}`;
        return `${versionedBase}${hash}`;
    };

    window.RO_NORMALIZE_LOCALE = normalizeLocale;
    window.RO_SUPPORTED_LOCALES = SUPPORTED_LOCALES.slice();

    const rawQueryLocale = new URLSearchParams(window.location.search).get("lang");
    const normalizedQueryLocale = normalizeLocale(rawQueryLocale);
    const rawStoredLocale = localStorage.getItem("ro_lang");
    const normalizedStoredLocale = normalizeLocale(rawStoredLocale);

    const activeLocale = DEFAULT_LOCALE;

    if (rawQueryLocale && normalizedQueryLocale && rawQueryLocale !== normalizedQueryLocale) {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", normalizedQueryLocale);
        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }

    localStorage.setItem("ro_lang", normalizedStoredLocale || activeLocale);
    window.RO_ACTIVE_LOCALE = activeLocale;
    window.RO_SET_PAGE_TITLE = title => setPageTitle(title, activeLocale);

    function bootstrapPage() {
        applyHeaderTitle(activeLocale);
        applyNavLabels(activeLocale);
        const currentPageTitle = getCurrentPageTitle(activeLocale);
        if (currentPageTitle) setPageTitle(currentPageTitle, activeLocale);

        document.querySelectorAll("a[href]").forEach(node => {
            const localizedHref = localizeHref(node.getAttribute("href"), activeLocale);
            if (localizedHref && node.getAttribute("href") !== localizedHref) {
                node.setAttribute("href", localizedHref);
            }
        });

        document.addEventListener("click", event => {
            const anchor = event.target.closest && event.target.closest("a[href]");
            if (!anchor) return;
            const localizedHref = localizeHref(anchor.getAttribute("href"), activeLocale);
            if (localizedHref && anchor.getAttribute("href") !== localizedHref) {
                anchor.setAttribute("href", localizedHref);
            }
        }, true);

        if (!document.getElementById("ro-lang-switcher")) {
            const header = document.querySelector(".header");
            if (header) {
                let controls = header.querySelector(".header-controls");
                if (!controls) {
                    controls = document.createElement("div");
                    controls.className = "header-controls";
                    header.insertBefore(controls, header.firstChild);
                }

                const wrapper = document.createElement("div");
                wrapper.className = "quick-select-wrapper";
                wrapper.id = "ro-lang-switcher";

                const select = document.createElement("select");
                select.id = "ro-lang-select";
                select.className = "form-select";
                select.setAttribute("aria-label", "Language");

                for (const locale of SUPPORTED_LOCALES) {
                    const option = document.createElement("option");
                    option.value = locale;
                    option.textContent = LOCALE_LABELS[locale] || locale;
                    option.selected = locale === activeLocale;
                    select.appendChild(option);
                }

                select.addEventListener("change", () => {
                    const locale = normalizeLocale(select.value) || DEFAULT_LOCALE;
                    localStorage.setItem("ro_lang", locale);
                    const url = new URL(window.location.href);
                    url.searchParams.set("lang", locale);
                    window.location.href = `${url.pathname}${url.search}${url.hash}`;
                });

                wrapper.appendChild(select);
                controls.appendChild(wrapper);
            }
        }

        syncCompactNav();
        enhanceSelects();

        new MutationObserver(mutations => {
            mutations.forEach(mutation => mutation.addedNodes.forEach(node => {
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                if (node.matches?.("select")) enhanceSelect(node);
                enhanceSelects(node);
            }));
        }).observe(document.body, { childList: true, subtree: true });

        if (window.matchMedia && window.matchMedia("(max-width: 1000px)").matches) {
            const activeNavItem = document.querySelector(".site-nav-item.active");
            if (activeNavItem) {
                requestAnimationFrame(() => activeNavItem.scrollIntoView({
                    behavior: "auto",
                    inline: "center",
                    block: "nearest"
                }));
            }
        }
    }

    document.documentElement.setAttribute("lang", activeLocale);
    if (document.body) {
        bootstrapPage();
    } else {
        document.addEventListener("DOMContentLoaded", bootstrapPage, { once: true });
    }
    window.addEventListener("resize", syncCompactNav);
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.querySelector(".rtnw-select-layer")?.querySelector(".rtnw-select-close")?.click();
        }
    });
})();

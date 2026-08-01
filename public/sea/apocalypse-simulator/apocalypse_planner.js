const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function detectLocale() {
    const e = new URLSearchParams(window.location.search).get("lang"), t = localStorage.getItem("ro_lang"), a = document.documentElement.getAttribute("lang"), r = Array.isArray(navigator.languages) ? navigator.languages : [], n = [ e, t, a, (navigator.language || "").trim(), ...r ], o = e => SUPPORTED_LOCALES.some(t => t.toLowerCase() === String(e).toLowerCase());
    for (const e of n) {
        if (!e) continue;
        const t = SUPPORTED_LOCALES.find(t => t.toLowerCase() === String(e).toLowerCase());
        if (t) return t;
    }
    for (const e of n) {
        if (!e) continue;
        const t = String(e).split("-")[0].toLowerCase();
        if ("zh" === t) {
            if (o("zh-TW")) return "zh-TW";
            const e = SUPPORTED_LOCALES.find(e => e.toLowerCase().startsWith("zh-"));
            if (e) return e;
        }
        if ("en" === t && o("en-US")) return "en-US";
        if ("th" === t && o("th-TH")) return "th-TH";
        if (("id" === t || "in" === t) && o("id-ID")) return "id-ID";
    }
    return o("en-US") ? "en-US" : o("zh-TW") ? "zh-TW" : SUPPORTED_LOCALES[0] || "en-US";
}

const ACTIVE_LOCALE = detectLocale();

localStorage.setItem("ro_lang", ACTIVE_LOCALE), document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const CONFIG = {
    iconBasePath: "/media/images/",
    iconPathsUrl: "/sea/skill-simulator/data/icon_paths.json",
    dataUrl: `/sea/apocalypse-simulator/data/apocalypse_planner_${ACTIVE_LOCALE}.json`,
    jobIndexUrl: `/sea/skill-simulator/data/skills_index_${ACTIVE_LOCALE}.json`
}, withAssetVersion = window.withAssetVersion || (e => e), INTEGER_FORMATTER = new Intl.NumberFormat(ACTIVE_LOCALE), BASIC_JOB_IDS = new Set([ 201, 301, 401, 501, 601, 701, 801 ]), RETAINED_PART_SWITCH_CATEGORY_IDS = new Set([ 1, 2, 3, 4, 6 ]), UI_TEXT = {
    "en-US": {
        pageTitle: "RO World Tour | Apocalypse Planner",
        headerTitle: "Apocalypse Planner",
        searchPlaceholder: "Search trait / effect / category / job...",
        all: "All",
        loadingTraits: "Loading Apocalypse traits...",
        loadFailed: "Failed to load Apocalypse traits.",
        noResults: "No Apocalypse traits matched the current filters.",
        countText: e => `${INTEGER_FORMATTER.format(e)} traits`,
        uncategorized: "Other"
    },
    "zh-TW": {
        pageTitle: "RO仙境傳說：世界之旅 | 天啟規劃器",
        headerTitle: "天啟規劃器",
        searchPlaceholder: "搜尋特性 / 效果 / 類型 / 職業...",
        all: "全部",
        loadingTraits: "載入天啟特性中...",
        loadFailed: "載入天啟特性失敗。",
        noResults: "目前篩選條件沒有符合的天啟特性。",
        countText: e => `${INTEGER_FORMATTER.format(e)} 條特性`,
        uncategorized: "其他"
    },
    "zh-CN": {
        pageTitle: "RO仙境传说：世界之旅 | 天启规划器",
        headerTitle: "天启规划器",
        searchPlaceholder: "搜索特性 / 效果 / 类型 / 职业...",
        all: "全部",
        loadingTraits: "加载天启特性中...",
        loadFailed: "加载天启特性失败。",
        noResults: "当前筛选条件下没有符合的天启特性。",
        countText: e => `${INTEGER_FORMATTER.format(e)} 条特性`,
        uncategorized: "其他"
    },
    "th-TH": {
        pageTitle: "RO World Tour | Apocalypse Planner",
        headerTitle: "Apocalypse Planner",
        searchPlaceholder: "Search trait / effect / type / job...",
        all: "All",
        loadingTraits: "Loading Apocalypse traits...",
        loadFailed: "Failed to load Apocalypse traits.",
        noResults: "No Apocalypse traits matched the current filters.",
        countText: e => `${INTEGER_FORMATTER.format(e)} traits`,
        uncategorized: "Other"
    }
}, PART_DEFS = {
    weapon: {
        order: 1,
        iconName: "icon_equipslot_weapon",
        labels: {
            "en-US": "Weapon",
            "zh-TW": "武器",
            "zh-CN": "武器",
            "th-TH": "Weapon"
        }
    },
    offhand: {
        order: 2,
        iconName: "icon_equipslot_shield",
        labels: {
            "en-US": "Off-Hand",
            "zh-TW": "副手",
            "zh-CN": "副手",
            "th-TH": "Off-Hand"
        }
    },
    armor: {
        order: 0,
        iconName: "icon_equipslot_body",
        labels: {
            "en-US": "Armor",
            "zh-TW": "鎧甲",
            "zh-CN": "铠甲",
            "th-TH": "Armor"
        }
    },
    cloak: {
        order: 3,
        iconName: "icon_equipslot_cloak",
        labels: {
            "en-US": "Cloak",
            "zh-TW": "披風",
            "zh-CN": "披风",
            "th-TH": "Cloak"
        }
    },
    shoes: {
        order: 4,
        iconName: "icon_equipslot_shoes",
        labels: {
            "en-US": "Shoes",
            "zh-TW": "鞋子",
            "zh-CN": "鞋子",
            "th-TH": "Shoes"
        }
    },
    accessory: {
        order: 5,
        iconName: "icon_equipslot_accessory",
        labels: {
            "en-US": "Accessory",
            "zh-TW": "飾品",
            "zh-CN": "饰品",
            "th-TH": "Accessory"
        }
    }
}, CATEGORY_DEFS = {
    1: {
        order: 3,
        labels: {
            "en-US": "Attributes",
            "zh-TW": "屬性",
            "zh-CN": "属性",
            "th-TH": "Attributes"
        }
    },
    2: {
        order: 4,
        labels: {
            "en-US": "Element",
            "zh-TW": "元素",
            "zh-CN": "元素",
            "th-TH": "Element"
        }
    },
    3: {
        order: 5,
        labels: {
            "en-US": "Size",
            "zh-TW": "體型",
            "zh-CN": "体型",
            "th-TH": "Size"
        }
    },
    4: {
        order: 6,
        labels: {
            "en-US": "Race",
            "zh-TW": "種族",
            "zh-CN": "种族",
            "th-TH": "Race"
        }
    },
    5: {
        order: 1,
        labels: {
            "en-US": "Mechanism",
            "zh-TW": "機制",
            "zh-CN": "机制",
            "th-TH": "Mechanism"
        }
    },
    6: {
        order: 2,
        labels: {
            "en-US": "Seasonal Attributes",
            "zh-TW": "賽季屬性",
            "zh-CN": "赛季属性",
            "th-TH": "Seasonal Attributes"
        }
    },
    0: {
        order: 99,
        labels: {
            "en-US": "Other",
            "zh-TW": "其他",
            "zh-CN": "其他",
            "th-TH": "Other"
        }
    }
}, QUALITY_CLASS = {
    2: "quality-green",
    3: "quality-blue",
    4: "quality-purple",
    5: "quality-orange",
    6: "quality-red"
}, QUALITY_LABELS = {
    "en-US": {
        2: "Green",
        3: "Blue",
        4: "Purple",
        5: "Orange",
        6: "Red"
    },
    "zh-TW": {
        2: "綠",
        3: "藍",
        4: "紫",
        5: "橙",
        6: "紅"
    },
    "zh-CN": {
        2: "绿",
        3: "蓝",
        4: "紫",
        5: "橙",
        6: "红"
    },
    "th-TH": {
        2: "Green",
        3: "Blue",
        4: "Purple",
        5: "Orange",
        6: "Red"
    }
}, T = UI_TEXT[ACTIVE_LOCALE] || UI_TEXT["en-US"], QUALITY_TEXT = QUALITY_LABELS[ACTIVE_LOCALE] || QUALITY_LABELS["en-US"], DEFAULT_STATE = {
    partKey: "weapon",
    categoryId: 0,
    quality: 6,
    search: "",
    jobKey: ""
};

let iconPaths = {}, jobIndex = null, allEntries = [], allCategoryMeta = [], allKeywordMeta = [];

const state = {
    ...DEFAULT_STATE
};

function parseHashState() {
    const e = window.location.hash ? window.location.hash.slice(1) : "";
    if (!e) return null;
    const t = new URLSearchParams(e);
    return {
        partKey: t.get("part"),
        categoryId: t.get("cat"),
        quality: t.get("q"),
        search: t.get("s"),
        jobKey: t.get("j")
    };
}

function applyHashState(e) {
    if (Object.assign(state, DEFAULT_STATE), !e) return;
    const t = String(e.partKey || "");
    PART_DEFS[t] && (state.partKey = t);
    const a = Number(e.categoryId || 0);
    if (Number.isFinite(a) && a >= 0 && (state.categoryId = a), "all" === String(e.quality || "")) state.quality = "all"; else {
        const t = Number(e.quality || DEFAULT_STATE.quality);
        state.quality = [ 2, 3, 4, 5, 6 ].includes(t) ? t : DEFAULT_STATE.quality;
    }
    state.search = String(e.search || "");
    const r = String(e.jobKey || "").trim();
    state.jobKey = /^\d+(,\d+)*$/.test(r) ? r : "", state.jobKey && (state.categoryId = 5);
}

function updateUrlHash() {
    const e = new URLSearchParams;
    state.partKey && state.partKey !== DEFAULT_STATE.partKey && e.set("part", String(state.partKey)), 
    Number(state.categoryId) > 0 && e.set("cat", String(state.categoryId)), "all" === String(state.quality) ? e.set("q", "all") : Number(state.quality) !== DEFAULT_STATE.quality && e.set("q", String(state.quality)), 
    state.search && e.set("s", String(state.search)), state.jobKey && e.set("j", String(state.jobKey));
    const t = window.location.href.split("#")[0], a = e.toString();
    history.replaceState(null, "", a ? `${t}#${a}` : t);
}

function escapeHtml(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function sanitizePlainText(e) {
    return String(e || "").replace(/<\/?color[^>]*>/gi, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function formatRichText(e) {
    return e ? escapeHtml(String(e).replace(/\n/g, "<br>")).replace(/&lt;color=#([0-9a-fA-F]{6})&gt;/g, '<span style="color:#$1">').replace(/&lt;\/color&gt;/g, "</span>") : "";
}

function uniqueBy(e, t) {
    const a = [], r = new Set;
    return (e || []).forEach(e => {
        const n = t(e);
        r.has(n) || (r.add(n), a.push(e));
    }), a;
}

function getSortLocale() {
    return "zh-TW" === ACTIVE_LOCALE ? "zh-Hant" : ACTIVE_LOCALE;
}

function getJobGroupKey(e) {
    return (e || []).map(e => Number(e?.id || 0)).filter(e => e > 0).join(",");
}

function compareJobGroupKeys(e, t) {
    const a = String(e || "").split(",").map(e => Number(e || 0)).filter(e => e > 0), r = String(t || "").split(",").map(e => Number(e || 0)).filter(e => e > 0), n = Math.max(a.length, r.length);
    for (let e = 0; e < n; e += 1) {
        const t = Number(a[e] || 0) - Number(r[e] || 0);
        if (0 !== t) return t;
    }
    return 0;
}

async function loadJson(e) {
    let t = await fetch(withAssetVersion(e));
    if (!(t && t.ok || "zh-TW" === ACTIVE_LOCALE || "string" != typeof e)) {
        const a = e.replace(/_en-US\.json$/i, "_zh-TW.json").replace(/_zh-CN\.json$/i, "_zh-TW.json").replace(/_th-TH\.json$/i, "_zh-TW.json");
        a !== e && (t = await fetch(withAssetVersion(a)));
    }
    if (!t.ok) throw new Error(`Failed to load ${e}: ${t.status}`);
    return t.json();
}

async function loadIconPaths() {
    try {
        iconPaths = await loadJson(CONFIG.iconPathsUrl);
    } catch {
        iconPaths = {};
    }
}

async function loadJobIndex() {
    try {
        jobIndex = await loadJson(CONFIG.jobIndexUrl);
    } catch {
        jobIndex = null;
    }
}

function resolveIconPath(e) {
    if (!e) return "";
    const t = iconPaths[e] || iconPaths[String(e).toLowerCase()];
    return t ? `${CONFIG.iconBasePath}${String(t).replace(/\\/g, "/")}` : e.startsWith("icon_zhujiemian_") ? `${CONFIG.iconBasePath}zhujiemian/${e}.webp` : e.startsWith("icon_tianqi_") ? `${CONFIG.iconBasePath}tianqi/${e}.webp` : "";
}

function renderJobIcons(e) {
    if (!Array.isArray(e) || !e.length || !jobIndex?.jobs) return "";
    const t = e.map(e => {
        const t = jobIndex.jobs[String(e?.id)], a = resolveIconPath(t?.job_icon);
        if (!a) return "";
        const r = escapeHtml(String(e?.name || t?.job_name || ""));
        return `<img class="apocalypse-job-icon" src="${escapeHtml(a)}" alt="${r}" title="${r}" loading="lazy">`;
    }).filter(Boolean);
    return t.length ? `<div class="apocalypse-card-jobs" aria-label="${escapeHtml(T.jobBranchLabel || "Job branch")}">${t.join("")}</div>` : "";
}

function applyHeaderIcons() {
    document.querySelectorAll("img[data-icon-name]").forEach(e => {
        const t = resolveIconPath(e.dataset.iconName);
        t && (e.src = t);
    });
}

function applyStaticText() {
    window.RO_SET_PAGE_TITLE ? window.RO_SET_PAGE_TITLE(T.headerTitle) : document.title = T.pageTitle;
    const e = document.querySelector(".header-title");
    e && (e.textContent = T.headerTitle);
    const t = document.getElementById("apocalypse-search");
    t && (t.placeholder = T.searchPlaceholder);
    const a = document.querySelector("#apocalypse-grid .loading-state");
    a && (a.textContent = T.loadingTraits);
}

function getPartLabel(e) {
    const t = PART_DEFS[e];
    return t && (t.labels[ACTIVE_LOCALE] || t.labels["en-US"]) || e;
}

function getCategoryLabel(e, t = "") {
    const a = CATEGORY_DEFS[Number(e)] || CATEGORY_DEFS[0];
    return a?.labels?.[ACTIVE_LOCALE] || a?.labels?.["en-US"] || t || T.uncategorized;
}

function getKeywordLabel(e, t = "") {
    const a = allKeywordMeta.find(t => Number(t.id) === Number(e));
    return a?.name ? a.name : t || "";
}

function getQualityLabel(e) {
    return QUALITY_TEXT[e] || String(e || "");
}

function getQualityClass(e) {
    return QUALITY_CLASS[e] || "";
}

function isBasicJobId(e) {
    const t = Number(e);
    return !(!Number.isFinite(t) || t <= 0) && (!!BASIC_JOB_IDS.has(t) || 101 === Number(jobIndex?.jobs?.[String(t)]?.parent || 0));
}

function normalizeSeasonTag(e) {
    return sanitizePlainText(e || "").replace(/[：:]\s*$/, "");
}

function buildEntries(e) {
    const t = new Map;
    (Array.isArray(e?.entries) ? e.entries : []).forEach(e => {
        const a = uniqueBy((e?.part_keys || []).filter(Boolean), e => e);
        if (!a.length) return;
        const r = Number(e?.category?.id || 0), n = Number(e?.keyword?.id || 0), o = Number(e?.quality || 0), i = sanitizePlainText(e?.title || ""), c = String(e?.detail_text || ""), d = normalizeSeasonTag(e?.season_tag || ""), p = uniqueBy((e?.job_labels || []).map(e => ({
            id: Number(e?.id || 0),
            name: String(e?.name || "")
        })).filter(e => e.id > 0), e => e.id), u = p.filter(e => !isBasicJobId(e.id)), y = u.length ? u : p, g = getJobGroupKey(y), b = JSON.stringify([ i, c, o, r, n, d, a.join(","), g ]);
        t.has(b) || t.set(b, {
            id: b,
            title: i,
            detailText: c,
            quality: o,
            seasonTag: d,
            categoryId: r,
            categoryName: String(e?.category?.name || ""),
            keywordId: n,
            keywordName: String(e?.keyword?.name || ""),
            partKeys: a,
            displayJobLabels: y,
            jobGroupKey: g,
            sourceCores: []
        }), t.get(b).sourceCores.push(...e?.source_cores || []);
    });
    const a = getSortLocale();
    return Array.from(t.values()).map(e => (e.sourceCores = uniqueBy((e.sourceCores || []).map(e => ({
        itemId: Number(e?.item_id || 0),
        name: sanitizePlainText(e?.name || "")
    })), e => e.itemId || e.name).sort((e, t) => String(e.name).localeCompare(String(t.name), a)), 
    e.categoryLabel = getCategoryLabel(e.categoryId, e.categoryName), e.keywordLabel = getKeywordLabel(e.keywordId, e.keywordName), 
    e.searchText = [ e.title, sanitizePlainText(e.detailText), e.categoryLabel, e.keywordLabel, e.displayJobLabels.map(e => e.name).filter(Boolean).join(" "), e.seasonTag, e.partKeys.map(e => getPartLabel(e)).join(" ") ].join(" ").toLowerCase(), 
    e));
}

function getCategoryOrder(e) {
    return CATEGORY_DEFS[Number(e)]?.order ?? 999;
}

function sortEntries(e) {
    const t = getSortLocale(), a = Number(state.categoryId) > 0;
    return [ ...e ].sort((e, r) => {
        if (!a) {
            const t = getCategoryOrder(e.categoryId) - getCategoryOrder(r.categoryId);
            if (0 !== t) return t;
        }
        if (e.categoryId !== r.categoryId) return getCategoryOrder(e.categoryId) - getCategoryOrder(r.categoryId);
        if (5 === Number(state.categoryId) && 5 === e.categoryId && 5 === r.categoryId) {
            const t = compareJobGroupKeys(e.jobGroupKey, r.jobGroupKey);
            if (0 !== t) return t;
        }
        if (e.keywordId !== r.keywordId) return e.keywordId - r.keywordId;
        const n = String(e.title).localeCompare(String(r.title), t);
        return 0 !== n ? n : e.quality !== r.quality ? Number(r.quality) - Number(e.quality) : String(e.detailText).localeCompare(String(r.detailText), t);
    });
}

function filterEntries(e = {}) {
    const t = Boolean(e.ignoreCategory), a = Boolean(e.ignoreJob), r = String(state.search || "").trim().toLowerCase();
    return allEntries.filter(e => !(state.partKey && !(e.partKeys || []).includes(state.partKey) || !t && Number(state.categoryId) > 0 && Number(e.categoryId) !== Number(state.categoryId) || !a && "weapon" === state.partKey && state.jobKey && String(e.jobGroupKey || "") !== String(state.jobKey) || "all" !== String(state.quality) && Number(e.quality) !== Number(state.quality) || r && !e.searchText.includes(r)));
}

function getVisibleEntries(e = !1) {
    return sortEntries(filterEntries({
        ignoreCategory: e
    }));
}

function syncSelectedCategory() {
    const e = new Set(filterEntries({
        ignoreCategory: !0,
        ignoreJob: !0
    }).map(e => Number(e.categoryId || 0)));
    Number(state.categoryId) > 0 && !e.has(Number(state.categoryId)) && (state.categoryId = 0);
}

function getAvailableWeaponJobGroups() {
    return uniqueBy(filterEntries({
        ignoreJob: !0
    }).map(e => ({
        key: String(e.jobGroupKey || ""),
        jobs: Array.isArray(e.displayJobLabels) ? e.displayJobLabels : []
    })).filter(e => e.key && e.jobs.length), e => e.key).sort((e, t) => compareJobGroupKeys(e.key, t.key));
}

function syncSelectedJob() {
    "weapon" === state.partKey && state.jobKey && (new Set(getAvailableWeaponJobGroups().map(e => String(e.key))).has(String(state.jobKey)) || (state.jobKey = ""));
}

function renderPartNav() {
    const e = document.getElementById("apocalypse-part-nav");
    if (!e) return;
    const t = Object.entries(PART_DEFS).sort((e, t) => e[1].order - t[1].order).map(([e, t]) => {
        const a = state.partKey === e, r = getPartLabel(e), n = resolveIconPath(t.iconName);
        return `\n                <button type="button" class="apocalypse-part-btn${a ? " selected" : ""}" data-part-key="${escapeHtml(e)}" aria-label="${escapeHtml(r)}" title="${escapeHtml(r)}">\n                    ${n ? `<img class="apocalypse-part-icon" src="${escapeHtml(n)}" alt="" loading="lazy">` : ""}\n                    <span class="apocalypse-part-label">${escapeHtml(r)}</span>\n                </button>\n            `;
    });
    e.innerHTML = t.join("");
}

function renderCategoryChips() {
    const e = document.querySelector(".apocalypse-category-row"), t = document.getElementById("apocalypse-category-chips");
    if (!e || !t) return;
    const a = uniqueBy(filterEntries({
        ignoreCategory: !0,
        ignoreJob: !0
    }).map(e => ({
        id: Number(e.categoryId || 0),
        name: e.categoryLabel
    })).filter(e => e.id > 0), e => e.id).sort((e, t) => {
        const a = getCategoryOrder(e.id) - getCategoryOrder(t.id);
        return 0 !== a ? a : String(e.name).localeCompare(String(t.name), getSortLocale());
    });
    if (!a.length) return e.classList.remove("is-visible"), void (t.innerHTML = "");
    e.classList.add("is-visible");
    const r = [ `\n            <button type="button" class="apocalypse-category-chip${0 === Number(state.categoryId) ? " selected" : ""}" data-category-id="0">\n                <span>${escapeHtml(T.all)}</span>\n            </button>\n        `, ...a.map(e => `\n            <button type="button" class="apocalypse-category-chip${Number(state.categoryId) === Number(e.id) ? " selected" : ""}" data-category-id="${escapeHtml(String(e.id))}">\n                <span>${escapeHtml(e.name)}</span>\n            </button>\n        `) ];
    t.innerHTML = r.join("");
}

function renderJobChips() {
    const e = document.querySelector(".apocalypse-job-row"), t = document.getElementById("apocalypse-job-chips");
    if (!e || !t) return;
    if ("weapon" !== state.partKey) return e.classList.remove("is-visible"), void (t.innerHTML = "");
    const a = getAvailableWeaponJobGroups();
    if (!a.length) return e.classList.remove("is-visible"), void (t.innerHTML = "");
    e.classList.add("is-visible");
    const r = `\n        <button type="button" class="apocalypse-job-chip apocalypse-job-chip-all${state.jobKey ? "" : " selected"}" data-job-key="">\n            <span>${escapeHtml(T.all)}</span>\n        </button>\n    `, n = a.map(e => {
        const t = String(state.jobKey || "") === String(e.key), a = e.jobs.map(e => String(e?.name || "")).filter(Boolean).join(" / "), r = e.jobs.map(e => {
            const t = jobIndex?.jobs?.[String(e.id)] || null, a = resolveIconPath(t?.job_icon || "");
            return a ? `<img class="apocalypse-job-chip-icon" src="${escapeHtml(a)}" alt="" loading="lazy">` : "";
        }).filter(Boolean).join("");
        return `\n            <button type="button" class="apocalypse-job-chip apocalypse-job-chip-group${t ? " selected" : ""}" data-job-key="${escapeHtml(String(e.key))}" aria-label="${escapeHtml(a)}" title="${escapeHtml(a)}">\n                ${r ? `<span class="apocalypse-job-chip-icons">${r}</span>` : `<span>${escapeHtml(a)}</span>`}\n            </button>\n        `;
    }).join("");
    t.innerHTML = `${r}${n}`;
}

function renderQualityToggle() {
    const e = document.getElementById("apocalypse-quality-toggle");
    e && (e.innerHTML = [ "all", 6, 5, 4, 3, 2 ].map(e => {
        const t = "all" === e, a = t ? T.all : getQualityLabel(Number(e)), r = t ? "" : ` ${getQualityClass(Number(e))}`, n = String(state.quality) === String(e);
        return `\n            <button type="button" class="apocalypse-quality-btn${r}${n ? " active" : ""}" data-quality="${escapeHtml(String(e))}" aria-pressed="${n ? "true" : "false"}">\n                ${escapeHtml(a)}\n            </button>\n        `;
    }).join(""));
}

function renderGrid() {
    const e = document.getElementById("apocalypse-grid"), t = document.getElementById("apocalypse-count");
    if (!e) return;
    const a = getVisibleEntries();
    t && (t.textContent = T.countText(a.length)), a.length ? e.innerHTML = a.map(e => {
        const t = getQualityClass(e.quality), a = [];
        return a.push(`<span class="apocalypse-card-badge">${escapeHtml(e.categoryLabel)}</span>`), 
        e.keywordId > 0 && 5 !== e.categoryId && a.push(`<span class="apocalypse-card-badge">${escapeHtml(e.keywordLabel)}</span>`), 
        e.seasonTag && a.push(`<span class="apocalypse-card-badge">${escapeHtml(e.seasonTag)}</span>`), 
        `\n            <article class="apocalypse-card">\n                <div class="apocalypse-card-top">\n                    <div class="apocalypse-card-title-wrap">\n                        <div class="apocalypse-card-title">${escapeHtml(e.title)}</div>\n                        ${5 === e.categoryId ? renderJobIcons(e.displayJobLabels) : ""}\n                    </div>\n                    <span class="apocalypse-quality-badge ${escapeHtml(t)}">${escapeHtml(getQualityLabel(e.quality))}</span>\n                </div>\n                <div class="apocalypse-card-badges">${a.join("")}</div>\n                <div class="apocalypse-card-effect">${formatRichText(e.detailText)}</div>\n            </article>\n        `;
    }).join("") : e.innerHTML = `<div class="loading-state">${escapeHtml(T.noResults)}</div>`;
}

function renderAll() {
    syncSelectedCategory(), syncSelectedJob(), renderPartNav(), renderCategoryChips(), 
    renderJobChips(), renderQualityToggle();
    const e = document.getElementById("apocalypse-search");
    e && e.value !== String(state.search || "") && (e.value = String(state.search || "")), 
    renderGrid(), updateUrlHash();
}

function bindEvents() {
    const e = document.getElementById("apocalypse-search");
    e && e.addEventListener("input", e => {
        state.search = e.target.value || "", renderAll();
    });
    const t = document.getElementById("apocalypse-quality-toggle");
    t && t.addEventListener("click", e => {
        const t = e.target.closest(".apocalypse-quality-btn");
        if (!t) return;
        const a = t.dataset.quality || "all";
        state.quality = "all" === a ? "all" : Number(a), renderAll();
    });
    const a = document.getElementById("apocalypse-job-chips");
    a && a.addEventListener("click", e => {
        const t = e.target.closest(".apocalypse-job-chip");
        t && (state.jobKey = String(t.dataset.jobKey || ""), state.jobKey && (state.categoryId = 5), 
        renderAll());
    });
    const r = document.getElementById("apocalypse-category-chips");
    r && r.addEventListener("click", e => {
        const t = e.target.closest(".apocalypse-category-chip");
        t && (state.categoryId = Number(t.dataset.categoryId || 0), renderAll());
    });
    const n = document.getElementById("apocalypse-part-nav");
    n && n.addEventListener("click", e => {
        const t = e.target.closest(".apocalypse-part-btn");
        if (!t) return;
        const a = String(t.dataset.partKey || "weapon");
        a && a !== state.partKey && (state.partKey = a, RETAINED_PART_SWITCH_CATEGORY_IDS.has(Number(state.categoryId)) || (state.categoryId = 0), 
        renderAll());
    }), window.addEventListener("hashchange", () => {
        applyHashState(parseHashState()), renderAll();
    });
}

async function init() {
    applyStaticText(), applyHashState(parseHashState());
    try {
        const [, e] = await Promise.all([ Promise.all([ loadIconPaths(), loadJobIndex() ]), loadJson(CONFIG.dataUrl) ]);
        allCategoryMeta = Array.isArray(e?.meta?.categories) ? e.meta.categories : [], allKeywordMeta = Array.isArray(e?.meta?.keywords) ? e.meta.keywords : [], 
        allEntries = buildEntries(e), applyHeaderIcons(), bindEvents(), renderAll();
    } catch (e) {
        console.error(e);
        const t = document.getElementById("apocalypse-grid");
        t && (t.innerHTML = `<div class="loading-state">${escapeHtml(T.loadFailed)}</div>`);
    }
}

document.addEventListener("DOMContentLoaded", init);

const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function detectLocale() {
    const e = new URLSearchParams(window.location.search).get("lang"), t = localStorage.getItem("ro_lang"), r = document.documentElement.getAttribute("lang"), n = Array.isArray(navigator.languages) ? navigator.languages : [], o = [ e, t, r, (navigator.language || "").trim(), ...n ], a = e => SUPPORTED_LOCALES.some(t => t.toLowerCase() === String(e).toLowerCase());
    for (const e of o) {
        if (!e) continue;
        const t = SUPPORTED_LOCALES.find(t => t.toLowerCase() === String(e).toLowerCase());
        if (t) return t;
    }
    for (const e of o) {
        if (!e) continue;
        const t = String(e).split("-")[0].toLowerCase();
        if ("zh" === t) {
            if (a("zh-TW")) return "zh-TW";
            const e = SUPPORTED_LOCALES.find(e => e.toLowerCase().startsWith("zh-"));
            if (e) return e;
        }
        if ("en" === t && a("en-US")) return "en-US";
        if (("id" === t || "in" === t) && a("id-ID")) return "id-ID";
    }
    return a("en-US") ? "en-US" : a("zh-TW") ? "zh-TW" : SUPPORTED_LOCALES[0] || "en-US";
}

const ACTIVE_LOCALE = detectLocale();

localStorage.setItem("ro_lang", ACTIVE_LOCALE), document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const CONFIG = {
    iconBasePath: "/media/images/",
    iconPathsUrl: "/sea/skill-simulator/data/icon_paths.json",
    stuntDataUrl: `/sea/affix-simulator/data/stunt_skill_library_${ACTIVE_LOCALE}.json`,
    stuntIndexUrl: `/sea/affix-simulator/data/stunt_package_index_${ACTIVE_LOCALE}.json`,
    jobIndexUrl: `/sea/skill-simulator/data/skills_index_${ACTIVE_LOCALE}.json`
}, withAssetVersion = window.withAssetVersion || (e => e), QUALITY_LABEL = {
    1: "Lv.1",
    2: "Lv.2",
    3: "Lv.3"
}, UI_TEXT = {
    "en-US": {
        title: "RO World Tour | Affix Planner",
        reset: "Reset",
        shareBuild: "Share build",
        searchPlaceholder: "Search name/effect...",
        rarity: {
            6: "Red",
            5: "Gold",
            4: "Purple",
            3: "Blue",
            2: "Green"
        },
        all: "All",
        selectedSkills: "Selected Skills",
        selectBuild: "Select skills to build a set.",
        empty: "Empty",
        rows: {
            weapon: "Weapon",
            armor: "Armor",
            cloak: "Cloak",
            accessory: "Accessory"
        },
        noTypes: "No types found.",
        noDataYet: "No data yet.",
        noResults: "No results.",
        failedLoad: "Failed to load affixes.",
        skills: "skills"
    },
    "zh-TW": {
        title: "RO仙境傳說：世界之旅 | Affix Planner",
        reset: "重置",
        shareBuild: "分享配置",
        searchPlaceholder: "搜尋名稱/效果...",
        rarity: {
            5: "金",
            4: "紫",
            3: "藍",
            2: "綠"
        },
        all: "全部",
        selectedSkills: "已選擇技能",
        selectBuild: "選擇技能以建立配置。",
        empty: "空位",
        rows: {
            weapon: "武器",
            armor: "鎧甲",
            cloak: "披風",
            accessory: "飾品"
        },
        noTypes: "沒有可用類型。",
        noDataYet: "暫無資料。",
        noResults: "沒有結果。",
        failedLoad: "載入特技失敗。",
        skills: "個技能"
    },
    "zh-CN": {
        title: "RO仙境传说：世界之旅 | Affix Planner",
        reset: "重置",
        shareBuild: "分享配置",
        searchPlaceholder: "搜索名称/效果...",
        rarity: {
            5: "金",
            4: "紫",
            3: "蓝",
            2: "绿"
        },
        all: "全部",
        selectedSkills: "已选择技能",
        selectBuild: "选择技能以建立配置。",
        empty: "空位",
        rows: {
            weapon: "武器",
            armor: "铠甲",
            cloak: "披风",
            accessory: "饰品"
        },
        noTypes: "没有可用类型。",
        noDataYet: "暂无数据。",
        noResults: "没有结果。",
        failedLoad: "加载特技失败。",
        skills: "个技能"
    },
    "th-TH": {
        title: "RO World Tour | Affix Planner",
        reset: "รีเซ็ต",
        shareBuild: "แชร์บิลด์",
        searchPlaceholder: "ค้นหาชื่อ/เอฟเฟกต์...",
        rarity: {
            5: "ทอง",
            4: "ม่วง",
            3: "น้ำเงิน",
            2: "เขียว"
        },
        all: "ทั้งหมด",
        selectedSkills: "สกิลที่เลือก",
        selectBuild: "เลือกสกิลเพื่อสร้างชุด",
        empty: "ว่าง",
        rows: {
            weapon: "อาวุธ",
            armor: "เกราะ",
            cloak: "ผ้าคลุม",
            accessory: "เครื่องประดับ"
        },
        noTypes: "ไม่พบประเภท",
        noDataYet: "ยังไม่มีข้อมูล",
        noResults: "ไม่พบผลลัพธ์",
        failedLoad: "โหลดอาฟฟิกซ์ล้มเหลว",
        skills: "สกิล"
    }
};

for (const e of Object.keys(UI_TEXT)) UI_TEXT[e]?.rarity?.[6] || (UI_TEXT[e].rarity[6] = "zh-TW" === e ? "紅" : "zh-CN" === e ? "红" : "th-TH" === e ? "แดง" : "Red");

const T = UI_TEXT[ACTIVE_LOCALE] || UI_TEXT["en-US"], STUNT_COLOR_CLASS = {
    2: "stunt-green",
    3: "stunt-blue",
    4: "stunt-purple",
    5: "stunt-gold",
    6: "stunt-red"
};

let iconPaths = null, stuntData = null, stuntIndex = null, jobIndex = null, visibleStuntsById = new Map, stuntById = new Map, currentJobFilterMode = "base", currentJobFilterIds = [];

const selected = {
    weapon: null,
    armor: null,
    cloak: null,
    accessory: []
}, current = {
    mode: "weapon",
    typeId: null,
    level: "all",
    rarity: "all",
    stuntLevel: 3,
    search: "",
    jobGroup: "",
    jobBranch: "",
    job: null
};

function escapeHtml(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

function formatRichText(e) {
    return e ? escapeHtml(String(e).replace(/\[\/?[a-z][^\]]*\]/gi, "").replace(/<\/?url[^>]*>/gi, "")).replace(/\n/g, "<br>").replace(/&lt;color=#([0-9a-fA-F]{6})&gt;/g, '<span style="color: #$1">').replace(/&lt;\/color&gt;/g, "</span>") : "";
}

function resolveStuntDisplay(e) {
    return {
        name: sanitizePlainText(e?.name || ""),
        desc: e?.desc || ""
    };
}

function sanitizePlainText(e) {
    return String(e || "").replace(/<\/?color[^>]*>/gi, "").replace(/\[\/?[a-z][^\]]*\]/gi, "").replace(/<\/?url[^>]*>/gi, "").trim();
}

async function loadIconPaths() {
    if (iconPaths) return iconPaths;
    try {
        const e = await fetch(withAssetVersion(CONFIG.iconPathsUrl));
        iconPaths = e.ok ? await e.json() : {};
    } catch {
        iconPaths = {};
    }
    return iconPaths;
}

function resolveIconPath(e) {
    if (!e) return "";
    if (iconPaths) {
        const t = iconPaths[e] || iconPaths[String(e).toLowerCase()];
        if (t) return `${CONFIG.iconBasePath}${String(t).replace(/\\/g, "/")}`;
    }
    return e.startsWith("icon_zhujiemian_") ? `${CONFIG.iconBasePath}zhujiemian/${e}.webp` : "";
}

function getTypeFallbackIconName(e, t) {
    const r = Number(t);
    if ("armor" === e) {
        if (4 === r) return "icon_equipslot_body";
        if (7 === r) return "icon_equipslot_cloak";
        if (10 === r) return "icon_equipslot_accessory";
    }
    return "";
}

function applyHeaderIcons() {
    document.querySelectorAll("img[data-icon-name]").forEach(e => {
        const t = e.dataset.iconName;
        if (!t) return;
        const r = resolveIconPath(t);
        r && (e.src = r);
    });
}

function applyStaticText() {
    T.title && (window.RO_SET_PAGE_TITLE ? window.RO_SET_PAGE_TITLE(document.querySelector(".header-title")?.textContent || "Affix Planner") : document.title = T.title);
    const e = document.getElementById("affix-reset-btn");
    e && T.reset && (e.textContent = T.reset);
    const t = document.querySelector("#share-link-btn .site-nav-label");
    t && T.shareBuild && (t.textContent = T.shareBuild);
    const r = document.getElementById("affix-search");
    r && T.searchPlaceholder && r.setAttribute("placeholder", T.searchPlaceholder);
    const n = document.getElementById("affix-rarity-toggle");
    n && n.querySelectorAll(".affix-rarity-btn").forEach(e => {
        const t = String(e.dataset.rarity || "");
        "all" === t ? e.textContent = T.all : T.rarity?.[Number(t)] && (e.textContent = T.rarity[Number(t)]);
    });
    const o = document.querySelector('.affix-quality-btn[data-quality="all"]');
    o && (o.textContent = T.all);
    const a = document.querySelector(".affix-detail-panel h2");
    a && (a.textContent = T.selectedSkills);
    const s = document.querySelector("#affix-selected-summary .details-placeholder");
    s && (s.textContent = T.selectBuild);
}

async function loadJobIndex() {
    if (jobIndex) return jobIndex;
    try {
        jobIndex = await loadJson(CONFIG.jobIndexUrl);
    } catch {
        jobIndex = null;
    }
    return jobIndex;
}

async function loadJson(e) {
    let t = await fetch(withAssetVersion(e));
    if (!(t && t.ok || "zh-TW" === ACTIVE_LOCALE || "string" != typeof e)) {
        const r = e.replace(/_en-US\.json$/i, "_zh-TW.json").replace(/_zh-CN\.json$/i, "_zh-TW.json").replace(/_th-TH\.json$/i, "_zh-TW.json");
        r !== e && (t = await fetch(withAssetVersion(r)));
    }
    if (!t.ok) throw new Error(`Failed to load ${e}: ${t.status}`);
    return t.json();
}

function parseHashState() {
    const e = window.location.hash ? window.location.hash.slice(1) : "";
    if (!e) return null;
    const t = new URLSearchParams(e);
    return {
        mode: t.get("m"),
        typeId: t.get("type"),
        level: t.get("lv"),
        rarity: t.get("r"),
        stuntLevel: t.get("q"),
        search: t.get("s"),
        jobGroup: t.get("g"),
        jobBranch: t.get("b"),
        job: t.get("j"),
        pickWeapon: t.get("w"),
        pickArmor: t.get("ar"),
        pickCloak: t.get("cl"),
        pickAccessory: t.get("ac")
    };
}

function updateUrlHash() {
    const e = new URLSearchParams;
    current.mode && "weapon" !== current.mode && e.set("m", current.mode), current.typeId && e.set("type", String(current.typeId)), 
    current.level && "all" !== current.level && e.set("lv", String(current.level)), 
    current.rarity && "all" !== String(current.rarity) && e.set("r", String(current.rarity)), 
    "all" === current.stuntLevel && e.set("q", "all"), current.stuntLevel && "all" !== current.stuntLevel && 3 !== Number(current.stuntLevel) && e.set("q", String(current.stuntLevel)), 
    current.search && e.set("s", String(current.search)), current.jobGroup && e.set("g", String(current.jobGroup)), 
    current.jobBranch && e.set("b", String(current.jobBranch)), current.job && e.set("j", String(current.job)), 
    selected.weapon && e.set("w", String(selected.weapon)), selected.armor && e.set("ar", String(selected.armor)), 
    selected.cloak && e.set("cl", String(selected.cloak)), selected.accessory.length && e.set("ac", selected.accessory.map(String).join(","));
    const t = window.location.href.split("#")[0], r = e.toString();
    history.replaceState(null, "", r ? `${t}#${r}` : t);
}

function buildStuntByIdIndex() {
    stuntById = new Map, stuntData?.packages && Object.values(stuntData.packages).forEach(e => {
        (e?.entries || []).forEach(e => {
            const t = e?.stunt;
            if (!t?.id) return;
            const r = String(t.id);
            stuntById.has(r) || stuntById.set(r, t);
        });
    });
}

function getSelectedBucket() {
    return "weapon" === current.mode ? "weapon" : 4 === Number(current.typeId) ? "armor" : 7 === Number(current.typeId) ? "cloak" : "accessory";
}

function isPicked(e) {
    const t = String(e);
    return String(selected.weapon || "") === t || String(selected.armor || "") === t || String(selected.cloak || "") === t || selected.accessory.some(e => String(e) === t);
}

function togglePicked(e) {
    const t = String(e), r = getSelectedBucket();
    if ("weapon" === r) return void (selected.weapon = String(selected.weapon || "") === t ? null : t);
    if ("armor" === r) return void (selected.armor = String(selected.armor || "") === t ? null : t);
    if ("cloak" === r) return void (selected.cloak = String(selected.cloak || "") === t ? null : t);
    const n = selected.accessory.findIndex(e => String(e) === t);
    n >= 0 ? selected.accessory.splice(n, 1) : selected.accessory.length < 2 ? selected.accessory.push(t) : selected.accessory[1] = t;
}

function clearPicked(e, t = 0) {
    "weapon" === e && (selected.weapon = null), "armor" === e && (selected.armor = null), 
    "cloak" === e && (selected.cloak = null), "accessory" === e && selected.accessory.splice(t, 1);
}

function renderSelectedSummary() {
    const e = document.getElementById("affix-selected-summary");
    if (!e) return;
    const t = [ {
        key: "weapon",
        label: T.rows.weapon,
        ids: selected.weapon ? [ selected.weapon ] : []
    }, {
        key: "armor",
        label: T.rows.armor,
        ids: selected.armor ? [ selected.armor ] : []
    }, {
        key: "cloak",
        label: T.rows.cloak,
        ids: selected.cloak ? [ selected.cloak ] : []
    }, {
        key: "accessory",
        label: T.rows.accessory,
        ids: selected.accessory.slice(0, 2)
    } ];
    if (!t.some(e => e.ids.length)) return void (e.innerHTML = `<div class="details-placeholder">${escapeHtml(T.selectBuild)}</div>`);
    const r = t.map(e => {
        const t = e.ids.map((t, r) => ((e, t, r) => {
            const n = stuntById.get(String(e)) || null, o = resolveStuntDisplay(n || {}), a = escapeHtml(o.name || `#${e}`), s = Number(n?.level) || 1, l = QUALITY_LABEL[s] || `Lv.${s}`, c = Number(n?.color) || 2, i = STUNT_COLOR_CLASS[c] || "stunt-blue", u = resolveIconPath(String(n?.icon || "")), d = formatRichText(o.desc || "");
            return `\n            <div class="affix-selected-card ${i}">\n                ${u ? `<img class="affix-selected-icon" src="${escapeHtml(u)}" alt="" onerror="this.style.display='none'">` : ""}\n                <div class="affix-selected-meta">\n                    <div class="affix-selected-name">${a}</div>\n                    <div class="affix-selected-level">${l}</div>\n                    ${d ? `<div class="affix-selected-desc">${d}</div>` : ""}\n                </div>\n                <button type="button" class="affix-selected-remove" data-bucket="${escapeHtml(t)}" data-index="${escapeHtml(String(r))}" aria-label="Remove">×</button>\n            </div>\n        `;
        })(t, e.key, r)).join(""), r = "accessory" === e.key ? Math.max(0, 2 - e.ids.length) : e.ids.length ? 0 : 1, n = Array.from({
            length: r
        }).map(() => `\n            <div class="affix-selected-card affix-selected-empty">\n                <div class="affix-selected-empty-text">${escapeHtml(T.empty)}</div>\n            </div>\n        `).join("");
        return `\n            <div class="affix-selected-group">\n                <div class="affix-selected-group-title">${escapeHtml(e.label)}</div>\n                <div class="affix-selected-group-body">\n                    ${t}${n}\n                </div>\n            </div>\n        `;
    }).join("");
    e.innerHTML = `<div class="affix-selected-grid">${r}</div>`;
}

function getTypeMeta(e, t) {
    return stuntIndex ? "armor" === e ? stuntIndex.assembly_types?.[String(t)] || null : stuntIndex.weapon_types?.[String(t)] || null : null;
}

function getPackagesByTypeAndLevel(e, t) {
    return stuntIndex ? "armor" === e ? stuntIndex.armor_packages_by_type_and_level?.[String(t)] || null : stuntIndex.weapon_packages_by_type_and_level?.[String(t)] || null : null;
}

function getSelectableTypes(e) {
    const t = "armor" === e ? stuntIndex.armor_packages_by_type_and_level : stuntIndex.weapon_packages_by_type_and_level;
    if (!t) return [];
    const r = Object.keys(t).map(Number).sort((e, t) => e - t);
    if (!getActiveForgeJobIds().length) return r;
    const n = getForgeEligibleTypeIds(e);
    return r.filter(e => n.includes(e));
}

function getVisibleTypeIds(e) {
    if (!stuntIndex) return [];
    if ("weapon" === e) {
        const t = Object.keys(stuntIndex.weapon_types || {}).map(Number).sort((e, t) => e - t);
        if (!getActiveForgeJobIds().length) return t;
        const r = getForgeEligibleTypeIds(e);
        return t.filter(e => r.includes(e));
    }
    return getSelectableTypes(e);
}

function typeHasData(e, t) {
    const r = getActiveForgeJobIds();
    if (r.length && !getForgeEligibleStuntIdsForJobs(e, t, r).length) return !1;
    const n = getPackagesByTypeAndLevel(e, t);
    return !(!n || "object" != typeof n) && Object.values(n).some(e => Array.isArray(e) && e.length > 0);
}

function setSelectedType(e, t) {
    const r = "armor" === e ? "armor" : "weapon", n = Number(t), o = String(current.level), a = "all" === o ? null : getPackagesByTypeAndLevel(r, n);
    current.mode = r, current.typeId = n, current.level = a && a[o] ? o : "all", renderAll();
}

function resetAll() {
    current.mode = "weapon", current.level = "all", current.rarity = "all", current.stuntLevel = 3, 
    current.search = "", current.jobGroup = "", current.jobBranch = "", current.job = null;
    const e = getVisibleTypeIds(current.mode);
    current.typeId = e.length ? e[0] : null, selected.weapon = null, selected.armor = null, 
    selected.cloak = null, selected.accessory = [];
    const t = document.getElementById("affix-search");
    t && (t.value = ""), renderAll();
}

function getForgeJobFilter() {
    return stuntIndex?.forge_job_filter || null;
}

function getForgeEligibilityMap(e) {
    const t = getForgeJobFilter();
    return t ? "armor" === e ? t.armor_stunts_by_type_and_job || {} : t.weapon_stunts_by_type_and_job || {} : {};
}

function getForgeEligibleJobIds() {
    const e = getForgeJobFilter(), t = Array.isArray(e?.job_ids) ? e.job_ids.map(Number) : [];
    if (t.length) return t.filter(e => Number.isFinite(e));
    const r = new Set;
    return [ "weapon", "armor" ].forEach(e => {
        const t = getForgeEligibilityMap(e);
        Object.values(t || {}).forEach(e => {
            Object.keys(e || {}).forEach(e => r.add(Number(e)));
        });
    }), Array.from(r.values()).filter(e => Number.isFinite(e)).sort((e, t) => e - t);
}

function getJobPath(e) {
    if (!jobIndex?.jobs) return [];
    let t = Number(e);
    if (!Number.isFinite(t) || t <= 0) return [];
    const r = [], n = new Set;
    for (;Number.isFinite(t) && t > 0 && !n.has(t); ) {
        n.add(t);
        const e = jobIndex.jobs[String(t)];
        if (!e) break;
        101 !== t && r.push(t);
        const o = Number(e.parent || 0);
        if (!o || 101 === o) break;
        t = o;
    }
    return r.reverse();
}

function hasEligibleChildJob(e, t) {
    const r = jobIndex?.jobs?.[String(e)], n = Array.isArray(r?.children) ? r.children.map(Number) : [];
    for (const e of n) if (t.has(e) || hasEligibleChildJob(e, t)) return !0;
    return !1;
}

function getJobGroupKey(e) {
    return (e || []).map(Number).filter(e => Number.isFinite(e) && e > 0).join(",");
}

function getForgeJobBranches() {
    const e = getForgeEligibleJobIds(), t = new Set(e);
    if (!e.length || !jobIndex?.jobs) return [];
    const r = e.filter(e => !hasEligibleChildJob(e, t)), n = new Map;
    return r.forEach(e => {
        const r = getJobPath(e).filter(e => jobIndex.jobs[String(e)]), o = Number(r[0] || 0), a = r.slice(1), s = a.filter(e => t.has(e)), l = getJobGroupKey(a);
        o && l && s.length && !n.has(l) && n.set(l, {
            key: l,
            baseId: o,
            jobs: a,
            filterIds: s
        });
    }), Array.from(n.values()).sort((e, t) => {
        const r = Number(e.baseId || 0), n = Number(t.baseId || 0);
        return r !== n ? r - n : Number(e.jobs[e.jobs.length - 1] || 0) - Number(t.jobs[t.jobs.length - 1] || 0);
    });
}

function getForgePrimaryJobGroups() {
    const e = getForgeEligibleJobIds(), t = new Set(e), r = new Map;
    return getForgeJobBranches().forEach(e => {
        const n = Number(e.baseId || 0);
        if (!n) return;
        r.has(n) || r.set(n, {
            key: String(n),
            jobId: n,
            branches: [],
            filterIds: new Set(t.has(n) ? [ n ] : [])
        });
        const o = r.get(n);
        o.branches.push(e), e.filterIds.forEach(e => o.filterIds.add(e));
    }), e.forEach(e => {
        const t = getJobPath(e), n = Number(t[0] || 0);
        n && !r.has(n) && r.set(n, {
            key: String(n),
            jobId: n,
            branches: [],
            filterIds: new Set([ e ])
        });
    }), Array.from(r.values()).map(e => ({
        ...e,
        filterIds: Array.from(e.filterIds.values()).sort((e, t) => e - t)
    })).sort((e, t) => Number(e.jobId || 0) - Number(t.jobId || 0));
}

function getSelectedPrimaryJobGroup() {
    const e = String(current.jobGroup || "");
    return e && getForgePrimaryJobGroups().find(t => t.key === e) || null;
}

function getSelectedJobBranch() {
    const e = String(current.jobBranch || "");
    if (!e) return null;
    const t = getSelectedPrimaryJobGroup();
    return (t ? t.branches : getForgeJobBranches()).find(t => t.key === e) || null;
}

function getActiveForgeJobIds() {
    if (current.job) return [ Number(current.job) ].filter(e => Number.isFinite(e) && e > 0);
    const e = getSelectedJobBranch();
    if (e) return e.filterIds.slice();
    const t = getSelectedPrimaryJobGroup();
    return t ? t.filterIds.slice() : [];
}

function matchesAnyForgeJob(e, t) {
    const r = (t || []).map(Number).filter(e => Number.isFinite(e) && e > 0);
    if (!r.length) return !0;
    const n = Array.isArray(e?.job_ids) ? e.job_ids.map(Number).filter(e => Number.isFinite(e) && e > 0) : [];
    return !n.length || n.some(e => {
        const t = getJobPath(e), n = resolveBaseJobId(e), o = resolveBranchJobId(e);
        return r.some(r => r === e || t.includes(r) || n && r === n || o && r === o);
    });
}

function getForgeEligibleStuntIdsForJobs(e, t, r) {
    if (!t) return [];
    const n = new Set, o = getPackagesByTypeAndLevel(e, t);
    return o && "object" == typeof o ? (Object.values(o).forEach(e => {
        (e || []).forEach(e => {
            const t = stuntData?.packages?.[String(e)];
            t && (t.entries || []).forEach(e => {
                const t = e?.stunt;
                t?.id && matchesAnyForgeJob(t, r) && n.add(Number(t.id));
            });
        });
    }), Array.from(n.values()).sort((e, t) => e - t)) : [];
}

function getForgeEligibleTypeIds(e) {
    const t = getActiveForgeJobIds();
    if (!t.length) return [];
    const r = getForgeEligibilityMap(e);
    return Object.entries(r || {}).filter(([, e]) => t.some(t => Array.isArray(e?.[String(t)]) && e[String(t)].length > 0)).map(([e]) => Number(e)).filter(e => Number.isFinite(e)).sort((e, t) => e - t);
}

function getForgeEligibleStuntIds(e, t, r) {
    if (!r || !t) return [];
    const n = getForgeEligibilityMap(e), o = n?.[String(t)]?.[String(r)];
    return Array.isArray(o) ? o.map(Number).filter(e => Number.isFinite(e)) : [];
}

function ensureSelectedTypeAvailable() {
    if (!getActiveForgeJobIds().length) {
        const e = getVisibleTypeIds(current.mode);
        if (!current.typeId || !e.includes(Number(current.typeId))) {
            const e = getVisibleTypeIds("weapon"), t = getVisibleTypeIds("armor");
            e.length ? (current.mode = "weapon", current.typeId = e[0]) : t.length ? (current.mode = "armor", 
            current.typeId = t[0]) : current.typeId = null;
        }
        return;
    }
    const e = getVisibleTypeIds(current.mode);
    if (current.typeId && e.includes(Number(current.typeId))) return;
    const t = getVisibleTypeIds("weapon"), r = getVisibleTypeIds("armor");
    t.length ? (current.mode = "weapon", current.typeId = t[0]) : r.length ? (current.mode = "armor", 
    current.typeId = r[0]) : current.typeId = null, current.level = "all";
}

function renderTypeSections() {
    const e = document.getElementById("affix-type-sections");
    if (!e) return;
    e.innerHTML = "";
    const t = (e, t) => {
        if (!t.length) return null;
        const r = document.createElement("section");
        r.className = "affix-type-section", r.classList.add("weapon" === e ? "affix-type-section-weapon" : "affix-type-section-armor"), 
        r.innerHTML = `\n            <div class="affix-type-grid" data-mode="${escapeHtml(e)}"></div>\n        `;
        const n = r.querySelector(".affix-type-grid"), o = document.createDocumentFragment();
        return t.forEach(t => {
            const r = getTypeMeta(e, t), n = typeHasData(e, t), a = document.createElement("button");
            a.type = "button", a.className = "affix-type-btn", a.dataset.mode = String(e), a.dataset.typeId = String(t), 
            String(t) === String(current.typeId) && e === current.mode && a.classList.add("selected"), 
            n || a.classList.add("is-empty");
            const s = resolveIconPath((r?.icon || "").trim() || getTypeFallbackIconName(e, t)), l = r?.name || String(t);
            n || (a.title = T.noDataYet), a.innerHTML = `\n                <div class="affix-type-icon">\n                    ${s ? `<img src="${escapeHtml(s)}" alt="" onerror="this.style.display='none'">` : ""}\n                </div>\n                <div class="affix-type-name">${escapeHtml(l)}</div>\n            `, 
            a.addEventListener("click", () => setSelectedType(e, t)), o.appendChild(a);
        }), n.appendChild(o), r;
    }, r = getVisibleTypeIds("armor"), n = getVisibleTypeIds("weapon"), o = [ t("armor", r.filter(e => 4 === e)), t("armor", r.filter(e => 7 === e)), t("armor", r.filter(e => 10 === e)), t("weapon", n) ].filter(Boolean);
    if (!o.length) return void (e.innerHTML = `<div class="loading-state">${escapeHtml(T.noTypes)}</div>`);
    const a = document.createDocumentFragment();
    o.forEach(e => a.appendChild(e)), e.appendChild(a);
}

function renderLevelRow() {
    const e = document.getElementById("affix-level-row");
    e.innerHTML = "";
    const t = current.typeId ? getPackagesByTypeAndLevel(current.mode, current.typeId) : null;
    if (!t) return;
    const r = Object.keys(t).map(Number).sort((e, t) => e - t), n = (e, t) => {
        const r = document.createElement("button");
        return r.type = "button", r.className = "affix-level-btn", r.dataset.value = String(e), 
        r.textContent = t, r.addEventListener("click", () => {
            current.level = String(e), renderAll();
        }), r;
    };
    e.appendChild(n("all", T.all)), r.forEach(t => e.appendChild(n(String(t), `Lv.${t}`))), 
    e.querySelectorAll(".affix-level-btn").forEach(e => {
        e.classList.toggle("active", e.dataset.value === String(current.level));
    });
}

function renderQualityToggle() {
    const e = document.getElementById("affix-quality-toggle");
    if (!e) return;
    const t = String(current.stuntLevel);
    e.querySelectorAll(".affix-quality-btn").forEach(e => {
        const r = String(e.dataset.quality) === t;
        e.classList.toggle("active", r), e.setAttribute("aria-pressed", r ? "true" : "false");
    });
}

function renderRarityToggle() {
    const e = document.getElementById("affix-rarity-toggle");
    if (!e) return;
    const t = String(current.rarity);
    e.querySelectorAll(".affix-rarity-btn").forEach(e => {
        const r = String(e.dataset.rarity) === t;
        e.classList.toggle("active", r), e.setAttribute("aria-pressed", r ? "true" : "false");
    });
}

function resolveBaseJobId(e) {
    if (!jobIndex?.jobs) return null;
    let t = Number(e);
    if (!Number.isFinite(t)) return null;
    const r = new Set;
    for (;Number.isFinite(t) && 0 !== t && !r.has(t); ) {
        r.add(t);
        const e = jobIndex.jobs[String(t)];
        if (!e) return null;
        const n = Number(e.parent);
        if (101 === n) return t;
        if (!Number.isFinite(n) || 0 === n) return null;
        t = n;
    }
    return null;
}

function resolveBranchJobId(e) {
    if (!jobIndex?.jobs) return null;
    let t = Number(e);
    if (!Number.isFinite(t)) return null;
    const r = new Set;
    for (;Number.isFinite(t) && 0 !== t && !r.has(t); ) {
        r.add(t);
        const e = jobIndex.jobs[String(t)];
        if (!e) return null;
        const n = Number(e.parent);
        if (101 === n) return t;
        if (!Number.isFinite(n) || 0 === n) return t;
        const o = jobIndex.jobs[String(n)];
        if (101 === Number(o?.parent || 0)) return t;
        t = n;
    }
    return null;
}

function isBaseJobId(e) {
    const t = jobIndex?.jobs?.[String(e)];
    return 101 === Number(t?.parent || 0);
}

function getRollBranchJobIds(e) {
    const t = Array.isArray(e?.job_ids) ? e.job_ids : [], r = new Set;
    return t.forEach(e => {
        const t = resolveBranchJobId(e);
        t && !isBaseJobId(t) && r.add(t);
    }), Array.from(r.values()).sort((e, t) => e - t);
}

function normalizeJobForVisibleOptions(e, t) {
    const r = Number(e);
    if (!r) return null;
    const n = Array.isArray(t) ? t.map(Number) : [];
    if (n.includes(r)) return r;
    const o = resolveBranchJobId(r);
    if (o && n.includes(o)) return o;
    const a = resolveBaseJobId(r) || (isBaseJobId(r) ? r : null);
    if (a) {
        const e = n.find(e => resolveBaseJobId(e) === a);
        if (e) return e;
    }
    return r;
}

function deriveJobChipState(e, t) {
    const r = new Set;
    (t || []).forEach(e => {
        getRollBranchJobIds(e).forEach(e => r.add(e));
    });
    const n = Array.from(r.values()).sort((e, t) => e - t);
    if (n.length > 0) return {
        mode: "branch",
        ordered: n
    };
    const o = new Set;
    return (t || []).forEach(e => {
        const t = e.job_ids || [];
        Array.isArray(t) && 0 !== t.length && t.forEach(e => {
            const t = resolveBaseJobId(e);
            t && o.add(t);
        });
    }), {
        mode: "base",
        ordered: Array.from(o.values()).sort((e, t) => e - t)
    };
}

function renderJobChips() {
    const e = document.getElementById("affix-job-chips");
    if (!e) return;
    const t = getForgePrimaryJobGroups(), r = getForgeJobBranches(), n = getForgeEligibleJobIds();
    currentJobFilterMode = "forge", currentJobFilterIds = n;
    const o = e.closest(".affix-job-row") || e;
    if (!t.length) return current.jobGroup = "", current.jobBranch = "", current.job = null, 
    o.style.display = "none", void (e.innerHTML = "");
    if (current.jobGroup && !t.some(e => e.key === current.jobGroup) && (current.jobGroup = ""), 
    current.jobBranch && !r.some(e => e.key === current.jobBranch) && (current.jobBranch = ""), 
    current.jobBranch && current.jobGroup) {
        const e = r.find(e => e.key === current.jobBranch);
        e && String(e.baseId) !== String(current.jobGroup) && (current.jobBranch = "");
    }
    if (current.jobBranch && !current.jobGroup) {
        const e = r.find(e => e.key === current.jobBranch);
        e && (current.jobGroup = String(e.baseId));
    }
    if (current.job && !n.includes(Number(current.job)) && (current.job = null), current.job && !current.jobGroup) {
        const e = t.filter(e => e.filterIds.includes(Number(current.job)));
        1 === e.length && (current.jobGroup = e[0].key);
    }
    if (current.job && !current.jobBranch) {
        const e = r.filter(e => e.filterIds.includes(Number(current.job)));
        1 === e.length && (current.jobBranch = e[0].key);
    }
    const a = getSelectedPrimaryJobGroup();
    a && current.job && !a.filterIds.includes(Number(current.job)) && (current.job = null), 
    o.style.display = "";
    const s = (e, t) => {
        const r = jobIndex?.jobs?.[String(e)] || null, n = resolveIconPath(r?.job_icon || ""), o = r?.job_name || String(e);
        return n ? `<img class="${escapeHtml(t)}" src="${escapeHtml(n)}" alt="" title="${escapeHtml(o)}" loading="lazy" onerror="this.style.display='none'">` : `<span class="${escapeHtml(t)} affix-job-chip-icon-fallback">${escapeHtml(o)}</span>`;
    }, l = `\n        <button type="button" class="affix-job-chip affix-job-chip-all${current.jobGroup || current.jobBranch || current.job ? "" : " selected"}" data-job-group="" title="${escapeHtml(T.all)}">\n            <span class="affix-job-chip-label">${escapeHtml(T.all)}</span>\n        </button>\n    `, c = t.map(e => {
        const t = String(e.key) === String(current.jobGroup || ""), r = jobIndex?.jobs?.[String(e.jobId)]?.job_name || String(e.jobId), n = s(e.jobId, "affix-job-chip-icon");
        return `\n            <button type="button" class="affix-job-chip affix-job-chip-group${t ? " selected" : ""}" data-job-group="${escapeHtml(e.key)}" title="${escapeHtml(r)}" aria-label="${escapeHtml(r)}">\n                <span class="affix-job-chip-icons">${n}</span>\n            </button>\n        `;
    }).join(""), i = a ? `\n        <div class="affix-job-subchips" aria-label="Job branch filter">\n            <button type="button" class="affix-job-chip affix-job-chip-all${current.jobBranch || current.job ? "" : " selected"}" data-job-branch="" title="${escapeHtml(T.all)}">\n                <span class="affix-job-chip-label">${escapeHtml(T.all)}</span>\n            </button>\n            ${a.branches.map(e => {
        const t = String(e.key) === String(current.jobBranch || ""), r = e.jobs.map(e => jobIndex?.jobs?.[String(e)]?.job_name || String(e)).join(" / "), n = e.jobs.map(e => s(e, "affix-job-chip-icon")).join("");
        return `\n                    <button type="button" class="affix-job-chip affix-job-chip-group${t ? " selected" : ""}" data-job-branch="${escapeHtml(e.key)}" title="${escapeHtml(r)}" aria-label="${escapeHtml(r)}">\n                        <span class="affix-job-chip-icons">${n}</span>\n                    </button>\n                `;
    }).join("")}\n        </div>\n    ` : "";
    e.innerHTML = `\n        <div class="affix-job-primary-chips">${l}${c}</div>\n        ${i}\n    `;
}

function collectPackageIds() {
    if (!current.typeId) return [];
    const e = getPackagesByTypeAndLevel(current.mode, current.typeId);
    if (!e) return [];
    if ("all" !== String(current.level)) return (e[String(current.level)] || []).map(Number);
    const t = new Set;
    return Object.values(e).forEach(e => (e || []).forEach(e => t.add(Number(e)))), 
    Array.from(t.values()).filter(e => Number.isFinite(e)).sort((e, t) => e - t);
}

function collectStunts(e, t = {}) {
    const r = current.stuntLevel, n = "all" === String(current.rarity) ? null : Number(current.rarity) || 5, o = Boolean(t.ignoreJob), a = (current.search || "").trim().toLowerCase(), s = current.job ? Number(current.job) : null, l = t.jobMode || currentJobFilterMode || "base", c = o ? s : normalizeJobForVisibleOptions(s, currentJobFilterIds), i = o ? [] : getActiveForgeJobIds(), u = i.length ? new Set(getForgeEligibleStuntIdsForJobs(current.mode, current.typeId, i).map(String)) : null, d = new Set, b = [];
    return e.forEach(e => {
        const t = stuntData.packages?.[String(e)];
        t && (t.entries || []).forEach(e => {
            const t = e?.stunt;
            if (!t) return;
            if (null !== n && Number(t.color) !== n) return;
            if ("all" !== r && Number(t.level) !== Number(r)) return;
            if (!(e => {
                if (!a) return !0;
                const t = String(e.name || "").toLowerCase(), r = String(e.desc || "").toLowerCase();
                return t.includes(a) || r.includes(a);
            })(t)) return;
            if (!(e => {
                if (o) return !0;
                if ("forge" === l) return !u || u.has(String(e?.id || ""));
                if (!c) return !0;
                const t = e.job_ids || [];
                if (!Array.isArray(t) || 0 === t.length) return !0;
                if ("branch" === l) {
                    const t = getRollBranchJobIds(e);
                    return !!t.length && t.includes(c);
                }
                return t.some(e => resolveBaseJobId(e) === c);
            })(t)) return;
            const s = String(t.id || "");
            s && !d.has(s) && (d.add(s), b.push(t));
        });
    }), b.sort((e, t) => {
        const r = String(e.name || ""), n = String(t.name || "");
        return r !== n ? r.localeCompare(n, "zh-Hant") : Number(e.id) - Number(t.id);
    }), b;
}

function renderAffixGrid(e) {
    const t = current.typeId && !typeHasData(current.mode, current.typeId), r = document.getElementById("affix-grid");
    if (visibleStuntsById = new Map, t) return void (r.innerHTML = `<div class="loading-state">${escapeHtml(T.noDataYet)}</div>`);
    if (!e.length) return void (r.innerHTML = `<div class="loading-state">${escapeHtml(T.noResults)}</div>`);
    e.forEach(e => visibleStuntsById.set(String(e.id), e));
    const n = e.map(e => {
        const t = Number(e.level) || 1, r = Number(e.color) || 2, n = STUNT_COLOR_CLASS[r] || "stunt-blue", o = resolveStuntDisplay(e || {}), a = escapeHtml(o.name || ""), s = formatRichText(o.desc || ""), l = QUALITY_LABEL[t] || `Lv.${t}`, c = isPicked(e.id) ? "picked" : "", i = resolveIconPath(String(e.icon || ""));
        return `\n            <button type="button" class="affix-card ${n} ${c}" data-stunt-id="${escapeHtml(e.id)}">\n                <div class="affix-card-top">\n                    <div class="affix-card-name">\n                        ${i ? `<img class="affix-card-icon" src="${escapeHtml(i)}" alt="" onerror="this.style.display='none'">` : ""}\n                        <span>${a}</span>\n                    </div>\n                    <div class="affix-card-level">${l}</div>\n                </div>\n                <div class="affix-card-desc">${s}</div>\n            </button>\n        `;
    }).join("");
    r.innerHTML = `<div class="affix-card-grid">${n}</div>`, r.querySelectorAll(".affix-card").forEach(e => {
        e.addEventListener("click", () => {
            togglePicked(e.dataset.stuntId), renderSelectedSummary(), updateUrlHash(), syncPickedCards();
        });
    });
}

function syncPickedCards() {
    document.querySelectorAll(".affix-card").forEach(e => {
        e.classList.toggle("picked", isPicked(e.dataset.stuntId));
    });
}

function renderAll() {
    renderJobChips(), ensureSelectedTypeAvailable(), renderTypeSections(), renderLevelRow(), 
    renderRarityToggle(), renderQualityToggle();
    const e = current.typeId && !typeHasData(current.mode, current.typeId), t = collectStunts(collectPackageIds());
    document.getElementById("affix-count").textContent = e ? T.noDataYet : "en-US" === ACTIVE_LOCALE ? `${t.length} ${T.skills}` : `${t.length}${T.skills}`, 
    renderAffixGrid(t), renderSelectedSummary(), updateUrlHash();
}

function applyHashState(e) {
    if (!e) return;
    if ("armor" === e.mode && (current.mode = "armor"), e.rarity && ("all" === e.rarity || [ 2, 3, 4, 5, 6 ].includes(Number(e.rarity))) && (current.rarity = "all" === e.rarity ? "all" : Number(e.rarity)), 
    e.stuntLevel && [ 1, 2, 3 ].includes(Number(e.stuntLevel)) && (current.stuntLevel = Number(e.stuntLevel)), 
    e.search && (current.search = e.search), e.jobGroup && /^\d+(,\d+)*$/.test(String(e.jobGroup))) {
        const t = String(e.jobGroup).split(",").filter(Boolean);
        current.jobGroup = t.length > 1 ? t[0] : String(e.jobGroup), t.length > 2 && !e.jobBranch && (current.jobBranch = t.slice(1).join(","));
    }
    e.jobBranch && /^\d+(,\d+)*$/.test(String(e.jobBranch)) && (current.jobBranch = String(e.jobBranch)), 
    e.job && (current.job = Number(e.job) || null);
    const t = getVisibleTypeIds(current.mode);
    e.typeId && t.includes(Number(e.typeId)) && (current.typeId = Number(e.typeId)), 
    !current.typeId && t.length && (current.typeId = t[0]);
    const r = current.typeId ? getPackagesByTypeAndLevel(current.mode, current.typeId) : null;
    e.level && ("all" === e.level || r && r[String(e.level)]) && (current.level = e.level);
    const n = e => String(e || "").trim() || null;
    selected.weapon = n(e.pickWeapon), selected.armor = n(e.pickArmor), selected.cloak = n(e.pickCloak), 
    selected.accessory = String(e.pickAccessory || "").split(",").map(e => e.trim()).filter(Boolean).slice(0, 2);
}

async function init() {
    const e = document.getElementById("affix-grid");
    try {
        if (await loadIconPaths(), applyHeaderIcons(), applyStaticText(), await loadJobIndex(), 
        [stuntData, stuntIndex] = await Promise.all([ loadJson(CONFIG.stuntDataUrl), loadJson(CONFIG.stuntIndexUrl) ]), 
        buildStuntByIdIndex(), applyHashState(parseHashState()), !current.typeId) {
            const e = getVisibleTypeIds(current.mode);
            current.typeId = e.length ? e[0] : null;
        }
        const e = document.getElementById("affix-search"), t = document.getElementById("affix-quality-toggle"), r = document.getElementById("affix-rarity-toggle"), n = document.getElementById("affix-job-chips"), o = document.getElementById("affix-reset-btn");
        e.value = String(current.search || ""), r && r.addEventListener("click", e => {
            const t = e.target.closest(".affix-rarity-btn");
            t && (current.rarity = "all" === t.dataset.rarity ? "all" : Number(t.dataset.rarity) || 5, 
            renderAll());
        }), t && t.addEventListener("click", e => {
            const t = e.target.closest(".affix-quality-btn");
            t && (current.stuntLevel = "all" === t.dataset.quality ? "all" : Number(t.dataset.quality), 
            renderAll());
        }), n && n.addEventListener("click", e => {
            const t = e.target.closest(".affix-job-chip");
            if (t) {
                if (Object.prototype.hasOwnProperty.call(t.dataset, "jobGroup")) current.jobGroup = String(t.dataset.jobGroup || ""), 
                current.jobBranch = "", current.job = null; else if (Object.prototype.hasOwnProperty.call(t.dataset, "jobBranch")) current.jobBranch = String(t.dataset.jobBranch || ""), 
                current.job = null; else {
                    const e = t.dataset.jobId || "";
                    current.job = e ? Number(e) : null;
                }
                renderAll();
            }
        }), o && o.addEventListener("click", () => {
            resetAll();
        });
        const a = document.getElementById("affix-selected-summary");
        a && a.addEventListener("click", e => {
            const t = e.target.closest(".affix-selected-remove");
            t && (clearPicked(t.dataset.bucket || "", Number(t.dataset.index) || 0), renderAll());
        });
        let s = null;
        e.addEventListener("input", () => {
            s && clearTimeout(s), s = setTimeout(() => {
                current.search = e.value || "", renderAll();
            }, 120);
        }), renderAll();
    } catch (t) {
        e.innerHTML = `<div class="loading-state">${escapeHtml(T.failedLoad)}</div>`, console.error(t);
    }
}

document.addEventListener("DOMContentLoaded", init);

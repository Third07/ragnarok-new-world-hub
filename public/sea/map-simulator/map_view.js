const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function detectLocale() {
    if (window.RO_ACTIVE_LOCALE) return window.RO_ACTIVE_LOCALE;
    const e = window.RO_NORMALIZE_LOCALE || null, t = new URLSearchParams(window.location.search).get("lang"), n = localStorage.getItem("ro_lang"), a = document.documentElement.getAttribute("lang"), r = Array.isArray(navigator.languages) ? navigator.languages : [], s = [ t, n, a, (navigator.language || "").trim(), ...r ], i = e => SUPPORTED_LOCALES.some(t => t.toLowerCase() === String(e).toLowerCase());
    if ("function" == typeof e) for (const t of s) {
        const n = e(t);
        if (n) return n;
    }
    for (const e of s) {
        if (!e) continue;
        const t = SUPPORTED_LOCALES.find(t => t.toLowerCase() === String(e).toLowerCase());
        if (t) return t;
    }
    for (const e of s) {
        if (!e) continue;
        const t = String(e).split("-")[0].toLowerCase();
        if ("zh" === t) {
            if (i("zh-TW")) return "zh-TW";
            const e = SUPPORTED_LOCALES.find(e => e.toLowerCase().startsWith("zh-"));
            if (e) return e;
        }
        if ("en" === t && i("en-US")) return "en-US";
        if (("id" === t || "in" === t) && i("id-ID")) return "id-ID";
    }
    return i("en-US") ? "en-US" : i("zh-TW") ? "zh-TW" : SUPPORTED_LOCALES[0] || "en-US";
}

const ACTIVE_LOCALE = detectLocale();

const MAP_STORAGE_SCOPE = /^\/sea(?:\/|$)/.test(window.location.pathname) ? "sea" : "hmt", HIDE_CHECKED_CHESTS_STORAGE_KEY = "ro_map_hide_checked_chests", MONSTER_PORTRAITS_STORAGE_KEY = "ro_map_use_monster_portraits", MONSTER_PORTRAIT_LABELS_STORAGE_KEY = "ro_map_show_monster_portrait_labels", CHEST_STORAGE_TYPES = [ "expl_chest", "guard_chest", "monster_chest", "mystery_chest", "strange_chest" ], QUEST_STORAGE_TYPES = [ "quest_mark_008", "rw_quest", "monster_cards", "jd", "cooking_recipes" ];

function getChestStorageKey(e) {
    return `${MAP_STORAGE_SCOPE}_${e}`;
}

function normalizeChestStorageType(e) {
    return String(e || "").split(/[\\/]/).pop().replace(/\.json$/i, "").toLowerCase();
}

function readStoredChestKeys() {
    const e = new Set;
    for (const t of CHEST_STORAGE_TYPES) try {
        const n = JSON.parse(localStorage.getItem(getChestStorageKey(t)) || "[]");
        if (Array.isArray(n)) for (const a of n) ("number" == typeof a || "string" == typeof a) && "" !== String(a) && e.add(`${t}.json:${a}`);
    } catch {}
    return e;
}

function readStoredBoolean(e, t = !1) {
    try {
        const n = localStorage.getItem(e);
        return null === n ? t : "true" === n;
    } catch {
        return t;
    }
}

function writeStoredChestKeys(e) {
    try {
        const t = new Map(CHEST_STORAGE_TYPES.map(e => [ e, [] ]));
        for (const n of e || []) {
            const a = n.indexOf(":");
            if (a <= 0) continue;
            const r = t.get(normalizeChestStorageType(n.slice(0, a))), i = n.slice(a + 1);
            r && i && r.push(/^\d+$/.test(i) ? Number(i) : i);
        }
        for (const [e, n] of t) n.length ? (n.sort((e, t) => String(e).localeCompare(String(t), void 0, {
            numeric: !0
        })), localStorage.setItem(getChestStorageKey(e), JSON.stringify(n))) : localStorage.removeItem(getChestStorageKey(e));
    } catch {}
}

function writeStoredBoolean(e, t) {
    try {
        localStorage.setItem(e, t ? "true" : "false");
    } catch {}
}

function getQuestStorageType(e, t = e?.file) {
    const n = normalizeChestStorageType(t);
    return QUEST_STORAGE_TYPES.includes(n) ? n : null;
}

function getQuestStorageKey(e) {
    return `${MAP_STORAGE_SCOPE}_${e}`;
}

function readStoredQuestIds() {
    const e = new Map;
    for (const t of QUEST_STORAGE_TYPES) try {
        const n = JSON.parse(localStorage.getItem(getQuestStorageKey(t)) || "[]");
        e.set(t, new Set(Array.isArray(n) ? n.map(Number).filter(e => Number.isInteger(e) && e > 0) : []));
    } catch {
        e.set(t, new Set);
    }
    return e;
}

function writeStoredQuestIds(e, t) {
    try {
        const n = Array.from(t).filter(e => Number.isInteger(e) && e > 0).sort((e, t) => e - t);
        n.length ? localStorage.setItem(getQuestStorageKey(e), JSON.stringify(n)) : localStorage.removeItem(getQuestStorageKey(e));
    } catch {}
}

localStorage.setItem("ro_lang", ACTIVE_LOCALE), document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const MAP_I18N = {
    "zh-TW": {
        mapTitle: "地圖",
        mapLabel: "地圖：",
        selectMap: "選擇地圖...",
        openWorld: "開放世界",
        instances: "副本 / 地城",
        marksCount: e => `${e} 個標記`,
        questFallback: e => `任務 ${e ?? ""}`.trim(),
        coords: "座標",
        missingMarkData: "缺少地圖標記資料。",
        noMarksFound: "此地圖找不到標記。",
        missingMapConfig: "缺少地圖設定。",
        resetZoom: "重設縮放",
        filters: "篩選",
        questRewards: "任務獎勵",
        selectQuestHint: "請點選任務標記查看詳情。",
        questMarkType: "任務標記",
        questDetails: "任務詳情",
        closeLabel: "關閉",
        markTypeLabel: "標記類型",
        locationLabel: "地點",
        noRewards: "未提供獎勵資料。"
    },
    "zh-CN": {
        mapTitle: "地图",
        mapLabel: "地图：",
        selectMap: "选择地图...",
        openWorld: "开放世界",
        instances: "副本 / 地城",
        marksCount: e => `${e} 个标记`,
        questFallback: e => `任务 ${e ?? ""}`.trim(),
        coords: "坐标",
        missingMarkData: "缺少地图标记数据。",
        noMarksFound: "此地图找不到标记。",
        missingMapConfig: "缺少地图配置。",
        resetZoom: "重置缩放",
        filters: "筛选",
        questRewards: "任务奖励",
        selectQuestHint: "请选择任务标记查看详情。",
        questMarkType: "任务标记",
        questDetails: "任务详情",
        closeLabel: "关闭",
        markTypeLabel: "标记类型",
        locationLabel: "地点",
        noRewards: "未提供奖励数据。"
    },
    "th-TH": {
        mapTitle: "แผนที่",
        mapLabel: "แผนที่:",
        selectMap: "เลือกแผนที่...",
        openWorld: "โอเพนเวิลด์",
        instances: "ดันเจียน / อินสแตนซ์",
        marksCount: e => `${e} จุด`,
        questFallback: e => `เควสต์ ${e ?? ""}`.trim(),
        coords: "พิกัด",
        missingMarkData: "ไม่พบข้อมูลจุดบนแผนที่",
        noMarksFound: "ไม่พบจุดในแผนที่นี้",
        missingMapConfig: "ไม่พบการตั้งค่าแผนที่",
        resetZoom: "รีเซ็ตซูม",
        filters: "ตัวกรอง",
        questRewards: "รางวัลเควสต์",
        selectQuestHint: "เลือกจุดเควสต์เพื่อดูรายละเอียด",
        questMarkType: "จุดเควสต์",
        questDetails: "รายละเอียดเควสต์",
        closeLabel: "ปิด",
        markTypeLabel: "ประเภทจุด",
        locationLabel: "ตำแหน่ง",
        noRewards: "ไม่มีข้อมูลรางวัล"
    },
    "en-US": {
        mapTitle: "Maps",
        mapLabel: "Map:",
        selectMap: "Select a map...",
        openWorld: "Open World",
        instances: "Instances / Dungeons",
        marksCount: e => `${e} marks`,
        questFallback: e => `Quest ${e ?? ""}`.trim(),
        coords: "Coords",
        missingMarkData: "Missing map mark data.",
        noMarksFound: "No marks found for this map.",
        missingMapConfig: "Missing map config.",
        resetZoom: "Reset Zoom",
        filters: "Filters",
        questRewards: "Quest rewards",
        selectQuestHint: "Select a quest mark to view details.",
        questMarkType: "Quest Mark",
        questDetails: "Quest Details",
        closeLabel: "Close",
        markTypeLabel: "Mark Type",
        locationLabel: "Location",
        noRewards: "No reward data."
    }
}, MAP_REQUIREMENTS_I18N = {
    "zh-TW": {
        unlockRequirements: "\u89e3\u9396\u689d\u4ef6",
        previousMap: "\u4e0a\u4e00\u500b\u4efb\u52d9\u5730\u5716",
        nextMap: "\u4e0b\u4e00\u500b\u4efb\u52d9\u5730\u5716",
        recipeUnlocked: "\u89e3\u9396\u98df\u8b5c",
        questCompleted: (e, t) => `\u5b8c\u6210 ${t} (#${e})`,
        questSubmitted: (e, t) => `\u5df2\u63d0\u4ea4 ${t} (#${e})`,
        oneOfQuestsCompleted: e => `\u5b8c\u6210\u4ee5\u4e0b\u5176\u4e2d\u4e00\u500b\uff1a${e}`,
        baseLevelRequirement: e => `\u57fa\u790e\u7b49\u7d1a ${e}`,
        jobLevelRequirement: e => `\u8077\u696d\u7b49\u7d1a ${e}`
    },
    "zh-CN": {
        unlockRequirements: "\u89e3\u9501\u6761\u4ef6",
        previousMap: "\u4e0a\u4e00\u4e2a\u4efb\u52a1\u5730\u56fe",
        nextMap: "\u4e0b\u4e00\u4e2a\u4efb\u52a1\u5730\u56fe",
        recipeUnlocked: "\u89e3\u9501\u98df\u8c31",
        questCompleted: (e, t) => `\u5b8c\u6210${t} (#${e})`,
        questSubmitted: (e, t) => `\u5df2\u63d0\u4ea4${t} (#${e})`,
        oneOfQuestsCompleted: e => `\u5b8c\u6210\u4ee5\u4e0b\u5176\u4e2d\u4e00\u4e2a\uff1a${e}`,
        baseLevelRequirement: e => `\u57fa\u7840\u7b49\u7ea7 ${e}`,
        jobLevelRequirement: e => `\u804c\u4e1a\u7b49\u7ea7 ${e}`
    },
    "th-TH": {
        unlockRequirements: "\u0e40\u0e07\u0e37\u0e48\u0e2d\u0e19\u0e44\u0e02\u0e1b\u0e25\u0e14\u0e25\u0e47\u0e2d\u0e01",
        previousMap: "\u0e41\u0e1c\u0e19\u0e17\u0e35\u0e48\u0e20\u0e32\u0e23\u0e01\u0e01\u0e48\u0e2d\u0e19\u0e2b\u0e19\u0e49\u0e32",
        nextMap: "\u0e41\u0e1c\u0e19\u0e17\u0e35\u0e48\u0e20\u0e32\u0e23\u0e01\u0e16\u0e31\u0e14\u0e44\u0e1b",
        recipeUnlocked: "\u0e2a\u0e39\u0e15\u0e23\u0e17\u0e35\u0e48\u0e1b\u0e25\u0e14\u0e25\u0e47\u0e2d\u0e01",
        questCompleted: (e, t) => `\u0e40\u0e04\u0e27\u0e2a\u0e15\u0e4c ${t} (#${e}) \u0e40\u0e2a\u0e23\u0e47\u0e08\u0e41\u0e25\u0e49\u0e27`,
        questSubmitted: (e, t) => `\u0e2a\u0e48\u0e07 ${t} (#${e}) \u0e41\u0e25\u0e49\u0e27`,
        oneOfQuestsCompleted: e => `\u0e17\u0e33\u0e40\u0e04\u0e27\u0e2a\u0e15\u0e4c\u0e43\u0e14\u0e01\u0e47\u0e44\u0e14\u0e49: ${e}`,
        baseLevelRequirement: e => `Base Lv. ${e}`,
        jobLevelRequirement: e => `Job Lv. ${e}`
    },
    "id-ID": {
        unlockRequirements: "Syarat buka",
        previousMap: "Peta tugas sebelumnya",
        nextMap: "Peta tugas berikutnya",
        recipeUnlocked: "Resep terbuka",
        questCompleted: (e, t) => `${t} (#${e}) selesai`,
        questSubmitted: (e, t) => `${t} (#${e}) diserahkan`,
        oneOfQuestsCompleted: e => `Selesaikan satu: ${e}`,
        baseLevelRequirement: e => `Base Lv. ${e}`,
        jobLevelRequirement: e => `Job Lv. ${e}`
    },
    "en-US": {
        unlockRequirements: "Unlock requirements",
        previousMap: "Previous Task Map",
        nextMap: "Next Task Map",
        recipeUnlocked: "Recipe unlocked",
        questCompleted: (e, t) => `${t} (#${e}) completed`,
        questSubmitted: (e, t) => `${t} (#${e}) submitted`,
        oneOfQuestsCompleted: e => `Complete one: ${e}`,
        baseLevelRequirement: e => `Base Lv. ${e}`,
        jobLevelRequirement: e => `Job Lv. ${e}`
    }
}, MAP_CHEST_I18N = {
    "zh-TW": {
        hideChecked: "\u96B1\u85CF\u5DF2\u6536\u96C6",
        options: "\u9078\u9805",
        monsterPortraits: "\u9B54\u7269\u982D\u50CF",
        showMonsterPortraitLabels: "\u986F\u793A\u6A19\u7C64",
        markQuestCompleted: "\u6A19\u8A18\u70BA\u5DF2\u5B8C\u6210",
        monsterFamilyLabels: { mvp: "MVP", mini: "MINI", elite: "\u83C1\u82F1" },
        chestCollected: "\u5DF2\u6536\u96C6",
        chestNotCollected: "\u672A\u6536\u96C6"
    },
    "zh-CN": {
        hideChecked: "\u9690\u85CF\u5DF2\u6536\u96C6",
        options: "\u9009\u9879",
        monsterPortraits: "\u602A\u7269\u5934\u50CF",
        showMonsterPortraitLabels: "\u663E\u793A\u6807\u7B7E",
        markQuestCompleted: "\u6807\u8BB0\u4E3A\u5DF2\u5B8C\u6210",
        monsterFamilyLabels: { mvp: "MVP", mini: "MINI", elite: "\u7CBE\u82F1" },
        chestCollected: "\u5DF2\u6536\u96C6",
        chestNotCollected: "\u672A\u6536\u96C6"
    },
    "th-TH": {
        hideChecked: "\u0E0B\u0E48\u0E2D\u0E19\u0E2B\u0E35\u0E1A\u0E17\u0E35\u0E48\u0E40\u0E01\u0E47\u0E1A\u0E41\u0E25\u0E49\u0E27",
        options: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01",
        monsterPortraits: "\u0E23\u0E39\u0E1B\u0E21\u0E2D\u0E19\u0E2A\u0E40\u0E15\u0E2D\u0E23\u0E4C",
        showMonsterPortraitLabels: "\u0E41\u0E2A\u0E14\u0E07\u0E1B\u0E49\u0E32\u0E22",
        markQuestCompleted: "\u0E17\u0E33\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E2B\u0E21\u0E32\u0E22\u0E27\u0E48\u0E32\u0E40\u0E2A\u0E23\u0E47\u0E08\u0E41\u0E25\u0E49\u0E27",
        monsterFamilyLabels: { mvp: "MVP", mini: "Mini", elite: "Elite" },
        chestCollected: "\u0E40\u0E01\u0E47\u0E1A\u0E41\u0E25\u0E49\u0E27",
        chestNotCollected: "\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E40\u0E01\u0E47\u0E1A"
    },
    "id-ID": {
        hideChecked: "Sembunyikan yang sudah dikumpulkan",
        options: "Opsi",
        monsterPortraits: "Potret monster",
        showMonsterPortraitLabels: "Tampilkan label",
        markQuestCompleted: "Tandai selesai",
        monsterFamilyLabels: { mvp: "MVP", mini: "Mini", elite: "Elite" },
        chestCollected: "Sudah dikumpulkan",
        chestNotCollected: "Belum dikumpulkan"
    },
    "en-US": {
        hideChecked: "Hide checked",
        options: "Options",
        monsterPortraits: "Use monster portraits",
        showMonsterPortraitLabels: "Show portrait label",
        markQuestCompleted: "Mark as completed",
        monsterFamilyLabels: { mvp: "MVP", mini: "Mini", elite: "Elite" },
        chestCollected: "Collected",
        chestNotCollected: "Not collected"
    }
}, MAP_TEXT = Object.assign({}, MAP_I18N[ACTIVE_LOCALE] || MAP_I18N["en-US"], MAP_REQUIREMENTS_I18N[ACTIVE_LOCALE] || MAP_REQUIREMENTS_I18N["en-US"], MAP_CHEST_I18N[ACTIVE_LOCALE] || MAP_CHEST_I18N["en-US"]), CONFIG = {
    mapIndexUrl: `/sea/map-simulator/data/map_index_${ACTIVE_LOCALE}.json`,
    subregionsUrl: `/sea/map-simulator/data/map_subregions_${ACTIVE_LOCALE}.json`,
    placingLocaleDir: `/sea/map-simulator/data/interactive_placing_${ACTIVE_LOCALE}/`,
    placingFallbackDir: "/sea/map-simulator/data/interactive_placing_zh-TW/",
    monsterSpawnsUrl: `/sea/map-simulator/data/map_monster_spawns_${ACTIVE_LOCALE}.json`,
    mapImageBase: "/media/images/map/",
    markImageBase: "/media/images/map_mark/",
    monsterImageBase: "/media/images/monster/",
    itemImageBase: "/media/images/item/",
    navIconBase: "/media/images/zhujiemian/"
}, withAssetVersion = window.withAssetVersion || (e => e), DISABLE_ZOOM_MAP_IDS = new Set([ 99, 104, 106, 10401, 10511, 10141, 10712 ]), state = {
    mapIndex: null,
    subregions: [],
    placingIndex: null,
    placingIndexPromise: null,
    placingFiles: new Map,
    placingFilePromises: new Map,
    monsterSpawns: null,
    monsterSpawnsPromise: null,
    markedMapIds: null,
    openWorldCenters: new Set,
    allowedMapIds: new Set,
    picResToAllowed: new Map,
    currentCenterSceneId: null,
    selectedSubregionId: null,
    enabledFiles: new Set,
    collectedChests: readStoredChestKeys(),
    hideCollectedChests: readStoredBoolean(HIDE_CHECKED_CHESTS_STORAGE_KEY),
    useMonsterPortraits: readStoredBoolean(MONSTER_PORTRAITS_STORAGE_KEY),
    showMonsterPortraitLabels: readStoredBoolean(MONSTER_PORTRAIT_LABELS_STORAGE_KEY, !0),
    completedQuestIdsByType: readStoredQuestIds(),
    currentMarkers: [],
    mapRenderToken: 0
}, el = {
    mapSelect: document.getElementById("map-select"),
    mapShell: document.getElementById("map-shell"),
    mapStage: document.getElementById("map-stage"),
    mapImg: document.getElementById("map-img"),
    subregionsSvg: document.getElementById("subregions-svg"),
    markersLayer: document.getElementById("markers-layer"),
    zoomReset: document.getElementById("zoom-reset"),
    markTypeRow: document.getElementById("mark-type-row"),
    count: document.getElementById("map-count"),
    questModal: document.getElementById("map-quest-modal"),
    questModalTitle: document.getElementById("map-quest-modal-title"),
    questModalContent: document.getElementById("map-quest-modal-content"),
    hideCheckedChests: document.getElementById("hide-checked-chests"),
    monsterPortraits: document.getElementById("use-monster-portraits"),
    monsterPortraitLabels: document.getElementById("show-monster-portrait-labels")
};

function applyStaticText() {
    const e = document.querySelector(".header-title");
    e && (e.textContent = MAP_TEXT.mapTitle);
    const t = document.querySelector('label[for="map-select"]');
    t && (t.textContent = MAP_TEXT.mapLabel);
    const n = document.getElementById("zoom-reset");
    n && (n.textContent = MAP_TEXT.resetZoom);
    const a = document.querySelector("[data-map-filters-title]");
    a && (a.textContent = MAP_TEXT.filters);
    const o = document.querySelector("[data-map-options-title]");
    o && (o.textContent = MAP_TEXT.options);
    const r = document.querySelector("[data-map-hide-checked-label]");
    r && (r.textContent = MAP_TEXT.hideChecked), el.hideCheckedChests && (el.hideCheckedChests.checked = state.hideCollectedChests, el.hideCheckedChests.setAttribute("aria-label", MAP_TEXT.hideChecked));
    const s = document.querySelector("[data-map-monster-portraits-label]");
    s && (s.textContent = MAP_TEXT.monsterPortraits), el.monsterPortraits && (el.monsterPortraits.checked = state.useMonsterPortraits, el.monsterPortraits.setAttribute("aria-label", MAP_TEXT.monsterPortraits));
    const i = document.querySelector("[data-map-monster-portrait-labels-label]");
    i && (i.textContent = MAP_TEXT.showMonsterPortraitLabels), syncMonsterPortraitLabelToggle();
    const l = document.getElementById("map-quest-modal-title");
    l && (l.textContent = MAP_TEXT.questDetails), document.querySelectorAll("[data-map-quest-modal-close]").forEach(e => {
        e.setAttribute("aria-label", MAP_TEXT.closeLabel);
    });
}

function bindHideCheckedToggle() {
    if (!el.hideCheckedChests) return;
    el.hideCheckedChests.checked = state.hideCollectedChests, el.hideCheckedChests.addEventListener("change", () => {
        state.hideCollectedChests = el.hideCheckedChests.checked, writeStoredBoolean(HIDE_CHECKED_CHESTS_STORAGE_KEY, state.hideCollectedChests), refreshCheckedVisibility();
    });
}

function bindMonsterPortraitsToggle() {
    if (!el.monsterPortraits) return;
    el.monsterPortraits.checked = state.useMonsterPortraits, el.monsterPortraits.addEventListener("change", () => {
        state.useMonsterPortraits = el.monsterPortraits.checked, writeStoredBoolean(MONSTER_PORTRAITS_STORAGE_KEY, state.useMonsterPortraits), syncMonsterPortraitLabelToggle(), renderMarkers();
    });
}

function syncMonsterPortraitLabelToggle() {
    if (!el.monsterPortraitLabels) return;
    el.monsterPortraitLabels.checked = state.showMonsterPortraitLabels, el.monsterPortraitLabels.disabled = !state.useMonsterPortraits, el.monsterPortraitLabels.setAttribute("aria-label", MAP_TEXT.showMonsterPortraitLabels);
}

function bindMonsterPortraitLabelsToggle() {
    if (!el.monsterPortraitLabels) return;
    syncMonsterPortraitLabelToggle(), el.monsterPortraitLabels.addEventListener("change", () => {
        state.showMonsterPortraitLabels = el.monsterPortraitLabels.checked, writeStoredBoolean(MONSTER_PORTRAIT_LABELS_STORAGE_KEY, state.showMonsterPortraitLabels), renderMarkers();
    });
}

function getMonsterFamilyLabel(e) {
    return MAP_TEXT.monsterFamilyLabels?.[e] || "";
}

let stageBaseScale = 1, stageZoomScale = 1, stageTx = 0, stageTy = 0, initialUrlState = null, panPointerId = null, panStartClientX = 0, panStartClientY = 0, panStartTx = 0, panStartTy = 0, panMoved = !1, suppressNextMapClick = !1, touchPointers = new Map, pinchActive = !1, pinchStartDistance = 0, pinchStartZoom = 1, pinchStartNaturalX = 0, pinchStartNaturalY = 0, pinchStartCenterClientX = 0, pinchStartCenterClientY = 0;
let questModalReturnFocus = null;

function applyHeaderIcons() {
    document.querySelectorAll("img[data-icon-name]").forEach(e => {
        const t = e.getAttribute("data-icon-name");
        t && (e.src = `${CONFIG.navIconBase}${t}.webp`);
    });
}

function escapeHtml(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

async function loadJson(e) {
    let t = await fetch(withAssetVersion(e));
    if (!t.ok && "string" == typeof e) {
        const n = e.replace(/_en-US\.json$/i, "_zh-TW.json").replace(/_zh-CN\.json$/i, "_zh-TW.json").replace(/_th-TH\.json$/i, "_zh-TW.json");
        n !== e && (t = await fetch(withAssetVersion(n)));
    }
    if (!t.ok) throw new Error(`Failed to load ${e}: ${t.status}`);
    return t.json();
}

function setStageTransform(e, t, n) {
    const a = clampStageTransform(e, t, n);
    stageTx = a.tx, stageTy = a.ty, stageZoomScale = a.zoom;
    const r = stageBaseScale * stageZoomScale;
    el.mapStage.style.transform = `translate(${stageTx}px, ${stageTy}px) scale(${r})`;
}

function clampStageTransform(e, t, n) {
    const a = el.mapImg.naturalWidth || 2048, r = el.mapImg.naturalHeight || 2048, s = el.mapShell.clientWidth || 900, i = el.mapShell.clientHeight || 900, o = stageBaseScale * n, l = a * o, c = r * o;
    let u, m, p, d;
    l <= s ? u = m = (s - l) / 2 : (u = s - l, m = 0), c <= i ? p = d = (i - c) / 2 : (p = i - c, 
    d = 0);
    const g = (e, t, n) => Math.max(t, Math.min(n, e));
    return {
        tx: g(e, u, m),
        ty: g(t, p, d),
        zoom: n
    };
}

function zoomToBBox(e, t, n, a) {
    const r = el.mapImg.naturalWidth || 2048, s = el.mapImg.naturalHeight || 2048;
    e = Math.max(0, Math.min(r, e)), t = Math.max(0, Math.min(s, t)), n = Math.max(0, Math.min(r, n)), 
    a = Math.max(0, Math.min(s, a));
    const i = Math.max(1, n - e), o = Math.max(1, a - t), l = el.mapShell.clientWidth || 900, c = el.mapShell.clientHeight || 900, u = Math.min(l / (i * stageBaseScale), c / (o * stageBaseScale)), m = Math.max(3, Math.min(9, u)), p = stageBaseScale * m;
    setStageTransform(l / 2 - (e + i / 2) * p, c / 2 - (t + o / 2) * p, m), refreshSubregionSelection(), 
    zoomResetEnabled(!0);
}

function computeStageBaseScale() {
    const e = el.mapImg.naturalWidth || 2048, t = el.mapImg.naturalHeight || 2048, n = el.mapShell.clientWidth || 900;
    stageBaseScale = n / e, el.mapShell.style.height = `${Math.round(t * stageBaseScale)}px`, 
    el.mapStage.style.width = `${e}px`, el.mapStage.style.height = `${t}px`, setStageTransform(stageTx, stageTy, stageZoomScale);
}

function getMapCfg(e) {
    return state.mapIndex?.map_configs && (state.mapIndex.map_configs[String(e)] || state.mapIndex.map_configs[e]) || null;
}

function worldXZToNaturalPixels(e, t, n, a, r) {
    if (!e?.scene_center_xz || !e?.scene_extent_xz) return null;
    const s = e.scene_center_xz[0] - e.scene_extent_xz[0] / 2, i = e.scene_center_xz[1] - e.scene_extent_xz[1] / 2;
    return {
        x: (a - s) * (t / e.scene_extent_xz[0]),
        y: n - (r - i) * (n / e.scene_extent_xz[1])
    };
}

function clampZoom(e) {
    return Math.max(1, Math.min(9, e));
}

function isCompactMarkerIcon(e) {
    return "icon_monster_head_qicaixieebaoxiang_01" === e;
}

function zoomAtClientPoint(e, t, n) {
    const a = el.mapShell.getBoundingClientRect(), r = Math.max(0, Math.min(a.width, e - a.left)), s = Math.max(0, Math.min(a.height, t - a.top)), i = stageBaseScale * stageZoomScale, o = (r - stageTx) / i, l = (s - stageTy) / i, c = clampZoom(stageZoomScale * (n > 0 ? 1 / 1.12 : 1.12));
    if (c === stageZoomScale) return;
    const u = stageBaseScale * c;
    setStageTransform(r - o * u, s - l * u, c), zoomResetEnabled(1 !== c), updateUrlState();
}

function canStartMapPan(e) {
    // Don't initiate pan/pointer-capture on clickable quest/chest markers:
    // doing so redirects the pointer stream to mapShell before their click.
    return !(!e || e.target?.closest?.(".map-zoom-reset") || e.target?.closest?.(".map-marker-quest, .map-marker-chest") || null != e.button && 0 !== e.button && "touch" !== e.pointerType);
}

function rememberTouchPointer(e) {
    "touch" === e?.pointerType && null != e.pointerId && touchPointers.set(e.pointerId, {
        pointerId: e.pointerId,
        clientX: e.clientX,
        clientY: e.clientY
    });
}

function forgetTouchPointer(e) {
    "touch" === e?.pointerType && null != e.pointerId && touchPointers.delete(e.pointerId);
}

function getActiveTouchPoints() {
    return Array.from(touchPointers.values()).sort((e, t) => e.pointerId - t.pointerId);
}

function captureMapPointer(e) {
    if (null != e && "function" == typeof el.mapShell.setPointerCapture) try {
        el.mapShell.setPointerCapture(e);
    } catch (e) {}
}

function releaseMapPointer(e) {
    if (null != e && "function" == typeof el.mapShell.releasePointerCapture) try {
        el.mapShell.releasePointerCapture(e);
    } catch (e) {}
}

function beginTouchPinch() {
    const e = getActiveTouchPoints();
    if (e.length < 2) return !1;
    const [t, n] = e, a = el.mapShell.getBoundingClientRect(), r = (t.clientX + n.clientX) / 2, s = (t.clientY + n.clientY) / 2, i = Math.max(0, Math.min(a.width, r - a.left)), o = Math.max(0, Math.min(a.height, s - a.top)), l = stageBaseScale * stageZoomScale;
    return pinchActive = !0, pinchStartDistance = Math.max(1, Math.hypot(t.clientX - n.clientX, t.clientY - n.clientY)), 
    pinchStartZoom = stageZoomScale, pinchStartNaturalX = (i - stageTx) / l, pinchStartNaturalY = (o - stageTy) / l, 
    pinchStartCenterClientX = r, pinchStartCenterClientY = s, panPointerId = null, el.mapShell.dataset.dragging = "true", 
    !0;
}

function updateTouchPinch() {
    const e = getActiveTouchPoints();
    if (e.length < 2 || !pinchActive) return;
    const [t, n] = e, a = el.mapShell.getBoundingClientRect(), r = (t.clientX + n.clientX) / 2, s = (t.clientY + n.clientY) / 2, i = Math.max(0, Math.min(a.width, r - a.left)), o = Math.max(0, Math.min(a.height, s - a.top)), l = Math.max(1, Math.hypot(t.clientX - n.clientX, t.clientY - n.clientY)), c = clampZoom(pinchStartZoom * (l / pinchStartDistance)), u = stageBaseScale * c, m = i - pinchStartNaturalX * u, p = o - pinchStartNaturalY * u;
    !panMoved && (Math.abs(l - pinchStartDistance) >= 4 || Math.hypot(r - pinchStartCenterClientX, s - pinchStartCenterClientY) >= 4) && (panMoved = !0, 
    suppressNextMapClick = !0), setStageTransform(m, p, c), zoomResetEnabled(1 !== c);
}

function beginMapPan(e) {
    if (!canStartMapPan(e)) {
        // A marker tap must not inherit click suppression from the previous map drag.
        suppressNextMapClick = !1;
        return;
    }
    "touch" === e.pointerType && (rememberTouchPointer(e), captureMapPointer(e.pointerId),
    touchPointers.size >= 2) ? beginTouchPinch() : (suppressNextMapClick = !1, panPointerId = e.pointerId,
    panStartClientX = e.clientX, panStartClientY = e.clientY, panStartTx = stageTx,
    panStartTy = stageTy, panMoved = !1, el.mapShell.dataset.dragging = "true", captureMapPointer(e.pointerId));
}

function updateMapPan(e) {
    if ("touch" === e.pointerType && rememberTouchPointer(e), pinchActive) return void ("touch" === e.pointerType && (e.preventDefault(), 
    updateTouchPinch()));
    if (null == panPointerId || e.pointerId !== panPointerId) return;
    const t = e.clientX - panStartClientX, n = e.clientY - panStartClientY;
    !panMoved && (Math.abs(t) >= 3 || Math.abs(n) >= 3) && (panMoved = !0, suppressNextMapClick = !0), 
    panMoved && (e.preventDefault(), setStageTransform(panStartTx + t, panStartTy + n, stageZoomScale));
}

function endMapPan(e) {
    const t = e?.pointerId;
    if (null != t && releaseMapPointer(t), "touch" === e?.pointerType && forgetTouchPointer(e), 
    pinchActive) {
        if (touchPointers.size >= 2) return void beginTouchPinch();
        if (pinchActive = !1, 1 === touchPointers.size) {
            const [e] = getActiveTouchPoints();
            return panPointerId = e.pointerId, panStartClientX = e.clientX, panStartClientY = e.clientY, 
            panStartTx = stageTx, panStartTy = stageTy, void (el.mapShell.dataset.dragging = "true");
        }
        return panPointerId = null, el.mapShell.dataset.dragging = "false", panMoved && updateUrlState(), 
        void (panMoved = !1);
    }
    null != panPointerId && (null != t && t !== panPointerId || (panPointerId = null, 
    el.mapShell.dataset.dragging = "false", panMoved && updateUrlState(), panMoved = !1));
}

function cancelAllMapPan() {
    null != panPointerId && releaseMapPointer(panPointerId);
    for (const e of touchPointers.keys()) releaseMapPointer(e);
    touchPointers = new Map, pinchActive = !1, panPointerId = null, el.mapShell.dataset.dragging = "false", 
    panMoved = !1;
}

function getMapBBoxFromConfig(e, t, n) {
    const a = getMapCfg(e);
    if (!a?.scene_center_xz || !a?.scene_extent_xz) return null;
    const r = a.scene_center_xz[0], s = a.scene_center_xz[1], i = a.scene_extent_xz[0] / 2, o = a.scene_extent_xz[1] / 2, l = [ worldXZToNaturalPixels(a, t, n, r - i, s - o), worldXZToNaturalPixels(a, t, n, r + i, s - o), worldXZToNaturalPixels(a, t, n, r - i, s + o), worldXZToNaturalPixels(a, t, n, r + i, s + o) ].filter(Boolean);
    if (4 !== l.length) return null;
    let c = 1 / 0, u = 1 / 0, m = -1 / 0, p = -1 / 0;
    for (const e of l) c = Math.min(c, e.x), u = Math.min(u, e.y), m = Math.max(m, e.x), 
    p = Math.max(p, e.y);
    return {
        minX: c,
        minY: u,
        maxX: m,
        maxY: p,
        cfg: a
    };
}

function getMarkerBBoxForRegion(e) {
    const t = state.currentMarkers.filter(t => Number(t.mapRegionId) === e);
    if (!t.length) return null;
    let n = 1 / 0, a = 1 / 0, r = -1 / 0, s = -1 / 0;
    for (const e of t) n = Math.min(n, e.x), a = Math.min(a, e.y), r = Math.max(r, e.x), 
    s = Math.max(s, e.y);
    return {
        minX: n,
        minY: a,
        maxX: r,
        maxY: s,
        count: t.length
    };
}

function getPolygonBBox(e, t, n) {
    if (!e?.polygons?.length) return null;
    let a = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
    const o = e => ({
        x: e.x + t / 2,
        y: n / 2 - e.y
    });
    for (const t of e.polygons) for (const e of t) {
        const t = o(e);
        a = Math.min(a, t.x), r = Math.min(r, t.y), s = Math.max(s, t.x), i = Math.max(i, t.y);
    }
    return Number.isFinite(a) ? {
        minX: a,
        minY: r,
        maxX: s,
        maxY: i
    } : null;
}

function getSinglePolyBBox(e, t, n) {
    if (!Array.isArray(e) || 0 === e.length) return null;
    let a = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
    const o = e => ({
        x: e.x + t / 2,
        y: n / 2 - e.y
    });
    for (const t of e) {
        const e = o(t);
        a = Math.min(a, e.x), r = Math.min(r, e.y), s = Math.max(s, e.x), i = Math.max(i, e.y);
    }
    return Number.isFinite(a) ? {
        minX: a,
        minY: r,
        maxX: s,
        maxY: i
    } : null;
}

function polyPointsToPath(e, t, n) {
    if (!e || !e.length) return "";
    const a = e => ({
        x: e.x + t / 2,
        y: n / 2 - e.y
    }), r = a(e[0]);
    let s = `M ${r.x} ${r.y}`;
    for (let t = 1; t < e.length; t++) {
        const n = a(e[t]);
        s += ` L ${n.x} ${n.y}`;
    }
    return s += " Z", s;
}

function clearNode(e) {
    for (;e.firstChild; ) e.removeChild(e.firstChild);
}

function clearMapOverlays() {
    clearNode(el.subregionsSvg), clearNode(el.markersLayer);
}

function refreshSubregionSelection() {
    el.subregionsSvg.querySelectorAll(".map-subregion-path").forEach(e => {
        const t = Number(e.dataset.mapId) === state.selectedSubregionId;
        e.classList.toggle("selected", t);
    });
}

function zoomResetEnabled(e) {
    el.zoomReset.style.display = e ? "inline-flex" : "none";
}

function zoomToSubregion(e) {
    const t = el.mapImg.naturalWidth || 2048, n = el.mapImg.naturalHeight || 2048, a = state.subregions.find(t => t.map_id === e);
    if (a?.polygons?.length) {
        let e = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
        const o = e => ({
            x: e.x + t / 2,
            y: n / 2 - e.y
        });
        for (const t of a.polygons) for (const n of t) {
            const t = o(n);
            e = Math.min(e, t.x), r = Math.min(r, t.y), s = Math.max(s, t.x), i = Math.max(i, t.y);
        }
        const l = 40;
        return e = Math.max(0, e - l), r = Math.max(0, r - l), s = Math.min(t, s + l), i = Math.min(n, i + l), 
        zoomToBBox(e, r, s, i), void updateUrlState();
    }
    const r = getMarkerBBoxForRegion(e);
    r && (zoomToMarkerBox(r, t, n), updateUrlState());
}

function zoomToMarkerBox(e, t, n) {
    let {minX: a, minY: r, maxX: s, maxY: i} = e;
    const o = 160;
    if (s - a < o) {
        const e = (o - (s - a)) / 2;
        a -= e, s += e;
    }
    if (i - r < o) {
        const e = (o - (i - r)) / 2;
        r -= e, i += e;
    }
    a = Math.max(0, a - 80), r = Math.max(0, r - 80), s = Math.min(t, s + 80), i = Math.min(n, i + 80), 
    zoomToBBox(a, r, s, i);
}

function resetZoom() {
    state.selectedSubregionId = null, setStageTransform(0, 0, 1), refreshSubregionSelection(), 
    zoomResetEnabled(!1), updateUrlState();
}

function isOpenWorldMap(e) {
    return state.openWorldCenters?.has(Number(e));
}

function getOpenWorldPrefix(e) {
    const t = String(e ?? "");
    return t.length >= 5 ? t.slice(0, -1) : t;
}

function getPicResId(e) {
    if ("string" != typeof e) return null;
    const t = e.match(/(\d+)/);
    if (!t) return null;
    const n = Number(t[1]);
    return Number.isFinite(n) ? n : null;
}

function isRelevantMapRegionId(e) {
    const t = Number(e);
    if (!Number.isFinite(t) || null == state.currentCenterSceneId) return !1;
    const n = Number(state.currentCenterSceneId);
    if (!Number.isFinite(n)) return !1;
    if (!isOpenWorldMap(n)) return !0;
    const a = getMapCfg(n), r = getMapCfg(t);
    if (a?.pic_res) {
        const e = getPicResId(a.pic_res);
        if (Number.isFinite(e) && t === e) return !0;
    }
    if (a && r && a.pic_res && r.pic_res && a.pic_res === r.pic_res) return !0;
    if (!a || !r) return !1;
    const s = getOpenWorldPrefix(n);
    return String(t).startsWith(s);
}

function getRelevantMapIdsForCurrentView(e = state.currentCenterSceneId) {
    const t = Number(e), n = new Set;
    if (!Number.isFinite(t)) return n;
    n.add(t);
    const a = getMapCfg(t), r = a?.pic_res;
    if (!a) return n;
    const s = getPicResId(r);
    Number.isFinite(s) && n.add(s);
    if (!isOpenWorldMap(t)) return n;
    const i = getOpenWorldPrefix(t);
    for (const [e, t] of Object.entries(state.mapIndex?.map_configs || {})) {
        const a = Number(t?.map_id ?? e);
        Number.isFinite(a) && a > 0 && (String(a).startsWith(i) || r && t?.pic_res === r) && n.add(a);
    }
    return n;
}

function getItemMapCfgMatch(e, t) {
    if (!e || !t?.pic_res) return null;
    const n = getMapCfg(e.mapRegionId);
    if (n && n.pic_res && n.pic_res === t.pic_res) return n;
    const a = getPicResId(t.pic_res), r = Number(e.mapRegionId), s = Number(e.sceneId);
    return !Number.isFinite(a) || a !== r && a !== s ? null : t;
}

function isRwType(e) {
    return "string" == typeof e && e.startsWith("icon_map_mark_rw");
}

function getQuestGroupId(e) {
    if (!e) return null;
    if (Number.isFinite(e.questGroupId)) return Number(e.questGroupId);
    if (e.quest && Number.isFinite(e.quest.groupId)) return Number(e.quest.groupId);
    const t = Array.isArray(e.questGroupIds) ? e.questGroupIds : [];
    return t.length && Number.isFinite(t[0]) ? Number(t[0]) : null;
}

function hasQuestData(e) {
    return !!(e && (e.quest || Array.isArray(e.questList) && e.questList.length || Array.isArray(e.questGroupIds) && e.questGroupIds.length));
}

function isRwChainStart(e) {
    return !(!e || !hasQuestData(e) || !1 === e.isInitialQuest || !e.markIcon || "icon_map_mark_rw" !== e.markIcon);
}

function pickRwPrimaryItems(e) {
    const t = new Map;
    for (const n of e) {
        if (!hasQuestData(n)) continue;
        const e = getQuestGroupId(n);
        if (!Number.isFinite(e)) continue;
        const a = t.get(e) || [];
        a.push(n), t.set(e, a);
    }
    const n = [];
    for (const e of t.values()) {
        const t = e.filter(e => isRwChainStart(e));
        t.length && n.push(...t);
    }
    return n;
}

function selectRwItems(e) {
    const t = e.filter(e => hasQuestData(e)), n = new Map;
    for (const e of t) {
        const t = Number(e?.mapRegionId);
        if (!Number.isFinite(t)) continue;
        const a = n.get(t) || [];
        a.push(e), n.set(t, a);
    }
    const a = [];
    for (const e of n.values()) a.push(...pickRwPrimaryItems(e));
    return a;
}

function getMarkLabel(e) {
    if (!e) return null;
    if (isRwType(e.typeIcon)) return MAP_TEXT.questMarkType;
    if (e.infoType) {
        const t = String(e.infoType).trim();
        if (!t) return null;
        const n = t.toLowerCase();
        return "任務標記" === n || "任务标记" === n || "quest mark" === n ? MAP_TEXT.questMarkType : t;
    }
    return null;
}

function renderSubregions() {
    clearNode(el.subregionsSvg);
    const e = el.mapImg.naturalWidth || 2048, t = el.mapImg.naturalHeight || 2048;
    el.subregionsSvg.setAttribute("viewBox", `0 0 ${e} ${t}`), el.subregionsSvg.setAttribute("width", `${e}`), 
    el.subregionsSvg.setAttribute("height", `${t}`), el.mapShell.dataset.subregionMode = "none", 
    refreshSubregionSelection();
}

function renderVirtualSubregionsFromMarkers(e) {
    const t = el.subregionsSvg;
    if (!t) return;
    t.querySelectorAll(".map-subregion-path.virtual").forEach(e => e.remove());
    const n = el.mapShell.dataset.subregionMode || "none";
    if ("none" === n) return;
    if ("single" === n) return;
    const a = el.mapImg.naturalWidth || 2048, r = el.mapImg.naturalHeight || 2048, s = new Map;
    for (const t of e || []) {
        const e = Number(t.mapRegionId);
        if (!isRelevantMapRegionId(e)) continue;
        const n = s.get(e) || {
            minX: 1 / 0,
            minY: 1 / 0,
            maxX: -1 / 0,
            maxY: -1 / 0,
            count: 0
        };
        n.minX = Math.min(n.minX, t.x), n.minY = Math.min(n.minY, t.y), n.maxX = Math.max(n.maxX, t.x), 
        n.maxY = Math.max(n.maxY, t.y), n.count += 1, s.set(e, n);
    }
    const i = new Set(state.subregions.filter(e => e?.polygons?.length).map(e => Number(e.map_id))), o = [], l = getMapCfg(state.currentCenterSceneId), c = (e, t) => {
        const n = Math.max(e.minX, t.minX), a = Math.max(e.minY, t.minY), r = Math.min(e.maxX, t.maxX), s = Math.min(e.maxY, t.maxY);
        if (r <= n || s <= a) return 0;
        const i = (r - n) * (s - a);
        return i / ((e.maxX - e.minX) * (e.maxY - e.minY) + (t.maxX - t.minX) * (t.maxY - t.minY) - i);
    };
    for (const [e, t] of s.entries()) {
        if (i.has(e) && "virtual" !== n) continue;
        const s = getMapBBoxFromConfig(e, a, r);
        if (!s && t.count < 2) continue;
        let l = !1;
        const u = s ? {
            minX: s.minX,
            minY: s.minY,
            maxX: s.maxX,
            maxY: s.maxY,
            count: t.count,
            name: s.cfg?.name
        } : {
            minX: t.minX,
            minY: t.minY,
            maxX: t.maxX,
            maxY: t.maxY,
            count: t.count,
            name: getMapCfg(e)?.name
        };
        for (const t of o) if (c(u, t) >= .82) {
            t.minX = Math.min(t.minX, u.minX), t.minY = Math.min(t.minY, u.minY), t.maxX = Math.max(t.maxX, u.maxX), 
            t.maxY = Math.max(t.maxY, u.maxY), t.count += u.count, t.ids.push(e), l = !0;
            break;
        }
        l || o.push({
            ids: [ e ],
            minX: u.minX,
            minY: u.minY,
            maxX: u.maxX,
            maxY: u.maxY,
            count: u.count,
            name: u.name || `Region ${e}`
        });
    }
    for (const e of o) {
        const n = 50, a = e.minX - n, r = e.minY - n, s = e.maxX + n, i = e.maxY + n, o = `M ${a} ${r} L ${s} ${r} L ${s} ${i} L ${a} ${i} Z`, c = document.createElementNS("http://www.w3.org/2000/svg", "path");
        c.setAttribute("d", o), c.classList.add("map-subregion-path", "virtual");
        const u = e.ids.includes(Number(state.currentCenterSceneId)) ? Number(state.currentCenterSceneId) : e.ids[0];
        c.dataset.mapId = String(u);
        const m = e.ids.length > 1 && l?.name ? l.name : e.name;
        c.setAttribute("title", `${m}`), c.addEventListener("click", e => {
            e.preventDefault(), state.selectedSubregionId = u, zoomToBBox(a, r, s, i), updateUrlState();
        }), t.appendChild(c);
    }
    refreshSubregionSelection();
}

function buildFilterChip({file: e, icon: t, label: n, count: a}) {
    if (!t || "null" === t) return null;
    const r = document.createElement("button");
    return r.type = "button", r.className = "map-filter-chip", r.dataset.file = e, r.setAttribute("aria-pressed", "true"), 
    r.innerHTML = `\n        <span class="map-filter-chip-icon">\n            <img src="${CONFIG.markImageBase}${t}.webp" alt="">\n        </span>\n        <span class="map-filter-chip-text">\n            <span class="map-filter-chip-label">${escapeHtml(n)}</span>\n            <span class="map-filter-chip-count">${escapeHtml(String(a))}</span>\n        </span>\n    `, 
    r.addEventListener("click", () => {
        state.enabledFiles.has(e) ? (state.enabledFiles.delete(e), r.classList.remove("selected"), 
        r.setAttribute("aria-pressed", "false")) : (state.enabledFiles.add(e), r.classList.add("selected"), 
        r.setAttribute("aria-pressed", "true")), renderMarkers();
    }), r.classList.add("selected"), r;
}

function normalizeText(e) {
    return String(e || "").toLowerCase();
}

function isPlacingIndexEntryVisible(e) {
    return Boolean(e?.infoType || e?.infoTypeEn || isRwType(e?.typeIcon));
}

function markerMatchesSearch(e) {
    return !0;
}

function getMarkerCoverage(e, t, n) {
    if (!e || e.length < 2) return null;
    let a = 1 / 0, r = 1 / 0, s = -1 / 0, i = -1 / 0;
    for (const t of e) Number.isFinite(t.x) && Number.isFinite(t.y) && (a = Math.min(a, t.x), 
    r = Math.min(r, t.y), s = Math.max(s, t.x), i = Math.max(i, t.y));
    return Number.isFinite(a) && Number.isFinite(s) ? Math.max(1, (s - a) * (i - r)) / (t * n) : null;
}

function shouldUseVirtualMarkers(e, t, n) {
    if (!e || e.length < 3) return !1;
    if (new Set(e.map(e => Number(e.mapRegionId)).filter(e => Number.isFinite(e) && e > 0)).size > 1) return !0;
    const a = getMarkerCoverage(e, t, n);
    return null != a && a < .45 && e.length >= 6;
}

function formatRewardText(e) {
    return "";
}

function renderRewardFilterChips(e) {}

function getQuestRewardItems(e) {
    const t = e?.quest || null, n = Array.isArray(t?.rewardItems) ? t.rewardItems : Array.isArray(e?.rewardItems) ? e.rewardItems : [];
    return n.filter(e => e?.icon);
}

function appendQuestRequirements(e) {
    const t = e?.quest?.requirements || e?.jdRequirements || e?.cookingRequirements;
    if (!el.questModalContent || !t || "object" != typeof t) return;
    const n = [], a = (e, t) => Array.isArray(e) ? e.map(e => Array.isArray(e) && Number.isInteger(e[0]) && "string" == typeof e[1] && e[1] ? t(e[0], e[1]) : "").filter(Boolean) : [], r = a(t.quests, (e, t) => MAP_TEXT.questCompleted(e, t)), s = a(t.oneOfQuests, (e, t) => MAP_TEXT.questCompleted(e, t)), d = a(t.submittedQuests, (e, t) => MAP_TEXT.questSubmitted(e, t));
    r.forEach(e => n.push(e)), s.length && n.push(MAP_TEXT.oneOfQuestsCompleted(s.join(" / "))), d.forEach(e => n.push(e)), Number.isInteger(t.baseLevel) && t.baseLevel > 1 && n.push(MAP_TEXT.baseLevelRequirement(t.baseLevel)), Number.isInteger(t.jobLevel) && t.jobLevel > 1 && n.push(MAP_TEXT.jobLevelRequirement(t.jobLevel));
    if (!n.length) return;
    const i = document.createElement("section"), o = document.createElement("div"), l = document.createElement("ul");
    i.className = "map-quest-modal-requirements", o.className = "map-quest-modal-label", o.textContent = MAP_TEXT.unlockRequirements, l.className = "map-quest-modal-requirement-list";
    for (const e of n) {
        const t = document.createElement("li");
        t.textContent = e, l.appendChild(t);
    }
    i.append(o, l);
    const c = el.questModalContent.querySelector(".map-quest-modal-rewards");
    c ? el.questModalContent.insertBefore(i, c) : el.questModalContent.appendChild(i);
}

function buildQuestModalHtml(e) {
    if (isCookingMarker(e)) return buildCookingModalHtml(e);
    if (isJdMarker(e)) return buildJdModalHtml(e);
    const t = e?.quest || null;
    if (!t) return "";
    const n = getQuestRewardItems(e), a = getMarkLabel(e), r = [];
    e.mapRegionName && r.push(e.mapRegionName), e.sceneName && e.sceneName !== e.mapRegionName && r.push(e.sceneName);
    const s = Number.isFinite(e?.worldX) && Number.isFinite(e?.worldZ) ? `${e.worldX.toFixed(2)}, ${e.worldZ.toFixed(2)}` : "", i = n.length ? '<div class="map-quest-modal-reward-grid">' + n.map(e => { const t = "string" == typeof e?.iconPath && e.iconPath ? escapeHtml(e.iconPath) : CONFIG.itemImageBase + escapeHtml(e.icon) + ".webp", o = Number.isFinite(e.count) ? "x" + e.count : ""; return '\n                <div class="map-quest-modal-reward-item">\n                    <img src="' + t + '" alt="">\n                    <div class="map-quest-modal-reward-count">' + o + "</div>\n                </div>\n            " }).join("") + "</div>" : `<div class="map-quest-modal-reward-empty">${escapeHtml(MAP_TEXT.noRewards)}</div>`;
    return `\n        <div class="map-quest-modal-head">\n            <div class="map-quest-title">${escapeHtml(t.name || MAP_TEXT.questFallback(t.taskId))}</div>\n            <div class="map-quest-modal-desc">${escapeHtml(t.preview || t.finish || "")}</div>\n        </div>\n        <div class="map-quest-modal-meta">\n            ${a ? `\n                <div class="map-quest-modal-row">\n                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.markTypeLabel)}</div>\n                    <div class="map-quest-modal-value">${escapeHtml(a)}</div>\n                </div>\n            ` : ""}\n            ${r.length ? `\n                <div class="map-quest-modal-row">\n                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.locationLabel)}</div>\n                    <div class="map-quest-modal-value">${escapeHtml(r.join(" · "))}</div>\n                </div>\n            ` : ""}\n            ${s ? `\n                <div class="map-quest-modal-row">\n                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.coords)}</div>\n                    <div class="map-quest-modal-value">${escapeHtml(s)}</div>\n                </div>\n            ` : ""}\n        </div>\n        <div class="map-quest-modal-rewards">\n            <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.questRewards)}</div>\n            ${i}\n        </div>\n    `;
}

function closeQuestModal() {
    if (!el.questModal) return;
    const e = document.activeElement, t = questModalReturnFocus;
    if (e && el.questModal.contains(e)) {
        if (t?.isConnected && typeof t.focus === "function") try {
            t.focus({
                preventScroll: !0
            });
        } catch {
            t.focus();
        } else e.blur?.();
    }
    el.questModal.classList.remove("open"), el.questModal.setAttribute("aria-hidden", "true"), questModalReturnFocus = null;
}

function getCookingMarkData(e, t) {
    const n = e?.[t];
    return Array.isArray(n) && Number.isInteger(n[0]) && n[0] > 0 && "string" == typeof n[1] && n[1] ? {
        name: n[1]
    } : null;
}

function isCookingRecipeMarker(e) {
    return !!getCookingMarkData(e, "cookingRecipe");
}

function isCookingStarterMarker(e) {
    return !!getCookingMarkData(e, "cookingStarter");
}

function isCookingMarker(e) {
    return isCookingRecipeMarker(e) || isCookingStarterMarker(e);
}

function buildCookingModalHtml(e) {
    const t = getCookingMarkData(e, "cookingRecipe") || getCookingMarkData(e, "cookingStarter"), n = getMarkLabel(e), a = [], o = isCookingRecipeMarker(e);
    e.mapRegionName && a.push(e.mapRegionName), e.sceneName && e.sceneName !== e.mapRegionName && a.push(e.sceneName);
    const r = Number.isFinite(e?.worldX) && Number.isFinite(e?.worldZ) ? `${e.worldX.toFixed(2)}, ${e.worldZ.toFixed(2)}` : "";
    if (!t) return "";
    return `
        <div class="map-quest-modal-head">
            <div class="map-quest-title">${escapeHtml(o ? MAP_TEXT.recipeUnlocked : t.name)}</div>
        </div>
        <div class="map-quest-modal-meta">
            ${o ? `
                <div class="map-quest-modal-row">
                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.recipeUnlocked)}</div>
                    <div class="map-quest-modal-value">${escapeHtml(t.name)}</div>
                </div>
            ` : ""}
            ${n ? `
                <div class="map-quest-modal-row">
                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.markTypeLabel)}</div>
                    <div class="map-quest-modal-value">${escapeHtml(n)}</div>
                </div>
            ` : ""}
            ${a.length ? `
                <div class="map-quest-modal-row">
                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.locationLabel)}</div>
                    <div class="map-quest-modal-value">${escapeHtml(a.join(" - "))}</div>
                </div>
            ` : ""}
            ${r ? `
                <div class="map-quest-modal-row">
                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.coords)}</div>
                    <div class="map-quest-modal-value">${escapeHtml(r)}</div>
                </div>
            ` : ""}
        </div>
    `;
}

function buildJdModalHtml(e) {
    const t = getMarkLabel(e), n = [];
    e.mapRegionName && n.push(e.mapRegionName), e.sceneName && e.sceneName !== e.mapRegionName && n.push(e.sceneName);
    const a = Number.isFinite(e?.worldX) && Number.isFinite(e?.worldZ) ? `${e.worldX.toFixed(2)}, ${e.worldZ.toFixed(2)}` : "";
    return `\n        <div class="map-quest-modal-head">\n            <div class="map-quest-title">${escapeHtml(t)}</div>\n        </div>\n        <div class="map-quest-modal-meta">\n            ${t ? `\n                <div class="map-quest-modal-row">\n                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.markTypeLabel)}</div>\n                    <div class="map-quest-modal-value">${escapeHtml(t)}</div>\n                </div>\n            ` : ""}\n            ${n.length ? `\n                <div class="map-quest-modal-row">\n                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.locationLabel)}</div>\n                    <div class="map-quest-modal-value">${escapeHtml(n.join(" · "))}</div>\n                </div>\n            ` : ""}\n            ${a ? `\n                <div class="map-quest-modal-row">\n                    <div class="map-quest-modal-label">${escapeHtml(MAP_TEXT.coords)}</div>\n                    <div class="map-quest-modal-value">${escapeHtml(a)}</div>\n                </div>\n            ` : ""}\n        </div>\n    `;
}

function openQuestModal(e) {
    if (!el.questModal || !el.questModalContent) return;
    const t = e?.quest || null, n = isJdMarker(e), a = isCookingMarker(e), r = getCookingMarkData(e, "cookingRecipe") || getCookingMarkData(e, "cookingStarter");
    if (!t && !n && !a) return void closeQuestModal();
    if (!el.questModal.classList.contains("open")) {
        const e = document.activeElement;
        questModalReturnFocus = e && e !== document.body && typeof e.focus === "function" ? e : null;
    }
    el.questModalTitle && (el.questModalTitle.textContent = n ? getMarkLabel(e) : a ? isCookingRecipeMarker(e) ? MAP_TEXT.recipeUnlocked : r?.name || MAP_TEXT.questDetails : t.name || MAP_TEXT.questDetails), 
    el.questModalContent.innerHTML = buildQuestModalHtml(e), appendJdAdjacentMapRows(e), appendQuestRequirements(e), (t || n || isCookingRecipeMarker(e)) && appendQuestCompletionToggle(e), el.questModal.classList.add("open"), 
    el.questModal.setAttribute("aria-hidden", "false");
}

function appendJdAdjacentMapRows(e) {
    const t = getJdAdjacentMaps(e), n = el.questModalContent?.querySelector(".map-quest-modal-meta");
    if (!t || !n) return;
    const a = [];
    t.previous && a.push([MAP_TEXT.previousMap, t.previous]), t.next && a.push([MAP_TEXT.nextMap, t.next]);
    for (const [e, t] of a.reverse()) {
        const a = document.createElement("div"), r = document.createElement("div"), s = document.createElement("div");
        a.className = "map-quest-modal-row", r.className = "map-quest-modal-label", s.className = "map-quest-modal-value", r.textContent = e, s.textContent = t, a.append(r, s), n.prepend(a);
    }
}

function bindQuestModal() {
    document.querySelectorAll("[data-map-quest-modal-close]").forEach(e => {
        e.addEventListener("click", closeQuestModal);
    }), document.addEventListener("keydown", e => {
        "Escape" === e.key && el.questModal?.classList.contains("open") && closeQuestModal();
    });
}

function clearQuestDetails() {
    closeQuestModal();
}

function isRwMarker(e) {
    return "icon_map_mark_rw" === e?.icon || "icon_map_mark_rw" === e?.markIcon;
}

function isJdMarker(e, t = e?.file) {
    return "jd" === normalizeChestStorageType(t);
}

function getJdChain(e) {
    const t = e?.jdChain;
    if (!Array.isArray(t) || (2 !== t.length && 3 !== t.length)) return null;
    const n = Number(t[0]), a = Number(t[1]), r = Number(t[2]);
    return Number.isInteger(n) && n > 0 && Number.isInteger(a) && a > 0 ? {
        id: n,
        step: a,
        total: Number.isInteger(r) && r >= a ? r : null
    } : null;
}

function getJdAdjacentMaps(e) {
    const t = e?.jdAdjacentMaps;
    if (!Array.isArray(t) || 2 !== t.length) return null;
    const n = "string" == typeof t[0] && t[0].trim() ? t[0] : null, a = "string" == typeof t[1] && t[1].trim() ? t[1] : null;
    return n || a ? {
        previous: n,
        next: a
    } : null;
}

function getJdChainColors(e) {
    const t = new Map;
    const n = state.placingFiles.get("jd.json"), a = n?.data ? Object.values(n.data).flat() : e;
    for (const n of a) {
        const e = getJdChain(n);
        e && t.set(e.id, Math.max(t.get(e.id) || 0, e.step));
    }
    const r = [ ...t.keys() ].sort((e, t) => e - t), s = new Map;
    return r.forEach((e, n) => {
        s.set(e, {
            color: `hsl(${Math.round(n * 137.508) % 360} 82% 50%)`,
            total: t.get(e)
        });
    }), s;
}

const CHEST_MARKER_FILES = new Set([ "expl_chest", "guard_chest", "monster_chest", "mystery_chest", "strange_chest" ]);

function isChestMarker(e, t = e?.file) {
    const n = String(t || "").split(/[\\/]/).pop().replace(/\.json$/i, "").toLowerCase();
    return CHEST_MARKER_FILES.has(n);
}

function getChestMarkerKey(e, t = e?.file) {
    return isChestMarker(e, t) && null != e.id ? `${t}:${e.id}` : null;
}

function isCollectedChestHidden(e, t) {
    const n = getChestMarkerKey(e, t);
    return state.hideCollectedChests && !!n && state.collectedChests.has(n);
}

function isCompletedQuestHidden(e, t) {
    return state.hideCollectedChests && isQuestCompleted(e, t);
}

function isCheckedMarkerHidden(e, t) {
    return isCollectedChestHidden(e, t) || isCompletedQuestHidden(e, t);
}

function updateChestMarkerButton(e, t) {
    const n = getChestMarkerKey(e);
    if (!n) return;
    const a = state.collectedChests.has(n), r = e.infoType || "Chest", i = a ? MAP_TEXT.chestCollected : MAP_TEXT.chestNotCollected;
    t.classList.toggle("is-collected", a), t.setAttribute("aria-pressed", a ? "true" : "false"), t.setAttribute("aria-label", `${r}: ${i}`);
}

function toggleChestCollected(e, t) {
    const n = getChestMarkerKey(e);
    if (!n) return;
    state.collectedChests.has(n) ? state.collectedChests.delete(n) : state.collectedChests.add(n), writeStoredChestKeys(state.collectedChests), state.hideCollectedChests ? refreshCheckedVisibility() : updateChestMarkerButton(e, t);
}

function getQuestStorageId(e) {
    const t = Number(e?.quest?.taskId);
    if (Number.isInteger(t) && t > 0) return t;
    const n = Number(e?.cookingRecipe?.[0]);
    if (Number.isInteger(n) && n > 0) return n;
    const a = Number(e?.id);
    return isJdMarker(e) && Number.isInteger(a) && a > 0 ? a : null;
}

function appendQuestCompletionToggle(e) {
    const t = getQuestStorageId(e);
    if (null == t || !el.questModalContent) return;
    const n = document.createElement("label"), a = document.createElement("input"), r = document.createElement("span");
    n.className = "map-quest-completed-toggle", a.type = "checkbox", a.checked = isQuestCompleted(e), r.textContent = MAP_TEXT.markQuestCompleted, a.addEventListener("change", () => {
        setQuestCompleted(e, a.checked);
    }), n.appendChild(a), n.appendChild(r), el.questModalContent.appendChild(n);
}

function updateQuestMarkerButton(e, t) {
    t.classList.toggle("is-completed", isQuestCompleted(e));
}

function isQuestCompleted(e, t) {
    const n = getQuestStorageType(e, t), a = getQuestStorageId(e);
    return null != n && null != a && !!state.completedQuestIdsByType.get(n)?.has(a);
}

function setQuestCompleted(e, t) {
    const n = getQuestStorageType(e), a = getQuestStorageId(e), r = null != n ? state.completedQuestIdsByType.get(n) : null;
    if (null == n || null == a || !r) return;
    t ? r.add(a) : r.delete(a), writeStoredQuestIds(n, r), closeQuestModal(), state.hideCollectedChests ? refreshCheckedVisibility() : renderMarkers();
}

function renderQuestDetails(e, t = !1) {
    // Quest details are shown exclusively via the modal now (the old filter-panel
    // sidebar block was removed). If there's no quest data, just close any open
    // modal. `t` (force-open) is set by marker clicks.
    const n = e?.quest || null;
    if (n || isJdMarker(e) || isCookingMarker(e)) {
        if (t) openQuestModal(e);
    } else clearQuestDetails();
}

function toMarkerItem(e, t, n, a, r, s, i, o) {
    if (!t || !t.pic_res) return null;
    if (!s?.typeIcon || "null" === s.typeIcon) return null;
    const l = Number(e.objectPos?.[0]), c = Number(e.objectPos?.[2]);
    if (!Number.isFinite(l) || !Number.isFinite(c)) return null;
    const u = worldXZToNaturalPixels(n, a, r, l, c);
    return u ? {
        file: i,
        icon: e.markIcon || s.typeIcon,
        markIcon: e.markIcon || null,
        infoType: o || e.infoType,
        mapRegionId: e.mapRegionId,
        mapRegionName: e.mapRegionName,
        sceneName: e.sceneName,
        picRes: t.pic_res,
        x: u.x,
        y: u.y,
        id: e.id,
        triggerId: e.triggerId,
        worldX: l,
        worldY: Number(e.objectPos?.[1]),
        worldZ: c,
        quest: e.quest || null,
        cookingRecipe: e.cookingRecipe || null,
        cookingRequirements: e.cookingRequirements || null,
        cookingStarter: e.cookingStarter || null,
        jdRequirements: e.jdRequirements || (Number.isInteger(e.jdConditionId) ? s?.jdRequirements?.[String(e.jdConditionId)] || null : null),
        jdChain: e.jdChain || null,
        jdAdjacentMaps: e.jdAdjacentMaps || null,
        questGroupIds: e.questGroupIds || null,
        questGroupId: getQuestGroupId(e),
        rewardItems: e.rewardItems || e.quest?.rewardItems || null,
        rewardText: formatRewardText(e)
    } : null;
}

async function ensurePlacingIndex() {
    if (state.placingIndex) return state.placingIndex;
    state.placingIndexPromise || (state.placingIndexPromise = (async () => {
        try {
            return await loadJson(`${CONFIG.placingLocaleDir}_index.json`);
        } catch {
            try {
                return await loadJson(`${CONFIG.placingFallbackDir}_index.json`);
            } catch {
                return [];
            }
        }
    })());
    state.placingIndex = await state.placingIndexPromise;
    return state.placingIndex;
}

async function ensurePlacingFile(e) {
    if (state.placingFiles.has(e)) return state.placingFiles.get(e);
    if (state.placingFilePromises.has(e)) return state.placingFilePromises.get(e);
    const t = (async () => {
        try {
            return await loadJson(`${CONFIG.placingLocaleDir}${e}`);
        } catch {
            return await loadJson(`${CONFIG.placingFallbackDir}${e}`);
        }
    })();
    state.placingFilePromises.set(e, t);
    try {
        const n = await t;
        return state.placingFiles.set(e, n), n;
    } finally {
        state.placingFilePromises.delete(e);
    }
}

async function ensureMonsterSpawns() {
    if (state.monsterSpawns) return state.monsterSpawns;
    state.monsterSpawnsPromise || (state.monsterSpawnsPromise = (async () => {
        try {
            return await loadJson(CONFIG.monsterSpawnsUrl);
        } catch (e) {
            return console.warn("Failed to load map monster spawns:", e), {
                views: {}
            };
        }
    })());
    state.monsterSpawns = await state.monsterSpawnsPromise;
    return state.monsterSpawns;
}

function getCurrentMonsterEntries() {
    if (null == state.currentCenterSceneId) return [];
    const e = state.monsterSpawns?.views?.[String(state.currentCenterSceneId)];
    return Array.isArray(e?.monsters) ? e.monsters : [];
}

async function collectMarkedMapIds() {
    if (state.markedMapIds) return state.markedMapIds;
    const [e, t] = await Promise.all([ ensurePlacingIndex(), ensureMonsterSpawns() ]), n = new Set;
    if (Array.isArray(e)) for (const t of e) {
        if (!t?.file) continue;
        if (!isPlacingIndexEntryVisible(t)) continue;
        for (const e of Array.isArray(t.mapIds) ? t.mapIds : []) {
            const t = Number(e);
            Number.isFinite(t) && t > 0 && n.add(t);
        }
    }
    for (const e of Object.keys(t?.views || {})) {
        const t = Number(e);
        Number.isFinite(t) && t > 0 && n.add(t);
    }
    return state.markedMapIds = n, n;
}

function getRelevantPlacingEntriesForCurrentView(e, t = state.currentCenterSceneId) {
    const n = getRelevantMapIdsForCurrentView(t);
    return Array.isArray(e) ? e.filter(e => {
        if (!e?.file || !isPlacingIndexEntryVisible(e)) return !1;
        const t = Array.isArray(e.mapIds) ? e.mapIds : [];
        return !t.length || t.some(e => n.has(Number(e)));
    }) : [];
}

async function renderMarkTypeFilters(e = state.mapRenderToken, preserveSelection = !1) {
    const disabledFiles = preserveSelection ? new Set(Array.from(el.markTypeRow.querySelectorAll(".map-filter-chip:not(.selected)")).map(e => e.dataset.file)) : null;
    const [t] = await Promise.all([ ensurePlacingIndex(), ensureMonsterSpawns() ]);
    if (e !== state.mapRenderToken) return !1;
    clearNode(el.markTypeRow), state.enabledFiles.clear();
    const n = getMapCfg(state.currentCenterSceneId), a = n?.pic_res;
    if (!a) return !1;
    const r = [], s = await Promise.all(getRelevantPlacingEntriesForCurrentView(t).map(e => ensurePlacingFile(e.file).then(t => ({
        entry: e,
        data: t
    }))));
    if (e !== state.mapRenderToken) return !1;
    for (const {entry: t, data: a} of s) {
        if (!a?.meta || !a?.data) continue;
        const s = getMarkLabel(a.meta);
        if (!s) continue;
        const i = [];
        for (const e of Object.values(a.data)) for (const t of e) i.push(t);
        const o = i.filter(e => !isCheckedMarkerHidden(e, t.file) && !!getItemMapCfgMatch(e, n) && isRelevantMapRegionId(e.mapRegionId)), l = isRwType(a.meta.typeIcon) ? selectRwItems(o) : o;
        if (0 === l.length) continue;
        state.enabledFiles.add(t.file);
        const c = buildFilterChip({
            file: t.file,
            icon: a.meta.typeIcon,
            label: s,
            count: l.length
        });
        c && disabledFiles && disabledFiles.has(t.file) && (c.classList.remove("selected"), c.setAttribute("aria-pressed", "false"), state.enabledFiles.delete(t.file)), c && r.push(c);
    }
    for (const e of getCurrentMonsterEntries()) {
        const t = `monster:${e.key || `${e.family}_${e.monster_id}`}`;
        state.enabledFiles.add(t);
        const n = buildFilterChip({
            file: t,
            icon: e.icon,
            label: e.name || `#${e.monster_id}`,
            count: `${e.collected_spawn_spots}/${e.total_spawn_spots}`
        });
        n && disabledFiles && disabledFiles.has(t) && (n.classList.remove("selected"), n.setAttribute("aria-pressed", "false"), state.enabledFiles.delete(t)), n && r.push(n);
    }
    return e !== state.mapRenderToken ? !1 : (0 !== r.length ? r.forEach(e => el.markTypeRow.appendChild(e)) : el.markTypeRow.innerHTML = `<div class="details-placeholder">${escapeHtml(MAP_TEXT.noMarksFound)}</div>`, 
    !0);
}

function refreshCheckedVisibility() {
    const e = state.mapRenderToken;
    renderMarkTypeFilters(e, !0).then(t => {
        t && e === state.mapRenderToken && renderMarkers();
    }).catch(e => console.error("Failed to refresh chest visibility:", e));
}

function renderMarkers() {
    clearNode(el.markersLayer);
    const e = getMapCfg(state.currentCenterSceneId), t = e?.pic_res;
    if (!t) return;
    const n = el.mapImg.naturalWidth || 2048, a = el.mapImg.naturalHeight || 2048, r = [];
    for (const [t, s] of state.placingFiles.entries()) {
        if (!state.enabledFiles.has(t)) continue;
        if (!s?.meta || !s?.data) continue;
        const i = getMarkLabel(s.meta);
        if (!i) continue;
        const o = [];
        for (const e of Object.values(s.data)) for (const t of e) o.push(t);
        const l = isRwType(s.meta.typeIcon) ? selectRwItems(o) : o;
        for (const o of l) {
            if (!isRelevantMapRegionId(o.mapRegionId)) continue;
            const l = getItemMapCfgMatch(o, e);
            if (!l) continue;
            const c = toMarkerItem(o, l, e, n, a, s.meta, t, i);
            c && !isCheckedMarkerHidden(c) && r.push(c);
        }
    }
    for (const t of getCurrentMonsterEntries()) {
        const s = `monster:${t.key || `${t.family}_${t.monster_id}`}`;
        if (state.enabledFiles.has(s)) for (const s of Array.isArray(t.markers) ? t.markers : []) {
            const i = worldXZToNaturalPixels(e, n, a, Number(s.x), Number(s.z));
            if (!i) continue;
            const o = Number(s.scene_id), l = Number.isFinite(o) ? getMapCfg(o)?.name : "", c = `${t.collected_spawn_spots}/${t.total_spawn_spots}`;
            r.push({
                x: i.x,
                y: i.y,
                icon: t.icon,
                portraitImage: t.image,
                monsterFamily: t.family,
                infoType: t.name || `#${t.monster_id}`,
                mapRegionId: Number.isFinite(o) ? o : Number(state.currentCenterSceneId),
                mapRegionName: l,
                rewardText: c,
                worldY: Number(s.y) || 0
            });
        }
    }
    state.currentMarkers = r, el.mapShell.dataset.subregionMode = "none", renderRewardFilterChips([]), 
    el.count.textContent = MAP_TEXT.marksCount(r.length || 0);
    const o = getJdChainColors(r), i = document.createDocumentFragment();
    for (const e of r) {
        const t = document.createElement("div");
        t.className = "map-marker-wrap", t.style.left = `${e.x}px`, t.style.top = `${e.y}px`;
        const n = document.createElement("img");
        const a = state.useMonsterPortraits && e.portraitImage;
        n.className = "map-marker", isCompactMarkerIcon(e.icon) && n.classList.add("map-marker-compact"), a && n.classList.add("map-marker-portrait");
        const r = `${CONFIG.markImageBase}${e.icon}.webp`, s = a ? `${CONFIG.monsterImageBase}${e.portraitImage}.webp` : r;
        n.src = s, s !== r && n.addEventListener("error", () => {
            n.src = r;
        }, {
            once: !0
        }), n.alt = "", n.loading = "lazy", 
        n.decoding = "async", n.draggable = !1, n.title = [ e.infoType, e.mapRegionName, e.rewardText ].filter(Boolean).join(" · "), 
        n.setAttribute("aria-hidden", "true"), t.appendChild(n);
        const l = getJdChain(e);
        if (l) {
            const n = o.get(l.id), a = document.createElement("span");
            a.className = "map-marker-step map-marker-jd-step", a.textContent = `${l.step}/${l.total || n?.total || l.step}`, a.style.setProperty("--map-marker-step-color", n?.color || "#38bdf8"), a.setAttribute("aria-hidden", "true"), t.appendChild(a);
        }
        if (a && state.showMonsterPortraitLabels) {
            const a = getMonsterFamilyLabel(e.monsterFamily);
            if (a) {
                const r = document.createElement("span");
                r.className = "map-marker-type", r.textContent = a, t.appendChild(r);
            }
        }
        if (e.quest || isJdMarker(e) || isCookingMarker(e) || isChestMarker(e)) {
            const r = !!e.quest || isJdMarker(e) || isCookingMarker(e);
            const a = document.createElement("button");
            a.type = "button", a.className = `map-marker-hit ${r ? "map-marker-quest" : "map-marker-chest"}`, a.title = n.title;
            if (r) updateQuestMarkerButton(e, a), a.setAttribute("aria-label", n.title || e.infoType || MAP_TEXT.questDetails), a.addEventListener("click", t => {
                t.preventDefault(), t.stopPropagation(), renderQuestDetails(e, !0);
            });
            else updateChestMarkerButton(e, a), a.addEventListener("click", t => {
                t.preventDefault(), t.stopPropagation(), toggleChestCollected(e, a);
            });
            t.appendChild(a);
        }
        i.appendChild(t);
    }
    el.markersLayer.appendChild(i);
}

function pickDefaultCenterSceneId(e) {
    return e.find(e => 101 === Number(e.center_scene_id)) ? 101 : e.length ? Number(e[0].center_scene_id) : null;
}

async function loadBaseData() {
    state.mapIndex = await loadJson(CONFIG.mapIndexUrl), state.subregions = [];
}

function applySelectableMapState(e, t) {
    state.openWorldCenters = new Set(e.map(e => Number(e.center_scene_id)).filter(e => Number.isFinite(e))), 
    state.allowedMapIds = new Set, state.picResToAllowed = new Map;
    for (const n of e) {
        const e = Number(n.center_scene_id);
        Number.isFinite(e) && (state.allowedMapIds.add(e), n.pic_res && !state.picResToAllowed.has(n.pic_res) && state.picResToAllowed.set(n.pic_res, e));
    }
    for (const n of t) {
        const e = Number(n.map_id);
        Number.isFinite(e) && (state.allowedMapIds.add(e), n.pic_res && !state.picResToAllowed.has(n.pic_res) && state.picResToAllowed.set(n.pic_res, e));
    }
}

function primeMapSelectionState() {
    const e = normalizeOpenWorldMaps(), t = listInstanceMaps(new Set(e.map(e => e.pic_res).filter(Boolean)));
    applySelectableMapState(e, t);
    if (Number.isFinite(state.currentCenterSceneId)) return;
    let n = initialUrlState?.mapId;
    Number.isFinite(n) || (n = pickDefaultCenterSceneId(e)), Number.isFinite(n) || t.length && (n = Number(t[0].map_id)), 
    Number.isFinite(n) && (state.currentCenterSceneId = n);
}

function normalizeOpenWorldMaps() {
    const e = Array.isArray(state.mapIndex?.world_maps) ? state.mapIndex.world_maps : [], t = new Set, n = [];
    for (const a of e) {
        const e = Number(a.center_scene_id);
        if (!Number.isFinite(e)) continue;
        if (t.has(e)) continue;
        const r = getMapCfg(e), s = a.pic_res || r?.pic_res || null;
        s && (t.add(e), n.push({
            ...a,
            center_scene_id: e,
            pic_res: s,
            name: a.name || r?.name || `Scene ${e}`
        }));
    }
    return n;
}

function listInstanceMaps(e) {
    const t = state.mapIndex?.map_configs || {}, n = [], a = new Set;
    for (const [r, s] of Object.entries(t)) {
        const t = Number(s?.map_id ?? r), i = s?.pic_res;
        Number.isFinite(t) && i && !e.has(i) && !a.has(i) && (a.add(i), n.push({
            map_id: t,
            name: s.name || `Map ${t}`,
            pic_res: i
        }));
    }
    return n.sort((e, t) => (e.name || "").localeCompare(t.name || "", "zh-TW") || e.map_id - t.map_id), 
    n;
}

function parseUrlState() {
    const e = location.hash?.replace(/^#/, "") || location.search?.replace(/^\?/, "");
    if (!e) return {};
    const t = new URLSearchParams(e), n = Number(t.get("map") || t.get("mapId")), a = Number(t.get("region") || t.get("sub") || t.get("subregion"));
    return {
        mapId: Number.isFinite(n) ? n : null,
        regionId: Number.isFinite(a) ? a : null
    };
}

function updateUrlState() {
    const e = new URLSearchParams;
    Number.isFinite(state.currentCenterSceneId) && e.set("map", String(state.currentCenterSceneId));
    const t = e.toString(), n = t ? `#${t}` : "";
    location.hash !== n && history.replaceState(null, "", `${location.pathname}${location.search}${n}`);
}

function resolveAllowedMapId(e) {
    if (!Number.isFinite(e)) return null;
    if (state.allowedMapIds?.has(e)) return e;
    const t = getMapCfg(e), n = t?.pic_res;
    return n && state.picResToAllowed?.has(n) ? state.picResToAllowed.get(n) : null;
}

async function populateMapSelect() {
    const e = normalizeOpenWorldMaps(), t = listInstanceMaps(new Set(e.map(e => e.pic_res).filter(Boolean))), n = await collectMarkedMapIds(), a = e.filter(e => {
        const t = Number(e.center_scene_id);
        if (!Number.isFinite(t)) return !1;
        if (n.has(t)) return !0;
        const a = 100 * t;
        for (let e = 0; e < 100; e++) if (n.has(a + e)) return !0;
        return !1;
    }), r = t.filter(e => n.has(e.map_id));
    clearNode(el.mapSelect);
    const s = document.createElement("option");
    s.value = "", s.textContent = MAP_TEXT.selectMap, el.mapSelect.appendChild(s);
    const i = document.createElement("optgroup");
    i.label = MAP_TEXT.openWorld, applySelectableMapState(a, r);
    for (const e of a) {
        const t = document.createElement("option");
        t.value = String(e.center_scene_id), t.textContent = e.name, i.appendChild(t);
    }
    el.mapSelect.appendChild(i);
    const o = document.createElement("optgroup");
    o.label = MAP_TEXT.instances;
    for (const e of r) {
        const t = document.createElement("option");
        t.value = String(e.map_id), t.textContent = e.name, o.appendChild(t);
    }
    o.children.length && el.mapSelect.appendChild(o);
    const l = a.length ? Number(a[0].center_scene_id) : r.length ? Number(r[0].map_id) : null;
    let c = null;
    Number.isFinite(initialUrlState?.mapId) && el.mapSelect.querySelector(`option[value="${initialUrlState.mapId}"]`) ? c = initialUrlState.mapId : Number.isFinite(state.currentCenterSceneId) && el.mapSelect.querySelector(`option[value="${state.currentCenterSceneId}"]`) ? c = state.currentCenterSceneId : Number.isFinite(pickDefaultCenterSceneId(a)) && el.mapSelect.querySelector(`option[value="${pickDefaultCenterSceneId(a)}"]`) ? c = pickDefaultCenterSceneId(a) : c = l, 
    Number.isFinite(c) && (el.mapSelect.value = String(c), state.currentCenterSceneId = c);
    return c;
}

async function ensureVisibleMapImageLoaded(e) {
    el.mapImg.getAttribute("src") !== e && (el.mapImg.src = e);
    await new Promise(t => {
        if (el.mapImg.complete && el.mapImg.currentSrc) return void t();
        const n = () => t();
        el.mapImg.addEventListener("load", n, {
            once: !0
        }), el.mapImg.addEventListener("error", n, {
            once: !0
        });
    });
    "function" == typeof el.mapImg.decode && await el.mapImg.decode().catch(() => {});
}

async function renderCurrentMapContent(e) {
    if (!await renderMarkTypeFilters(e) || e !== state.mapRenderToken) return;
    renderMarkers();
}

async function setCurrentMap(e) {
    const t = ++state.mapRenderToken, n = Number(e), a = resolveAllowedMapId(n);
    state.currentCenterSceneId = a ?? n, state.selectedSubregionId = null, resetZoom(), 
    clearMapOverlays(), clearQuestDetails(), state.currentMarkers = [];
    const r = getMapCfg(state.currentCenterSceneId);
    if (!r?.pic_res) return delete el.mapShell.dataset.loading, el.mapImg.removeAttribute("src"), el.mapImg.alt = "", 
    el.count.textContent = "", 
    void (el.markTypeRow.innerHTML = `<div class="details-placeholder">${escapeHtml(MAP_TEXT.missingMapConfig)}</div>`);
    null != a && state.currentCenterSceneId !== n && el.mapSelect.querySelector(`option[value="${state.currentCenterSceneId}"]`) && (el.mapSelect.value = String(state.currentCenterSceneId));
    const s = `${CONFIG.mapImageBase}${r.pic_res}.webp`;
    el.mapShell.dataset.loading = "true", el.mapShell.dataset.mapMode = isOpenWorldMap(state.currentCenterSceneId) ? "openworld" : "instance", 
    el.mapImg.alt = r.pic_res, await ensureVisibleMapImageLoaded(s), t === state.mapRenderToken && (el.mapImg.naturalWidth && el.mapImg.naturalHeight && (el.mapShell.style.aspectRatio = `${el.mapImg.naturalWidth} / ${el.mapImg.naturalHeight}`), 
    computeStageBaseScale(), renderSubregions(), delete el.mapShell.dataset.loading, updateUrlState(), 
    initialUrlState?.regionId && (initialUrlState.regionId = null), requestAnimationFrame(() => {
        renderCurrentMapContent(t).catch(e => console.error("Failed to render map content:", e));
    }));
}

function onSearchChanged() {}

async function main() {
    applyHeaderIcons(), applyStaticText(), bindHideCheckedToggle(), bindMonsterPortraitsToggle(), bindMonsterPortraitLabelsToggle(), bindQuestModal(), zoomResetEnabled(!1), initialUrlState = parseUrlState(),
    el.mapImg.draggable = !1, el.mapImg.decoding = "async";
    try {
        el.mapImg.fetchPriority = "high";
    } catch {}
    el.mapImg.addEventListener("dragstart", e => e.preventDefault()), el.zoomReset.addEventListener("click", () => resetZoom()), 
    el.mapSelect.addEventListener("change", async () => {
        const e = el.mapSelect.value;
        e && await setCurrentMap(Number(e));
    }), el.mapShell.addEventListener("wheel", e => {
        e.ctrlKey || (e.preventDefault(), zoomAtClientPoint(e.clientX, e.clientY, e.deltaY));
    }, {
        passive: !1
    }), el.mapShell.addEventListener("pointerdown", e => {
        beginMapPan(e);
    }), el.mapShell.addEventListener("pointermove", e => {
        updateMapPan(e);
    }, {
        passive: !1
    }), el.mapShell.addEventListener("pointerup", e => {
        endMapPan(e);
    }), el.mapShell.addEventListener("pointercancel", e => {
        endMapPan(e);
    }), el.mapShell.addEventListener("click", e => {
        suppressNextMapClick && (suppressNextMapClick = !1, e.preventDefault(), e.stopPropagation());
    }, !0), window.addEventListener("resize", () => {
        computeStageBaseScale();
    }), window.addEventListener("hashchange", async () => {
        const e = parseUrlState();
        if (Number.isFinite(e.mapId) && e.mapId !== state.currentCenterSceneId) return el.mapSelect.querySelector(`option[value="${e.mapId}"]`) && (el.mapSelect.value = String(e.mapId)), 
        void await setCurrentMap(e.mapId);
        Number.isFinite(e.regionId) && (initialUrlState.regionId = null);
    });
    try {
        await loadBaseData(), primeMapSelectionState();
        const e = state.currentCenterSceneId, t = populateMapSelect();
        null != e && await setCurrentMap(e);
        const n = await t;
        Number.isFinite(n) && n !== e && await setCurrentMap(n);
    } catch (e) {
        el.markTypeRow.innerHTML = `<div class="details-placeholder">${escapeHtml(String(e))}</div>`;
    }
}

main();

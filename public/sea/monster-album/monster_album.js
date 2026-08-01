const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function detectLocale() {
    if (window.RO_ACTIVE_LOCALE && SUPPORTED_LOCALES.includes(window.RO_ACTIVE_LOCALE)) return window.RO_ACTIVE_LOCALE;
    const e = new URLSearchParams(window.location.search).get("lang"), t = localStorage.getItem("ro_lang"), n = document.documentElement.getAttribute("lang"), a = Array.isArray(navigator.languages) ? navigator.languages : [], r = [ e, (navigator.language || "").trim(), ...a, t, n ], o = e => SUPPORTED_LOCALES.some(t => t.toLowerCase() === String(e).toLowerCase());
    for (const e of r) {
        if (!e) continue;
        const t = SUPPORTED_LOCALES.find(t => t.toLowerCase() === String(e).toLowerCase());
        if (t) return t;
    }
    for (const e of r) {
        if (!e) continue;
        const t = String(e).split("-")[0].toLowerCase();
        if ("zh" === t) {
            if (o("zh-TW")) return "zh-TW";
            const e = SUPPORTED_LOCALES.find(e => e.toLowerCase().startsWith("zh-"));
            if (e) return e;
        }
        if ("en" === t && o("en-US")) return "en-US";
        if (("id" === t || "in" === t) && o("id-ID")) return "id-ID";
    }
    return o("en-US") ? "en-US" : o("zh-TW") ? "zh-TW" : SUPPORTED_LOCALES[0] || "en-US";
}

const ACTIVE_LOCALE = detectLocale();

localStorage.setItem("ro_lang", ACTIVE_LOCALE), document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const CONFIG = {
    iconPathsUrl: "/sea/skill-simulator/data/icon_paths.json",
    iconBasePath: "/media/images/",
    monstersUrl: `/sea/monster-album/data/monster_album_${ACTIVE_LOCALE}.json`,
    cardsUrl: `/sea/card-simulator/data/handbook_cards_${ACTIVE_LOCALE}.json`,
    monsterIconBase: "/media/images/monster/",
    itemIconBase: "/media/images/item/",
    batchSize: 40,
    fillViewportPadding: 200
};

let lastMonsterModalTriggerEl = null;

const INTEGER_FORMATTER = new Intl.NumberFormat(ACTIVE_LOCALE), PERCENT_FORMATTERS = new Map, UI_STRINGS = {
    "en-US": {
        pageTitle: "RO World Journey | Monster Album",
        pageDesc: "Ragnarok Online World Journey - Monster Album",
        headerTitle: "Monster Album",
        searchPlaceholder: "Search monsters or drops (item: name)...",
        loading: "Loading...",
        showAll: "Show All (experimental)",
        activity: "Activity",
        element: "Element",
        race: "Race",
        body: "Body",
        type: "Type",
        none: "None",
        all: "All",
        unknown: "Unknown",
        selectMonster: "Select a monster to view stats and drops.",
        noDropData: "No drop data",
        stats: "Stats",
        drops: "Drops",
        dropTableItem: "Item",
        dropTableBracket: "Bracket",
        dropTableChance: "Drop Chance",
        dropTableFarm: "10x Rate",
        dropTableRegular: "1x Rate",
        dropTableNoRate: "-",
        activityRewardClearance: "Clearance",
        activityRewardAssist: "Assist",
        activityRewardFirstTime: "First Clear",
        activityRewardRoll: "Roll Reward",
        activityRewardDaily: "Daily Reward",
        activityRewardFirstClear: "First Clear",
        activityRewardTowerChest: "Floor Chest",
        activityRewardTowerMvp: "Boss Reward",
        activityRewardGoldRobberFull: "Full Reward",
        activityRewardGoldRobberExtra: "Reduced Reward",
        activityRewardGoldRobberFinal: "Leader Reward",
        activityRewardGoldRobberFinalBonus: "Leader Bonus",
        activityRewardExpand: "Show reward contents",
        activityRewardCollapse: "Hide reward contents",
        activityModeNormal: "Normal",
        activityModeHard: "Hard",
        mvpRewardJoinHigh: "Join (High)",
        mvpRewardJoinLow: "Join (Low)",
        mvpRewardRank: "Rank",
        mvpRewardTeam: "Team",
        qualityGreen: "Green",
        qualityBlue: "Blue",
        qualityPurple: "Purple",
        qualityGold: "Gold",
        qualityKing: "King",
        boundShort: "B",
        unboundShort: "U",
        boundLabel: "Bound",
        unboundLabel: "Unbound",
        cardAfterShort: "Card After",
        cardUnboundRateShort: "Card U",
        cardBoundRateShort: "Card B",
        kingWeaponRateShort: "King Wpn",
        monstersCount: e => `${e} monsters`,
        unknownLevel: "Unknown",
        loadFailed: "Load failed",
        failedToLoadPrefix: "Failed to load monsters:",
        close: "Close",
        nav: {
            "/skill_planner/": "Skill Planner",
            "/rune_planner/": "Rune Planner",
            "/affix_planner/": "Affix Planner",
            "/equipment/": "Equipment",
            "/cards/": "Cards",
            "/cards/": "Cards",
            "/monster_album/": "Monster Album",
            "/monster-album/": "Monster Album",
            "/maps/": "Maps",
            "/study/": "Study",
            "/pet/": "Pet",
            "/refine/": "Refine"
        }
    },
    "th-TH": {
        pageTitle: "RO World Journey | สมุดมอนสเตอร์",
        pageDesc: "Ragnarok Online World Journey - สมุดมอนสเตอร์",
        headerTitle: "สมุดมอนสเตอร์",
        searchPlaceholder: "ค้นหามอนสเตอร์หรือของดรอป (item: ชื่อ)...",
        loading: "กำลังโหลด...",
        showAll: "แสดงทั้งหมด (ทดลอง)",
        activity: "กิจกรรม",
        element: "ธาตุ",
        race: "เผ่า",
        body: "ขนาด",
        type: "ประเภท",
        none: "ไม่มี",
        all: "ทั้งหมด",
        unknown: "ไม่ทราบ",
        selectMonster: "เลือกมอนสเตอร์เพื่อดูค่าสถานะและของดรอป",
        noDropData: "ไม่มีข้อมูลดรอป",
        stats: "ค่าสถานะ",
        drops: "ของดรอป",
        dropTableItem: "ไอเท็ม",
        dropTableBracket: "กลุ่มรางวัล",
        dropTableChance: "อัตราดรอป",
        dropTableFarm: "10x Rate",
        dropTableRegular: "1x Rate",
        dropTableNoRate: "-",
        activityRewardClearance: "เคลียร์",
        activityRewardAssist: "ช่วยรบ",
        activityRewardFirstTime: "ผ่านครั้งแรก",
        activityRewardRoll: "สุ่มรางวัล",
        activityRewardDaily: "รางวัลรายวัน",
        activityRewardFirstClear: "ผ่านครั้งแรก",
        activityRewardTowerChest: "หีบชั้น",
        activityRewardTowerMvp: "รางวัลบอส",
        activityRewardGoldRobberFull: "รางวัลเต็ม",
        activityRewardGoldRobberExtra: "รางวัลลดลง",
        activityRewardGoldRobberFinal: "รางวัลหัวหน้า",
        activityRewardGoldRobberFinalBonus: "โบนัสหัวหน้า",
        activityRewardExpand: "แสดงรายละเอียดรางวัล",
        activityRewardCollapse: "ซ่อนรายละเอียดรางวัล",
        activityModeNormal: "ปกติ",
        activityModeHard: "ยาก",
        mvpRewardJoinHigh: "เข้าร่วม (สูง)",
        mvpRewardJoinLow: "เข้าร่วม (ต่ำ)",
        mvpRewardRank: "อันดับ",
        mvpRewardTeam: "ทีม",
        boundShort: "B",
        unboundShort: "U",
        boundLabel: "Bound",
        unboundLabel: "Unbound",
        monstersCount: e => `${e} มอนสเตอร์`,
        unknownLevel: "ไม่ทราบ",
        loadFailed: "โหลดไม่สำเร็จ",
        failedToLoadPrefix: "โหลดข้อมูลมอนสเตอร์ไม่สำเร็จ:",
        close: "ปิด",
        nav: {
            "/skill_planner/": "จำลองสกิล",
            "/rune_planner/": "จำลองรูน",
            "/affix_planner/": "วางแผนออฟชั่น",
            "/equipment/": "อุปกรณ์",
            "/cards/": "การ์ด",
            "/cards/": "การ์ด",
            "/monster_album/": "สมุดมอนสเตอร์",
            "/monster-album/": "สมุดมอนสเตอร์",
            "/maps/": "แผนที่",
            "/study/": "แบบฝึกหัด",
            "/pet/": "สัตว์เลี้ยง",
            "/refine/": "ตีบวก"
        }
    },
    "zh-CN": {
        pageTitle: "RO仙境传说：世界之旅 | 魔物图鉴",
        pageDesc: "RO仙境传说：世界之旅 - 魔物图鉴",
        headerTitle: "魔物图鉴",
        searchPlaceholder: "搜索魔物或掉落（道具: 名称）...",
        loading: "加载中...",
        showAll: "显示全部（实验中）",
        activity: "活动",
        element: "属性",
        race: "种族",
        body: "体型",
        type: "类型",
        none: "无",
        all: "全部",
        unknown: "未知",
        selectMonster: "请选择魔物查看属性与掉落。",
        noDropData: "无掉落数据",
        stats: "属性",
        drops: "掉落",
        dropTableItem: "道具",
        dropTableBracket: "档位",
        dropTableChance: "掉率",
        dropTableFarm: "10x Rate",
        dropTableRegular: "1x Rate",
        dropTableNoRate: "-",
        activityRewardClearance: "通关",
        activityRewardAssist: "助战",
        activityRewardFirstTime: "首通",
        activityRewardRoll: "额外奖励",
        activityRewardDaily: "每日奖励",
        activityRewardFirstClear: "首通奖励",
        activityRewardTowerChest: "层数宝箱",
        activityRewardTowerMvp: "首领奖励",
        activityRewardGoldRobberFull: "全额奖励",
        activityRewardGoldRobberExtra: "减额奖励",
        activityRewardGoldRobberFinal: "首领奖励",
        activityRewardGoldRobberFinalBonus: "首领加成",
        activityRewardExpand: "展开奖励内容",
        activityRewardCollapse: "收起奖励内容",
        activityModeNormal: "普通",
        activityModeHard: "困难",
        mvpRewardJoinHigh: "参与(高)",
        mvpRewardJoinLow: "参与(低)",
        mvpRewardRank: "排名",
        mvpRewardTeam: "队伍",
        boundShort: "B",
        unboundShort: "U",
        boundLabel: "绑定",
        unboundLabel: "未绑定",
        monstersCount: e => `${e} 个魔物`,
        unknownLevel: "未知",
        loadFailed: "加载失败",
        failedToLoadPrefix: "加载魔物失败：",
        close: "关闭",
        nav: {
            "/skill_planner/": "技能规划器",
            "/rune_planner/": "符文规划器",
            "/affix_planner/": "特技规划器",
            "/equipment/": "装备",
            "/cards/": "卡片",
            "/cards/": "卡片",
            "/monster_album/": "魔物图鉴",
            "/monster-album/": "魔物图鉴",
            "/maps/": "地图",
            "/study/": "问答",
            "/pet/": "宠物",
            "/refine/": "精炼"
        }
    },
    "zh-TW": {
        pageTitle: "RO仙境傳說：世界之旅 | 魔物圖鑑",
        pageDesc: "RO仙境傳說：世界之旅 - 魔物圖鑑",
        headerTitle: "魔物圖鑑",
        searchPlaceholder: "搜尋魔物或掉落（道具: 名稱）...",
        loading: "載入中...",
        showAll: "顯示全部（實驗中）",
        activity: "活動",
        element: "屬性",
        race: "種族",
        body: "體型",
        type: "類型",
        none: "無",
        all: "全部",
        unknown: "未知",
        selectMonster: "請選擇魔物查看屬性與掉落。",
        noDropData: "無掉落資料",
        stats: "屬性",
        drops: "掉落",
        dropTableItem: "道具",
        dropTableBracket: "檔位",
        dropTableChance: "掉率",
        dropTableFarm: "10x Rate",
        dropTableRegular: "1x Rate",
        dropTableNoRate: "-",
        activityRewardClearance: "通關",
        activityRewardAssist: "助戰",
        activityRewardFirstTime: "首通",
        activityRewardRoll: "額外獎勵",
        activityRewardDaily: "每日獎勵",
        activityRewardFirstClear: "首通獎勵",
        activityRewardTowerChest: "層數寶箱",
        activityRewardTowerMvp: "首領獎勵",
        activityRewardGoldRobberFull: "全額獎勵",
        activityRewardGoldRobberExtra: "減額獎勵",
        activityRewardGoldRobberFinal: "統領獎勵",
        activityRewardGoldRobberFinalBonus: "統領加成",
        activityRewardExpand: "展開獎勵內容",
        activityRewardCollapse: "收合獎勵內容",
        activityModeNormal: "普通",
        activityModeHard: "困難",
        mvpRewardJoinHigh: "參與(高)",
        mvpRewardJoinLow: "參與(低)",
        mvpRewardRank: "排名",
        mvpRewardTeam: "隊伍",
        boundShort: "B",
        unboundShort: "U",
        boundLabel: "綁定",
        unboundLabel: "未綁定",
        monstersCount: e => `${e} 隻魔物`,
        unknownLevel: "未知",
        loadFailed: "載入失敗",
        failedToLoadPrefix: "載入魔物失敗：",
        close: "關閉",
        nav: {
            "/skill_planner/": "技能模擬器",
            "/rune_planner/": "符文模擬器",
            "/affix_planner/": "特技模擬器",
            "/equipment/": "裝備",
            "/cards/": "卡片",
            "/cards/": "卡片",
            "/monster_album/": "魔物圖鑑",
            "/monster-album/": "魔物圖鑑",
            "/maps/": "地圖",
            "/study/": "問答",
            "/pet/": "寵物",
            "/refine/": "精煉"
        }
    }
};

function t(e) {
    return (UI_STRINGS[ACTIVE_LOCALE] || UI_STRINGS["en-US"])[e] ?? UI_STRINGS["en-US"][e] ?? "";
}

function localizeStaticPageText() {
    document.documentElement.setAttribute("lang", ACTIVE_LOCALE);
    const e = t("pageTitle");
    e && (window.RO_SET_PAGE_TITLE ? window.RO_SET_PAGE_TITLE(t("headerTitle")) : document.title = e);
    const n = document.querySelector('meta[name="description"]');
    n && n.setAttribute("content", t("pageDesc"));
    const a = document.querySelector(".header-title");
    a && (a.textContent = t("headerTitle"));
    const r = document.getElementById("monster-search");
    r && r.setAttribute("placeholder", t("searchPlaceholder"));
    const o = document.getElementById("monster-count");
    o && (o.textContent = t("loading"));
    const i = document.querySelector("#monster-detail .monster-detail-empty");
    i && (i.textContent = t("selectMonster"));
    const l = document.getElementById("monster-detail-modal-title");
    l && (l.textContent = t("headerTitle"));
    const d = document.querySelector("#monster-detail-modal .refine-modal-close");
    d && d.setAttribute("aria-label", t("close"));
    const s = document.querySelector(".monster-filter-toggle span");
    s && (s.textContent = t("showAll"));
    const c = (e, t) => {
        const n = document.getElementById(e), a = n?.closest("label")?.querySelector("span");
        a && (a.textContent = t);
    };
    c("monster-filter-activity", t("activity")), c("monster-filter-element", t("element")), 
    c("monster-filter-race", t("race")), c("monster-filter-body", t("body")), c("monster-filter-type", t("type"));
    const m = (UI_STRINGS[ACTIVE_LOCALE] || {}).nav;
    m && document.querySelectorAll(".site-nav-item").forEach(e => {
        const t = e.getAttribute("href") || "", n = m[t];
        if (!n) return;
        const a = e.querySelector(".site-nav-label");
        a && (a.textContent = n), e.setAttribute("title", n), e.setAttribute("aria-label", n);
        const r = e.querySelector("img");
        r && r.setAttribute("alt", n);
    });
}

const ELEMENT_LABELS = {
    "en-US": {
        1: "Neutral",
        2: "Water",
        3: "Earth",
        4: "Fire",
        5: "Wind",
        6: "Poison",
        7: "Holy",
        8: "Shadow",
        9: "Ghost",
        10: "Undead"
    },
    "th-TH": {
        1: "Neutral",
        2: "Water",
        3: "Earth",
        4: "Fire",
        5: "Wind",
        6: "Poison",
        7: "Holy",
        8: "Shadow",
        9: "Ghost",
        10: "Undead"
    },
    "zh-CN": {
        1: "无属性",
        2: "水属性",
        3: "地属性",
        4: "火属性",
        5: "风属性",
        6: "毒属性",
        7: "圣属性",
        8: "暗属性",
        9: "念属性",
        10: "不死属性"
    },
    "zh-TW": {
        1: "無屬性",
        2: "水屬性",
        3: "地屬性",
        4: "火屬性",
        5: "風屬性",
        6: "毒屬性",
        7: "聖屬性",
        8: "暗屬性",
        9: "念屬性",
        10: "不死屬性"
    }
}, withAssetVersion = window.withAssetVersion || (e => e), UNKNOWN_FILTER = t("unknown");

let iconPaths = null, suppressHashWrite = !1;

async function loadIconPaths() {
    if (iconPaths) return iconPaths;
    try {
        const e = await fetch(withAssetVersion(CONFIG.iconPathsUrl));
        iconPaths = e && e.ok ? await e.json() : {};
    } catch {
        iconPaths = {};
    }
    return iconPaths;
}

function resolveIconPath(e) {
    if (!e) return "";
    if (iconPaths) {
        const t = iconPaths[e];
        if (t) return `${CONFIG.iconBasePath}${String(t).replace(/\\/g, "/")}`;
        const n = e.toLowerCase();
        if (n !== e && iconPaths[n]) return `${CONFIG.iconBasePath}${String(iconPaths[n]).replace(/\\/g, "/")}`;
    }
    return e.startsWith("icon_zhujiemian_") ? `${CONFIG.iconBasePath}zhujiemian/${e}.webp` : e.startsWith("icon_item_") ? `${CONFIG.iconBasePath}item/${e}.webp` : e.startsWith("icon_shadowequip_") ? `${CONFIG.iconBasePath}shadowequip/${e}.webp` : "";
}

function readFilterHash() {
    const e = window.location.hash ? window.location.hash.slice(1) : "";
    if (!e) return {
        hasAny: !1
    };
    const t = new URLSearchParams(e);
    if (![ "showAll", "element", "race", "body", "type", "activity", "monsterId" ].some(e => t.has(e))) return {
        hasAny: !1
    };
    const n = t.get("showAll"), a = t.get("element"), r = t.get("race"), o = t.get("body"), i = t.get("activity"), l = t.get("monsterId"), d = null != a && /^-?\d+$/.test(a), s = null != r && /^-?\d+$/.test(r), c = null != o && /^-?\d+$/.test(o), m = null != i && /^-?\d+$/.test(i), u = null != l && /^-?\d+$/.test(l);
    return {
        hasAny: !0,
        showAll: null == n ? null : "1" === n || "true" === n,
        element: d ? null : a,
        elementId: d ? Number(a) : null,
        race: s ? null : r,
        raceId: s ? Number(r) : null,
        body: c ? null : o,
        bodyId: c ? Number(o) : null,
        activity: m ? null : i,
        activityId: m ? Number(i) : null,
        type: t.get("type"),
        monsterId: u ? Number(l) : null
    };
}

function getElementHashValue(e) {
    return e.element ? e.elementNameToId && e.elementNameToId.has(e.element) ? String(e.elementNameToId.get(e.element)) : String(e.element) : null;
}

function getRaceHashValue(e) {
    return e.race ? e.raceNameToId && e.raceNameToId.has(e.race) ? String(e.raceNameToId.get(e.race)) : String(e.race) : null;
}

function getBodyHashValue(e) {
    return e.body ? e.bodyNameToId && e.bodyNameToId.has(e.body) ? String(e.bodyNameToId.get(e.body)) : String(e.body) : null;
}

function getActivityHashValue(e) {
    return e.activity ? e.activityNameToId && e.activityNameToId.has(e.activity) ? String(e.activityNameToId.get(e.activity)) : String(e.activity) : null;
}

function writeFilterHash(e) {
    if (suppressHashWrite) return;
    const t = null != e.selectedId ? e.selectedId : e.pendingSelectedId;
    if (!Boolean(e.showAll || e.element || e.race || e.body || e.type || e.activity || null != t)) return void (window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    const n = new URLSearchParams;
    n.set("showAll", e.showAll ? "1" : "0");
    const a = getElementHashValue(e);
    a && n.set("element", a);
    const r = getRaceHashValue(e);
    r && n.set("race", r);
    const o = getBodyHashValue(e);
    o && n.set("body", o), e.type && n.set("type", e.type);
    const i = getActivityHashValue(e);
    i && n.set("activity", i), null != t && n.set("monsterId", String(t));
    const l = n.toString(), d = `${window.location.pathname}${window.location.search}#${l}`;
    history.replaceState(null, "", d);
}

function isMonsterIcon(e) {
    return !!e && !e.startsWith("icon_map_mark") && (e.startsWith("icon_monster") || e.startsWith("icon_summon") || e.startsWith("icon_boss_image") || e.startsWith("icon_boss_bust_image") || e.startsWith("icon_pet_head"));
}

function applyHeaderIcons() {
    document.querySelectorAll("img[data-icon-name]").forEach(e => {
        const t = resolveIconPath(e.getAttribute("data-icon-name"));
        t && (e.src = t);
    });
}

function normalizeText(e) {
    return String(e || "").toLowerCase();
}

function isLikelyDescriptionText(e) {
    const t = String(e || "").trim();
    if (!t) return !1;
    const n = t.toLowerCase();
    return !!(n.length >= 60 && /\s/.test(n)) || !!(/\b(can|obtained|without|consume|damage|resistance|multiplier|chance)\b/i.test(n) && n.length >= 35) || n.split(/\s+/).filter(Boolean).length >= 10;
}

function isInvalidDropName(e) {
    const t = String(e || "").trim();
    return !t || !!/^#?\d+$/.test(t) || isLikelyDescriptionText(t);
}

function buildDropNameIndex(e) {
    const t = new Map;
    return (e || []).forEach(e => {
        [ ...Array.isArray(e?.drops) ? e.drops : [], ...Array.isArray(e?.drop_rate_entries) ? e.drop_rate_entries : [], ...Array.isArray(e?.mvp_drop_rate_entries) ? e.mvp_drop_rate_entries : [] ].forEach(e => {
            const n = Number(e?.item_id);
            if (!Number.isFinite(n) || n <= 0) return;
            const a = String(e?.name || "").trim();
            if (!a || isInvalidDropName(a)) return;
            const r = t.get(n);
            (!r || a.length < r.length) && t.set(n, a);
        });
    }), t;
}

function normalizeDropRecord(e, t) {
    const n = Number(e?.item_id), a = Number.isFinite(n) && t.get(n) || "", r = String(e?.name || "").trim(), o = isInvalidDropName(r) ? a : r, i = hasDropRateValue(e?.regular_rate_percent) ? Number(e?.regular_rate_percent) : decodeSiteRatePercent(e?.r), l = hasDropRateValue(e?.farm_rate_percent) ? Number(e?.farm_rate_percent) : decodeSiteRatePercent(e?.f), d = hasDropRateValue(e?.mvp_drop_chance_percent) ? Number(e?.mvp_drop_chance_percent) : decodeSiteRatePercent(e?.c);
    return {
        ...e,
        name: o || r,
        regular_rate_percent: Number.isFinite(i) ? i : null,
        farm_rate_percent: Number.isFinite(l) ? l : null,
        mvp_drop_chance_percent: Number.isFinite(d) ? d : null,
        mvp_reward_bucket: e?.mvp_reward_bucket ?? e?.b ?? "",
        mvp_reward_tier: e?.mvp_reward_tier ?? e?.t ?? "",
        mvp_rank_min: e?.mvp_rank_min ?? e?.n ?? null,
        mvp_rank_max: e?.mvp_rank_max ?? e?.x ?? null
    };
}

function normalizeElement(e) {
    if (!e || "object" != typeof e) return e;
    const t = Number(e.id), n = (ELEMENT_LABELS[ACTIVE_LOCALE] || ELEMENT_LABELS["en-US"])[t];
    return n ? {
        ...e,
        name: n
    } : e;
}

function normalizeActivitySources(e, t) {
    return Array.isArray(e) ? e.map(e => ({
        ...e,
        groups: Array.isArray(e?.groups) ? e.groups.map(e => ({
            ...e,
            items: Array.isArray(e?.items) ? e.items.map(e => normalizeDropRecord(e, t)) : []
        })) : []
    })) : [];
}

function normalizeMonsterRecord(e, t) {
    if (!e || "object" != typeof e) return e;
    const n = Array.isArray(e.drops) ? e.drops.map(e => normalizeDropRecord(e, t)) : [], a = Array.isArray(e.drop_rate_entries) ? e.drop_rate_entries.map(e => normalizeDropRecord(e, t)) : [], r = Array.isArray(e.mvp_drop_rate_entries) ? e.mvp_drop_rate_entries.map(e => normalizeDropRecord(e, t)) : [];
    return {
        ...e,
        element: normalizeElement(e.element),
        drops: n,
        drop_rate_entries: a,
        mvp_drop_rate_entries: r,
        activity_sources: normalizeActivitySources(e.activity_sources, t)
    };
}

function buildCardEffectIndex(e) {
    const t = new Map;
    return (Array.isArray(e?.cards) ? e.cards : []).forEach(e => {
        const n = Number(e?.id);
        if (!Number.isFinite(n)) return;
        const a = Array.isArray(e?.effect_lines) ? e.effect_lines.map(e => String(e || "").trim()).filter(Boolean) : [], r = [], o = String(e?.effect || "").trim(), i = String(e?.effect_extra || "").trim();
        o && r.push(o), i && i.split(/\r?\n/).map(e => e.trim()).filter(Boolean).forEach(e => {
            r.push(e);
        });
        const l = a.length ? a : r;
        l.length && t.set(n, l);
    }), t;
}

function buildMonsterIcon(e) {
    const t = e?.image || "", n = isMonsterIcon(t), a = n ? resolveIconPath(t) : "", r = a ? a.replace(/\.png$/i, ".webp") : "";
    let o = "", i = "";
    n && !a && (t.startsWith("icon_summon") ? (o = `${CONFIG.iconBasePath}summon/${t}.webp`, 
    i = `${CONFIG.iconBasePath}summon/${t}.webp`) : t.startsWith("icon_boss_") ? (o = `${CONFIG.iconBasePath}boss/${t}.webp`, 
    i = `${CONFIG.iconBasePath}boss/${t}.webp`) : t.startsWith("icon_pet_head") ? (o = `${CONFIG.iconBasePath}pet/${t}.webp`, 
    i = `${CONFIG.iconBasePath}pet/${t}.webp`) : (o = `${CONFIG.monsterIconBase}${t}.webp`, 
    i = `${CONFIG.monsterIconBase}${t}.webp`));
    const l = document.createElement("img");
    l.className = "monster-card-icon", l.loading = "lazy", l.decoding = "async", l.alt = e?.name || "";
    const d = [ r, a, o, i ].filter(Boolean);
    if (d.length) {
        l.src = d[0];
        let e = 0;
        l.onerror = () => {
            if (e += 1, e >= d.length) return l.onerror = null, l.classList.add("monster-drop-icon--empty"), 
            void l.removeAttribute("src");
            l.src = d[e];
        };
    } else l.classList.add("monster-drop-icon--empty");
    return l;
}

function buildTag(e) {
    const t = document.createElement("span");
    return t.className = "monster-tag", t.textContent = e || "", t;
}

function buildMonsterLevelBadge(e) {
    const t = document.createElement("span");
    t.className = "monster-card-level";
    const n = Number(e?.level), a = Number.isFinite(n) && n >= 0 ? String(Math.trunc(n)) : "?";
    return t.textContent = `Lv ${a}`, t;
}

function getMonsterGuaranteeProgress(e) {
    const t = Number(e?.guaranteed_card_drop_progress ?? e?.guaranteed_card_drop_kills);
    return !Number.isFinite(t) || t <= 0 ? null : Math.trunc(t);
}

function getMonsterGuaranteedCard(e) {
    return e?.guaranteed_card ? e.guaranteed_card : (Array.isArray(e?.drops) ? e.drops : []).find(e => e?.is_card || String(e?.icon || "").startsWith("icon_item_card_")) || null;
}

function qualityToRarityKey(e) {
    const t = Number(e);
    return 2 === t ? "green" : 3 === t ? "blue" : 4 === t ? "purple" : 5 === t ? "gold" : 6 === t ? "king" : "unknown";
}

function getPercentFormatter(e) {
    return PERCENT_FORMATTERS.has(e) || PERCENT_FORMATTERS.set(e, new Intl.NumberFormat(ACTIVE_LOCALE, {
        minimumFractionDigits: 0,
        maximumFractionDigits: e
    })), PERCENT_FORMATTERS.get(e);
}

function hasDropRateValue(e) {
    return null != e && "" !== e;
}

const SITE_RATE_SCALE = 1e6;

function decodeSiteRatePercent(e) {
    if (!hasDropRateValue(e)) return null;
    const t = Number(e);
    return !Number.isFinite(t) || t < 0 ? null : t / SITE_RATE_SCALE;
}

function formatDropRatePercent(e) {
    if (!hasDropRateValue(e)) return t("dropTableNoRate");
    const n = Number(e);
    if (!Number.isFinite(n) || n < 0) return t("dropTableNoRate");
    let a = 2;
    return n < 10 && (a = 3), n < 1 && (a = 4), n < .1 && (a = 5), n < .01 && (a = 6), 
    `${getPercentFormatter(a).format(n)}%`;
}

function formatMvpDropRatePercent(e) {
    if (!hasDropRateValue(e)) return "?";
    const t = Number(e);
    return !Number.isFinite(t) || t < 0 ? "?" : formatDropRatePercent(t);
}

function qualityToLabel(e) {
    const n = qualityToRarityKey(e);
    return "green" === n ? t("qualityGreen") : "blue" === n ? t("qualityBlue") : "purple" === n ? t("qualityPurple") : "gold" === n ? t("qualityGold") : "king" === n ? t("qualityKing") : "";
}

function variantShortLabel(e) {
    return t("bound" === e ? "boundShort" : "unboundShort");
}

function variantLongLabel(e) {
    return t("bound" === e ? "boundLabel" : "unboundLabel");
}

function isMvpMonster(e) {
    return 4 === Number(e?.type?.id);
}

function buildMvpBracketLabel(e) {
    const n = String(e?.mvp_reward_bucket || "");
    if ("participation" === n) return t("high" === e?.mvp_reward_tier ? "mvpRewardJoinHigh" : "mvpRewardJoinLow");
    const a = t("team" === n ? "mvpRewardTeam" : "mvpRewardRank"), r = Number(e?.mvp_rank_min), o = Number(e?.mvp_rank_max);
    return Number.isFinite(r) && Number.isFinite(o) ? r === o ? `${a} ${INTEGER_FORMATTER.format(r)}` : `${a} ${INTEGER_FORMATTER.format(r)}-${INTEGER_FORMATTER.format(o)}` : Number.isFinite(r) ? `${a} ${INTEGER_FORMATTER.format(r)}+` : a;
}

function buildMonsterGuaranteeBar(e) {
    const t = getMonsterGuaranteeProgress(e);
    if (null == t) return null;
    const n = getMonsterGuaranteedCard(e), a = qualityToRarityKey(n?.quality), r = document.createElement("div");
    r.className = `monster-card-guarantee-row quality-${a}`, r.textContent = INTEGER_FORMATTER.format(t);
    const o = String(n?.name || "").trim();
    return r.title = o ? `${o} • 100%: ${INTEGER_FORMATTER.format(t)}` : `100%: ${INTEGER_FORMATTER.format(t)}`, 
    r;
}

function buildMonsterGuaranteeDetail(e) {
    const t = getMonsterGuaranteeProgress(e);
    if (null == t) return null;
    const n = getMonsterGuaranteedCard(e), a = qualityToRarityKey(n?.quality), r = document.createElement("div");
    r.className = `monster-detail-guarantee quality-${a}`;
    const o = document.createElement("span");
    o.className = "monster-detail-guarantee-label", o.textContent = "Guaranteed Card:";
    const i = document.createElement("span");
    i.className = "monster-detail-guarantee-value", i.textContent = `${INTEGER_FORMATTER.format(t)} kills`;
    const l = String(n?.name || "").trim();
    return l && (r.title = `${l} • ${INTEGER_FORMATTER.format(t)} kills`), r.appendChild(o), 
    r.appendChild(i), r;
}

function findMonsterDropRateEntry(e, t) {
    return getMonsterDropRateEntries(e).find(e => t(e)) || null;
}

function buildMonsterCardMetricRow(e, t, n = "unknown", a = "") {
    const r = document.createElement("div");
    r.className = `monster-card-metric quality-${n}`, a && (r.title = a);
    const o = document.createElement("span");
    o.className = "monster-card-metric-label", o.textContent = e, r.appendChild(o);
    const i = document.createElement("span");
    if (i.className = "monster-card-metric-value-wrap", t instanceof Node) i.appendChild(t); else {
        const e = document.createElement("span");
        e.className = "monster-card-metric-value", e.textContent = t, i.appendChild(e);
    }
    return r.appendChild(i), r;
}

function getPreferredMonsterCardRate(e) {
    if (hasDropRateValue(e?.farm_rate_percent)) {
        const t = Number(e?.farm_rate_percent);
        if (Number.isFinite(t) && t >= 0) return t;
    }
    if (hasDropRateValue(e?.regular_rate_percent)) {
        const t = Number(e?.regular_rate_percent);
        if (Number.isFinite(t) && t >= 0) return t;
    }
    return null;
}

function buildMonsterCardMetrics(e) {
    const n = document.createElement("div");
    n.className = "monster-card-metrics";
    const a = getMonsterGuaranteeProgress(e), r = getMonsterGuaranteedCard(e), o = qualityToRarityKey(r?.quality);
    if (null != a) {
        const i = buildMonsterGuaranteeBar(e);
        i && n.appendChild(buildMonsterCardMetricRow(t("cardAfterShort"), i, o, r?.name ? `${r.name} • ${INTEGER_FORMATTER.format(a)}` : ""));
    }
    const i = findMonsterDropRateEntry(e, e => "card_variant" === e?.kind && "unbound" === e?.variant);
    i && n.appendChild(buildMonsterCardMetricRow(t("cardUnboundRateShort"), formatDropRatePercent(getPreferredMonsterCardRate(i)), qualityToRarityKey(i?.quality), String(i?.name || "")));
    const l = findMonsterDropRateEntry(e, e => "card_variant" === e?.kind && "bound" === e?.variant);
    l && n.appendChild(buildMonsterCardMetricRow(t("cardBoundRateShort"), formatDropRatePercent(getPreferredMonsterCardRate(l)), qualityToRarityKey(l?.quality), String(l?.name || "")));
    const d = findMonsterDropRateEntry(e, e => "equipment_quality" === e?.kind && 6 === Number(e?.quality) && /武器|weapon/i.test(String(e?.name || "")));
    return d && n.appendChild(buildMonsterCardMetricRow(t("kingWeaponRateShort"), formatDropRatePercent(getPreferredMonsterCardRate(d)), qualityToRarityKey(d?.quality), String(d?.name || ""))), 
    n;
}

function buildMonsterCard(e, t) {
    const n = document.createElement("button");
    n.type = "button", n.className = "monster-card", null != e?.id && (n.dataset.id = String(e.id)), 
    n.addEventListener("click", () => t(e, n));
    const a = document.createElement("div");
    a.className = "monster-card-header";
    const r = document.createElement("div");
    r.className = "monster-card-name", r.textContent = e?.name || `#${e?.id ?? ""}`;
    const o = document.createElement("div");
    o.className = "monster-card-tags monster-card-tags--inline", e?.race?.name && o.appendChild(buildTag(e.race.name)), 
    e?.body?.name && o.appendChild(buildTag(e.body.name)), a.appendChild(r), a.appendChild(o);
    const i = document.createElement("div");
    i.className = "monster-card-content";
    const l = document.createElement("div");
    l.className = "monster-card-media";
    const d = document.createElement("div");
    d.className = "monster-card-icon-wrap", d.appendChild(buildMonsterIcon(e)), l.appendChild(d), 
    l.appendChild(buildMonsterLevelBadge(e));
    const s = document.createElement("div");
    return s.className = "monster-card-meta", s.appendChild(buildMonsterCardMetrics(e)), 
    i.appendChild(l), i.appendChild(s), n.appendChild(a), n.appendChild(i), n;
}

function buildLevelHeader(e) {
    const t = document.createElement("div");
    t.className = "monster-level-group";
    const n = document.createElement("span");
    return n.textContent = e, t.appendChild(n), t;
}

function renderDetailSection(e, t) {
    const n = document.createElement("section");
    n.className = "monster-detail-section";
    const a = document.createElement("div");
    return a.className = "monster-detail-title", a.textContent = e, n.appendChild(a), 
    n.appendChild(t), n;
}

function buildDropItemIcon(e, t = "monster-drop-rate-icon") {
    const n = document.createElement("img");
    n.className = t, n.loading = "lazy", n.decoding = "async", n.alt = e?.name || "";
    const a = e?.icon ? resolveIconPath(e.icon) : "", r = [ a ? a.replace(/\.png$/i, ".webp") : "", a ].filter(Boolean);
    if (r.length) {
        n.src = r[0];
        let e = 0;
        n.onerror = () => {
            if (e += 1, e >= r.length) return n.onerror = null, n.classList.add("monster-drop-icon--empty"), 
            void n.removeAttribute("src");
            n.src = r[e];
        };
    } else n.classList.add("monster-drop-icon--empty"), n.removeAttribute("src");
    return n;
}

function attachCardEffectTooltip(e, t, n) {
    if (!(e instanceof HTMLElement && n instanceof Map)) return;
    const a = Number(t?.item_id);
    if (!Number.isFinite(a)) return;
    const r = n.get(a);
    if (!Array.isArray(r) || !r.length) return;
    e.classList.add("monster-card-effect-trigger");
    const o = document.createElement("div");
    o.className = "monster-card-effect-tooltip", o.setAttribute("role", "tooltip"), 
    r.forEach(e => {
        const t = document.createElement("div");
        t.className = "monster-card-effect-tooltip-line", t.textContent = e, o.appendChild(t);
    }), e.appendChild(o);
}

function getMonsterDropRateEntries(e) {
    const t = Array.isArray(e?.drop_rate_entries) ? e.drop_rate_entries : [];
    return t.length ? t : (Array.isArray(e?.drops) ? e.drops : []).map(e => ({
        ...e,
        kind: "item",
        regular_rate_percent: null,
        farm_rate_percent: null
    }));
}

function getMonsterMvpDropRateEntries(e) {
    return Array.isArray(e?.mvp_drop_rate_entries) ? e.mvp_drop_rate_entries : [];
}

function buildDropRateItemCell(e, t) {
    const n = document.createElement("td");
    n.className = "monster-drop-rate-item-cell";
    const a = document.createElement("div");
    a.className = "monster-drop-rate-item";
    const r = qualityToRarityKey(e?.quality), o = document.createElement("div");
    if (o.className = `monster-drop-rate-icon-wrap quality-${r}`, o.appendChild(buildDropItemIcon(e)), 
    "card_variant" === e?.kind) {
        const t = document.createElement("span");
        t.className = "monster-drop-rate-variant-badge", t.textContent = variantShortLabel(e?.variant), 
        o.appendChild(t);
    }
    a.appendChild(o);
    const i = document.createElement("div");
    i.className = "monster-drop-rate-copy";
    const l = document.createElement("div");
    l.className = "monster-drop-rate-name-row";
    const d = document.createElement("div");
    if (d.className = "monster-drop-rate-name", d.textContent = String(e?.name || "").trim() || `#${e?.item_id ?? ""}`, 
    l.appendChild(d), i.appendChild(l), "card_variant" === e?.kind) {
        const t = document.createElement("div");
        t.className = "monster-drop-rate-meta", t.textContent = variantLongLabel(e?.variant), 
        i.appendChild(t);
    }
    return attachCardEffectTooltip(a, e, t), a.appendChild(i), n.appendChild(a), n;
}

function buildDropRateTable(e, n) {
    const a = getMonsterDropRateEntries(e);
    if (!a.length) {
        const e = document.createElement("div");
        return e.className = "monster-muted", e.textContent = t("noDropData"), e;
    }
    const r = document.createElement("table");
    r.className = "monster-drop-rate-table";
    const o = document.createElement("colgroup"), i = document.createElement("col");
    i.className = "monster-drop-rate-col-item";
    const l = document.createElement("col");
    l.className = "monster-drop-rate-col-farm";
    const d = document.createElement("col");
    d.className = "monster-drop-rate-col-regular", o.appendChild(i), o.appendChild(l), 
    o.appendChild(d), r.appendChild(o);
    const s = document.createElement("thead"), c = document.createElement("tr");
    [ t("dropTableItem"), t("dropTableFarm"), t("dropTableRegular") ].forEach((e, t) => {
        const n = document.createElement("th");
        n.scope = "col", n.textContent = e, t > 0 && n.classList.add("monster-drop-rate-cell--numeric"), 
        c.appendChild(n);
    }), s.appendChild(c), r.appendChild(s);
    const m = document.createElement("tbody");
    return a.forEach(e => {
        const t = document.createElement("tr");
        t.className = "monster-drop-rate-row", t.appendChild(buildDropRateItemCell(e, n));
        const a = document.createElement("td");
        a.className = "monster-drop-rate-cell monster-drop-rate-cell--numeric", a.textContent = formatDropRatePercent(e?.farm_rate_percent), 
        t.appendChild(a);
        const r = document.createElement("td");
        r.className = "monster-drop-rate-cell monster-drop-rate-cell--numeric", r.textContent = formatDropRatePercent(e?.regular_rate_percent), 
        t.appendChild(r), m.appendChild(t);
    }), r.appendChild(m), r;
}

function buildMvpDropRateTable(e, n) {
    const a = getMonsterMvpDropRateEntries(e);
    if (!a.length) {
        const e = document.createElement("div");
        return e.className = "monster-muted", e.textContent = t("noDropData"), e;
    }
    const r = document.createElement("table");
    r.className = "monster-drop-rate-table monster-drop-rate-table--mvp";
    const o = document.createElement("colgroup"), i = document.createElement("col");
    i.className = "monster-drop-rate-col-item";
    const l = document.createElement("col");
    l.className = "monster-drop-rate-col-bracket";
    const d = document.createElement("col");
    d.className = "monster-drop-rate-col-chance", o.appendChild(i), o.appendChild(l), 
    o.appendChild(d), r.appendChild(o);
    const s = document.createElement("thead"), c = document.createElement("tr");
    [ t("dropTableItem"), t("dropTableBracket"), t("dropTableChance") ].forEach((e, t) => {
        const n = document.createElement("th");
        n.scope = "col", n.textContent = e, 2 === t && n.classList.add("monster-drop-rate-cell--numeric"), 
        c.appendChild(n);
    }), s.appendChild(c), r.appendChild(s);
    const m = document.createElement("tbody");
    return a.forEach(e => {
        const t = document.createElement("tr");
        t.className = "monster-drop-rate-row", t.appendChild(buildDropRateItemCell(e, n));
        const a = document.createElement("td");
        a.className = "monster-drop-rate-cell";
        const r = document.createElement("div");
        r.className = "monster-drop-rate-bracket", r.textContent = buildMvpBracketLabel(e), 
        a.appendChild(r), t.appendChild(a);
        const o = document.createElement("td");
        o.className = "monster-drop-rate-cell monster-drop-rate-cell--numeric", o.textContent = formatMvpDropRatePercent(e?.mvp_drop_chance_percent ?? e?.regular_rate_percent), 
        t.appendChild(o), m.appendChild(t);
    }), r.appendChild(m), r;
}

function getMonsterActivitySources(e, t) {
    return t ? (Array.isArray(e?.activity_sources) ? e.activity_sources : []).filter(e => String(e?.activity || "").trim() === t) : [];
}

function getMonsterActivitySection(e, t) {
    const n = getMonsterActivitySources(e, t), a = n.reduce((e, t) => {
        const n = Number(t?.section_order);
        return Number.isFinite(n) ? Math.min(e, n) : e;
    }, Number.POSITIVE_INFINITY), r = n.find(e => String(e?.encounter_name || "").trim()), o = String(r?.encounter_name || "").trim();
    return n.length ? {
        key: `${t}::${o || "activity"}`,
        label: o || t,
        order: Number.isFinite(a) ? a : 999
    } : null;
}

function localizeActivityRewardKind(e) {
    return "drops" === e ? t("drops") : "clearance" === e ? t("activityRewardClearance") : "assist" === e ? t("activityRewardAssist") : "first_time" === e ? t("activityRewardFirstTime") : "roll" === e ? t("activityRewardRoll") : "daily" === e ? t("activityRewardDaily") : "first_clear" === e ? t("activityRewardFirstClear") : "tower_chest" === e ? t("activityRewardTowerChest") : "tower_mvp" === e ? t("activityRewardTowerMvp") : "gold_robber_full" === e ? t("activityRewardGoldRobberFull") : "gold_robber_extra" === e ? t("activityRewardGoldRobberExtra") : "gold_robber_final" === e ? t("activityRewardGoldRobberFinal") : "gold_robber_final_bonus" === e ? t("activityRewardGoldRobberFinalBonus") : String(e || "").trim();
}

function localizeActivityMode(e) {
    return "normal" === e ? t("activityModeNormal") : "hard" === e ? t("activityModeHard") : String(e || "").trim();
}

function buildActivityRewardItem(e, n) {
    const a = document.createElement("div");
    a.className = "monster-activity-reward-item";
    const r = Array.isArray(e?.sub_items) ? e.sub_items : [], o = r.length > 0;
    o && a.classList.add("is-expandable");
    const i = document.createElement(o ? "button" : "div");
    i.className = "monster-activity-reward-content" + (o ? " monster-activity-reward-toggle" : ""), 
    o && (i.type = "button", i.setAttribute("aria-expanded", "false"), i.title = t("activityRewardExpand"));
    const l = qualityToRarityKey(e?.quality), d = document.createElement("div");
    d.className = `monster-drop-rate-icon-wrap monster-activity-reward-icon-wrap quality-${l}`, 
    d.appendChild(buildDropItemIcon(e, "monster-drop-rate-icon")), i.appendChild(d);
    const s = document.createElement("div");
    s.className = "monster-activity-reward-copy";
    const c = document.createElement("div");
    c.className = "monster-drop-rate-name", c.textContent = String(e?.name || "").trim() || `#${e?.item_id ?? ""}`, 
    s.appendChild(c);
    const m = [], u = Number(e?.count);
    Number.isFinite(u) && u > 1 && m.push(`x${INTEGER_FORMATTER.format(Math.trunc(u))}`);
    const p = Number(e?.rate_percent);
    if (Number.isFinite(p) && p >= 0 ? m.push(formatDropRatePercent(p)) : e?.rate_unknown && m.push("?"), 
    m.length) {
        const e = document.createElement("div");
        e.className = "monster-drop-rate-meta", e.textContent = m.join(" · "), s.appendChild(e);
    }
    if (i.appendChild(s), attachCardEffectTooltip(i, e, n), o) {
        const e = document.createElement("span");
        e.className = "monster-activity-reward-chevron", e.setAttribute("aria-hidden", "true"), 
        e.textContent = "▾", i.appendChild(e);
    }
    if (a.appendChild(i), o) {
        const e = document.createElement("div");
        e.className = "monster-activity-reward-sub-items", r.forEach(t => {
            e.appendChild(buildActivityRewardItem(t, n));
        }), a.appendChild(e), i.addEventListener("click", () => {
            const e = a.classList.toggle("is-expanded");
            i.setAttribute("aria-expanded", e ? "true" : "false"), i.title = t(e ? "activityRewardCollapse" : "activityRewardExpand");
        });
    }
    return a;
}

function buildActivityRewardGroup(e, t) {
    const n = document.createElement("div");
    n.className = "monster-activity-reward-group";
    const a = document.createElement("div");
    a.className = "monster-activity-reward-group-title", a.textContent = localizeActivityRewardKind(e?.kind), 
    n.appendChild(a);
    const r = document.createElement("div");
    return r.className = "monster-activity-reward-items", (Array.isArray(e?.items) ? e.items : []).forEach(e => {
        r.appendChild(buildActivityRewardItem(e, t));
    }), n.appendChild(r), n;
}

function buildActivityRewardSource(e, t, n) {
    const a = document.createElement("div");
    a.className = "monster-activity-source";
    const r = [], o = String(e?.encounter_name || "").trim(), i = localizeActivityMode(e?.mode);
    if (o && r.push(o), i && r.push(i), t && r.length) {
        const e = document.createElement("div");
        e.className = "monster-activity-source-title", e.textContent = r.join(" · "), a.appendChild(e);
    }
    const l = document.createElement("div");
    return l.className = "monster-activity-source-groups", (Array.isArray(e?.groups) ? e.groups : []).forEach(e => {
        Array.isArray(e?.items) && e.items.length && l.appendChild(buildActivityRewardGroup(e, n));
    }), a.appendChild(l), a;
}

function buildActivityRewardView(e, t, n) {
    const a = getMonsterActivitySources(e, t);
    if (!a.length) return null;
    const r = document.createElement("div");
    r.className = "monster-activity-rewards";
    const o = a.length > 1 || a.some(e => e?.encounter_name || e?.mode);
    return a.forEach(e => {
        r.appendChild(buildActivityRewardSource(e, o, n));
    }), r;
}

function renderMonsterDetail(e, n, a = "", r = null) {
    if (e.textContent = "", !n) {
        const n = document.createElement("div");
        return n.className = "monster-detail-empty", n.textContent = t("selectMonster"), 
        void e.appendChild(n);
    }
    const o = document.createElement("div");
    o.className = "monster-detail-header";
    const i = buildMonsterIcon(n);
    i.classList.add("monster-detail-icon"), o.appendChild(i);
    const l = document.createElement("div");
    l.className = "monster-detail-headline";
    const d = document.createElement("div");
    d.className = "monster-detail-name", d.textContent = n.name || `#${n.id}`;
    const s = document.createElement("div");
    s.className = "monster-detail-meta";
    const c = [];
    null != n?.level && c.push(`Lv ${n.level}`), n?.type?.name && c.push(n.type.name), 
    s.textContent = c.join(" · "), l.appendChild(d), l.appendChild(s);
    const m = buildMonsterGuaranteeDetail(n);
    m && l.appendChild(m), o.appendChild(l), e.appendChild(o);
    const u = document.createElement("table");
    u.className = "monster-stat-table";
    const p = [ [ t("element"), n?.element?.name || "-" ], [ t("race"), n?.race?.name || "-" ], [ t("body"), n?.body?.name || "-" ], [ "HP", null != n?.stats?.hp ? String(n.stats.hp) : "-" ], [ "P.ATK", null != n?.stats?.patk ? String(n.stats.patk) : "-" ], [ "M.ATK", null != n?.stats?.matk ? String(n.stats.matk) : "-" ], [ "P.DEF", null != n?.stats?.pdef ? String(n.stats.pdef) : "-" ], [ "M.DEF", null != n?.stats?.mdef ? String(n.stats.mdef) : "-" ], [ "HIT", null != n?.stats?.hit ? String(n.stats.hit) : "-" ], [ "FLEE", null != n?.stats?.flee ? String(n.stats.flee) : "-" ], [ "CRIT", null != n?.stats?.crit ? String(n.stats.crit) : "-" ], [ "CRIT DEF", null != n?.stats?.critDef ? String(n.stats.critDef) : "-" ], [ "ASPD", null != n?.stats?.aspd ? String(n.stats.aspd) : "-" ] ], y = [];
    for (let e = 0; e < p.length; e += 2) y.push([ p[e], p[e + 1] || [ "", "" ] ]);
    y.forEach(([e, t]) => {
        const n = document.createElement("tr");
        n.className = "monster-stat-label-row";
        const a = document.createElement("th");
        a.textContent = e[0];
        const r = document.createElement("th");
        r.textContent = t[0] || "", t[0] || r.classList.add("monster-stat-empty-cell"), 
        n.appendChild(a), n.appendChild(r), u.appendChild(n);
        const o = document.createElement("tr");
        o.className = "monster-stat-value-row";
        const i = document.createElement("td");
        i.textContent = e[1];
        const l = document.createElement("td");
        l.textContent = t[1] || "", t[1] || l.classList.add("monster-stat-empty-cell"), 
        o.appendChild(i), o.appendChild(l), u.appendChild(o);
    }), e.appendChild(renderDetailSection(t("stats"), u));
    const h = buildActivityRewardView(n, a, r) || (isMvpMonster(n) ? buildMvpDropRateTable(n, r) : buildDropRateTable(n, r));
    e.appendChild(renderDetailSection(t("drops"), h));
}

function isMonsterDetailModalMobile() {
    return window.matchMedia("(max-width: 720px)").matches;
}

function renderMonsterDetailModal(e, n = "", a = null) {
    const r = document.getElementById("monster-detail-modal-content"), o = document.getElementById("monster-detail-modal-title");
    r && o && (renderMonsterDetail(r, e, n, a), o.textContent = e?.name || t("headerTitle"));
}

function openMonsterDetailModal(e, t = "", n = null, a = null) {
    const r = document.getElementById("monster-detail-modal");
    if (!r || !e) return;
    n instanceof HTMLElement ? lastMonsterModalTriggerEl = n : document.activeElement instanceof HTMLElement && !r.contains(document.activeElement) && (lastMonsterModalTriggerEl = document.activeElement), 
    renderMonsterDetailModal(e, t, a), r.classList.add("open"), r.setAttribute("aria-hidden", "false"), 
    r.inert = !1;
    const o = r.querySelector(".refine-modal-close");
    o instanceof HTMLElement && requestAnimationFrame(() => {
        o.focus({
            preventScroll: !0
        });
    });
}

function closeMonsterDetailModal() {
    const e = document.getElementById("monster-detail-modal");
    if (!e) return;
    const t = document.activeElement;
    t instanceof HTMLElement && e.contains(t) && t.blur(), e.classList.remove("open"), 
    e.setAttribute("aria-hidden", "true"), e.inert = !0;
    const n = lastMonsterModalTriggerEl instanceof HTMLElement && lastMonsterModalTriggerEl.isConnected ? lastMonsterModalTriggerEl : null;
    n && requestAnimationFrame(() => {
        n.focus({
            preventScroll: !0
        });
    });
}

async function loadMonsters() {
    const e = await fetch(withAssetVersion(CONFIG.monstersUrl));
    if (!e.ok) throw new Error(`Failed to load monsters (${e.status})`);
    const t = await e.json();
    return {
        monsters: Array.isArray(t?.monsters) ? t.monsters : [],
        meta: t?.meta || {}
    };
}

function setup() {
    localizeStaticPageText();
    const e = document.getElementById("monster-list"), n = document.getElementById("monster-sentinel"), a = document.getElementById("monster-count"), r = document.getElementById("monster-search"), o = document.getElementById("monster-handbook"), i = document.getElementById("monster-filter-element"), l = document.getElementById("monster-filter-race"), d = document.getElementById("monster-filter-body"), s = document.getElementById("monster-filter-type"), c = document.getElementById("monster-filter-activity"), m = document.getElementById("monster-detail");
    if (!(e && n && a && r && m && o && i && l && d && s && c)) return;
    const u = {
        showAll: o.checked,
        element: "",
        race: "",
        body: "",
        type: "",
        activity: ""
    }, p = readFilterHash(), y = {
        allMonsters: [],
        filtered: [],
        grouped: [],
        rendered: 0,
        query: "",
        selectedId: null,
        showAll: p.hasAny && null != p.showAll ? p.showAll : o.checked,
        element: p.hasAny && p.element || "",
        pendingElementId: p.hasAny ? p.elementId : null,
        race: p.hasAny && p.race || "",
        pendingRaceId: p.hasAny ? p.raceId : null,
        body: p.hasAny && p.body || "",
        pendingBodyId: p.hasAny ? p.bodyId : null,
        type: p.hasAny && p.type || "",
        activity: p.hasAny && p.activity || "",
        pendingActivityId: p.hasAny ? p.activityId : null,
        pendingSelectedId: p.hasAny ? p.monsterId : null,
        dropNameById: new Map,
        elementNameToId: new Map,
        elementIdToName: new Map,
        raceNameToId: new Map,
        raceIdToName: new Map,
        bodyNameToId: new Map,
        bodyIdToName: new Map,
        activityNameToId: new Map,
        activityIdToName: new Map,
        cardEffectsById: new Map
    };
    o.checked = y.showAll;
    const h = () => {
        const n = Math.min(y.rendered + CONFIG.batchSize, y.grouped.length);
        for (let t = y.rendered; t < n; t++) {
            const n = y.grouped[t];
            if (!n) continue;
            if ("header" === n.type) {
                e.appendChild(buildLevelHeader(n.label));
                continue;
            }
            const a = buildMonsterCard(n.monster, (t, n) => {
                y.selectedId = t.id, y.pendingSelectedId = null, renderMonsterDetail(m, t, y.activity, y.cardEffectsById), 
                document.querySelectorAll(".monster-card.selected").forEach(e => e.classList.remove("selected"));
                const a = e.querySelector(`.monster-card[data-id='${t.id}']`);
                a && a.classList.add("selected"), isMonsterDetailModalMobile() ? openMonsterDetailModal(t, y.activity, n || a, y.cardEffectsById) : closeMonsterDetailModal(), 
                writeFilterHash(y);
            });
            null != y.selectedId && n.monster?.id === y.selectedId && a.classList.add("selected"), 
            e.appendChild(a);
        }
        y.rendered = n, a.textContent = t("monstersCount")(y.filtered.length), E();
    }, v = (e, t) => {
        const n = t || "", a = Array.from(e.options).some(e => e.value === n);
        return n && !a ? (e.value = "", "") : (e.value = n, n);
    }, b = () => {
        const n = normalizeText(y.query);
        y.filtered = y.allMonsters.filter(e => {
            if (!y.showAll && !e?.is_handbook) return !1;
            if (y.element) {
                const t = e?.element?.name || "";
                if (y.element === UNKNOWN_FILTER) {
                    if (t) return !1;
                } else if (t !== y.element) return !1;
            }
            if (y.race) {
                const t = e?.race?.name || "";
                if (y.race === UNKNOWN_FILTER) {
                    if (t) return !1;
                } else if (t !== y.race) return !1;
            }
            if (y.body) {
                const t = e?.body?.name || "";
                if (y.body === UNKNOWN_FILTER) {
                    if (t) return !1;
                } else if (t !== y.body) return !1;
            }
            if (y.type) {
                const t = e?.type?.name || "";
                if (y.type === UNKNOWN_FILTER) {
                    if (t) return !1;
                } else if (t !== y.type) return !1;
            }
            if (y.activity && !(Array.isArray(e?.activities) ? e.activities : []).includes(y.activity)) return !1;
            const t = n.trim();
            if (!t) return !0;
            const a = t.startsWith("item:") || t.startsWith("drop:"), r = a ? t.replace(/^(item:|drop:)\s*/i, "") : t;
            if (!r) return !0;
            const o = [ ...Array.isArray(e?.drops) ? e.drops : [], ...Array.isArray(e?.drop_rate_entries) ? e.drop_rate_entries : [], ...Array.isArray(e?.mvp_drop_rate_entries) ? e.mvp_drop_rate_entries : [], ...(Array.isArray(e?.activity_sources) ? e.activity_sources : []).flatMap(e => (Array.isArray(e?.groups) ? e.groups : []).flatMap(e => Array.isArray(e?.items) ? e.items : [])) ].map(e => e?.name || "").join("\n");
            return a ? normalizeText(o).includes(r) : normalizeText([ e?.name || "", o ].join("\n")).includes(r);
        }), null == y.selectedId || y.filtered.some(e => e?.id === y.selectedId) || (y.selectedId = null), 
        y.grouped = (e => {
            const n = [ ...e ].sort((e, t) => {
                const n = Number.isFinite(e?.level) ? e.level : Number.NEGATIVE_INFINITY, a = Number.isFinite(t?.level) ? t.level : Number.NEGATIVE_INFINITY;
                if (n !== a) return n - a;
                const r = (e?.name || "").localeCompare(t?.name || "");
                return 0 !== r ? r : (e?.id || 0) - (t?.id || 0);
            });
            if (y.activity) {
                const e = new Map, a = [];
                if (n.forEach(t => {
                    const n = getMonsterActivitySection(t, y.activity);
                    n && (e.has(n.key) || (e.set(n.key, {
                        type: "activity_header",
                        label: n.label,
                        order: n.order,
                        key: n.key
                    }), a.push(n.key)));
                }), a.length) {
                    const r = [];
                    a.sort((t, n) => {
                        const a = e.get(t), r = e.get(n);
                        return (a?.order ?? 999) - (r?.order ?? 999) || (a?.label || "").localeCompare(r?.label || "");
                    });
                    const o = new Set;
                    a.forEach(t => {
                        const a = e.get(t);
                        a && r.push({
                            type: "header",
                            label: a.label
                        }), n.filter(e => getMonsterActivitySection(e, y.activity)?.key === t).forEach(e => {
                            r.push({
                                type: "monster",
                                monster: e
                            }), o.add(e?.id);
                        });
                    });
                    const i = n.filter(e => !o.has(e?.id));
                    if (i.length) {
                        let e = null;
                        i.forEach(n => {
                            const a = Number.isFinite(n?.level) ? n.level : null;
                            let o, i;
                            if (null == a) o = "unknown", i = t("unknownLevel"); else {
                                const e = 20 * Math.floor(a / 20), t = e + 20;
                                o = `${e}-${t}`, i = `${e} - ${t}`;
                            }
                            o !== e && (r.push({
                                type: "header",
                                label: i
                            }), e = o), r.push({
                                type: "monster",
                                monster: n
                            });
                        });
                    }
                    return r;
                }
            }
            const a = [];
            let r = null;
            return n.forEach(e => {
                const n = Number.isFinite(e?.level) ? e.level : null;
                let o, i;
                if (null == n) o = "unknown", i = t("unknownLevel"); else {
                    const e = 20 * Math.floor(n / 20), t = e + 20;
                    o = `${e}-${t}`, i = `${e} - ${t}`;
                }
                o !== r && (a.push({
                    type: "header",
                    label: i
                }), r = o), a.push({
                    type: "monster",
                    monster: e
                });
            }), a;
        })(y.filtered), e.textContent = "", y.rendered = 0, h();
        const a = null != y.selectedId && y.filtered.find(e => e?.id === y.selectedId) || null;
        renderMonsterDetail(m, a, y.activity, y.cardEffectsById);
        const r = document.getElementById("monster-detail-modal");
        r?.classList.contains("open") && isMonsterDetailModalMobile() && a ? renderMonsterDetailModal(a, y.activity, y.cardEffectsById) : a || closeMonsterDetailModal(), 
        writeFilterHash(y);
    }, g = () => {
        if (document.querySelectorAll(".monster-card.selected").forEach(e => e.classList.remove("selected")), 
        null == y.selectedId) return;
        const t = e.querySelector(`.monster-card[data-id='${y.selectedId}']`);
        t && t.classList.add("selected");
    };
    r.addEventListener("input", () => {
        y.query = r.value || "", b();
    }), o.addEventListener("change", () => {
        y.showAll = o.checked, b();
    }), i.addEventListener("change", () => {
        y.element = i.value, b();
    }), l.addEventListener("change", () => {
        y.race = l.value, b();
    }), d.addEventListener("change", () => {
        y.body = d.value, b();
    }), s.addEventListener("change", () => {
        y.type = s.value, b();
    });
    const f = document.getElementById("monster-detail-modal");
    f && f.addEventListener("click", e => {
        const t = e.target;
        t && t.hasAttribute("data-monster-modal-close") && closeMonsterDetailModal();
    }), window.addEventListener("resize", () => {
        isMonsterDetailModalMobile() || closeMonsterDetailModal();
    }), document.addEventListener("keydown", e => {
        "Escape" === e.key && closeMonsterDetailModal();
    }), c.addEventListener("change", () => {
        y.activity = c.value, y.activity && (y.showAll = !0, o.checked = !0), b();
    });
    const E = () => {
        y.rendered >= y.filtered.length || window.requestAnimationFrame(() => {
            n.getBoundingClientRect().top <= window.innerHeight + CONFIG.fillViewportPadding && h();
        });
    };
    new IntersectionObserver(e => {
        e.some(e => e.isIntersecting) && h();
    }, {
        rootMargin: "800px"
    }).observe(n), window.addEventListener("scroll", () => {
        y.rendered >= y.filtered.length || n.getBoundingClientRect().top <= window.innerHeight + CONFIG.fillViewportPadding && h();
    }, {
        passive: !0
    }), window.addEventListener("hashchange", () => {
        const e = readFilterHash();
        if (suppressHashWrite = !0, e.hasAny ? (null != e.showAll && (y.showAll = e.showAll), 
        null != e.element && (y.element = e.element || ""), y.pendingElementId = null != e.elementId ? e.elementId : null, 
        null != e.race && (y.race = e.race || ""), y.pendingRaceId = null != e.raceId ? e.raceId : null, 
        null != e.body && (y.body = e.body || ""), y.pendingBodyId = null != e.bodyId ? e.bodyId : null, 
        null != e.type && (y.type = e.type || ""), null != e.activity && (y.activity = e.activity || ""), 
        y.pendingActivityId = null != e.activityId ? e.activityId : null, y.pendingSelectedId = null != e.monsterId ? e.monsterId : null) : (y.showAll = u.showAll, 
        y.element = u.element, y.pendingElementId = null, y.race = u.race, y.pendingRaceId = null, 
        y.body = u.body, y.pendingBodyId = null, y.type = u.type, y.activity = u.activity, 
        y.pendingActivityId = null, y.pendingSelectedId = null), o.checked = y.showAll, 
        null != y.pendingElementId && y.elementIdToName.has(y.pendingElementId) && (y.element = y.elementIdToName.get(y.pendingElementId)), 
        i.options.length && (y.element = v(i, y.element)), null != y.pendingRaceId && y.raceIdToName.has(y.pendingRaceId) && (y.race = y.raceIdToName.get(y.pendingRaceId)), 
        l.options.length && (y.race = v(l, y.race)), null != y.pendingBodyId && y.bodyIdToName.has(y.pendingBodyId) && (y.body = y.bodyIdToName.get(y.pendingBodyId)), 
        d.options.length && (y.body = v(d, y.body)), s.options.length && (y.type = v(s, y.type)), 
        null != y.pendingActivityId && y.activityIdToName.has(y.pendingActivityId) && (y.activity = y.activityIdToName.get(y.pendingActivityId)), 
        c.options.length && (y.activity = v(c, y.activity)), b(), null != y.pendingSelectedId) {
            y.selectedId = y.pendingSelectedId;
            const e = y.filtered.find(e => e?.id === y.selectedId);
            e && renderMonsterDetail(m, e, y.activity, y.cardEffectsById), g();
        }
        suppressHashWrite = !1;
    }), (async () => {
        try {
            await loadIconPaths(), applyHeaderIcons();
        } catch {}
        try {
            const e = await fetch(withAssetVersion(CONFIG.cardsUrl));
            if (e.ok) {
                const t = await e.json();
                y.cardEffectsById = buildCardEffectIndex(t);
            }
        } catch {
            y.cardEffectsById = new Map;
        }
        try {
            const e = await loadMonsters();
            y.dropNameById = buildDropNameIndex(e.monsters || []), y.allMonsters = (e.monsters || []).map(e => normalizeMonsterRecord(e, y.dropNameById)), 
            y.elementNameToId.clear(), y.elementIdToName.clear(), y.raceNameToId.clear(), y.raceIdToName.clear(), 
            y.bodyNameToId.clear(), y.bodyIdToName.clear(), y.activityNameToId.clear(), y.activityIdToName.clear();
            const n = Array.isArray(e?.meta?.activities) ? e.meta.activities : [];
            n.forEach(e => {
                const t = e?.name;
                if (!t) return;
                const n = e?.id;
                null == n || y.activityIdToName.has(n) || y.activityIdToName.set(n, t), y.activityNameToId.has(t) || y.activityNameToId.set(t, null != n ? n : t);
            }), y.allMonsters.forEach(e => {
                const t = e?.element?.id, n = e?.element?.name;
                null != t && n && (y.elementNameToId.has(n) || y.elementNameToId.set(n, t), y.elementIdToName.has(t) || y.elementIdToName.set(t, n));
                const a = e?.race?.id, r = e?.race?.name;
                if (null == a || !r) return;
                y.raceNameToId.has(r) || y.raceNameToId.set(r, a), y.raceIdToName.has(a) || y.raceIdToName.set(a, r);
                const o = e?.body?.id, i = e?.body?.name;
                null != o && i && (y.bodyNameToId.has(i) || y.bodyNameToId.set(i, o), y.bodyIdToName.has(o) || y.bodyIdToName.set(o, i));
            });
            const a = (e, n) => {
                const a = e.value || "";
                e.textContent = "";
                const r = document.createElement("option");
                r.value = "", r.textContent = t("all"), e.appendChild(r), n.forEach(t => {
                    const n = document.createElement("option");
                    n.value = t, n.textContent = t, e.appendChild(n);
                }), a && n.includes(a) || a === UNKNOWN_FILTER && n.includes(UNKNOWN_FILTER) ? e.value = a : e.value = "";
            }, r = e => {
                const t = new Set;
                let n = !1;
                y.allMonsters.forEach(a => {
                    const r = e(a), o = String(r || "").trim();
                    o ? t.add(o) : n = !0;
                });
                const a = Array.from(t).sort((e, t) => e.localeCompare(t));
                return n && a.push(UNKNOWN_FILTER), a;
            }, u = (e, n) => {
                const a = e.value || "";
                e.textContent = "";
                const r = document.createElement("option");
                r.value = "", r.textContent = t("none"), e.appendChild(r), n.forEach(t => {
                    const n = document.createElement("option");
                    n.value = t, n.textContent = t, e.appendChild(n);
                }), a && n.includes(a) ? e.value = a : e.value = "";
            };
            a(i, r(e => e?.element?.name)), a(l, r(e => e?.race?.name)), a(d, r(e => e?.body?.name)), 
            a(s, r(e => e?.type?.name));
            const p = [], h = new Set;
            if (n.forEach(e => {
                const t = String(e?.name || "").trim();
                t && !h.has(t) && (h.add(t), p.push(t));
            }), y.allMonsters.forEach(e => {
                (e?.activities || []).forEach(e => {
                    const t = String(e || "").trim();
                    t && !h.has(t) && (h.add(t), p.push(t));
                });
            }), u(c, p), null != y.pendingElementId && y.elementIdToName.has(y.pendingElementId) && (y.element = y.elementIdToName.get(y.pendingElementId)), 
            y.element = v(i, y.element), null != y.pendingRaceId && y.raceIdToName.has(y.pendingRaceId) && (y.race = y.raceIdToName.get(y.pendingRaceId)), 
            y.race = v(l, y.race), null != y.pendingBodyId && y.bodyIdToName.has(y.pendingBodyId) && (y.body = y.bodyIdToName.get(y.pendingBodyId)), 
            y.body = v(d, y.body), y.type = v(s, y.type), null != y.pendingActivityId && y.activityIdToName.has(y.pendingActivityId) && (y.activity = y.activityIdToName.get(y.pendingActivityId)), 
            y.activity = v(c, y.activity), o.checked = y.showAll, b(), null != y.pendingSelectedId) {
                y.selectedId = y.pendingSelectedId;
                const e = y.filtered.find(e => e?.id === y.selectedId);
                e && renderMonsterDetail(m, e, y.activity, y.cardEffectsById), g();
            }
        } catch (n) {
            e.textContent = "";
            const r = document.createElement("div");
            r.className = "loading-state", r.textContent = `${t("failedToLoadPrefix")} ${n?.message || n}`, 
            e.appendChild(r), a.textContent = t("loadFailed");
        }
    })();
}

"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", setup) : setup();

const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function detectLocale() {
    const e = new URLSearchParams(window.location.search).get("lang"), t = localStorage.getItem("ro_lang"), a = document.documentElement.getAttribute("lang"), n = Array.isArray(navigator.languages) ? navigator.languages : [], r = [ e, t, a, (navigator.language || "").trim(), ...n ], i = e => SUPPORTED_LOCALES.some(t => t.toLowerCase() === String(e).toLowerCase());
    for (const e of r) {
        if (!e) continue;
        const t = SUPPORTED_LOCALES.find(t => t.toLowerCase() === String(e).toLowerCase());
        if (t) return t;
    }
    for (const e of r) {
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

localStorage.setItem("ro_lang", ACTIVE_LOCALE), document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const CARD_I18N = {
    "en-US": {
        cardsTab: "Cards",
        fusionTab: "Card Fusion",
        pageTitleCards: "Card Library",
        pageTitleFusion: "Card Fusion",
        headerTitleCards: "Card Library",
        headerTitleFusion: "Card Fusion",
        rarityGreen: "Green",
        rarityBlue: "Blue",
        rarityPurple: "Purple",
        rarityGold: "Gold",
        allSources: "All Sources",
        allMonsterClasses: "All Monster Classes",
        allObtainSources: "All Obtain Sources",
        sourceNormal: "Normal",
        sourceMini: "Mini",
        sourceMvp: "MVP",
        sourceElite: "Elite",
        sourceOther: "Other",
        randomAffix: "Includes up to {count} random affixes",
        allSlots: "All Slots",
        cardsCount: "{count} cards",
        loadFailed: "Load failed",
        searchPlaceholder: "Search cards (name / effect / slot)...",
        loading: "Loading...",
        failedToLoadCards: "Failed to load cards"
    },
    "zh-CN": {
        cardsTab: "卡片",
        fusionTab: "卡片融合",
        pageTitleCards: "卡片图鉴",
        pageTitleFusion: "卡片融合",
        headerTitleCards: "卡片图鉴",
        headerTitleFusion: "卡片融合",
        rarityGreen: "绿",
        rarityBlue: "蓝",
        rarityPurple: "紫",
        rarityGold: "金",
        allSources: "全部来源",
        sourceNormal: "普通",
        sourceMini: "Mini",
        sourceMvp: "MVP",
        sourceOther: "其他",
        randomAffix: "附带最多{count}条随机词条",
        allSlots: "全部位",
        cardsCount: "{count} 张卡片",
        loadFailed: "加载失败",
        searchPlaceholder: "搜索卡片（名称 / 效果 / 部位）...",
        loading: "加载中...",
        failedToLoadCards: "加载卡片失败"
    },
    "th-TH": {
        cardsTab: "การ์ด",
        fusionTab: "ผสมการ์ด",
        pageTitleCards: "สารานุกรมการ์ด",
        pageTitleFusion: "ผสมการ์ด",
        headerTitleCards: "สารานุกรมการ์ด",
        headerTitleFusion: "ผสมการ์ด",
        rarityGreen: "เขียว",
        rarityBlue: "น้ำเงิน",
        rarityPurple: "ม่วง",
        rarityGold: "ทอง",
        allSources: "ทุกแหล่ง",
        sourceNormal: "ปกติ",
        sourceMini: "Mini",
        sourceMvp: "MVP",
        sourceOther: "อื่นๆ",
        randomAffix: "มีออฟสุ่มสูงสุด {count} แถว",
        allSlots: "ทุกช่อง",
        cardsCount: "{count} การ์ด",
        loadFailed: "โหลดล้มเหลว",
        searchPlaceholder: "ค้นหาการ์ด (ชื่อ / เอฟเฟกต์ / ช่อง)...",
        loading: "กำลังโหลด...",
        failedToLoadCards: "โหลดข้อมูลการ์ดไม่สำเร็จ"
    },
    "zh-TW": {
        cardsTab: "卡片",
        fusionTab: "卡片融合",
        pageTitleCards: "卡片圖鑑",
        pageTitleFusion: "卡片融合",
        headerTitleCards: "卡片圖鑑",
        headerTitleFusion: "卡片融合",
        rarityGreen: "綠",
        rarityBlue: "藍",
        rarityPurple: "紫",
        rarityGold: "金",
        allSources: "全部來源",
        sourceNormal: "普通",
        sourceMini: "Mini",
        sourceMvp: "MVP",
        sourceOther: "其他",
        randomAffix: "附帶最多{count}條隨機詞條",
        allSlots: "全部位",
        cardsCount: "{count} 張卡片",
        loadFailed: "載入失敗",
        searchPlaceholder: "搜尋卡片（名稱 / 效果 / 部位）...",
        loading: "載入中...",
        failedToLoadCards: "載入卡片失敗"
    }
}, CARD_TXT = CARD_I18N[ACTIVE_LOCALE] || CARD_I18N["en-US"], ct = (e, t = {}) => String(CARD_TXT[e] || CARD_I18N["en-US"][e] || e).replace(/\{(\w+)\}/g, (e, a) => String(t[a] ?? ""));

Object.assign(CARD_I18N["en-US"], {
    allLabel: "All",
    allMonsterClasses: "Type",
    allObtainSources: "All Obtain Sources"
}), Object.assign(CARD_I18N["zh-CN"], {
    allLabel: "\u5168\u90e8",
    allMonsterClasses: "\u7c7b\u578b",
    allObtainSources: "\u5168\u90e8\u83b7\u53d6\u6765\u6e90",
    sourceElite: "\u7cbe\u82f1"
}), Object.assign(CARD_I18N["zh-TW"], {
    allLabel: "\u5168\u90e8",
    allMonsterClasses: "\u985e\u578b",
    allObtainSources: "\u5168\u90e8\u53d6\u5f97\u4f86\u6e90",
    sourceElite: "\u7cbe\u82f1"
}), Object.assign(CARD_I18N["th-TH"], {
    allLabel: "\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14",
    allMonsterClasses: "\u0e1b\u0e23\u0e30\u0e40\u0e20\u0e17",
    allObtainSources: "\u0e41\u0e2b\u0e25\u0e48\u0e07\u0e23\u0e31\u0e1a\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14",
    sourceElite: "\u0e2d\u0e35\u0e25\u0e34\u0e15"
}), CARD_I18N["id-ID"] = {
    ...(CARD_I18N["en-US"] || {}),
    allLabel: "Semua",
    allMonsterClasses: "Tipe",
    allObtainSources: "Semua Sumber Perolehan",
    sourceElite: "Elite"
};

const MONSTER_CLASS_FILTER_ORDER = [ "mvp", "mini", "elite", "normal", "other" ], OBTAIN_SOURCE_FILTER_ORDER = [ "MonsterConfig", "MvpConfigTable", "BossRaidTrophyTable", "ItemConfig", "TradeCommodityTable", "TaskConfig", "HeimDungeonsConfig", "ForestGameOverAccountTableConfig", "AuctionItemTableConfig", "InfinityTowerTableConfig", "StoreItemConfig", "DaySignInConfig" ];

function applyStaticUIText() {
    const e = document.getElementById("card-search");
    e && (e.placeholder = ct("searchPlaceholder"));
    const t = document.getElementById("card-count");
    t && /loading/i.test(String(t.textContent || "")) && (t.textContent = ct("loading"));
    const a = document.getElementById("card-rarity");
    if (a) {
        const e = {
            all: ct("allLabel"),
            green: ct("rarityGreen"),
            blue: ct("rarityBlue"),
            purple: ct("rarityPurple"),
            gold: ct("rarityGold")
        };
        a.querySelectorAll("[data-rarity]").forEach(t => {
            const a = t.dataset.rarity || "all";
            e[a] && (t.textContent = e[a]);
        });
    }
    const n = document.querySelector('[data-card-view="library"]');
    n && (n.textContent = ct("cardsTab"));
    const r = document.querySelector('[data-card-view="fusion"]');
    r && (r.textContent = ct("fusionTab"));
}

const CONFIG = {
    iconPathsUrl: "/sea/skill-simulator/data/icon_paths.json",
    iconBasePath: "/media/images/",
    cardsUrl: `/sea/card-simulator/data/handbook_cards_${ACTIVE_LOCALE}.json`,
    cardIconBase: "/media/images/item/",
    buffIconBase: "/media/images/buff/",
    equipSlotIconBase: "/media/images/equipslot/",
    batchSize: 36
}, withAssetVersion = window.withAssetVersion || (e => e);

let iconPaths = null;
let iconPathsPromise = null;

function getSharedJsonCache() {
    return window.__RO_SHARED_JSON_CACHE || (window.__RO_SHARED_JSON_CACHE = Object.create(null));
}

function loadSharedIconPaths() {
    const e = withAssetVersion(CONFIG.iconPathsUrl), t = getSharedJsonCache();
    if (t[e]?.data) return Promise.resolve(t[e].data);
    if (t[e]?.promise) return t[e].promise;
    const a = (async () => {
        const t = await fetch(e);
        if (!t || !t.ok) throw new Error(`Failed to load icon paths (${t?.status || "no response"})`);
        const a = await t.json();
        return getSharedJsonCache()[e] = {
            data: a || {}
        }, getSharedJsonCache()[e].data;
    })().catch(t => {
        const a = getSharedJsonCache();
        return delete a[e], Promise.reject(t);
    });
    return t[e] = {
        promise: a
    }, a;
}

async function loadIconPaths() {
    if (iconPaths) return iconPaths;
    if (iconPathsPromise) return iconPathsPromise;
    return iconPathsPromise = loadSharedIconPaths().then(e => (iconPaths = e || {}, iconPaths)).catch(e => {
        throw iconPathsPromise = null, e;
    });
}

function resolveIconPath(e) {
    const t = e && iconPaths ? iconPaths[e] || iconPaths[String(e).toLowerCase()] : "";
    return e ? t ? `${CONFIG.iconBasePath}${String(t).replace(/\\/g, "/")}` : e.startsWith("icon_zhujiemian_") ? `${CONFIG.iconBasePath}zhujiemian/${e}.webp` : "" : "";
}

function resolveItemIconPath(e) {
    if (!e) return "";
    const t = iconPaths ? iconPaths[e] || iconPaths[String(e).toLowerCase()] : "";
    if (t) {
        const n = String(t).replace(/\\/g, "/");
        return n.startsWith("item/") ? `${CONFIG.iconBasePath}${n}`.replace(/\.png$/i, ".webp") : `${CONFIG.iconBasePath}${n}`;
    }
    return `${CONFIG.cardIconBase}${e}.webp`;
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

function displayCardName(e) {
    const t = String(e || "").trim();
    return t.endsWith("卡片") ? t.slice(0, -2) : t;
}

function qualityToRarityKey(e) {
    const t = Number(e);
    return 2 === t ? "green" : 3 === t ? "blue" : 4 === t ? "purple" : 5 === t ? "gold" : "unknown";
}

function rarityLabelZh(e) {
    return "green" === e ? ct("rarityGreen") : "blue" === e ? ct("rarityBlue") : "purple" === e ? ct("rarityPurple") : "gold" === e ? ct("rarityGold") : "?";
}

function cardSlotToIconName(e) {
    const t = Number(e);
    return 20 === t ? "icon_equipslot_mini_helmet" : 21 === t ? "icon_equipslot_mini_mask" : 22 === t ? "icon_equipslot_mini_mouth" : 23 === t ? "icon_equipslot_mini_body" : 24 === t ? "icon_equipslot_mini_cloak" : 25 === t ? "icon_equipslot_mini_shoes" : 26 === t ? "icon_equipslot_mini_suit" : 27 === t ? "icon_equipslot_mini_wing" : 28 === t ? "icon_equipslot_mini_accessory" : 29 === t ? "icon_equipslot_mini_weapon" : 30 === t ? "icon_equipslot_mini_shield" : null;
}

function buildCardIcon(e) {
    const t = e?.item_icon ? resolveItemIconPath(e.item_icon) : "", a = e?.mini_icon ? e.mini_icon.startsWith("icon_buff_") ? resolveIconPath(e.mini_icon) || `${CONFIG.buffIconBase}${e.mini_icon}.webp` : resolveItemIconPath(e.mini_icon) : "", n = document.createElement("img");
    n.className = "card-icon", n.loading = "lazy", n.decoding = "async", n.alt = "", 
    n.src = t || a || "";
    const r = [ t, a ].filter(Boolean);
    let i = 0;
    return n.onerror = () => {
        i += 1, i >= r.length ? n.onerror = null : n.src = r[i];
    }, n;
}

function buildCardElement(e) {
    const t = qualityToRarityKey(e.quality), a = document.createElement("article");
    a.className = `card-entry rarity-${t}`;
    const n = document.createElement("div");
    n.className = "card-icon-col";
    const r = document.createElement("div");
    r.className = "card-icon-wrap", r.appendChild(buildCardIcon(e)), n.appendChild(r);
    const i = document.createElement("div");
    i.className = "card-meta";
    const o = document.createElement("div");
    o.className = "card-top";
    const c = document.createElement("div");
    c.className = "card-name", c.textContent = e.name ? displayCardName(e.name) : `#${e.id}`;
    const s = document.createElement("div");
    s.className = "card-badges";
    const l = document.createElement("span");
    l.className = `card-badge badge-${t}`, l.textContent = rarityLabelZh(t), s.appendChild(l);
    const d = e.card_type_name || "", u = cardSlotToIconName(e.card_type_id);
    if (d) {
        const e = document.createElement("span");
        if (e.className = "card-badge badge-slot" + (u ? " badge-slot-icon" : ""), e.title = d, 
        u) {
            const t = document.createElement("img");
            t.className = "card-badge-icon", t.loading = "lazy", t.decoding = "async", t.alt = d, 
            t.src = `${CONFIG.equipSlotIconBase}${u}.webp`, e.appendChild(t);
        } else e.textContent = d;
        n.appendChild(e);
    }
    o.appendChild(c), o.appendChild(s);
    const m = document.createElement("div");
    m.className = "card-body";
    const h = [];
    return Array.isArray(e.effect_lines) && e.effect_lines.length ? e.effect_lines.forEach(e => {
        e && h.push(String(e).trim());
    }) : (e.effect && h.push(String(e.effect).trim()), e.effect_extra && h.push(String(e.effect_extra).trim()), 
    e.effect || e.effect_extra || "number" != typeof e.words_count || h.push(ct("randomAffix", {
        count: e.words_count
    }))), m.textContent = h.filter(Boolean).join("\n"), i.appendChild(o), i.appendChild(m), 
    a.appendChild(n), a.appendChild(i), a;
}

function createChip(e, {selected: t, onClick: a, className: n, iconName: r, iconAlt: i, iconSrc: o, iconSrcs: c, hideLabel: s}) {
    const l = document.createElement("button"), d = Array.isArray(c) ? c.filter(Boolean) : o || r ? [ o || `${CONFIG.equipSlotIconBase}${r}.webp` ] : [];
    if (l.type = "button", l.className = n || "card-filter-chip", t && l.classList.add("selected"), 
    s && l.classList.add("icon-only"), l.setAttribute("aria-label", e), l.title = e, d.length) {
        const t = document.createElement("span");
        t.className = "card-filter-icon-group", d.forEach(e => {
            const a = document.createElement("img");
            a.className = "card-filter-icon", a.loading = "lazy", a.decoding = "async", a.alt = i || "", 
            a.src = e, t.appendChild(a);
        }), l.appendChild(t);
    }
    if (!s) {
        const t = document.createElement("span");
        t.textContent = e, l.appendChild(t);
    }
    return l.addEventListener("click", a), l;
}

function sortFilterOptions(e, t) {
    const a = Array.from(new Set(Array.isArray(e) ? e.map(e => String(e || "").trim()).filter(Boolean) : [])), n = new Map(t.map((e, t) => [ e, t ]));
    return a.sort((e, t) => {
        const a = n.has(e) ? n.get(e) : Number.MAX_SAFE_INTEGER, r = n.has(t) ? n.get(t) : Number.MAX_SAFE_INTEGER;
        return a !== r ? a - r : String(e).localeCompare(String(t));
    });
}

function getMonsterClassFilters(e) {
    const t = Array.isArray(e?.monster_class_filters) ? e.monster_class_filters : Array.isArray(e?.monster_source_filters) ? e.monster_source_filters : [];
    return t.map(e => String(e || "").trim()).filter(Boolean);
}

function getObtainSourceTables(e) {
    return Array.isArray(e?.obtain_source_tables) ? e.obtain_source_tables.map(e => String(e || "").trim()).filter(Boolean) : [];
}

function monsterClassLabel(e) {
    return "normal" === e ? ct("sourceNormal") : "mini" === e ? ct("sourceMini") : "mvp" === e ? ct("sourceMvp") : "elite" === e ? ct("sourceElite") : "other" === e ? ct("sourceOther") : e;
}

async function loadCardPayload() {
    const e = await fetch(withAssetVersion(CONFIG.cardsUrl));
    if (!e.ok) throw new Error(`Failed to load cards (${e.status})`);
    const t = await e.json(), a = Array.isArray(t?.cards) ? t.cards : [], n = sortFilterOptions((t?.monster_source_filters || {}).supported_filters || a.flatMap(getMonsterClassFilters), MONSTER_CLASS_FILTER_ORDER), r = sortFilterOptions((t?.obtain_source_filters || {}).supported_filters || a.flatMap(getObtainSourceTables), OBTAIN_SOURCE_FILTER_ORDER);
    return {
        cards: a,
        monsterClassFilters: n,
        obtainSourceFilters: r,
        obtainSourceIcons: {
            ...((t?.obtain_source_filters || {}).icons || {})
        },
        obtainSourceIconLists: {
            ...((t?.obtain_source_filters || {}).icon_lists || {})
        }
    };
}

function detectCardPageView() {
    const e = String(window.location.pathname || "").toLowerCase();
    if (e.includes("/cards/card-fusion/") || e.includes("/card-simulator/")) return "fusion";
    const t = new URLSearchParams(window.location.search).get("view");
    return "fusion" === String(t || "").toLowerCase() ? "fusion" : "library";
}

function getCanonicalCardViewPath(e) {
    return (window.location.pathname.startsWith("/sea/") ? "/sea" : "") + ("fusion" === e ? "/cards/card-fusion/" : "/cards/");
}

function syncCardPageView(e, t = !1) {
    const a = document.getElementById("page-header-title") || document.querySelector(".header-title"), n = document.getElementById("card-library-view"), r = document.getElementById("card-fusion-view"), i = document.querySelectorAll("[data-card-view]"), o = "fusion" === e;
    n && (n.hidden = o), r && (r.hidden = !o), i.forEach(t => {
        const a = String(t.dataset.cardView || "") === e;
        t.classList.toggle("selected", a), t.setAttribute("aria-selected", a ? "true" : "false"), 
        t.setAttribute("aria-pressed", a ? "true" : "false");
    }), a && (a.textContent = ct(o ? "headerTitleFusion" : "headerTitleCards")), window.RO_SET_PAGE_TITLE ? window.RO_SET_PAGE_TITLE(ct(o ? "pageTitleFusion" : "pageTitleCards")) : document.title = `RO仙境傳說：世界之旅 | ${ct(o ? "pageTitleFusion" : "pageTitleCards")}`;
    const c = getCanonicalCardViewPath(e);
    if (window.location.pathname !== c) {
        const a = t ? "replaceState" : "pushState";
        window.history[a]({
            cardView: e
        }, "", c + window.location.search + window.location.hash);
    }
}

function setup() {
    applyStaticUIText(), syncCardPageView(detectCardPageView(), !0), document.querySelectorAll("[data-card-view]").forEach(e => {
        e.addEventListener("click", () => {
            syncCardPageView(String(e.dataset.cardView || "library"), !1);
        });
    }), window.addEventListener("popstate", () => {
        syncCardPageView(detectCardPageView(), !0);
    });
    const e = document.getElementById("card-list"), t = document.getElementById("card-sentinel"), a = document.getElementById("card-count"), n = document.getElementById("card-search"), r = document.getElementById("card-rarity"), i = document.getElementById("card-source-chips"), o = document.getElementById("card-obtain-source-chips"), c = document.getElementById("card-slot-chips");
    if (!(e && t && a && n && r && i && o && c)) return;
    const s = {
        allCards: [],
        filtered: [],
        rendered: 0,
        query: "",
        selectedRarity: "all",
        selectedMonsterClass: null,
        selectedObtainSource: null,
        selectedSlot: null,
        monsterClassOptions: [],
        obtainSourceOptions: [],
        obtainSourceIcons: {},
        obtainSourceIconLists: {},
        slotOptions: []
    }, l = () => {
        const t = Math.min(s.rendered + CONFIG.batchSize, s.filtered.length);
        for (let a = s.rendered; a < t; a++) e.appendChild(buildCardElement(s.filtered[a]));
        s.rendered = t, a.textContent = ct("cardsCount", {
            count: s.filtered.length
        });
    }, d = () => {
        const t = normalizeText(s.query), a = s.selectedSlot, n = s.selectedMonsterClass, r = s.selectedObtainSource;
        s.filtered = s.allCards.filter(e => {
            const i = qualityToRarityKey(e.quality);
            if ("all" !== s.selectedRarity && i !== s.selectedRarity) return !1;
            if (n && !getMonsterClassFilters(e).includes(n)) return !1;
            if (r && !getObtainSourceTables(e).includes(r)) return !1;
            if (a && String(e.card_type_id) !== String(a)) return !1;
            if (!t) return !0;
            const o = Array.isArray(e.effect_lines) ? e.effect_lines.join("\n") : `${e.effect || ""}\n${e.effect_extra || ""}`;
            return normalizeText(`${e.name || ""}\n${o}\n${e.card_type_name || ""}`).includes(t);
        }), e.textContent = "", s.rendered = 0, l();
    }, u = () => {
        c.textContent = "", c.appendChild(createChip(ct("allSlots"), {
            selected: null === s.selectedSlot,
            onClick: () => {
                s.selectedSlot = null, u(), d();
            },
            className: "card-filter-chip"
        })), s.slotOptions.forEach(e => {
            c.appendChild(createChip(e.name, {
                selected: String(s.selectedSlot) === String(e.id),
                onClick: () => {
                    s.selectedSlot = e.id, u(), d();
                },
                className: "card-filter-chip",
                iconName: cardSlotToIconName(e.id),
                iconAlt: e.name
            }));
        });
    }, m = () => {
        i.textContent = "", i.appendChild(createChip(ct("allMonsterClasses"), {
            selected: null === s.selectedMonsterClass,
            onClick: () => {
                s.selectedMonsterClass = null, m(), d();
            },
            className: "card-filter-chip card-source-chip"
        })), s.monsterClassOptions.forEach(e => {
            i.appendChild(createChip(monsterClassLabel(e), {
                selected: s.selectedMonsterClass === e,
                onClick: () => {
                    s.selectedMonsterClass = e, m(), d();
                },
                className: `card-filter-chip card-source-chip card-source-chip-${e}`
            }));
        });
    }, h = () => {
        o.textContent = "", o.appendChild(createChip(ct("allObtainSources"), {
            selected: null === s.selectedObtainSource,
            onClick: () => {
                s.selectedObtainSource = null, h(), d();
            },
            className: "card-filter-chip"
        })), s.obtainSourceOptions.forEach(e => {
            const t = Array.isArray(s.obtainSourceIconLists[e]) ? s.obtainSourceIconLists[e].map(e => resolveIconPath(e)).filter(Boolean) : [], a = t.length ? t : (() => {
                const t = s.obtainSourceIcons[e], a = t ? resolveIconPath(t) : "";
                return a ? [ a ] : [];
            })();
            o.appendChild(createChip(e, {
                selected: s.selectedObtainSource === e,
                onClick: () => {
                    s.selectedObtainSource = e, h(), d();
                },
                className: "card-filter-chip",
                iconSrcs: a,
                iconAlt: e,
                hideLabel: a.length > 0
            }));
        });
    };
    r.addEventListener("click", e => {
        const t = e.target.closest(".card-rarity-btn");
        if (!t || !r.contains(t)) return;
        const a = t.dataset.rarity || "all";
        s.selectedRarity = a, r.querySelectorAll(".card-rarity-btn").forEach(e => {
            const t = String(e.dataset.rarity || "all") === String(s.selectedRarity);
            e.classList.toggle("selected", t), e.setAttribute("aria-pressed", t ? "true" : "false");
        }), d();
    }), n.addEventListener("input", () => {
        s.query = n.value || "", d();
    }), new IntersectionObserver(e => {
        e.some(e => e.isIntersecting) && l();
    }, {
        rootMargin: "800px"
    }).observe(t), (async () => {
        const p = async () => {
            try {
                return await loadIconPaths(), applyHeaderIcons(), !0;
            } catch {
                return !1;
            }
        };
        await p();
        try {
            const t = await loadCardPayload();
            s.allCards = t.cards, s.monsterClassOptions = t.monsterClassFilters, s.obtainSourceOptions = t.obtainSourceFilters, 
            s.obtainSourceIcons = t.obtainSourceIcons || {}, s.obtainSourceIconLists = t.obtainSourceIconLists || {};
            const e = new Map;
            s.allCards.forEach(t => {
                const a = t.card_type_id, n = t.card_type_name;
                null != a && n && (e.has(String(a)) || e.set(String(a), {
                    id: a,
                    name: n
                }));
            }), s.slotOptions = Array.from(e.values()).sort((e, t) => String(e.name).localeCompare(String(t.name))), 
            iconPaths || await p(), m(), h(), u(), d(), iconPaths || window.setTimeout(async () => {
                iconPaths || !await p() || (h(), d());
            }, 1500);
        } catch (t) {
            e.textContent = "";
            const n = document.createElement("div");
            n.className = "loading-state", n.textContent = `${ct("failedToLoadCards")}: ${t?.message || t}`, 
            e.appendChild(n), a.textContent = ct("loadFailed");
        }
    })();
}

"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", setup) : setup();

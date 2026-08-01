const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function detectLocale() {
    const e = new URLSearchParams(window.location.search).get("lang"), t = localStorage.getItem("ro_lang"), n = document.documentElement.getAttribute("lang"), i = Array.isArray(navigator.languages) ? navigator.languages : [], a = [ e, (navigator.language || "").trim(), ...i, t, n ], o = e => SUPPORTED_LOCALES.some(t => t.toLowerCase() === String(e).toLowerCase());
    for (const e of a) {
        if (!e) continue;
        const t = SUPPORTED_LOCALES.find(t => t.toLowerCase() === String(e).toLowerCase());
        if (t) return t;
    }
    for (const e of a) {
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

const I18N = {
    "en-US": {
        refinePerLevel: "Per +1 refine, {name}{sign}{value}",
        noEquipmentFound: "No equipment found.",
        noSetData: "No set data.",
        pieces: "{count} pieces",
        setEffect: "Set effect",
        noEffectData: "No effect data.",
        tooltipLevel: "Level: {level}",
        tooltipBaseAttr: "◆Base Attributes",
        tooltipNone: "None",
        tooltipSetTitle: "Set Effects",
        tooltipSetTier: "◆[{count}] Set Effect",
        tooltipSetTierDefault: "◆Set Effect",
        itemFallback: "Item {id}",
        allTypes: "All",
        allSubtypes: "All",
        subtype: "Subtype",
        shadowGear: "Shadow gear"
    },
    "zh-CN": {
        refinePerLevel: "精炼每+1，{name}{sign}{value}",
        noEquipmentFound: "未找到装备。",
        noSetData: "暂无套装数据。",
        pieces: "{count} 件",
        setEffect: "套装效果",
        noEffectData: "暂无效果数据。",
        tooltipLevel: "等级: {level}",
        tooltipBaseAttr: "◆基础属性",
        tooltipNone: "无",
        tooltipSetTitle: "套装效果",
        tooltipSetTier: "◆[{count}]套装效果",
        tooltipSetTierDefault: "◆套装效果",
        itemFallback: "道具 {id}",
        allTypes: "全部",
        allSubtypes: "全部",
        subtype: "子類型",
        shadowGear: "影子装备"
    },
    "th-TH": {
        refinePerLevel: "ทุก +1 การตีบวก, {name}{sign}{value}",
        noEquipmentFound: "ไม่พบอุปกรณ์",
        noSetData: "ไม่มีข้อมูลเซ็ต",
        pieces: "{count} ชิ้น",
        setEffect: "เอฟเฟกต์เซ็ต",
        noEffectData: "ไม่มีข้อมูลเอฟเฟกต์",
        tooltipLevel: "เลเวล: {level}",
        tooltipBaseAttr: "◆ค่าสถานะพื้นฐาน",
        tooltipNone: "ไม่มี",
        tooltipSetTitle: "เอฟเฟกต์เซ็ต",
        tooltipSetTier: "◆[{count}] เอฟเฟกต์เซ็ต",
        tooltipSetTierDefault: "◆เอฟเฟกต์เซ็ต",
        itemFallback: "ไอเท็ม {id}",
        allTypes: "ทั้งหมด",
        allSubtypes: "ทั้งหมด",
        subtype: "ประเภทย่อย",
        shadowGear: "Shadow gear"
    },
    "zh-TW": {
        refinePerLevel: "精煉每+1，{name}{sign}{value}",
        noEquipmentFound: "No equipment found.",
        noSetData: "No set data.",
        pieces: "{count} pieces",
        setEffect: "Set effect",
        noEffectData: "No effect data.",
        tooltipLevel: "等級: {level}",
        tooltipBaseAttr: "◆基礎屬性",
        tooltipNone: "無",
        tooltipSetTitle: "套裝效果",
        tooltipSetTier: "◆[{count}]套裝效果",
        tooltipSetTierDefault: "◆套裝效果",
        itemFallback: "Item {id}",
        allTypes: "全部",
        allSubtypes: "全部",
        subtype: "子類型",
        shadowGear: "影子裝備"
    }
}, TXT = I18N[ACTIVE_LOCALE] || I18N["en-US"];

function t(e, t = {}) {
    const n = TXT[e] || I18N["en-US"][e] || e;
    return String(n).replace(/\{(\w+)\}/g, (e, n) => String(t[n] ?? ""));
}

const CONFIG = {
    iconPathsUrl: "/sea/skill-simulator/data/icon_paths.json",
    iconBasePath: "/media/images/",
    itemIconBase: "/media/images/item/",
    equipmentUrl: `/sea/equipment/data/equipment_${ACTIVE_LOCALE}.json`
}, withAssetVersion = window.withAssetVersion || (e => e), DEBUG_IDS = new URLSearchParams(window.location.search).has("debugIds");

let iconPaths = null, equipmentData = null, fallbackItemNameMap = new Map, fallbackSuitMap = new Map, itemElements = new Map, itemLookup = new Map, activeSuitKey = null, activeSuitIds = null, activeItemId = null, activeEquipmentModalItemId = null, lastEquipmentModalTriggerEl = null, lastPointerPos = {
    x: null,
    y: null
};

const LAZY_BATCH_SIZE = 60, LAZY_FILL_PADDING = 800, EQUIPMENT_DETAIL_MODAL_MEDIA = "(max-width: 1100px)";

let lazyQueue = [], lazyRendered = 0, lazyObserver = null;

const QUALITY_OPTIONS = [ {
    value: 6,
    label: "Red",
    color: "#FA7575"
}, {
    value: 5,
    label: "Gold",
    color: "#F99854"
}, {
    value: 4,
    label: "Purple",
    color: "#BD7DEA"
}, {
    value: 3,
    label: "Blue",
    color: "#79AEF2"
} ], ITEM_TYPE_SLOT_ICONS = {
    51: "icon_equipslot_mini_helmet",
    52: "icon_equipslot_mini_mask",
    53: "icon_equipslot_mini_mouth",
    54: "icon_equipslot_mini_body",
    55: "icon_equipslot_mini_cloak",
    56: "icon_equipslot_mini_shoes",
    58: "icon_equipslot_mini_wing",
    60: "icon_equipslot_mini_accessory",
    69: "icon_equipslot_mini_shield",
    70: "icon_equipslot_mini_weapon"
}, ITEM_TYPE_SORT_ORDER = [ 70, 69, 60, 54, 55, 56, 51, 52, 53, 58 ], ITEM_TYPE_SORT_INDEX = new Map(ITEM_TYPE_SORT_ORDER.map((e, t) => [ Number(e), t ])), filters = {
    job: "",
    qualities: new Set,
    itemType: "",
    itemSubtype: "",
    keyword: "",
    showAll: !1
};

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
    const t = e && iconPaths ? iconPaths[e] || iconPaths[String(e).toLowerCase()] : "";
    return e ? t ? `${CONFIG.iconBasePath}${String(t).replace(/\\/g, "/")}` : e.startsWith("icon_equipslot_") ? `${CONFIG.iconBasePath}equipslot/${e}.webp` : e.startsWith("icon_zhujiemian_") ? `${CONFIG.iconBasePath}zhujiemian/${e}.webp` : e.startsWith("icon_shadowequip_") ? `${CONFIG.iconBasePath}shadowequip/${e}.webp` : "" : "";
}

function getTypeFilterIconName(e, t) {
    return ITEM_TYPE_SLOT_ICONS[Number(e)] || t || "";
}

function compareTypeFilterOptions(e, t) {
    const n = Number(e?.id || 0), i = Number(t?.id || 0), a = ITEM_TYPE_SORT_INDEX.has(n) ? ITEM_TYPE_SORT_INDEX.get(n) : Number.MAX_SAFE_INTEGER, o = ITEM_TYPE_SORT_INDEX.has(i) ? ITEM_TYPE_SORT_INDEX.get(i) : Number.MAX_SAFE_INTEGER;
    return a !== o ? a - o : String(e?.name || "").localeCompare(String(t?.name || ""), "zh-Hant");
}

function resolveItemIconPath(e) {
    if (!e) return "";
    const t = iconPaths ? iconPaths[e] || iconPaths[String(e).toLowerCase()] : "";
    if (t) {
        const n = String(t).replace(/\\/g, "/");
        return `${CONFIG.iconBasePath}${n}`.replace(/\.png$/i, ".webp");
    }
    return `${CONFIG.itemIconBase}${e}.webp`;
}

function applyHeaderIcons() {
    document.querySelectorAll("img[data-icon-name]").forEach(e => {
        const t = resolveIconPath(e.getAttribute("data-icon-name"));
        t && (e.src = t);
    });
}

function escapeHtml(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function stripColorTags(e) {
    return String(e || "").replace(/<color[^>]*>/gi, "").replace(/<\/color>/gi, "");
}

function formatNumber(e) {
    const t = Number(e);
    return Number.isFinite(t) ? Math.abs(t % 1) < 1e-4 ? String(Math.trunc(t)) : t.toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1") : String(e ?? "");
}

function formatAttributeValue(e, t) {
    const n = Number(t);
    if (!Number.isFinite(n)) return String(t ?? "");
    const i = Number(e?.percentage_show || 0), a = Number(e?.reserve_number || 0), o = (e, t) => {
        const n = e * t;
        return 0 === a || 0 === Math.floor(e) ? `${formatNumber(Math.trunc(n))}%` : `${formatNumber(Number.isInteger(n) ? n : Number(n.toFixed(1)))}%`;
    };
    if (0 === i) return formatNumber(n);
    if (1 === i) return o(n, .01);
    if (3 === i) return o(n, .25);
    if (4 === i) {
        const e = .1 * Math.abs(n);
        return formatNumber(n < 0 ? -Math.trunc(e) : Math.trunc(e));
    }
    if (5 === i) return formatNumber(Math.floor(.01 * n) / 100);
    const s = .01 * Math.abs(n);
    return formatNumber(n < 0 ? -Math.trunc(s) : Math.trunc(s));
}

function getAffixLines(e, t, n) {
    const i = [];
    return (e.fixedAffixes || []).forEach(e => {
        const a = n?.[e];
        a && (Array.isArray(a.attrs) && a.attrs.length ? a.attrs.forEach(e => {
            const n = t[e.attrId] || {
                name: `Attr ${e.attrId}`
            }, a = formatAttributeValue(n, e.value), o = Number(e.value) >= 0 ? "+" : "";
            i.push(`${n.name} ${o}${a}`);
        }) : a.text && i.push(stripColorTags(a.text)));
    }), i;
}

function getStuntLines(e, t) {
    const n = [];
    return (e.stunts || []).forEach(e => {
        const i = t?.[e];
        if (!i) return;
        const a = stripColorTags(i.text || i.name || i.desc || "");
        a && n.push(a);
    }), n;
}

function getRefinePerLevelLines(e, n) {
    const i = [];
    return (e.refinePerLevel || []).forEach(([e, a]) => {
        const o = n[e] || {
            name: `Attr ${e}`
        }, s = formatAttributeValue(o, a), l = Number(a) >= 0 ? "+" : "";
        i.push(t("refinePerLevel", {
            name: o.name,
            sign: l,
            value: s
        }));
    }), i;
}

async function loadEquipmentData() {
    const e = await fetch(withAssetVersion(CONFIG.equipmentUrl));
    if (!e.ok) throw new Error("Failed to load equipment data");
    return e.json();
}

function indexFallbackData(e) {
    fallbackItemNameMap = new Map, fallbackSuitMap = new Map, e && ((e.items || []).forEach(e => {
        if (null == e?.id) return;
        const t = normalizeDisplayName(e.name || "");
        t && fallbackItemNameMap.set(String(e.id), t);
    }), (e.suits || []).forEach(e => {
        null != e?.id && fallbackSuitMap.set(String(e.id), e);
    }));
}

function buildEquipmentCard(e) {
    const t = document.createElement("button");
    t.type = "button", t.className = "equipment-card", t.dataset.itemId = String(e.id), 
    e.quality && t.classList.add(`quality-${e.quality}`), t.setAttribute("aria-label", e.name || `Item ${e.id}`);
    const n = document.createElement("img");
    if (n.loading = "lazy", n.decoding = "async", n.alt = "", n.src = resolveItemIconPath(e.icon), 
    n.onerror = () => {
        n.onerror = null, n.src = "";
    }, t.appendChild(n), e.openLevel) {
        const n = document.createElement("div");
        n.className = "equipment-level", n.textContent = `Lv.${e.openLevel}`, t.appendChild(n);
    }
    return t;
}

function renderEquipment(e) {
    const n = document.getElementById("equipment-grid"), i = document.getElementById("equipment-count"), a = document.getElementById("equipment-empty");
    if (n.innerHTML = "", itemElements = new Map, itemLookup = new Map, lazyQueue = [], 
    lazyRendered = 0, !e || !e.length) return i.textContent = t("noEquipmentFound"), 
    void (a.hidden = !1);
    i.textContent = `${e.length} items`, a.hidden = !0, lazyQueue = [ ...e ].sort((e, t) => {
        const n = Number(e?.openLevel || 0), i = Number(t?.openLevel || 0);
        if (i !== n) return i - n;
        const a = Number(e?.quality || 0), o = Number(t?.quality || 0);
        return o !== a ? o - a : Number(e?.id || 0) - Number(t?.id || 0);
    }), lazyQueue.forEach(e => itemLookup.set(String(e.id), e)), renderNextEquipmentBatch(), 
    ensureLazyObserver(), queueFillEquipmentViewport();
}

function renderNextEquipmentBatch() {
    if (lazyRendered >= lazyQueue.length) return;
    const e = document.getElementById("equipment-grid");
    if (!e) return;
    const t = Math.min(lazyRendered + 60, lazyQueue.length), n = document.createDocumentFragment();
    for (let e = lazyRendered; e < t; e += 1) {
        const t = lazyQueue[e], i = buildEquipmentCard(t);
        itemElements.set(t.id, i), n.appendChild(i);
    }
    e.appendChild(n), lazyRendered = t, queueFillEquipmentViewport();
}

function queueFillEquipmentViewport() {
    lazyRendered >= lazyQueue.length || window.requestAnimationFrame(() => {
        const e = document.getElementById("equipment-sentinel");
        e && e.getBoundingClientRect().top <= window.innerHeight + 800 && renderNextEquipmentBatch();
    });
}

function ensureLazyObserver() {
    const e = document.getElementById("equipment-sentinel");
    e && (lazyObserver || "function" == typeof IntersectionObserver && (lazyObserver = new IntersectionObserver(e => {
        e.some(e => e.isIntersecting) && renderNextEquipmentBatch();
    }, {
        rootMargin: "800px"
    }), lazyObserver.observe(e)));
}

function buildItemStatText(e) {
    const t = [], n = equipmentData.attributes || {}, i = equipmentData.buffs || {}, a = equipmentData.conditions || {}, o = equipmentData.affixes || {}, s = equipmentData.stunts || {}, l = equipmentData.itemTypes || {}, r = equipmentData.itemSubtypes || {}, c = equipmentData.assemblyTypes || {}, u = equipmentData.suits || [];
    e.name && t.push(stripColorTags(e.name)), e.desc && t.push(stripColorTags(e.desc)), 
    e.icon && t.push(e.icon), null != e.openLevel && t.push(`lv ${e.openLevel}`);
    const m = l[e.itemType]?.name;
    m && t.push(stripColorTags(m));
    const p = c[e.assemblyType]?.name;
    p && t.push(stripColorTags(p));
    const d = r[e.itemSubtype]?.name;
    return d && t.push(stripColorTags(d)), (e.stats || []).forEach(([e]) => {
        const i = n[e];
        i?.name && t.push(i.name), i?.desc && t.push(i.desc);
    }), (e.buffs || []).forEach(e => {
        const n = i[e];
        n?.name && t.push(n.name), n?.desc && t.push(n.desc);
    }), (e.conditions || []).forEach(e => {
        const n = a[e];
        const i = n?.text || n?.name;
        i && t.push(i);
    }), getAffixLines(e, n, o).forEach(e => {
        t.push(e);
    }), getStuntLines(e, s).forEach(e => t.push(e)), getRefinePerLevelLines(e, n).forEach(e => t.push(e)), 
    (e.suits || []).forEach(e => {
        const a = u.find(t => String(t.id) === String(e));
        a && (a.name && t.push(stripColorTags(a.name)), (a.components || []).forEach(e => {
            e?.name && t.push(stripColorTags(e.name));
        }), (a.effects || []).forEach(e => {
            e?.desc && t.push(stripColorTags(e.desc)), buildEffectLines(e || {}, n, i).forEach(e => t.push(e));
        }));
    }), t.join(" ").toLowerCase();
}

function prepareItems(e) {
    e.forEach(e => {
        e._statText = buildItemStatText(e), e._openLevel = Number(e.openLevel || 0);
    });
}

function buildJobFilter() {
    const e = document.getElementById("equipment-filter-job");
    if (!e) return;
    const t = e.querySelector(".equipment-job-trigger"), n = e.querySelector(".equipment-job-menu");
    if (!t || !n) return;
    const i = new Set(equipmentData.jobFilters && equipmentData.jobFilters.length ? equipmentData.jobFilters : []);
    i.size || (equipmentData.items || []).forEach(e => {
        (e.jobLimits || []).forEach(e => {
            Number.isFinite(Number(e)) && i.add(Number(e));
        });
    });
    const a = Object.values(equipmentData.jobs || {}).filter(e => i.has(Number(e.id)));
    a.sort((e, t) => String(e.name || e.id).localeCompare(String(t.name || t.id), "zh-Hant"));
    const o = [ {
        id: "",
        name: "All jobs",
        icon: null
    }, ...a ], s = e => {
        if (e.icon) {
            const t = resolveIconPath(e.icon);
            if (t) {
                const e = document.createElement("img");
                return e.src = t, e.alt = "", e;
            }
        }
        const t = document.createElement("span");
        return t.className = "equipment-job-fallback", t.setAttribute("aria-hidden", "true"), 
        t;
    }, l = e => {
        n.hidden = !e, t.setAttribute("aria-expanded", String(e));
    }, r = e => {
        t.innerHTML = "";
        const n = e.name || (e.id ? `Job ${e.id}` : "All jobs");
        t.setAttribute("aria-label", n), t.setAttribute("title", n), t.appendChild(s(e));
        const i = document.createElement("span");
        i.className = "equipment-job-label", i.textContent = n, t.appendChild(i);
    };
    n.innerHTML = "", l(!1), o.forEach(e => {
        const t = document.createElement("button");
        t.type = "button", t.className = "equipment-job-option", t.dataset.value = String(e.id ?? "");
        const i = e.name || (e.id ? `Job ${e.id}` : "All jobs");
        t.setAttribute("aria-label", i), t.setAttribute("title", i), t.appendChild(s(e));
        const a = document.createElement("span");
        a.className = "equipment-job-option-label", a.textContent = i, t.appendChild(a), 
        t.addEventListener("click", () => {
            filters.job = String(e.id ?? ""), r(e), l(!1), applyFilters();
        }), n.appendChild(t);
    }), n.querySelector(".equipment-job-option") && r(o[0]), l(!1), t.addEventListener("click", e => {
        e.stopPropagation(), l(n.hidden);
    }), document.addEventListener("click", t => {
        e.contains(t.target) || l(!1);
    }), document.addEventListener("keydown", e => {
        "Escape" === e.key && l(!1);
    });
}

function buildCheckboxGroup(e, t, n) {
    const i = document.getElementById(e);
    i && (i.innerHTML = "", t.forEach(e => {
        const t = document.createElement("label");
        t.className = "equipment-checkbox", e.color && (t.classList.add("equipment-checkbox--quality"), 
        t.style.setProperty("--quality-color", e.color));
        const a = document.createElement("input");
        a.type = "checkbox", a.value = String(e.value ?? e.id), a.addEventListener("change", () => n(a.value, a.checked));
        const o = document.createElement("span");
        o.className = "equipment-checkbox-label", o.textContent = e.label, t.appendChild(a), 
        t.appendChild(o), i.appendChild(t);
    }));
}

function buildQualityFilter() {
    buildCheckboxGroup("equipment-filter-quality", QUALITY_OPTIONS, (e, t) => {
        const n = Number(e);
        t ? filters.qualities.add(n) : filters.qualities.delete(n), applyFilters();
    });
}

function createTypeFilterButton(e, t, n) {
    const i = document.createElement("button");
    i.type = "button", i.className = "equipment-type-btn", i.dataset.value = String(e.id ?? ""), 
    i.setAttribute("aria-label", e.name || "Type"), i.setAttribute("title", e.name || "Type"), 
    String(t || "") === String(e.id || "") && i.classList.add("selected");
    const a = document.createElement("div");
    a.className = "equipment-type-icon";
    const o = resolveIconPath(e.icon);
    if (o) {
        const e = document.createElement("img");
        e.src = o, e.alt = "", e.onerror = () => {
            e.style.display = "none";
        }, a.appendChild(e);
    } else a.classList.add("equipment-type-icon--empty");
    const s = document.createElement("div");
    return s.className = "equipment-type-name", s.textContent = e.name || "Type", i.appendChild(a), 
    i.appendChild(s), i.addEventListener("click", () => n(String(e.id || ""))), i;
}

function getSubtypeOptionsForType(e) {
    if (!e) return [];
    const t = equipmentData.itemSubtypes || {}, n = new Set;
    return (equipmentData.items || []).forEach(t => {
        if (String(t.itemType || "") !== String(e)) return;
        const i = Number(t.itemSubtype);
        Number.isFinite(i) && i > 0 && n.add(i);
    }), Array.from(n).map(e => {
        const n = t[String(e)] || t[e] || {};
        return {
            id: String(e),
            name: n.name || `Subtype ${e}`,
            icon: n.icon || n.iconLight || ""
        };
    }).sort((e, t) => String(e.name).localeCompare(String(t.name), "zh-Hant"));
}

function buildSubtypeFilter() {
    const e = document.getElementById("equipment-subtype-filter"), n = document.getElementById("equipment-subtype-title"), i = document.getElementById("equipment-filter-subtype");
    if (!e || !n || !i) return;
    i.innerHTML = "";
    const a = getSubtypeOptionsForType(filters.itemType);
    if (!filters.itemType || a.length <= 1) return filters.itemSubtype = "", void (e.hidden = !0);
    const o = equipmentData.itemTypes || {}, s = o[String(filters.itemType)] || o[Number(filters.itemType)] || {};
    n.textContent = s.name ? `${s.name} ${t("subtype")}` : t("subtype");
    const l = document.createElement("div");
    l.className = "equipment-type-options", [ {
        id: "",
        name: t("allSubtypes"),
        icon: ""
    }, ...a ].forEach(e => {
        l.appendChild(createTypeFilterButton(e, filters.itemSubtype, e => {
            filters.itemSubtype = e, buildSubtypeFilter(), applyFilters();
        }));
    }), i.appendChild(l), e.hidden = !1;
}

function buildTypeFilter() {
    const e = document.getElementById("equipment-filter-type");
    if (!e) return;
    e.innerHTML = "";
    const n = new Map;
    (equipmentData.items || []).forEach(e => {
        const t = Number(e.itemType);
        if (Number.isFinite(t) && t > 0) {
            const i = String(t), a = n.get(i) || {
                total: 0,
                shadow: 0
            };
            a.total += 1, isDefaultVisibleNonHandbookItem(e) && (a.shadow += 1), n.set(i, a);
        }
    });
    const i = equipmentData.itemTypes || {}, a = {
        id: "",
        name: t("allTypes"),
        icon: "",
        isShadow: !1
    }, o = Array.from(n.keys()).map(e => {
        const t = Number(e), a = i[String(t)] || i[t] || {}, o = n.get(String(t)) || {
            total: 0,
            shadow: 0
        };
        return {
            id: String(t),
            name: a.name || `Type ${t}`,
            icon: getTypeFilterIconName(t, a.filterIcon || a.icon || ""),
            isShadow: o.shadow > 0 && o.shadow === o.total
        };
    }).sort(compareTypeFilterOptions), s = o.filter(e => !e.isShadow), l = o.filter(e => e.isShadow), r = document.createDocumentFragment(), c = (e, t = "") => {
        if (!e.length) return;
        const n = document.createElement("div");
        if (n.className = "equipment-type-section", t) {
            const e = document.createElement("div");
            e.className = "equipment-type-section-title", e.textContent = t, n.appendChild(e);
        }
        const i = document.createElement("div");
        i.className = "equipment-type-options", e.forEach(e => i.appendChild(createTypeFilterButton(e, filters.itemType, e => {
            filters.itemType = e, new Set(getSubtypeOptionsForType(filters.itemType).map(e => String(e.id))).has(String(filters.itemSubtype || "")) || (filters.itemSubtype = ""), 
            buildTypeFilter(), buildSubtypeFilter(), applyFilters();
        }))), n.appendChild(i), r.appendChild(n);
    };
    c([ a, ...s ]), c(l, t("shadowGear")), e.appendChild(r), buildSubtypeFilter();
}

function attachRangeFilters() {
    const e = document.getElementById("equipment-filter-keyword");
    e && e.addEventListener("input", () => {
        filters.keyword = e.value.trim().toLowerCase(), applyFilters();
    });
    const t = document.getElementById("equipment-filter-show-all");
    t && (t.checked = Boolean(filters.showAll), t.addEventListener("change", () => {
        filters.showAll = t.checked, applyFilters();
    }));
}

function updateShowAllAvailability() {
    const e = document.getElementById("equipment-filter-show-all");
    if (e) return (equipmentData?.items || []).filter(e => !0 !== e.isHandBook).length <= 0 ? (filters.showAll = !1, 
    e.checked = !1, e.disabled = !0, void (e.title = "No non-handbook equipment exists in this dataset.")) : (e.disabled = !1, 
    void (e.title = ""));
}

function isDefaultVisibleNonHandbookItem(e) {
    return "string" == typeof e?.icon && e.icon.startsWith("icon_shadowequip_");
}

function itemMatchesHandbook(e) {
    return !!filters.showAll || !0 === e.isHandBook || isDefaultVisibleNonHandbookItem(e);
}

function itemMatchesJob(e) {
    if (!filters.job) return !0;
    if (e.jobAll) return !0;
    const t = Number(filters.job);
    return (e.jobLimits || []).includes(t);
}

function itemMatchesQuality(e) {
    return !filters.qualities.size || filters.qualities.has(Number(e.quality));
}

function itemMatchesType(e) {
    return !filters.itemType || String(e.itemType || "") === String(filters.itemType);
}

function itemMatchesSubtype(e) {
    return !filters.itemSubtype || String(e.itemSubtype || "") === String(filters.itemSubtype);
}

function itemMatchesStats(e) {
    const t = e._statText || "";
    return !(filters.keyword && !t.includes(filters.keyword));
}

function applyFilters() {
    if (!equipmentData) return;
    let e = (equipmentData.items || []).filter(e => itemMatchesHandbook(e) && itemMatchesJob(e) && itemMatchesQuality(e) && itemMatchesType(e) && itemMatchesSubtype(e) && itemMatchesStats(e));
    activeSuitIds && activeSuitIds.size && (e = e.filter(e => activeSuitIds.has(String(e.id)))), 
    renderEquipment(e), updateSuitHighlights();
}

function buildEffectLines(e, t, n) {
    const i = [];
    return e.desc ? [ stripColorTags(e.desc) ] : (Array.isArray(e.attrs) && e.attrs.length && e.attrs.forEach(e => {
        const n = t[e.attrId] || {
            name: `Attr ${e.attrId}`
        }, a = formatAttributeValue(n, e.value);
        i.push(`${n.name} +${a}`);
    }), Array.isArray(e.buffs) && e.buffs.length && e.buffs.forEach(e => {
        const t = n[e];
        if (t) {
            const e = stripColorTags(t.name), n = stripColorTags(t.desc);
            i.push(n ? `${e}: ${n}` : e);
        } else i.push(`Buff ${e}`);
    }), i.filter(Boolean));
}

function normalizeDisplayName(e) {
    return String(e || "").replace(/\s+/g, " ").trim();
}

function isMeaningfulName(e) {
    const t = normalizeDisplayName(e);
    return !!t && !/^\d+$/.test(t) && !/^set\s*\d+$/i.test(t);
}

function getSuitPieceNames(e, n) {
    const i = fallbackSuitMap.get(String(e?.id)), a = new Map;
    (i?.components || []).forEach(e => {
        if (!e || null == e.id) return;
        const t = normalizeDisplayName(e.name || "");
        t && a.set(String(e.id), t);
    });
    const o = [], s = Array.isArray(e?.components) ? e.components : [];
    return s.length ? (s.forEach(e => {
        if (!e || null == e.id) return;
        const i = normalizeDisplayName(e.name), s = normalizeDisplayName(a.get(String(e.id)) || ""), l = normalizeDisplayName(n.get(String(e.id)) || fallbackItemNameMap.get(String(e.id)) || t("itemFallback", {
            id: e.id
        })), r = isMeaningfulName(i) ? i : isMeaningfulName(s) ? s : l;
        o.push(r);
    }), o) : ((Array.isArray(e?.items) ? e.items : []).forEach(e => {
        const i = normalizeDisplayName(n.get(String(e)) || fallbackItemNameMap.get(String(e)) || t("itemFallback", {
            id: e
        }));
        o.push(i);
    }), o);
}

function getSuitDisplayName(e, n) {
    const i = normalizeDisplayName(e?.name);
    if (isMeaningfulName(i)) return i;
    const a = fallbackSuitMap.get(String(e?.id)), o = normalizeDisplayName(a?.name);
    if (isMeaningfulName(o)) return o;
    const s = getSuitPieceNames(e, n);
    return s.length ? s[0] : t("tooltipSetTitle");
}

function renderSuitList(e, n, i) {
    const a = document.getElementById("suit-list");
    a.innerHTML = "";
    const o = new Map, s = new Map;
    (equipmentData.items || []).forEach(e => {
        s.set(String(e.id), e), (e.suits || []).forEach(t => {
            const n = String(t);
            let i = o.get(n);
            i || (i = new Set, o.set(n, i)), i.add(String(e.id));
        });
    });
    const l = new Map(Array.from(s.entries()).map(([e, n]) => [ e, normalizeDisplayName(n?.name || t("itemFallback", {
        id: e
    })) ]));
    (e || []).forEach(e => {
        const t = Array.isArray(e.itemIds) ? e.itemIds : Array.isArray(e.items) ? e.items : [];
        if (!t.length) return;
        const n = String(e.id);
        let i = o.get(n);
        i || (i = new Set, o.set(n, i)), t.forEach(e => {
            null != e && i.add(String(e));
        });
    });
    const r = (e || []).filter(e => {
        const t = o.get(String(e.id));
        return t && t.size > 0;
    });
    if (!r.length) return void (a.innerHTML = `<div class="empty-state">${escapeHtml(t("noSetData"))}</div>`);
    const c = new Map;
    r.forEach(e => {
        const t = getSuitDisplayName(e, l);
        c.set(t, (c.get(t) || 0) + 1);
    });
    const u = "zh-TW" === ACTIVE_LOCALE ? "zh-Hant" : ACTIVE_LOCALE, m = [ ...r ].sort((e, t) => {
        const n = getSuitDisplayName(e, l), i = getSuitDisplayName(t, l);
        return String(n).localeCompare(String(i), u);
    }), p = [ {
        min: 1,
        max: 20,
        label: "Lv.1-20"
    }, {
        min: 21,
        max: 40,
        label: "Lv.21-40"
    }, {
        min: 41,
        max: 60,
        label: "Lv.41-60"
    }, {
        min: 61,
        max: 80,
        label: "Lv.61-80"
    }, {
        min: 81,
        max: 999,
        label: "Lv.81+"
    } ], d = new Map;
    m.forEach(e => {
        const t = o.get(String(e.id)) || new Set, n = Array.from(t).map(e => s.get(String(e))).filter(Boolean).map(e => Number(e.openLevel || 0)).filter(e => Number.isFinite(e) && e > 0), i = n.length ? Math.min(...n) : null, a = n.length ? Math.max(...n) : null, r = getSuitDisplayName(e, l), u = (c.get(r) || 0) > 1 && i ? i === a ? `Lv.${i}` : `Lv.${i}-${a}` : "", m = u ? `${r} · ${u}` : r, f = (e => {
            if (!e) return "Unknown";
            const t = p.find(t => e >= t.min && e <= t.max);
            return t ? t.label : "Unknown";
        })(i);
        d.has(f) || d.set(f, []), d.get(f).push({
            suit: e,
            displayName: m,
            availableSet: t
        });
    });
    const f = p.map(e => e.label);
    d.has("Unknown") && f.push("Unknown"), f.forEach(e => {
        const o = d.get(e);
        if (!o || !o.length) return;
        const s = document.createElement("div");
        s.className = "suit-group-title", s.textContent = e, a.appendChild(s), o.forEach(({suit: e, displayName: o, availableSet: s}) => {
            const l = document.createElement("button");
            l.type = "button", l.className = "suit-card", l.dataset.suitKey = String(e.id), 
            l.dataset.suitIds = String(e.id);
            const r = document.createElement("div");
            r.className = "suit-title", r.textContent = o;
            const c = document.createElement("div");
            c.className = "suit-meta";
            const u = e.components && e.components.length ? e.components.length : s.size;
            c.textContent = t("pieces", {
                count: u
            }), l.dataset.suitItems = Array.from(s).join(","), l.appendChild(r), l.appendChild(c);
            const m = document.createElement("div");
            m.className = "suit-effect-list";
            const p = Array.isArray(e.effects) ? e.effects : [], d = new Set;
            p.forEach(e => {
                const a = JSON.stringify({
                    num: e.num || 0,
                    desc: e.desc || "",
                    attrs: e.attrs || [],
                    buffs: e.buffs || []
                });
                if (d.has(a)) return;
                d.add(a);
                const o = document.createElement("div");
                o.className = "suit-effect-tier", o.textContent = e.num ? t("pieces", {
                    count: e.num
                }) : t("setEffect"), m.appendChild(o);
                const s = buildEffectLines(e, n, i);
                if (s.length) s.forEach(e => {
                    const t = document.createElement("div");
                    t.textContent = e, m.appendChild(t);
                }); else {
                    const e = document.createElement("div");
                    e.textContent = t("noEffectData"), m.appendChild(e);
                }
            }), l.appendChild(m), a.appendChild(l);
        });
    });
}

function updateSuitHighlights() {
    document.querySelectorAll(".suit-card").forEach(e => {
        e.classList.toggle("active", String(e.dataset.suitKey) === String(activeSuitKey));
    });
}

function attachSuitHandlers() {
    document.getElementById("suit-list").addEventListener("click", e => {
        const t = e.target.closest(".suit-card");
        if (!t) return;
        const n = t.dataset.suitKey;
        String(activeSuitKey) === String(n) ? (activeSuitKey = null, activeSuitIds = null) : (activeSuitKey = n, 
        activeSuitIds = new Set((t.dataset.suitItems || "").split(",").filter(Boolean))), 
        applyFilters();
    });
}

function buildTooltipHtml(e) {
    const n = equipmentData.attributes || {}, i = equipmentData.buffs || {}, a = equipmentData.conditions || {}, o = (equipmentData.affixes, 
    equipmentData.stunts, equipmentData.itemTypes || {}), s = equipmentData.assemblyTypes || {}, l = equipmentData.suits || [], r = resolveItemIconPath(e.icon), c = [ o[e.itemType]?.name || "", e.assemblyType && s[e.assemblyType]?.name || "" ].filter(Boolean).join(" · ");
    let u = '<div class="tooltip-header">';
    r && (u += `<img src="${r}" class="tooltip-icon" alt="">`), u += "<div>", u += `<div class="tooltip-title">${escapeHtml(e.name || `Item ${e.id}`)}</div>`, 
    c && (u += `<div class="tooltip-subtitle">${escapeHtml(c)}</div>`), e.openLevel && (u += `<div class="tooltip-meta">${escapeHtml(t("tooltipLevel", {
        level: e.openLevel
    }))}</div>`), u += "</div></div>", e.desc && (u += `<div class="tooltip-desc">${escapeHtml(stripColorTags(e.desc))}</div>`);
    const m = [];
    Array.isArray(e.stats) && e.stats.forEach(([e, t]) => {
        const i = n[e] || {
            name: `Attr ${e}`
        }, a = formatAttributeValue(i, t), o = Number(t) >= 0 ? "+" : "";
        m.push(`${i.name} ${o}${a}`);
    });
    const p = (e.buffs || []).map(e => {
        const t = i[e];
        if (!t) return `Buff ${e}`;
        const n = stripColorTags(t.name), a = stripColorTags(t.desc);
        return a ? `${n}: ${a}` : n;
    }), d = [];
    (e.conditions || []).forEach(e => {
        const t = a?.[e];
        if (!t) return void d.push(`Condition ${e}`);
        const n = stripColorTags(t.text || t.name || "");
        n && d.push(n);
    });
    const f = (e.suits || []).map(e => l.find(t => String(t.id) === String(e))).filter(Boolean);
    u += '<div class="tooltip-section">', u += `<div class="tooltip-section-title">${escapeHtml(t("tooltipBaseAttr"))}</div>`;
    const h = [ ...m, ...p, ...d ];
    h.length ? u += `<div class="tooltip-list">${h.map(e => `<div>${escapeHtml(e)}</div>`).join("")}</div>` : u += `<div class="tooltip-empty">${escapeHtml(t("tooltipNone"))}</div>`, 
    u += "</div>";
    const g = new Map;
    (equipmentData.items || []).forEach(e => {
        g.set(String(e.id), e.name || `Item ${e.id}`);
    }), f.forEach(suit => {
        if (isDefaultVisibleNonHandbookItem(e)) {
            const a = (suit.effects || []).filter(effect => Number(effect.quality) === Number(e.suitQuality));
            if (!a.length) return;
            u += '<div class="tooltip-section tooltip-section--set"><div class="tooltip-list tooltip-list--set">', a.forEach(effect => {
                const a = effect.num ? t("tooltipSetTier", {
                    count: effect.num
                }) : t("tooltipSetTierDefault");
                u += `<div class="tooltip-set-effect-title">${escapeHtml(a)}</div>`;
                const o = buildEffectLines(effect, n, i);
                o.forEach(line => {
                    u += `<div class="tooltip-set-effect">${escapeHtml(line)}</div>`;
                });
            }), u += "</div></div>";
            return;
        }
        const a = getSuitPieceNames(suit, g), o = suit.components && suit.components.length ? suit.components.length : suit.items?.length || 0, s = getSuitDisplayName(suit, g), l = o ? `◆${s}(0/${o})` : `◆${s}`;
        u += '<div class="tooltip-section tooltip-section--set">', u += `<div class="tooltip-section-title">${l}</div>`,
        u += '<div class="tooltip-list tooltip-list--set">', a.forEach(e => {
            u += `<div class="tooltip-set-item">${escapeHtml(e)}</div>`;
        }), (suit.effects || []).forEach(effect => {
            const a = effect.num ? t("tooltipSetTier", {
                count: effect.num
            }) : t("tooltipSetTierDefault");
            u += `<div class="tooltip-set-effect-title">${escapeHtml(a)}</div>`;
            const o = buildEffectLines(effect, n, i);
            o.length && o.forEach(line => {
                u += `<div class="tooltip-set-effect">${escapeHtml(line)}</div>`;
            });
        }), u += "</div></div>";
    });
    if (isDefaultVisibleNonHandbookItem(e) && Array.isArray(e.specialEffects) && e.specialEffects.length) {
        u += '<div class="tooltip-section tooltip-section--set"><div class="tooltip-list tooltip-list--set">', e.specialEffects.forEach(effect => {
            if ("string" != typeof effect) return;
            const line = stripColorTags(effect);
            line && (u += `<div class="tooltip-set-effect">${escapeHtml(line)}</div>`);
        }), u += "</div></div>";
    }
    if (DEBUG_IDS) {
        const t = (e.suits || []).join(",");
        u += `<div class="tooltip-section"><div class="tooltip-empty">debug itemId=${escapeHtml(e.id)} icon=${escapeHtml(e.icon || "")} suitIds=${escapeHtml(t)}</div></div>`;
    }
    return u;
}

function getEquipmentItemById(e) {
    return itemLookup.get(String(e)) || (equipmentData?.items || []).find(t => String(t.id) === String(e)) || null;
}

function isCompactEquipmentDetailView() {
    return Boolean(window.matchMedia && window.matchMedia(EQUIPMENT_DETAIL_MODAL_MEDIA).matches);
}

function renderEquipmentDetailModal() {
    const e = document.getElementById("equipment-detail-modal-content"), t = document.getElementById("equipment-detail-modal-title");
    if (!e || !t) return;
    const n = getEquipmentItemById(activeEquipmentModalItemId);
    e.innerHTML = n ? buildTooltipHtml(n) : "", t.textContent = n?.name || "Equipment Details";
}

function openEquipmentDetailModal(e, t = null) {
    const n = document.getElementById("equipment-detail-modal"), i = getEquipmentItemById(e);
    if (!n || !i) return;
    hideTooltip(), activeEquipmentModalItemId = String(e), t instanceof HTMLElement ? lastEquipmentModalTriggerEl = t : document.activeElement instanceof HTMLElement && !n.contains(document.activeElement) && (lastEquipmentModalTriggerEl = document.activeElement), 
    renderEquipmentDetailModal(), n.classList.add("open"), n.setAttribute("aria-hidden", "false"), 
    n.inert = !1;
    const a = n.querySelector("[data-equipment-modal-close]");
    a instanceof HTMLElement && requestAnimationFrame(() => {
        a.focus({
            preventScroll: !0
        });
    });
}

function closeEquipmentDetailModal() {
    const e = document.getElementById("equipment-detail-modal");
    if (!e) return;
    const t = document.activeElement;
    t instanceof HTMLElement && e.contains(t) && t.blur(), e.classList.remove("open"), e.setAttribute("aria-hidden", "true"), 
    e.inert = !0, activeEquipmentModalItemId = null;
    const n = lastEquipmentModalTriggerEl instanceof HTMLElement && lastEquipmentModalTriggerEl.isConnected ? lastEquipmentModalTriggerEl : null;
    n && requestAnimationFrame(() => {
        n.focus({
            preventScroll: !0
        });
    });
}

function showTooltip(e, t, n, i) {
    if (isCompactEquipmentDetailView()) return;
    if (activeItemId === e) return;
    const a = document.getElementById("tooltip"), o = getEquipmentItemById(e);
    if (o) if (a.innerHTML = buildTooltipHtml(o), a.classList.add("visible"), a.classList.remove("hidden"), 
    activeItemId = e, "number" == typeof n && "number" == typeof i) positionTooltip(n, i); else {
        const e = t.getBoundingClientRect();
        positionTooltip(e.right + 8, e.top + e.height / 2);
    }
}

function hideTooltip() {
    const e = document.getElementById("tooltip");
    e.classList.remove("visible"), e.classList.add("hidden"), activeItemId = null;
}

function positionTooltip(e, t) {
    const n = document.getElementById("tooltip");
    if (!n || !n.classList.contains("visible")) return;
    const i = n.offsetWidth || 0, a = n.offsetHeight || 0, o = 12;
    let s = e + 16, l = t + 16;
    s + i > window.innerWidth - o && (s = Math.max(o, e - i - 16)), l + a > window.innerHeight - o && (l = Math.max(o, window.innerHeight - a - o)), 
    l < o && (l = o), n.style.left = `${s}px`, n.style.top = `${l}px`;
}

function attachTooltipHandlers() {
    const e = document.getElementById("equipment-grid"), t = document.getElementById("equipment-detail-modal");
    e && (window.addEventListener("scroll", queueFillEquipmentViewport, {
        passive: !0
    }), window.addEventListener("resize", queueFillEquipmentViewport, {
        passive: !0
    }), window.addEventListener("resize", () => {
        isCompactEquipmentDetailView() || closeEquipmentDetailModal();
    }), e.addEventListener("click", e => {
        const t = e.target.closest(".equipment-card");
        t && isCompactEquipmentDetailView() && openEquipmentDetailModal(t.dataset.itemId, t);
    }), e.addEventListener("mousemove", e => {
        if (isCompactEquipmentDetailView()) return;
        lastPointerPos = {
            x: e.clientX,
            y: e.clientY
        }, positionTooltip(e.clientX, e.clientY);
    }), e.addEventListener("mouseover", e => {
        if (isCompactEquipmentDetailView()) return;
        const t = e.target.closest(".equipment-card");
        t && showTooltip(t.dataset.itemId, t, e.clientX, e.clientY);
    }), e.addEventListener("mouseout", e => {
        if (isCompactEquipmentDetailView()) return;
        const t = e.target.closest(".equipment-card");
        t && (e.relatedTarget && t.contains(e.relatedTarget) || hideTooltip());
    }), e.addEventListener("focusin", e => {
        if (isCompactEquipmentDetailView()) return;
        const t = e.target.closest(".equipment-card");
        t && showTooltip(t.dataset.itemId, t);
    }), e.addEventListener("focusout", e => {
        if (isCompactEquipmentDetailView()) return;
        e.target.closest(".equipment-card") && hideTooltip();
    }), window.addEventListener("scroll", () => {
        isCompactEquipmentDetailView() || !activeItemId || null === lastPointerPos.x || positionTooltip(lastPointerPos.x, lastPointerPos.y);
    }, {
        passive: !0
    })), t && t.addEventListener("click", e => {
        const t = e.target;
        t && t.hasAttribute("data-equipment-modal-close") && closeEquipmentDetailModal();
    }), document.addEventListener("pointerdown", e => {
        const t = String(e.pointerType || "").toLowerCase();
        if ("touch" !== t && "pen" !== t) return;
        const n = document.getElementById("tooltip");
        n && n.classList.contains("visible") && (e.target.closest(".equipment-card, #tooltip") || hideTooltip());
    }), document.addEventListener("keydown", e => {
        "Escape" === e.key && closeEquipmentDetailModal();
    });
}

async function init() {
    await loadIconPaths(), applyHeaderIcons(), equipmentData = await loadEquipmentData(), 
    indexFallbackData(null), prepareItems(equipmentData.items || []), renderSuitList(equipmentData.suits || [], equipmentData.attributes || {}, equipmentData.buffs || {}), 
    buildJobFilter(), buildQualityFilter(), buildTypeFilter(), updateShowAllAvailability(), 
    attachRangeFilters(), attachSuitHandlers(), attachTooltipHandlers(), applyFilters(), 
    updateSuitHighlights();
}

init().catch(e => {
    console.error(e);
    const t = document.getElementById("equipment-count");
    t && (t.textContent = "Failed to load equipment data.");
});

const CONFIG = {
    iconBasePath: "/media/images/",
    emberBasePath: "/media/images/ember/"
}, withAssetVersion = window.withAssetVersion || (e => e), SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function detectLocale() {
    const e = new URLSearchParams(window.location.search).get("lang"), t = localStorage.getItem("ro_lang"), n = document.documentElement.getAttribute("lang"), r = Array.isArray(navigator.languages) ? navigator.languages : [], a = [ e, (navigator.language || "").trim(), ...r, t, n ], s = e => SUPPORTED_LOCALES.some(t => t.toLowerCase() === String(e).toLowerCase());
    for (const e of a) {
        if (!e) continue;
        const t = SUPPORTED_LOCALES.find(t => t.toLowerCase() === String(e).toLowerCase());
        if (t) return t;
    }
    for (const e of a) {
        if (!e) continue;
        const t = String(e).split("-")[0].toLowerCase();
        if ("zh" === t) {
            if (s("zh-TW")) return "zh-TW";
            const e = SUPPORTED_LOCALES.find(e => e.toLowerCase().startsWith("zh-"));
            if (e) return e;
        }
        if ("en" === t && s("en-US")) return "en-US";
        if (("id" === t || "in" === t) && s("id-ID")) return "id-ID";
    }
    return s("en-US") ? "en-US" : s("zh-TW") ? "zh-TW" : SUPPORTED_LOCALES[0] || "en-US";
}

const ACTIVE_LOCALE = detectLocale();

localStorage.setItem("ro_lang", ACTIVE_LOCALE), document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const ICON_PATHS_URL = "/sea/skill-simulator/data/icon_paths.json", ENGINE_RUNES_URL = `/sea/skill-simulator/data/engine_runes_${ACTIVE_LOCALE}.json`, LEGACY_URL_STATE_PREFIX = "#r=", MAX_PRIMARY_LEVEL = 4, MAX_EFFECT_LEVEL = 5, PRIMARY_LEVEL_TO_PACKAGE = {
    1: 1001,
    2: 2001,
    3: 3001,
    4: 4001
}, PRIMARY_LEVEL_TO_LIBRARY = {
    1: 33,
    2: 43,
    3: 53,
    4: 53
};

let iconPaths = null, iconPathsPromise = null, engineData = null;

const state = {
    selectedSlotIndex: 0,
    slots: Array.from({
        length: 5
    }, () => null),
    draft: null,
    resonanceExpanded: {
        1: !1,
        2: !1,
        3: !1,
        4: !1,
        5: !1
    }
};

let hashUpdateTimer = null;

function escapeHtml(e) {
    return String(e ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

function elementColor(e) {
    switch (Number(e)) {
      case 1:
        return "#63B85C";

      case 2:
        return "#B08968";

      case 3:
        return "#3ba9ff";

      case 4:
        return "#F87171";

      case 5:
        return "#FBBF24";

      default:
        return "#cbd5e1";
    }
}

function emberIconUrl(e, t) {
    return e && t ? `${CONFIG.emberBasePath}${e}_${t}.webp` : "";
}

function encodeBase64Url(e) {
    const t = (new TextEncoder).encode(e);
    let n = "";
    for (const e of t) n += String.fromCharCode(e);
    return btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function decodeBase64Url(e) {
    const t = String(e).replace(/-/g, "+").replace(/_/g, "/"), n = t + "=".repeat((4 - t.length % 4) % 4), r = atob(n), a = Uint8Array.from(r, e => e.charCodeAt(0));
    return (new TextDecoder).decode(a);
}

function appendVarUint(e, t) {
    let n = Number(e);
    if (!Number.isSafeInteger(n) || n < 0) return !1;
    do {
        let e = 127 & n;
        n = Math.floor(n / 128), n && (e |= 128), t.push(e);
    } while (n);
    return !0;
}

function readVarUint(e, t) {
    let n = 0, r = 0, a = t;
    for (;a < e.length && r <= 49; ) {
        const t = e[a++];
        if (n += (127 & t) * 2 ** r, !(128 & t)) return Number.isSafeInteger(n) ? {
            value: n,
            offset: a
        } : null;
        r += 7;
    }
    return null;
}

function appendVarInt(e, t) {
    const n = Number(e);
    return Number.isSafeInteger(n) && Math.abs(n) <= Number.MAX_SAFE_INTEGER / 2 && appendVarUint(n < 0 ? -2 * n - 1 : 2 * n, t);
}

function readVarInt(e, t) {
    const n = readVarUint(e, t);
    return n ? {
        value: n.value & 1 ? -(n.value + 1) / 2 : n.value / 2,
        offset: n.offset
    } : null;
}

function encodeBinaryBase64Url(e) {
    let t = "";
    for (const n of e) t += String.fromCharCode(n);
    return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBinaryBase64Url(e) {
    if (!e || !/^[A-Za-z0-9_-]+$/.test(e)) return null;
    try {
        const t = e.replace(/-/g, "+").replace(/_/g, "/"), n = atob(t + "=".repeat((4 - t.length % 4) % 4));
        return Uint8Array.from(n, e => e.charCodeAt(0));
    } catch {
        return null;
    }
}

function appendCompactEffect(e, t) {
    if (!e || !e.specialId && !e.attrId) return t.push(0), !0;
    if (e.specialId) {
        const n = String(e.specialId), r = (new TextEncoder).encode(n), a = Number(e.value || 1) || 1;
        return r.length > 0 && r.length <= 32 && /^[a-zA-Z_]+$/.test(n) && (t.push(2), appendVarUint(r.length, t), 
        r.forEach(e => t.push(e)), appendVarInt(a, t));
    }
    const n = Number(e.attrId);
    return Number.isSafeInteger(n) && n > 0 && (t.push(1), appendVarUint(n, t));
}

function readCompactEffect(e, t) {
    if (t >= e.length) return null;
    const n = e[t++];
    if (0 === n) return {
        effect: {},
        offset: t
    };
    if (1 === n) {
        const n = readVarUint(e, t);
        return !n || n.value < 1 ? null : {
            effect: {
                attrId: n.value
            },
            offset: n.offset
        };
    }
    if (2 !== n) return null;
    const r = readVarUint(e, t);
    if (!r || r.value < 1 || r.value > 32 || r.offset + r.value > e.length) return null;
    let a;
    try {
        a = (new TextDecoder("utf-8", {
            fatal: !0
        })).decode(e.slice(r.offset, r.offset + r.value));
    } catch {
        return null;
    }
    if (!/^[a-zA-Z_]+$/.test(a)) return null;
    const o = readVarInt(e, r.offset + r.value);
    return o ? {
        effect: {
            specialId: a,
            value: o.value || 1
        },
        offset: o.offset
    } : null;
}

function buildCompactHash() {
    const e = [ clamp(Number(state.selectedSlotIndex || 0), 0, 4) ];
    for (const t of state.slots) {
        if (!t) {
            e.push(0);
            continue;
        }
        const n = clamp(Number(t.elementId || 1), 1, 5), r = clamp(Number(t.qualityTier || 4), 1, 4), a = Array.isArray(t.colors) ? t.colors : [], o = clamp(Number(a[1] || n), 1, 5), s = clamp(Number(a[2] || n), 1, 5), l = (n - 1) | (r - 1) << 3 | (o - 1) << 5 | (s - 1) << 8, i = null == t.runeGroupId ? 0 : Math.max(0, Math.trunc(Number(t.runeGroupId) || 0)), c = Array.isArray(t.randomAffixes) ? t.randomAffixes : [];
        if (e.push(1), !appendVarUint(l, e) || !appendVarUint(i, e) || !appendCompactEffect(c[0], e) || !appendCompactEffect(c[1], e) || !appendCompactEffect(c[2], e)) return "";
    }
    return `#v1.${encodeBinaryBase64Url(e)}`;
}

function applyCompactHashState(e) {
    const t = String(e || "").replace(/^#/, "");
    if (!t.startsWith("v1.")) return !1;
    const n = decodeBinaryBase64Url(t.slice(3));
    if (!n || n.length < 6 || n[0] > 4) return !1;
    let r = 1;
    const a = [];
    for (let e = 0; e < 5; e++) {
        if (r >= n.length) return !1;
        const t = n[r++];
        if (0 === t) {
            a.push(null);
            continue;
        }
        if (1 !== t) return !1;
        const o = readVarUint(n, r);
        if (!o || o.value > 1180) return !1;
        r = o.offset;
        const s = readVarUint(n, r);
        if (!s) return !1;
        r = s.offset;
        const l = [];
        for (let e = 0; e < 3; e++) {
            const e = readCompactEffect(n, r);
            if (!e) return !1;
            l.push(e.effect), r = e.offset;
        }
        const i = 1 + (7 & o.value), c = 1 + (o.value >> 3 & 3), u = 1 + (o.value >> 5 & 7), d = 1 + (o.value >> 8 & 7);
        if (i > 5 || c > 4 || u > 5 || d > 5) return !1;
        a.push({
            elementId: i,
            qualityTier: c,
            runeGroupId: s.value || null,
            colors: [ i, u, d ],
            randomAffixes: l
        });
    }
    return r === n.length && (state.slots = a, state.selectedSlotIndex = n[0], ensureDraft(state.selectedSlotIndex), 
    !0);
}

function parseHashParams(e) {
    const t = String(e || "").startsWith("#") ? String(e || "").slice(1) : String(e || ""), n = new Map;
    for (const e of t.split("&")) {
        if (!e) continue;
        const t = e.indexOf("=");
        if (-1 === t) continue;
        const r = e.slice(0, t), a = e.slice(t + 1);
        n.set(r, a);
    }
    return n;
}

function slotToToken(e) {
    if (!e) return "-";
    const t = clamp(Number(e.elementId || 1), 1, 5), n = clamp(Number(e.qualityTier || 4), 1, 4), r = null == e.runeGroupId ? 0 : Number(e.runeGroupId), a = Array.isArray(e.colors) && e.colors[1] ? clamp(Number(e.colors[1]), 1, 5) : t, s = Array.isArray(e.colors) && e.colors[2] ? clamp(Number(e.colors[2]), 1, 5) : t, o = Array.isArray(e.randomAffixes) ? e.randomAffixes : [];
    return `${t}.${n}.${r}.${a}.${s}.${encodeRandomEffectToken(o[0])}.${encodeRandomEffectToken(o[1])}.${encodeRandomEffectToken(o[2])}`;
}

function tokenToSlot(e) {
    const t = String(e || "").trim();
    if (!t || "-" === t) return null;
    const n = t.split(".");
    if (n.length < 8) return null;
    const r = clamp(Number(n[0] || 1), 1, 5);
    return {
        elementId: r,
        qualityTier: clamp(Number(n[1] || 4), 1, 4),
        runeGroupId: Number(n[2] || 0) || 0 || null,
        colors: [ r, clamp(Number(n[3] || r), 1, 5), clamp(Number(n[4] || r), 1, 5) ],
        randomAffixes: [ decodeRandomEffectToken(n[5] || "0"), decodeRandomEffectToken(n[6] || "0"), decodeRandomEffectToken(n[7] || "0") ]
    };
}

function applyPlainHashState(e) {
    const t = parseHashParams(e);
    if (!t.has("r")) return !1;
    const n = clamp(Number(t.get("s") || 0), 0, 4), r = String(t.get("r") || "").split(",");
    if (!r.length) return !1;
    const a = Array.from({
        length: 5
    }, (e, t) => tokenToSlot(r[t] || "-"));
    return state.slots = a, state.selectedSlotIndex = n, ensureDraft(state.selectedSlotIndex), 
    !0;
}

function applyLegacyHashState(e) {
    if (!String(e || "").startsWith("#r=")) return !1;
    const t = String(e || "").slice(3);
    try {
        const e = decodeBase64Url(t), n = JSON.parse(e);
        if (!n || 1 !== n.v || !Array.isArray(n.slots)) return !1;
        const r = Array.from({
            length: 5
        }, (e, t) => {
            const r = n.slots[t];
            if (!r) return null;
            const a = clamp(Number(r.e || 1), 1, 5), s = Array.isArray(r.c) ? r.c.map(e => clamp(Number(e), 1, 5)) : [ a, a, a ], o = [ a, s[1] ? clamp(Number(s[1]), 1, 5) : a, s[2] ? clamp(Number(s[2]), 1, 5) : a ], l = Array.isArray(r.a) ? r.a.slice(0, 3) : [], i = [ 0, 1, 2 ].map(e => decodeRandomEffectToken(l[e] || "0"));
            return {
                elementId: a,
                qualityTier: clamp(Number(r.q || 4), 1, 4),
                runeGroupId: null == r.g ? null : Number(r.g),
                colors: o,
                randomAffixes: i
            };
        });
        return state.slots = r, state.selectedSlotIndex = clamp(Number(n.s || 0), 0, 4), 
        ensureDraft(state.selectedSlotIndex), !0;
    } catch {
        return !1;
    }
}

function readStateFromUrl() {
    const e = String(window.location.hash || "");
    return !!applyCompactHashState(e) || !!applyLegacyHashState(e) || !!applyPlainHashState(e);
}

function scheduleUrlStateWrite() {
    hashUpdateTimer && clearTimeout(hashUpdateTimer), hashUpdateTimer = setTimeout(() => {
        hashUpdateTimer = null;
        try {
            const e = buildCompactHash(), t = `${window.location.pathname}${window.location.search}${e}`;
            window.history.replaceState(null, "", t);
        } catch {}
    }, 120);
}

function cloneSelection(e) {
    return JSON.parse(JSON.stringify(e));
}

function clamp(e, t, n) {
    const r = Number(e);
    return Number.isFinite(r) ? Math.min(Math.max(r, t), n) : t;
}

async function loadIconPaths() {
    return iconPathsPromise || (iconPathsPromise = fetch(withAssetVersion(ICON_PATHS_URL)).then(e => e && e.ok ? e.json() : {}).catch(() => ({})).then(e => (iconPaths = e || {}, 
    iconPaths)), iconPathsPromise);
}

function resolveIconPath(e) {
    const t = e && iconPaths ? iconPaths[e] || iconPaths[String(e).toLowerCase()] : "";
    return e ? t ? `${CONFIG.iconBasePath}${String(t).replace(/\\/g, "/")}` : e.startsWith("icon_zhujiemian_") ? `${CONFIG.iconBasePath}zhujiemian/${e}.webp` : "" : "";
}

function applyHeaderIcons() {
    document.querySelectorAll("img[data-icon-name]").forEach(e => {
        const t = e.getAttribute("data-icon-name");
        String(t || "").startsWith("icon_zhujiemian_") && (e.hasAttribute("width") || e.setAttribute("width", "40"), 
        e.hasAttribute("height") || e.setAttribute("height", "40"));
        const n = resolveIconPath(t);
        n && (e.src = n);
    });
}

async function loadEngineData() {
    if (engineData) return engineData;
    let e = await fetch(withAssetVersion(ENGINE_RUNES_URL));
    if (e && e.ok || "zh-TW" === ACTIVE_LOCALE || (e = await fetch(withAssetVersion("/sea/skill-simulator/data/engine_runes_zh-TW.json"))), 
    !e || !e.ok) throw new Error(`Failed to load rune data: ${ENGINE_RUNES_URL}`);
    return engineData = await e.json(), engineData;
}

function createEmptyRuneSelection() {
    return {
        elementId: 1,
        qualityTier: 4,
        runeGroupId: null,
        colors: [ 1, 1, 1 ],
        randomAffixes: [ {}, {}, {} ]
    };
}

function getSavedSlot(e) {
    return state.slots[e] || null;
}

function ensureDraft(e) {
    const t = getSavedSlot(e);
    state.draft = {
        slotIndex: e,
        selection: cloneSelection(t || createEmptyRuneSelection()),
        dirty: !1
    };
}

function autosaveDraft() {
    state.draft && state.draft.slotIndex === state.selectedSlotIndex && (state.slots[state.selectedSlotIndex] = cloneSelection(state.draft.selection), 
    state.draft.dirty = !1, scheduleUrlStateWrite());
}

function getQualityChipLabel(e) {
    return `Lv.${e}`;
}

function encodeRandomEffectToken(e) {
    if (!e) return "0";
    if (e.specialId) {
        const t = Number(e.value || 1) || 1;
        return `${e.specialId}${t}`;
    }
    return e.attrId ? String(Number(e.attrId)) : "0";
}

function decodeRandomEffectToken(e) {
    const t = String(e || "").trim();
    if (!t || "0" === t || "-" === t) return {};
    if (!/^\d+$/.test(t)) {
        const e = t.match(/^([a-zA-Z_]+)(-?\d+)?$/);
        if (e) return {
            specialId: e[1],
            value: Number(e[2] || 1) || 1
        };
    }
    const n = Number(t);
    return Number.isFinite(n) && n > 0 ? {
        attrId: n
    } : {};
}

function getRandomEffectKey(e) {
    return e ? e.specialId ? `special:${e.specialId}:${Number(e.value || 1) || 1}` : e.attrId ? `attr:${Number(e.attrId)}` : "" : "";
}

function getPrimaryBoost(e) {
    const t = Array.isArray(e?.randomAffixes) ? e.randomAffixes : [];
    let n = 0;
    for (const e of t) e && "aum" === e.specialId && (n = Math.max(n, Number(e.value || 1) || 1));
    return n;
}

function hasTiangongPrimary(e) {
    return getPrimaryBoost(e) > 0;
}

function getResonanceSlotSelection(e) {
    const t = getSavedSlot(e);
    return e !== state.selectedSlotIndex ? t : state.draft && state.draft.slotIndex === e ? t || state.draft.dirty ? state.draft.selection : null : t;
}

function buildGroupOptions(e) {
    const t = Object.values(e.effectGroups || {});
    return t.sort((e, t) => String(e.name || "").localeCompare(String(t.name || ""), "zh-Hant")), 
    t;
}

function getUsedPrimaryGroupIds(e = null) {
    const t = new Set;
    for (let n = 0; n < state.slots.length; n += 1) {
        if (n === e) continue;
        const r = state.slots[n], a = r && null != r.runeGroupId ? Number(r.runeGroupId) : 0;
        a > 0 && t.add(a);
    }
    return t;
}

function ensureValidPrimarySelection(e, t) {
    const n = buildGroupOptions(e);
    if (!n.length) return t.runeGroupId = null, !1;
    const r = null == t.runeGroupId ? 0 : Number(t.runeGroupId), a = getUsedPrimaryGroupIds(state.selectedSlotIndex);
    if (r > 0 && (e.effectGroups || {})[String(r)] && !a.has(r)) return !1;
    const s = n.find(e => !a.has(Number(e.group))) || n[0], o = s ? Number(s.group) : null, l = r !== o;
    return t.runeGroupId = o, l;
}

function normalizeRuneEffectSearch(...e) {
    return e.join(" ").replace(/\s+/g, " ").trim().toLowerCase();
}

function renderRuneEffectSearchField() {
    return '<div class="rune-selector-search-wrap"><input type="search" class="rune-selector-search" placeholder="Search effects" autocomplete="off" spellcheck="false" aria-label="Search effects"></div>';
}

function getPrimaryLevel(e) {
    return clamp(Number(e.qualityTier || 4), 1, 4);
}

function getPrimaryConfig(e, t) {
    const n = e.effectGroups && e.effectGroups[String(t.runeGroupId)] || null;
    if (!n || !n.levels) return null;
    const r = getPrimaryLevel(t), a = clamp(r + getPrimaryBoost(t), 1, Object.keys(n.levels).reduce((e, t) => Math.max(e, Number(t) || 0), 0) || 5);
    return n.levels[String(a)] || n.levels[String(r)] || null;
}

function formatProbabilityPercent(e) {
    const t = Number(e);
    return !Number.isFinite(t) || t < 0 ? "—" : `${t.toFixed(3).replace(/\.?0+$/, "")}%`;
}

function buildWeightMeta(e, t) {
    const n = Number(e), r = Number(t);
    return n > 0 && r > 0 ? {
        weight: n,
        probability: n / r * 100,
        totalWeight: r
    } : {
        weight: null,
        probability: null,
        totalWeight: r > 0 ? r : null
    };
}

function getWeightMetaLabels(e) {
    const t = e && e.uiLabels || {};
    return {
        weight: t.weight || "Weight",
        probability: t.probability || "Probability"
    };
}

function renderWeightMeta(e, t = !1) {
    if (!e && !t) return "";
    const n = getWeightMetaLabels(engineData), r = e && null != e.weight ? String(e.weight) : "—", a = e && null != e.probability ? formatProbabilityPercent(e.probability) : "—";
    return `\n        <div class="rune-option-meta">\n            <span class="rune-option-meta-item">${escapeHtml(n.weight)} ${escapeHtml(r)}</span>\n            <span class="rune-option-meta-item">${escapeHtml(n.probability)} ${escapeHtml(a)}</span>\n        </div>\n    `;
}

function getPrimaryWeightMeta(e, t, n = t?.runeGroupId) {
    const r = getPrimaryLevel(t), a = PRIMARY_LEVEL_TO_PACKAGE[r];
    if (!a) return null;
    const s = e.effectPackages && e.effectPackages[String(a)] || [];
    if (!s.length) return null;
    const o = e.effectGroups && e.effectGroups[String(n)] || null, l = o && o.levels ? o.levels[String(r)] : null;
    if (!l) return null;
    const i = s.find(e => Number(e.effectId) === Number(l.id)), c = s.reduce((e, t) => e + (Number(t.weight) || 0), 0);
    return buildWeightMeta(i ? i.weight : null, c);
}

function getRandomEffectDisplay(e, t, n) {
    if (t && t.specialId) {
        const n = e.specialRandomEffects && e.specialRandomEffects[t.specialId];
        if (n) return {
            title: n.label || n.labelTemplate || n.id,
            desc: n.effectLabel || n.effectLabelTemplate || "",
            token: encodeRandomEffectToken(t)
        };
    }
    if (t && t.attrId) {
        const r = buildAffixOptions(e, n).find(e => Number(e.attrId) === Number(t.attrId));
        if (r) return {
            title: r.showName || r.label || String(r.attrId),
            desc: r.rangeLabel || "",
            token: String(r.attrId)
        };
    }
    return {
        title: "(None)",
        desc: "",
        token: ""
    };
}

function processReserveNumber(e, t, n) {
    if (0 === e) return `${Math.trunc(t * n)}%`;
    if (0 === Math.floor(t)) return `${Math.trunc(t * n)}%`;
    const r = t * n;
    return Math.abs(r % 1) < 1e-9 ? `${r}%` : `${r.toFixed(1)}%`;
}

function formatAttributeValue(e, t, n) {
    if (!e) return "";
    const r = Number(e.percentageShow ?? 0), a = Number(e.isReserveNumber ?? 0);
    let s = "";
    if (0 === r) s = `${Math.trunc(t)}`; else if (1 === r) s = processReserveNumber(a, t, .01); else if (3 === r) s = processReserveNumber(a, t, .25); else if (4 === r) {
        const e = Math.trunc(.1 * Math.abs(t));
        s = t < 0 ? `-${e}` : `${e}`;
    } else if (5 === r) s = (Math.floor(.01 * t) / 100).toFixed(2); else {
        const e = Math.trunc(.01 * Math.abs(t));
        s = t < 0 ? `-${e}` : `${e}`;
    }
    return t > 0 && n && (s = `+${s}`), "+0" === s || "-0" === s ? "" : s;
}

function getAffixRange(e, t, n) {
    const r = e.affixRanges && e.affixRanges[String(t)] || null;
    if (!r) return null;
    const a = PRIMARY_LEVEL_TO_LIBRARY[Number(n)] || 33;
    return r[String(a)] || null;
}

function buildAffixOptions(e, t) {
    const n = PRIMARY_LEVEL_TO_LIBRARY[Number(t)] || 33, r = Object.keys(e.affixRanges || {}), a = [];
    for (const t of r) {
        const r = (e.affixRanges[t] || {})[String(n)];
        if (!r) continue;
        const s = e.attributes && e.attributes[String(t)], o = s && s.showName ? s.showName : "";
        let l = "";
        if (s) {
            const e = formatAttributeValue(s, Number(r.min), !0), t = formatAttributeValue(s, Number(r.max), !0);
            e && t && (l = e === t ? e : `${e} ~ ${t}`);
        }
        a.push({
            attrId: Number(t),
            showName: o,
            rangeLabel: l,
            label: l ? `${o} ${l}` : o
        });
    }
    return a.sort((e, t) => String(e.showName).localeCompare(String(t.showName), "zh-Hant")), 
    a;
}

function renderRuneSlots(e, t) {
    const n = document.createElement("div");
    n.className = "rune-slot-grid";
    for (let e = 0; e < 5; e++) {
        const r = document.createElement("button");
        r.className = "rune-slot " + (state.selectedSlotIndex === e ? "selected" : ""), 
        r.type = "button";
        const a = getSavedSlot(e);
        if (a) {
            const n = getPrimaryConfig(t, a), s = n ? emberIconUrl(n.icon, a.elementId) : "", o = t.elements && t.elements[String(a.elementId)] && t.elements[String(a.elementId)].name ? t.elements[String(a.elementId)].name : "", l = elementColor(Number(a.elementId)), i = (a.colors || []).map(e => {
                const n = t.elements[String(e)];
                return `<span class="element-dot" style="--dot-color: ${elementColor(Number(e))}" title="${escapeHtml(n ? n.name : `Element ${e}`)}"></span>`;
            }).join("");
            r.innerHTML = `\n                <div class="rune-slot-header">\n                    <span class="rune-slot-label">Slot ${e + 1}</span>\n                    <span class="rune-slot-clear" title="Clear slot" aria-label="Clear slot">&times;</span>\n                    <span class="rune-slot-element${o ? "" : " rune-slot-element--empty"}" ${o ? `style="--element-color: ${l}"` : 'aria-hidden="true"'}>\n                        ${o ? escapeHtml(o) : ""}\n                    </span>\n                </div>\n                <div class="rune-slot-body">\n                    <div class="rune-slot-icon">\n                        ${s ? `<img src="${s}" alt="">` : '<div class="rune-slot-icon-placeholder"></div>'}\n                    </div>\n                    <div class="rune-slot-meta">\n                        <div class="rune-slot-primary ${hasTiangongPrimary(a) ? "rune-tier-5" : ""}">${escapeHtml(n ? n.name : "")}</div>\n                        <div class="rune-slot-desc">${escapeHtml(n ? n.desc : "")}</div>\n                        <div class="rune-slot-colors rune-slot-colors-dots">${i}</div>\n                    </div>\n                </div>\n            `;
            const c = r.querySelector(".rune-slot-clear");
            c && c.addEventListener("click", t => {
                t.stopPropagation(), state.slots[e] = null, state.selectedSlotIndex === e && ensureDraft(e), 
                scheduleUrlStateWrite(), renderAll();
            });
        } else r.innerHTML = `<div class="rune-slot-empty">Slot ${e + 1}</div>`;
        r.addEventListener("click", () => {
            state.selectedSlotIndex = e, ensureDraft(e), state.slots[e] || (engineData && ensureValidPrimarySelection(engineData, state.draft.selection), 
            state.draft.dirty = !0, autosaveDraft()), scheduleUrlStateWrite(), renderAll();
        }), n.appendChild(r);
    }
    e.appendChild(n);
}

function computeRandomAffixTotals(e) {
    const t = new Map;
    for (const n of state.slots) {
        if (!n || !Array.isArray(n.randomAffixes)) continue;
        const r = clamp(Number(n.qualityTier || 4), 1, 4);
        for (const a of n.randomAffixes) {
            const n = a && a.attrId ? Number(a.attrId) : null;
            if (!n) continue;
            const s = getAffixRange(e, n, r);
            if (!s) continue;
            const o = t.get(n) || {
                min: 0,
                max: 0,
                count: 0
            };
            o.min += Number(s.min) || 0, o.max += Number(s.max) || 0, o.count += 1, t.set(n, o);
        }
    }
    const n = [];
    for (const [r, a] of t.entries()) {
        const t = e.attributes && e.attributes[String(r)], s = t && t.showName ? t.showName : String(r);
        let o = "";
        if (t) {
            const e = formatAttributeValue(t, Number(a.min), !0), n = formatAttributeValue(t, Number(a.max), !0);
            e && n && (o = e === n ? e : `${e} ~ ${n}`);
        }
        n.push({
            attrId: r,
            showName: s,
            valueLabel: o,
            count: a.count
        });
    }
    return n.sort((e, t) => String(e.showName).localeCompare(String(t.showName), "zh-Hant")), 
    n;
}

function renderRandomAffixTotals(e, t) {
    const n = computeRandomAffixTotals(t), r = document.createElement("section");
    if (r.className = "rune-totals", !n.length) return r.innerHTML = '\n            <div class="rune-totals-header">\n                <h3>Random Effects Total</h3>\n                <div class="rune-totals-sub">Pick and save runes to see totals.</div>\n            </div>\n        ', 
    void e.appendChild(r);
    const a = n.map(e => `\n            <div class="rune-total-row">\n                <div class="rune-total-name">${escapeHtml(e.showName)}</div>\n                <div class="rune-total-value">${escapeHtml(e.valueLabel || "")}</div>\n                <div class="rune-total-count">x${e.count}</div>\n            </div>\n        `).join("");
    r.innerHTML = `\n        <div class="rune-totals-header">\n            <h3>Random Effects Total</h3>\n        </div>\n        <div class="rune-totals-grid">${a}</div>\n    `, 
    e.appendChild(r);
}

function renderRuneBuilder(e, t) {
    state.draft && state.draft.slotIndex === state.selectedSlotIndex || ensureDraft(state.selectedSlotIndex);
    const n = state.draft.selection;
    ensureValidPrimarySelection(t, n) && getSavedSlot(state.selectedSlotIndex) && (state.draft.dirty = !0, 
    autosaveDraft());
    const r = getPrimaryConfig(t, n), a = getPrimaryWeightMeta(t, n), s = r ? emberIconUrl(r.icon, n.elementId) : "", o = [ 1, 2, 3, 4 ].map(e => {
        const t = getQualityChipLabel(e);
        return `<button type="button" class="quality-chip tier-${e} ${Number(n.qualityTier) === e ? "selected" : ""}" data-quality="${e}">${t}</button>`;
    }).join(""), l = buildGroupOptions(t), i = getUsedPrimaryGroupIds(state.selectedSlotIndex), c = l.map(e => {
        const r = getPrimaryConfig(t, {
            ...n,
            runeGroupId: e.group
        }), a = getPrimaryWeightMeta(t, n, e.group), s = Number(e.group) === Number(n.runeGroupId), o = i.has(Number(e.group)), l = r ? emberIconUrl(r.icon, n.elementId) : "";
        return `\n            <button type="button" class="rune-option ${s ? "selected" : ""}" data-group-id="${e.group}" data-search-text="${escapeHtml(normalizeRuneEffectSearch(r ? r.name : e.name || "", r ? r.desc : ""))}" ${o ? "disabled" : ""}>\n                <div class="rune-option-icon">\n                    ${l ? `<img src="${l}" alt="">` : '<div class="rune-slot-icon-placeholder"></div>'}\n                </div>\n                <div class="rune-option-body">\n                    <div class="rune-option-title ${hasTiangongPrimary(n) ? "rune-tier-5" : ""}">${escapeHtml(r ? r.name : e.name || "")}</div>\n                    <div class="rune-option-desc">${escapeHtml(r ? r.desc : "")}</div>\n                    ${renderWeightMeta(a)}\n                </div>\n            </button>\n        `;
    }).join(""), d = Object.values(t.elements || {}).sort((e, t) => Number(e.id) - Number(t.id)).map(e => `\n                <button type="button" class="element-chip-btn ${Number(e.id) === Number(n.elementId) ? "selected" : ""}" data-element-id="${e.id}" title="${escapeHtml(e.name)}" style="--element-color: ${elementColor(Number(e.id))}">\n                    <span class="element-chip-swatch" aria-hidden="true"></span>\n                    <span class="element-chip-label">${escapeHtml(e.name)}</span>\n                </button>\n            `).join(""), u = (e, n) => Object.values(t.elements || {}).sort((e, t) => Number(e.id) - Number(t.id)).map(t => `\n                    <button type="button" class="color-dot ${Number(t.id) === Number(n) ? "selected" : ""}" data-color-slot="${e}" data-element-id="${t.id}" title="${escapeHtml(t.name)}" style="--element-color: ${elementColor(Number(t.id))}">\n                        <span class="element-dot element-dot-lg" style="--dot-color: ${elementColor(Number(t.id))}"></span>\n                    </button>\n                `).join(""), m = buildAffixOptions(t, n.qualityTier), f = Object.values(t.specialRandomEffects || {}), p = n.randomAffixes.map((e, r) => {
        const a = new Set(n.randomAffixes.map((e, t) => t !== r ? getRandomEffectKey(e) : "").filter(Boolean)), s = getRandomEffectDisplay(t, e, n.qualityTier), o = [ {
            token: "",
            key: "",
            title: "(None)",
            desc: "",
            selected: !e || !e.specialId && !e.attrId,
            disabled: !1
        }, ...f.map(t => {
            const n = `${t.id}${Number(t.boostValue || 1) || 1}`, r = `special:${t.id}:${Number(t.boostValue || 1) || 1}`;
            return {
                token: n,
                key: r,
                title: t.label || t.labelTemplate || t.id,
                desc: t.effectLabel || t.effectLabelTemplate || "",
                selected: !(!e || e.specialId !== t.id),
                disabled: a.has(r)
            };
        }), ...m.map(t => {
            const n = `attr:${t.attrId}`;
            return {
                token: String(t.attrId),
                key: n,
                title: t.showName || t.label || String(t.attrId),
                desc: t.rangeLabel || "",
                selected: Number(t.attrId) === Number(e.attrId),
                disabled: a.has(n)
            };
        }) ].map(e => `\n            <button type="button" class="rune-option rune-option-compact ${e.selected ? "selected" : ""}" data-affix-index="${r}" data-affix-token="${escapeHtml(e.token)}" data-search-text="${escapeHtml(normalizeRuneEffectSearch(e.title, e.desc || ""))}" ${e.disabled ? "disabled" : ""}>\n                <div class="rune-option-body">\n                    <div class="rune-option-title">${escapeHtml(e.title)}</div>\n                    ${e.desc ? `<div class="rune-option-desc">${escapeHtml(e.desc)}</div>` : ""}\n                </div>\n            </button>\n        `).join("");
        return `\n            <div class="rune-affix-row">\n                <div class="rune-selector rune-affix-selector" data-open="false">\n                    <button type="button" class="rune-selector-trigger rune-selector-trigger-compact rune-selector-trigger-noicon" aria-haspopup="listbox" aria-expanded="false">\n                        <div class="rune-selector-trigger-body">\n                            <div class="rune-selector-trigger-title">${r + 1}. ${escapeHtml(s.title)}</div>\n                            ${s.desc ? `<div class="rune-selector-trigger-desc">${escapeHtml(s.desc)}</div>` : ""}\n                        </div>\n                        <div class="rune-selector-trigger-caret">&#9662;</div>\n                    </button>\n                    <div class="rune-selector-menu" role="listbox">\n                        ${renderRuneEffectSearchField()}\n                        ${o}\n                        <div class="details-placeholder rune-selector-search-empty" hidden>No matching effects.</div>\n                    </div>\n                </div>\n            </div>\n        `;
    }).join(""), g = document.createElement("section");
    g.className = "rune-builder", g.innerHTML = `\n        <div class="rune-builder-header">\n            <h2>Slot ${state.selectedSlotIndex + 1}</h2>\n        </div>\n\n        <div class="rune-builder-grid">\n            <div class="rune-form-row rune-form-row-element" style="--element-color: ${elementColor(Number(n.elementId))}">\n                <label>Element</label>\n                <div class="element-dot-row">${d}</div>\n            </div>\n\n            <div class="rune-form-row rune-form-row-level">\n                <label>Level</label>\n                <div class="quality-chip-row">\n                    ${o}\n                </div>\n            </div>\n\n            <div class="rune-form-row rune-form-row-colors">\n                <div class="rune-color-grid">\n                    <div class="rune-color-slot locked">\n                        <div class="rune-color-slot-title">Color 1 (locked)</div>\n                        <span class="element-dot element-dot-lg" style="--dot-color: ${elementColor(Number(n.elementId))}" title="${escapeHtml((t.elements[String(n.elementId)] || {}).name || "")}"></span>\n                    </div>\n                    <div class="rune-color-slot">\n                        <div class="rune-color-slot-title">Color 2</div>\n                        <div class="rune-color-picker">${u(1, Number(n.colors[1] ?? n.elementId))}</div>\n                    </div>\n                    <div class="rune-color-slot">\n                        <div class="rune-color-slot-title">Color 3</div>\n                        <div class="rune-color-picker">${u(2, Number(n.colors[2] ?? n.elementId))}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class="rune-affix-section">\n            <h3>Primary Effect</h3>\n            <div class="rune-selector" data-open="false">\n                <button type="button" class="rune-selector-trigger rune-selector-trigger-compact" aria-haspopup="listbox" aria-expanded="false">\n                    <div class="rune-selector-trigger-icon">\n                        ${s ? `<img src="${s}" alt="">` : '<div class="rune-slot-icon-placeholder"></div>'}\n                    </div>\n                    <div class="rune-selector-trigger-body">\n                        <div class="rune-selector-trigger-title ${hasTiangongPrimary(n) ? "rune-tier-5" : ""}">${escapeHtml(r ? r.name : "")} ${r ? `(Lv.${r.level})` : ""}</div>\n                        <div class="rune-selector-trigger-desc">${escapeHtml(r ? r.desc : "")}</div>\n                        ${renderWeightMeta(a)}\n                    </div>\n                    <div class="rune-selector-trigger-caret">&#9662;</div>\n                </button>\n                <div class="rune-selector-menu" role="listbox">\n                    ${c ? `${renderRuneEffectSearchField()}${c}<div class="details-placeholder rune-selector-search-empty" hidden>No matching effects.</div>` : '<div class="details-placeholder">No runes available.</div>'}\n                </div>\n            </div>\n        </div>\n\n        <div class="rune-affix-section">\n            <h3>Random Effects</h3>\n            <div class="rune-affix-grid">\n                ${p}\n            </div>\n        </div>\n    `, 
    e.appendChild(g), g.querySelectorAll(".quality-chip").forEach(e => {
        e.addEventListener("click", () => {
            n.qualityTier = clamp(Number(e.dataset.quality), 1, 4), state.draft.dirty = !0, 
            autosaveDraft(), renderAll();
        });
    }), g.querySelectorAll(".element-chip-btn[data-element-id]").forEach(e => {
        e.addEventListener("click", () => {
            const r = Number(e.dataset.elementId);
            n.elementId = r, n.colors[0] = r, n.colors[1] || (n.colors[1] = r), n.colors[2] || (n.colors[2] = r);
            ensureValidPrimarySelection(t, n), state.draft.dirty = !0, autosaveDraft(), 
            renderAll();
        });
    });
    const b = (e, t, n) => {
        const r = e ? e.querySelector(".rune-selector-trigger") : null, a = e ? e.querySelector(".rune-selector-menu") : null, s = e ? e.querySelector(".rune-selector-search") : null, o = e => {
            const n = normalizeRuneEffectSearch(e || ""), r = a ? a.querySelector(".rune-selector-search-empty") : null;
            let s = 0;
            a && a.querySelectorAll(t).forEach(e => {
                const t = !n || (e.dataset.searchText || "").includes(n);
                e.hidden = !t, t && (s += 1);
            }), r && (r.hidden = s > 0 || !n);
        }, l = () => {
            e && r && (e.dataset.open = "false", r.setAttribute("aria-expanded", "false"));
        };
        e && r && a && (a.addEventListener("click", e => {
            e.stopPropagation();
        }), s && (s.addEventListener("click", e => {
            e.stopPropagation();
        }), s.addEventListener("input", () => {
            o(s.value);
        }), o("")), r.addEventListener("click", t => {
            t.stopPropagation();
            const n = "true" === e.dataset.open;
            g.querySelectorAll('.rune-selector[data-open="true"]').forEach(t => {
                if (t === e) return;
                const n = t.querySelector(".rune-selector-trigger");
                t.dataset.open = "false", n && n.setAttribute("aria-expanded", "false");
            }), e.dataset.open = n ? "false" : "true", r.setAttribute("aria-expanded", n ? "false" : "true"), 
            n || (s && (s.value = "", o(""), setTimeout(() => {
                s.focus();
            }, 0)), document.addEventListener("click", l, {
                once: !0
            }));
        }), a.querySelectorAll(t).forEach(e => {
            e.addEventListener("click", t => {
                t.stopPropagation(), n(e), l(), renderAll();
            });
        }));
    }, h = g.querySelector(".rune-affix-section .rune-selector");
    b(h, ".rune-option[data-group-id]", e => {
        n.runeGroupId = Number(e.dataset.groupId), state.draft.dirty = !0, autosaveDraft();
    }), g.querySelectorAll(".color-dot[data-color-slot]").forEach(e => {
        e.addEventListener("click", () => {
            const t = Number(e.dataset.colorSlot);
            n.colors[t] = Number(e.dataset.elementId), state.draft.dirty = !0, autosaveDraft(), 
            renderAll();
        });
    }), g.querySelectorAll(".rune-affix-selector").forEach(e => {
        b(e, ".rune-option[data-affix-index]", e => {
            const t = Number(e.dataset.affixIndex);
            n.randomAffixes[t] = decodeRandomEffectToken(e.dataset.affixToken || "0"), state.draft.dirty = !0, 
            autosaveDraft();
        });
    });
}

function renderResonance(e, t) {
    e.dataset.editing = "true";
    const n = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    }, r = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    };
    for (let e = 0; e < state.slots.length; e += 1) {
        const t = getResonanceSlotSelection(e);
        if (t && Array.isArray(t.colors)) for (const a of t.colors) {
            const t = Number(a);
            n[t] || (n[t] = 0), n[t] += 1, e === state.selectedSlotIndex && (r[t] || (r[t] = 0), 
            r[t] += 1);
        }
    }
    e.innerHTML = `\n        <div class="rune-resonance-list">\n            ${[ 1, 2, 3, 4, 5 ].map(e => {
        const a = t.elements && t.elements[String(e)], s = Math.min(Number(n[Number(e)] || 0), 7), o = Math.min(Number(r[Number(e)] || 0), s), l = elementColor(Number(e));
        let i = 0;
        const c = [ 2, 2, 3 ].map(e => {
            const t = Math.max(0, Math.min(e, s - i)), n = i;
            i += e;
            const r = 0 === t ? "resonance-segment outline" : t === e ? "resonance-segment full" : "resonance-segment partial", a = Array.from({
                length: e
            }, (e, r) => {
                const a = r < t;
                return `<span class="resonance-slot ${a ? "active" : ""}${a && o > 0 && n + r >= s - o ? " from-selected" : ""}" style="--element-color: ${l}"></span>`;
            }).join("");
            return `<div class="${r}" style="--element-color: ${l}">${a}</div>`;
        }).join(""), d = !!state.resonanceExpanded[Number(e)], u = d ? [ 2, 4, 7 ].map(e => `\n                <div class="rune-resonance-tier ${s >= e ? "active" : ""}">\n                    <div class="rune-resonance-tier-body">${(a && a.resonance && a.resonance[String(e)] || []).map(e => `<div class="rune-resonance-line">${escapeHtml(e)}</div>`).join("")}</div>\n                </div>\n            `).join("") : "";
        return `\n            <div class="rune-resonance-card ${d ? "expanded" : ""}" style="--element-color: ${l}">\n                <button type="button" class="resonance-toggle" data-element-id="${e}" aria-expanded="${d ? "true" : "false"}">\n                    <div class="resonance-toggle-header">\n                        <div class="resonance-toggle-title">${escapeHtml(a && a.name ? a.name : `Element ${e}`)}</div>\n                        <div class="resonance-toggle-count">${s} / 7</div>\n                        <div class="resonance-toggle-caret">${d ? "&#9652;" : "&#9662;"}</div>\n                    </div>\n                    <div class="resonance-track">${c}</div>\n                    <div class="resonance-toggle-hint">\n                        <span class="resonance-toggle-hint-text">${d ? "Hide effects" : "Show effects"}</span>\n                        <span class="resonance-toggle-hint-caret" aria-hidden="true">${d ? "&#9652;" : "&#9662;"}</span>\n                    </div>\n                </button>\n                ${d ? `<div class="resonance-unlocks">${u}</div>` : ""}\n            </div>\n        `;
    }).join("")}\n        </div>\n    `, e.querySelectorAll(".resonance-toggle[data-element-id]").forEach(n => {
        n.addEventListener("click", () => {
            const r = Number(n.dataset.elementId);
            state.resonanceExpanded[r] = !state.resonanceExpanded[r], renderResonance(e, t);
        });
    });
}

function renderAll() {
    if (!engineData) return;
    const e = document.getElementById("rune-simulator-container"), t = document.getElementById("rune-resonance-panel");
    e && t && (e.innerHTML = "", renderRuneSlots(e, engineData), renderRuneBuilder(e, engineData), 
    renderRandomAffixTotals(e, engineData), renderResonance(t, engineData));
}

async function init() {
    const e = document.getElementById("rune-reset-btn");
    e && e.addEventListener("click", () => {
        state.slots = Array.from({
            length: 5
        }, () => null), state.selectedSlotIndex = 0, ensureDraft(0), engineData && ensureValidPrimarySelection(engineData, state.draft.selection), 
        state.draft.dirty = !0, autosaveDraft(), scheduleUrlStateWrite(), renderAll();
    }), await loadIconPaths(), applyHeaderIcons(), await loadEngineData(), readStateFromUrl() || (ensureDraft(0), 
    ensureValidPrimarySelection(engineData, state.draft.selection), state.draft.dirty = !0, 
    autosaveDraft()), renderAll();
}

document.addEventListener("DOMContentLoaded", () => {
    init().catch(e => {
        console.error("Rune planner init failed:", e);
        const t = document.getElementById("rune-resonance-panel");
        t && (t.innerHTML = '<div class="details-placeholder">Failed to load rune data.</div>');
    });
});

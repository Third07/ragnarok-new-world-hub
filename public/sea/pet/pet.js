const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function resolveLocaleCandidate(e) {
    const t = String(e || "").trim().toLowerCase();
    if (!t) return null;
    const a = SUPPORTED_LOCALES.find(e => e.toLowerCase() === t);
    return a || ("th-tw" === t || t.startsWith("th") ? "th-TH" : t.startsWith("id") || t.startsWith("in") ? "id-ID" : t.startsWith("en") ? "en-US" : t.startsWith("zh-tw") || t.startsWith("zh-hk") || t.startsWith("zh-mo") || t.startsWith("zh-hant") ? "zh-TW" : t.startsWith("zh-cn") || t.startsWith("zh-sg") || t.startsWith("zh-hans") ? "zh-CN" : "zh" === t || t.startsWith("zh-") ? "en-US" : null);
}

function detectLocale() {
    const e = new URLSearchParams(window.location.search).get("lang"), t = localStorage.getItem("ro_lang"), a = Array.isArray(navigator.languages) ? navigator.languages : [], n = [ e, t, (navigator.language || "").trim(), ...a ].filter(Boolean);
    for (const e of n) {
        const t = resolveLocaleCandidate(e);
        if (t) return t;
    }
    return "en-US";
}

const ACTIVE_LOCALE = detectLocale();

localStorage.setItem("ro_lang", ACTIVE_LOCALE), document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const PET_I18N = {
    "en-US": {
        petStats: "Pet Stats",
        noStats: "No stat data available at this level.",
        statsAttr: "Attribute",
        statsValue: "Value",
        playerTag: "(Player)",
        petTag: "(Pet)",
        combatSkills: "Combat Skills",
        noCombatSkills: "No combat skill data available for this pet.",
        skill: "Skill",
        levelSuffix: "Lv",
        cooldown: "Cooldown",
        second: "s",
        giftProgress: "Gift progress (preview)",
        guardianAttrs: "Guardian Skill Attributes",
        current: "Current",
        next: "Next",
        noAttrBonus: "No attribute bonus at this level.",
        all: "All",
        petsCount: "pets",
        selectPet: "Select a pet to view details.",
        noLevelData: "No level data.",
        loadFailed: "Failed to load pet data:"
    },
    "zh-CN": {
        petStats: "宠物属性",
        noStats: "该等级没有可显示的属性资料。",
        statsAttr: "属性",
        statsValue: "数值",
        playerTag: "（玩家）",
        petTag: "（宠物）",
        combatSkills: "战斗技能",
        noCombatSkills: "该宠物没有可显示的战斗技能资料。",
        skill: "技能",
        levelSuffix: "级",
        cooldown: "冷却时间",
        second: "秒",
        giftProgress: "赠送礼物进度（预览）",
        guardianAttrs: "守护技能属性",
        current: "当前",
        next: "下一级",
        noAttrBonus: "该等级没有可显示的属性加成。",
        all: "全部",
        petsCount: "宠物",
        selectPet: "选择宠物以查看详情。",
        noLevelData: "无等级资料。",
        loadFailed: "载入宠物资料失败："
    },
    "th-TH": {
        petStats: "ค่าสถานะสัตว์เลี้ยง",
        noStats: "ไม่มีข้อมูลค่าสถานะสำหรับเลเวลนี้",
        statsAttr: "คุณสมบัติ",
        statsValue: "ค่า",
        playerTag: "(ผู้เล่น)",
        petTag: "(สัตว์เลี้ยง)",
        combatSkills: "สกิลต่อสู้",
        noCombatSkills: "ไม่มีข้อมูลสกิลต่อสู้ของสัตว์เลี้ยงนี้",
        skill: "สกิล",
        levelSuffix: "เลเวล",
        cooldown: "คูลดาวน์",
        second: "วิ",
        giftProgress: "ความคืบหน้าการให้ของขวัญ (พรีวิว)",
        guardianAttrs: "ค่าสถานะสกิลผู้พิทักษ์",
        current: "ปัจจุบัน",
        next: "ถัดไป",
        noAttrBonus: "ไม่มีโบนัสค่าสถานะสำหรับเลเวลนี้",
        all: "ทั้งหมด",
        petsCount: "ตัว",
        selectPet: "เลือกสัตว์เลี้ยงเพื่อดูรายละเอียด",
        noLevelData: "ไม่มีข้อมูลเลเวล",
        loadFailed: "โหลดข้อมูลสัตว์เลี้ยงล้มเหลว:"
    },
    "zh-TW": {
        petStats: "寵物屬性",
        noStats: "此等級沒有可顯示的屬性資料。",
        statsAttr: "屬性",
        statsValue: "數值",
        playerTag: "（玩家）",
        petTag: "（寵物）",
        combatSkills: "戰鬥技能",
        noCombatSkills: "此寵物沒有可顯示的戰鬥技能資料。",
        skill: "技能",
        levelSuffix: "級",
        cooldown: "冷卻時間",
        second: "秒",
        giftProgress: "贈送禮物進度（預覽）",
        guardianAttrs: "守護技能屬性",
        current: "目前",
        next: "下一級",
        noAttrBonus: "此等級沒有可顯示的屬性加成。",
        all: "全部",
        petsCount: "隻寵物",
        selectPet: "選擇寵物以查看詳情。",
        noLevelData: "無等級資料。",
        loadFailed: "載入寵物資料失敗："
    }
}, PT = PET_I18N[ACTIVE_LOCALE] || PET_I18N["en-US"], PET_STAT_LABELS = {
    "en-US": {
        maxHp: "Max HP",
        atk: "Atk",
        def: "Def",
        matk: "Matk",
        mdef: "Mdef"
    },
    "zh-CN": {
        maxHp: "最大HP",
        atk: "Atk",
        def: "Def",
        matk: "Matk",
        mdef: "Mdef"
    },
    "th-TH": {
        maxHp: "HP สูงสุด",
        atk: "Atk",
        def: "Def",
        matk: "Matk",
        mdef: "Mdef"
    },
    "zh-TW": {
        maxHp: "最大HP",
        atk: "Atk",
        def: "Def",
        matk: "Matk",
        mdef: "Mdef"
    }
}, PET_STATS_TEXT = PET_STAT_LABELS[ACTIVE_LOCALE] || PET_STAT_LABELS["en-US"], CONFIG = {
    iconPathsUrl: "/sea/skill-simulator/data/icon_paths.json",
    iconBasePath: "/media/images/",
    dataUrl: `/sea/pet/data/pet_library_${ACTIVE_LOCALE}.json`
}, withAssetVersion = window.withAssetVersion || (e => e);

let iconPaths = null, fallbackPetSkillByKey = null;

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
        const t = iconPaths[e] || iconPaths[String(e).toLowerCase()];
        if (t) return `${CONFIG.iconBasePath}${String(t).replace(/\\/g, "/")}`;
    }
    return `${CONFIG.iconBasePath}pet/${e}.webp`;
}

function buildIconCandidates(e) {
    const t = [];
    if (e?.iconUrl && (t.push(e.iconUrl), /\.webp$/i.test(e.iconUrl) && t.push(e.iconUrl.replace(/\.webp$/i, ".png"))), 
    e?.icon) {
        const a = resolveIconPath(e.icon);
        a && (t.push(a.replace(/\.png$/i, ".webp")), t.push(a)), t.push(`/media/images/pet/${e.icon}.webp`), 
        t.push(`/media/images/pet/${e.icon}.webp`);
    }
    return [ ...new Set(t.filter(Boolean)) ];
}

function buildQualityIconCandidates(e) {
    const t = [], a = e?.quality;
    if (a?.iconUrl && (t.push(a.iconUrl), /\.webp$/i.test(a.iconUrl) && t.push(a.iconUrl.replace(/\.webp$/i, ".png"))), 
    a?.icon) {
        const e = resolveIconPath(a.icon);
        e && (t.push(e.replace(/\.png$/i, ".webp")), t.push(e)), t.push(`/media/images/pet/${a.icon}.webp`), 
        t.push(`/media/images/pet/${a.icon}.webp`);
    }
    return [ ...new Set(t.filter(Boolean)) ];
}

function bindFallbackImage(e, t) {
    let a = 0;
    t.length && (e.src = t[0], e.onerror = () => {
        if (a += 1, a >= t.length) return e.onerror = null, void e.removeAttribute("src");
        e.src = t[a];
    });
}

function normalizeText(e) {
    return String(e || "").trim().toLowerCase();
}

function isBadSkillName(e) {
    const t = String(e || "").trim();
    return !t || !!/^#?\d+$/.test(t) || /^skill\s+\d+$/i.test(t);
}

function makePetSkillKey(e, t, a) {
    return `${Number(e) || 0}:${Number(t) || 0}:${Number(a) || 0}`;
}

function makePetSkillMapFromPayload(e) {
    const t = new Map;
    return (Array.isArray(e?.pets) ? e.pets : []).forEach(e => {
        const a = Number(e?.id);
        (e?.combatSkills || []).forEach(e => {
            const n = Number(e?.kindId);
            (e?.unlocks || []).forEach(e => {
                const l = Number(e?.level), i = e?.skill || {}, s = String(i?.name || "").trim();
                if (!s || isBadSkillName(s)) return;
                const r = makePetSkillKey(a, n, l);
                t.has(r) || t.set(r, {
                    name: s,
                    description: String(i?.description || "").trim()
                });
            });
        });
    }), t;
}

async function loadPetSkillFallbackMap() {
    if (fallbackPetSkillByKey) return fallbackPetSkillByKey;
    const e = new Map, t = [];
    for (const a of t) try {
        const t = await fetch(withAssetVersion(`/sea/pet/data/pet_library_${a}.json`));
        if (!t || !t.ok) continue;
        makePetSkillMapFromPayload(await t.json()).forEach((t, a) => {
            e.has(a) || e.set(a, t);
        });
    } catch {}
    return fallbackPetSkillByKey = e, fallbackPetSkillByKey;
}

function getResolvedPetSkillDisplay(e, t, a, n) {
    const l = String(n?.name || "").trim(), i = String(n?.description || "").trim();
    if (!isBadSkillName(l) && i) return {
        name: l,
        description: i
    };
    const s = makePetSkillKey(e, t, a?.level), r = fallbackPetSkillByKey?.get(s);
    return {
        name: isBadSkillName(l) && r?.name || l,
        description: i || String(r?.description || "")
    };
}

function formatValue(e) {
    if (null == e || Number.isNaN(Number(e))) return "-";
    const t = Number(e);
    return Number.isInteger(t) ? String(t) : String(t.toFixed(2)).replace(/\.00$/, "");
}

function formatAttrValue(e, t) {
    const a = formatValue(e);
    return "-" === a ? a : t ? `${a}%` : a;
}

function buildProgressRatio(e, t) {
    return t.length, 0;
}

function formatGameTextToHtml(e) {
    const t = String(e || "").trim();
    return t ? t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/&lt;color=#([0-9a-fA-F]{6,8})&gt;([\s\S]*?)&lt;\/color&gt;/g, (e, t, a) => `<span style="color:#${t.slice(0, 6)}">${a}</span>`) : "-";
}

function stripColorTags(e) {
    return String(e || "").replace(/<color[^>]*>/gi, "").replace(/<\/color>/gi, "").trim();
}

function buildAttrCompareRows(e, t) {
    const a = Array.isArray(e?.skill?.attrs) ? e.skill.attrs : [], n = Array.isArray(t?.skill?.attrs) ? t.skill.attrs : [], l = new Map;
    return a.forEach(e => {
        e && null != e.id && l.set(e.id, {
            id: e.id,
            name: e.name || `Attr ${e.id}`,
            cur: e.value,
            next: null,
            isPercentage: Boolean(e.isPercentage),
            target: e.target || "player"
        });
    }), n.forEach(e => {
        if (!e || null == e.id) return;
        if (!l.has(e.id)) return void l.set(e.id, {
            id: e.id,
            name: e.name || `Attr ${e.id}`,
            cur: 0,
            next: e.value,
            isPercentage: Boolean(e.isPercentage),
            target: e.target || "player"
        });
        const t = l.get(e.id);
        t.next = e.value, t.isPercentage = Boolean(e.isPercentage || t.isPercentage), t.target = e.target || t.target;
    }), [ ...l.values() ].sort((e, t) => e.target !== t.target ? "player" === e.target ? -1 : 1 : String(e.name).localeCompare(String(t.name), "zh-TW" === ACTIVE_LOCALE ? "zh-Hant" : ACTIVE_LOCALE));
}

function pickStatRowsForTable(e) {
    const t = new Map;
    e.forEach(e => {
        const a = String(e?.name || "").trim();
        a && t.set(a.toLowerCase(), e);
    });
    const a = [];
    return [ "HP", "Atk", "Def", "Matk", "Mdef" ].forEach(e => {
        const n = t.get(e.toLowerCase());
        n && a.push(n);
    }), a.length ? a : e;
}

function renderPetStatsCard(e, t, a) {
    const n = document.createElement("section");
    n.className = "pet-card", n.innerHTML = `<div class="pet-card-title">${PT.petStats}</div>`;
    const l = t?.battleStats?.stats || {}, i = Number(t?.battleStats?.level || 0), s = [ {
        label: PET_STATS_TEXT.maxHp,
        key: "maxHp"
    }, {
        label: PET_STATS_TEXT.atk,
        key: "atk"
    }, {
        label: PET_STATS_TEXT.def,
        key: "def"
    }, {
        label: PET_STATS_TEXT.matk,
        key: "matk"
    }, {
        label: PET_STATS_TEXT.mdef,
        key: "mdef"
    } ].map(e => ({
        label: e.label,
        value: l[e.key]
    })).filter(e => null != e.value && !Number.isNaN(Number(e.value))), r = s.length > 0, o = r ? s : pickStatRowsForTable(a);
    if (!o.length) {
        const t = document.createElement("div");
        return t.className = "pet-muted", t.textContent = PT.noStats, n.appendChild(t), 
        void e.appendChild(n);
    }
    if (r && i > 0) {
        const e = document.createElement("div");
        e.className = "pet-muted", e.style.marginBottom = "8px", e.textContent = `Lv.${i}`, 
        n.appendChild(e);
    }
    const c = document.createElement("table");
    c.className = "pet-stat-table", c.innerHTML = `<thead><tr><th>${PT.statsAttr}</th><th>${PT.statsValue}</th></tr></thead>`;
    const d = document.createElement("tbody");
    o.forEach(e => {
        const t = document.createElement("tr"), a = document.createElement("td");
        a.textContent = r ? e.label : `${e.name}${"pet" === e.target ? PT.petTag : PT.playerTag}`;
        const n = document.createElement("td");
        n.textContent = r ? formatValue(e.value) : formatAttrValue(e.cur, e.isPercentage), 
        t.appendChild(a), t.appendChild(n), d.appendChild(t);
    }), c.appendChild(d), n.appendChild(c), e.appendChild(n);
}

function renderCombatSkillsCard(e, t) {
    const a = Array.isArray(t?.combatSkills) ? t.combatSkills : [], n = document.createElement("section");
    if (n.className = "pet-card", n.innerHTML = `<div class="pet-card-title">${PT.combatSkills}</div>`, 
    !a.length) {
        const t = document.createElement("div");
        return t.className = "pet-muted", t.textContent = PT.noCombatSkills, n.appendChild(t), 
        void e.appendChild(n);
    }
    a.slice().sort((e, t) => Number(e?.type || 0) - Number(t?.type || 0)).forEach(e => {
        const a = Array.isArray(e?.unlocks) ? e.unlocks : [], l = `${t?.id || 0}:${e?.kindId || 0}`, i = Math.max(0, a.length - 1), s = state.combatSkillLevelByPetKind.get(l), r = Number.isInteger(s) ? Math.max(0, Math.min(s, i)) : i;
        state.combatSkillLevelByPetKind.has(l) || state.combatSkillLevelByPetKind.set(l, r);
        const o = a.length ? a[r] : null, c = o?.skill || null, d = getResolvedPetSkillDisplay(t?.id, e?.kindId, o, c), u = document.createElement("div");
        u.className = "pet-combat-row";
        const m = document.createElement("div");
        m.className = "pet-combat-icon";
        const p = document.createElement("img");
        p.alt = d?.name || c?.name || e?.typeLabel || "";
        const h = [];
        if (c?.iconUrl && (h.push(c.iconUrl), /\.webp$/i.test(c.iconUrl) && h.push(c.iconUrl.replace(/\.webp$/i, ".png"))), 
        c?.icon) {
            const e = resolveIconPath(c.icon);
            e && (h.push(e.replace(/\.png$/i, ".webp")), h.push(e));
        }
        bindFallbackImage(p, [ ...new Set(h.filter(Boolean)) ]), m.appendChild(p), u.appendChild(m);
        const g = document.createElement("div");
        g.className = "pet-combat-content";
        const f = document.createElement("div");
        f.className = "pet-combat-title";
        const b = o?.level ? `Lv.${o.level}` : "", y = stripColorTags(d?.name || c?.name || "-");
        if (f.textContent = `${e?.typeLabel || PT.skill}｜${y || "-"}${b ? `（${b}）` : ""}`, 
        g.appendChild(f), a.length) {
            const e = document.createElement("div");
            e.className = "pet-combat-levels", a.forEach((t, a) => {
                const n = document.createElement("button");
                n.type = "button", n.className = "pet-combat-level-btn", a === r && n.classList.add("active"), 
                n.textContent = `${t?.level ?? 0}${PT.levelSuffix}`, n.addEventListener("click", () => {
                    state.combatSkillLevelByPetKind.set(l, a), renderDetail();
                }), e.appendChild(n);
            }), g.appendChild(e);
        }
        const P = document.createElement("div");
        P.className = "pet-combat-meta";
        const v = [ e?.typeLabel || "", c?.skillTypeDesName || "", c?.elementName || "" ].filter(Boolean), C = Number(c?.cooldownSeconds || 0);
        P.textContent = v.join("・") + (C > 0 ? `　${PT.cooldown}：${C.toFixed(1)}${PT.second}` : ""), 
        g.appendChild(P);
        const k = document.createElement("div");
        k.className = "pet-muted", k.innerHTML = formatGameTextToHtml(d?.description || c?.description), 
        g.appendChild(k), u.appendChild(g), n.appendChild(u);
    }), e.appendChild(n);
}

function renderPetDetail(e, t, a) {
    const n = Array.isArray(t?.levels) ? t.levels : [];
    if (!n.length) return void (e.innerHTML = `<div class="pet-detail-empty">${PT.noLevelData}</div>`);
    const l = Math.max(0, Math.min(a, Math.max(n.length - 1, 0))), i = n[l], s = n[Math.min(l + 1, n.length - 1)], r = l < n.length - 1, o = buildProgressRatio(l, n), c = Number(s?.expRequired || i?.expRequired || 0), d = Math.floor(c * o), u = buildAttrCompareRows(i, s);
    e.innerHTML = "";
    const m = document.createElement("div");
    m.className = "pet-detail-head";
    const p = document.createElement("img");
    p.alt = t.name || "", bindFallbackImage(p, buildIconCandidates(t)), m.appendChild(p);
    const h = document.createElement("div"), g = document.createElement("div");
    g.className = "pet-name", g.textContent = t.name || `#${t.id}`;
    const f = document.createElement("div");
    f.className = "pet-muted", f.textContent = i?.title || "", h.appendChild(g), h.appendChild(f), 
    m.appendChild(h);
    const b = document.createElement("div");
    b.className = "pet-level-step";
    const y = document.createElement("span");
    y.textContent = `Lv.${i?.level ?? 0}`;
    const P = document.createElement("div");
    P.className = "pet-level-controls";
    const v = document.createElement("button");
    v.type = "button", v.textContent = "-", v.disabled = l <= 0, v.addEventListener("click", () => {
        state.levelIndexByPet.set(t.id, Math.max(0, l - 1)), render();
    });
    const C = document.createElement("button");
    C.type = "button", C.textContent = "+", C.disabled = !r, C.addEventListener("click", () => {
        state.levelIndexByPet.set(t.id, Math.min(l + 1, n.length - 1)), render();
    });
    const k = document.createElement("button");
    k.type = "button", k.textContent = "++", k.disabled = !r, k.addEventListener("click", () => {
        state.levelIndexByPet.set(t.id, Math.max(n.length - 1, 0)), render();
    }), P.appendChild(v), P.appendChild(C), P.appendChild(k), b.appendChild(y), b.appendChild(P), 
    m.appendChild(b), e.appendChild(m);
    const S = document.createElement("div");
    S.className = "pet-progress-wrap", S.innerHTML = `\n    <div class="pet-progress-label">\n      <span>${PT.giftProgress}</span>\n      <span>${d} / ${c}</span>\n    </div>\n    <div class="pet-progress-track">\n      <div class="pet-progress-fill" style="width:${Math.round(100 * o)}%"></div>\n    </div>\n  `, 
    e.appendChild(S);
    const T = document.createElement("section");
    T.className = "pet-card", T.innerHTML = `<div class="pet-card-title">${PT.guardianAttrs}</div>`;
    const E = document.createElement("div");
    if (E.className = "pet-attr-head", E.innerHTML = `<div>${PT.statsAttr}</div><div>${PT.current}</div><div>${PT.next}</div>`, 
    T.appendChild(E), u.length) u.forEach(e => {
        const t = document.createElement("div");
        t.className = "pet-attr-row";
        const a = document.createElement("div"), n = "pet" === e.target ? PT.petTag : PT.playerTag;
        a.textContent = `${e.name}${n}`;
        const l = document.createElement("div");
        l.textContent = formatAttrValue(e.cur, e.isPercentage);
        const i = document.createElement("div");
        i.className = "pet-next", i.textContent = formatAttrValue(e.next ?? e.cur, e.isPercentage), 
        t.appendChild(a), t.appendChild(l), t.appendChild(i), T.appendChild(t);
    }); else {
        const e = document.createElement("div");
        e.className = "pet-muted", e.textContent = PT.noAttrBonus, T.appendChild(e);
    }
    e.appendChild(T), renderCombatSkillsCard(e, t), renderPetStatsCard(e, t, u);
}

const state = {
    data: null,
    qualityFilter: "ALL",
    selectedPetId: null,
    levelIndexByPet: new Map,
    combatSkillLevelByPetKind: new Map
};

function getPetQualityValue(e) {
    const t = Number(e?.quality?.quality || 0);
    return Number.isFinite(t) ? t : 0;
}

function getDefaultLevelIndex(e) {
    if (!Array.isArray(e) || !e.length) return 0;
    const t = e.findIndex(e => 1 === Number(e?.level));
    return t >= 0 ? t : 0;
}

function sortPetsByQuality(e) {
    return e.slice().sort((e, t) => {
        const a = getPetQualityValue(e), n = getPetQualityValue(t);
        return a !== n ? n - a : Number(e?.id || 0) - Number(t?.id || 0);
    });
}

function getQualityFilters() {
    const e = Array.isArray(state.data?.pets) ? state.data.pets : [], t = new Map;
    e.forEach(e => {
        const a = e?.quality, n = Number(a?.quality || 0);
        !Number.isFinite(n) || n <= 0 || t.has(n) || t.set(n, a);
    });
    const a = [ ...t.entries() ].sort((e, t) => t[0] - e[0]).map(e => e[1]);
    return [ {
        key: "ALL",
        label: PT.all,
        quality: null
    }, ...a.map(e => ({
        key: String(e.quality),
        label: e.tag || e.name || String(e.quality),
        quality: e
    })) ];
}

function renderQualityFilters() {
    const e = document.getElementById("pet-quality-filters");
    e && (e.innerHTML = "", getQualityFilters().forEach(t => {
        const a = document.createElement("button");
        if (a.type = "button", a.className = "pet-quality-filter-btn", state.qualityFilter === t.key && a.classList.add("active"), 
        "ALL" === t.key) a.textContent = PT.all; else {
            const e = document.createElement("img");
            e.alt = t.label, bindFallbackImage(e, buildQualityIconCandidates({
                quality: t.quality
            })), a.appendChild(e);
        }
        a.addEventListener("click", () => {
            state.qualityFilter = t.key, render();
        }), e.appendChild(a);
    }));
}

function getFilteredPets() {
    const e = sortPetsByQuality(Array.isArray(state.data?.pets) ? state.data.pets : []);
    return "ALL" === state.qualityFilter ? e : e.filter(e => String(getPetQualityValue(e)) === state.qualityFilter);
}

function renderList() {
    const e = document.getElementById("pet-list"), t = document.getElementById("pet-count"), a = getFilteredPets();
    e.innerHTML = "", t.textContent = `${a.length} / ${state.data?.petCount || 0} ${PT.petsCount}`, 
    a.forEach(t => {
        const a = document.createElement("button");
        a.type = "button", a.className = "pet-item", t.id === state.selectedPetId && a.classList.add("active");
        const n = document.createElement("img");
        n.alt = t?.quality?.tag || "", n.className = "pet-quality-badge";
        const l = buildQualityIconCandidates(t);
        l.length || 0 !== Number(t?.quality?.quality || 0) ? bindFallbackImage(n, l) : bindFallbackImage(n, [ "/media/images/pet/icon_pet_quality_new_5.webp" ]);
        const i = document.createElement("img");
        i.alt = t.name || "", bindFallbackImage(i, buildIconCandidates(t));
        const s = document.createElement("div");
        s.textContent = t.name || `#${t.id}`, a.appendChild(n), a.appendChild(i), a.appendChild(s), 
        a.addEventListener("click", () => {
            if (state.selectedPetId = t.id, !state.levelIndexByPet.has(t.id)) {
                const e = getDefaultLevelIndex(Array.isArray(t.levels) ? t.levels : []);
                state.levelIndexByPet.set(t.id, e);
            }
            render();
        }), e.appendChild(a);
    }), a.some(e => e.id === state.selectedPetId) || (state.selectedPetId = a[0]?.id ?? null);
}

function renderDetail() {
    const e = document.getElementById("pet-detail"), t = (Array.isArray(state.data?.pets) ? state.data.pets : []).find(e => e.id === state.selectedPetId);
    if (t) {
        if (!state.levelIndexByPet.has(t.id)) {
            const e = getDefaultLevelIndex(Array.isArray(t.levels) ? t.levels : []);
            state.levelIndexByPet.set(t.id, e);
        }
        renderPetDetail(e, t, state.levelIndexByPet.get(t.id) || 0);
    } else e.innerHTML = `<div class="pet-detail-empty">${PT.selectPet}</div>`;
}

function render() {
    renderQualityFilters(), renderList(), renderDetail();
}

function applyHeaderIcons() {
    document.querySelectorAll("img[data-icon-name]").forEach(e => {
        const t = resolveIconPath(e.getAttribute("data-icon-name"));
        t && (e.src = t);
    });
}

async function bootstrap() {
    await loadIconPaths(), await loadPetSkillFallbackMap(), applyHeaderIcons();
    try {
        let e = await fetch(withAssetVersion(CONFIG.dataUrl));
        if (!e.ok) throw new Error(`HTTP ${e.status}`);
        state.data = await e.json();
    } catch (e) {
        const t = document.getElementById("pet-detail");
        return void (t && (t.innerHTML = `<div class="pet-detail-empty">${PT.loadFailed} ${e}</div>`));
    }
    render();
}

bootstrap();

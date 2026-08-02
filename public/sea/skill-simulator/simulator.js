const CONFIG = {
    iconBasePath: "/media/images/"
}, withAssetVersion = window.withAssetVersion || (e => e);

// Locale detection removed — hardcoded to English (en-US) only, matching smoke-test.html.
const ACTIVE_LOCALE = "en-US";

document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const GRID_COLUMNS = 5, DATA_BASE_PATH = "/sea/skill-simulator/data/", ICON_PATHS_URL = `${DATA_BASE_PATH}icon_paths.json`, SKILLS_INDEX_URL = `${DATA_BASE_PATH}skills_index_${ACTIVE_LOCALE}.json`, JOB_DATA_URL = e => `${DATA_BASE_PATH}jobs_${ACTIVE_LOCALE}/${e}.json`, JOB_SELECTION_PLACEHOLDER_BY_LOCALE = {
    "zh-TW": "選擇職業...",
    "en-US": "Select a Target Job...",
    "zh-CN": "选择职业...",
    "th-TH": "เลือกอาชีพ..."
};

let iconPaths = null, iconPathsPromise = null;

const lastPointerPos = {
    x: null,
    y: null
};

let tooltipAnchorEl = null, tooltipAnchorKindId = null, tooltipPlacement = null, outlineRefreshFrame = 0, outlineResizeObserver = null, lastSkillModalTriggerEl = null;

const MOBILE_SKILL_PLANNER_MEDIA = "(max-width: 1100px)", TAG_COLOR_BY_ICON = {
    icon_skilltype_01: "#A0E589",
    icon_skilltype_02: "#F6B965",
    icon_skilltype_03: "#DA9BF1",
    icon_skilltype_04: "#FF7373",
    icon_skilltype_05: "#D1B08C",
    icon_skilltype_06: "#7FD6C7",
    icon_skilltype_07: "#E8D27A",
    icon_skilltype_08: "#A0A7FF",
    icon_skilltype_09: "#E7B6C8",
    icon_skilltype_10: "#4D81AD",
    icon_skilltype_11: "#63C9F6",
    icon_skilltype_12: "#C7DBED",
    icon_skilltype_20: "#F2A45A",
    icon_skilltype_21: "#5FAED8",
    icon_skilltype_22: "#4FB3A6",
    icon_skilltype_23: "#63B85C",
    icon_skilltype_24: "#B7C2DE",
    icon_skilltype_25: "#5C79D6",
    icon_skilltype_26: "#E0625A",
    icon_skilltype_27: "#E9B73A",
    icon_skilltype_28: "#B183D6",
    icon_skilltype_29: "#E09559",
    icon_skilltype_30: "#8F6660",
    icon_skilltype_31: "#CFE3F3"
}, TAG_COLOR_FALLBACK = [ "#8b9bbf", "#3ba9ff", "#57f287", "#faa61a", "#ed4245", "#c084fc" ], SKILL_TYPE_LABELS = {
    0: "None",
    1: "Active",
    2: "Passive",
    3: "Auto-cast",
    4: "Active + Passive"
}, SKILL_ATTACK_TYPE_LABELS = {
    0: "None",
    1: "Attack",
    2: "Skill"
}, SKILL_DAMAGE_TYPE_LABELS = {
    0: "None",
    1: "Physical",
    2: "Magic",
    3: "Physical Heal",
    4: "Magic Heal"
}, SKILL_RANGE_TYPE_LABELS = {
    0: "None",
    1: "Melee",
    2: "Ranged"
}, SKILL_CAST_TYPE_LABELS = {
    0: "None",
    1: "No Target",
    2: "Target Point (Angle)",
    3: "Vector Targeting",
    4: "Target Unit",
    5: "Target Point or Unit",
    6: "Target Point (Add Angle)",
    7: "Charge"
}, SKILL_BUTTON_TYPE_LABELS = {
    0: "None",
    1: "Common",
    2: "Accumulator",
    3: "Aim"
}, TARGET_TYPE_LABELS = {
    0: "None",
    1: "Self",
    2: "Friend",
    3: "Enemy",
    4: "Team",
    5: "Master",
    6: "Follower",
    7: "Same Ancestor",
    8: "Lovers"
}, TARGET_UNIT_TYPE_LABELS = {
    0: "None",
    1: "Basic",
    2: "Player",
    3: "Pet",
    4: "Monster (Basic)",
    5: "Monster (Normal)",
    6: "Monster (Elite)",
    7: "Monster (Boss)",
    8: "Monster (MVP)",
    9: "Monster (Mini)",
    10: "Monster (Summon)",
    11: "Monster (Mechanism)",
    12: "Monster (Building)",
    13: "Building (Friend)",
    14: "Building (Enemy)"
}, ELEMENT_TYPE_LABELS = {
    0: "None",
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
};

function isBadSkillDisplayName(e) {
    const t = String(e || "").trim();
    return !t || !!/^skill\s+\d+$/i.test(t);
}

function resolveSkillDisplayName(e, t) {
    const n = String(t?.name || t?.skilldes || "").trim();
    return isBadSkillDisplayName(n) ? `Skill ${e}` : n;
}

function resolveJobDisplayName(e) {
    const t = String(e?.job_name || e?.name || "").trim();
    return t || `Job ${e?.job_id || ""}`;
}

function escapeHtml(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
}

function formatNumber(e) {
    const t = Number(e);
    return Number.isFinite(t) ? Number.isInteger(t) ? String(t) : t.toFixed(2).replace(/\.?0+$/, "") : "";
}

function formatPercent(e) {
    const t = formatNumber(e);
    return "" === t ? "" : `${t}%`;
}

function formatList(e, t) {
    return Array.isArray(e) && 0 !== e.length ? e.map(e => {
        const n = Number(e);
        return Number.isFinite(n) ? t && t[n] ? t[n] : String(n) : null;
    }).filter(Boolean).join(", ") : "";
}

function isPassiveSkill(e) {
    return !!e && (2 === Number(e.skill_type) || (e.skill_tags || []).some(e => e && ("icon_skilltype_24" === e.icon || "被動" === e.name || "Passive" === e.name)));
}

function getPvpTrend(e, t) {
    const n = Number(e), l = Number(t);
    return Number.isFinite(n) && Number.isFinite(l) ? n > l ? '<span class="pvp-trend up">▲</span>' : n < l ? '<span class="pvp-trend down">▼</span>' : "" : "";
}

function hasNonZeroDamageStats(e) {
    return [ e.pve_percent, e.pve_flat, e.pvp_percent, e.pvp_flat ].some(e => Number.isFinite(Number(e)) && 0 !== Number(e));
}

function renderTagChips(e) {
    if (!e || !e.length) return "";
    const t = e.map(e => {
        const t = escapeHtml(e.name || "");
        if (!t) return "";
        const n = getTagColor(e);
        return `<span class="skill-tag" ${n ? `style="--tag-color: ${n}"` : ""}>${t}</span>`;
    }).join("");
    return t.trim() ? `<div class="skill-tags">${t}</div>` : "";
}

function getUnmetPrerequisites(e, t) {
    if (!e || !e.pre_skill || !e.pre_skill.length) return [];
    const n = [];
    for (const l of e.pre_skill) {
        const e = Number(l);
        if (!Number.isFinite(e)) continue;
        const i = Math.floor(e / 100), o = e % 100, s = t[i] || 0;
        if (s >= o) continue;
        const a = getSkillEntry(String(i)), r = a && a.skill ? resolveSkillDisplayName(i, a.skill) : `Skill ${i}`;
        n.push({
            kindId: i,
            requiredLevel: o,
            currentLevel: s,
            name: r
        });
    }
    return n;
}

const state = {
    currentJobId: 101,
    skillPoints: {},
    uniqueSkillPoints: {},
    jobPath: [ 101 ],
    targetJobId: null,
    data: null,
    skillPointsPerJob: {},
    breadcrumbs: [],
    selectedSkillKindId: null,
    restoreScrollOnRender: !1,
    scrollTargetJobId: null,
    scrollTargetSelectionJobId: null,
    selectionShownForJobs: new Set,
    jobLoadPromises: {},
    pendingRender: !1,
    locale: "en-US"
};

function makeSkillSelection(e) {
    return `skill:${String(e)}`;
}

function makeUniqueSelection(e) {
    return `unique:${String(e)}`;
}

function parseSelectionToken(e) {
    const t = String(e || "").trim();
    if (!t) return null;
    if (t.startsWith("unique:")) {
        const e = t.slice(7);
        return e ? {
            type: "unique",
            id: e
        } : null;
    }
    if (t.startsWith("skill:")) {
        const e = t.slice(6);
        return e ? {
            type: "skill",
            id: e
        } : null;
    }
    return {
        type: "skill",
        id: t
    };
}

function getCurrentUniqueSkillContext(e = state.jobPath) {
    const t = Array.isArray(e) ? e : [];
    for (let e = t.length - 1; e >= 0; e -= 1) {
        const n = state.data && state.data[t[e]], l = n && n.unique_skills;
        if (l && Object.keys(l).length) return {
            job: n,
            uniqueSkills: l
        };
    }
    return {
        job: null,
        uniqueSkills: {}
    };
}

function getCurrentUniqueSkillEntries(e = state.jobPath) {
    const {uniqueSkills: t} = getCurrentUniqueSkillContext(e);
    return t && "object" == typeof t ? Object.entries(t).map(([e, t]) => ({
        groupId: String(e),
        skill: t
    })).filter(({skill: e}) => e && "object" == typeof e).sort((e, t) => {
        const n = Number(e.skill?.slot) || 0, l = Number(t.skill?.slot) || 0;
        return n !== l ? n - l : Number(e.groupId) - Number(t.groupId);
    }) : [];
}

function getUniqueSkillEntry(e, t = state.jobPath) {
    const {job: n, uniqueSkills: l} = getCurrentUniqueSkillContext(t), i = String(e || "");
    return i && l && l[i] ? {
        skill: l[i],
        job: n
    } : null;
}

function pruneUniqueSkillPointsForPath(e) {
    const t = {}, n = new Set(getCurrentUniqueSkillEntries(e).map(({groupId: e}) => String(e)));
    for (const [e, l] of Object.entries(state.uniqueSkillPoints || {})) n.has(String(e)) && Number(l) > 0 && (t[String(e)] = Number(l));
    return t;
}

function selectionExists(e, t = state.jobPath) {
    const n = parseSelectionToken(e);
    if (!n) return !1;
    if ("unique" === n.type) return !!getUniqueSkillEntry(n.id, t);
    if (findSkillOwner(n.id, t)) return !0;
    const l = String(n.id);
    for (const e of t) {
        const t = state.data[e];
        if (t && t.traits && t.traits[l]) return !0;
    }
    return !1;
}

async function loadSkillsIndex() {
    if (state.data) return state.data;
    const e = await fetch(withAssetVersion(SKILLS_INDEX_URL));
    if (!e.ok) throw new Error("Failed to load skills index.");
    const t = await e.json(), n = t.jobs || t;
    state.locale = t.locale || state.locale, state.data = n || {};
    return state.data;
}

function loadJobData(e) {
    const t = state.data && state.data[e];
    if (!t || t.skills) return Promise.resolve(t);
    if (state.jobLoadPromises[e]) return state.jobLoadPromises[e];
    const n = [ JOB_DATA_URL(e) ];
    const l = (async () => {
        let l = null;
        for (const e of n) try {
            const t = await fetch(withAssetVersion(e));
            if (t && t.ok) {
                l = await t.json();
                break;
            }
        } catch {}
        if (!l) return null;
        const i = l.job || l;
        i && i.skills && (t.skills = i.skills);
        i && i.unique_skills && (t.unique_skills = i.unique_skills);
        i && i.traits && (t.traits = i.traits);
        i && i.traits_label && (t.traits_label = i.traits_label);
        return t;
    })().catch(t => (console.error(`Failed to load job data ${e}:`, t), null)).finally(() => {
        delete state.jobLoadPromises[e];
    });
    return state.jobLoadPromises[e] = l, l;
}

function loadSkillsForPath(e) {
    const t = [];
    return (e || []).forEach(e => {
        const n = state.data && state.data[e];
        n && !n.skills && t.push(loadJobData(e));
    }), t.length ? Promise.all(t) : null;
}

function scheduleRender() {
    state.pendingRender || (state.pendingRender = !0, requestAnimationFrame(() => {
        state.pendingRender = !1, renderSimulator();
    }));
}

function renderLoadingState(e, t) {
    e.innerHTML = `<div class="loading-state">${t || "Loading skills..."}</div>`;
}

async function loadIconPaths() {
    return iconPathsPromise || (iconPathsPromise = fetch(withAssetVersion(ICON_PATHS_URL)).then(e => e && e.ok ? e.json() : {}).catch(() => ({})).then(e => (iconPaths = e || {}, 
    iconPaths)), iconPathsPromise);
}

function resolveIconPath(e) {
    const t = e && iconPaths ? iconPaths[e] || iconPaths[String(e).toLowerCase()] : "";
    return e ? t ? `${CONFIG.iconBasePath}${String(t).replace(/\\/g, "/")}` : e.startsWith("icon_zhujiemian_") ? `${CONFIG.iconBasePath}zhujiemian/${e}.webp` : "" : "";
}

function getTagColor(e) {
    if (!e) return "";
    const t = e.icon || e.id || e.tag_id || "", n = e.name || "";
    if (!t && !n) return "";
    if (TAG_COLOR_BY_ICON[String(t)]) return TAG_COLOR_BY_ICON[String(t)];
    const l = String(t || n).match(/\d+/);
    if (l) {
        const e = Number(l[0]), t = Math.abs(e) % TAG_COLOR_FALLBACK.length;
        return TAG_COLOR_FALLBACK[t];
    }
    let i = 0;
    const o = String(t || n);
    for (let e = 0; e < o.length; e++) i = (i << 5) - i + o.charCodeAt(e), i |= 0;
    const s = Math.abs(i) % TAG_COLOR_FALLBACK.length;
    return TAG_COLOR_FALLBACK[s];
}

function applyHeaderLogo() {
    document.querySelectorAll("img[data-icon-name]").forEach(e => {
        const t = e.dataset.iconName;
        if (!t) return;
        const n = resolveIconPath(t);
        n && (e.src = n);
    });
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
    let n = 0, l = 0, i = t;
    for (;i < e.length && l <= 49; ) {
        const t = e[i++];
        if (n += (127 & t) * 2 ** l, !(128 & t)) return Number.isSafeInteger(n) ? {
            value: n,
            offset: i
        } : null;
        l += 7;
    }
    return null;
}

function encodeBase64Url(e) {
    let t = "";
    for (const n of e) t += String.fromCharCode(n);
    return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeBase64Url(e) {
    if (!e || !/^[A-Za-z0-9_-]+$/.test(e)) return null;
    try {
        const t = e.replace(/-/g, "+").replace(/_/g, "/"), n = atob(t + "=".repeat((4 - t.length % 4) % 4));
        return Uint8Array.from(n, e => e.charCodeAt(0));
    } catch (e) {
        return null;
    }
}

function buildShareHash() {
    const e = Array.isArray(state.jobPath) && state.jobPath.length ? state.jobPath : [ 101 ], t = Object.entries(state.skillPoints || {}).map(([e, t]) => ({
        id: Number(e),
        level: Number(t)
    })).filter(e => Number.isSafeInteger(e.id) && e.id > 0 && Number.isSafeInteger(e.level) && e.level > 0).sort((e, t) => e.id - t.id), n = state.targetJobId || (e.length > 1 || t.length ? e[e.length - 1] : null);
    if (1 === e.length && 101 === Number(e[0]) && 0 === t.length && !n) return "";
    const l = [];
    if (!appendVarUint(n, l) || !appendVarUint(t.length, l)) return "";
    let i = 0;
    for (const e of t) {
        const t = e.id - i;
        if (!appendVarUint(t, l) || !appendVarUint(e.level, l)) return "";
        i = e.id;
    }
    return `v1.${encodeBase64Url(l)}`;
}

function updateUrlHash() {
    const e = buildShareHash(), t = window.location.href.split("#")[0], n = e ? `${t}#${e}` : t, l = window.scrollX, i = window.scrollY;
    history.replaceState(null, "", n), (l || i) && requestAnimationFrame(() => {
        window.scrollTo(l, i);
    });
}

function parseHashState() {
    const e = window.location.hash ? window.location.hash.slice(1) : "";
    if (!e) return null;
    if (e.startsWith("v1.")) return parseCompactHash(e.slice(3));
    const t = new URLSearchParams(e);
    return {
        pathRaw: t.get("p"),
        skillsRaw: t.get("s"),
        targetRaw: t.get("t"),
        skillEntries: null
    };
}

function parseCompactHash(e) {
    const t = decodeBase64Url(e);
    if (!t) return null;
    let n = 0;
    const l = readVarUint(t, n);
    if (!l) return null;
    n = l.offset;
    const i = readVarUint(t, n);
    if (!i || i.value > 500) return null;
    n = i.offset;
    const o = [];
    let s = 0;
    for (let e = 0; e < i.value; e++) {
        const e = readVarUint(t, n);
        if (!e) return null;
        n = e.offset;
        const l = readVarUint(t, n);
        if (!l || e.value < 1 || l.value < 1) return null;
        if (s += e.value, !Number.isSafeInteger(s)) return null;
        o.push({
            id: s,
            level: l.value
        }), n = l.offset;
    }
    return n === t.length ? {
        pathRaw: null,
        skillsRaw: null,
        targetRaw: String(l.value),
        skillEntries: o
    } : null;
}

function sanitizeJobPath(e) {
    if (!Array.isArray(e)) return [ 101 ];
    const t = e.map(Number).filter(e => Number.isFinite(e) && state.data[e]);
    if (0 === t.length) return [ 101 ];
    let n = t[t.length - 1];
    if (!jobPathHasSkills(n)) {
        const e = [ ...t ].reverse().find(e => jobPathHasSkills(e));
        if (!e) return [ 101 ];
        n = e;
    }
    return getPathToJob(n);
}

function jobHasSkills(e) {
    return !!e && ("boolean" == typeof e.has_skills ? e.has_skills : e.skills && Object.keys(e.skills).length > 0);
}

function jobPathHasSkills(e) {
    const t = getPathToJob(e);
    return !!t.length && t.every(e => jobHasSkills(state.data[e]));
}

function findSkillOwner(e, t) {
    for (const n of t) {
        const t = state.data[n];
        if (t && t.skills && t.skills[e]) return n;
    }
    return null;
}

function pruneSkillPointsForPath(e) {
    const t = {};
    for (const [n, l] of Object.entries(state.skillPoints || {})) findSkillOwner(n, e) && (t[n] = l);
    return t;
}

function pickSelectedSkillFromPoints(e, t) {
    let n = null, l = -1;
    for (const [i, o] of Object.entries(e || {})) findSkillOwner(i, t) && o > l && (l = o, 
    n = i);
    return n ? makeSkillSelection(n) : null;
}

function parseSkillPointsFromHash(e, t) {
    if (!e) return {};
    const n = {};
    return e.split(",").forEach(e => {
        if (!e) return;
        const [l, i] = e.split("."), o = Number(l), s = Number(i);
        if (!Number.isFinite(o) || !Number.isFinite(s) || s <= 0) return;
        const a = findSkillOwner(String(o), t);
        if (!a) return;
        const r = state.data[a].skills[String(o)], c = r ? getHardMaxLevel(r) : 10;
        n[String(o)] = Math.min(s, c);
    }), n;
}

function parseSkillPointsFromEntries(e, t) {
    const n = {};
    for (const l of e || []) {
        const i = Number(l?.id), o = Number(l?.level);
        if (!Number.isSafeInteger(i) || i < 1 || !Number.isSafeInteger(o) || o < 1) continue;
        const s = findSkillOwner(String(i), t);
        if (!s) continue;
        const a = state.data[s].skills[String(i)], r = a ? getHardMaxLevel(a) : 10;
        n[String(i)] = Math.min(o, r);
    }
    return n;
}

function getNaturalMaxLevel(e) {
    const t = Number(e?.natural_max_level), n = Number(e?.max_level);
    return Number.isFinite(t) && t > 0 ? t : Number.isFinite(n) && n > 0 ? n : 10;
}

function getHardMaxLevel(e) {
    const t = Number(e?.max_level);
    return Number.isFinite(t) && t > 0 ? t : getNaturalMaxLevel(e);
}

function getBillableSkillLevel(e, t) {
    const n = Number(t) || 0;
    return n <= 0 ? 0 : Math.min(n, getNaturalMaxLevel(e));
}

async function applyStateFromHash() {
    const e = parseHashState();
    if (!e) return !1;
    let t = e.targetRaw ? Number(e.targetRaw) : null;
    Number.isFinite(t) && state.data[t] || (t = null);
    let n = [ 101 ];
    t ? n = getPathToJob(t) : e.pathRaw && (n = sanitizeJobPath(e.pathRaw.split("-").map(e => Number(e)).filter(Number.isFinite))), 
    n.length || (n = [ 101 ]), state.jobPath = n, state.targetJobId = t || (n.length > 1 ? n[n.length - 1] : null);
    const l = loadSkillsForPath(n);
    if (l && await l, state.skillPoints = e.skillEntries ? parseSkillPointsFromEntries(e.skillEntries, n) : parseSkillPointsFromHash(e.skillsRaw, n), 
    state.uniqueSkillPoints = pruneUniqueSkillPointsForPath(n), state.selectedSkillKindId = null, 
    e.skillsRaw || e.skillEntries?.length) {
        const t = e.skillEntries ? e.skillEntries.map(e => String(e.id)) : e.skillsRaw.split(",").filter(Boolean).map(e => e.split(".")[0]);
        if (t.length) {
            const e = t[t.length - 1];
            e && findSkillOwner(e, n) && (state.selectedSkillKindId = makeSkillSelection(e));
        }
    }
    return updateJobPointCounts(), !0;
}

async function initSimulator() {
    try {
        if (await loadSkillsIndex(), !state.data[101]) return void console.error("Novice job data not found!");
        if (await loadIconPaths(), applyHeaderLogo(), !await applyStateFromHash()) {
            const e = loadSkillsForPath(state.jobPath);
            e && await e, updateJobPointCounts();
        }
        setupEventListeners(), renderJobSelectionDropdown(), renderSimulator(), syncUniqueSkillPanelPlacement(), 
        window.addEventListener("hashchange", async () => {
            if (!await applyStateFromHash()) return;
            const e = document.getElementById("quick-job-select");
            e && (e.value = state.targetJobId ? String(state.targetJobId) : ""), updateJobSelectionButton(), 
            renderSimulator();
        });
    } catch (e) {
        console.error("Initialization failed:", e);
    }
}

function getJobIconPath(e, t = !1) {
    return e ? `${CONFIG.iconBasePath}job/${e}${t ? "02" : ""}.webp` : "";
}

function getSkillIconPath(e) {
    if (!e) return "";
    return resolveIconPath(e) || `${CONFIG.iconBasePath}skill/${e}.webp`;
}

function getJobSelectionPlaceholder() {
    return JOB_SELECTION_PLACEHOLDER_BY_LOCALE[ACTIVE_LOCALE] || JOB_SELECTION_PLACEHOLDER_BY_LOCALE["en-US"];
}

function closeJobSelectionDropdown({focusButton: e = !1} = {}) {
    const t = document.getElementById("quick-job-select-button"), n = document.getElementById("quick-job-select-popover");
    t && t.setAttribute("aria-expanded", "false"), n && (n.hidden = !0), e && t && t.focus();
}

function focusJobSelectionOption(e) {
    const t = document.getElementById("quick-job-select-list");
    if (!t) return;
    const n = e ? `.job-select-option[data-value="${String(e)}"]` : ".job-select-option", l = t.querySelector(n) || t.querySelector(".job-select-option");
    l && (l.focus(), l.scrollIntoView({
        block: "nearest"
    }));
}

function updateJobSelectionButton() {
    const e = document.getElementById("quick-job-select"), t = document.getElementById("quick-job-select-button");
    if (!e || !t) return;
    const n = t.querySelector(".job-select-button-content"), l = t.querySelector(".job-select-button-label");
    if (!n || !l) return;
    const i = String(e.value || ""), o = i ? e.querySelector(`option[value="${i}"]`) : null, s = o ? o.textContent : getJobSelectionPlaceholder(), a = o && o.dataset.iconPath || "";
    let r = n.querySelector(".job-select-button-icon");
    r || (r = document.createElement("img"), r.className = "job-select-button-icon", 
    r.alt = "", n.insertBefore(r, l)), l.textContent = s, a ? (r.src = a, r.hidden = !1) : (r.hidden = !0, 
    r.removeAttribute("src"));
    const c = document.getElementById("quick-job-select-list");
    c && c.querySelectorAll(".job-select-option").forEach(e => {
        const t = e.dataset.value === i;
        e.setAttribute("aria-selected", t ? "true" : "false");
    });
}

function setupCustomJobSelectionDropdown() {
    const e = document.querySelector(".job-select-shell"), t = document.getElementById("quick-job-select"), n = document.getElementById("quick-job-select-button"), l = document.getElementById("quick-job-select-list"), i = document.getElementById("quick-job-select-popover");
    e && t && n && l && i && "true" !== e.dataset.dropdownBound && (e.dataset.dropdownBound = "true", 
    n.addEventListener("click", () => {
        "true" === n.getAttribute("aria-expanded") ? closeJobSelectionDropdown() : (n.setAttribute("aria-expanded", "true"), 
        i.hidden = !1, focusJobSelectionOption(t.value));
    }), n.addEventListener("keydown", e => {
        [ "ArrowDown", "ArrowUp", "Enter", " " ].includes(e.key) && (e.preventDefault(), 
        n.setAttribute("aria-expanded", "true"), i.hidden = !1, focusJobSelectionOption(t.value));
    }), l.addEventListener("click", e => {
        const n = e.target.closest(".job-select-option");
        if (!n) return;
        const l = n.dataset.value || "";
        t.value !== l ? (t.value = l, t.dispatchEvent(new Event("change", {
            bubbles: !0
        }))) : updateJobSelectionButton(), closeJobSelectionDropdown({
            focusButton: !0
        });
    }), l.addEventListener("keydown", e => {
        const t = Array.from(l.querySelectorAll(".job-select-option"));
        if (!t.length) return;
        const n = t.indexOf(document.activeElement);
        if ("Escape" === e.key) return e.preventDefault(), void closeJobSelectionDropdown({
            focusButton: !0
        });
        if ("Enter" === e.key || " " === e.key) return e.preventDefault(), void (n >= 0 && t[n].click());
        let i = n;
        "ArrowDown" === e.key && (i = n < t.length - 1 ? n + 1 : 0), "ArrowUp" === e.key && (i = n > 0 ? n - 1 : t.length - 1), 
        "Home" === e.key && (i = 0), "End" === e.key && (i = t.length - 1), i !== n && (e.preventDefault(), 
        t[i].focus(), t[i].scrollIntoView({
            block: "nearest"
        }));
    }), document.addEventListener("pointerdown", t => {
        e.contains(t.target) || closeJobSelectionDropdown();
    }), document.addEventListener("keydown", e => {
        "Escape" === e.key && closeJobSelectionDropdown();
    }));
}

function getPathToJob(e) {
    const t = [];
    let n = e;
    for (;n && state.data[n] && (t.unshift(Number(n)), n = state.data[n].parent, 0 !== n); ) ;
    return t;
}

function applyJobPathSelection(e, t) {
    state.jobPath = e, state.targetJobId = t, state.skillPoints = pruneSkillPointsForPath(e), 
    state.uniqueSkillPoints = pruneUniqueSkillPointsForPath(e), state.selectedSkillKindId && !selectionExists(state.selectedSkillKindId, e) && (state.selectedSkillKindId = pickSelectedSkillFromPoints(state.skillPoints, e)), 
    updateJobPointCounts(), renderSimulator();
    const n = document.getElementById("quick-job-select");
    n && n.value != t && (n.value = t), updateJobSelectionButton();
}

function selectJobPath(e) {
    if (!jobPathHasSkills(e)) return void console.warn("Skipping job without skills:", e);
    const t = getPathToJob(e), n = loadSkillsForPath(t);
    n ? n.then(() => {
        applyJobPathSelection(t, e);
    }).catch(e => {
        console.error("Failed to load job data:", e);
    }) : applyJobPathSelection(t, e);
}

function addSkillPoint(e) {
    state.restoreScrollOnRender = !0, state.selectedSkillKindId = makeSkillSelection(e), 
    tryAddSkillPoint(e) && (updateJobPointCounts(), renderSimulator());
}

function tryAddSkillPoint(e) {
    let t = null, n = null;
    for (const l of state.jobPath) {
        const i = state.data[l];
        if (i.skills && i.skills[e]) {
            t = l, n = i.skills[e];
            break;
        }
    }
    if (!t || !n) return !1;
    if (!isJobUnlocked(t)) return;
    const l = state.skillPoints[e] || 0, i = getHardMaxLevel(n), o = getNaturalMaxLevel(n);
    return !(l >= i || l < o && (updateJobPointCounts(), !canAllocatePointToJob(t)) || !checkPrerequisites(n, state.skillPoints) || (state.skillPoints[e] = l + 1, 
    0));
}

function getJobTierIndex(e) {
    return Array.isArray(state.jobPath) ? state.jobPath.indexOf(Number(e)) : -1;
}

function getSkillPointPoolsByTier() {
    return {
        novice: 9,
        first: state.jobPath.length > 1 ? 40 : 0,
        second: state.jobPath.length > 2 ? 40 : 0,
        third: state.jobPath.length > 3 ? 70 : 0
    };
}

function getSpentByTier() {
    const e = [ 0, 0, 0, 0 ];
    for (const t of state.jobPath || []) {
        const n = getJobTierIndex(t);
        n < 0 || n >= e.length || (e[n] += getPointsSpentInJob(t));
    }
    return e;
}

function getTotalSkillBudget() {
    const e = getSkillPointPoolsByTier();
    return e.novice + e.first + e.second + e.third;
}

function getNonNoviceSpentTotal() {
    const e = getSpentByTier();
    return (e[1] || 0) + (e[2] || 0) + (e[3] || 0);
}

function getRequiredSpentBeforeTier(e) {
    if (e <= 1) return 0;
    const t = getSkillPointPoolsByTier();
    return 2 === e ? t.first : 3 === e ? t.first + t.second : t.first + t.second + t.third;
}

function canUnlockTier(e) {
    if (updateJobPointCounts(), e <= 0) return !0;
    if (1 === e) return getPointsSpentInJob(101) >= getUnlockLimit(101);
    const t = state.jobPath[e - 1];
    return !!t && getPointsSpentInJob(t) >= getUnlockLimit(t);
}

function canAllocatePointToJob(e) {
    const t = getJobTierIndex(e);
    if (t < 0) return !1;
    const n = getSkillPointPoolsByTier(), l = getSpentByTier();
    return !(t >= l.length) && (l[t] += 1, !(l.reduce((e, t) => e + t, 0) > getTotalSkillBudget()) && (!(l[0] > n.novice) && !(l[1] + l[2] + l[3] > n.first + n.second + n.third || l[2] + l[3] > n.second + n.third || l[3] > n.third)));
}

function addSkillPointsToMax(e) {
    state.restoreScrollOnRender = !0, state.selectedSkillKindId = makeSkillSelection(e);
    let t = 0;
    const n = getSkillEntry(e), l = n ? getNaturalMaxLevel(n.skill) : 10;
    for (;(state.skillPoints[e] || 0) < l && tryAddSkillPoint(e); ) updateJobPointCounts(), 
    t += 1;
    0 !== t && (updateJobPointCounts(), renderSimulator());
}

function removeSkillPoint(e) {
    state.restoreScrollOnRender = !0, state.selectedSkillKindId = makeSkillSelection(e);
    const t = state.skillPoints[e] || 0;
    if (t <= 0) return;
    const n = t - 1;
    n <= 0 ? delete state.skillPoints[e] : state.skillPoints[e] = n, enforceSkillConstraints(), 
    renderSimulator();
}

function addUniqueSkillPoint(e) {
    const t = String(e), n = getUniqueSkillEntry(t);
    if (!n || !n.skill) return;
    state.restoreScrollOnRender = !0, state.selectedSkillKindId = makeUniqueSelection(t);
    const l = Number(state.uniqueSkillPoints[t]) || 0;
    l >= getHardMaxLevel(n.skill) || (state.uniqueSkillPoints[t] = l + 1, renderSimulator());
}

function addUniqueSkillPointsToNaturalMax(e) {
    const t = String(e), n = getUniqueSkillEntry(t);
    if (!n || !n.skill) return;
    state.restoreScrollOnRender = !0, state.selectedSkillKindId = makeUniqueSelection(t);
    const l = Number(state.uniqueSkillPoints[t]) || 0, i = getNaturalMaxLevel(n.skill);
    l >= i || (state.uniqueSkillPoints[t] = i, renderSimulator());
}

function removeUniqueSkillPoint(e) {
    const t = String(e), n = Number(state.uniqueSkillPoints[t]) || 0;
    n <= 0 || (state.restoreScrollOnRender = !0, state.selectedSkillKindId = makeUniqueSelection(t), 
    n <= 1 ? delete state.uniqueSkillPoints[t] : state.uniqueSkillPoints[t] = n - 1, 
    renderSimulator());
}

function canRemoveSkillPoint(e) {
    for (const t in state.skillPoints) if (state.skillPoints[t] > 0) {
        let n = null;
        for (const e of state.jobPath) if (state.data[e].skills[t]) {
            n = state.data[e].skills[t];
            break;
        }
        if (n && n.pre_skill && checkDependency(e, n)) return !1;
    }
    return !0;
}

function checkDependency(e, t) {
    if (!t.pre_skill) return !1;
    for (const n of t.pre_skill) {
        const t = Math.floor(n / 100), l = n % 100;
        if (String(t) === String(e) && l >= (state.skillPoints[e] || 0)) return !0;
    }
    return !1;
}

function checkPrerequisites(e, t) {
    if (!e.pre_skill) return !0;
    for (const n of e.pre_skill) {
        const e = n % 100;
        if ((t[Math.floor(n / 100)] || 0) < e) return !1;
    }
    return !0;
}

function getUnlockLimit(e) {
    return 101 == e ? 9 : 40;
}

function enforcePrerequisiteRemovals() {
    let e = !0;
    for (;e; ) {
        e = !1;
        for (const [t, n] of Object.entries(state.skillPoints)) {
            if (n <= 0) continue;
            const l = findSkillOwner(t, state.jobPath);
            if (!l) continue;
            const i = state.data[l].skills[t];
            i && !checkPrerequisites(i, state.skillPoints) && (delete state.skillPoints[t], 
            e = !0);
        }
    }
}

function enforceJobUnlockRemovals() {
    const e = state.jobPath || [];
    if (e.length <= 1) return;
    let t = -1;
    for (let n = 1; n < e.length; n++) if (!isJobUnlocked(e[n])) {
        t = n;
        break;
    }
    if (-1 === t) return;
    const n = new Set(e.slice(t).map(Number));
    for (const t of Object.keys(state.skillPoints)) {
        const l = findSkillOwner(t, e);
        l && n.has(Number(l)) && delete state.skillPoints[t];
    }
}

function enforceSkillConstraints() {
    enforcePrerequisiteRemovals(), updateJobPointCounts(), enforceJobUnlockRemovals(), 
    updateJobPointCounts();
    const e = state.selectedSkillKindId;
    e && !selectionExists(e, state.jobPath) && (state.selectedSkillKindId = pickSelectedSkillFromPoints(state.skillPoints, state.jobPath));
}

function isJobUnlocked(e) {
    if (101 == e) return !0;
    const t = state.jobPath.indexOf(Number(e));
    return !(t <= 0) && canUnlockTier(t);
}

function getPointsSpentInJob(e) {
    return state.skillPointsPerJob[e] || 0;
}

function updateJobPointCounts() {
    const e = {};
    for (const t in state.skillPoints) {
        const n = state.skillPoints[t];
        for (const l in state.data) if (state.data[l].skills && state.data[l].skills[t]) {
            const i = state.data[l].skills[t];
            e[l] = (e[l] || 0) + getBillableSkillLevel(i, n);
            break;
        }
    }
    state.skillPointsPerJob = e;
}

function renderUniqueSkillPanel() {
    const e = document.querySelector(".simulator-layout"), t = document.getElementById("unique-skill-panel"), n = document.getElementById("unique-skill-content");
    if (!e || !t || !n) return;
    const l = getCurrentUniqueSkillEntries();
    if (!l.length) return e.classList.remove("has-unique-sidebar"), t.hidden = !0, n.innerHTML = "", 
    void syncUniqueSkillPanelPlacement();
    e.classList.add("has-unique-sidebar"), t.hidden = !1;
    const i = Number(l[0]?.skill?.owner_job_id) || 0, o = state.data?.[i] || getCurrentUniqueSkillContext().job, s = o ? resolveJobDisplayName(o) : "", a = parseSelectionToken(state.selectedSkillKindId), r = l.map(({groupId: e, skill: t}) => {
        const n = Number(state.uniqueSkillPoints[e]) || 0, l = getNaturalMaxLevel(t), i = getHardMaxLevel(t), o = escapeHtml(resolveSkillDisplayName(e, t)), s = n > 0, r = n < i, c = n < l;
        return `\n            <div class="unique-skill-card${a && "unique" === a.type && a.id === String(e) ? " selected" : ""}" data-unique-group-id="${e}">\n                <button type="button" class="unique-skill-icon-wrapper" data-unique-group-id="${e}" aria-label="${o}">\n                    <img loading="lazy" decoding="async" class="unique-skill-icon" src="${getSkillIconPath(t.icon)}" alt="${o}">\n                    <span class="skill-level ${n > l ? "over-natural" : ""}">${n}/${l}</span>\n                </button>\n                <div class="unique-skill-name" title="${o}">${o}</div>\n                <div class="skill-controls unique-skill-controls">\n                    <button class="skill-btn remove unique-skill-btn" data-action="remove" data-unique-group-id="${e}" ${s ? "" : "disabled"}>−</button>\n                    <button class="skill-btn add unique-skill-btn" data-action="add" data-unique-group-id="${e}" ${r ? "" : "disabled"}>+</button>\n                    <button class="skill-btn add-max unique-skill-btn" data-action="add-max" data-unique-group-id="${e}" ${c ? "" : "disabled"}>++</button>\n                </div>\n            </div>\n        `;
    }).join("");
    n.innerHTML = `\n        ${s ? `<div class="unique-skill-owner">${escapeHtml(s)}</div>` : ""}\n        <div class="unique-skill-grid">${r}</div>\n    `, 
    syncUniqueSkillPanelPlacement();
}

function isCompactSkillPlannerView() {
    return Boolean(window.matchMedia && window.matchMedia(MOBILE_SKILL_PLANNER_MEDIA).matches);
}

function syncUniqueSkillPanelPlacement() {
    const e = document.getElementById("skill-planner-sidebar"), t = document.getElementById("skill-planner-job-host"), n = document.getElementById("skill-planner-mobile-job-host"), l = document.querySelector(".job-select-shell"), i = document.getElementById("unique-skill-panel"), o = document.getElementById("unique-skill-mobile-host");
    l && t && n && (isCompactSkillPlannerView() ? l.parentElement !== n && n.appendChild(l) : l.parentElement !== t && t.appendChild(l)), 
    i && o && e && (isCompactSkillPlannerView() ? (i.parentElement !== o && o.appendChild(i), 
    o.hidden = i.hidden) : (i.parentElement !== e && e.appendChild(i), o.hidden = !0));
}

function renderJobSelectionDropdown() {
    const e = document.getElementById("quick-job-select"), t = document.getElementById("quick-job-select-list");
    if (!e || !t) return;
    const n = getJobSelectionPlaceholder();
    e.innerHTML = "", t.innerHTML = "";
    const l = document.createElement("option");
    l.value = "", l.textContent = n, e.appendChild(l);
    const i = document.createElement("li");
    i.className = "job-select-option", i.dataset.value = "", i.tabIndex = -1, i.setAttribute("role", "option"), 
    i.setAttribute("aria-selected", state.targetJobId ? "false" : "true");
    const o = document.createElement("span");
    o.className = "job-select-option-label", o.textContent = n, i.appendChild(o), t.appendChild(i);
    const s = Object.values(state.data), a = [];
    s.forEach(e => {
        101 != e.job_id && jobPathHasSkills(e.job_id) && a.push({
            id: e.job_id,
            name: resolveJobDisplayName(e),
            parent: e.parent,
            iconPath: getJobIconPath(e.job_icon)
        });
    }), a.sort((e, t) => e.id - t.id), a.forEach(n => {
        const l = document.createElement("option");
        l.value = n.id, l.innerText = n.name, l.dataset.iconPath = n.iconPath || "", e.appendChild(l);
        const i = document.createElement("li");
        i.className = "job-select-option", i.dataset.value = String(n.id), i.tabIndex = -1, 
        i.setAttribute("role", "option"), i.setAttribute("aria-selected", "false");
        const o = document.createElement("img");
        o.className = "job-select-option-icon", o.alt = "", n.iconPath ? o.src = n.iconPath : o.hidden = !0;
        const s = document.createElement("span");
        s.className = "job-select-option-label", s.textContent = n.name, i.appendChild(o), 
        i.appendChild(s), t.appendChild(i);
    }), state.targetJobId && (e.value = String(state.targetJobId)), "true" !== e.dataset.changeBound && (e.dataset.changeBound = "true", 
    e.addEventListener("change", e => {
        const t = e.target.value;
        updateJobSelectionButton(), closeJobSelectionDropdown(), t ? selectJobPath(Number(t)) : (state.jobPath = [ 101 ], 
        state.targetJobId = null, state.uniqueSkillPoints = {}, renderSimulator());
    })), setupCustomJobSelectionDropdown(), updateJobSelectionButton();
}

function renderSimulator() {
    const e = document.getElementById("simulator-container"), t = state.restoreScrollOnRender, n = t ? window.scrollX : 0, l = t ? window.scrollY : 0;
    state.restoreScrollOnRender = !1, e.innerHTML = "", state.jobPath && 0 !== state.jobPath.length || (state.jobPath = [ 101 ]);
    const i = loadSkillsForPath(state.jobPath);
    if (i) return i.then(() => scheduleRender()).catch(e => console.error("Failed to load skills:", e)), 
    renderLoadingState(e, "Loading skills..."), void renderUniqueSkillPanel();
    let o = !1;
    state.jobPath.forEach((t, n) => {
        const l = state.data[t];
        if (!l) return;
        const i = 0 === n || !o && isJobUnlocked(t);
        i || (o = !0), renderJobSection(e, l, i), renderTraitsForJob(e, l, i);
    });
    const s = state.jobPath[state.jobPath.length - 1], a = state.data[s];
    canUnlockTier(getJobTierIndex(s) + 1) && a.children && a.children.length > 0 && renderJobSelection(e, a) && !state.selectionShownForJobs.has(s) && (state.selectionShownForJobs.add(s), 
    state.scrollTargetSelectionJobId = s), renderUniqueSkillPanel(), updateUrlHash(), 
    renderSkillDetailViews(), t && requestAnimationFrame(() => {
        window.scrollTo(n, l);
    });
    const r = state.scrollTargetSelectionJobId;
    if (r) {
        const t = e.querySelector(`.job-selection-container[data-parent-job-id="${r}"]`);
        t && (state.scrollTargetSelectionJobId = null, requestAnimationFrame(() => {
            t.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }));
    }
    const c = state.scrollTargetJobId;
    if (!t && c) {
        const t = e.querySelector(`.job-section[data-job-id="${c}"]`);
        t && (state.scrollTargetJobId = null, requestAnimationFrame(() => {
            t.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }));
    }
    const u = document.getElementById("tooltip");
    u && u.classList.contains("visible") && requestAnimationFrame(() => {
        refreshVisibleTooltip();
    });
}

function renderJobSection(e, t, n) {
    const l = document.createElement("div");
    l.className = "job-section " + (n ? "" : "locked-preview"), l.dataset.jobId = t.job_id;
    const i = getPointsSpentInJob(t.job_id), o = 101 == t.job_id ? 9 : 40, s = getJobIconPath(t.job_icon_big || t.job_icon, !t.job_icon_big), a = resolveJobDisplayName(t);
    l.innerHTML = `\n        <div class="job-header-banner">\n            <img loading="lazy" decoding="async" src="${s}" alt="${a}" class="job-icon-large" \n                 onerror="this.style.display='none'">\n            <div class="job-info">\n                <h2>${a}</h2>\n                <div class="job-points">\n                    Points: <span class="highlight ${i > 40 ? "text-danger" : ""}" style="${i > 40 ? "color: red;" : ""}">${i}</span> / ${o}\n                </div>\n            </div>\n        </div>\n        <div class="job-skills-container id-${t.job_id}">\n        </div>\n    `, 
    e.appendChild(l), renderSkillsForJob(l.querySelector(".job-skills-container"), t, n);
}

function renderTraitsForJob(e, t, n) {
    const l = t && t.traits;
    if (!l) return;
    const i = Object.entries(l);
    if (0 === i.length) return;
    const o = document.createElement("div");
    o.className = "traits-section " + (n ? "" : "locked-preview"), o.dataset.jobId = t.job_id;
    const s = (t.traits_label || "Career Traits").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let a = "";
    i.sort(([, e], [, t]) => {
        const n = Number(e.position) || 999, l = Number(t.position) || 999;
        return n !== l ? n - l : 0;
    }).forEach(([e, t]) => {
        const l = getHardMaxLevel(t) || 1, i = getSkillIconPath(t.icon), o = resolveSkillDisplayName(e, t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
        a += `\n                <div class="skill-node trait-node" data-kind-id="${e}">\n                    <div class="skill-outline-anchor">\n                        <div class="skill-icon-wrapper ${n ? "maxed" : "locked"}" data-kind-id="${e}">\n                            <img loading="lazy" decoding="async" class="skill-icon" src="${i}" alt="${o}"\n                                 onerror="this.parentElement.style.background='var(--bg-tertiary)'">\n                            <span class="skill-level">${l}/${l}</span>\n                        </div>\n                        <div class="skill-name" title="${o}">${o}</div>\n                    </div>\n                </div>\n            `;
    }), o.innerHTML = `\n        <div class="traits-section-header">\n            <h3 class="traits-section-title">${s}</h3>\n        </div>\n        <div class="traits-grid">${a}</div>\n    `, 
    e.appendChild(o);
}

function computeSkillGroups(e) {
    const t = e.skills || {}, n = new Map;
    Object.keys(t).forEach(e => {
        n.set(String(e), new Set);
    }), Object.entries(t).forEach(([e, l]) => {
        const i = String(e);
        (l.pre_skill || []).forEach(e => {
            const l = String(Math.floor(e / 100));
            t[l] && (n.get(i).add(l), n.get(l).add(i));
        });
    });
    const l = new Set, i = [];
    return n.forEach((e, t) => {
        if (l.has(t)) return;
        const o = [], s = [ t ];
        for (l.add(t); s.length; ) {
            const e = s.shift();
            o.push(e), n.get(e).forEach(e => {
                l.has(e) || (l.add(e), s.push(e));
            });
        }
        i.push(o);
    }), i;
}

function getSkillNodeOutlineRect(e) {
    if (!e) return null;
    const t = Array.from(e.querySelectorAll(".skill-tags-mini, .skill-outline-anchor"));
    if (!t.length) {
        const t = (e.querySelector(".skill-icon-wrapper") || e).getBoundingClientRect();
        return t.width || t.height ? t : null;
    }
    let n = 1 / 0, l = 1 / 0, i = -1 / 0, o = -1 / 0, s = 0;
    return t.forEach(e => {
        const t = e.getBoundingClientRect();
        (t.width || t.height) && (n = Math.min(n, t.left), l = Math.min(l, t.top), i = Math.max(i, t.right), 
        o = Math.max(o, t.bottom), s += 1);
    }), s ? {
        left: n,
        top: l,
        right: i,
        bottom: o,
        width: i - n,
        height: o - l
    } : null;
}

function renderSkillGroupOutlines(e, t) {
    e.querySelectorAll(".skill-group-outline").forEach(e => e.remove());
    // The old dashed bounding boxes crossed empty grid cells and looked like
    // broken dependency lines on narrow screens. Skill prerequisites are still
    // enforced by the controls, so keep the tree clean and node-focused.
}

function refreshAllSkillGroupOutlines() {
    const e = document.getElementById("simulator-container");
    e && e.querySelectorAll(".job-section[data-job-id]").forEach(e => {
        const t = Number(e.dataset.jobId), n = state.data[t], l = e.querySelector(".job-skills-container");
        n && l && renderSkillGroupOutlines(l, n);
    });
}

function scheduleSkillGroupOutlineRefresh() {
    outlineRefreshFrame || (outlineRefreshFrame = requestAnimationFrame(() => {
        outlineRefreshFrame = 0, refreshAllSkillGroupOutlines();
    }));
}

function renderSkillsForJob(e, t, n) {
    if (!t.skills) return;
    const l = {};
    let i = 0;
    Object.entries(t.skills).forEach(([e, t]) => {
        let n = Number(t.position);
        (!Number.isFinite(n) || n < 1 || n > 500) && (n = 999), l[n] || (l[n] = []), l[n].push({
            kindId: e,
            ...t
        }), n > i && n < 999 && (i = n);
    });
    const o = [], s = i ? 5 * Math.ceil(i / 5) : 0;
    for (let e = 1; e <= s; e++) l[e] && l[e].length > 0 ? o.push(l[e][0]) : o.push(null);
    l[999] && l[999].sort((e, t) => e.kindId - t.kindId).forEach(e => o.push(e));
    let a = "";
    o.forEach(e => {
        if (!e) return void (a += '<div class="skill-node empty"></div>');
        const l = e.kindId, i = state.skillPoints[l] || 0, o = getHardMaxLevel(e), s = getNaturalMaxLevel(e), r = getSkillIconPath(e.icon), c = resolveSkillDisplayName(l, e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
        let u = "locked", d = !1, p = !1, m = !1;
        if (n) {
            const t = checkPrerequisites(e, state.skillPoints);
            i > 0 ? (u = i >= o ? "maxed" : "active", m = !0, d = i < o && t, p = i < s && t) : t && (u = "available", 
            d = !0, p = !0);
        } else u = "locked";
        d && i < s && (canAllocatePointToJob(t.job_id) || (d = !1, p = !1)), p && !canAllocatePointToJob(t.job_id) && (p = !1);
        const k = 0 === i ? 1 : i, b = e.levels[k] ? e.levels[k].skill_tags : null;
        let h = "";
        b && b.length && (h = `\n                <div class="skill-tags-mini">\n                    ${b.map(e => {
            const t = (e.name || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;"), n = getTagColor(e);
            return `\n                        <span class="skill-tag-mini" title="${t}" ${n ? `style="--tag-color: ${n}"` : ""}>\n                            ${t ? `<span class="skill-tag-mini-text">${t}</span>` : ""}\n                        </span>\n                    `;
        }).join("")}\n                </div>\n            `), a += `\n            <div class="skill-node" data-kind-id="${l}">\n                ${h}\n                <div class="skill-outline-anchor">\n                <div class="skill-icon-wrapper ${u}" \n                     data-kind-id="${l}">\n                   <img loading="lazy" decoding="async" class="skill-icon" src="${r}" alt="${c}" \n                       onerror="this.parentElement.style.background='var(--bg-tertiary)'">\n                  <span class="skill-level ${i > s ? "over-natural" : ""}">${i}/${s}</span>\n                </div>\n                <div class="skill-name" title="${c}">${c}</div>\n                <div class="skill-controls">\n                  <button class="skill-btn remove" data-action="remove" data-kind-id="${l}" \n                          ${m ? "" : "disabled"}>−</button>\n                  <button class="skill-btn add" data-action="add" data-kind-id="${l}"\n                          ${d ? "" : "disabled"}>+</button>\n                  <button class="skill-btn add-max" data-action="add-max" data-kind-id="${l}"\n                      ${p ? "" : "disabled"}>++</button>\n                </div>\n                </div>\n            </div>\n        `;
    }), e.innerHTML = a, scheduleSkillGroupOutlineRefresh();
}

function renderJobSelection(e, t) {
    if (!t.children || 0 === t.children.length) return !1;
    const n = t.children.map(e => state.data[e]).filter(e => e && jobPathHasSkills(e.job_id));
    if (0 === n.length) return !1;
    const l = document.createElement("div");
    return l.className = "job-selection-container", l.dataset.parentJobId = t.job_id, 
    l.innerHTML = `\n        <h3>Choose your Path</h3>\n        <div class="job-selection-grid">\n            ${n.map(e => {
        const t = getJobIconPath(e.job_icon_big || e.job_icon, !e.job_icon_big);
        return `\n                <div class="job-card" data-job-id="${e.job_id}">\n                    <img loading="lazy" decoding="async" src="${t}" alt="${resolveJobDisplayName(e)}">\n                    <div class="job-card-name">${resolveJobDisplayName(e)}</div>\n                </div>\n                `;
    }).join("")}\n        </div>\n    `, e.appendChild(l), l.querySelectorAll(".job-card").forEach(e => {
        e.addEventListener("click", () => {
            selectJob(Number(e.dataset.jobId));
        });
    }), !0;
}

function selectJob(e) {
    state.data[e] && jobPathHasSkills(e) && (state.jobPath.push(e), state.targetJobId = e, 
    state.scrollTargetJobId = e, state.uniqueSkillPoints = pruneUniqueSkillPointsForPath(state.jobPath), 
    renderSimulator());
}

function getSkillEntry(e) {
    const t = String(e);
    for (const e of state.jobPath) {
        const n = state.data[e];
        if (n && n.skills && n.skills[t]) return {
            skill: n.skills[t],
            job: n
        };
        if (n && n.traits && n.traits[t]) return {
            skill: n.traits[t],
            job: n
        };
    }
    return null;
}

function resolveSelectedEntry(e = state.selectedSkillKindId) {
    const t = parseSelectionToken(e);
    if (!t) return null;
    if ("unique" === t.type) {
        const e = getUniqueSkillEntry(t.id);
        if (!e || !e.skill) return null;
        const n = Number(e.skill.owner_job_id) || 0, l = state.data?.[n] || e.job, i = Number(state.uniqueSkillPoints[t.id]) || 0, o = getNaturalMaxLevel(e.skill), s = getHardMaxLevel(e.skill), a = 0 === i ? 1 : Math.min(i, s), r = Math.min(0 === i ? 2 : i + 1, s);
        return {
            type: "unique",
            id: t.id,
            skill: e.skill,
            job: l,
            currentLevel: i,
            naturalMaxLevel: o,
            maxLevel: s,
            baseLevel: a,
            curLvlData: e.skill.levels?.[a],
            nextLvlData: e.skill.levels?.[r],
            skillName: resolveSkillDisplayName(t.id, e.skill),
            jobName: l ? resolveJobDisplayName(l) : ""
        };
    }
    const n = getSkillEntry(t.id);
    if (!n || !n.skill) return null;
    const l = !0 === n.skill.is_trait, i = getNaturalMaxLevel(n.skill), o = getHardMaxLevel(n.skill), s = l ? o : Number(state.skillPoints[t.id]) || 0, a = 0 === s ? 1 : Math.min(s, o), r = Math.min(0 === s ? 2 : s + 1, o);
    return {
        type: l ? "trait" : "skill",
        id: t.id,
        skill: n.skill,
        job: n.job,
        currentLevel: s,
        naturalMaxLevel: i,
        maxLevel: o,
        baseLevel: a,
        curLvlData: n.skill.levels?.[a],
        nextLvlData: n.skill.levels?.[r],
        skillName: resolveSkillDisplayName(t.id, n.skill),
        jobName: n.job ? resolveJobDisplayName(n.job) : ""
    };
}

function buildSkillDetailHtml(e) {
    if (!e) return '<div class="details-placeholder">Select a skill to see details.</div>';
    const {type: t, skill: n, currentLevel: l, naturalMaxLevel: i, curLvlData: o, skillName: s, jobName: a} = e;
    let r = `\n        <div class="skill-detail-header">\n            <img loading="lazy" decoding="async" src="${getSkillIconPath(n.icon)}" class="skill-detail-icon">\n            <div class="skill-detail-info">\n                <h3>${s}</h3>\n                <div class="skill-type">${"unique" === t ? "Unique Skill" : "trait" === t ? e.job && e.job.traits_label || "Career Trait" : "Job Skill"}${a ? ` • ${a}` : ""}</div>\n                <div class="tooltip-subtitle ${l > i ? "over-natural" : ""}">Level ${l} / ${i}</div>\n            </div>\n        </div>\n    `;
    return o && o.skill_tags && (r += renderTagChips(o.skill_tags)), o && o.des && (r += `\n            <div class="skill-detail-section">\n                <div class="skill-detail-section-title">${l > 0 ? "Current Level" : "Level 1 Preview"}</div>\n                <div class="skill-detail-desc">${formatDesc(o.des)}</div>\n                ${renderStatsGrid(o, {
        includePvp: !0
    })}\n            </div>\n        `), r += renderDamageCoefficientTable(o), r;
}

function renderSkillDetailPanel() {
    const e = document.getElementById("skill-detail-content");
    if (!e) return;
    const t = resolveSelectedEntry();
    e.innerHTML = buildSkillDetailHtml(t);
}

function renderSkillDetailModal() {
    const e = document.getElementById("skill-detail-modal-content"), t = document.getElementById("skill-detail-modal-title");
    if (!e || !t) return;
    const n = resolveSelectedEntry();
    e.innerHTML = buildSkillDetailHtml(n), t.textContent = n?.skillName || "Skill Details";
}

function openSkillDetailModal(e = state.selectedSkillKindId, t = null) {
    const n = document.getElementById("skill-detail-modal");
    if (!n) return;
    hideTooltip(), e && (state.selectedSkillKindId = e), t instanceof HTMLElement ? lastSkillModalTriggerEl = t : document.activeElement instanceof HTMLElement && !n.contains(document.activeElement) && (lastSkillModalTriggerEl = document.activeElement), 
    renderSkillDetailPanel(), renderSkillDetailModal(), n.classList.add("open"), n.setAttribute("aria-hidden", "false"), 
    n.inert = !1;
    const l = n.querySelector("[data-skill-modal-close]");
    l instanceof HTMLElement && requestAnimationFrame(() => {
        l.focus({
            preventScroll: !0
        });
    });
}

function closeSkillDetailModal() {
    const e = document.getElementById("skill-detail-modal");
    if (!e) return;
    const t = document.activeElement;
    t instanceof HTMLElement && e.contains(t) && t.blur(), e.classList.remove("open"), 
    e.setAttribute("aria-hidden", "true"), e.inert = !0;
    const n = lastSkillModalTriggerEl instanceof HTMLElement && lastSkillModalTriggerEl.isConnected ? lastSkillModalTriggerEl : null;
    n && requestAnimationFrame(() => {
        n.focus({
            preventScroll: !0
        });
    });
}

function renderSkillDetailViews() {
    renderSkillDetailPanel();
    const e = document.getElementById("skill-detail-modal");
    e && e.classList.contains("open") && renderSkillDetailModal();
}

function setupEventListeners() {
    document.getElementById("simulator-container").addEventListener("click", handleSimulatorClick), 
    window.addEventListener("resize", scheduleSkillGroupOutlineRefresh), window.addEventListener("resize", syncUniqueSkillPanelPlacement);
    const e = document.getElementById("simulator-container");
    window.ResizeObserver && e && (outlineResizeObserver?.disconnect(), outlineResizeObserver = new ResizeObserver(() => {
        scheduleSkillGroupOutlineRefresh();
    }), outlineResizeObserver.observe(e)), document.fonts?.ready && document.fonts.ready.then(() => {
        scheduleSkillGroupOutlineRefresh();
    }).catch(() => {});
    const t = document.getElementById("unique-skill-content");
    t && (t.addEventListener("click", handleUniqueSkillClick), t.addEventListener("mousemove", e => {
        moveTooltip(e);
    }), t.addEventListener("mouseover", e => {
        const t = e.target.closest(".unique-skill-icon-wrapper, .unique-skill-btn");
        if (!t) return;
        const n = t.closest(".unique-skill-card"), l = n?.dataset.uniqueGroupId;
        if (!l) return;
        const i = n.querySelector(".unique-skill-icon-wrapper") || t;
        showTooltip(makeUniqueSelection(l), i);
    }), t.addEventListener("mouseout", e => {
        const t = e.target.closest(".unique-skill-icon-wrapper, .unique-skill-btn");
        if (!t) return;
        const n = t.closest(".unique-skill-card");
        if (!n) return;
        const l = e.relatedTarget;
        l && l.closest && l.closest(".unique-skill-card") === n && l.closest(".unique-skill-icon-wrapper, .unique-skill-btn") || hideTooltip();
    }), t.addEventListener("contextmenu", e => {
        const t = e.target.closest(".unique-skill-icon-wrapper");
        if (!t) return;
        e.preventDefault();
        const n = t.dataset.uniqueGroupId;
        n && (state.selectedSkillKindId = makeUniqueSelection(n), removeUniqueSkillPoint(n));
    }));
    const n = document.getElementById("simulator-container");
    n.addEventListener("mouseover", e => {
        const t = e.target.closest(".skill-icon-wrapper, .skill-btn");
        if (!t) return;
        const n = t.closest(".skill-node");
        if (!n) return;
        const l = n.dataset.kindId;
        l && showTooltip(l, n.querySelector(".skill-icon-wrapper") || t);
    }), n.addEventListener("mouseout", e => {
        const t = e.target.closest(".skill-icon-wrapper, .skill-btn");
        if (!t) return;
        const n = t.closest(".skill-node");
        if (!n) return;
        const l = e.relatedTarget;
        l && l.closest && l.closest(".skill-node") === n && l.closest(".skill-icon-wrapper, .skill-btn") || hideTooltip();
    }), n.addEventListener("mousemove", e => {
        moveTooltip(e);
    }), n.addEventListener("contextmenu", e => {
        const t = e.target.closest(".skill-icon-wrapper");
        if (!t) return;
        e.preventDefault();
        const n = t.dataset.kindId;
        state.selectedSkillKindId = makeSkillSelection(n), removeSkillPoint(n);
    });
    const l = document.getElementById("skill-detail-modal");
    l && l.addEventListener("click", e => {
        const t = e.target;
        t && t.hasAttribute("data-skill-modal-close") && closeSkillDetailModal();
    }), document.addEventListener("pointerdown", e => {
        const t = String(e.pointerType || "").toLowerCase();
        if ("touch" !== t && "pen" !== t) return;
        const n = document.getElementById("tooltip");
        n && n.classList.contains("visible") && (e.target.closest(".skill-icon-wrapper, .skill-btn, .unique-skill-icon-wrapper, .unique-skill-btn, #tooltip") || hideTooltip());
    }), document.addEventListener("keydown", e => {
        "Escape" === e.key && closeSkillDetailModal();
    });
}

function handleSimulatorClick(e) {
    const t = e.target.closest(".skill-btn");
    if (t) {
        const e = t.dataset.action, n = t.dataset.kindId;
        return state.selectedSkillKindId = makeSkillSelection(n), void ("add" === e ? addSkillPoint(n) : "add-max" === e ? addSkillPointsToMax(n) : "remove" === e && removeSkillPoint(n));
    }
    const n = e.target.closest(".skill-icon-wrapper");
    if (n) {
        const e = n.dataset.kindId;
        if (!e) return;
        openSkillDetailModal(makeSkillSelection(e), n);
    }
}

function handleUniqueSkillClick(e) {
    const t = e.target.closest(".unique-skill-btn");
    if (t) {
        const e = t.dataset.action, n = t.dataset.uniqueGroupId;
        if (!n) return;
        return state.selectedSkillKindId = makeUniqueSelection(n), void ("add" === e ? addUniqueSkillPoint(n) : "add-max" === e ? addUniqueSkillPointsToNaturalMax(n) : "remove" === e && removeUniqueSkillPoint(n));
    }
    const n = e.target.closest(".unique-skill-card");
    if (n) {
        const e = n.dataset.uniqueGroupId;
        if (!e) return;
        const t = n.querySelector(".unique-skill-icon-wrapper") || n;
        openSkillDetailModal(makeUniqueSelection(e), t);
    }
}

function showTooltip(e, t) {
    const n = resolveSelectedEntry(e);
    if (!n || !n.skill) return;
    const {type: l, id: i, skill: o, currentLevel: s, naturalMaxLevel: a, maxLevel: r, baseLevel: c, curLvlData: u, nextLvlData: d, skillName: p} = n, m = document.getElementById("tooltip"), k = Math.min(0 === s ? 2 : s + 1, r);
    let b = `\n        <div class="tooltip-header">\n            <img loading="lazy" decoding="async" src="${getSkillIconPath(o.icon)}" class="tooltip-icon">\n            <div>\n                <div class="tooltip-title">${p}</div>\n                <div class="tooltip-subtitle ${s > a ? "over-natural" : ""}">Level ${s} / ${a}</div>\n            </div>\n        </div>\n    `;
    u && u.skill_tags && (b += renderTagChips(u.skill_tags));
    const h = "skill" === l ? getUnmetPrerequisites(o, state.skillPoints) : [];
    h.length && (b += `\n            <div class="tooltip-prereqs">\n                ${h.map(e => `\n                    <div class="tooltip-prereq unmet">Requires ${escapeHtml(e.name)} Lv ${e.requiredLevel}</div>\n                `).join("")}\n            </div>\n        `), 
    (s > 0 && u.des || 0 === s && u.des) && (b += `<div class="tooltip-desc">${formatDesc(u.des)}</div>`, 
    b += renderStatsGrid(u, {
        includePvp: !1
    })), k > c && k <= r && d && (b += `\n            <div class="skill-next-level">\n                <div class="next-level-header">Next Level (${k})</div>\n                <div class="tooltip-desc">${formatDesc(d.des)}</div>\n                ${renderStatsGrid(d, {
        includePvp: !1
    })}\n            </div>\n        `), m.innerHTML = b, m.classList.add("visible"), 
    m.classList.remove("hidden"), tooltipAnchorKindId !== String(e) && (tooltipPlacement = null), 
    tooltipAnchorEl = t || null, tooltipAnchorKindId = String(e), null !== lastPointerPos.x && null !== lastPointerPos.y && requestAnimationFrame(() => {
        positionTooltipAt(lastPointerPos.x, lastPointerPos.y);
    });
}

function getTooltipAnchorElementBySelection(e = tooltipAnchorKindId) {
    const t = parseSelectionToken(e);
    if (!t) return null;
    if ("unique" === t.type) {
        const e = document.querySelector(`.unique-skill-card[data-unique-group-id="${t.id}"]`);
        return e ? e.querySelector(".unique-skill-icon-wrapper") : null;
    }
    const n = document.getElementById("simulator-container"), l = n ? n.querySelector(`.skill-node[data-kind-id="${t.id}"]`) : null;
    return l ? l.querySelector(".skill-icon-wrapper") : null;
}

function refreshVisibleTooltip() {
    const e = document.getElementById("tooltip");
    if (!e || !e.classList.contains("visible") || !tooltipAnchorKindId) return;
    const t = getTooltipAnchorElementBySelection(tooltipAnchorKindId) || tooltipAnchorEl;
    showTooltip(tooltipAnchorKindId, t);
}

function hideTooltip() {
    const e = document.getElementById("tooltip");
    tooltipAnchorEl = null, tooltipAnchorKindId = null, tooltipPlacement = null, e.classList.remove("visible"), 
    e.classList.add("hidden");
}

function getTooltipAnchorRect() {
    if (tooltipAnchorEl && tooltipAnchorEl.isConnected) return tooltipAnchorEl.getBoundingClientRect();
    const e = getTooltipAnchorElementBySelection(tooltipAnchorKindId);
    return e ? (tooltipAnchorEl = e, e.getBoundingClientRect()) : null;
}

function positionTooltipAt(e, t) {
    const n = document.getElementById("tooltip");
    if (!n.classList.contains("visible")) return;
    const l = 12, i = 16, o = n.offsetWidth || 0, s = n.offsetHeight || 0, a = window.innerWidth, r = window.innerHeight;
    let c = e + i, u = t + i;
    const d = getTooltipAnchorRect();
    if (d) {
        const n = d, p = n.right + i + o <= a - l, m = n.left - i - o >= l;
        tooltipPlacement ? "right" === tooltipPlacement && !p && m ? tooltipPlacement = "left" : "left" === tooltipPlacement && !m && p ? tooltipPlacement = "right" : "cursor" === tooltipPlacement || m || p || (tooltipPlacement = "cursor") : tooltipPlacement = p ? "right" : m ? "left" : "cursor", 
        "right" === tooltipPlacement ? (c = n.right + i, u = n.top) : "left" === tooltipPlacement ? (c = n.left - o - i, 
        u = n.top) : (c = e + i, u = t + i, c + o + l > a && (c = e - o - i), u + s + l > r && (u = t - s - i));
    } else tooltipPlacement = null, c + o + l > a && (c = e - o - i), u + s + l > r && (u = t - s - i);
    c = Math.max(l, Math.min(c, a - o - l)), u = Math.max(l, Math.min(u, r - s - l)), 
    n.style.left = `${c}px`, n.style.top = `${u}px`;
}

function moveTooltip(e) {
    lastPointerPos.x = e.clientX, lastPointerPos.y = e.clientY, positionTooltipAt(e.clientX, e.clientY);
}

function renderStatsGrid(e, t = {}) {
    if (!e) return "";
    t.includePvp;
    const n = isPassiveSkill(e), l = Number(e.range_max), i = Number.isFinite(Number(e.pve_percent)) ? Number(e.pve_percent) : null, o = Number.isFinite(Number(e.pve_flat)) ? Number(e.pve_flat) : null;
    let s = Number.isFinite(Number(e.pvp_percent)) ? Number(e.pvp_percent) : null, a = Number.isFinite(Number(e.pvp_flat)) ? Number(e.pvp_flat) : null;
    null === s && null !== i && (s = i), null === a && null !== o && (a = o);
    const r = [ {
        label: "CD",
        value: e.cooldown ? e.cooldown / 1e3 + "s" : null
    }, {
        label: "Range",
        value: n || !Number.isFinite(l) || l <= 0 ? null : l
    }, {
        label: "Fixed Cast",
        value: e.chant_fixed ? e.chant_fixed / 1e3 + "s" : null
    }, {
        label: "Variable Cast",
        value: e.chant_float ? e.chant_float / 1e3 + "s" : null
    }, {
        label: "GCD",
        value: e.gcd ? e.gcd / 1e3 + "s" : null
    }, {
        label: "SP",
        value: e.mana_cost ? e.mana_cost : null
    } ].filter(e => null !== e.value && void 0 !== e.value && "" !== e.value);
    return 0 === r.length ? "" : `\n        <div class="skill-stats-grid">\n            ${r.map(e => `\n                <div class="stat-item">\n                    <span class="stat-label">${e.label}:</span>\n                    <span class="stat-value">${e.value}</span>\n                </div>\n            `).join("")}\n        </div>\n    `;
}

function renderDamageCoefficientTable(e) {
    if (!e) return "";
    const t = t => {
        const n = Number(e[t]);
        return Number.isFinite(n) ? n : null;
    }, n = e => null === e ? null : Math.abs(e) < .01 ? 0 : e, l = [], i = (e, i, o, {percent: s = !1} = {}) => {
        const a = t(i), r = t(o), c = s ? n(a) : a, u = s ? n(r) : r, d = null === u && null !== c ? c : u;
        null === c && null === d || (0 !== c && null !== c || 0 !== d && null !== d) && l.push({
            label: e,
            pve: c,
            pvp: d,
            percent: s
        });
    };
    i("Damage %", "pve_percent", "pvp_percent", {
        percent: !0
    }), i("Damage Flat", "pve_flat", "pvp_flat"), i("Value3 %", "pve_value3", "pvp_value3", {
        percent: !0
    }), i("Value4 %", "pve_value4", "pvp_value4", {
        percent: !0
    }), i("Dynamic 1 %", "pve_dynamic1", "pvp_dynamic1", {
        percent: !0
    }), i("Dynamic 2 %", "pve_dynamic2", "pvp_dynamic2", {
        percent: !0
    }), i("Dynamic 3 %", "pve_dynamic3", "pvp_dynamic3", {
        percent: !0
    }), i("Dynamic 4 %", "pve_dynamic4", "pvp_dynamic4", {
        percent: !0
    }), i("Limit 1 %", "pve_limit1", "pvp_limit1", {
        percent: !0
    }), i("Limit 2 %", "pve_limit2", "pvp_limit2", {
        percent: !0
    });
    const o = [], s = (e, l, {percent: i = !1, boolean: s = !1} = {}) => {
        const a = t(l);
        if (null === a) return;
        if (s) {
            if (!a) return;
            return void o.push({
                label: e,
                value: "Yes"
            });
        }
        const r = i ? n(a) : a;
        0 !== r && o.push({
            label: e,
            value: i ? formatPercent(r) : formatNumber(r)
        });
    }, a = (e, n, l) => {
        const i = t(n);
        null !== i && 0 !== i && o.push({
            label: e,
            value: l && l[i] ? l[i] : formatNumber(i)
        });
    }, r = (t, n, l) => {
        const i = formatList(e[n], l);
        i && o.push({
            label: t,
            value: i
        });
    }, c = (e, n) => {
        t(n) && o.push({
            label: e,
            value: "Yes"
        });
    };
    return s("ASPD affected", "aspd_affected", {
        boolean: !0
    }), s("ASPD Cast Speed Pre", "aspd_cast_speed_pre"), s("ASPD Cooldown Pre", "aspd_cooldown_pre"), 
    s("ASPD GCD Pre", "aspd_group_cooldown_pre"), s("Damage ASPD Speed Pre", "damage_aspd_speed_pre"), 
    s("Can Crit", "is_able_crit", {
        boolean: !0
    }), s("Crit %", "crit_percent", {
        percent: !0
    }), s("Force Crit", "is_crit", {
        boolean: !0
    }), s("Certain Hit", "is_certain_hit", {
        boolean: !0
    }), s("Hit Extra %", "hit_extra_percent", {
        percent: !0
    }), s("Toughness Damage", "toughness_damage"), a("Button Type", "button_type", SKILL_BUTTON_TYPE_LABELS), 
    a("Element", "elements_type", ELEMENT_TYPE_LABELS), a("Damage Type", "damage_skill_damage_type", SKILL_DAMAGE_TYPE_LABELS), 
    a("Damage Range", "damage_skill_range_type", SKILL_RANGE_TYPE_LABELS), a("Damage Element", "damage_skill_elements_type", ELEMENT_TYPE_LABELS), 
    s("SP Cost", "sp_cost"), s("Range Min", "range_min"), s("Cast Height", "cast_height"), 
    s("Display Type", "display_type"), s("Display Time", "display_time"), r("Target Types", "target_types", TARGET_TYPE_LABELS), 
    r("Excluded Target Units", "exclude_target_units", TARGET_UNIT_TYPE_LABELS), c("Needs Mount", "is_need_mount"), 
    c("No Turn To Target", "is_no_turn_to_target"), c("Can Move While Casting", "is_can_move"), 
    c("Interrupts Auto Attack", "is_interrupt_auto_attack"), c("Does Not Interrupt Auto Cast", "is_not_interrupt_auto_cast"), 
    c("Auto Cast", "is_auto_cast"), 2 === Number(e.is_enable_auto_battle) ? o.push({
        label: "Auto Battle",
        value: "Disabled"
    }) : 1 === Number(e.is_enable_auto_battle) && o.push({
        label: "Auto Battle",
        value: "Enabled override"
    }), l.length || o.length ? `\n        <div class="skill-detail-section">\n            <div class="skill-detail-section-title">Damage Coefficients</div>\n            <table class="skill-coeff-table">\n                <thead>\n                    <tr>\n                        <th></th>\n                        <th>PvE</th>\n                        <th>PvP</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    ${l.map(e => {
        const t = null === e.pve ? "" : e.percent ? formatPercent(e.pve) : formatNumber(e.pve), n = null === e.pvp ? "" : e.percent ? formatPercent(e.pvp) : formatNumber(e.pvp), l = null === e.pvp || null === e.pve ? "" : getPvpTrend(e.pvp, e.pve);
        return `\n            <tr>\n                <th>${e.label}</th>\n                <td>${t}</td>\n                <td>${n} ${l}</td>\n            </tr>\n        `;
    }).join("")}\n                    ${o.map(e => `\n        <tr>\n            <th>${e.label}</th>\n            <td colspan="2">${e.value}</td>\n        </tr>\n    `).join("")}\n                </tbody>\n            </table>\n        </div>\n    ` : "";
}

function formatDesc(e) {
    return e ? e.replace(/<color=#([0-9a-fA-F]+)>(.*?)<\/color>/g, '<span style="color:#$1">$2</span>').replace(/\n/g, "<br>") : "";
}

// This file is injected via a dynamically-created <script> tag in index.html.
// Setting `.defer = true` on a script created that way has no effect (defer
// only applies to scripts present in the original parsed HTML) — the browser
// loads it as `async` instead. That means DOMContentLoaded can fire *before*
// this script finishes loading, so a plain `addEventListener` here can attach
// after the event already happened and initSimulator() would silently never
// run (no error, no fetches — exactly the "blank page" symptom). Handle both
// orderings explicitly.
if ("loading" === document.readyState) {
    document.addEventListener("DOMContentLoaded", initSimulator);
} else {
    initSimulator();
}

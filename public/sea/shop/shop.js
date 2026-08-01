const SUPPORTED_LOCALES = [ "zh-TW", "en-US", "zh-CN", "th-TH", "id-ID" ];

function detectLocale() {
    const e = new URLSearchParams(window.location.search).get("lang"), t = localStorage.getItem("ro_lang"), n = document.documentElement.getAttribute("lang"), i = Array.isArray(navigator.languages) ? navigator.languages : [], o = [ e, (navigator.language || "").trim(), ...i, t, n ], r = e => SUPPORTED_LOCALES.some(t => t.toLowerCase() === String(e).toLowerCase());
    for (const e of o) {
        if (!e) continue;
        const t = SUPPORTED_LOCALES.find(t => t.toLowerCase() === String(e).toLowerCase());
        if (t) return t;
    }
    for (const e of o) {
        if (!e) continue;
        const t = String(e).split("-")[0].toLowerCase();
        if ("zh" === t) {
            if (r("zh-TW")) return "zh-TW";
            const e = SUPPORTED_LOCALES.find(e => e.toLowerCase().startsWith("zh-"));
            if (e) return e;
        }
        if ("en" === t && r("en-US")) return "en-US";
        if ("th" === t && r("th-TH")) return "th-TH";
        if (("id" === t || "in" === t) && r("id-ID")) return "id-ID";
    }
    return r("en-US") ? "en-US" : r("zh-TW") ? "zh-TW" : SUPPORTED_LOCALES[0] || "en-US";
}

const ACTIVE_LOCALE = detectLocale();

localStorage.setItem("ro_lang", ACTIVE_LOCALE), document.documentElement.setAttribute("lang", ACTIVE_LOCALE);

const I18N = {
    "zh-TW": {
        pageTitle: "RO仙境傳說：世界之旅 | 商店",
        pageDesc: "RO仙境傳說：世界之旅 - 商店",
        title: "商店",
        searchPlaceholder: "搜尋道具、說明或貨幣...",
        loading: "載入中...",
        loadFailed: "載入失敗",
        count: e => `${e} 件商品`,
        all: "全部",
        currencies: "錢財",
        clear: "清除",
        noResults: "沒有符合條件的商品。",
        noSelection: "選擇商品查看詳情",
        noLevelRequirement: "無等級限制",
        levelRequirement: "等級 {level}+",
        sectionCount: e => `${e} 件`,
        quantity: "數量",
        dailyLimit: "每日限購：{count}",
        weeklyLimit: "每週限購：{count}",
        monthlyLimit: "每月限購：{count}",
        oneTimeLimit: "永久限購：{count}",
        hiddenConfig: "配置隱藏",
        purchase: "購買",
        tooltipPurchase: "可用貨幣",
        tooltipAvailability: "商店資訊",
        tooltipLevel: "顯示等級",
        tooltipStore: "商店",
        tooltipTab: "頁籤",
        tooltipLimit: "限購",
        tooltipBound: "綁定",
        tooltipGift: "贈禮",
        tooltipStats: "屬性",
        detailTitle: "道具詳情",
        yes: "是",
        modeDirect: "直接價格",
        modeShared: "共用餘額",
        modeExchange: "可補齊兌換",
        unknownCurrency: "未知貨幣"
    },
    "en-US": {
        pageTitle: "RO World Journey | Shop",
        pageDesc: "RO World Journey - Shop",
        title: "Shop",
        searchPlaceholder: "Search items, text, or currencies...",
        loading: "Loading...",
        loadFailed: "Load failed",
        count: e => `${e} items`,
        all: "All",
        currencies: "Currencies",
        clear: "Clear",
        noResults: "No matching items.",
        noSelection: "Select an item to view details",
        noLevelRequirement: "No level requirement",
        levelRequirement: "Level {level}+",
        sectionCount: e => `${e} items`,
        quantity: "Qty",
        dailyLimit: "Daily Limit: {count}",
        weeklyLimit: "Weekly Limit: {count}",
        monthlyLimit: "Monthly Limit: {count}",
        oneTimeLimit: "Lifetime Limit: {count}",
        hiddenConfig: "Hidden config",
        purchase: "Buy",
        tooltipPurchase: "Accepted currencies",
        tooltipAvailability: "Availability",
        tooltipLevel: "Required level",
        tooltipStore: "Store",
        tooltipTab: "Tab",
        tooltipLimit: "Limit",
        tooltipBound: "Bound",
        tooltipGift: "Gift",
        tooltipStats: "Stats",
        detailTitle: "Item details",
        yes: "Yes",
        modeDirect: "Direct",
        modeShared: "Shared balance",
        modeExchange: "Exchange fallback",
        unknownCurrency: "Unknown currency"
    },
    "zh-CN": {
        pageTitle: "RO仙境传说：世界之旅 | 商店",
        pageDesc: "RO仙境传说：世界之旅 - 商店",
        title: "商店",
        searchPlaceholder: "搜索道具、说明或货币...",
        loading: "加载中...",
        loadFailed: "加载失败",
        count: e => `${e} 件商品`,
        all: "全部",
        currencies: "钱财",
        clear: "清除",
        noResults: "没有符合条件的商品。",
        noSelection: "选择商品查看详情",
        noLevelRequirement: "无等级限制",
        levelRequirement: "等级 {level}+",
        sectionCount: e => `${e} 件`,
        quantity: "数量",
        dailyLimit: "每日限购：{count}",
        weeklyLimit: "每周限购：{count}",
        monthlyLimit: "每月限购：{count}",
        oneTimeLimit: "永久限购：{count}",
        hiddenConfig: "配置隐藏",
        purchase: "购买",
        tooltipPurchase: "可用货币",
        tooltipAvailability: "商店信息",
        tooltipLevel: "显示等级",
        tooltipStore: "商店",
        tooltipTab: "页签",
        tooltipLimit: "限购",
        tooltipBound: "绑定",
        tooltipGift: "赠礼",
        tooltipStats: "属性",
        detailTitle: "道具详情",
        yes: "是",
        modeDirect: "直接价格",
        modeShared: "共用余额",
        modeExchange: "可补齐兑换",
        unknownCurrency: "未知货币"
    },
    "th-TH": {
        pageTitle: "RO World Journey | ร้านค้า",
        pageDesc: "RO World Journey - ร้านค้า",
        title: "ร้านค้า",
        searchPlaceholder: "ค้นหาไอเท็ม คำอธิบาย หรือสกุลเงิน...",
        loading: "กำลังโหลด...",
        loadFailed: "โหลดล้มเหลว",
        count: e => `${e} ชิ้น`,
        all: "ทั้งหมด",
        currencies: "สกุลเงิน",
        clear: "ล้าง",
        noResults: "ไม่พบไอเท็มที่ตรงกัน",
        noSelection: "เลือกไอเท็มเพื่อดูรายละเอียด",
        noLevelRequirement: "ไม่มีข้อกำหนดเลเวล",
        levelRequirement: "เลเวล {level}+",
        sectionCount: e => `${e} ชิ้น`,
        quantity: "จำนวน",
        dailyLimit: "จำกัดต่อวัน: {count}",
        weeklyLimit: "จำกัดต่อสัปดาห์: {count}",
        monthlyLimit: "จำกัดต่อเดือน: {count}",
        oneTimeLimit: "จำกัดตลอดชีพ: {count}",
        hiddenConfig: "การตั้งค่าซ่อน",
        purchase: "ซื้อ",
        tooltipPurchase: "สกุลเงินที่ยอมรับ",
        tooltipAvailability: "ข้อมูลร้านค้า",
        tooltipLevel: "เลเวลที่ต้องการ",
        tooltipStore: "ร้านค้า",
        tooltipTab: "แท็บ",
        tooltipLimit: "จำกัด",
        tooltipBound: "ผูกบัญชี",
        tooltipGift: "ของขวัญ",
        tooltipStats: "ค่าสถานะ",
        detailTitle: "รายละเอียดไอเท็ม",
        yes: "ใช่",
        modeDirect: "ราคาตรง",
        modeShared: "ยอดร่วม",
        modeExchange: "แลกเปลี่ยน",
        unknownCurrency: "สกุลเงินไม่ทราบ"
    },
    "id-ID": {
        pageTitle: "RO World Journey | Toko",
        pageDesc: "RO World Journey - Toko",
        title: "Toko",
        searchPlaceholder: "Cari item, teks, atau mata uang...",
        loading: "Memuat...",
        loadFailed: "Gagal memuat",
        count: e => `${e} item`,
        all: "Semua",
        currencies: "Mata Uang",
        clear: "Bersihkan",
        noResults: "Tidak ada item yang cocok.",
        noSelection: "Pilih item untuk melihat detail",
        noLevelRequirement: "Tanpa batas level",
        levelRequirement: "Level {level}+",
        sectionCount: e => `${e} item`,
        quantity: "Jumlah",
        dailyLimit: "Batas Harian: {count}",
        weeklyLimit: "Batas Mingguan: {count}",
        monthlyLimit: "Batas Bulanan: {count}",
        oneTimeLimit: "Batas Seumur Hidup: {count}",
        hiddenConfig: "Konfig tersembunyi",
        purchase: "Beli",
        tooltipPurchase: "Mata uang yang diterima",
        tooltipAvailability: "Info toko",
        tooltipLevel: "Level tampil",
        tooltipStore: "Toko",
        tooltipTab: "Tab",
        tooltipLimit: "Batas",
        tooltipBound: "Bound",
        tooltipGift: "Hadiah",
        tooltipStats: "Atribut",
        detailTitle: "Detail item",
        yes: "Ya",
        modeDirect: "Harga langsung",
        modeShared: "Saldo bersama",
        modeExchange: "Tukar pengganti",
        unknownCurrency: "Mata uang tidak dikenal"
    }
}, BOX_PREVIEW_I18N = {
    "zh-TW": {
        boxPreviewTitle: "禮盒內容",
        boxPreviewChoose: "可自選 1 件",
        boxPreviewAll: "包含全部",
        boxPreviewPossible: "可能獲得",
        boxPreviewPreview: "預覽內容",
        boxPreviewMore: "還有 {count} 項，請在右側詳情查看"
    },
    "en-US": {
        boxPreviewTitle: "Box Contents",
        boxPreviewChoose: "Choose 1",
        boxPreviewAll: "Contains all",
        boxPreviewPossible: "Possible contents",
        boxPreviewPreview: "Preview",
        boxPreviewMore: "{count} more in item details"
    },
    "zh-CN": {
        boxPreviewTitle: "礼盒内容",
        boxPreviewChoose: "可自选 1 件",
        boxPreviewAll: "包含全部",
        boxPreviewPossible: "可能获得",
        boxPreviewPreview: "预览内容",
        boxPreviewMore: "还有 {count} 项，请在右侧详情查看"
    },
    "th-TH": {
        boxPreviewTitle: "Box Contents",
        boxPreviewChoose: "Choose 1",
        boxPreviewAll: "Contains all",
        boxPreviewPossible: "Possible contents",
        boxPreviewPreview: "Preview",
        boxPreviewMore: "{count} more in item details"
    },
    "id-ID": {
        boxPreviewTitle: "Isi Box",
        boxPreviewChoose: "Pilih 1",
        boxPreviewAll: "Berisi semua",
        boxPreviewPossible: "Kemungkinan isi",
        boxPreviewPreview: "Pratinjau",
        boxPreviewMore: "{count} lagi di detail item"
    }
};

for (const [e, t] of Object.entries(BOX_PREVIEW_I18N)) Object.assign(I18N[e] || (I18N[e] = {}), t);

const TXT = I18N[ACTIVE_LOCALE] || I18N["en-US"], withAssetVersion = window.withAssetVersion || (e => e), NUMBER_FORMATTER = new Intl.NumberFormat(ACTIVE_LOCALE);

let suppressHashWrite = !1;

const MOBILE_SHOP_MEDIA = "(max-width: 768px)", state = {
    data: null,
    items: [],
    selectedCurrencyKey: "",
    selectedCurrencyIds: new Set,
    activeItemId: "",
    searchQuery: "",
    lastPointer: {
        x: null,
        y: null
    },
    renderTokens: [],
    renderedTokens: 0
}, RENDER_BATCH_SIZE = 60, RENDER_FILL_PADDING = 800;

function readFilterHash() {
    const e = window.location.hash ? window.location.hash.slice(1) : "";
    if (!e) return {
        hasAny: !1
    };
    const t = new URLSearchParams(e);
    return t.has("currency") ? {
        hasAny: !0,
        currency: t.get("currency")
    } : {
        hasAny: !1
    };
}

function writeFilterHash() {
    if (suppressHashWrite) return;
    const e = new URLSearchParams;
    state.selectedCurrencyKey && e.set("currency", state.selectedCurrencyKey);
    const t = e.toString(), n = t ? `${window.location.pathname}${window.location.search}#${t}` : `${window.location.pathname}${window.location.search}`;
    n !== window.location.pathname + window.location.search + (window.location.hash || "") && history.replaceState(null, "", n);
}

function applyHashToState() {
    const e = readFilterHash();
    if (!e.hasAny || !e.currency) return state.selectedCurrencyKey = "", void (state.selectedCurrencyIds = new Set);
    state.selectedCurrencyKey = e.currency, state.selectedCurrencyIds = currencyIdsForKey(e.currency);
}

function currencyIdsForKey(e) {
    const t = new Set;
    if (!e || !state.data) return t;
    for (const n of state.data.currencies || []) currencyGroupKey(n) === e && t.add(String(n.id));
    return t;
}

function t(e, t = {}) {
    const n = TXT[e] ?? I18N["en-US"][e] ?? e;
    return "function" == typeof n ? n(...Object.values(t)) : String(n).replace(/\{(\w+)\}/g, (e, n) => String(t[n] ?? ""));
}

function escapeHtml(e) {
    return String(e || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function clampRichTextSize(e) {
    const t = Number.parseInt(e, 10);
    return Number.isFinite(t) ? Math.max(10, Math.min(32, t)) : 14;
}

function renderMarkup(e) {
    let t = escapeHtml(e);
    return t = t.replace(/&lt;color=(#[0-9A-Fa-f]{3,8})&gt;/g, '<span style="color:$1">').replace(/&lt;\/color&gt;/g, "</span>").replace(/\[color=(#[0-9A-Fa-f]{3,8})\]/gi, '<span style="color:$1">').replace(/\[\/color\]/gi, "</span>").replace(/&lt;b&gt;/gi, "<strong>").replace(/&lt;\/b&gt;/gi, "</strong>").replace(/\[b\]/gi, "<strong>").replace(/\[\/b\]/gi, "</strong>").replace(/&lt;i&gt;/gi, "<em>").replace(/&lt;\/i&gt;/gi, "</em>").replace(/\[i\]/gi, "<em>").replace(/\[\/i\]/gi, "</em>").replace(/&lt;u&gt;/gi, '<span class="shop-rich-underline">').replace(/&lt;\/u&gt;/gi, "</span>").replace(/\[u\]/gi, '<span class="shop-rich-underline">').replace(/\[\/u\]/gi, "</span>").replace(/&lt;size=(\d{1,3})&gt;/gi, (e, t) => `<span style="font-size:${clampRichTextSize(t)}px">`).replace(/\[size=(\d{1,3})\]/gi, (e, t) => `<span style="font-size:${clampRichTextSize(t)}px">`).replace(/&lt;\/size&gt;/gi, "</span>").replace(/\[\/size\]/gi, "</span>").replace(/&lt;br\s*\/?&gt;/gi, "<br>").replace(/\[br\]/gi, "<br>").replace(/\r?\n/g, "<br>"), 
    t;
}

function formatNumber(e) {
    const t = Number(e);
    return Number.isFinite(t) ? NUMBER_FORMATTER.format(t) : String(e ?? "");
}

function formatAttributeValue(e, t) {
    const n = Number(t);
    if (!Number.isFinite(n)) return String(t ?? "");
    const i = Number(e?.percentage_show || 0), o = Number(e?.reserve_number || 0), r = (e, t) => {
        const n = e * t;
        return 0 === o || 0 === Math.floor(e) ? `${formatNumber(Math.trunc(n))}%` : `${formatNumber(Number.isInteger(n) ? n : Number(n.toFixed(1)))}%`;
    };
    if (0 === i) return formatNumber(n);
    if (1 === i) return r(n, .01);
    if (3 === i) return r(n, .25);
    if (4 === i) {
        const e = .1 * Math.abs(n);
        return formatNumber(n < 0 ? -Math.trunc(e) : Math.trunc(e));
    }
    if (5 === i) return formatNumber(Math.floor(.01 * n) / 100);
    const a = .01 * Math.abs(n);
    return formatNumber(n < 0 ? -Math.trunc(a) : Math.trunc(a));
}

function statLineHtml(e) {
    if (!e) return "";
    const n = state.data?.attributes || {}, i = [];
    return (Array.isArray(e.equipStats) ? e.equipStats : []).forEach(([e, t]) => {
        const o = n[String(e)];
        if (!o) return;
        const r = Number(t) >= 0 ? "+" : "";
        i.push(`<div class="tooltip-stat">${escapeHtml(o.name || `#${e}`)} ${escapeHtml(r + formatAttributeValue(o, t))}</div>`);
    }), i.length ? `<div class="tooltip-section"><div class="tooltip-section-title">${escapeHtml(t("tooltipStats"))}</div>${i.join("")}</div>` : "";
}

function boxPreviewModeLabel(e) {
    return t("choose" === e ? "boxPreviewChoose" : "all" === e ? "boxPreviewAll" : "possible" === e ? "boxPreviewPossible" : "boxPreviewPreview");
}

function renderBoxPreviewSection(e, n = "detail") {
    const i = e?.boxPreview, o = Array.isArray(i?.contents) ? i.contents : [], r = "tooltip" === n ? o.slice(0, 30) : o;
    if (!r.length) return "";
    const a = "tooltip" === n && o.length > r.length, s = Math.max(0, o.length - r.length), l = "tooltip" === n ? "tooltip-box-wrap" : "shop-detail-box-wrap", c = "tooltip" === n ? "tooltip-box-item" : "shop-detail-box-item", d = "tooltip" === n ? "tooltip-box-grid" : "shop-detail-box-grid", u = "tooltip" === n ? "tooltip-box-meta" : "shop-detail-box-meta";
    return `\n        <div class="${"tooltip" === n ? "tooltip-section" : "shop-detail-section"}">\n            <div class="${"tooltip" === n ? "tooltip-section-title" : "shop-detail-section-title"}">${escapeHtml(t("boxPreviewTitle"))}</div>\n            <div class="${u}">${escapeHtml(boxPreviewModeLabel(i.mode))}</div>\n            <div class="${l}${a ? " is-truncated" : ""}">\n                <div class="${d}">\n                    ${r.map(e => `\n                    <div class="${c}" title="${escapeHtml(e.name || `Item ${e.itemId}`)}">\n                        <div class="${c}-icon-wrap quality-${escapeHtml(e.quality || 0)}">\n                            ${e.iconPath ? `<img class="${c}-icon" src="${escapeHtml(e.iconPath)}" alt="">` : ""}\n                            ${Number(e.count) > 0 ? `<span class="${c}-count">x${escapeHtml(formatNumber(e.count))}</span>` : ""}\n                        </div>\n                    </div>\n                `).join("")}\n                </div>\n                ${a ? `<div class="tooltip-box-more">${escapeHtml(t("boxPreviewMore", {
        count: s
    }))}</div>` : ""}\n            </div>\n        </div>\n    `;
}

function groupLabel(e) {
    return null == e ? t("noLevelRequirement") : t("levelRequirement", {
        level: e
    });
}

function effectiveAmount(e, t) {
    const n = Number(e?.amount || 0), i = Number(t?.discount || 0);
    return Number.isFinite(n) ? i > 0 && i < 1e4 ? Math.max(1, Math.ceil(n * i / 1e4)) : n : 0;
}

function primaryOption(e) {
    const t = Array.isArray(e.purchaseOptions) ? e.purchaseOptions : [];
    return t.find(e => "direct" === e.mode) || t[0] || null;
}

function purchaseLimitLabel(e) {
    const n = Number(e?.limitNum || 0);
    return !Number.isFinite(n) || n <= 0 ? "" : t({
        1001: "dailyLimit",
        1002: "weeklyLimit",
        1009: "monthlyLimit"
    }[Number(e.timeRefresh)] || "oneTimeLimit", {
        count: formatNumber(n)
    });
}

function cardPurchaseLimitLabel(e) {
    return purchaseLimitLabel(e);
}

function unlockLabels(e) {
    const t = [ ...Array.isArray(e?.unlockDescriptions) ? e.unlockDescriptions : [], ...Array.isArray(e?.showUnlockDescriptions) ? e.showUnlockDescriptions : [], ...Array.isArray(e?.tabUnlockDescriptions) ? e.tabUnlockDescriptions : [] ], n = new Set;
    return t.filter(e => {
        const t = String(e || "").trim();
        return !(!t || n.has(t) || (n.add(t), 0));
    });
}

function stripLevelMarkers(e) {
    let t, n = String(e || "").trim();
    do {
        t = n, n = n.replace(/^Lv\.?\s*\d+\s*/i, "").replace(/^Lvl\.?\s*\d+\s*/i, "").replace(/^Level\s*\d+\s*/i, "").replace(/^\d+\s*(?:級|级)\s*/, "").replace(/\s*Lv\.?\s*\d+\s*$/i, "").replace(/\s*Lvl\.?\s*\d+\s*$/i, "").replace(/\s*Level\s*\d+\s*$/i, "").replace(/\s*\d+\s*(?:級|级)\s*$/, "").trim();
    } while (n !== t);
    return n;
}

const stripLevelPrefix = stripLevelMarkers;

function currencyGroupKey(e) {
    const t = String(e?.iconName || "").trim();
    if (t) {
        const e = t.replace(/_\d+$/, "");
        if (e) return `icon:${e}`;
    }
    return stripLevelPrefix(e?.name) || String(e?.name || "").trim() || `id:${e?.id ?? ""}`;
}

function localeScriptScore(e) {
    return "th-TH" === ACTIVE_LOCALE ? (e.match(/[฀-๿]/g) || []).length : ACTIVE_LOCALE.startsWith("zh-") ? (e.match(/[㐀-鿿]/g) || []).length : 0;
}

function currencyChipLabel(e) {
    const t = e.map(e => stripLevelPrefix(e.name)).filter(Boolean);
    if (!t.length) return "";
    const n = new Map;
    for (const e of t) n.set(e, (n.get(e) || 0) + 1);
    const i = Array.from(n.entries()).map(([e, t]) => ({
        label: e,
        count: t,
        nativeScore: localeScriptScore(e),
        length: e.length
    }));
    return i.sort((e, t) => e.count !== t.count ? t.count - e.count : e.nativeScore !== t.nativeScore ? t.nativeScore - e.nativeScore : e.length - t.length), 
    i[0].label;
}

function currentFilteredItems() {
    const e = state.searchQuery.trim().toLowerCase(), t = state.selectedCurrencyIds, n = state.items.filter(n => !(t.size && !(n.currencyIds || []).map(e => String(e)).some(e => t.has(e))) && !(e && !String(n.searchText || "").includes(e)));
    if (!t.size) return n;
    const i = new Map;
    for (const e of n) {
        const t = `${e.name}${e.price?.amount ?? ""}${state.selectedCurrencyKey}`;
        i.has(t) || i.set(t, e);
    }
    return Array.from(i.values());
}

function renderCount(e) {
    document.getElementById("shop-count").textContent = t("count", {
        count: e.length
    });
}

function isMobileShopView() {
    return Boolean(window.matchMedia && window.matchMedia(MOBILE_SHOP_MEDIA).matches);
}

function renderCurrencyFilters() {
    const e = document.getElementById("currency-groups");
    e.innerHTML = "";
    const n = new Map((state.data.currencyGroups || []).map((e, t) => [ e.id, t ])), i = new Map;
    state.data.currencies.forEach(e => {
        const t = Number(e.showGroupId || 0);
        i.has(t) || i.set(t, []), i.get(t).push(e);
    }), Array.from(i.entries()).sort(([e], [t]) => (n.get(e) ?? e) - (n.get(t) ?? t)).forEach(([n, i]) => {
        i.sort((e, t) => (e.sortOrder || 0) !== (t.sortOrder || 0) ? (e.sortOrder || 0) - (t.sortOrder || 0) : e.id - t.id);
        const o = new Map;
        i.forEach(e => {
            const t = currencyGroupKey(e);
            o.has(t) || o.set(t, []), o.get(t).push(e);
        });
        const r = new Map;
        for (const [e, n] of o) {
            const i = currencyChipLabel(n) || n[0].name || t("unknownCurrency"), o = n.find(e => e.iconPath) || n[0];
            r.set(e, {
                key: e,
                name: i,
                iconPath: o.iconPath || "",
                ids: n.map(e => String(e.id))
            });
        }
        const a = (state.data.currencyGroups || []).find(e => e.id === n), s = document.createElement("section");
        s.className = "currency-group", s.innerHTML = `\n                <div class="currency-group-title">${escapeHtml(a?.name || t("currencies"))}</div>\n                <div class="currency-chip-row">\n                    ${Array.from(r.values()).map(e => `\n                        <button type="button"\n                                class="currency-chip ${state.selectedCurrencyKey === e.key ? "active" : ""}"\n                                data-currency-key="${escapeHtml(e.key)}"\n                                data-currency-ids="${escapeHtml(e.ids.join(","))}"\n                                title="${escapeHtml(e.name)}">\n                            ${e.iconPath ? `<img src="${escapeHtml(e.iconPath)}" alt="">` : ""}\n                            <span>${escapeHtml(e.name)}</span>\n                        </button>\n                    `).join("")}\n                </div>\n            `, 
        e.appendChild(s);
    });
}

function pricePill(e) {
    const t = primaryOption(e);
    return t ? `\n        <div class="shop-price-pill">\n            ${t.iconPath ? `<img src="${escapeHtml(t.iconPath)}" alt="">` : ""}\n            <strong>${escapeHtml(formatNumber(effectiveAmount(t, e)))}</strong>\n        </div>\n    ` : "";
}

function buildItemCard(e) {
    const n = 0 === Number(e.isShow), i = cardPurchaseLimitLabel(e), o = unlockLabels(e);
    return `\n        <article class="shop-card ${String(e.id) === String(state.activeItemId) ? "active" : ""} ${n ? "is-hidden-config" : ""}"\n                 tabindex="0" data-item-id="${escapeHtml(e.id)}">\n            <div class="shop-card-art">\n                ${e.iconPath ? `<img class="shop-card-icon" src="${escapeHtml(e.iconPath)}" alt="">` : ""}\n            </div>\n            <div class="shop-card-copy">\n                <div class="shop-card-name">${escapeHtml(e.name || `Item ${e.itemId}`)}</div>\n                <div class="shop-card-sub">${escapeHtml(e.itemNum > 1 ? `${t("quantity")} x${formatNumber(e.itemNum)}` : e.tabName || e.storeName || "")}</div>\n                ${pricePill(e)}\n                ${i ? `<div class="shop-card-limit">${escapeHtml(i)}</div>` : ""}\n                ${o.length ? `<div class="shop-card-unlock">${o.map(e => escapeHtml(e)).join(" · ")}</div>` : ""}\n            </div>\n        </article>\n    `;
}

function buildDetailHtml(e) {
    if (!e) return `<div class="shop-detail-empty">${escapeHtml(t("noSelection"))}</div>`;
    const n = Array.isArray(e.purchaseOptions) ? e.purchaseOptions : [], i = [ e.storeName ? `${t("tooltipStore")}: ${e.storeName}` : "", e.tabName ? `${t("tooltipTab")}: ${e.tabName}` : "", null != e.requiredLevel ? `${t("tooltipLevel")}: ${groupLabel(e.requiredLevel)}` : "", purchaseLimitLabel(e) || "", e.binding ? `${t("tooltipBound")}: ${t("yes")}` : "", ...unlockLabels(e) ].filter(Boolean);
    return `\n        <div class="shop-detail-card">\n            <div class="shop-detail-rarity quality-${escapeHtml(e.quality || 0)}"></div>\n            <div class="shop-detail-head">\n                ${e.iconPath ? `<img class="shop-detail-icon" src="${escapeHtml(e.iconPath)}" alt="">` : ""}\n                <div>\n                    <div class="shop-detail-kicker">${escapeHtml(t("detailTitle"))}</div>\n                    <h2>${escapeHtml(e.name || `Item ${e.itemId}`)}</h2>\n                </div>\n            </div>\n            ${e.desc ? `<div class="shop-detail-desc">${renderMarkup(e.desc)}</div>` : ""}\n            ${e.story ? `<div class="shop-detail-story">${renderMarkup(e.story)}</div>` : ""}\n            ${statLineHtml(e)}\n            ${renderBoxPreviewSection(e, "detail")}\n            <div class="shop-detail-section">\n                <div class="shop-detail-section-title">${escapeHtml(t("tooltipPurchase"))}</div>\n                <div class="shop-detail-prices">\n                    ${n.map(n => `\n                        <div class="shop-detail-price">\n                            ${n.iconPath ? `<img src="${escapeHtml(n.iconPath)}" alt="">` : ""}\n                            <span>${escapeHtml(n.currencyName || t("unknownCurrency"))}</span>\n                            <strong>${escapeHtml(formatNumber(effectiveAmount(n, e)))}</strong>\n                        </div>\n                    `).join("")}\n                </div>\n            </div>\n            ${i.length ? `\n                <div class="shop-detail-section">\n                    <div class="shop-detail-section-title">${escapeHtml(t("tooltipAvailability"))}</div>\n                    ${i.map(e => `<div class="shop-detail-line">${escapeHtml(e)}</div>`).join("")}\n                </div>\n            ` : ""}\n        </div>\n    `;
}

function renderDetail(e) {
    const t = document.getElementById("shop-detail");
    t && (t.innerHTML = buildDetailHtml(e));
}

function renderDetailModal(e) {
    const n = document.getElementById("shop-detail-modal-content"), i = document.getElementById("shop-detail-modal-title");
    n && i && (n.innerHTML = buildDetailHtml(e), i.textContent = e?.name || t("detailTitle"));
}

let lastShopModalTriggerEl = null;

function openShopDetailModal(e = state.activeItemId, t = null) {
    const n = document.getElementById("shop-detail-modal"), i = state.items.find(t => String(t.id) === String(e));
    if (!n || !i) return;
    hideTooltip(), t instanceof HTMLElement ? lastShopModalTriggerEl = t : document.activeElement instanceof HTMLElement && !n.contains(document.activeElement) && (lastShopModalTriggerEl = document.activeElement), 
    renderDetailModal(i), n.classList.add("open"), n.setAttribute("aria-hidden", "false"), 
    n.inert = !1;
    const o = n.querySelector("[data-shop-modal-close]");
    o instanceof HTMLElement && requestAnimationFrame(() => o.focus({
        preventScroll: !0
    }));
}

function closeShopDetailModal() {
    const e = document.getElementById("shop-detail-modal");
    if (!e) return;
    const t = document.activeElement;
    t instanceof HTMLElement && e.contains(t) && t.blur(), e.classList.remove("open"), 
    e.setAttribute("aria-hidden", "true"), e.inert = !0;
    const n = lastShopModalTriggerEl instanceof HTMLElement && lastShopModalTriggerEl.isConnected ? lastShopModalTriggerEl : null;
    n && requestAnimationFrame(() => n.focus({
        preventScroll: !0
    }));
}

function buildRenderTokens(e) {
    const t = new Map;
    e.forEach(e => {
        const n = null == e.requiredLevel ? "none" : String(e.requiredLevel);
        t.has(n) || t.set(n, []), t.get(n).push(e);
    });
    const n = Array.from(t.keys()).sort((e, t) => "none" === e ? -1 : "none" === t ? 1 : Number(e) - Number(t)), i = [];
    for (const e of n) {
        const n = t.get(e) || [], o = "none" === e ? null : Number(e);
        i.push({
            kind: "header",
            level: o,
            count: n.length
        });
        for (const e of n) i.push({
            kind: "item",
            item: e
        });
    }
    return i;
}

function renderNextBatch() {
    const e = document.getElementById("shop-list");
    if (!e || state.renderedTokens >= state.renderTokens.length) return;
    const n = Math.min(state.renderedTokens + 60, state.renderTokens.length), i = e.querySelector(".shop-sentinel");
    let o = e.querySelector(".shop-level-section:last-of-type .shop-card-grid");
    for (let r = state.renderedTokens; r < n; r += 1) {
        const n = state.renderTokens[r];
        if ("header" === n.kind) {
            const r = document.createElement("section");
            r.className = "shop-level-section", r.innerHTML = `\n                <div class="shop-level-header">\n                    <div class="shop-level-title">${escapeHtml(groupLabel(n.level))}</div>\n                    <div class="shop-level-meta">${escapeHtml(t("sectionCount", {
                count: n.count
            }))}</div>\n                </div>\n                <div class="shop-card-grid"></div>\n            `, 
            i ? e.insertBefore(r, i) : e.appendChild(r), o = r.querySelector(".shop-card-grid");
        } else {
            if (!o) continue;
            o.insertAdjacentHTML("beforeend", buildItemCard(n.item));
        }
    }
    state.renderedTokens = n, state.renderedTokens >= state.renderTokens.length && i && i.remove(), 
    queueFillViewport();
}

function queueFillViewport() {
    state.renderedTokens >= state.renderTokens.length || window.requestAnimationFrame(() => {
        const e = document.querySelector(".shop-sentinel");
        e && e.getBoundingClientRect().top <= window.innerHeight + 800 && renderNextBatch();
    });
}

let listObserver = null;

function ensureListObserver() {
    return listObserver || (listObserver = new IntersectionObserver(e => {
        e.some(e => e.isIntersecting) && renderNextBatch();
    }, {
        rootMargin: "800px"
    }), listObserver);
}

function renderList() {
    const e = document.getElementById("shop-list"), n = currentFilteredItems();
    if (renderCount(n), n.some(e => String(e.id) === String(state.activeItemId)) || (state.activeItemId = n[0] ? String(n[0].id) : ""), 
    0 === n.length) return e.innerHTML = `<div class="shop-empty">${escapeHtml(t("noResults"))}</div>`, 
    state.renderTokens = [], state.renderedTokens = 0, void renderDetail(null);
    state.renderTokens = buildRenderTokens(n), state.renderedTokens = 0, e.innerHTML = '<div class="shop-sentinel" aria-hidden="true"></div>';
    const i = e.querySelector(".shop-sentinel");
    i && ensureListObserver().observe(i), renderNextBatch(), renderDetail(state.items.find(e => String(e.id) === String(state.activeItemId)));
}

function buildTooltipHtml(e) {
    const n = Array.isArray(e.purchaseOptions) ? e.purchaseOptions : [];
    return `\n        <div class="tooltip-header">\n            ${e.iconPath ? `<img class="tooltip-icon" src="${escapeHtml(e.iconPath)}" alt="">` : ""}\n            <div>\n                <div class="tooltip-title">${escapeHtml(e.name || `Item ${e.itemId}`)}</div>\n                ${e.desc ? `<div class="tooltip-meta">${renderMarkup(e.desc)}</div>` : ""}\n                ${e.story ? `<div class="tooltip-meta">${renderMarkup(e.story)}</div>` : ""}\n            </div>\n        </div>\n        ${statLineHtml(e)}\n        ${renderBoxPreviewSection(e, "tooltip")}\n        <div class="tooltip-section">\n            <div class="tooltip-section-title">${escapeHtml(t("tooltipPurchase"))}</div>\n            ${n.map(n => `\n                <div class="tooltip-price-item">\n                    ${n.iconPath ? `<img src="${escapeHtml(n.iconPath)}" alt="">` : ""}\n                    <span>${escapeHtml(n.currencyName || t("unknownCurrency"))}</span>\n                    <strong>${escapeHtml(formatNumber(effectiveAmount(n, e)))}</strong>\n                </div>\n            `).join("")}\n        </div>\n    `;
}

function positionTooltip(e, t) {
    const n = document.getElementById("shop-tooltip");
    if (!n || !n.classList.contains("visible")) return;
    const i = n.offsetWidth || 0, o = n.offsetHeight || 0;
    let r = e + 18, a = t + 18;
    r + i > window.innerWidth - 16 && (r = Math.max(16, e - i - 18)), a + o > window.innerHeight - 16 && (a = Math.max(16, t - o - 18)), 
    n.style.left = `${r}px`, n.style.top = `${a}px`;
}

function showTooltip(e, t, n, i) {
    if (isMobileShopView()) return;
    const o = document.getElementById("shop-tooltip"), r = state.items.find(t => String(t.id) === String(e));
    if (!o || !r) return;
    o.innerHTML = buildTooltipHtml(r), o.classList.remove("hidden"), o.classList.add("visible");
    const a = i?.getBoundingClientRect?.();
    positionTooltip(Number.isFinite(t) ? t : a ? a.right : 0, Number.isFinite(n) ? n : a ? a.top + a.height / 2 : 0);
}

function hideTooltip() {
    const e = document.getElementById("shop-tooltip");
    e && (e.classList.remove("visible"), e.classList.add("hidden"));
}

function setActiveItem(e) {
    state.activeItemId = String(e || "");
    const t = state.items.find(e => String(e.id) === state.activeItemId);
    renderDetail(t);
    const n = document.getElementById("shop-detail-modal");
    n && n.classList.contains("open") && renderDetailModal(t), document.querySelectorAll(".shop-card").forEach(e => {
        e.classList.toggle("active", String(e.dataset.itemId) === state.activeItemId);
    });
}

function bindEvents() {
    document.getElementById("shop-search").addEventListener("input", e => {
        state.searchQuery = String(e.target.value || ""), renderList();
    }), document.getElementById("currency-groups").addEventListener("click", e => {
        const t = e.target.closest(".currency-chip");
        if (!t) return;
        const n = String(t.dataset.currencyKey || ""), i = String(t.dataset.currencyIds || "").split(",").filter(Boolean);
        state.selectedCurrencyKey === n ? (state.selectedCurrencyKey = "", state.selectedCurrencyIds = new Set) : (state.selectedCurrencyKey = n, 
        state.selectedCurrencyIds = new Set(i)), renderCurrencyFilters(), renderList(), 
        writeFilterHash();
    }), window.addEventListener("hashchange", () => {
        suppressHashWrite = !0;
        try {
            applyHashToState(), renderCurrencyFilters(), renderList();
        } finally {
            suppressHashWrite = !1;
        }
    });
    const e = document.getElementById("shop-list");
    e.addEventListener("click", e => {
        const t = e.target.closest(".shop-card");
        t && (setActiveItem(t.dataset.itemId), isMobileShopView() && openShopDetailModal(t.dataset.itemId, t));
    }), e.addEventListener("mousemove", e => {
        state.lastPointer = {
            x: e.clientX,
            y: e.clientY
        }, document.getElementById("shop-tooltip").classList.contains("visible") && positionTooltip(e.clientX, e.clientY);
    }), e.addEventListener("mouseover", t => {
        if (isMobileShopView()) return;
        const n = t.target.closest(".shop-card");
        n && e.contains(n) && showTooltip(n.dataset.itemId, t.clientX, t.clientY, n);
    }), e.addEventListener("mouseout", e => {
        const t = e.target.closest(".shop-card"), n = e.relatedTarget?.closest?.(".shop-card");
        t && t !== n && hideTooltip();
    }), e.addEventListener("focusin", t => {
        if (isMobileShopView()) return;
        const n = t.target.closest(".shop-card");
        n && e.contains(n) && showTooltip(n.dataset.itemId, state.lastPointer.x, state.lastPointer.y, n);
    }), e.addEventListener("focusout", hideTooltip), window.addEventListener("scroll", hideTooltip, {
        passive: !0
    }), window.addEventListener("scroll", queueFillViewport, {
        passive: !0
    }), window.addEventListener("resize", hideTooltip), window.addEventListener("resize", queueFillViewport, {
        passive: !0
    });
    const t = document.getElementById("shop-detail-modal");
    t && t.addEventListener("click", e => {
        const t = e.target;
        t instanceof HTMLElement && t.hasAttribute("data-shop-modal-close") && closeShopDetailModal();
    }), document.addEventListener("keydown", e => {
        "Escape" === e.key && closeShopDetailModal();
    });
}

function applyPageText() {
    window.RO_SET_PAGE_TITLE ? window.RO_SET_PAGE_TITLE(TXT.title) : document.title = TXT.pageTitle;
    const e = document.querySelector('meta[name="description"]');
    e && e.setAttribute("content", TXT.pageDesc), document.getElementById("shop-page-title").textContent = TXT.title, 
    document.getElementById("shop-search").placeholder = TXT.searchPlaceholder, document.getElementById("shop-count").textContent = TXT.loading, 
    document.getElementById("currency-board-title").textContent = TXT.currencies;
}

async function loadData() {
    const e = await fetch(withAssetVersion(`/sea/shop/data/shop_${ACTIVE_LOCALE}.json`));
    if (!e.ok) throw new Error(`HTTP ${e.status}`);
    return e.json();
}

async function init() {
    applyPageText(), bindEvents();
    try {
        state.data = await loadData(), state.items = Array.isArray(state.data.items) ? state.data.items : [], 
        suppressHashWrite = !0;
        try {
            applyHashToState();
        } finally {
            suppressHashWrite = !1;
        }
        renderCurrencyFilters(), renderList();
    } catch (e) {
        document.getElementById("shop-list").innerHTML = `\n            <div class="shop-empty">${escapeHtml(`${t("loadFailed")}: ${e.message || e}`)}</div>\n        `, 
        document.getElementById("shop-count").textContent = t("loadFailed"), renderDetail(null);
    }
}

init();

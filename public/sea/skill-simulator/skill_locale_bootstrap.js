(() => {
  "use strict";

  const SKILL_PATHS = new Set([
    "/sea/skill_planner/",
    "/sea/skill-simulator/",
  ]);
  const normalizedPath = window.location.pathname.replace(/\/index\.html$/, "/");
  if (!SKILL_PATHS.has(normalizedPath)) return;

  const SUPPORTED_LOCALES = ["en-US", "zh-CN", "th-TH", "id-ID"];
  const DEFAULT_LOCALE = "en-US";
  const STORAGE_KEY = "ro_lang";
  const DATA_VERSION = "2026-08-04";
  const BUNDLE_ROOT = "/sea/skill-simulator/data/bundles";
  const originalFetch = window.fetch.bind(window);

  const LOCALE_LABELS = {
    "en-US": "English",
    "zh-CN": "简体中文",
    "th-TH": "ไทย",
    "id-ID": "Bahasa Indonesia",
  };

  const TEXT = {
    "en-US": {
      language: "Language",
      dataBadge: "SEA skill data · Aug 4, 2026",
      title: "Skill Planner",
      share: "Share Build",
      shareAria: "Copy share link",
      selectJob: "Select a Target Job...",
      uniqueSkills: "Unique Skills",
      skillDetails: "Skill Details",
      selectSkill: "Select a skill to see details.",
      close: "Close",
      loading: "Loading skills...",
      points: "Points",
      basicSkills: "Basic Skills",
      traits: "Traits",
      reset: "Reset",
      prerequisites: "Prerequisites",
      currentLevel: "Current Level",
      maxLevel: "Max Level",
      level: "Level",
      cooldown: "Cooldown",
      globalCooldown: "Global Cooldown",
      spCost: "SP Cost",
      range: "Range",
      castTime: "Cast Time",
      fixedCast: "Fixed Cast Time",
      variableCast: "Variable Cast Time",
      pveDamage: "PvE Damage",
      pvpDamage: "PvP Damage",
      type: "Type",
      element: "Element",
      target: "Target",
      createHeading: "Create Ragnarok: The New World class builds",
      createText: "Choose a target job, assign points on the skill tree, and open any skill to review its effects and prerequisites. Unique skills remain visible for the selected class, while the share button creates a link to your current setup.",
      related: "Related class build tools",
      dataError: "Updated locale data could not be loaded. Showing the existing English dataset.",
    },
    "zh-CN": {
      language: "语言",
      dataBadge: "SEA 技能数据 · 2026年8月4日",
      title: "技能规划器",
      share: "分享配置",
      shareAria: "复制分享链接",
      selectJob: "选择目标职业...",
      uniqueSkills: "独特技能",
      skillDetails: "技能详情",
      selectSkill: "选择技能以查看详情。",
      close: "关闭",
      loading: "正在加载技能...",
      points: "点数",
      basicSkills: "基础技能",
      traits: "特性",
      reset: "重置",
      prerequisites: "前置条件",
      currentLevel: "当前等级",
      maxLevel: "最高等级",
      level: "等级",
      cooldown: "冷却时间",
      globalCooldown: "公共冷却",
      spCost: "SP消耗",
      range: "范围",
      castTime: "施法时间",
      fixedCast: "固定吟唱",
      variableCast: "可变吟唱",
      pveDamage: "PvE伤害",
      pvpDamage: "PvP伤害",
      type: "类型",
      element: "属性",
      target: "目标",
      createHeading: "创建《RO仙境传说：世界之旅》职业配置",
      createText: "选择目标职业，在技能树中分配点数，并打开任意技能查看效果与前置条件。分享按钮会生成包含当前配置的链接。",
      related: "相关职业配置工具",
      dataError: "无法加载更新后的语言数据，已显示现有英文数据。",
    },
    "th-TH": {
      language: "ภาษา",
      dataBadge: "ข้อมูลสกิล SEA · 4 ส.ค. 2026",
      title: "วางแผนสกิล",
      share: "แชร์บิลด์",
      shareAria: "คัดลอกลิงก์บิลด์",
      selectJob: "เลือกอาชีพเป้าหมาย...",
      uniqueSkills: "สกิลเฉพาะ",
      skillDetails: "รายละเอียดสกิล",
      selectSkill: "เลือกสกิลเพื่อดูรายละเอียด",
      close: "ปิด",
      loading: "กำลังโหลดสกิล...",
      points: "แต้ม",
      basicSkills: "สกิลพื้นฐาน",
      traits: "คุณลักษณะ",
      reset: "รีเซ็ต",
      prerequisites: "เงื่อนไขก่อนหน้า",
      currentLevel: "เลเวลปัจจุบัน",
      maxLevel: "เลเวลสูงสุด",
      level: "เลเวล",
      cooldown: "คูลดาวน์",
      globalCooldown: "คูลดาวน์รวม",
      spCost: "ใช้ SP",
      range: "ระยะ",
      castTime: "เวลาร่าย",
      fixedCast: "เวลาร่ายคงที่",
      variableCast: "เวลาร่ายแปรผัน",
      pveDamage: "ดาเมจ PvE",
      pvpDamage: "ดาเมจ PvP",
      type: "ประเภท",
      element: "ธาตุ",
      target: "เป้าหมาย",
      createHeading: "สร้างบิลด์อาชีพ Ragnarok: The New World",
      createText: "เลือกอาชีพ จัดสรรแต้มในผังสกิล และเปิดสกิลเพื่อดูเอฟเฟกต์กับเงื่อนไข แชร์ลิงก์เพื่อเก็บบิลด์ปัจจุบันของคุณ",
      related: "เครื่องมือบิลด์ที่เกี่ยวข้อง",
      dataError: "โหลดข้อมูลภาษาที่อัปเดตไม่ได้ กำลังแสดงข้อมูลภาษาอังกฤษเดิม",
    },
    "id-ID": {
      language: "Bahasa",
      dataBadge: "Data skill SEA · 4 Agu 2026",
      title: "Skill Planner",
      share: "Bagikan Build",
      shareAria: "Salin tautan build",
      selectJob: "Pilih Job Tujuan...",
      uniqueSkills: "Skill Unik",
      skillDetails: "Detail Skill",
      selectSkill: "Pilih skill untuk melihat detail.",
      close: "Tutup",
      loading: "Memuat skill...",
      points: "Poin",
      basicSkills: "Skill Dasar",
      traits: "Trait",
      reset: "Reset",
      prerequisites: "Prasyarat",
      currentLevel: "Level Saat Ini",
      maxLevel: "Level Maksimum",
      level: "Level",
      cooldown: "Cooldown",
      globalCooldown: "Global Cooldown",
      spCost: "Biaya SP",
      range: "Jarak",
      castTime: "Waktu Cast",
      fixedCast: "Fixed Cast Time",
      variableCast: "Variable Cast Time",
      pveDamage: "Damage PvE",
      pvpDamage: "Damage PvP",
      type: "Tipe",
      element: "Elemen",
      target: "Target",
      createHeading: "Buat build class Ragnarok: The New World",
      createText: "Pilih job tujuan, alokasikan poin pada pohon skill, lalu buka skill untuk meninjau efek dan prasyaratnya. Tombol bagikan membuat tautan untuk setup saat ini.",
      related: "Tool build terkait",
      dataError: "Data bahasa terbaru tidak dapat dimuat. Menampilkan dataset bahasa Inggris yang ada.",
    },
  };

  function canonicalizeLocale(value) {
    const normalized = String(value || "").trim().toLowerCase();
    if (!normalized) return null;
    const exact = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === normalized);
    if (exact) return exact;
    if (normalized.startsWith("zh")) return "zh-CN";
    if (normalized.startsWith("th")) return "th-TH";
    if (normalized.startsWith("id") || normalized.startsWith("in")) return "id-ID";
    if (normalized.startsWith("en")) return "en-US";
    return null;
  }

  function detectLocale() {
    const params = new URLSearchParams(window.location.search);
    const candidates = [
      params.get("lang"),
      localStorage.getItem(STORAGE_KEY),
      navigator.language,
      ...(Array.isArray(navigator.languages) ? navigator.languages : []),
    ];
    for (const candidate of candidates) {
      const locale = canonicalizeLocale(candidate);
      if (locale) return locale;
    }
    return DEFAULT_LOCALE;
  }

  const activeLocale = detectLocale();
  const ui = TEXT[activeLocale] || TEXT[DEFAULT_LOCALE];
  window.RO_ACTIVE_LOCALE = activeLocale;
  window.RTNW_SKILL_DATA_VERSION = DATA_VERSION;
  document.documentElement.setAttribute("lang", activeLocale);

  let bundlePromise = null;
  let bundleFailed = false;

  function decodeBase64(value) {
    const clean = String(value || "").replace(/\s+/g, "");
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return bytes;
  }

  async function decompressGzip(bytes) {
    if (typeof DecompressionStream !== "function") {
      throw new Error("This browser does not support gzip decompression streams.");
    }
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Response(stream).text();
  }

  async function loadLocaleBundle() {
    if (bundlePromise) return bundlePromise;
    bundlePromise = (async () => {
      const url = `${BUNDLE_ROOT}/skills_${activeLocale}.json.gz.b64?v=${DATA_VERSION}`;
      const response = await originalFetch(url, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Skill locale bundle returned ${response.status}.`);
      const bytes = decodeBase64(await response.text());
      const payload = JSON.parse(await decompressGzip(bytes));
      if (payload?.locale !== activeLocale || !payload?.index || !payload?.jobs) {
        throw new Error("Skill locale bundle failed validation.");
      }
      return payload;
    })().catch((error) => {
      bundleFailed = true;
      console.error("RTNW locale bundle failed:", error);
      showDataWarning();
      throw error;
    });
    return bundlePromise;
  }

  function requestUrl(input) {
    try {
      return new URL(typeof input === "string" ? input : input?.url || String(input), window.location.href);
    } catch {
      return null;
    }
  }

  window.fetch = async function rtnwLocalizedFetch(input, init) {
    const url = requestUrl(input);
    if (!url || url.origin !== window.location.origin) return originalFetch(input, init);

    const indexMatch = url.pathname.match(/\/sea\/skill-simulator\/data\/skills_index_en-US\.json$/);
    const jobMatch = url.pathname.match(/\/sea\/skill-simulator\/data\/jobs_en-US\/(\d+)\.json$/);
    if (!indexMatch && !jobMatch) return originalFetch(input, init);

    try {
      const bundle = await loadLocaleBundle();
      const value = indexMatch ? bundle.index : bundle.jobs[jobMatch[1]];
      if (!value) return new Response("Not found", { status: 404 });
      return new Response(JSON.stringify(value), {
        status: 200,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "public, max-age=3600",
          "x-rtnw-skill-locale": activeLocale,
          "x-rtnw-skill-data-version": DATA_VERSION,
        },
      });
    } catch {
      return originalFetch(input, init);
    }
  };

  function installStyles() {
    if (document.getElementById("rtnw-skill-locale-styles")) return;
    const style = document.createElement("style");
    style.id = "rtnw-skill-locale-styles";
    style.textContent = `
      .skill-locale-bar{display:flex;align-items:center;justify-content:flex-end;gap:12px;max-width:1480px;margin:10px auto 0;padding:0 24px;box-sizing:border-box;color:#dfe8ef}
      .skill-locale-picker{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700}
      .skill-locale-picker select{min-height:40px;padding:7px 34px 7px 12px;border:1px solid rgba(157,191,218,.35);border-radius:12px;background:#17212a;color:#fff;font:inherit;color-scheme:dark}
      .skill-data-version{font-size:12px;color:#9fb0bf;white-space:nowrap}
      .skill-data-warning{max-width:980px;margin:10px auto;padding:10px 14px;border:1px solid #d69a43;border-radius:10px;background:#3b2b16;color:#ffd99c;font-size:13px}
      @media(max-width:760px){.skill-locale-bar{justify-content:space-between;padding:0 12px;gap:8px}.skill-locale-picker{font-size:12px}.skill-locale-picker select{max-width:165px;min-height:38px}.skill-data-version{font-size:10px;white-space:normal;text-align:right}}
    `;
    document.head.appendChild(style);
  }

  function installLanguagePicker() {
    if (document.getElementById("skill-locale-select")) return;
    installStyles();
    const bar = document.createElement("div");
    bar.className = "skill-locale-bar";
    bar.innerHTML = `
      <label class="skill-locale-picker">
        <span>${ui.language}</span>
        <select id="skill-locale-select" data-native-select="true" aria-label="${ui.language}">
          ${SUPPORTED_LOCALES.map((locale) => `<option value="${locale}"${locale === activeLocale ? " selected" : ""}>${LOCALE_LABELS[locale]}</option>`).join("")}
        </select>
      </label>
      <span class="skill-data-version">${ui.dataBadge}</span>
    `;
    const toolbar = document.querySelector(".skill-planner-mobile-toolbar");
    const main = document.querySelector(".main-content");
    const target = toolbar || main;
    if (target?.parentNode) target.parentNode.insertBefore(bar, target);
    else document.body.prepend(bar);

    bar.querySelector("select")?.addEventListener("change", (event) => {
      const locale = canonicalizeLocale(event.target.value) || DEFAULT_LOCALE;
      localStorage.setItem(STORAGE_KEY, locale);
      const url = new URL(window.location.href);
      url.searchParams.set("lang", locale);
      window.location.assign(`${url.pathname}${url.search}${url.hash}`);
    });
  }

  function showDataWarning() {
    if (!bundleFailed || document.getElementById("skill-data-warning")) return;
    const warning = document.createElement("div");
    warning.id = "skill-data-warning";
    warning.className = "skill-data-warning";
    warning.textContent = ui.dataError;
    const bar = document.querySelector(".skill-locale-bar");
    bar?.insertAdjacentElement("afterend", warning);
  }

  const exactText = new Map([
    ["Skill Planner", ui.title],
    ["Share Build", ui.share],
    ["Unique Skills", ui.uniqueSkills],
    ["Skill Details", ui.skillDetails],
    ["Select a skill to see details.", ui.selectSkill],
    ["Select a Target Job...", ui.selectJob],
    ["Loading skills...", ui.loading],
    ["Basic Skills", ui.basicSkills],
    ["Traits", ui.traits],
    ["Reset", ui.reset],
    ["Prerequisites", ui.prerequisites],
    ["Current Level", ui.currentLevel],
    ["Max Level", ui.maxLevel],
    ["Level", ui.level],
    ["Cooldown", ui.cooldown],
    ["Global Cooldown", ui.globalCooldown],
    ["SP Cost", ui.spCost],
    ["Range", ui.range],
    ["Cast Time", ui.castTime],
    ["Fixed Cast Time", ui.fixedCast],
    ["Variable Cast Time", ui.variableCast],
    ["PvE Damage", ui.pveDamage],
    ["PvP Damage", ui.pvpDamage],
    ["Type", ui.type],
    ["Element", ui.element],
    ["Target", ui.target],
    ["Create Ragnarok: The New World class builds", ui.createHeading],
  ]);

  let translationFrame = 0;
  function scheduleTranslation() {
    if (translationFrame) return;
    translationFrame = requestAnimationFrame(() => {
      translationFrame = 0;
      translateUi();
    });
  }

  function translateUi() {
    if (document.documentElement.lang !== activeLocale) document.documentElement.lang = activeLocale;

    const headerTitle = document.querySelector(".header-title");
    if (headerTitle) headerTitle.textContent = ui.title;

    const share = document.getElementById("share-link-btn");
    if (share) {
      share.title = ui.shareAria;
      share.setAttribute("aria-label", ui.shareAria);
      const label = share.querySelector(".site-nav-label");
      if (label) label.textContent = ui.share;
    }

    const placeholder = document.querySelector('#quick-job-select option[value=""]');
    if (placeholder) placeholder.textContent = ui.selectJob;
    const buttonLabel = document.querySelector(".job-select-button-label");
    if (buttonLabel && /select a target job/i.test(buttonLabel.textContent || "")) buttonLabel.textContent = ui.selectJob;

    const seoHeading = document.getElementById("skill-guide-title");
    if (seoHeading) seoHeading.textContent = ui.createHeading;
    const seoText = document.querySelector(".seo-guide > p");
    if (seoText) seoText.textContent = ui.createText;
    const related = document.querySelector(".seo-related");
    if (related) related.setAttribute("aria-label", ui.related);

    document.querySelectorAll("[data-skill-modal-close]").forEach((node) => node.setAttribute("aria-label", ui.close));

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const parent = node.parentElement;
      if (!parent || parent.closest("script,style,textarea,select")) continue;
      const value = node.nodeValue?.trim();
      if (!value) continue;
      if (exactText.has(value)) {
        node.nodeValue = node.nodeValue.replace(value, exactText.get(value));
      } else if (/^Points\s*:/i.test(value)) {
        node.nodeValue = node.nodeValue.replace(/^Points/i, ui.points);
      }
    }
  }

  installLanguagePicker();
  translateUi();
  new MutationObserver(scheduleTranslation).observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["lang"],
  });
  window.addEventListener("DOMContentLoaded", () => {
    installLanguagePicker();
    scheduleTranslation();
  }, { once: true });
})();

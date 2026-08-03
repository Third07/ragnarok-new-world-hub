(() => {
  "use strict";
  const path = location.pathname.replace(/\/index\.html$/, "/");
  if (path !== "/sea/skill_planner/" && path !== "/sea/skill-simulator/") return;

  const locales = ["en-US", "zh-CN", "th-TH", "id-ID"];
  const fallback = "en-US";
  const labels = {
    "en-US": "English",
    "zh-CN": "简体中文",
    "th-TH": "ไทย",
    "id-ID": "Bahasa Indonesia",
  };
  const copy = {
    "en-US": { language:"Language", badge:"SEA data · synced from RoworldDB", title:"Skill Planner", share:"Share Build", shareAria:"Copy share link", select:"Select a Target Job...", unique:"Unique Skills", details:"Skill Details", empty:"Select a skill to see details.", loading:"Loading skills...", points:"Points", basic:"Basic Skills", traits:"Traits", reset:"Reset", close:"Close", heading:"Create Ragnarok: The New World class builds", text:"Choose a target job, assign points on the skill tree, and open any skill to review its effects and prerequisites. The share button creates a link to your current setup.", warning:"Updated locale data could not be loaded. Showing the English fallback." },
    "zh-CN": { language:"语言", badge:"SEA 数据 · 同步自 RoworldDB", title:"技能规划器", share:"分享配置", shareAria:"复制分享链接", select:"选择目标职业...", unique:"独特技能", details:"技能详情", empty:"选择技能以查看详情。", loading:"正在加载技能...", points:"点数", basic:"基础技能", traits:"特性", reset:"重置", close:"关闭", heading:"创建《RO仙境传说：世界之旅》职业配置", text:"选择目标职业，在技能树中分配点数，并打开技能查看效果与前置条件。分享按钮会生成当前配置的链接。", warning:"无法加载更新后的语言数据，已显示英文备用数据。" },
    "th-TH": { language:"ภาษา", badge:"ข้อมูล SEA · ซิงก์จาก RoworldDB", title:"วางแผนสกิล", share:"แชร์บิลด์", shareAria:"คัดลอกลิงก์บิลด์", select:"เลือกอาชีพเป้าหมาย...", unique:"สกิลเฉพาะ", details:"รายละเอียดสกิล", empty:"เลือกสกิลเพื่อดูรายละเอียด", loading:"กำลังโหลดสกิล...", points:"แต้ม", basic:"สกิลพื้นฐาน", traits:"คุณลักษณะ", reset:"รีเซ็ต", close:"ปิด", heading:"สร้างบิลด์อาชีพ Ragnarok: The New World", text:"เลือกอาชีพ จัดสรรแต้มในผังสกิล และเปิดสกิลเพื่อดูเอฟเฟกต์กับเงื่อนไข แชร์ลิงก์เพื่อเก็บบิลด์ปัจจุบัน", warning:"โหลดข้อมูลภาษาที่อัปเดตไม่ได้ กำลังแสดงข้อมูลภาษาอังกฤษ" },
    "id-ID": { language:"Bahasa", badge:"Data SEA · sinkron dari RoworldDB", title:"Skill Planner", share:"Bagikan Build", shareAria:"Salin tautan build", select:"Pilih Job Tujuan...", unique:"Skill Unik", details:"Detail Skill", empty:"Pilih skill untuk melihat detail.", loading:"Memuat skill...", points:"Poin", basic:"Skill Dasar", traits:"Trait", reset:"Reset", close:"Tutup", heading:"Buat build class Ragnarok: The New World", text:"Pilih job tujuan, alokasikan poin pada pohon skill, lalu buka skill untuk melihat efek dan prasyarat. Tombol bagikan membuat tautan setup saat ini.", warning:"Data bahasa terbaru tidak dapat dimuat. Menampilkan data Inggris." },
  };

  function normalize(value) {
    const v = String(value || "").toLowerCase();
    const exact = locales.find((x) => x.toLowerCase() === v);
    if (exact) return exact;
    if (v.startsWith("zh")) return "zh-CN";
    if (v.startsWith("th")) return "th-TH";
    if (v.startsWith("id") || v.startsWith("in")) return "id-ID";
    if (v.startsWith("en")) return "en-US";
    return null;
  }

  const query = new URLSearchParams(location.search).get("lang");
  const candidates = [query, localStorage.getItem("ro_lang"), navigator.language, ...(navigator.languages || [])];
  const locale = candidates.map(normalize).find(Boolean) || fallback;
  const t = copy[locale];
  window.RO_ACTIVE_LOCALE = locale;
  document.documentElement.lang = locale;

  const nativeFetch = window.fetch.bind(window);
  let failed = false;
  function urlOf(input) {
    try { return new URL(typeof input === "string" ? input : input.url, location.href); } catch { return null; }
  }
  window.fetch = async (input, init) => {
    const url = urlOf(input);
    if (!url || url.origin !== location.origin || locale === fallback) return nativeFetch(input, init);
    let changed = false;
    if (/\/sea\/skill-simulator\/data\/skills_index_en-US\.json$/.test(url.pathname)) {
      url.pathname = url.pathname.replace("skills_index_en-US.json", `skills_index_${locale}.json`);
      changed = true;
    } else if (/\/sea\/skill-simulator\/data\/jobs_en-US\/\d+\.json$/.test(url.pathname)) {
      url.pathname = url.pathname.replace("/jobs_en-US/", `/jobs_${locale}/`);
      changed = true;
    }
    if (!changed) return nativeFetch(input, init);
    try {
      const response = await nativeFetch(url.href, init);
      if (response.ok) return response;
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      failed = true;
      console.error("Localized skill data failed; using English:", error);
      renderWarning();
      return nativeFetch(input, init);
    }
  };

  const style = document.createElement("style");
  style.textContent = ".skill-locale-bar{display:flex;align-items:center;justify-content:flex-end;gap:12px;max-width:1480px;margin:10px auto 0;padding:0 24px;box-sizing:border-box;color:#dfe8ef}.skill-locale-picker{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700}.skill-locale-picker select{min-height:40px;padding:7px 34px 7px 12px;border:1px solid rgba(157,191,218,.35);border-radius:12px;background:#17212a;color:#fff;font:inherit;color-scheme:dark}.skill-data-version{font-size:12px;color:#9fb0bf;text-decoration:none}.skill-data-warning{max-width:980px;margin:10px auto;padding:10px 14px;border:1px solid #d69a43;border-radius:10px;background:#3b2b16;color:#ffd99c;font-size:13px}@media(max-width:760px){.skill-locale-bar{justify-content:space-between;padding:0 12px;gap:8px}.skill-locale-picker{font-size:12px}.skill-locale-picker select{max-width:165px;min-height:38px}.skill-data-version{font-size:10px;text-align:right}}";
  document.head.appendChild(style);

  function installPicker() {
    if (document.getElementById("skill-locale-select")) return;
    const bar = document.createElement("div");
    bar.className = "skill-locale-bar";
    bar.innerHTML = `<label class="skill-locale-picker"><span>${t.language}</span><select id="skill-locale-select" data-native-select="true">${locales.map((x) => `<option value="${x}"${x === locale ? " selected" : ""}>${labels[x]}</option>`).join("")}</select></label><a class="skill-data-version" href="https://www.roworlddb.com/sea/skill_planner/" target="_blank" rel="noopener noreferrer">${t.badge}</a>`;
    const target = document.querySelector(".skill-planner-mobile-toolbar") || document.querySelector(".main-content");
    target?.parentNode?.insertBefore(bar, target);
    bar.querySelector("select").addEventListener("change", (event) => {
      const next = normalize(event.target.value) || fallback;
      localStorage.setItem("ro_lang", next);
      const url = new URL(location.href);
      url.searchParams.set("lang", next);
      location.assign(`${url.pathname}${url.search}${url.hash}`);
    });
  }

  function renderWarning() {
    if (!failed || document.getElementById("skill-data-warning")) return;
    const node = document.createElement("div");
    node.id = "skill-data-warning";
    node.className = "skill-data-warning";
    node.textContent = t.warning;
    document.querySelector(".skill-locale-bar")?.insertAdjacentElement("afterend", node);
  }

  const exact = new Map([
    ["Skill Planner", t.title], ["Share Build", t.share], ["Unique Skills", t.unique],
    ["Skill Details", t.details], ["Select a skill to see details.", t.empty],
    ["Select a Target Job...", t.select], ["Loading skills...", t.loading],
    ["Basic Skills", t.basic], ["Traits", t.traits], ["Reset", t.reset],
    ["Create Ragnarok: The New World class builds", t.heading],
  ]);
  let frame = 0;
  function translate() {
    frame = 0;
    document.documentElement.lang = locale;
    const title = document.querySelector(".header-title"); if (title) title.textContent = t.title;
    const share = document.getElementById("share-link-btn");
    if (share) { share.title = t.shareAria; share.setAttribute("aria-label", t.shareAria); const label = share.querySelector(".site-nav-label"); if (label) label.textContent = t.share; }
    const option = document.querySelector('#quick-job-select option[value=""]'); if (option) option.textContent = t.select;
    const button = document.querySelector(".job-select-button-label"); if (button && /select a target job/i.test(button.textContent)) button.textContent = t.select;
    const heading = document.getElementById("skill-guide-title"); if (heading) heading.textContent = t.heading;
    const intro = document.querySelector(".seo-guide > p"); if (intro) intro.textContent = t.text;
    document.querySelectorAll("[data-skill-modal-close]").forEach((node) => node.setAttribute("aria-label", t.close));
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode, parent = node.parentElement, value = node.nodeValue?.trim();
      if (!value || !parent || parent.closest("script,style,textarea,select")) continue;
      if (exact.has(value)) node.nodeValue = node.nodeValue.replace(value, exact.get(value));
      else if (/^Points\s*:/i.test(value)) node.nodeValue = node.nodeValue.replace(/^Points/i, t.points);
    }
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(translate); }

  installPicker();
  translate();
  new MutationObserver(schedule).observe(document.documentElement, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:["lang"] });
  addEventListener("DOMContentLoaded", () => { installPicker(); schedule(); }, { once:true });
})();

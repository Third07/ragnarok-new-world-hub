/**
 * Refine Simulator — RO World Journey
 */
(function () {
  "use strict";

  const SUPPORTED_LOCALES = ["zh-TW", "en-US", "zh-CN", "th-TH", "id-ID"];
  function detectLocale() {
    const q = new URLSearchParams(location.search).get("lang");
    const s = localStorage.getItem("ro_lang");
    for (const c of [q, s, navigator.language]) {
      if (!c) continue;
      const m = SUPPORTED_LOCALES.find(l => l.toLowerCase() === String(c).toLowerCase());
      if (m) return m;
    }
    return "en-US";
  }
  const LOCALE = detectLocale();
  localStorage.setItem("ro_lang", LOCALE);

  const withVersion = window.withAssetVersion || (u => u);

  let refineData = null;
  let currentLevel = 0;
  let stats = { attempts: 0, successes: 0, downgrades: 0, failures: 0, highest: 0, zeny: 0 };
  let materialsUsed = {};
  let supportState = { blessing: false, noDowngrade: false, meteoricIron: false };

  // DOM
  const $level = document.getElementById("current-level");
  const $target = document.getElementById("target-display");
  const $rateSuccess = document.getElementById("rate-success");
  const $rateDowngrade = document.getElementById("rate-downgrade");
  const $rateFail = document.getElementById("rate-fail");
  const $materials = document.getElementById("materials-display");
  const $support = document.getElementById("support-display");
  const $log = document.getElementById("refine-log");
  const $btnRefine = document.getElementById("btn-refine");
  const $btnReset = document.getElementById("btn-reset");

  async function loadData() {
    try {
      let r = await fetch(withVersion(`/sea/refine/refine_${LOCALE}.json`));
      if (!r.ok && LOCALE !== "en-US") r = await fetch(withVersion("/sea/refine/refine_en-US.json"));
      if (!r.ok) throw new Error("Failed to load refine data");
      refineData = await r.json();
      init();
    } catch (err) {
      $log.innerHTML = `<div class="log-placeholder" style="color:var(--danger)">Failed to load data: ${err.message}</div>`;
    }
  }

  function getLevelData(level) {
    return refineData.levels.find(l => l.level === level) || null;
  }

  function updateDisplay() {
    const maxLevel = refineData.maxLevel;
    const safeLevels = refineData.safeLevels;

    // Level display
    $level.textContent = currentLevel;
    $level.className = "refine-level-number";
    if (currentLevel >= maxLevel) $level.classList.add("level-max");
    else if (currentLevel >= 15) $level.classList.add("level-high");
    else if (safeLevels.includes(currentLevel)) $level.classList.add("level-safe");

    $target.textContent = currentLevel >= maxLevel ? "MAX" : `+${currentLevel + 1}`;

    const ld = getLevelData(currentLevel);
    if (!ld || currentLevel >= maxLevel) {
      $rateSuccess.style.width = "0%";
      $rateSuccess.querySelector(".rate-label").textContent = "";
      $rateDowngrade.style.width = "0%";
      $rateDowngrade.querySelector(".rate-label").textContent = "";
      $rateFail.style.width = "100%";
      $rateFail.querySelector(".rate-label").textContent = currentLevel >= maxLevel ? "MAX" : "N/A";
      $materials.innerHTML = "";
      $support.innerHTML = "";
      $btnRefine.disabled = true;
      return;
    }

    $btnRefine.disabled = false;

    // Calculate rates with support
    let successRate = ld.success;
    let downgradeRate = ld.downgrade;
    let failRate = ld.fail;

    if (supportState.blessing && ld.support?.blessing?.enabled) {
      successRate += ld.support.blessing.successBonus;
      failRate = Math.max(0, failRate - ld.support.blessing.successBonus);
    }
    if (supportState.noDowngrade && ld.support?.noDowngrade?.enabled) {
      failRate += downgradeRate;
      downgradeRate = 0;
    }

    // Rate bar
    $rateSuccess.style.width = successRate + "%";
    $rateSuccess.querySelector(".rate-label").textContent = successRate > 5 ? successRate.toFixed(1) + "%" : "";
    $rateDowngrade.style.width = downgradeRate + "%";
    $rateDowngrade.querySelector(".rate-label").textContent = downgradeRate > 5 ? downgradeRate.toFixed(1) + "%" : "";
    $rateFail.style.width = failRate + "%";
    $rateFail.querySelector(".rate-label").textContent = failRate > 5 ? failRate.toFixed(1) + "%" : "";

    // Materials
    let matHtml = "";
    if (ld.material?.item) {
      matHtml += `<div class="material-item">
        <img loading="lazy" decoding="async" src="${ld.material.item.iconPath}" alt="${ld.material.item.name}">
        <span class="material-name">${ld.material.item.name}</span>
        <span class="material-amount">x${ld.material.amount}</span>
      </div>`;
    }
    if (ld.consumable?.item) {
      matHtml += `<div class="material-item">
        <img loading="lazy" decoding="async" src="${ld.consumable.item.iconPath}" alt="${ld.consumable.item.name}">
        <span class="material-name">${ld.consumable.item.name}</span>
        <span class="material-amount">${ld.consumable.amount.toLocaleString()}</span>
      </div>`;
    }
    $materials.innerHTML = matHtml;

    // Support toggles
    let supHtml = "";
    const supports = [
      { key: "blessing", label: "Blessing" },
      { key: "noDowngrade", label: "No Downgrade" },
      { key: "meteoricIron", label: "Meteoric Iron" },
    ];
    for (const s of supports) {
      const sd = ld.support?.[s.key];
      const enabled = sd?.enabled;
      const active = supportState[s.key];
      const cls = !enabled ? "support-toggle disabled" : active ? "support-toggle active" : "support-toggle";
      const icon = sd?.item?.iconPath || "";
      supHtml += `<div class="${cls}" data-support="${s.key}" ${!enabled ? "" : ""}>
        ${icon ? `<img loading="lazy" decoding="async" src="${icon}" alt="${s.label}">` : ""}
        <span>${s.label}${sd?.amount ? ` x${sd.amount}` : ""}</span>
      </div>`;
    }
    $support.innerHTML = supHtml;

    // Bind support toggles
    $support.querySelectorAll(".support-toggle:not(.disabled)").forEach(el => {
      el.addEventListener("click", () => {
        const key = el.dataset.support;
        supportState[key] = !supportState[key];
        updateDisplay();
      });
    });

    // Stats
    document.getElementById("stat-attempts").textContent = stats.attempts.toLocaleString();
    document.getElementById("stat-successes").textContent = stats.successes.toLocaleString();
    document.getElementById("stat-downgrades").textContent = stats.downgrades.toLocaleString();
    document.getElementById("stat-failures").textContent = stats.failures.toLocaleString();
    document.getElementById("stat-highest").textContent = "+" + stats.highest;
    document.getElementById("stat-zeny").textContent = stats.zeny.toLocaleString();

    // Materials used
    const $mu = document.getElementById("materials-used");
    let muHtml = "";
    for (const [name, info] of Object.entries(materialsUsed)) {
      muHtml += `<div class="material-item">
        ${info.icon ? `<img loading="lazy" decoding="async" src="${info.icon}" alt="${name}">` : ""}
        <span class="material-name">${name}</span>
        <span class="material-amount">x${info.amount.toLocaleString()}</span>
      </div>`;
    }
    $mu.innerHTML = muHtml || '<span style="color:var(--text-muted);font-size:0.8rem">None yet</span>';
  }

  function doRefine() {
    const ld = getLevelData(currentLevel);
    if (!ld || currentLevel >= refineData.maxLevel) return;

    let successRate = ld.success;
    let downgradeRate = ld.downgrade;

    if (supportState.blessing && ld.support?.blessing?.enabled) {
      successRate += ld.support.blessing.successBonus;
    }
    if (supportState.noDowngrade && ld.support?.noDowngrade?.enabled) {
      downgradeRate = 0;
    }

    const roll = Math.random() * 100;
    stats.attempts++;

    // Track materials
    if (ld.material?.item) {
      const name = ld.material.item.name;
      if (!materialsUsed[name]) materialsUsed[name] = { amount: 0, icon: ld.material.item.iconPath };
      materialsUsed[name].amount += ld.material.amount;
    }
    if (ld.consumable?.item) {
      const name = ld.consumable.item.name;
      if (!materialsUsed[name]) materialsUsed[name] = { amount: 0, icon: ld.consumable.item.iconPath };
      materialsUsed[name].amount += ld.consumable.amount;
      stats.zeny += ld.consumable.amount;
    }
    // Track support materials
    for (const [key, active] of Object.entries(supportState)) {
      if (!active) continue;
      const sd = ld.support?.[key];
      if (sd?.enabled && sd.item) {
        const name = sd.item.name;
        if (!materialsUsed[name]) materialsUsed[name] = { amount: 0, icon: sd.item.iconPath };
        materialsUsed[name].amount += sd.amount || 1;
      }
    }

    let result, cls;
    if (roll < successRate) {
      currentLevel++;
      stats.successes++;
      if (currentLevel > stats.highest) stats.highest = currentLevel;
      result = `+${currentLevel - 1} → +${currentLevel} SUCCESS`;
      cls = "log-success";
      if (refineData.safeLevels.includes(currentLevel)) {
        result += " ★ SAFE LEVEL";
        cls = "log-safe";
      }
    } else if (roll < successRate + downgradeRate) {
      const prev = currentLevel;
      currentLevel = Math.max(0, currentLevel - 1);
      stats.downgrades++;
      result = `+${prev} → +${currentLevel} DOWNGRADE`;
      cls = "log-downgrade";
    } else {
      const prev = currentLevel;
      // Find the nearest safe level below
      const safeBelow = refineData.safeLevels.filter(s => s <= currentLevel).sort((a, b) => b - a);
      currentLevel = safeBelow.length > 0 ? safeBelow[0] : 0;
      stats.failures++;
      result = `+${prev} → +${currentLevel} FAIL`;
      cls = "log-fail";
    }

    addLog(result, cls);
    updateDisplay();
  }

  function addLog(text, cls) {
    const placeholder = $log.querySelector(".log-placeholder");
    if (placeholder) placeholder.remove();

    const entry = document.createElement("div");
    entry.className = "log-entry " + (cls || "");
    entry.textContent = `#${stats.attempts} ${text}`;
    $log.insertBefore(entry, $log.firstChild);

    // Keep log manageable
    while ($log.children.length > 200) $log.removeChild($log.lastChild);
  }

  function resetSimulation() {
    currentLevel = 0;
    stats = { attempts: 0, successes: 0, downgrades: 0, failures: 0, highest: 0, zeny: 0 };
    materialsUsed = {};
    supportState = { blessing: false, noDowngrade: false, meteoricIron: false };
    $log.innerHTML = '<div class="log-placeholder">Click "Refine" to begin simulation</div>';
    updateDisplay();
  }

  function buildReferenceTables() {
    const $groups = document.getElementById("refine-groups");
    let html = "";

    for (const group of refineData.groups) {
      html += `<div class="refine-group">
        <div class="refine-group-header">
          <img loading="lazy" decoding="async" src="${group.material.iconPath}" alt="${group.material.name}">
          <span class="refine-group-label">${group.label} — ${group.material.name}</span>
        </div>
        <table class="refine-table">
          <thead><tr>
            <th>Level</th><th>Success</th><th>Downgrade</th><th>Fail</th>
            <th>Material</th><th>Zeny</th>
          </tr></thead><tbody>`;

      const levels = refineData.levels.filter(l => l.level >= group.startLevel && l.level <= group.endLevel);
      for (const l of levels) {
        const isSafe = refineData.safeLevels.includes(l.targetLevel);
        const rowCls = isSafe ? ' class="safe-row"' : "";
        const sClass = l.success >= 50 ? "high" : l.success >= 20 ? "mid" : "low";
        html += `<tr${rowCls}>
          <td>+${l.level} → +${l.targetLevel}${isSafe ? " ★" : ""}</td>
          <td class="rate-cell ${sClass}">${l.success}%</td>
          <td class="rate-cell">${l.downgrade > 0 ? l.downgrade + "%" : "—"}</td>
          <td class="rate-cell ${l.fail > 50 ? "low" : ""}">${l.fail > 0 ? l.fail + "%" : "—"}</td>
          <td>${l.material.amount}x</td>
          <td>${l.consumable.amount.toLocaleString()}</td>
        </tr>`;
      }

      html += "</tbody></table></div>";
    }

    $groups.innerHTML = html;

    // Milestone table
    const $milestones = document.getElementById("milestone-table");
    let mHtml = `<table><thead><tr>
      <th>Range</th><th>Avg Attempts</th><th>Est. USD</th><th>Materials</th>
    </tr></thead><tbody>`;

    for (const m of refineData.milestoneProjections) {
      const mats = m.materials.map(mat => `${mat.amount.toFixed(0)}x ${mat.item.name}`).join(", ");
      mHtml += `<tr>
        <td style="font-weight:600;color:var(--text-primary)">${m.label}</td>
        <td>${m.attempts.toFixed(1)}</td>
        <td style="color:var(--warning)">$${m.usd.toFixed(2)}</td>
        <td style="font-size:0.75rem">${mats}</td>
      </tr>`;
    }

    mHtml += "</tbody></table>";
    $milestones.innerHTML = mHtml;
  }

  function init() {
    buildReferenceTables();
    updateDisplay();

    $btnRefine.addEventListener("click", doRefine);
    $btnReset.addEventListener("click", resetSimulation);

    // Keyboard shortcut
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        if (document.activeElement === $btnRefine || document.activeElement === document.body) {
          e.preventDefault();
          doRefine();
        }
      }
    });
  }

  loadData();
})();

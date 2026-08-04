(() => {
  "use strict";

  if (!/^\/sea\/maps(?:\/|$)/.test(window.location.pathname)) return;

  const MAP_IMAGE_ORIGINS = [
    "https://www.roworlddb.com",
    "https://roworlddb.com",
  ];
  const OPEN_WORLD = "openworld";
  const INSTANCE = "instance";

  function selectedOption(select) {
    return select.options[select.selectedIndex] || null;
  }

  function classifyGroup(group, index) {
    const label = String(group?.label || "").toLowerCase();
    if (label.includes("open") || label.includes("world") || label.includes("開放") || label.includes("开放") || label.includes("โอเพน")) {
      return OPEN_WORLD;
    }
    if (label.includes("instance") || label.includes("dungeon") || label.includes("副本") || label.includes("地城") || label.includes("ดันเจียน")) {
      return INSTANCE;
    }
    return index === 0 ? OPEN_WORLD : INSTANCE;
  }

  function buildCategorySwitcher(select) {
    const toolbar = select.closest(".map-toolbar");
    const quickSelect = select.closest(".quick-select-wrapper");
    if (!toolbar || !quickSelect) return null;

    let switcher = toolbar.querySelector("[data-map-category-switcher]");
    if (switcher) return switcher;

    switcher = document.createElement("div");
    switcher.className = "map-category-switcher";
    switcher.dataset.mapCategorySwitcher = "true";
    switcher.setAttribute("role", "tablist");
    switcher.setAttribute("aria-label", "Map category");

    const makeButton = (kind, label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "map-category-tab";
      button.dataset.mapCategory = kind;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", "false");
      button.textContent = label;
      return button;
    };

    const groups = Array.from(select.querySelectorAll("optgroup"));
    const openLabel = groups.find((group, index) => classifyGroup(group, index) === OPEN_WORLD)?.label || "Open World";
    const instanceLabel = groups.find((group, index) => classifyGroup(group, index) === INSTANCE)?.label || "Instances / Dungeons";

    switcher.append(
      makeButton(OPEN_WORLD, openLabel),
      makeButton(INSTANCE, instanceLabel),
    );
    toolbar.insertBefore(switcher, quickSelect);
    return switcher;
  }

  function applyCategory(select, switcher, kind, chooseFirst = false) {
    const groups = Array.from(select.querySelectorAll("optgroup"));
    if (groups.length < 2) return;

    groups.forEach((group, index) => {
      const active = classifyGroup(group, index) === kind;
      group.hidden = !active;
      group.disabled = !active;
    });

    switcher.querySelectorAll("[data-map-category]").forEach((button) => {
      const active = button.dataset.mapCategory === kind;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", active ? "true" : "false");
      button.tabIndex = active ? 0 : -1;
    });
    select.dataset.mapCategory = kind;

    const option = selectedOption(select);
    const optionGroup = option?.closest("optgroup");
    const selectedKind = optionGroup ? classifyGroup(optionGroup, groups.indexOf(optionGroup)) : null;
    if (!chooseFirst || selectedKind === kind) return;

    const targetGroup = groups.find((group, index) => classifyGroup(group, index) === kind);
    const firstOption = targetGroup?.querySelector("option:not([disabled])");
    if (!firstOption) return;

    select.value = firstOption.value;
    select.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function syncCategoryFromSelection(select, switcher) {
    const option = selectedOption(select);
    const group = option?.closest("optgroup");
    if (!group) return;
    const groups = Array.from(select.querySelectorAll("optgroup"));
    applyCategory(select, switcher, classifyGroup(group, groups.indexOf(group)), false);
  }

  function setupCategorySwitcher() {
    const select = document.getElementById("map-select");
    if (!(select instanceof HTMLSelectElement)) return;

    const initialize = () => {
      const groups = Array.from(select.querySelectorAll("optgroup"));
      if (groups.length < 2) return false;

      const switcher = buildCategorySwitcher(select);
      if (!switcher) return false;

      if (!switcher.dataset.bound) {
        switcher.dataset.bound = "true";
        switcher.addEventListener("click", (event) => {
          const button = event.target.closest("[data-map-category]");
          if (!(button instanceof HTMLButtonElement)) return;
          applyCategory(select, switcher, button.dataset.mapCategory || OPEN_WORLD, true);
        });
        select.addEventListener("change", () => syncCategoryFromSelection(select, switcher));
        window.addEventListener("hashchange", () => {
          window.setTimeout(() => syncCategoryFromSelection(select, switcher), 0);
        });
      }

      const option = selectedOption(select);
      const currentGroup = option?.closest("optgroup");
      const kind = currentGroup
        ? classifyGroup(currentGroup, groups.indexOf(currentGroup))
        : OPEN_WORLD;
      applyCategory(select, switcher, kind, false);
      return true;
    };

    if (initialize()) return;
    const observer = new MutationObserver(() => {
      if (initialize()) observer.disconnect();
    });
    observer.observe(select, { childList: true, subtree: true });
  }

  function mapImageCandidates(image) {
    const source = image.currentSrc || image.src || "";
    let url;
    try {
      url = new URL(source, window.location.href);
    } catch {
      return [];
    }

    const file = url.pathname.split("/").pop() || "";
    const base = file.replace(/\.(?:webp|png|jpe?g)$/i, "");
    if (!base) return [];

    return [
      `/media/images/map/${base}.webp`,
      `/media/images/map/${base}.png`,
      ...MAP_IMAGE_ORIGINS.flatMap((origin) => [
        `${origin}/media/images/map/${base}.webp`,
        `${origin}/media/images/map/${base}.png`,
      ]),
    ];
  }

  function ensureMissingMessage(image) {
    const shell = image.closest(".map-shell");
    if (!shell || shell.querySelector("[data-map-image-missing-message]")) return;
    const message = document.createElement("div");
    message.className = "map-image-missing-message";
    message.dataset.mapImageMissingMessage = "true";
    message.innerHTML = "<strong>Map image unavailable</strong><span>Markers and map selection still work while the image is being restored.</span>";
    shell.appendChild(message);
  }

  function clearMissingMessage(image) {
    image.closest(".map-shell")?.querySelector("[data-map-image-missing-message]")?.remove();
  }

  function setupMapImageRecovery() {
    const image = document.getElementById("map-img");
    if (!(image instanceof HTMLImageElement)) return;

    const resetCandidates = () => {
      const candidates = mapImageCandidates(image);
      image.__rtnwMapCandidates = candidates;
      image.__rtnwMapCandidateIndex = Math.max(0, candidates.indexOf(image.getAttribute("src") || ""));
      image.classList.remove("map-image-missing");
      clearMissingMessage(image);
    };

    new MutationObserver(resetCandidates).observe(image, {
      attributes: true,
      attributeFilter: ["src"],
    });

    window.addEventListener("error", (event) => {
      if (event.target !== image) return;
      event.stopImmediatePropagation();

      const candidates = image.__rtnwMapCandidates || mapImageCandidates(image);
      const current = image.currentSrc || image.src || "";
      let nextIndex = Number(image.__rtnwMapCandidateIndex || 0);
      while (nextIndex < candidates.length) {
        const candidate = candidates[nextIndex++];
        image.__rtnwMapCandidateIndex = nextIndex;
        try {
          if (new URL(candidate, window.location.href).href === current) continue;
        } catch {}
        image.src = candidate;
        return;
      }

      image.removeAttribute("src");
      image.classList.add("map-image-missing");
      ensureMissingMessage(image);
      image.__rtnwSyntheticMissing = true;
      image.dispatchEvent(new Event("load"));
      image.__rtnwSyntheticMissing = false;
    }, true);

    window.addEventListener("load", (event) => {
      if (event.target !== image || image.__rtnwSyntheticMissing) return;
      image.classList.remove("map-image-missing");
      clearMissingMessage(image);
      window.requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    }, true);

    resetCandidates();
  }

  function bootstrap() {
    setupCategorySwitcher();
    setupMapImageRecovery();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap, { once: true });
  } else {
    bootstrap();
  }
})();

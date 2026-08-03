(() => {
  "use strict";

  const legacyLabelKey = "ro_map_show_monster_portrait_labels";
  const markerLabelKey = "rtnw_map_show_marker_labels_v1";

  function readLabelPreference() {
    try {
      return localStorage.getItem(markerLabelKey) === "true";
    } catch {
      return false;
    }
  }

  function writeLabelPreference(enabled) {
    try {
      localStorage.setItem(markerLabelKey, enabled ? "true" : "false");
      localStorage.setItem(legacyLabelKey, enabled ? "true" : "false");
    } catch {}
  }

  function syncLabelState(toggle) {
    const enabled = Boolean(toggle?.checked);
    document.body.classList.toggle("map-labels-enabled", enabled);
    writeLabelPreference(enabled);
  }

  function adjustZoom(delta) {
    const slider = document.getElementById("map-zoom-slider");
    if (!(slider instanceof HTMLInputElement)) return;

    const minimum = Number(slider.min) || 1;
    const maximum = Number(slider.max) || 9;
    const next = Math.max(minimum, Math.min(maximum, Number(slider.value || 1) + delta));
    slider.value = next.toFixed(1);
    slider.dispatchEvent(new Event("input", { bubbles: true }));
    slider.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function createZoomButton(label, delta, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `map-clean-zoom-button ${className}`;
    button.textContent = label;
    button.setAttribute("aria-label", delta > 0 ? "Zoom in" : "Zoom out");
    button.addEventListener("click", () => adjustZoom(delta));
    return button;
  }

  function removeFullscreenState() {
    document.body.classList.remove("map-explore-active");
    document.getElementById("map-panel")?.classList.remove("map-explore-active");
  }

  function rebuildToolbar() {
    const toolbar = document.querySelector(".map-toolbar");
    const filterToggle = document.getElementById("map-filter-toggle");
    const filterStack = document.getElementById("map-filter-stack");

    document.querySelector(".map-action-controls")?.remove();
    document.querySelector(".map-search-wrapper")?.remove();
    document.getElementById("map-filter-backdrop")?.remove();

    if (toolbar && filterToggle) {
      filterToggle.className = "map-toolbar-filter-toggle";
      if (!filterToggle.querySelector(".map-filter-caret")) {
        const caret = document.createElement("span");
        caret.className = "map-filter-caret";
        caret.setAttribute("aria-hidden", "true");
        caret.textContent = "⌄";
        filterToggle.appendChild(caret);
      }
      toolbar.appendChild(filterToggle);
    }

    if (toolbar && filterStack) toolbar.insertAdjacentElement("afterend", filterStack);
  }

  function initializeLabels() {
    const toggle = document.getElementById("show-monster-portrait-labels");
    const toggleLabel = document.querySelector("[data-map-monster-portrait-labels-label]");
    const portraitToggle = document.getElementById("use-monster-portraits");
    const labelsEnabled = readLabelPreference();

    if (toggleLabel) toggleLabel.textContent = "Show marker labels";
    if (toggle instanceof HTMLInputElement) {
      toggle.disabled = false;
      toggle.checked = labelsEnabled;
      syncLabelState(toggle);
      toggle.addEventListener("change", () => {
        toggle.disabled = false;
        syncLabelState(toggle);
      });
      requestAnimationFrame(() => {
        toggle.disabled = false;
        toggle.dispatchEvent(new Event("change", { bubbles: true }));
      });
    } else {
      document.body.classList.remove("map-labels-enabled");
      writeLabelPreference(false);
    }

    portraitToggle?.addEventListener("change", () => {
      requestAnimationFrame(() => {
        if (toggle instanceof HTMLInputElement) toggle.disabled = false;
      });
    });
  }

  function initializeZoomControls() {
    const controls = document.querySelector(".map-touch-controls");
    const reset = document.getElementById("zoom-reset");
    if (!controls || !reset || controls.querySelector(".map-clean-zoom-button")) return;

    controls.insertBefore(createZoomButton("−", -0.6, "map-clean-zoom-out"), reset);
    controls.appendChild(createZoomButton("+", 0.6, "map-clean-zoom-in"));
  }

  function initializeCleanMapUi() {
    removeFullscreenState();
    rebuildToolbar();
    initializeLabels();
    initializeZoomControls();

    const mapSelect = document.getElementById("map-select");
    const filterToggle = document.getElementById("map-filter-toggle");
    mapSelect?.addEventListener("change", () => {
      if (document.body.classList.contains("map-filters-open")) filterToggle?.click();
    });

    window.addEventListener("pageshow", removeFullscreenState);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCleanMapUi, { once: true });
  } else {
    initializeCleanMapUi();
  }
})();

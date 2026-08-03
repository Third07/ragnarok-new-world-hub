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

  const labelsEnabled = readLabelPreference();
  writeLabelPreference(labelsEnabled);

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

  function addCompactZoomButton(controls, label, delta, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `map-clean-zoom-button ${className}`;
    button.textContent = label;
    button.setAttribute("aria-label", delta > 0 ? "Zoom in" : "Zoom out");
    button.addEventListener("click", () => adjustZoom(delta));
    controls.appendChild(button);
  }

  function initializeCleanMapUi() {
    const toggle = document.getElementById("show-monster-portrait-labels");
    const toggleLabel = document.querySelector("[data-map-monster-portrait-labels-label]");

    if (toggleLabel) toggleLabel.textContent = "Show marker labels";
    if (toggle instanceof HTMLInputElement) {
      toggle.checked = labelsEnabled;
      syncLabelState(toggle);
      toggle.addEventListener("change", () => syncLabelState(toggle));
    } else {
      document.body.classList.remove("map-labels-enabled");
    }

    const controls = document.querySelector(".map-touch-controls");
    const reset = document.getElementById("zoom-reset");
    if (controls && reset && !controls.querySelector(".map-clean-zoom-button")) {
      const minus = document.createElement("button");
      minus.type = "button";
      minus.className = "map-clean-zoom-button map-clean-zoom-out";
      minus.textContent = "−";
      minus.setAttribute("aria-label", "Zoom out");
      minus.addEventListener("click", () => adjustZoom(-0.6));

      const plus = document.createElement("button");
      plus.type = "button";
      plus.className = "map-clean-zoom-button map-clean-zoom-in";
      plus.textContent = "+";
      plus.setAttribute("aria-label", "Zoom in");
      plus.addEventListener("click", () => adjustZoom(0.6));

      controls.insertBefore(minus, reset);
      controls.appendChild(plus);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCleanMapUi, { once: true });
  } else {
    initializeCleanMapUi();
  }
})();

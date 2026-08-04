(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  let drawFrame = 0;
  let resizeObserver = null;

  function simulatorState() {
    try {
      return typeof state !== "undefined" ? state : null;
    } catch {
      return null;
    }
  }

  function numberFromLevel(node) {
    const text = node?.querySelector(".skill-level")?.textContent || "0";
    const value = Number(String(text).split("/")[0]);
    return Number.isFinite(value) ? value : 0;
  }

  function flowState(sourceNode, targetNode, requiredLevel) {
    const sourceLevel = numberFromLevel(sourceNode);
    const targetLevel = numberFromLevel(targetNode);
    if (sourceLevel >= requiredLevel && targetLevel > 0) return "complete";
    if (sourceLevel >= requiredLevel) return "available";
    return "locked";
  }

  function pathBetween(sourceRect, targetRect, containerRect) {
    const sourceCenterX = sourceRect.left - containerRect.left + sourceRect.width / 2;
    const sourceCenterY = sourceRect.top - containerRect.top + sourceRect.height / 2;
    const targetCenterX = targetRect.left - containerRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top - containerRect.top + targetRect.height / 2;
    const verticalDistance = targetCenterY - sourceCenterY;

    if (Math.abs(verticalDistance) >= Math.max(sourceRect.height, targetRect.height) * .55) {
      const startX = sourceCenterX;
      const startY = verticalDistance >= 0
        ? sourceRect.bottom - containerRect.top
        : sourceRect.top - containerRect.top;
      const endX = targetCenterX;
      const endY = verticalDistance >= 0
        ? targetRect.top - containerRect.top
        : targetRect.bottom - containerRect.top;
      const middleY = startY + (endY - startY) / 2;
      return {
        d: `M ${startX} ${startY} V ${middleY} H ${endX} V ${endY}`,
        endX,
        endY,
      };
    }

    const movingRight = targetCenterX >= sourceCenterX;
    const startX = movingRight
      ? sourceRect.right - containerRect.left
      : sourceRect.left - containerRect.left;
    const startY = sourceCenterY;
    const endX = movingRight
      ? targetRect.left - containerRect.left
      : targetRect.right - containerRect.left;
    const endY = targetCenterY;
    const middleX = startX + (endX - startX) / 2;
    return {
      d: `M ${startX} ${startY} H ${middleX} V ${endY} H ${endX}`,
      endX,
      endY,
    };
  }

  function drawJobFlow(container, job) {
    container.querySelectorAll(":scope > .skill-flow-layer").forEach((layer) => layer.remove());
    if (!job?.skills) return;

    const containerRect = container.getBoundingClientRect();
    if (!containerRect.width || !containerRect.height) return;

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.classList.add("skill-flow-layer");
    svg.setAttribute("viewBox", `0 0 ${containerRect.width} ${containerRect.height}`);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");

    let lineCount = 0;
    for (const [targetId, skill] of Object.entries(job.skills)) {
      const prerequisites = Array.isArray(skill?.pre_skill) ? skill.pre_skill : [];
      if (!prerequisites.length) continue;

      const targetNode = container.querySelector(`.skill-node[data-kind-id="${CSS.escape(String(targetId))}"]`);
      const targetIcon = targetNode?.querySelector(".skill-icon-wrapper");
      if (!targetNode || !targetIcon) continue;

      for (const encoded of prerequisites) {
        const numeric = Number(encoded);
        if (!Number.isFinite(numeric)) continue;
        const sourceId = String(Math.floor(numeric / 100));
        const requiredLevel = numeric % 100;
        const sourceNode = container.querySelector(`.skill-node[data-kind-id="${CSS.escape(sourceId)}"]`);
        const sourceIcon = sourceNode?.querySelector(".skill-icon-wrapper");
        if (!sourceNode || !sourceIcon || sourceNode === targetNode) continue;

        const geometry = pathBetween(
          sourceIcon.getBoundingClientRect(),
          targetIcon.getBoundingClientRect(),
          containerRect,
        );
        const stateName = flowState(sourceNode, targetNode, requiredLevel);

        const path = document.createElementNS(SVG_NS, "path");
        path.classList.add("skill-flow-line");
        path.dataset.flowState = stateName;
        path.setAttribute("d", geometry.d);
        svg.appendChild(path);

        const dot = document.createElementNS(SVG_NS, "circle");
        dot.classList.add("skill-flow-dot");
        dot.dataset.flowState = stateName;
        dot.setAttribute("cx", String(geometry.endX));
        dot.setAttribute("cy", String(geometry.endY));
        dot.setAttribute("r", stateName === "complete" ? "3.5" : "3");
        svg.appendChild(dot);
        lineCount += 1;
      }
    }

    if (lineCount) container.insertBefore(svg, container.firstChild);
  }

  function drawAllFlows() {
    drawFrame = 0;
    const currentState = simulatorState();
    if (!currentState?.data) return;

    document.querySelectorAll(".job-section[data-job-id]").forEach((section) => {
      const jobId = Number(section.dataset.jobId);
      const job = currentState.data[jobId];
      const container = section.querySelector(".job-skills-container");
      if (job && container) drawJobFlow(container, job);
    });
  }

  function scheduleDraw() {
    if (drawFrame) cancelAnimationFrame(drawFrame);
    drawFrame = requestAnimationFrame(() => {
      requestAnimationFrame(drawAllFlows);
    });
  }

  function observeSimulator() {
    const simulator = document.getElementById("simulator-container");
    if (!simulator) return;

    new MutationObserver((mutations) => {
      const relevant = mutations.some((mutation) => {
        const nodes = [...mutation.addedNodes, ...mutation.removedNodes];
        return nodes.some((node) =>
          node instanceof Element && !node.classList.contains("skill-flow-layer")
        );
      });
      if (relevant) scheduleDraw();
    }).observe(simulator, { childList: true, subtree: true });

    if ("ResizeObserver" in window) {
      resizeObserver?.disconnect();
      resizeObserver = new ResizeObserver(scheduleDraw);
      resizeObserver.observe(simulator);
    }

    scheduleDraw();
  }

  function init() {
    observeSimulator();
    window.addEventListener("resize", scheduleDraw, { passive: true });
    document.fonts?.ready?.then(scheduleDraw).catch(() => {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

(() => {
  "use strict";

  const SUMMARY_URL = "/creator-assets/catalog/summary.json";
  const PAGE_SIZE = 24;
  const LANGUAGES = ["en-US", "zh-CN", "th-TH", "id-ID"];
  const state = {
    summary: null,
    activeId: "skills",
    categories: new Map(),
    visibleCount: PAGE_SIZE,
    query: "",
    searching: false,
    initializing: false,
  };

  const elements = {
    section: document.querySelector("[data-static-asset-library]"),
    categories: document.getElementById("asset-categories"),
    form: document.getElementById("asset-search-form"),
    input: document.getElementById("creator-asset-search"),
    searchButton: document.querySelector("#asset-search-form button"),
    status: document.getElementById("asset-status"),
    grid: document.getElementById("asset-grid"),
    loadMore: document.getElementById("asset-load-more"),
    retry: document.getElementById("asset-retry"),
  };

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("shared-mobile-menu");
  const languageSelects = [...document.querySelectorAll(".header-language-switcher select, .mobile-language-switcher select")];

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    mobileMenu.classList.toggle("is-open", open);
  }

  menuToggle?.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) setMenu(false);
  });

  document.addEventListener("click", (event) => {
    if (!mobileMenu?.classList.contains("is-open")) return;
    if (event.target instanceof Node && !mobileMenu.contains(event.target) && !menuToggle?.contains(event.target)) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  function normalizeLanguage(value) {
    if (!value) return null;
    const normalized = String(value).trim().toLowerCase();
    const exact = LANGUAGES.find((language) => language.toLowerCase() === normalized);
    if (exact) return exact;
    if (normalized.startsWith("zh")) return "zh-CN";
    if (normalized.startsWith("th")) return "th-TH";
    if (normalized.startsWith("id") || normalized.startsWith("in")) return "id-ID";
    if (normalized.startsWith("en")) return "en-US";
    return null;
  }

  function updateToolLinks(language) {
    document.querySelectorAll('a[href^="/sea/"]').forEach((link) => {
      const url = new URL(link.getAttribute("href") || "", window.location.origin);
      url.searchParams.set("lang", language);
      link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    });
  }

  function setLanguage(language, updateAddress = false) {
    const normalized = normalizeLanguage(language) || "en-US";
    document.documentElement.lang = normalized;
    window.localStorage.setItem("ro_lang", normalized);
    for (const select of languageSelects) select.value = normalized;
    updateToolLinks(normalized);

    if (updateAddress) {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", normalized);
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      window.dispatchEvent(new CustomEvent("ro-language-change", { detail: normalized }));
    }
  }

  const queryLanguage = normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
  const storedLanguage = normalizeLanguage(window.localStorage.getItem("ro_lang"));
  const browserLanguage = normalizeLanguage(window.navigator.language);
  setLanguage(queryLanguage || storedLanguage || browserLanguage || "en-US");

  for (const select of languageSelects) {
    select.addEventListener("change", () => setLanguage(select.value, true));
  }

  function categoryState(category) {
    if (!state.categories.has(category.id)) {
      state.categories.set(category.id, {
        category,
        assets: [],
        loadedChunks: 0,
        loading: false,
        error: "",
      });
    }
    return state.categories.get(category.id);
  }

  function activeState() {
    if (!state.summary) return null;
    const category = state.summary.categories.find((item) => item.id === state.activeId);
    return category ? categoryState(category) : null;
  }

  function fileName(image) {
    return image.split("/").pop() || "image.webp";
  }

  function searchableText(asset) {
    return [asset.name, asset.kind, asset.image, ...(asset.aliases || [])].join(" ").toLowerCase();
  }

  function filteredAssets(current) {
    const needle = state.query.trim().toLowerCase();
    return needle ? current.assets.filter((asset) => searchableText(asset).includes(needle)) : current.assets;
  }

  function setBusy(busy) {
    elements.grid.setAttribute("aria-busy", String(busy));
    elements.input.disabled = !state.summary || busy;
    elements.searchButton.disabled = !state.summary || busy;
    elements.loadMore.disabled = busy;
  }

  function renderCategories() {
    elements.categories.replaceChildren();
    for (const category of state.summary.categories) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "category-button";
      button.dataset.category = category.id;
      button.setAttribute("aria-pressed", String(category.id === state.activeId));

      const label = document.createElement("span");
      label.textContent = category.shortLabel;
      const count = document.createElement("small");
      count.textContent = `${category.count.toLocaleString()} images`;
      button.append(label, count);
      button.addEventListener("click", () => chooseCategory(category.id));
      elements.categories.append(button);
    }
    elements.categories.setAttribute("aria-busy", "false");
  }

  function makeCard(asset) {
    const article = document.createElement("article");
    article.className = "asset-card";

    const preview = document.createElement("a");
    preview.className = "asset-preview";
    preview.href = asset.image;
    preview.target = "_blank";
    preview.rel = "noreferrer";
    preview.setAttribute("aria-label", `Open full-size ${asset.name} image`);

    const image = document.createElement("img");
    image.src = asset.image;
    image.alt = `${asset.name} image`;
    image.width = 160;
    image.height = 160;
    image.loading = "lazy";
    image.decoding = "async";
    image.fetchPriority = "low";
    preview.append(image);

    const copy = document.createElement("div");
    copy.className = "asset-copy";
    const kind = document.createElement("span");
    kind.className = "asset-kind";
    kind.textContent = asset.kind;
    const title = document.createElement("h3");
    title.textContent = asset.name;
    title.title = asset.name;
    const code = document.createElement("code");
    code.textContent = fileName(asset.image);
    code.title = fileName(asset.image);

    const links = document.createElement("div");
    links.className = "asset-links";
    const download = document.createElement("a");
    download.href = asset.image;
    download.download = asset.downloadName || fileName(asset.image);
    download.textContent = "Download";
    const database = document.createElement("a");
    database.href = asset.source;
    database.textContent = "Database";
    links.append(download, database);
    copy.append(kind, title, code, links);
    article.append(preview, copy);
    return article;
  }

  function render() {
    const current = activeState();
    if (!current) return;
    const matches = filteredAssets(current);
    const visible = matches.slice(0, state.visibleCount);
    elements.grid.replaceChildren(...visible.map(makeCard));

    if (!current.loading && current.error) {
      const error = document.createElement("div");
      error.className = "error-message";
      error.textContent = current.error;
      elements.grid.replaceChildren(error);
    } else if (!current.loading && current.loadedChunks > 0 && visible.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = state.query ? "No matching image in this category. Try a shorter name or filename." : "No images are available in this collection.";
      elements.grid.replaceChildren(empty);
    }

    const allChunksLoaded = current.loadedChunks >= current.category.manifests.length;
    const canReveal = state.visibleCount < matches.length;
    const canFetch = !allChunksLoaded && !state.query;
    elements.loadMore.hidden = current.loading || current.error || (!canReveal && !canFetch);
    elements.loadMore.textContent = canReveal ? `Show ${Math.min(PAGE_SIZE, matches.length - state.visibleCount)} more images` : "Load the next image group";
    elements.retry.hidden = !current.error;

    if (current.loading) {
      elements.status.textContent = state.searching ? `Searching all ${current.category.label.toLowerCase()}…` : `Loading ${current.category.label.toLowerCase()}…`;
    } else if (current.error) {
      elements.status.textContent = "This image group could not be loaded.";
    } else if (state.query) {
      elements.status.textContent = `${matches.length.toLocaleString()} match${matches.length === 1 ? "" : "es"} for “${state.query}” in ${current.category.shortLabel}.`;
    } else if (current.loadedChunks > 0) {
      elements.status.textContent = `Showing ${Math.min(visible.length, matches.length).toLocaleString()} of ${current.category.count.toLocaleString()} ${current.category.label.toLowerCase()}.`;
    }
  }

  async function loadNextChunk(current) {
    if (!current || current.loading || current.loadedChunks >= current.category.manifests.length) return;
    current.loading = true;
    current.error = "";
    setBusy(true);
    render();
    const manifest = current.category.manifests[current.loadedChunks];

    try {
      const response = await fetch(manifest, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}.`);
      const payload = await response.json();
      const known = new Set(current.assets.map((asset) => asset.image));
      for (const asset of payload.assets || []) {
        if (!known.has(asset.image)) {
          known.add(asset.image);
          current.assets.push(asset);
        }
      }
      current.loadedChunks += 1;
    } catch (error) {
      current.error = error instanceof Error ? error.message : "The asset list is unavailable. Please retry.";
    } finally {
      current.loading = false;
      setBusy(false);
      render();
    }
  }

  async function loadAllChunks(current) {
    state.searching = true;
    while (!current.error && current.loadedChunks < current.category.manifests.length) {
      await loadNextChunk(current);
    }
    state.searching = false;
    render();
  }

  async function chooseCategory(categoryId) {
    if (state.activeId === categoryId && activeState()?.loadedChunks) return;
    state.activeId = categoryId;
    state.visibleCount = PAGE_SIZE;
    state.query = "";
    elements.input.value = "";
    renderCategories();
    render();
    const current = activeState();
    if (current?.loadedChunks === 0) await loadNextChunk(current);
  }

  async function initialize() {
    if (state.summary || state.initializing) return;
    state.initializing = true;
    try {
      const response = await fetch(SUMMARY_URL, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Request failed with status ${response.status}.`);
      state.summary = await response.json();
      for (const category of state.summary.categories) categoryState(category);
      renderCategories();
      setBusy(false);
      await loadNextChunk(activeState());
    } catch (error) {
      elements.categories.setAttribute("aria-busy", "false");
      elements.categories.textContent = "Category index unavailable.";
      elements.status.textContent = error instanceof Error ? error.message : "The catalog summary could not be loaded.";
      elements.retry.hidden = false;
    } finally {
      state.initializing = false;
    }
  }

  elements.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = elements.input.value.trim();
    if (query.length < 2) {
      elements.status.textContent = "Enter at least two characters to search.";
      elements.input.focus();
      return;
    }
    state.query = query;
    state.visibleCount = PAGE_SIZE;
    const current = activeState();
    if (current) await loadAllChunks(current);
  });

  elements.input.addEventListener("input", () => {
    if (elements.input.value.trim()) return;
    state.query = "";
    state.visibleCount = PAGE_SIZE;
    render();
  });

  elements.loadMore.addEventListener("click", async () => {
    const current = activeState();
    if (!current) return;
    const matches = filteredAssets(current);
    if (state.visibleCount < matches.length) {
      state.visibleCount += PAGE_SIZE;
      render();
      return;
    }
    await loadNextChunk(current);
    state.visibleCount += PAGE_SIZE;
    render();
  });

  elements.retry.addEventListener("click", async () => {
    if (!state.summary) {
      elements.retry.hidden = true;
      await initialize();
      return;
    }
    const current = activeState();
    current.error = "";
    await loadNextChunk(current);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        void initialize();
      }
    }, { rootMargin: "640px 0px" });
    observer.observe(elements.section);
  } else {
    void initialize();
  }
})();

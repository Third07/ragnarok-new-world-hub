/* eslint-disable @next/next/no-img-element -- Direct local image URLs are the downloadable catalog products. */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./asset-library.module.css";

export type CreatorAsset = {
  id: string;
  name: string;
  image: string;
  kind: string;
  source: string;
  downloadName: string;
  aliases?: string[];
};

export type CreatorAssetCategory = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  source: string;
  count: number;
  manifests: string[];
};

export type CreatorAssetSummary = {
  total: number;
  categories: CreatorAssetCategory[];
};

type CatalogPayload = {
  category: string;
  assets: CreatorAsset[];
};

const PAGE_SIZE = 48;

function uniqueAssets(assets: CreatorAsset[]) {
  const seen = new Set<string>();
  return assets.filter((asset) => {
    if (seen.has(asset.image)) return false;
    seen.add(asset.image);
    return true;
  });
}

function formatName(image: string) {
  return image.split("/").pop() || "image.webp";
}

export default function AssetLibrary({
  summary,
  previews,
}: {
  summary: CreatorAssetSummary;
  previews: Record<string, CreatorAsset[]>;
}) {
  const [activeCategory, setActiveCategory] = useState("skills");
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<Record<string, CreatorAsset[]>>(previews);
  const [loadedCategories, setLoadedCategories] = useState<Set<string>>(() => new Set());
  const [loadingCategories, setLoadingCategories] = useState<Set<string>>(() => new Set());
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loadError, setLoadError] = useState("");
  const pendingRequests = useRef(new Map<string, Promise<void>>());

  const categoryMap = useMemo(
    () => new Map(summary.categories.map((category) => [category.id, category])),
    [summary.categories],
  );

  const loadCategory = useCallback((categoryId: string) => {
    if (loadedCategories.has(categoryId)) return Promise.resolve();
    const pending = pendingRequests.current.get(categoryId);
    if (pending) return pending;

    const category = categoryMap.get(categoryId);
    if (!category) return Promise.resolve();

    setLoadError("");
    setLoadingCategories((current) => new Set(current).add(categoryId));
    const request = Promise.all(
      category.manifests.map((manifest) => fetch(manifest).then((response) => {
        if (!response.ok) throw new Error(`Could not load ${category.label.toLowerCase()}.`);
        return response.json() as Promise<CatalogPayload>;
      })),
    )
      .then((payloads) => {
        setCatalog((current) => ({
          ...current,
          [categoryId]: payloads.flatMap((payload) => payload.assets),
        }));
        setLoadedCategories((current) => new Set(current).add(categoryId));
      })
      .catch((error: unknown) => {
        setLoadError(error instanceof Error ? error.message : "The asset list could not be loaded.");
      })
      .finally(() => {
        pendingRequests.current.delete(categoryId);
        setLoadingCategories((current) => {
          const next = new Set(current);
          next.delete(categoryId);
          return next;
        });
      });

    pendingRequests.current.set(categoryId, request);
    return request;
  }, [categoryMap, loadedCategories]);

  const loadAll = useCallback(
    () => Promise.all(summary.categories.map((category) => loadCategory(category.id))),
    [loadCategory, summary.categories],
  );

  useEffect(() => {
    if (query.trim().length < 2) return;
    const timer = window.setTimeout(() => {
      if (activeCategory === "all") void loadAll();
      else void loadCategory(activeCategory);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [activeCategory, loadAll, loadCategory, query]);

  const activeAssets = useMemo(() => {
    const assets = activeCategory === "all"
      ? summary.categories.flatMap((category) => catalog[category.id] || [])
      : catalog[activeCategory] || [];
    return uniqueAssets(assets);
  }, [activeCategory, catalog, summary.categories]);

  const filteredAssets = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return activeAssets;
    return activeAssets.filter((asset) => [
      asset.name,
      asset.kind,
      asset.image,
      ...(asset.aliases || []),
    ].join(" ").toLowerCase().includes(needle));
  }, [activeAssets, query]);

  const isFullyLoaded = activeCategory === "all"
    ? summary.categories.every((category) => loadedCategories.has(category.id))
    : loadedCategories.has(activeCategory);
  const isLoading = loadingCategories.size > 0;
  const activeSummary = categoryMap.get(activeCategory);
  const knownTotal = activeCategory === "all" ? summary.total : activeSummary?.count || 0;
  const visibleAssets = filteredAssets.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAssets.length || (!isFullyLoaded && knownTotal > filteredAssets.length);

  function chooseCategory(categoryId: string) {
    setActiveCategory(categoryId);
    setVisibleCount(PAGE_SIZE);
    setLoadError("");
    if (categoryId === "all") void loadAll();
    else void loadCategory(categoryId);
  }

  async function showMore() {
    if (!isFullyLoaded) {
      if (activeCategory === "all") await loadAll();
      else await loadCategory(activeCategory);
    }
    setVisibleCount((current) => current + PAGE_SIZE);
  }

  const statusText = isLoading
    ? `Loading the full ${activeCategory === "all" ? "asset library" : activeSummary?.label.toLowerCase() || "category"}…`
    : query.trim()
      ? `${filteredAssets.length.toLocaleString()} matching image${filteredAssets.length === 1 ? "" : "s"}`
      : isFullyLoaded
        ? `${filteredAssets.length.toLocaleString()} image${filteredAssets.length === 1 ? "" : "s"} in this view`
        : `Previewing ${filteredAssets.length.toLocaleString()} of ${knownTotal.toLocaleString()} images`;

  return (
    <div className={styles.vault}>
      <div className={styles.categoryRail} aria-label="Asset categories">
        <button
          type="button"
          className={activeCategory === "all" ? styles.categoryActive : styles.categoryButton}
          aria-pressed={activeCategory === "all"}
          onClick={() => chooseCategory("all")}
        >
          <span>All assets</span>
          <strong>{summary.total.toLocaleString()}</strong>
        </button>
        {summary.categories.map((category) => (
          <button
            type="button"
            className={activeCategory === category.id ? styles.categoryActive : styles.categoryButton}
            aria-pressed={activeCategory === category.id}
            key={category.id}
            onClick={() => chooseCategory(category.id)}
          >
            <span>{category.shortLabel}</span>
            <strong>{category.count.toLocaleString()}</strong>
          </button>
        ))}
      </div>

      <div className={styles.searchBar}>
        <label htmlFor="creator-asset-search">Search this asset library</label>
        <div className={styles.searchInputWrap}>
          <span aria-hidden="true">⌕</span>
          <input
            id="creator-asset-search"
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisibleCount(PAGE_SIZE);
            }}
            placeholder="Try Napalm Vulcan, Amon Ra, staff, Poring…"
            autoComplete="off"
          />
          {query ? <button type="button" onClick={() => setQuery("")}>Clear</button> : null}
        </div>
        <div className={styles.searchMeta}>
          <p aria-live="polite">{statusText}</p>
          {activeSummary ? <a href={activeSummary.source}>Open the {activeSummary.shortLabel} database →</a> : null}
        </div>
      </div>

      {loadError ? (
        <div className={styles.error} role="alert">
          <strong>Asset list unavailable.</strong> {loadError} Try another category or reload the page.
        </div>
      ) : null}

      <div className={styles.assetGrid} aria-busy={isLoading}>
        {visibleAssets.map((asset) => (
          <article className={styles.assetItem} key={asset.image}>
            <a className={styles.assetPreview} href={asset.image} target="_blank" rel="noreferrer">
              <img src={asset.image} alt={`${asset.name} image`} width="160" height="160" loading="lazy" decoding="async" />
            </a>
            <div className={styles.assetInfo}>
              <span>{asset.kind}</span>
              <h3 title={asset.name}>{asset.name}</h3>
              <code title={formatName(asset.image)}>{formatName(asset.image)}</code>
              <div className={styles.assetActions}>
                <a href={asset.image} download={asset.downloadName}>Download</a>
                <a href={asset.source}>Database</a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!isLoading && isFullyLoaded && filteredAssets.length === 0 ? (
        <div className={styles.emptyState}>
          <strong>No matching image.</strong>
          <p>Try a shorter game name, switch categories, or search the original filename.</p>
        </div>
      ) : null}

      {hasMore ? (
        <button className={styles.loadMore} type="button" onClick={() => void showMore()} disabled={isLoading}>
          {isLoading
            ? "Loading assets…"
            : isFullyLoaded
              ? `Show ${Math.min(PAGE_SIZE, filteredAssets.length - visibleCount).toLocaleString()} more`
              : `Load all ${knownTotal.toLocaleString()} images`}
        </button>
      ) : null}
    </div>
  );
}

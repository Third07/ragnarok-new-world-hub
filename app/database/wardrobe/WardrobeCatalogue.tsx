"use client";

import { useEffect, useMemo, useState } from "react";
import browserStyles from "../../data-browser.module.css";
import styles from "./wardrobe.module.css";

type Item = { id: number; name: string; categoryId: number; category: string; gender: string; jobId: number | null; dyeable: boolean; highlights: boolean; image: string };
type Catalogue = { items: Item[]; categories: { id: number; name: string }[]; jobs: { id: number; name: string }[] };
const defaults = { q: "", category: "", gender: "", job: "", dye: "" };
type Filters = typeof defaults;
const PAGE_SIZE = 36;

export default function WardrobeCatalogue() {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [filters, setFilters] = useState<Filters>(defaults);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    const restore = () => {
      const params = new URLSearchParams(window.location.search);
      setFilters(Object.fromEntries(Object.keys(defaults).map(key => [key, (params.get(key) || "").slice(0, 160)])) as Filters);
      setLimit(PAGE_SIZE);
    };
    restore(); setReady(true);
    window.addEventListener("popstate", restore);
    const controller = new AbortController();
    fetch("/sea/wardrobe/data/wardrobe_index_en-US.json", { signal: controller.signal, cache: "no-cache" }).then(async response => {
      if (!response.ok) throw new Error("The Wardrobe catalogue could not load. Please reload to try again.");
      const data = await response.json();
      if (!Array.isArray(data.items) || !Array.isArray(data.categories) || !Array.isArray(data.jobs)) throw new Error("Wardrobe data is temporarily unavailable.");
      setCatalogue(data);
    }).catch(reason => { if (!controller.signal.aborted) setError(reason.message); });
    return () => { controller.abort(); window.removeEventListener("popstate", restore); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(filters)) value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, [filters, ready]);

  const results = useMemo(() => {
    const query = filters.q.trim().toLowerCase();
    return (catalogue?.items || []).filter(item =>
      (!query || `${item.name} ${item.category} ${item.id}`.toLowerCase().includes(query)) &&
      (!filters.category || String(item.categoryId) === filters.category) &&
      (!filters.gender || item.gender === "any" || item.gender === filters.gender) &&
      (!filters.job || !item.jobId || String(item.jobId) === filters.job) &&
      (!filters.dye || item.dyeable)
    );
  }, [catalogue, filters]);

  function update(key: keyof Filters, value: string) {
    setFilters(current => ({ ...current, [key]: value })); setLimit(PAGE_SIZE); setCopyStatus("");
  }
  function reset() { setFilters(defaults); setLimit(PAGE_SIZE); setCopyStatus(""); }
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setCopyStatus("Filter link copied."); }
    catch { setCopyStatus("Copy the page address from your browser to share these filters."); }
  }

  return <div className={styles.catalogue}>
    <div className={browserStyles.filters}>
      <div className={`${browserStyles.filter} ${browserStyles.filterWide}`}><label htmlFor="wardrobe-search">Search name, category, or ID</label><input id="wardrobe-search" type="search" value={filters.q} onChange={event => update("q", event.target.value)} placeholder="Try bunny, hairstyle, or mount…" /></div>
      <div className={browserStyles.filter}><label htmlFor="wardrobe-category">Category</label><select id="wardrobe-category" value={filters.category} onChange={event => update("category", event.target.value)}><option value="">All categories</option>{catalogue?.categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
      <div className={browserStyles.filter}><label htmlFor="wardrobe-gender">Gender</label><select id="wardrobe-gender" value={filters.gender} onChange={event => update("gender", event.target.value)}><option value="">All genders</option><option value="male">Male + unrestricted</option><option value="female">Female + unrestricted</option></select></div>
      <div className={browserStyles.filter}><label htmlFor="wardrobe-job">Job</label><select id="wardrobe-job" value={filters.job} onChange={event => update("job", event.target.value)}><option value="">All jobs</option>{catalogue?.jobs.map(job => <option key={job.id} value={job.id}>{job.name}</option>)}</select></div>
      <label className={styles.check}><input type="checkbox" checked={Boolean(filters.dye)} onChange={event => update("dye", event.target.checked ? "1" : "")} /> Dyeable items only</label>
    </div>
    <div className={browserStyles.toolbar}><button type="button" onClick={copyLink}>Copy filter link</button><button type="button" className={browserStyles.secondary} onClick={reset}>Reset filters</button><p role="status">{copyStatus}</p></div>
    {error ? <p className={browserStyles.error} role="alert">{error}</p> : !catalogue ? <p className={browserStyles.loading} role="status">Loading the Wardrobe catalogue…</p> : <>
      <p className={styles.count} role="status">{results.length.toLocaleString()} of {catalogue.items.length.toLocaleString()} items · Showing {Math.min(limit, results.length).toLocaleString()}</p>
      {!results.length && <p className={browserStyles.empty}>No matching items. Try another name or reset the filters.</p>}
      <div className={styles.grid}>
        {results.slice(0, limit).map(item => <article className={styles.card} key={item.id}>
          <img src={item.image} alt={item.name} width={96} height={96} loading="lazy" decoding="async" onError={event => { const image = event.currentTarget; if (image.dataset.fallback) return; image.dataset.fallback = "true"; image.src = "/media/images/zhujiemian/icon_zhujiemian_jingji.webp"; }} />
          <div><p className={styles.category}>{item.category}</p><h2>{item.name}</h2><p className={styles.details}>#{item.id} · {item.gender === "any" ? "Any gender" : item.gender === "male" ? "Male" : "Female"}</p>
            {item.jobId && <p className={styles.details}>{catalogue.jobs.find(job => job.id === item.jobId)?.name || `Job ${item.jobId}`}</p>}
            <div className={styles.tags}>{item.dyeable && <span>Dyeable</span>}{item.highlights && <span>Highlights</span>}</div>
          </div>
        </article>)}
      </div>
      {results.length > limit && <div className={browserStyles.toolbar}><button type="button" onClick={() => setLimit(current => current + PAGE_SIZE)}>Show more items</button></div>}
    </>}
  </div>;
}

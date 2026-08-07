"use client";

import { useEffect, useMemo, useState } from "react";
import browserStyles from "../../data-browser.module.css";

type UnknownRecord = Record<string, unknown>;

type Monster = {
  id: string;
  name: string;
  level: number;
  type: string;
  race: string;
  element: string;
  size: string;
  mapIds: string[];
  image: string;
};

const DEFAULT_IMAGE = "/media/images/zhujiemian/icon_zhujiemian_fuben.webp";

function record(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : {};
}

function label(value: unknown) {
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  const source = record(value);
  return label(source.name || source.label || source.title || "");
}

function monstersFromPayload(value: unknown): UnknownRecord[] {
  if (Array.isArray(value)) return value.filter((item): item is UnknownRecord => Boolean(item && typeof item === "object"));
  const source = record(value);
  for (const key of ["monsters", "items", "data"]) {
    const items = source[key];
    if (Array.isArray(items)) return items.filter((item): item is UnknownRecord => Boolean(item && typeof item === "object"));
  }
  return [];
}

function imagePath(value: unknown, id: string) {
  const path = label(value);
  if (!path) return `/media/images/monster/${id}.webp`;
  if (path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.includes("/")) return `/${path.replace(/^\/+/, "")}`;
  return `/media/images/monster/${path.replace(/\.png$/i, ".webp")}`;
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b));
}

function monsterIdentity(monster: Monster) {
  return [
    monster.name.trim().toLowerCase(),
    monster.level,
    monster.type.trim().toLowerCase(),
    monster.race.trim().toLowerCase(),
    monster.element.trim().toLowerCase(),
    monster.size.trim().toLowerCase(),
  ].join("|");
}

function dedupeMonsters(monsters: Monster[]) {
  const merged = new Map<string, Monster>();

  for (const monster of monsters) {
    const key = monsterIdentity(monster);
    const current = merged.get(key);
    if (!current) {
      merged.set(key, monster);
      continue;
    }

    const mapIds = unique([...current.mapIds, ...monster.mapIds]);
    const currentUsesFallback = current.image.includes(`/monster/${current.id}.webp`);
    const nextUsesFallback = monster.image.includes(`/monster/${monster.id}.webp`);
    merged.set(key, {
      ...current,
      mapIds,
      image: currentUsesFallback && !nextUsesFallback ? monster.image : current.image,
    });
  }

  return Array.from(merged.values());
}

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export default function FarmingTargetFinder() {
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [query, setQuery] = useState("");
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(200);
  const [type, setType] = useState("");
  const [race, setRace] = useState("");
  const [element, setElement] = useState("");
  const [size, setSize] = useState("");
  const [mappedOnly, setMappedOnly] = useState(false);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    setMinLevel(Math.max(1, Number(params.get("min")) || 1));
    setMaxLevel(Math.max(1, Number(params.get("max")) || 200));
    setType(params.get("type") || "");
    setRace(params.get("race") || "");
    setElement(params.get("element") || "");
    setSize(params.get("size") || "");
    setMappedOnly(params.get("mapped") === "1");
    setReady(true);

    fetch("/sea/monster-album/data/monster_index_en-US.json")
      .then((response) => {
        if (!response.ok) throw new Error(`Monster index returned ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        const normalized = dedupeMonsters(
          monstersFromPayload(payload)
            .filter((item) => Boolean(item.is_handbook))
            .map((item, index): Monster => {
              const id = label(item.id) || String(index);
              const maps = Array.isArray(item.mapIds)
                ? item.mapIds.map(label).filter(Boolean)
                : Array.isArray(item.maps)
                  ? item.maps.map((map) => label(record(map).id || map)).filter(Boolean)
                  : [];
              return {
                id,
                name: label(item.name) || `Monster ${id}`,
                level: Number(item.level) || 0,
                type: label(item.type),
                race: label(item.race),
                element: label(item.element),
                size: label(item.body ?? item.size),
                mapIds: maps,
                image: imagePath(item.thumbnail || item.image, id),
              };
            }),
        );
        setMonsters(normalized);
        const highest = normalized.reduce((max, monster) => Math.max(max, monster.level), 1);
        if (!params.has("max")) setMaxLevel(Math.max(200, highest));
        setLoading(false);
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : "The monster index could not be loaded.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const url = new URL(window.location.href);
    url.search = "";
    if (query.trim()) url.searchParams.set("q", query.trim());
    if (minLevel !== 1) url.searchParams.set("min", String(minLevel));
    if (maxLevel !== 200) url.searchParams.set("max", String(maxLevel));
    if (type) url.searchParams.set("type", type);
    if (race) url.searchParams.set("race", race);
    if (element) url.searchParams.set("element", element);
    if (size) url.searchParams.set("size", size);
    if (mappedOnly) url.searchParams.set("mapped", "1");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [element, mappedOnly, maxLevel, minLevel, query, race, ready, size, type]);

  const options = useMemo(() => ({
    types: unique(monsters.map((monster) => monster.type)),
    races: unique(monsters.map((monster) => monster.race)),
    elements: unique(monsters.map((monster) => monster.element)),
    sizes: unique(monsters.map((monster) => monster.size)),
  }), [monsters]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return monsters
      .filter((monster) => {
        if (normalized && !`${monster.name} ${monster.type} ${monster.race} ${monster.element} ${monster.size}`.toLowerCase().includes(normalized)) return false;
        if (monster.level < Math.min(minLevel, maxLevel) || monster.level > Math.max(minLevel, maxLevel)) return false;
        if (type && monster.type !== type) return false;
        if (race && monster.race !== race) return false;
        if (element && monster.element !== element) return false;
        if (size && monster.size !== size) return false;
        if (mappedOnly && monster.mapIds.length === 0) return false;
        return true;
      })
      .sort((a, b) => a.level - b.level || a.name.localeCompare(b.name));
  }, [element, mappedOnly, maxLevel, minLevel, monsters, query, race, size, type]);

  const reset = () => {
    setQuery("");
    setMinLevel(1);
    setMaxLevel(200);
    setType("");
    setRace("");
    setElement("");
    setSize("");
    setMappedOnly(false);
    setStatus("Filters reset.");
  };

  const copyFilters = async () => {
    try {
      await copyText(window.location.href);
      setStatus("Filtered result link copied.");
    } catch {
      setStatus("The browser could not copy the link.");
    }
  };

  return (
    <div>
      <div className={browserStyles.filters}>
        <div className={`${browserStyles.filter} ${browserStyles.filterWide}`}>
          <label htmlFor="monster-query">Monster name or attribute</label>
          <input id="monster-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Example: Poring, fire, demon, MVP…" />
        </div>
        <div className={browserStyles.filter}>
          <label htmlFor="min-level">Minimum level</label>
          <input id="min-level" type="number" min="1" value={minLevel} onChange={(event) => setMinLevel(Math.max(1, Number(event.target.value) || 1))} />
        </div>
        <div className={browserStyles.filter}>
          <label htmlFor="max-level">Maximum level</label>
          <input id="max-level" type="number" min="1" value={maxLevel} onChange={(event) => setMaxLevel(Math.max(1, Number(event.target.value) || 1))} />
        </div>
        <div className={browserStyles.filter}>
          <label htmlFor="monster-type">Monster type</label>
          <select id="monster-type" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="">All types</option>
            {options.types.map((option) => <option value={option} key={option}>{option}</option>)}
          </select>
        </div>
        <div className={browserStyles.filter}>
          <label htmlFor="monster-race">Race</label>
          <select id="monster-race" value={race} onChange={(event) => setRace(event.target.value)}>
            <option value="">All races</option>
            {options.races.map((option) => <option value={option} key={option}>{option}</option>)}
          </select>
        </div>
        <div className={browserStyles.filter}>
          <label htmlFor="monster-element">Element</label>
          <select id="monster-element" value={element} onChange={(event) => setElement(event.target.value)}>
            <option value="">All elements</option>
            {options.elements.map((option) => <option value={option} key={option}>{option}</option>)}
          </select>
        </div>
        <div className={browserStyles.filter}>
          <label htmlFor="monster-size">Size</label>
          <select id="monster-size" value={size} onChange={(event) => setSize(event.target.value)}>
            <option value="">All sizes</option>
            {options.sizes.map((option) => <option value={option} key={option}>{option}</option>)}
          </select>
        </div>
        <div className={browserStyles.filter}>
          <label htmlFor="mapped-only">Map availability</label>
          <select id="mapped-only" value={mappedOnly ? "1" : "0"} onChange={(event) => setMappedOnly(event.target.value === "1")}>
            <option value="0">All records</option>
            <option value="1">Has map data</option>
          </select>
        </div>
      </div>

      <div className={browserStyles.toolbar}>
        <button type="button" onClick={copyFilters}>Copy filtered link</button>
        <button className={browserStyles.secondary} type="button" onClick={reset}>Reset filters</button>
        <p aria-live="polite">{status}</p>
      </div>

      {loading && <div className={browserStyles.loading}>Loading the committed English monster index…</div>}
      {error && <div className={browserStyles.error}>{error}</div>}
      {!loading && !error && (
        <>
          <p className={browserStyles.summary} aria-live="polite">
            {filtered.length.toLocaleString()} target{filtered.length === 1 ? "" : "s"} match the current filters. Showing the first {Math.min(filtered.length, 72)}.
          </p>
          {filtered.length === 0 ? (
            <div className={browserStyles.empty}>No monster matches this combination. Broaden the level range or remove one attribute filter.</div>
          ) : (
            <div className={browserStyles.monsterGrid}>
              {filtered.slice(0, 72).map((monster) => (
                <article className={browserStyles.monsterCard} key={monster.id}>
                  <div className={browserStyles.monsterTop}>
                    <img
                      className={browserStyles.monsterImage}
                      src={monster.image}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = DEFAULT_IMAGE;
                      }}
                    />
                    <div>
                      <h2>{monster.name}</h2>
                      <p>Level {monster.level || "—"} · {monster.mapIds.length || 0} mapped location{monster.mapIds.length === 1 ? "" : "s"}</p>
                    </div>
                  </div>
                  <div className={browserStyles.chips}>
                    {[monster.type, monster.race, monster.element, monster.size].filter(Boolean).map((value) => (
                      <span className={browserStyles.chip} key={value}>{value}</span>
                    ))}
                  </div>
                  <div className={browserStyles.monsterActions}>
                    <a href={`/sea/monster_album/#showAll=1&monsterId=${encodeURIComponent(monster.id)}`}>Monster details</a>
                    <a href={monster.mapIds[0] ? `/sea/maps/?lang=en-US#map=${encodeURIComponent(monster.mapIds[0])}` : "/sea/maps/?lang=en-US#map=101"}>
                      {monster.mapIds[0] ? "Open first map" : "Open World Map"}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

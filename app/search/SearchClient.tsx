"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import browserStyles from "../data-browser.module.css";

type UnknownRecord = Record<string, unknown>;

type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon?: string;
  icons?: string[];
  fallback: string;
};

type SearchGroup = {
  name: string;
  results: SearchResult[];
  total: number;
};

const STATIC_PAGES: SearchResult[] = [
  { id: "guide-library", title: "All Ragnarok: The New World Guides", description: "Class builds, beginner progression, farming, equipment, PC setup, emulators, cloud gaming, and safe top-ups.", href: "/guides/", icon: "/media/images/zhujiemian/icon_zhujiemian_shitu.webp", fallback: "G" },
  { id: "database", title: "Ragnarok: The New World Database", description: "Browse the RTNW monster, card, equipment, pet, map, shop, quiz, and build-planning databases from one hub.", href: "/database/", icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp", fallback: "D" },
  { id: "updates", title: "RTNW Hub Updates", description: "New guides, tools, database changes, and recently updated site resources.", href: "/updates/", icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp", fallback: "U" },
  { id: "redeem-codes", title: "Ragnarok: The New World Redeem Codes", description: "Shared gift codes, disputed reports, promo rewards, partner expiry dates, copy buttons, and mobile or PC redemption steps.", href: "/guides/redeem-codes/", icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp", fallback: "C" },
  { id: "creator-kit", title: "RTNW Creator Asset Library", description: "Find skill icons, card art, weapons, monsters, pets and maps for videos, thumbnails and guides.", href: "/creator-kit/", icon: "/icon-192.png", fallback: "C" },
  { id: "guild-management", title: "Guild Management Guide", description: "Plan members, fixed teams, weekly events, guild buildings, officer roles, and auction rules.", href: "/guides/guild-management/", icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp", fallback: "G" },
  { id: "guild-league", title: "Guild League Guide", description: "Check the schedule, tiers, battlefield roles, command skills, lineup planning, and GVG strategy.", href: "/guides/guild-league/", icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp", fallback: "G" },
  { id: "polarity-zone", title: "Polarity Zone Guide", description: "Prepare Zone Elites, Common Dungeons, boss counters, and Goblin Leader, Eddga, and Baphomet mechanics.", href: "/guides/polarity-zone/", icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp", fallback: "P" },
  { id: "hazy-forest", title: "Hazy Forest Guide", description: "Plan the weekly score route, battle cooldowns, treasure phases, and Element, Race, and Size counters.", href: "/guides/hazy-forest/", icon: "/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp", fallback: "H" },
  { id: "swordman-builds", title: "Swordsman and Knight Build Guide", description: "Compare VIT Tank, AGI Sword, and Spear Knight stats, traits, cards, and rotations.", href: "/guides/swordman-builds/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "S" },
  { id: "lord-knight-builds", title: "Lord Knight Advanced Build Guide", description: "Plan Tank, AGI Sword, and Spear Lord Knight skills, level-70 traits, runes, cards, and rotations.", href: "/guides/lord-knight-builds/", icon: "/assets/guides/lord-knight-builds/lord-knight-hero.webp", fallback: "L" },
  { id: "mage-builds", title: "Mage and Wizard Build Guide", description: "Compare Fire–Earth and Ice–Lightning stats, traits, cards, cast targets, and rotations.", href: "/guides/mage-builds/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "M" },
  { id: "high-wizard-builds", title: "High Wizard Advanced Build Guide", description: "Compare Fire–Earth, Ice–Lightning, and Ghost High Wizard skills, traits, runes, cards, and casts.", href: "/guides/high-wizard-builds/", icon: "/assets/guides/mage-builds/mage-hero.webp", fallback: "H" },
  { id: "archer-builds", title: "Archer and Hunter Build Guide", description: "Compare ADL, Pet, and Trap Hunter stats, traits, cards, ASPD planning, and boss positioning.", href: "/guides/archer-builds/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "A" },
  { id: "sniper-builds", title: "Sniper Advanced Build Guide", description: "Build ADL, Falcon, or Trap Sniper with advanced skills, stats, traits, resonance, cards, and positioning.", href: "/guides/sniper-builds/", icon: "/assets/guides/sniper-builds/sniper-hero.webp", fallback: "S" },
  { id: "acolyte-builds", title: "Acolyte and Priest Build Guide", description: "Compare Support, Exorcist, and AGI-Crit Priest stats, healing traits, cards, and rotations.", href: "/guides/acolyte-builds/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "A" },
  { id: "high-priest-builds", title: "High Priest Advanced Build Guide", description: "Build Support, Battle, or Exorcist High Priest with healing, Holy damage, traits, runes, and cards.", href: "/guides/high-priest-builds/", icon: "/assets/guides/high-priest-builds/high-priest-hero.webp", fallback: "H" },
  { id: "thief-builds", title: "Thief and Assassin Build Guide", description: "Compare Dual Dagger, Critical Katar, and Venom Assassin stats, traits, cards, and boss matchups.", href: "/guides/thief-builds/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "T" },
  { id: "assassin-cross-builds", title: "Assassin Cross Advanced Build Guide", description: "Compare Dual Dagger, Critical Katar, Poison, and Soul Destroyer advanced builds for PVE and PVP.", href: "/guides/assassin-cross-builds/", icon: "/assets/guides/assassin-cross-builds/assassin-cross-hero.webp", fallback: "A" },
  { id: "merchant-builds", title: "Merchant Build Guide", description: "Compare Cart, Axe Throwing, and Turret builds with stats, traits, cards, and party utility.", href: "/guides/merchant-builds/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "M" },
  { id: "whitesmith-builds", title: "Whitesmith Advanced Build Guide", description: "Build Axe, Turret, or Cart Whitesmith with advanced skills, traits, party buffs, runes, and cards.", href: "/guides/whitesmith-builds/", icon: "/assets/guides/whitesmith-builds/whitesmith-hero.webp", fallback: "W" },
  { id: "gunslinger-builds", title: "Gunslinger Build Guide", description: "Compare Pistol, Gatling Gun, Rifle, and Shotgun stats, traits, bullets, cards, and rotations.", href: "/guides/gunslinger-builds/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "G" },
  { id: "night-walker-builds", title: "Night Walker Advanced Build Guide", description: "Plan Pistol, Machine Gun, Rifle, or Shotgun Night Walker skills, traits, runes, cards, and roles.", href: "/guides/night-walker-builds/", icon: "/assets/guides/night-walker-builds/night-walker-hero.webp", fallback: "N" },
  { id: "class-tier-list", title: "Class Tier List: F2P, PvE and PvP", description: "Compare RTNW class families by activity and budget instead of using one ranking for every player.", href: "/guides/class-tier-list/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "C" },
  { id: "monk-build", title: "Released Monk Build Guide", description: "Build Combo, Guillotine Fist, ranged, or PVP Monk around Spirit Spheres, Fury, mobility, and defensive skills.", href: "/guides/monk-build/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "M" },
  { id: "beginner-progression", title: "Beginner Progression Guide", description: "A first-hours and first-week route with F2P priorities and daily progression decisions.", href: "/guides/beginner-progression/", icon: "/media/images/zhujiemian/icon_zhujiemian_shitu.webp", fallback: "B" },
  { id: "druid-builds", title: "Druid Builds", description: "Werewolf, Wereraptor, and Human Arcanist build directions for PvE, PvP, and F2P progression.", href: "/guides/druid-builds/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "D" },
  { id: "refining", title: "Refining and Equipment Guide", description: "Plan equipment choices, refine checkpoints, priority slots, and upgrade spending.", href: "/guides/refining-equipment/", icon: "/media/images/zhujiemian/icon_zhujiemian_qianghua.webp", fallback: "R" },
  { id: "farming-guide", title: "Card Drop Gauge and Farming Guide", description: "Calculate green, blue, and purple card gauges for the 600-monster mode, then use monsters, cards, and maps to choose useful targets.", href: "/guides/farming-card-progression/", icon: "/assets/guides/farming-card-progression/card-gauge-farming-hero-800.webp", fallback: "F" },
  { id: "mvp-hunting-guide", title: "MVP Hunting Guide and Locations", description: "Compare 20 mapped MVP records by level, map, element, race, size, and marker coverage, then prepare the party.", href: "/guides/mvp-hunting/", icon: "/media/images/activity/icon_activity_mvp.webp", fallback: "M" },
  { id: "zeny-farming-guide", title: "Zeny Farming Guide and Calculator", description: "Compare Zeny routes, Life Jobs, Trading Post sales, costs, and actual net session income without invented rates.", href: "/guides/zeny-farming/", icon: "/media/images/item/icon_item_currency2_zeny_01.webp", fallback: "Z" },
  { id: "pc-guide", title: "How to Play Ragnarok: The New World on PC", description: "Compare the official PC route, Android emulators, and cloud play with installation guidance.", href: "/guides/play-on-pc/", icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp", fallback: "P" },
  { id: "emulator-guide", title: "Best Emulator Settings", description: "Virtualization, CPU, RAM, renderer, FPS, controls, black-screen fixes, and crash troubleshooting.", href: "/guides/emulator-settings/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "E" },
  { id: "top-up-guide", title: "Safe Top-Up Guide", description: "Payment-route checks, account protection, final-fee comparison, receipts, and scam warning signs.", href: "/guides/top-up-safely/", icon: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp", fallback: "T" },
  { id: "cloud-guide", title: "Cloud Gaming Guide", description: "Compare cloud Android, catalogue streaming, and your own remotely streamed PC.", href: "/guides/cloud-gaming/", icon: "/media/images/zhujiemian/icon_zhujiemian_tianqixingchen.webp", fallback: "C" },
  { id: "redfinger-guide", title: "Redfinger Cloud Phone Guide", description: "Play Ragnarok: The New World with Redfinger. Android, iPhone, Windows, Mac and browser setup, plans and lag fixes.", href: "/guides/redfinger-cloud-phone/", icon: "/media/images/zhujiemian/icon_zhujiemian_tianqixingchen.webp", fallback: "R" },
  { id: "skill-planner", title: "Skill Planner", description: "Create and compare Ragnarok: The New World class skill builds.", href: "/sea/skill_planner/", icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp", fallback: "S" },
  { id: "world-map", title: "Interactive World Map", description: "Find butterfly and bubble locations, weather chests, snow, monsters, quests, and landmarks.", href: "/sea/maps/?lang=en-US#map=101", icon: "/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp", fallback: "M" },
  { id: "wardrobe", title: "Wardrobe Database", description: "Search outfits, hairstyles, headwear, mounts, cosmetics, gender and job restrictions, and dye support.", href: "/database/wardrobe/", icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp", fallback: "W" },
  { id: "monster-index", title: "Monster Database", description: "Search monster levels, types, races, elements, sizes, habitats, and drops.", href: "/sea/monster_album/", icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp", fallback: "M" },
  { id: "card-index", title: "Card Database", description: "Search cards, effects, equipment slots, fusion data, and obtain sources.", href: "/sea/cards/", icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp", fallback: "C" },
  { id: "equipment-index", title: "Equipment Database", description: "Search weapons, armor, accessories, item descriptions, stats, and set effects.", href: "/sea/equipment/", icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp", fallback: "E" },
  { id: "pc-checker", title: "PC Setup Checker", description: "Compare Steam, emulator, and cloud routes using your hardware and priorities.", href: "/tools/pc-setup-checker/", icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp", fallback: "P" },
  { id: "topup-calculator", title: "Top-Up Cost Calculator", description: "Calculate quantity, discounts, percentage fees, fixed charges, and effective package cost.", href: "/tools/top-up-calculator/", icon: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp", fallback: "T" },
  { id: "farming-finder", title: "Farming Target Finder", description: "Filter the RTNW monster database by level, type, race, element, size, and map availability.", href: "/tools/farming-target-finder/", icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp", fallback: "F" },
];

function record(value: unknown): UnknownRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? value as UnknownRecord : {};
}

function arrayPayload(value: unknown, keys: string[]) {
  if (Array.isArray(value)) return value.filter((item): item is UnknownRecord => Boolean(item && typeof item === "object"));
  const source = record(value);
  for (const key of keys) {
    const items = source[key];
    if (Array.isArray(items)) return items.filter((item): item is UnknownRecord => Boolean(item && typeof item === "object"));
  }
  return [];
}

function text(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  const source = record(value);
  return text(source.name || source.label || source.title || "");
}

function compact(value: string, length = 150) {
  const normalized = value.replace(/\s+/g, " ").trim();
  return normalized.length > length ? `${normalized.slice(0, length - 1)}…` : normalized;
}

function searchable(values: unknown[]) {
  return values.flatMap((value) => {
    if (Array.isArray(value)) return value.map(text);
    if (value && typeof value === "object") return Object.values(record(value)).map(text);
    return [text(value)];
  }).join(" ").toLowerCase();
}

function uniqueBy<T>(items: T[], keyFor: (item: T) => string) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFor(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function monsterIdentity(item: UnknownRecord) {
  return [
    text(item.name).trim().toLowerCase(),
    text(item.level),
    text(item.type).trim().toLowerCase(),
    text(item.race).trim().toLowerCase(),
    text(item.element).trim().toLowerCase(),
  ].join("|");
}

function cardIdentity(item: UnknownRecord) {
  const id = text(item.id).trim();
  if (id) return id;
  return [text(item.name), text(item.card_type_name), text(item.effect)].map((value) => value.trim().toLowerCase()).join("|");
}

function equipmentIdentity(item: UnknownRecord) {
  const id = text(item.id).trim();
  if (id) return id;
  return [text(item.name), text(item.itemType), text(item.openLevel)].map((value) => value.trim().toLowerCase()).join("|");
}

function isPublicEquipment(item: UnknownRecord) {
  const name = text(item.name).trim();
  if (!name) return false;
  return !/^(?:royal\s+)?gm(?:[-\s·]|$)/i.test(name);
}

function normalizeAssetPath(value: string) {
  const path = value.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!path) return "";
  if (path.startsWith("media/") || path.startsWith("sea/") || path.startsWith("assets/")) return `/${path}`;
  return `/media/images/${path}`;
}

function monsterIconCandidates(item: UnknownRecord, iconPaths: UnknownRecord) {
  const raw = text(item.thumbnail || item.image).trim();
  if (!raw) return [];

  const candidates: string[] = [];
  if (/^https?:\/\//i.test(raw) || raw.startsWith("/")) {
    candidates.push(raw);
  } else if (raw.includes("/")) {
    candidates.push(normalizeAssetPath(raw));
  }

  const mapped = text(iconPaths[raw] || iconPaths[raw.toLowerCase()]).trim();
  if (mapped) {
    const original = normalizeAssetPath(mapped);
    const webp = original.replace(/\.png$/i, ".webp");
    candidates.push(webp, original);
  }

  if (raw.startsWith("icon_summon")) candidates.push(`/media/images/summon/${raw}.webp`);
  else if (raw.startsWith("icon_boss_")) candidates.push(`/media/images/boss/${raw}.webp`);
  else if (raw.startsWith("icon_pet_head")) candidates.push(`/media/images/pet/${raw}.webp`);
  else if (raw.startsWith("icon_monster")) candidates.push(`/media/images/monster/${raw}.webp`);

  return Array.from(new Set(candidates.filter(Boolean)));
}

function ResultIcon({ result }: { result: SearchResult }) {
  const candidates = Array.from(new Set([result.icon, ...(result.icons || [])].filter((value): value is string => Boolean(value))));
  const [candidateIndex, setCandidateIndex] = useState(0);

  const source = candidates[candidateIndex];
  return (
    <span className={browserStyles.resultIcon} aria-hidden="true">
      {source ? (
        <img
          src={source}
          alt=""
          loading="lazy"
          onError={() => setCandidateIndex((value) => value + 1)}
        />
      ) : result.fallback}
    </span>
  );
}

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [monsters, setMonsters] = useState<UnknownRecord[]>([]);
  const [cards, setCards] = useState<UnknownRecord[]>([]);
  const [equipment, setEquipment] = useState<UnknownRecord[]>([]);
  const [equipmentTypes, setEquipmentTypes] = useState<UnknownRecord>({});
  const [iconPaths, setIconPaths] = useState<UnknownRecord>({});
  const dataRequested = useRef(false);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const frame = window.requestAnimationFrame(() => setQuery(params.get("q") || ""));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2 || dataRequested.current) return;

    const frame = window.requestAnimationFrame(() => {
      dataRequested.current = true;
      setLoading(true);
      setLoadError("");

      Promise.allSettled([
        fetch("/sea/monster-album/data/monster_index_en-US.json").then((response) => {
          if (!response.ok) throw new Error("monster database");
          return response.json();
        }),
        fetch("/sea/card-simulator/data/handbook_cards_en-US.json").then((response) => {
          if (!response.ok) throw new Error("card database");
          return response.json();
        }),
        fetch("/sea/equipment/data/equipment_index_en-US.json").then((response) => {
          if (!response.ok) throw new Error("equipment database");
          return response.json();
        }),
        fetch("/sea/skill-simulator/data/icon_paths.json").then((response) => {
          if (!response.ok) throw new Error("icon index");
          return response.json();
        }),
      ]).then(([monsterResult, cardResult, equipmentResult, iconResult]) => {
        const failures: string[] = [];

        if (monsterResult.status === "fulfilled") setMonsters(arrayPayload(monsterResult.value, ["monsters", "items", "data"]));
        else failures.push("monsters");

        if (cardResult.status === "fulfilled") setCards(arrayPayload(cardResult.value, ["cards", "items", "data"]));
        else failures.push("cards");

        if (equipmentResult.status === "fulfilled") {
          setEquipment(arrayPayload(equipmentResult.value, ["items", "equipment", "data"]));
          setEquipmentTypes(record(record(equipmentResult.value).itemTypes));
        } else failures.push("equipment");

        if (iconResult.status === "fulfilled") setIconPaths(record(iconResult.value));

        if (failures.length) setLoadError(`Some database groups could not load: ${failures.join(", ")}.`);
        setLoading(false);
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [query]);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [query]);

  const groups = useMemo<SearchGroup[]>(() => {
    const normalized = query.trim().toLowerCase();
    const searchDatabases = normalized.length >= 2;
    const match = (value: string) => !normalized || value.toLowerCase().includes(normalized);
    const pageMatches = STATIC_PAGES.filter((item) => match(`${item.title} ${item.description}`));

    const monsterMatches = searchDatabases
      ? uniqueBy(
          monsters.filter((item) => Boolean(item.is_handbook) && match(searchable([
            item.name,
            item.level,
            item.type,
            item.race,
            item.element,
            item.body ?? item.size,
          ]))),
          monsterIdentity,
        ).sort((left, right) => {
          const leftName = text(left.name).toLowerCase();
          const rightName = text(right.name).toLowerCase();
          const rank = (name: string) => name === normalized ? 0 : name.startsWith(normalized) ? 1 : name.includes(normalized) ? 2 : 3;
          return rank(leftName) - rank(rightName)
            || Number(left.level || Number.MAX_SAFE_INTEGER) - Number(right.level || Number.MAX_SAFE_INTEGER)
            || leftName.localeCompare(rightName);
        })
      : [];
    const monsterResults = monsterMatches.slice(0, 8).map((item, index): SearchResult => {
      const id = text(item.id || index);
      const name = text(item.name) || `Monster ${id}`;
      const details = [
        item.level ? `Lv.${text(item.level)}` : "",
        text(item.type),
        text(item.race),
        text(item.element),
        text(item.body ?? item.size),
      ].filter(Boolean).join(" · ");
      return {
        id: `monster-${id}`,
        title: name,
        description: details || "Monster database entry",
        href: `/sea/monster_album/#showAll=0&monsterId=${encodeURIComponent(id)}`,
        icons: monsterIconCandidates(item, iconPaths),
        fallback: "M",
      };
    });

    const cardMatches = searchDatabases
      ? uniqueBy(
          cards.filter((item) => match(searchable([item.name, item.effect, item.effect_extra, item.effect_lines, item.card_type_name, item.obtain_source_tables]))),
          cardIdentity,
        )
      : [];
    const cardResults = cardMatches.slice(0, 8).map((item, index): SearchResult => {
      const id = text(item.id || index);
      const name = text(item.name) || `Card ${id}`;
      const effects = Array.isArray(item.effect_lines) ? item.effect_lines.map(text).join(" ") : `${text(item.effect)} ${text(item.effect_extra)}`;
      return {
        id: `card-${id}`,
        title: name,
        description: compact([text(item.card_type_name), effects].filter(Boolean).join(" · ")) || "Card database entry",
        href: `/sea/cards/?card=${encodeURIComponent(id)}`,
        icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp",
        fallback: "C",
      };
    });

    const equipmentMatches = searchDatabases
      ? uniqueBy(
          equipment.filter((item) => isPublicEquipment(item) && match(searchable([item.name, item.desc, item.openLevel, equipmentTypes[text(item.itemType)], item.stats, item.suits]))),
          equipmentIdentity,
        )
      : [];
    const equipmentResults = equipmentMatches.slice(0, 8).map((item, index): SearchResult => {
      const id = text(item.id || index);
      const name = text(item.name) || `Equipment ${id}`;
      const typeName = text(equipmentTypes[text(item.itemType)]);
      return {
        id: `equipment-${id}`,
        title: name,
        description: compact([item.openLevel ? `Lv.${text(item.openLevel)}` : "", typeName, text(item.desc)].filter(Boolean).join(" · ")) || "Equipment database entry",
        href: `/sea/equipment/?q=${encodeURIComponent(name)}`,
        icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
        fallback: "E",
      };
    });

    return [
      { name: "Guides and tools", results: pageMatches.slice(0, 10), total: pageMatches.length },
      { name: "Monsters", results: monsterResults, total: monsterMatches.length },
      { name: "Cards", results: cardResults, total: cardMatches.length },
      { name: "Equipment", results: equipmentResults, total: equipmentMatches.length },
    ].filter((group) => group.results.length > 0);
  }, [cards, equipment, equipmentTypes, iconPaths, monsters, query]);

  const total = groups.reduce((sum, group) => sum + group.total, 0);
  const normalizedLength = query.trim().length;

  return (
    <div>
      <form className={browserStyles.searchBox} role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="site-search">Search RTNW Hub</label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search guides, tools, monsters, cards, or equipment…"
          autoComplete="off"
          spellCheck={false}
        />
        <button type="button" onClick={() => setQuery("")}>Clear</button>
      </form>

      <p className={browserStyles.summary} aria-live="polite">
        {normalizedLength === 0
          ? "Browse popular pages below or enter at least two characters to search the monster, card, and equipment indexes."
          : normalizedLength === 1
            ? "Enter one more character to search the database indexes. Guide and tool titles are already filtered."
            : loading
              ? `Loading database matches for “${query.trim()}”…`
              : `${total.toLocaleString()} matching result${total === 1 ? "" : "s"} for “${query.trim()}”.`}
      </p>

      {loadError && <div className={browserStyles.error}>{loadError}</div>}
      {loading && <div className={browserStyles.loading}>Loading database indexes…</div>}

      {!loading && groups.length === 0 ? (
        <div className={browserStyles.empty}>
          No matching page or database entry was found. Try a shorter name, class, element, item effect, or equipment type.
        </div>
      ) : (
        <div className={browserStyles.groups}>
          {groups.map((group) => {
            const groupId = `group-${group.name.replace(/\W+/g, "-").toLowerCase()}`;
            const countLabel = group.results.length < group.total
              ? `Showing ${group.results.length.toLocaleString()} of ${group.total.toLocaleString()}`
              : `${group.total.toLocaleString()} found`;
            return (
              <section className={browserStyles.group} key={group.name} aria-labelledby={groupId}>
                <div className={browserStyles.groupHeader}>
                  <h2 id={groupId}>{group.name}</h2>
                  <span>{countLabel}</span>
                </div>
                <div className={browserStyles.resultGrid}>
                  {group.results.map((result) => (
                    <a className={browserStyles.resultCard} href={result.href} key={result.id}>
                      <ResultIcon
                        key={[result.id, result.icon, ...(result.icons || [])].join("|")}
                        result={result}
                      />
                      <span className={browserStyles.resultCopy}>
                        <strong>{result.title}</strong>
                        <span>{result.description}</span>
                      </span>
                      <span className={browserStyles.arrow} aria-hidden="true">→</span>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

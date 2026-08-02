(() => {
  "use strict";

  if (document.getElementById("rtnw-tool-structured-data")) return;

  const tools = {
    "/sea/skill_planner/": {
      name: "Ragnarok: The New World Skill Planner",
      category: "Character build planner",
      description: "Create, compare, and plan Ragnarok: The New World class skill builds.",
      features: ["Class skill trees", "Skill-point planning", "Build comparison", "Shareable build planning"]
    },
    "/sea/rune_planner/": {
      name: "Ragnarok: The New World Rune Planner",
      category: "Character build planner",
      description: "Plan Ragnarok: The New World rune-engine loadouts and inspect rune effects.",
      features: ["Rune loadout planning", "Rune-effect lookup", "Build theorycrafting"]
    },
    "/sea/affix_planner/": {
      name: "Ragnarok: The New World Affix Planner",
      category: "Equipment planner",
      description: "Plan equipment affixes and compare stat combinations for Ragnarok: The New World builds.",
      features: ["Affix lookup", "Stat combination planning", "Equipment theorycrafting"]
    },
    "/sea/apocalypse_planner/": {
      name: "Ragnarok: The New World Apocalypse Planner",
      category: "Progression planner",
      description: "Plan Apocalypse weather paths and star progression in Ragnarok: The New World.",
      features: ["Weather-path planning", "Star progression", "Progression reference"]
    },
    "/sea/shop/": {
      name: "Ragnarok: The New World Shop Catalogue",
      category: "Game-data reference",
      description: "Browse an English catalogue of Ragnarok: The New World in-game shop entries.",
      features: ["Shop-item lookup", "English game data", "Searchable catalogue"]
    },
    "/sea/equipment/": {
      name: "Ragnarok: The New World Equipment Index",
      category: "Game-data reference",
      description: "Search Ragnarok: The New World equipment, stats, slots, set effects, and related data.",
      features: ["Equipment search", "Stat lookup", "Slot filters", "Set-effect reference"]
    },
    "/sea/cards/": {
      name: "Ragnarok: The New World Card Index",
      category: "Game-data reference",
      description: "Search Ragnarok: The New World cards, effects, slots, obtain sources, monster drops, and fusion information.",
      features: ["Card-effect search", "Slot and rarity filters", "Monster-source links", "Card fusion reference"]
    },
    "/sea/monster_album/": {
      name: "Ragnarok: The New World Monster Index",
      category: "Game-data reference",
      description: "Search Ragnarok: The New World monsters, stats, habitats, elements, races, sizes, drops, and linked cards.",
      features: ["Monster search", "Element and race filters", "Habitat lookup", "Drop and card links"]
    },
    "/sea/maps/": {
      name: "Ragnarok: The New World World Map",
      category: "Interactive game map",
      description: "Explore Ragnarok: The New World maps and locate monsters, quests, chests, landmarks, recipes, and services.",
      features: ["Interactive maps", "Monster markers", "Quest and chest markers", "Mobile zoom controls"]
    },
    "/sea/events/": {
      name: "Ragnarok: The New World Events Reference",
      category: "Game-data reference",
      description: "Review Ragnarok: The New World event schedules, tasks, and reward information.",
      features: ["Event schedules", "Task lookup", "Reward reference"]
    },
    "/sea/study/": {
      name: "Ragnarok: The New World Adventure Study",
      category: "Educational game tool",
      description: "Practice Ragnarok: The New World Adventure Study questions and answers.",
      features: ["Question practice", "Answer reference", "Searchable study data"]
    },
    "/sea/pet/": {
      name: "Ragnarok: The New World Pet Guide",
      category: "Game-data reference",
      description: "Explore Ragnarok: The New World pet data, skills, feeding information, and related details.",
      features: ["Pet lookup", "Pet skill reference", "Feeding information"]
    },
    "/sea/refine/": {
      name: "Ragnarok: The New World Refine Simulator",
      category: "Equipment simulator",
      description: "Review refine rates, material bands, safe checkpoints, and simulate Ragnarok: The New World enhancement attempts.",
      features: ["Refine-rate reference", "Enhancement simulation", "Material requirements", "Safe-checkpoint planning"]
    }
  };

  function normalizePath(pathname) {
    let path = String(pathname || "/").replace(/\/index\.html$/i, "/");
    if (!path.endsWith("/")) path += "/";
    return path;
  }

  const path = normalizePath(window.location.pathname);
  const tool = tools[path];
  if (!tool) return;

  const url = `https://rtnw.online${path}`;
  const organization = {
    "@type": "Organization",
    "@id": "https://rtnw.online/#organization",
    name: "RTNW Hub",
    url: "https://rtnw.online/",
    logo: "https://rtnw.online/apple-touch-icon.png"
  };
  const website = {
    "@type": "WebSite",
    "@id": "https://rtnw.online/#website",
    name: "RTNW Hub",
    url: "https://rtnw.online/",
    publisher: organization
  };
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${url}#application`,
    name: tool.name,
    url,
    description: tool.description,
    applicationCategory: "GameApplication",
    applicationSubCategory: tool.category,
    operatingSystem: "Any",
    browserRequirements: "Requires a modern browser with JavaScript enabled.",
    isAccessibleForFree: true,
    inLanguage: document.documentElement.lang || "en",
    featureList: tool.features,
    image: "https://rtnw.online/assets/rtnw-hero-1280.webp",
    publisher: organization,
    isPartOf: website,
    about: {
      "@type": "VideoGame",
      name: "Ragnarok: The New World"
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    potentialAction: {
      "@type": "UseAction",
      target: url
    }
  };

  const script = document.createElement("script");
  script.id = "rtnw-tool-structured-data";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
})();

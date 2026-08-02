"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type ToolCategory = "Planners" | "Database" | "Adventure";

type HubTool = {
  title: string;
  description: string;
  href: string;
  icon: string;
  category: ToolCategory;
  badge?: string;
};

const tools: HubTool[] = [
  {
    title: "Skill Planner",
    description: "Create, compare, and refine class skill builds.",
    href: "/sea/skill_planner/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp",
    category: "Planners",
    badge: "Popular",
  },
  {
    title: "Rune Planner",
    description: "Design rune engine loadouts and inspect effects.",
    href: "/sea/rune_planner/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_luenyinqing.webp",
    category: "Planners",
    badge: "Build tool",
  },
  {
    title: "Interactive Maps",
    description: "Find monsters, quests, landmarks, and chests.",
    href: "/sea/maps/?lang=en-US#map=101",
    icon: "/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp",
    category: "Adventure",
    badge: "Explorer",
  },
  {
    title: "Affix Planner",
    description: "Theorycraft affix and stunt combinations.",
    href: "/sea/affix_planner/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_chongwuzhuangbei.webp",
    category: "Planners",
  },
  {
    title: "Apocalypse Planner",
    description: "Plan weather paths and star progression.",
    href: "/sea/apocalypse_planner/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tianqixingchen.webp",
    category: "Planners",
  },
  {
    title: "Equipment",
    description: "Browse gear, stats, slots, and set bonuses.",
    href: "/sea/equipment/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
    category: "Database",
  },
  {
    title: "Card Library",
    description: "Search monster cards and fusion recipes.",
    href: "/sea/cards/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp",
    category: "Database",
  },
  {
    title: "Monster Album",
    description: "Look up monsters, habitats, stats, and drops.",
    href: "/sea/monster_album/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp",
    category: "Database",
  },
  {
    title: "Shop Catalogue",
    description: "Browse the in-game shop catalogue in English.",
    href: "/sea/shop/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp",
    category: "Database",
  },
  {
    title: "Events",
    description: "Review event schedules, tasks, and rewards.",
    href: "/sea/events/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp",
    category: "Adventure",
  },
  {
    title: "Adventure Study",
    description: "Practice in-game questions and answers.",
    href: "/sea/study/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shitu.webp",
    category: "Adventure",
  },
  {
    title: "Pet Guide",
    description: "Explore pet data, skills, and feeding details.",
    href: "/sea/pet/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_pet.webp",
    category: "Database",
  },
  {
    title: "Refine Simulator",
    description: "Check refine rates and simulate enhancements.",
    href: "/sea/refine/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_qianghua.webp",
    category: "Planners",
  },
];

const categories = ["All tools", "Planners", "Database", "Adventure"] as const;

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All tools");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setQuery("");
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKey);

    if (!document.querySelector('script[data-rtnw-ads]')) {
      const script = document.createElement("script");
      script.src = "/shared/responsive_ads.js?v=20260802-ads1";
      script.async = true;
      script.dataset.rtnwAds = "true";
      document.body.appendChild(script);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const categoryMatch = category === "All tools" || tool.category === category;
      const textMatch =
        !normalized ||
        `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(normalized);
      return categoryMatch && textMatch;
    });
  }, [category, query]);

  const jumpToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toolListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Ragnarok: The New World tools and guides",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: tool.title,
      url: `https://rtnw.online${tool.href.split("?")[0]}`,
    })),
  };

  return (
    <div className="site-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolListSchema) }}
      />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ragnarok The New World Hub home">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy">
            <strong>Ragnarok</strong>
            <small>The New World Hub</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#tools">Tools</a>
          <a href="#tools" onClick={() => setCategory("Planners")}>Planners</a>
          <a href="#tools" onClick={() => setCategory("Database")}>Database</a>
          <a href="/sea/maps/?lang=en-US#map=101">World Map</a>
        </nav>

        <div className="header-actions">
          <button className="search-shortcut" type="button" onClick={() => searchRef.current?.focus()}>
            <span aria-hidden="true">⌕</span>
            <span>Search</span>
            <kbd>/</kbd>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>

        <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          <a href="#tools" onClick={() => setMenuOpen(false)}>All tools</a>
          <a href="/sea/skill_planner/">Skill Planner</a>
          <a href="/sea/rune_planner/">Rune Planner</a>
          <a href="/sea/maps/?lang=en-US#map=101">World Map</a>
          <a href="/sea/monster_album/">Monster Album</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <picture className="hero-picture">
            <source
              type="image/webp"
              srcSet="/assets/rtnw-hero-640.webp 640w, /assets/rtnw-hero-960.webp 960w, /assets/rtnw-hero-1280.webp 1280w, /assets/rtnw-hero-1672.webp 1672w"
              sizes="100vw"
            />
            <img
              className="hero-art"
              src="/assets/rtnw-hero-1672.webp"
              width="1672"
              height="941"
              fetchPriority="high"
              decoding="async"
              alt="Fantasy adventurers exploring floating islands above the clouds"
            />
          </picture>
          <div className="hero-sky-wash" />
          <div className="hero-content">
            <p className="eyebrow"><span /> Ragnarok: The New World Guide Hub</p>
            <h1 id="hero-title">Ragnarok: The New World<br /><em>guides &amp; tools.</em></h1>
            <p className="hero-copy">
              Plan stronger class builds, find monsters and card drops, and explore Rune-Midgard with English planners, databases, tutorials, and interactive guides.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={jumpToTools}>
                Explore all tools <span aria-hidden="true">→</span>
              </button>
              <a className="secondary-button" href="/sea/maps/?lang=en-US#map=101">
                Open world map <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-meta" aria-label="Hub highlights">
              <span><strong>13</strong> working tools</span>
              <span><strong>English</strong> game data</span>
              <span><strong>Mobile</strong> ready</span>
            </div>
          </div>
        </section>

        <section className="quick-tools" aria-labelledby="quick-heading">
          <div className="section-kicker">
            <span id="quick-heading">Start your journey</span>
            <span className="rule" />
            <span>Most-used tools</span>
          </div>
          <div className="quick-grid">
            {tools.slice(0, 3).map((tool, index) => (
              <a className="quick-card" href={tool.href} key={tool.title}>
                <span className="card-number">0{index + 1}</span>
                <span className="icon-medallion"><img src={tool.icon} alt="" /></span>
                <span className="quick-card-copy">
                  <small>{tool.category}</small>
                  <strong>{tool.title}</strong>
                  <span>{tool.description}</span>
                </span>
                <span className="card-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </section>

        <aside className="rtnw-ad-slot" data-ad-slot="true" data-ad-format="responsive" data-ad-placement="home-inline" />

        <section className="tool-library" id="tools" aria-labelledby="tools-heading">
          <div className="library-heading">
            <div>
              <p className="eyebrow dark"><span /> Adventure library</p>
              <h2 id="tools-heading">Everything you need,<br />in one place.</h2>
            </div>
            <p>Search the full collection or choose a category to find the right tool for your next build, hunt, or journey.</p>
          </div>

          <div className="tool-controls">
            <label className="tool-search">
              <span aria-hidden="true">⌕</span>
              <span className="sr-only">Search tools</span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search skills, monsters, maps…"
              />
              {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
            </label>
            <div className="category-tabs" aria-label="Filter tools by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={category === item ? "is-active" : ""}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="tool-grid" aria-live="polite">
            {filteredTools.map((tool) => (
              <a className="tool-card" href={tool.href} key={tool.title}>
                <div className="tool-card-top">
                  <span className="tool-icon"><img src={tool.icon} alt="" /></span>
                  {tool.badge && <span className="tool-badge">{tool.badge}</span>}
                </div>
                <small>{tool.category}</small>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <span className="tool-link">Open tool <span aria-hidden="true">→</span></span>
              </a>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="empty-state">
              <span aria-hidden="true">✧</span>
              <h3>No tools found</h3>
              <p>Try another search or reset the filters.</p>
              <button type="button" onClick={() => { setQuery(""); setCategory("All tools"); }}>Show every tool</button>
            </div>
          )}
        </section>

        <aside className="rtnw-ad-slot rtnw-ad-slot--rectangle" data-ad-slot="true" data-ad-format="rectangle" data-ad-placement="home-end" />

        <section className="guide-overview" aria-labelledby="guide-overview-heading">
          <div className="guide-overview-heading">
            <p className="eyebrow dark"><span /> Guides, builds and game data</p>
            <h2 id="guide-overview-heading">Ragnarok: The New World guides built around useful tools.</h2>
            <p>
              RTNW Hub helps SEA players turn game data into practical decisions. Every guide path below connects to a working planner, map, or searchable database, so you can research a build and apply it in the same place.
            </p>
          </div>
          <div className="guide-paths">
            <article>
              <span>01</span>
              <h3>Plan class builds</h3>
              <p>Choose a job in the <a href="/sea/skill_planner/">Skill Planner</a>, compare rune effects, test equipment affixes, and save a shareable build before spending resources in game.</p>
              <a className="guide-path-link" href="/sea/skill_planner/">Start a skill build →</a>
            </article>
            <article>
              <span>02</span>
              <h3>Find monsters and drops</h3>
              <p>Use the <a href="/sea/maps/?lang=en-US#map=101">interactive map</a> with the Monster Album and Card Database to locate targets, inspect stats, and see where important cards can be obtained.</p>
              <a className="guide-path-link" href="/sea/monster_album/">Search monsters →</a>
            </article>
            <article>
              <span>03</span>
              <h3>Improve progression</h3>
              <p>Check refine rates, pet skills, event schedules, shop items, and quiz answers. These references are designed for quick use on both desktop and mobile while you play.</p>
              <a className="guide-path-link" href="/sea/refine/">Open refine simulator →</a>
            </article>
          </div>
        </section>

        <section className="journey-banner" aria-label="Explore Rune-Midgard">
          <div>
            <p className="eyebrow"><span /> Ready for the next quest?</p>
            <h2>See the whole world<br />before you set out.</h2>
          </div>
          <a href="/sea/maps/?lang=en-US#map=101">Explore the map <span aria-hidden="true">→</span></a>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy"><strong>Ragnarok</strong><small>The New World Hub</small></span>
        </a>
        <div className="footer-meta">
          <p>Independent fan-made game-data toolkit for Ragnarok: The New World.</p>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
        <a href="#top">Back to top ↑</a>
      </footer>

      <nav className="mobile-dock" aria-label="Quick mobile navigation">
        <a href="#top"><span aria-hidden="true">⌂</span>Home</a>
        <a href="#tools"><span aria-hidden="true">◇</span>Tools</a>
        <a href="/sea/maps/?lang=en-US#map=101"><span aria-hidden="true">⌖</span>Map</a>
        <a href="/sea/skill_planner/"><span aria-hidden="true">✦</span>Builds</a>
      </nav>
    </div>
  );
}

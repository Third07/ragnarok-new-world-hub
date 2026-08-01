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
    href: "/sea/maps/",
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

  return (
    <div className="site-shell">
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
          <a href="/sea/maps/">World Map</a>
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
          <a href="/sea/maps/">World Map</a>
          <a href="/sea/monster_album/">Monster Album</a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img className="hero-art" src="/assets/rtnw-hero.png" alt="Fantasy adventurers exploring floating islands above the clouds" />
          <div className="hero-sky-wash" />
          <div className="hero-content">
            <p className="eyebrow"><span /> The New World Adventure Toolkit</p>
            <h1 id="hero-title">Your adventure,<br /><em>mapped.</em></h1>
            <p className="hero-copy">
              Build smarter, discover faster, and explore Rune-Midgard with a complete collection of English planners, databases, and interactive guides.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={jumpToTools}>
                Explore all tools <span aria-hidden="true">→</span>
              </button>
              <a className="secondary-button" href="/sea/maps/">
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

        <section className="journey-banner" aria-label="Explore Rune-Midgard">
          <div>
            <p className="eyebrow"><span /> Ready for the next quest?</p>
            <h2>See the whole world<br />before you set out.</h2>
          </div>
          <a href="/sea/maps/">Explore the map <span aria-hidden="true">→</span></a>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy"><strong>Ragnarok</strong><small>The New World Hub</small></span>
        </a>
        <p>Community game-data toolkit for Ragnarok: The New World.</p>
        <a href="#top">Back to top ↑</a>
      </footer>

      <nav className="mobile-dock" aria-label="Quick mobile navigation">
        <a href="#top"><span aria-hidden="true">⌂</span>Home</a>
        <a href="#tools"><span aria-hidden="true">◇</span>Tools</a>
        <a href="/sea/maps/"><span aria-hidden="true">⌖</span>Map</a>
        <a href="/sea/skill_planner/"><span aria-hidden="true">✦</span>Builds</a>
      </nav>
    </div>
  );
}

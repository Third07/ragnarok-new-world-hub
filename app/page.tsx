import HomeToolIcon from "./HomeToolIcon";
import HomeToolLibrary, { type HubTool } from "./HomeToolLibrary";
import ResponsiveHeroImage from "./ResponsiveHeroImage";

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
    title: "World Map",
    description: "Find butterflies, bubbles, weather chests, monsters, and quests.",
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
    title: "Wardrobe Database",
    description: "Search outfits, hairstyles, accessories, mounts, and dye options.",
    href: "/database/wardrobe/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
    category: "Database",
    badge: "New",
  },
  {
    title: "Equipment Index",
    description: "Browse gear, stats, slots, and set bonuses.",
    href: "/sea/equipment/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
    category: "Database",
  },
  {
    title: "Card Index",
    description: "Search monster cards and fusion recipes.",
    href: "/sea/cards/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp",
    category: "Database",
  },
  {
    title: "Monster Index",
    description: "Look up monsters, habitats, stats, and drops.",
    href: "/sea/monster_album/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp",
    category: "Database",
  },
  {
    title: "Farming Target Finder",
    description: "Filter monsters by level, type, race, element, size, and map data.",
    href: "/tools/farming-target-finder/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp",
    category: "Database",
    badge: "New",
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
    title: "Quiz Answers",
    description: "Search Lucky Rabbit, Guild Banquet, Scholar Exam, and element answers.",
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
  {
    title: "PC Setup Checker",
    description: "Compare Steam, emulator, and cloud-play routes for your PC.",
    href: "/tools/pc-setup-checker/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
    category: "Utilities",
    badge: "New",
  },
  {
    title: "Top-Up Cost Calculator",
    description: "Estimate the final cost after discounts and payment fees.",
    href: "/tools/top-up-calculator/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp",
    category: "Utilities",
    badge: "New",
  },
];

export default function Home() {
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
      <a className="skip-link" href="#main-content">Skip to content</a>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <ResponsiveHeroImage
            pictureClassName="hero-picture"
            className="hero-art"
            alt="Fantasy adventurers exploring floating islands above the clouds"
          />
          <div className="hero-sky-wash" />
          <div className="hero-content">
            <p className="eyebrow"><span /> Ragnarok: The New World Database & Guide Hub</p>
            <h1 id="hero-title">Ragnarok: The New World<br /><em>database, guides &amp; tools.</em></h1>
            <p className="hero-copy">
              Plan stronger class builds, find monsters and card drops, and explore Rune-Midgard with English planners, databases, tutorials, and interactive guides.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#tools">
                Explore all tools <span aria-hidden="true">→</span>
              </a>
              <a className="secondary-button" href="/database/">
                Open RTNW database <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-meta" aria-label="Hub highlights">
              <span><strong>16</strong> working tools</span>
              <span><strong>Unified</strong> database search</span>
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
                <span className="icon-medallion"><HomeToolIcon icon={tool.icon} /></span>
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

        <HomeToolLibrary tools={tools} />

        <section className="guide-overview" aria-labelledby="guide-overview-heading">
          <div className="guide-overview-heading">
            <p className="eyebrow dark"><span /> Guides, builds and game data</p>
            <h2 id="guide-overview-heading">Ragnarok: The New World guides built around useful tools.</h2>
            <p>
              RTNW Hub helps SEA players turn game data into practical decisions. Every guide path below connects to a working planner, map, searchable database, or setup utility.
            </p>
          </div>
          <div className="guide-paths">
            <article>
              <span>01</span>
              <h3>Plan class builds</h3>
              <p>Compare <a href="/guides/assassin-cross-builds/">Assassin Cross</a>, <a href="/guides/high-wizard-builds/">High Wizard</a>, <a href="/guides/sniper-builds/">Sniper</a>, and <a href="/guides/lord-knight-builds/">Lord Knight builds</a>, then save your skill plan before spending resources in game.</p>
              <a className="guide-path-link" href="/sea/skill_planner/">Start a skill build →</a>
            </article>
            <article>
              <span>02</span>
              <h3>Find monsters and drops</h3>
              <p>Use the <a href="/tools/farming-target-finder/">Farming Target Finder</a>, Monster Index, Card Index, and World Map to narrow targets and inspect their connected data.</p>
              <a className="guide-path-link" href="/tools/farming-target-finder/">Find farming targets →</a>
            </article>
            <article>
              <span>03</span>
              <h3>Check redeem codes and updates</h3>
              <p>Find source-listed gift codes, disputed-code reports, partner deadlines, and redemption help. Visit <a href="/updates/">site updates</a> for the latest guide and database changes.</p>
              <a className="guide-path-link" href="/guides/redeem-codes/">Check redeem codes →</a>
            </article>
          </div>
        </section>

        <section className="journey-banner" aria-label="Search RTNW Hub">
          <div>
            <p className="eyebrow"><span /> Need one specific answer?</p>
            <h2>Search the whole hub<br />from one page.</h2>
          </div>
          <a href="/search/">Search guides and database <span aria-hidden="true">→</span></a>
        </section>
      </main>

    </div>
  );
}

import type { Metadata } from "next";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Guides",
  description:
    "Browse RTNW Hub guide categories for classes, builds, beginner progression, equipment, refining, monsters, cards, farming, and game tools.",
  alternates: { canonical: "/guides/" },
  openGraph: {
    type: "website",
    url: "/guides/",
    title: "Ragnarok: The New World Guides",
    description:
      "Practical Ragnarok: The New World guides connected to RTNW Hub planners, indexes, and the World Map.",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World guide library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ragnarok: The New World Guides",
    description: "RTNW class, beginner, progression, equipment, monster, card, and farming guides.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const guideCategories = [
  {
    number: "01",
    title: "Classes and builds",
    description:
      "Compare separate F2P, PvE, and PvP class rankings, then connect each recommendation to the Skill Planner before investing resources.",
    status: "1 guide published",
    href: "/guides/class-tier-list/",
    link: "Read class tier list →",
  },
  {
    number: "02",
    title: "Beginner guides",
    description:
      "Follow a first-hours and first-week progression route with daily routine templates, F2P resource priorities, tool workflows, and common mistakes to avoid.",
    status: "1 guide published",
    href: "/guides/beginner-progression/",
    link: "Read beginner guide →",
  },
  {
    number: "03",
    title: "Progression and equipment",
    description:
      "Guides for equipment decisions, refining, pets, events, shop resources, and other systems that affect long-term character development.",
    status: "Planned collection",
    href: "/sea/equipment/",
    link: "Open Equipment Index →",
  },
  {
    number: "04",
    title: "Monsters, cards and farming",
    description:
      "Research paths that connect monster information, card effects, drop sources, habitats, and World Map locations for faster in-game lookup.",
    status: "Planned collection",
    href: "/sea/monster_album/",
    link: "Open Monster Index →",
  },
];

const roadmap = [
  ["01", "Class Tier List: F2P, PvE & PvP", "Published", "/guides/class-tier-list/"],
  ["02", "Beginner Progression Guide", "Published", "/guides/beginner-progression/"],
  ["03", "Druid Werewolf Build", "Next", ""],
  ["04", "Druid Arcanist Build", "Planned", ""],
  ["05", "Refining and Equipment Upgrade Guide", "Planned", ""],
] as const;

const tools = [
  ["Skill Planner", "/sea/skill_planner/"],
  ["World Map", "/sea/maps/?lang=en-US#map=101"],
  ["Monster Index", "/sea/monster_album/"],
  ["Card Index", "/sea/cards/"],
] as const;

export default function GuidesPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://rtnw.online/guides/#webpage",
        url: "https://rtnw.online/guides/",
        name: "Ragnarok: The New World Guides",
        description:
          "Guide categories for classes, builds, beginner progression, equipment, monsters, cards, farming, and connected RTNW tools.",
        isPartOf: { "@id": "https://rtnw.online/#website" },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "RTNW Hub",
            item: "https://rtnw.online/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Guides",
            item: "https://rtnw.online/guides/",
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.shell}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <a className="skip-link" href="#guide-content">
        Skip to guides
      </a>

      <header className={styles.header}>
        <a className="brand" href="/" aria-label="RTNW Hub home">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy">
            <strong>Ragnarok</strong>
            <small>The New World Hub</small>
          </span>
        </a>

        <nav className={styles.desktopNav} aria-label="Primary navigation">
          <a href="/">Home</a>
          <a className={styles.active} href="/guides/" aria-current="page">Guides</a>
          <a href="/#tools">Tools</a>
          <a href="/sea/maps/?lang=en-US#map=101">World Map</a>
        </nav>

        <a className={styles.homeAction} href="/#tools">
          Browse tools <span aria-hidden="true">→</span>
        </a>

        <details className={styles.mobileNav}>
          <summary aria-label="Open navigation">☰</summary>
          <nav aria-label="Mobile navigation">
            <a href="/">Home</a>
            <a href="/guides/" aria-current="page">Guides</a>
            <a href="/#tools">All tools</a>
            <a href="/sea/skill_planner/">Skill Planner</a>
            <a href="/sea/maps/?lang=en-US#map=101">World Map</a>
          </nav>
        </details>
      </header>

      <main className={styles.main} id="guide-content">
        <section className={styles.hero} aria-labelledby="guides-title">
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/">RTNW Hub</a>
              <span aria-hidden="true">/</span>
              <span>Guides</span>
            </nav>
            <h1 id="guides-title">Ragnarok: The New World <em>guides.</em></h1>
            <p>
              The class tier list and beginner progression guide are now published. Each article connects recommendations to working planners, indexes, schedules, and game-data tools.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="/guides/beginner-progression/">Read the beginner guide <span aria-hidden="true">→</span></a>
              <a className={styles.secondary} href="/guides/class-tier-list/">View class tier lists <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className={styles.library} id="guide-library" aria-labelledby="library-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>Guide library</p>
              <h2 id="library-title">Four clear paths for every adventurer.</h2>
            </div>
            <p>
              Published guides link directly to complete articles. Categories still in development continue to point toward useful working tools instead of empty pages.
            </p>
          </div>

          <div className={styles.categoryGrid}>
            {guideCategories.map((category) => (
              <article className={styles.categoryCard} key={category.title}>
                <span className={styles.categoryNumber}>{category.number}</span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <footer>
                  <span>{category.status}</span>
                  <a href={category.href}>{category.link}</a>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.roadmap} aria-labelledby="roadmap-title">
          <p className={styles.kicker}>Publishing roadmap</p>
          <h2 id="roadmap-title">The first five guide releases.</h2>
          <p className={styles.roadmapIntro}>
            This roadmap keeps the guide section useful and focused. Each recommendation is reviewed against available game data and current player experience before publication.
          </p>
          <ol className={styles.roadmapList}>
            {roadmap.map(([number, title, status, href]) => (
              <li key={title}>
                <span className={styles.categoryNumber}>{number}</span>
                <strong>{href ? <a href={href}>{title}</a> : title}</strong>
                <span className={status === "Published" ? styles.statusPublished : status === "Next" ? styles.statusNext : styles.statusPlanned}>{status}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.toolLinks} aria-labelledby="tool-links-title">
          <p className={styles.kicker}>Available now</p>
          <h2 id="tool-links-title">Use the game-data tools while the guides grow.</h2>
          <p>
            Search monsters and cards, inspect equipment, plan skills, or locate targets on the World Map without waiting for the next article.
          </p>
          <div className={styles.toolGrid}>
            {tools.map(([name, href]) => (
              <a href={href} key={name}>{name}<span aria-hidden="true">→</span></a>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="/">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy"><strong>Ragnarok</strong><small>The New World Hub</small></span>
        </a>
        <div className="footer-meta">
          <p>Independent fan-made game-data toolkit for Ragnarok: The New World.</p>
          <div className={styles.footerLinks}>
            <a href="/guides/">Guides</a>
            <a href="/#tools">Tools</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
        <a href="#guide-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

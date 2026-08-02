import type { Metadata } from "next";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Guides",
  description:
    "Browse RTNW Hub guides for classes, builds, beginner progression, equipment, refining, monsters, cards, farming, and connected game tools.",
  alternates: { canonical: "/guides/" },
  openGraph: {
    type: "website",
    url: "/guides/",
    title: "Ragnarok: The New World Guides",
    description:
      "Practical Ragnarok: The New World guides connected to RTNW Hub planners, indexes, simulators, and the World Map.",
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
    description: "RTNW class, beginner, equipment, refining, monster, card, and farming guides.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const guideCategories = [
  {
    number: "01",
    title: "Classes and builds",
    description:
      "Compare F2P, PvE, and PvP class rankings, then study the separate Werewolf, Wereraptor, and Human Arcanist Druid builds before investing resources.",
    status: "2 guides published",
    href: "/guides/classes-builds/",
    link: "Browse class guides →",
  },
  {
    number: "02",
    title: "Beginner guides",
    description:
      "Follow a first-hours and first-week route with daily routines, F2P resource priorities, tool workflows, and common progression mistakes.",
    status: "2 connected guides",
    href: "/guides/beginner-guides/",
    link: "Browse beginner guides →",
  },
  {
    number: "03",
    title: "Progression and equipment",
    description:
      "Choose better base equipment, prioritize the correct slot, and plan around the +6, +9, +12, and +15 refine checkpoints before spending materials.",
    status: "2 connected guides",
    href: "/guides/progression-equipment/",
    link: "Browse progression guides →",
  },
  {
    number: "04",
    title: "Monsters, cards and farming",
    description:
      "Choose cards by build fit, compare every obtain source, inspect the monster, plan a World Map route, and measure whether the farm is worth repeating.",
    status: "2 connected guides",
    href: "/guides/monsters-cards-farming/",
    link: "Browse farming guides →",
  },
];

const roadmap = [
  ["01", "Class Tier List: F2P, PvE & PvP", "Published", "/guides/class-tier-list/"],
  ["02", "Beginner Progression Guide", "Published", "/guides/beginner-progression/"],
  ["03", "Druid Builds: Werewolf, Wereraptor & Arcanist", "Published", "/guides/druid-builds/"],
  ["04", "Refining and Equipment Upgrade Guide", "Published", "/guides/refining-equipment/"],
  ["05", "Farming and Card Progression Guide", "Published", "/guides/farming-card-progression/"],
] as const;

const tools = [
  ["Card Index", "/sea/cards/"],
  ["Monster Index", "/sea/monster_album/"],
  ["World Map", "/sea/maps/?lang=en-US#map=101"],
  ["Skill Planner", "/sea/skill_planner/"],
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
          "Guide categories for classes, builds, beginner progression, equipment, refining, monsters, cards, farming, and connected RTNW tools.",
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
      <a className="skip-link" href="#guide-content">Skip to guides</a>

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
            <a href="/sea/cards/">Card Index</a>
            <a href="/sea/monster_album/">Monster Index</a>
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
              Five cornerstone guides now cover class rankings, beginner progression, all three Druid builds, equipment refining, and card-farming routes. Every article connects its recommendations to working planners, indexes, and simulators.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="/guides/farming-card-progression/">Read the farming guide <span aria-hidden="true">→</span></a>
              <a className={styles.secondary} href="/guides/refining-equipment/">Read the refining guide <span aria-hidden="true">→</span></a>
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
              Every category now has a dedicated landing page that combines its published articles with the relevant planners and searchable game-data tools.
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
          <p className={styles.kicker}>Foundation series</p>
          <h2 id="roadmap-title">The first five guide releases are complete.</h2>
          <p className={styles.roadmapIntro}>
            Each recommendation is reviewed against available game data and clearly separated from editorial strategy before publication.
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
          <h2 id="tool-links-title">Move from build need to farming route.</h2>
          <p>
            Search card effects, inspect monster sources, locate habitats, and validate the character build with connected tools.
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

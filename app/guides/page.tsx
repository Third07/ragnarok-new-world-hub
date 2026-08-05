import type { Metadata } from "next";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Guides",
  description:
    "Browse RTNW class builds, guild event guides, beginner progression, equipment, farming, PC installation, emulator settings, cloud gaming, and safe top-up advice.",
  alternates: { canonical: "/guides/" },
  keywords: [
    "Ragnarok The New World guides",
    "RTNW class builds",
    "RTNW Guild League guide",
    "RTNW Polarity Zone",
    "RTNW Hazy Forest",
    "Ragnarok The New World beginner guide",
  ],
  openGraph: {
    type: "website",
    url: "/guides/",
    title: "Ragnarok: The New World Guides",
    description:
      "Source-based class builds, guild-event strategy, progression, farming, PC, emulator, cloud gaming, and account-safety guides connected to RTNW tools.",
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
    description:
      "RTNW class builds, guild events, beginner progression, farming, PC, emulator, cloud gaming, and safe top-up guides.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const guideCategories = [
  {
    number: "01",
    title: "Classes and builds",
    description:
      "Compare F2P, PvE, and PvP rankings, then use source-based second-job guides for Swordman, Mage, Archer, Acolyte, Thief, Merchant, Gunslinger, and Druid.",
    status: "9 class guides published",
    href: "/guides/classes-builds/",
    link: "Browse class guides →",
  },
  {
    number: "02",
    title: "Guild events",
    description:
      "Prepare Guild League rosters and GVG tactics, organize Polarity Zone boss groups, and maximize Hazy Forest scoring with counter and timing plans.",
    status: "3 official-source guides published",
    href: "/guides/guild-events/",
    link: "Browse guild event guides →",
  },
  {
    number: "03",
    title: "Beginner guides",
    description:
      "Follow a first-hours and first-week route with daily routines, F2P priorities, redeem-code checks, tool workflows, and common progression mistakes.",
    status: "Beginner guides published",
    href: "/guides/beginner-guides/",
    link: "Browse beginner guides →",
  },
  {
    number: "04",
    title: "Progression and equipment",
    description:
      "Choose better base equipment, prioritize the correct slot, and plan around refine checkpoints before committing scarce or paid resources.",
    status: "Progression guides published",
    href: "/guides/progression-equipment/",
    link: "Browse progression guides →",
  },
  {
    number: "05",
    title: "Monsters, cards and farming",
    description:
      "Choose cards by build fit, inspect monster sources, plan World Map routes, and measure whether a farming target is worth repeating.",
    status: "Farming guides published",
    href: "/guides/monsters-cards-farming/",
    link: "Browse farming guides →",
  },
  {
    number: "06",
    title: "PC, emulator and account setup",
    description:
      "Install the official PC version, tune an Android emulator, evaluate cloud play, compare payment fees, and protect your account while topping up.",
    status: "4 guides and 2 tools published",
    href: "/guides/technical/",
    link: "Browse setup guides →",
  },
] as const;

const featuredGuides = [
  ["01", "Guild League: Schedule, Tiers and GVG Strategy", "/guides/guild-league/"],
  ["02", "Polarity Zone: Boss Mechanics and Guild Setup", "/guides/polarity-zone/"],
  ["03", "Hazy Forest: Timing, Counters and Score Route", "/guides/hazy-forest/"],
  ["04", "Swordman: VIT Tank, AGI Sword and Spear", "/guides/swordman-builds/"],
  ["05", "Mage: Fire–Earth and Ice–Lightning Wizard", "/guides/mage-builds/"],
  ["06", "Archer: ADL, Pet and Trap Hunter", "/guides/archer-builds/"],
  ["07", "Acolyte: Support, Exorcist and AGI-Crit", "/guides/acolyte-builds/"],
  ["08", "Thief: Dual Dagger, Katar and Venom", "/guides/thief-builds/"],
  ["09", "Merchant: Cart, Axe and Turret", "/guides/merchant-builds/"],
  ["10", "Gunslinger: Pistol, Gatling, Rifle and Shotgun", "/guides/gunslinger-builds/"],
  ["11", "Druid: Werewolf, Wereraptor and Arcanist", "/guides/druid-builds/"],
  ["12", "Class Tier List: F2P, PvE and PvP", "/guides/class-tier-list/"],
  ["13", "Beginner Progression Guide", "/guides/beginner-progression/"],
  ["14", "Refining and Equipment Upgrade Guide", "/guides/refining-equipment/"],
  ["15", "Farming and Card Progression Guide", "/guides/farming-card-progression/"],
  ["16", "How to Download and Play on PC", "/guides/play-on-pc/"],
] as const;

const tools = [
  ["Skill Planner", "/sea/skill_planner/"],
  ["Event Schedule", "/sea/events/"],
  ["World Map", "/sea/maps/?lang=en-US#map=101"],
  ["Card Index", "/sea/cards/"],
  ["Monster Index", "/sea/monster_album/"],
  ["Equipment Index", "/sea/equipment/"],
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
          "Guide categories for classes, guild events, beginner progression, equipment, farming, PC installation, emulators, cloud gaming, top-ups, and connected RTNW tools.",
        isPartOf: { "@id": "https://rtnw.online/#website" },
        inLanguage: "en",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: featuredGuides.map(([number, title, href]) => ({
            "@type": "ListItem",
            position: Number(number),
            name: title,
            url: `https://rtnw.online${href}`,
          })),
        },
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

        <a className={styles.homeAction} href="/guides/guild-events/">
          Guild event guides <span aria-hidden="true">→</span>
        </a>

        <details className={styles.mobileNav}>
          <summary aria-label="Open navigation">☰</summary>
          <nav aria-label="Mobile navigation">
            <a href="/">Home</a>
            <a href="/guides/" aria-current="page">Guides</a>
            <a href="/guides/classes-builds/">Class builds</a>
            <a href="/guides/guild-events/">Guild events</a>
            <a href="/sea/events/">Event schedule</a>
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
              Source-based class builds and guild-event playbooks, plus progression, farming,
              equipment, PC, emulator, cloud-play, and account-safety guides connected to the
              database tools needed to act on each recommendation.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="/guides/classes-builds/">
                Browse class builds <span aria-hidden="true">→</span>
              </a>
              <a className={styles.secondary} href="/guides/guild-events/">
                Prepare guild events <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.library} id="guide-library" aria-labelledby="library-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>Guide library</p>
              <h2 id="library-title">Six practical paths for every adventurer.</h2>
            </div>
            <p>
              Each category combines original editorial organization with the planners, indexes,
              schedules, calculators, or maps that support the recommendation.
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
          <p className={styles.kicker}>Featured and refreshed guides</p>
          <h2 id="roadmap-title">From guild strategy to complete class builds.</h2>
          <p className={styles.roadmapIntro}>
            The newly refreshed guides are independently rewritten from supplied official GNJOY
            forum posts, retain the supported mechanics and terminology, reuse source screenshots
            only where no equivalent database artwork exists, and include canonical metadata,
            Article, Breadcrumb, and FAQ structured data.
          </p>
          <ol className={styles.roadmapList}>
            {featuredGuides.map(([number, title, href]) => (
              <li key={title}>
                <span className={styles.categoryNumber}>{number}</span>
                <strong><a href={href}>{title}</a></strong>
                <span className={styles.statusPublished}>Published</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.toolLinks} aria-labelledby="tool-links-title">
          <p className={styles.kicker}>Available now</p>
          <h2 id="tool-links-title">Read the guide, then verify it with live tools.</h2>
          <p>
            Plan a build, confirm an event, inspect a boss, locate a target, compare equipment, or
            find the correct card without leaving RTNW Hub.
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
            <a href="/guides/classes-builds/">Class builds</a>
            <a href="/guides/guild-events/">Guild events</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
        <a href="#guide-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

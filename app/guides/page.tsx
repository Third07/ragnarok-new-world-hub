import type { Metadata } from "next";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Guides",
  description:
    "Browse RTNW guides for classes, builds, beginner progression, equipment, farming, PC installation, emulator settings, cloud gaming, safe top-ups, and connected tools.",
  alternates: { canonical: "/guides/" },
  keywords: [
    "Ragnarok The New World guides",
    "Ragnarok The New World PC",
    "Ragnarok The New World emulator",
    "Ragnarok The New World top up",
    "Ragnarok The New World builds",
  ],
  openGraph: {
    type: "website",
    url: "/guides/",
    title: "Ragnarok: The New World Guides",
    description:
      "Practical RTNW class, progression, farming, PC, emulator, cloud gaming, and account-safety guides connected to useful tools.",
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
      "RTNW class, beginner, equipment, farming, PC, emulator, cloud gaming, and safe top-up guides.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const guideCategories = [
  {
    number: "01",
    title: "Classes and builds",
    description:
      "Compare F2P, PvE, and PvP class rankings, then study focused class and Druid build paths before investing skill points or equipment resources.",
    status: "Class guides published",
    href: "/guides/classes-builds/",
    link: "Browse class guides →",
  },
  {
    number: "02",
    title: "Beginner guides",
    description:
      "Follow a first-hours and first-week route with daily routines, F2P priorities, redeem-code checks, tool workflows, and common progression mistakes.",
    status: "Beginner guides published",
    href: "/guides/beginner-guides/",
    link: "Browse beginner guides →",
  },
  {
    number: "03",
    title: "Progression and equipment",
    description:
      "Choose better base equipment, prioritize the correct slot, and plan around refine checkpoints before committing scarce or paid resources.",
    status: "Progression guides published",
    href: "/guides/progression-equipment/",
    link: "Browse progression guides →",
  },
  {
    number: "04",
    title: "Monsters, cards and farming",
    description:
      "Choose cards by build fit, inspect monster sources, plan World Map routes, and measure whether a farming target is worth repeating.",
    status: "Farming guides published",
    href: "/guides/monsters-cards-farming/",
    link: "Browse farming guides →",
  },
  {
    number: "05",
    title: "PC, emulator and account setup",
    description:
      "Install the official PC version, tune an Android emulator, evaluate cloud play, compare payment fees, and protect your account while topping up.",
    status: "4 guides and 2 tools published",
    href: "/guides/technical/",
    link: "Browse setup guides →",
  },
] as const;

const roadmap = [
  ["01", "Class Tier List: F2P, PvE & PvP", "/guides/class-tier-list/"],
  ["02", "Beginner Progression Guide", "/guides/beginner-progression/"],
  ["03", "Druid Builds: Werewolf, Wereraptor & Arcanist", "/guides/druid-builds/"],
  ["04", "Refining and Equipment Upgrade Guide", "/guides/refining-equipment/"],
  ["05", "Farming and Card Progression Guide", "/guides/farming-card-progression/"],
  ["06", "How to Download and Play on PC", "/guides/play-on-pc/"],
  ["07", "Best Emulator Settings and Troubleshooting", "/guides/emulator-settings/"],
  ["08", "Safe Top-Up and Account Protection Guide", "/guides/top-up-safely/"],
  ["09", "Cloud Gaming Guide", "/guides/cloud-gaming/"],
] as const;

const tools = [
  ["Skill Planner", "/sea/skill_planner/"],
  ["World Map", "/sea/maps/?lang=en-US#map=101"],
  ["Card Index", "/sea/cards/"],
  ["Monster Index", "/sea/monster_album/"],
  ["PC Setup Checker", "/tools/pc-setup-checker/"],
  ["Top-Up Cost Calculator", "/tools/top-up-calculator/"],
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
          "Guide categories for classes, beginner progression, equipment, farming, PC installation, emulators, cloud gaming, top-ups, and connected RTNW tools.",
        isPartOf: { "@id": "https://rtnw.online/#website" },
        inLanguage: "en",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: roadmap.map(([number, title, href]) => ({
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

        <a className={styles.homeAction} href="/guides/technical/">
          PC and setup guides <span aria-hidden="true">→</span>
        </a>

        <details className={styles.mobileNav}>
          <summary aria-label="Open navigation">☰</summary>
          <nav aria-label="Mobile navigation">
            <a href="/">Home</a>
            <a href="/guides/" aria-current="page">Guides</a>
            <a href="/guides/technical/">PC and setup</a>
            <a href="/tools/pc-setup-checker/">PC Setup Checker</a>
            <a href="/tools/top-up-calculator/">Top-Up Calculator</a>
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
              Build advice, progression routes, farming references, PC installation, emulator troubleshooting, cloud-play decisions, and safer top-ups—connected to the database tools needed to act on each guide.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="/guides/play-on-pc/">Play on PC <span aria-hidden="true">→</span></a>
              <a className={styles.secondary} href="/guides/top-up-safely/">Read the safe top-up guide <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className={styles.library} id="guide-library" aria-labelledby="library-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>Guide library</p>
              <h2 id="library-title">Five practical paths for every adventurer.</h2>
            </div>
            <p>
              Each category combines focused articles with the planners, calculators, indexes, or maps that support the recommendation.
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
          <p className={styles.kicker}>Published cornerstone guides</p>
          <h2 id="roadmap-title">From first login to reliable PC play.</h2>
          <p className={styles.roadmapIntro}>
            The newer technical articles use official platform information where available, state uncertain or changing details clearly, and avoid paid placement in payment-provider comparisons.
          </p>
          <ol className={styles.roadmapList}>
            {roadmap.map(([number, title, href]) => (
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
          <h2 id="tool-links-title">Read the guide, then use the matching tool.</h2>
          <p>
            Plan a build, locate a target, check a PC setup, or calculate the real payment total without leaving the RTNW guide library.
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
            <a href="/guides/technical/">PC and setup</a>
            <a href="/#tools">Tools</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
        <a href="#guide-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveHeroImage from "../ResponsiveHeroImage";
import styles from "../field-guide.module.css";

export const metadata: Metadata = {
  title: "RTNW Hub Updates — New Guides, Tools & Database Changes",
  description:
    "Follow new RTNW Hub guides, tools, search features, database utilities, and recently updated Ragnarok: The New World resources.",
  alternates: { canonical: "/updates/" },
  keywords: [
    "RTNW Hub updates",
    "Ragnarok The New World new guides",
    "Ragnarok New World database updates",
  ],
  openGraph: {
    type: "website",
    url: "/updates/",
    title: "RTNW Hub Updates",
    description: "New guides, tools, database features, and recently updated site resources.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const releases = [
  {
    date: "August 8, 2026",
    title: "MVP hunting directory and Zeny session calculator",
    summary:
      "Published an original MVP hunting guide with 20 mapped boss records and direct database links, plus a Zeny farming guide that separates currencies and calculates actual net session income after costs.",
    links: [
      ["Open MVP Hunting Guide", "/guides/mvp-hunting/"],
      ["Use the Zeny Calculator", "/guides/zeny-farming/#zeny-session-calculator"],
      ["Browse farming guides", "/guides/monsters-cards-farming/"],
    ],
  },
  {
    date: "August 8, 2026",
    title: "Seven advanced-job guides and released Monk rebuild",
    summary:
      "Published Lord Knight, High Wizard, Sniper, High Priest, Assassin Cross, Whitesmith, and Night Walker guides with local skill images; rebuilt Monk as a released class guide and standardized FAQ styling and mobile reading space.",
    links: [
      ["Browse class guides", "/guides/classes-builds/"],
      ["Read the Monk guide", "/guides/monk-build/"],
      ["Read Lord Knight", "/guides/lord-knight-builds/"],
      ["Read High Priest", "/guides/high-priest-builds/"],
    ],
  },
  {
    date: "August 8, 2026",
    title: "Unified site design and expanded visual guide library",
    summary:
      "Standardized the shared navigation and mobile layout, refreshed ten class and guild guides with local in-game screenshots, and added a complete Guild Management playbook.",
    links: [
      ["Open the guide library", "/guides/"],
      ["Read Guild Management", "/guides/guild-management/"],
      ["Browse guild event guides", "/guides/guild-events/"],
    ],
  },
  {
    date: "August 4, 2026",
    title: "Unified search and database tools",
    summary:
      "Added one search page for guides, tools, monsters, cards, and equipment, plus a database-driven Farming Target Finder.",
    links: [
      ["Open unified search", "/search/"],
      ["Open Farming Target Finder", "/tools/farming-target-finder/"],
    ],
  },
  {
    date: "August 4, 2026",
    title: "Shareable calculators and improved advertisements",
    summary:
      "The PC Setup Checker and Top-Up Cost Calculator now support share links, local saved results, printing, resetting, and better advertisement placement outside the form controls.",
    links: [
      ["Open PC Setup Checker", "/tools/pc-setup-checker/"],
      ["Open Top-Up Calculator", "/tools/top-up-calculator/"],
    ],
  },
  {
    date: "August 4, 2026",
    title: "PC, emulator, cloud, and payment guide release",
    summary:
      "Published a technical guide collection covering PC installation, emulator configuration, cloud-play decisions, and safer top-up practices.",
    links: [
      ["Browse setup guides", "/guides/technical/"],
      ["Read the PC guide", "/guides/play-on-pc/"],
      ["Read emulator settings", "/guides/emulator-settings/"],
      ["Read the safe top-up guide", "/guides/top-up-safely/"],
    ],
  },
  {
    date: "August 3, 2026",
    title: "Foundation guide library completed",
    summary:
      "Expanded the guide library with class rankings, beginner progression, Druid builds, equipment refining, and card-farming workflows connected to the working databases.",
    links: [
      ["Browse all guides", "/guides/"],
      ["Read the class tier list", "/guides/class-tier-list/"],
      ["Read beginner progression", "/guides/beginner-progression/"],
    ],
  },
] as const;

const liveReferences = [
  {
    title: "Redeem codes",
    description: "Check the dedicated code guide for the current verification and redemption workflow.",
    href: "/guides/redeem-codes/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shitu.webp",
  },
  {
    title: "Events reference",
    description: "Open the database event schedule, tasks, and reward reference.",
    href: "/sea/events/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp",
  },
  {
    title: "Shop catalogue",
    description: "Browse the committed English in-game shop catalogue and item entries.",
    href: "/sea/shop/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp",
  },
  {
    title: "Database search",
    description: "Search monsters, cards, equipment, tools, and guides from one page.",
    href: "/search/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp",
  },
] as const;

export default function UpdatesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://rtnw.online/updates/#webpage",
        url: "https://rtnw.online/updates/",
        name: "RTNW Hub Updates",
        description: "New RTNW Hub guides, tools, database features, and recently updated resources.",
        isPartOf: { "@id": "https://rtnw.online/#website" },
        inLanguage: "en",
      },
      {
        "@type": "ItemList",
        itemListElement: releases.map((release, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: release.title,
          description: release.summary,
        })),
      },
    ],
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={styles.hero}>
        <ResponsiveHeroImage className={styles.heroImage} />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><span>Updates</span>
          </nav>
          <p className={styles.kicker}>RTNW Hub release center</p>
          <h1 className={styles.title}>New guides, tools, and database features</h1>
          <p className={styles.dek}>
            A transparent record of meaningful RTNW Hub releases. This page covers changes to this fan-made website; it does not present unverified game rumours as official patch notes.
          </p>
          <div className={styles.meta}>
            <span>Latest site changes</span><span>Useful live references</span><span>Independent fan project</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.article}>
          <h2>Latest RTNW Hub releases</h2>
          <p className={styles.lead}>
            Dates below represent material changes to guides, tools, search, or database navigation rather than automatic date refreshes.
          </p>

          <div className={styles.steps}>
            {releases.map((release) => (
              <article className={styles.step} key={`${release.date}-${release.title}`}>
                <strong>{release.title}</strong>
                <p>{release.date} · {release.summary}</p>
                <p>
                  {release.links.map(([label, href], index) => (
                    <span key={href}>
                      {index > 0 && " · "}<a href={href}>{label}</a>
                    </span>
                  ))}
                </p>
              </article>
            ))}
          </div>

          <h2>Current reference pages</h2>
          <p>
            These pages are the fastest way to check time-sensitive game references already available on RTNW Hub. Availability and game data can change, so verify the details shown inside each tool before acting on them.
          </p>
          <div className={styles.cardGrid}>
            {liveReferences.map((item) => (
              <a className={styles.card} href={item.href} key={item.href}>
                <img src={item.icon} alt="" />
                <span><strong>{item.title}</strong><span>{item.description}</span></span>
              </a>
            ))}
          </div>

          <h2>What is planned next</h2>
          <ul>
            <li>Expand searchable boss, economy, and progression pages when reliable game data is available.</li>
            <li>Add more tools that combine existing monster, card, equipment, map, and planner data without inventing missing values.</li>
            <li>Keep installation and payment guidance current when supported routes materially change.</li>
            <li>Continue improving mobile navigation, accessibility, page speed, and indexability.</li>
          </ul>

          <div className={styles.note}>
            <strong>Scope:</strong> This updates center records RTNW Hub releases. Official game maintenance, balance changes, and publisher announcements should only be added after a reliable source and publication date are available.
          </div>
        </section>
      </main>

    </div>
  );
}

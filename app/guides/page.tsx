import type { Metadata } from "next";
import Link from "next/link";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Guides",
  description:
    "Find Ragnarok: The New World class builds, redeem-code reports, card drop gauges, MVP locations, Zeny farming routes, guild events, and beginner guides.",
  alternates: { canonical: "/guides/" },
  keywords: [
    "Ragnarok The New World guides",
    "RTNW class builds",
    "RTNW Guild League guide",
    "RTNW Polarity Zone",
    "RTNW Hazy Forest",
    "Ragnarok The New World beginner guide",
    "Ragnarok The New World MVP locations",
    "Ragnarok The New World Zeny farming",
    "Ragnarok The New World card drop gauge",
  ],
  openGraph: {
    type: "website",
    url: "/guides/",
    title: "Ragnarok: The New World Guides",
    description:
      "Class builds, exact card-gauge math, MVP hunting, Zeny farming, guild-event strategy, progression, PC, emulator, cloud gaming, and account-safety guides.",
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
      "RTNW class builds, MVP hunting, Zeny farming, guild events, progression, PC, emulator, cloud gaming, and safe top-up guides.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const guideCategories = [
  {
    number: "01",
    title: "Classes and builds",
    description:
      "Compare F2P, PvE, and PvP rankings, released Monk builds, core second jobs, and seven detailed advanced second-job routes.",
    status: "16 class guides published",
    href: "/guides/classes-builds/",
    link: "Browse class guides →",
  },
  {
    number: "02",
    title: "Guild events",
    description:
      "Run the guild, prepare Guild League rosters, organize Polarity Zone boss groups, and maximize Hazy Forest scoring with clear counter and timing plans.",
    status: "4 guild guides published",
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
      "Calculate green, blue, and purple card-gauge kills, find mapped MVPs, plan counters, calculate net Zeny, and measure whether a monster route is worth repeating.",
    status: "Card gauge, MVP and Zeny guides published",
    href: "/guides/monsters-cards-farming/",
    link: "Browse farming guides →",
  },
  {
    number: "06",
    title: "PC, emulator and account setup",
    description:
      "Install the official PC version, tune an Android emulator, evaluate cloud play, compare payment fees, and protect your account while topping up.",
    status: "5 guides and 2 tools published",
    href: "/guides/technical/",
    link: "Browse setup guides →",
  },
] as const;

const featuredGuides = [
  ["Redeem Codes: Shared Lists, Reported Status and Redemption Steps", "/guides/redeem-codes/"],
  ["Guild Management: Members, Events and Resources", "/guides/guild-management/"],
  ["Guild League: Schedule, Tiers and GVG Strategy", "/guides/guild-league/"],
  ["Polarity Zone: Boss Mechanics and Guild Setup", "/guides/polarity-zone/"],
  ["Hazy Forest: Timing, Counters and Score Route", "/guides/hazy-forest/"],
  ["Swordman: VIT Tank, AGI Sword and Spear", "/guides/swordman-builds/"],
  ["Lord Knight: Tank, AGI Sword and Spear", "/guides/lord-knight-builds/"],
  ["Mage: Fire–Earth and Ice–Lightning Wizard", "/guides/mage-builds/"],
  ["High Wizard: Fire, Ice and Ghost", "/guides/high-wizard-builds/"],
  ["Archer: ADL, Pet and Trap Hunter", "/guides/archer-builds/"],
  ["Sniper: ADL, Falcon and Trap", "/guides/sniper-builds/"],
  ["Acolyte: Support, Exorcist and AGI-Crit", "/guides/acolyte-builds/"],
  ["High Priest: Support, Battle and Exorcist", "/guides/high-priest-builds/"],
  ["Monk: Combo, Guillotine Fist and PVP", "/guides/monk-build/"],
  ["Thief: Dual Dagger, Katar and Venom", "/guides/thief-builds/"],
  ["Assassin Cross: Dagger, Katar, Poison and Soul Destroyer", "/guides/assassin-cross-builds/"],
  ["Merchant: Cart, Axe and Turret", "/guides/merchant-builds/"],
  ["Whitesmith: Axe, Turret and Cart", "/guides/whitesmith-builds/"],
  ["Gunslinger: Pistol, Gatling, Rifle and Shotgun", "/guides/gunslinger-builds/"],
  ["Night Walker: Pistol, Machine Gun, Rifle and Shotgun", "/guides/night-walker-builds/"],
  ["Druid: Werewolf, Wereraptor and Arcanist", "/guides/druid-builds/"],
  ["Class Tier List: F2P, PvE and PvP", "/guides/class-tier-list/"],
  ["Beginner Progression Guide", "/guides/beginner-progression/"],
  ["Refining and Equipment Upgrade Guide", "/guides/refining-equipment/"],
  ["Card Drop Gauge and Farming Guide (600 Kills)", "/guides/farming-card-progression/"],
  ["MVP Hunting: Locations, Counters and Party Setup", "/guides/mvp-hunting/"],
  ["Zeny Farming Guide and Session Calculator", "/guides/zeny-farming/"],
  ["How to Download and Play on PC", "/guides/play-on-pc/"],
  ["Best Emulator Settings and Troubleshooting", "/guides/emulator-settings/"],
  ["Safe Top-Ups, Fees and Account Protection", "/guides/top-up-safely/"],
  ["Cloud Gaming Setup and Connection Guide", "/guides/cloud-gaming/"],
  ["Redfinger Cloud Phone: Universal Setup and RTNW Tips", "/guides/redfinger-cloud-phone/"],
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
          "Guide categories for classes, guild events, beginner progression, equipment, the 600-monster card drop gauge, MVP hunting, Zeny farming, PC installation, emulators, cloud gaming, top-ups, and connected RTNW tools.",
        isPartOf: { "@id": "https://rtnw.online/#website" },
        inLanguage: "en",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: featuredGuides.map(([title, href], index) => ({
            "@type": "ListItem",
            position: index + 1,
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

      <main className={styles.main} id="guide-content">
        <section className={styles.hero} aria-labelledby="guides-title">
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link>
              <span aria-hidden="true">/</span>
              <span>Guides</span>
            </nav>
            <h1 id="guides-title">Ragnarok: The New World <em>guides.</em></h1>
            <p>
              Find class builds, farming routes, guild event tips and guides for playing
              Ragnarok: The New World on PC or mobile.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primary} href="/guides/classes-builds/">
                Browse class builds <span aria-hidden="true">→</span>
              </a>
              <a className={styles.secondary} href="/guides/guild-events/">
                Prepare guild events <span aria-hidden="true">→</span>
              </a>
              <a className={styles.secondary} href="/guides/redeem-codes/">
                Check redeem codes <span aria-hidden="true">→</span>
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
              Choose a category to find the builds, farming advice or setup help you need.
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
          <p className={styles.kicker}>Browse the guides</p>
          <h2 id="roadmap-title">From guild strategy to complete class builds.</h2>
          <p className={styles.roadmapIntro}>
            Find skill builds, farming routes, boss tactics and setup instructions.
          </p>
          <ol className={styles.roadmapList}>
            {featuredGuides.map(([title, href], index) => (
              <li key={title}>
                <span className={styles.categoryNumber}>{String(index + 1).padStart(2, "0")}</span>
                <strong><a href={href}>{title}</a></strong>
                <span className={styles.statusPublished}>Published</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.toolLinks} aria-labelledby="tool-links-title">
          <p className={styles.kicker}>Available now</p>
          <h2 id="tool-links-title">Plan your next build or farming route.</h2>
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

    </div>
  );
}

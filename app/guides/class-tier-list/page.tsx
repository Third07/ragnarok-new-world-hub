import type { Metadata } from "next";
import Link from "next/link";
import styles from "./tier-list.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Class Tier List — F2P, PvE & PvP",
  description:
    "Compare all eight Ragnarok: The New World class families in separate F2P, PvE, and PvP tier lists, with budget notes, roles, and links to the RTNW Skill Planner.",
  alternates: { canonical: "/guides/class-tier-list/" },
  openGraph: {
    type: "article",
    url: "/guides/class-tier-list/",
    title: "Ragnarok: The New World Class Tier List — F2P, PvE & PvP",
    description:
      "An early SEA-launch class ranking based on community play, practical investment requirements, and RTNW Hub game data.",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World class tier list",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Class Tier List — F2P, PvE & PvP",
    description: "Separate rankings for free-to-play progression, PvE, and PvP across all eight class families.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

type ClassKey =
  | "swordman"
  | "mage"
  | "archer"
  | "acolyte"
  | "thief"
  | "merchant"
  | "gunslinger"
  | "druid";

type Tier = {
  label: "S" | "A" | "B" | "C";
  classes: ClassKey[];
  summary: string;
};

const classProfiles: Record<
  ClassKey,
  {
    name: string;
    paths: string;
    role: string;
    icon: string;
    practicalNote: string;
  }
> = {
  swordman: {
    name: "Swordman",
    paths: "Knight or Crusader lines",
    role: "Frontline, tank, melee damage",
    icon: "/media/images/job/icon_jsxq_201.webp",
    practicalNote:
      "Forgiving survivability and clear frontline value make this one of the safest low-budget class families.",
  },
  mage: {
    name: "Mage",
    paths: "Wizard line",
    role: "Magic AoE, control, farming",
    icon: "/media/images/job/icon_jsxq_301.webp",
    practicalNote:
      "Strong area damage and control provide fast progression, although positioning and SP management still matter.",
  },
  archer: {
    name: "Archer",
    paths: "Hunter, Bard, or Dancer lines",
    role: "Ranged damage and utility",
    icon: "/media/images/job/icon_jsxq_401.webp",
    practicalNote:
      "Safe attack range and several useful advanced paths make Archer a reliable long-term account investment.",
  },
  acolyte: {
    name: "Acolyte",
    paths: "Priest or Monk lines",
    role: "Healing, support, or burst",
    icon: "/media/images/job/icon_jsxq_501.webp",
    practicalNote:
      "Support builds stay valuable without chasing top damage numbers, while Monk routes can demand more focused investment.",
  },
  thief: {
    name: "Thief",
    paths: "Assassin line",
    role: "Mobility and single-target burst",
    icon: "/media/images/job/icon_jsxq_601.webp",
    practicalNote:
      "Excellent competitive burst potential, but less forgiving farming and gear dependence lower its budget ranking.",
  },
  merchant: {
    name: "Merchant",
    paths: "Blacksmith or Alchemist lines",
    role: "Economy, crafting, utility damage",
    icon: "/media/images/job/icon_jsxq_701.webp",
    practicalNote:
      "Its economy tools can benefit an account even when its direct combat efficiency trails dedicated damage classes.",
  },
  gunslinger: {
    name: "Gunslinger",
    paths: "Rebel line",
    role: "Ranged burst and weapon flexibility",
    icon: "/media/images/job/icon_jsxq_801.webp",
    practicalNote:
      "Very high PvE ceiling, but building around several weapon options can stretch a limited F2P upgrade budget.",
  },
  druid: {
    name: "Druid",
    paths: "Kanos and Alithea line",
    role: "Werewolf, Wereraptor, and Human Arcanist",
    icon: "/media/images/job/icon_jsxq_901.webp",
    practicalNote:
      "Flexible and skill-intensive. F2P players should specialize in one form first instead of spreading resources across every style.",
  },
};

const rankings: {
  id: string;
  eyebrow: string;
  title: string;
  introduction: string;
  bestPick: string;
  tiers: Tier[];
}[] = [
  {
    id: "f2p",
    eyebrow: "Budget efficiency",
    title: "Best classes for F2P players",
    introduction:
      "This ranking rewards survivability, useful performance at modest refinement, farming self-sufficiency, party demand, and how easily one focused equipment path can carry an account.",
    bestPick: "Best starting choices: Swordman or Mage. Safest ranged choice: Archer.",
    tiers: [
      {
        label: "S",
        classes: ["swordman", "mage"],
        summary: "Strong progression without requiring several expensive gear sets to feel useful.",
      },
      {
        label: "A",
        classes: ["archer", "acolyte"],
        summary: "Efficient and dependable, with either safe ranged play or excellent party value.",
      },
      {
        label: "B",
        classes: ["merchant", "thief", "gunslinger", "druid"],
        summary: "Playable without spending, but each asks for more specialization, patience, or mechanical knowledge.",
      },
    ],
  },
  {
    id: "pve",
    eyebrow: "Farming, dungeons and MVPs",
    title: "Best classes for PvE",
    introduction:
      "PvE placement combines field farming, dungeon contribution, solo comfort, boss damage, and the ability to keep useful uptime during predictable encounters.",
    bestPick: "Best mob farmer: Mage. Best boss-focused damage pick: Gunslinger.",
    tiers: [
      {
        label: "S",
        classes: ["mage", "gunslinger"],
        summary: "The strongest early PvE combination of area clearing, burst, mobility, and boss contribution.",
      },
      {
        label: "A",
        classes: ["archer", "swordman", "acolyte", "druid"],
        summary: "Excellent specialists that become top choices when the encounter favors their role or party utility.",
      },
      {
        label: "B",
        classes: ["thief", "merchant"],
        summary: "Capable classes whose farming pace or broad PvE efficiency is less consistent at equal investment.",
      },
    ],
  },
  {
    id: "pvp",
    eyebrow: "Arena and group combat",
    title: "Best classes for PvP",
    introduction:
      "PvP rewards burst, crowd control, survivability, target access, healing, and coordinated team utility more than raw farming speed. Rankings blend small-team arena and larger group combat.",
    bestPick: "Best eliminator: Thief/Assassin. Best frontline: Swordman/Knight. Best team support: Acolyte/Priest.",
    tiers: [
      {
        label: "S",
        classes: ["thief", "swordman"],
        summary: "Assassin burst and Knight-style frontline pressure shape competitive engagements.",
      },
      {
        label: "A",
        classes: ["acolyte", "mage", "archer"],
        summary: "High-value healing, control, and ranged pressure that become stronger in coordinated teams.",
      },
      {
        label: "B",
        classes: ["gunslinger", "druid"],
        summary: "Dangerous in skilled hands, but less universally reliable across every PvP format and investment level.",
      },
      {
        label: "C",
        classes: ["merchant"],
        summary: "Useful account and economy identity, but currently the least consistent dedicated PvP family.",
      },
    ],
  },
];

const faqs = [
  {
    question: "What is the best F2P class in Ragnarok: The New World?",
    answer:
      "Swordman and Mage are the safest general recommendations. Swordman offers forgiving survivability and frontline value, while Mage provides fast area clearing and strong farming efficiency.",
  },
  {
    question: "What is the best PvE class?",
    answer:
      "Mage is the strongest general farming and area-damage choice, while Gunslinger is a leading boss and MVP damage option. The better pick depends on whether you prioritize mob clearing or single-target burst.",
  },
  {
    question: "What is the best PvP class?",
    answer:
      "Thief into Assassin is a top burst-elimination option, while Swordman into Knight is a premier frontline choice. Priest remains one of the most valuable classes for coordinated team PvP.",
  },
  {
    question: "Is Druid good for F2P players?",
    answer:
      "Druid is playable as F2P, but it rewards specialization. Focus resources on one preferred form first rather than trying to optimize Werewolf, Wereraptor, and Human Arcanist simultaneously.",
  },
];

function TierBoard({ tiers }: { tiers: Tier[] }) {
  return (
    <div className={styles.tierBoard}>
      {tiers.map((tier) => (
        <div className={styles.tierRow} key={tier.label}>
          <div className={`${styles.tierLabel} ${styles[`tier${tier.label}`]}`}>
            <strong>{tier.label}</strong>
            <span>Tier</span>
          </div>
          <div className={styles.tierContent}>
            <div className={styles.tierClasses}>
              {tier.classes.map((classKey) => {
                const profile = classProfiles[classKey];
                return (
                  <article className={styles.classChip} key={classKey}>
                    <img src={profile.icon} alt="" width="52" height="52" loading="lazy" />
                    <span>
                      <strong>{profile.name}</strong>
                      <small>{profile.paths}</small>
                    </span>
                  </article>
                );
              })}
            </div>
            <p>{tier.summary}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ClassTierListPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://rtnw.online/guides/class-tier-list/#article",
        headline: "Ragnarok: The New World Class Tier List — F2P, PvE and PvP",
        description:
          "Separate early SEA-launch rankings for free-to-play progression, PvE, and PvP across all eight class families.",
        datePublished: "2026-08-03",
        dateModified: "2026-08-03",
        mainEntityOfPage: "https://rtnw.online/guides/class-tier-list/",
        author: { "@type": "Organization", name: "RTNW Hub" },
        publisher: { "@type": "Organization", name: "RTNW Hub" },
        image: "https://rtnw.online/assets/rtnw-hero-1280.webp",
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "RTNW Hub", item: "https://rtnw.online/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://rtnw.online/guides/" },
          {
            "@type": "ListItem",
            position: 3,
            name: "Class Tier List",
            item: "https://rtnw.online/guides/class-tier-list/",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className={styles.shell}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <a className="skip-link" href="#article-content">Skip to tier list</a>

      <main id="article-content">
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <span>Class Tier List</span>
            </nav>
            <p className={styles.kicker}>Updated August 3, 2026 · Early SEA-launch meta</p>
            <h1>Ragnarok: The New World <em>class tier list.</em></h1>
            <p className={styles.lead}>
              Separate rankings for F2P progression, PvE, and PvP—because the best farming class is not automatically the best budget main or competitive arena pick.
            </p>
            <div className={styles.heroActions}>
              <a href="#f2p">View F2P tier list <span aria-hidden="true">↓</span></a>
              <a href="/sea/skill_planner/">Open Skill Planner <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <div className={styles.articleLayout}>
          <aside className={styles.contents}>
            <strong>On this page</strong>
            <a href="#quick-answer">Quick answer</a>
            <a href="#methodology">How we rank classes</a>
            <a href="#f2p">F2P tier list</a>
            <a href="#pve">PvE tier list</a>
            <a href="#pvp">PvP tier list</a>
            <a href="#class-notes">Class notes</a>
            <a href="#faq">FAQ</a>
          </aside>

          <article className={styles.article}>
            <section className={styles.quickAnswer} id="quick-answer">
              <p className={styles.sectionKicker}>Quick answer</p>
              <h2>Pick for the mode you actually play.</h2>
              <div className={styles.answerGrid}>
                <article><span>F2P</span><strong>Swordman or Mage</strong><p>Reliable value before high refinement and specialized gear.</p></article>
                <article><span>PvE</span><strong>Mage or Gunslinger</strong><p>Choose Mage for AoE farming or Gunslinger for boss-focused burst.</p></article>
                <article><span>PvP</span><strong>Thief or Swordman</strong><p>Assassin burst and Knight frontline pressure lead different competitive roles.</p></article>
                <article><span>Party</span><strong>Acolyte</strong><p>Priest-style healing and support remain valuable even without top damage investment.</p></article>
              </div>
            </section>

            <section className={styles.methodology} id="methodology">
              <p className={styles.sectionKicker}>Methodology</p>
              <h2>Community-informed, data-checked, and intentionally provisional.</h2>
              <p>
                This is an editorial tier list, not an official balance ranking. Placements combine early player consensus, practical build costs, role demand, farming and boss performance, and the class families currently represented in the RTNW Hub Skill Planner. Rankings are made at the base-class family level; advanced branches and individual builds can perform above or below their family placement.
              </p>
              <div className={styles.notice}>
                <strong>Druid remains provisional.</strong>
                <span>Its three-form playstyle is newer, and its position may move as more Kanos and Alithea builds reach mature gear levels.</span>
              </div>
            </section>

            {rankings.map((ranking) => (
              <section className={styles.rankingSection} id={ranking.id} key={ranking.id}>
                <p className={styles.sectionKicker}>{ranking.eyebrow}</p>
                <h2>{ranking.title}</h2>
                <p>{ranking.introduction}</p>
                <div className={styles.bestPick}>{ranking.bestPick}</div>
                <TierBoard tiers={ranking.tiers} />
              </section>
            ))}

            <section className={styles.classNotes} id="class-notes">
              <p className={styles.sectionKicker}>All eight class families</p>
              <h2>What each class is really best at.</h2>
              <div className={styles.profileGrid}>
                {(Object.keys(classProfiles) as ClassKey[]).map((classKey) => {
                  const profile = classProfiles[classKey];
                  return (
                    <article className={styles.profileCard} key={classKey}>
                      <div className={styles.profileHeader}>
                        <img src={profile.icon} alt="" width="64" height="64" loading="lazy" />
                        <div><h3>{profile.name}</h3><span>{profile.paths}</span></div>
                      </div>
                      <strong>{profile.role}</strong>
                      <p>{profile.practicalNote}</p>
                      <a href="/sea/skill_planner/">Inspect skills in the planner <span aria-hidden="true">→</span></a>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className={styles.choiceGuide}>
              <p className={styles.sectionKicker}>Choosing your main</p>
              <h2>Tier is only one part of the decision.</h2>
              <p>
                A class you enjoy and understand will usually outperform a higher-ranked class you play poorly. Before committing refinement materials, test the skill tree, decide which role your guild or party needs, and identify whether your preferred build uses one focused equipment path or several competing setups.
              </p>
              <div className={styles.choiceLinks}>
                <a href="/sea/skill_planner/">Test the Skill Planner <span aria-hidden="true">→</span></a>
                <a href="/sea/equipment/">Browse the Equipment Index <span aria-hidden="true">→</span></a>
                <a href="/sea/cards/">Compare cards in the Card Index <span aria-hidden="true">→</span></a>
              </div>
            </section>

            <section className={styles.faq} id="faq">
              <p className={styles.sectionKicker}>Frequently asked questions</p>
              <h2>Class tier list FAQ</h2>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            <section className={styles.sources}>
              <p className={styles.sectionKicker}>Sources and update policy</p>
              <h2>How this page stays useful.</h2>
              <p>
                The launch roster and class-switching features are checked against the official game listing. Class names, advancement paths, and available skill data are checked against the RTNW Hub database. Rankings are editorial summaries of early community play and will be revised after meaningful balance changes or stronger live-server evidence.
              </p>
              <div>
                <a href="https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/" rel="nofollow external">Official game listing ↗</a>
                <a href="/sea/skill_planner/">RTNW Hub Skill Planner →</a>
                <a href="/guides/">More RTNW guides →</a>
              </div>
            </section>
          </article>
        </div>
      </main>

    </div>
  );
}

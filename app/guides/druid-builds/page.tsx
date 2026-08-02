import type { Metadata } from "next";
import styles from "./druid.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Druid Builds — Werewolf, Wereraptor & Arcanist",
  description:
    "Compare Druid Werewolf, Wereraptor, and Human Arcanist builds for Ragnarok: The New World, including stat priorities, core skills, rotations, gear targets, F2P advice, and links to the RTNW Skill Planner.",
  alternates: { canonical: "/guides/druid-builds/" },
  openGraph: {
    type: "article",
    url: "/guides/druid-builds/",
    title: "Ragnarok: The New World Druid Builds",
    description:
      "Three distinct Druid build paths: Werewolf melee bruiser, Wereraptor mobile ranged DPS, and Human Arcanist elemental AoE.",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World Druid build guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Druid Builds — Werewolf, Wereraptor & Arcanist",
    description: "Stats, skills, rotations, and budget priorities for all three Druid forms.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

type Priority = {
  level: "Core" | "High" | "Utility";
  skills: string;
  reason: string;
};

type DruidBuild = {
  id: "werewolf" | "wereraptor" | "arcanist";
  title: string;
  subtitle: string;
  icon: string;
  role: string;
  damage: string;
  range: string;
  difficulty: string;
  bestFor: string;
  statPriority: string;
  gearTargets: string[];
  summary: string;
  priorities: Priority[];
  rotation: string[];
  pve: string;
  pvp: string;
  budget: string;
};

const builds: DruidBuild[] = [
  {
    id: "werewolf",
    title: "Werewolf",
    subtitle: "Melee bruiser and sustain build",
    icon: "/media/images/skill/icon_skill_deluyi_bianshenmengshou.webp",
    role: "Frontline damage",
    damage: "Melee physical",
    range: "Close",
    difficulty: "Beginner-friendly",
    bestFor: "Solo progression, brawling, sustained PvE",
    statPriority: "STR → LUK / HIT → VIT",
    gearTargets: ["Melee P.DMG", "ATK", "CRIT", "HIT", "Max HP", "Damage reduction"],
    summary:
      "Werewolf is the safest Druid starting form when you prefer direct melee combat. The transformation itself raises Max HP, melee physical damage, STR, LUK, and HIT, while Savage Bite and Ravenous provide engage pressure and self-healing.",
    priorities: [
      {
        level: "Core",
        skills: "Transform: Werewolf, Savage Bite, Ravenous",
        reason: "Establishes the form, closes distance, and adds reliable sustain.",
      },
      {
        level: "Core",
        skills: "Shred, Primal Claw → Feral Claw → Alpha Claw",
        reason: "Primary moving AoE and advanced three-step burst chain.",
      },
      {
        level: "High",
        skills: "Merciless Claw, Vile Claw Strike, Sixth Sense, Wild Pulse",
        reason: "Improves filler damage, repositioning, ATK, CRIT, and claw scaling.",
      },
      {
        level: "Utility",
        skills: "Shadow Night Hunter",
        reason: "More valuable in PvP, where slow and restricted vision create kill windows.",
      },
    ],
    rotation: [
      "Use Savage Bite to engage or move between targets.",
      "Channel Shred while staying on top of grouped enemies.",
      "Use Primal Claw, then Feral Claw, then Alpha Claw inside their follow-up windows.",
      "Fill with Merciless Claw and use Vile Claw Strike when you need to retreat without stopping damage.",
      "Use Ravenous-enhanced Savage Bite when healing or target access matters more than perfect burst timing.",
    ],
    pve:
      "Strong for solo farming and encounters where staying in melee range is realistic. Kill resets on Savage Bite help movement through weaker targets, while Ravenous reduces potion pressure.",
    pvp:
      "Build enough HIT and durability to survive the approach. Shadow Night Hunter, Alpha Claw stun pressure, and the form's close-range burst are more useful when coordinated with allied control.",
    budget:
      "The easiest of the three forms to start on a limited budget because one physical melee setup supports both damage and survivability. Do not dilute early resources into ranged or magic gear.",
  },
  {
    id: "wereraptor",
    title: "Wereraptor",
    subtitle: "Mobile ranged physical build",
    icon: "/media/images/skill/icon_skill_deluyi_bianshenmengqin.webp",
    role: "Kiting ranged DPS",
    damage: "Ranged physical",
    range: "Long",
    difficulty: "Moderate",
    bestFor: "Mobile farming, solo kiting, ranged pressure",
    statPriority: "AGI → HIT / CRIT → survivability",
    gearTargets: ["Ranged P.DMG", "ATK", "ASPD", "CRIT", "HIT", "FLEE / MSPD"],
    summary:
      "Wereraptor trades Werewolf durability for range and movement. Its transformation raises movement speed, ranged physical damage, AGI, FLEE, and HIT, and most form skills can be cast while moving.",
    priorities: [
      {
        level: "Core",
        skills: "Transform: Wereraptor, Bird Feather Shot, Sharp Whirlwind",
        reason: "Creates the mobile ranged loop and covers both single-target and line damage.",
      },
      {
        level: "Core",
        skills: "Feather Spear Thrust, Wing Flap Spread",
        reason: "Advanced moving burst with ranged-damage and CRIT support.",
      },
      {
        level: "High",
        skills: "Low-Altitude Flight, Swift Tornado, Wind Veil",
        reason: "Provides approach, retreat, and movement-speed tools for spacing.",
      },
      {
        level: "Utility",
        skills: "Hurricane Wings, Synchronized Flight",
        reason: "Adds knockback control and an ally-targeted reposition option for teams.",
      },
    ],
    rotation: [
      "Maintain distance and use Bird Feather Shot while moving.",
      "Use Wing Flap Spread before Feather Spear Thrust when preparing a stronger crit-based burst window.",
      "Line up Sharp Whirlwind or Feather Spear Thrust through grouped targets.",
      "Use Swift Tornado to create space and Low-Altitude Flight when you deliberately need to close or cross a target.",
      "Save Hurricane Wings for enemies that reach you or when knockback improves the team's positioning.",
    ],
    pve:
      "Excellent when movement prevents damage and keeps uptime high. It is comfortable for open-world farming, but performance depends on maintaining range rather than face-tanking enemies.",
    pvp:
      "Prioritize positioning, HIT, and escape timing. Synchronized Flight and Hurricane Wings gain value in groups, while predictable use of Low-Altitude Flight can expose you to counter-control.",
    budget:
      "A focused ranged physical setup is viable for F2P, but ASPD, CRIT, HIT, and mobility compete for investment. Build reliable ranged damage first, then improve luxury speed and crit breakpoints.",
  },
  {
    id: "arcanist",
    title: "Human Arcanist",
    subtitle: "Elemental magic and AoE build",
    icon: "/media/images/skill/icon_skill_deluyi_ziranzhenli.webp",
    role: "Elemental AoE caster",
    damage: "Magic: Water, Wind, Earth",
    range: "Mid to long",
    difficulty: "Advanced",
    bestFor: "AoE farming, elemental specialization, group control",
    statPriority: "INT → cast comfort / SP → VIT",
    gearTargets: ["MATK", "M.DMG", "Element damage", "Cast reduction", "SP recovery", "INT / VIT"],
    summary:
      "Human Arcanist stays untransformed and builds around elemental spell engines. Nature's Shield adds INT, VIT, DEF, and MDEF, while Nature's Truth raises MATK, magic damage, and Water, Wind, and Earth damage.",
    priorities: [
      {
        level: "Core",
        skills: "Nature's Shield, Nature's Truth, Nature's Vigor",
        reason: "Supplies the defensive stats, magic scaling, Max SP, and recovery needed by every Arcanist variant.",
      },
      {
        level: "Core",
        skills: "Frozen Totem / Gale Blade / Blooming Splendor",
        reason: "Choose the elemental foundation that matches your preferred Frost, Storm, or Earth engine.",
      },
      {
        level: "High",
        skills: "Glacier Monolith, Overload, Earthen Sprout, Force of Nature",
        reason: "Builds the Kanos elemental triggers and provides a spell that counts as all three schools.",
      },
      {
        level: "High",
        skills: "Wrath of Nature, Glacial Stomp, Thunder Charge, Earth's Bounty",
        reason: "Adds advanced multi-school AoE, Frost movement/control, Storm charge generation, and Earth sustain.",
      },
      {
        level: "Utility",
        skills: "Gravity Well, Nature's Sanctuary",
        reason: "Powerful group control and emergency team healing, but both require deliberate timing and positioning.",
      },
    ],
    rotation: [
      "Maintain Nature's Shield and Nature's Truth before combat.",
      "Frost route: place Frozen Totem, trigger Glacier Monolith effects, then use Glacial Stomp for repositioning and root pressure.",
      "Storm route: cast Gale Blade, build or instantly gain Charge with Thunder Charge, then spend the empowered Storm window.",
      "Earth route: cast Blooming Splendor, build Growth through Earth skills, and benefit from Earth's Bounty sustain.",
      "Use Force of Nature or Wrath of Nature when you need one cast to interact with Frost, Storm, and Earth mechanics.",
      "Reserve Gravity Well for a controlled AoE setup rather than casting it into unsafe melee range without support.",
    ],
    pve:
      "The most flexible AoE Druid path. Frost offers setup and control, Storm emphasizes charge-driven damage, and Earth adds better sustain. Specializing first is more efficient than leveling every elemental branch equally.",
    pvp:
      "Arcanist becomes threatening when allies protect its cast windows. Gravity Well and Glacial Stomp can create major team plays, but interrupted casts and poor positioning punish the build heavily.",
    budget:
      "The most demanding F2P route because magic gear, cast comfort, SP sustain, and elemental bonuses all matter. Start with one element and a shared MATK core before expanding into a multi-element setup.",
  },
];

const faqs = [
  {
    question: "Which Druid build is best for beginners?",
    answer:
      "Werewolf is the simplest starting recommendation because it combines direct melee damage, Max HP bonuses, gap closing, and self-healing. Wereraptor and Arcanist reward stronger positioning and more specialized gear decisions.",
  },
  {
    question: "Which Druid build is best for F2P?",
    answer:
      "Werewolf is generally the easiest low-budget route. Wereraptor is viable with one focused ranged setup, while Arcanist usually needs the most supporting investment in MATK, casting, SP, and elemental bonuses.",
  },
  {
    question: "Can one Druid use all three builds?",
    answer:
      "The class can access all three playstyles, but their preferred stats and gear differ substantially. New and F2P players should fund one primary form first and treat the other forms as later projects.",
  },
  {
    question: "Is Wereraptor better than Werewolf for farming?",
    answer:
      "Wereraptor is often safer and more mobile for open-world farming, while Werewolf is more forgiving when enemies reach you. The better choice depends on whether you prefer kiting or sustained melee combat.",
  },
  {
    question: "Which Arcanist element should I choose?",
    answer:
      "Frost favors setup, movement, and control; Storm favors Charge-based damage; Earth adds Growth interactions and sustain. Start with the element supported by your available gear and preferred content.",
  },
];

export default function DruidBuildsPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://rtnw.online/guides/druid-builds/#article",
        headline: "Ragnarok: The New World Druid Builds — Werewolf, Wereraptor and Arcanist",
        description:
          "A three-form Druid guide covering stats, skill priorities, rotations, gear targets, PvE, PvP, and F2P planning.",
        datePublished: "2026-08-03",
        dateModified: "2026-08-03",
        mainEntityOfPage: "https://rtnw.online/guides/druid-builds/",
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
            name: "Druid Builds",
            item: "https://rtnw.online/guides/druid-builds/",
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
      <a className="skip-link" href="#druid-content">Skip to Druid builds</a>

      <header className={styles.header}>
        <a className="brand" href="/" aria-label="RTNW Hub home">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy"><strong>Ragnarok</strong><small>The New World Hub</small></span>
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/guides/">Guides</a>
          <a href="/guides/class-tier-list/">Class Tier List</a>
          <a href="/sea/skill_planner/">Skill Planner</a>
        </nav>
        <a className={styles.headerAction} href="/sea/skill_planner/">Build Druid skills <span aria-hidden="true">→</span></a>
      </header>

      <main id="druid-content">
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/">RTNW Hub</a><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <span>Druid Builds</span>
            </nav>
            <p className={styles.kicker}>Updated August 3, 2026 · Three-form build guide</p>
            <div className={styles.heroTitleRow}>
              <img src="/media/images/job/icon_jsxq_901.webp" alt="" width="92" height="92" />
              <h1>Ragnarok: The New World <em>Druid builds.</em></h1>
            </div>
            <p className={styles.lead}>
              Werewolf, Wereraptor, and Human Arcanist are three different builds—not cosmetic stances. Compare their stats, skill engines, rotations, and investment costs before committing your equipment.
            </p>
            <div className={styles.heroActions}>
              <a href="#comparison">Compare all three <span aria-hidden="true">↓</span></a>
              <a href="/sea/skill_planner/">Open Skill Planner <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <div className={styles.articleLayout}>
          <aside className={styles.contents}>
            <strong>On this page</strong>
            <a href="#comparison">Quick comparison</a>
            <a href="#investment">Investment rule</a>
            <a href="#werewolf">Werewolf build</a>
            <a href="#wereraptor">Wereraptor build</a>
            <a href="#arcanist">Arcanist build</a>
            <a href="#shared-tools">Build tools</a>
            <a href="#faq">FAQ</a>
          </aside>

          <article className={styles.article}>
            <section className={styles.comparison} id="comparison">
              <p className={styles.sectionKicker}>Quick comparison</p>
              <h2>Choose by combat style, not by appearance.</h2>
              <div className={styles.compareGrid}>
                {builds.map((build) => (
                  <a className={`${styles.compareCard} ${styles[build.id]}`} href={`#${build.id}`} key={build.id}>
                    <img src={build.icon} alt="" width="72" height="72" />
                    <span>{build.role}</span>
                    <h3>{build.title}</h3>
                    <p>{build.bestFor}</p>
                    <dl>
                      <div><dt>Damage</dt><dd>{build.damage}</dd></div>
                      <div><dt>Difficulty</dt><dd>{build.difficulty}</dd></div>
                    </dl>
                    <strong>View build →</strong>
                  </a>
                ))}
              </div>
            </section>

            <section className={styles.investment} id="investment">
              <p className={styles.sectionKicker}>F2P investment rule</p>
              <h2>One Druid can learn three forms, but one budget should not fund three complete builds.</h2>
              <p>
                Werewolf scales around melee physical stats, Wereraptor around ranged physical mobility, and Arcanist around magic and elemental systems. Shared defensive pieces may remain useful, but weapons, offensive cards, affixes, and many stat targets do not transfer efficiently.
              </p>
              <div className={styles.investmentSteps}>
                <article><span>01</span><strong>Pick a primary form</strong><p>Choose the playstyle you will use for daily progression and difficult content.</p></article>
                <article><span>02</span><strong>Complete its core</strong><p>Fund one weapon, one offensive stat direction, and the form's essential skill engine.</p></article>
                <article><span>03</span><strong>Build a reserve</strong><p>Do not start a second form until the first performs reliably without consuming every new resource.</p></article>
              </div>
            </section>

            {builds.map((build, buildIndex) => (
              <section className={`${styles.buildSection} ${styles[build.id]}`} id={build.id} key={build.id}>
                <div className={styles.buildHeading}>
                  <img src={build.icon} alt="" width="84" height="84" loading="lazy" />
                  <div>
                    <p className={styles.sectionKicker}>Build 0{buildIndex + 1}</p>
                    <h2>{build.title}</h2>
                    <strong>{build.subtitle}</strong>
                  </div>
                </div>

                <p className={styles.buildSummary}>{build.summary}</p>

                <div className={styles.buildFacts}>
                  <div><span>Role</span><strong>{build.role}</strong></div>
                  <div><span>Damage</span><strong>{build.damage}</strong></div>
                  <div><span>Range</span><strong>{build.range}</strong></div>
                  <div><span>Best for</span><strong>{build.bestFor}</strong></div>
                </div>

                <div className={styles.statPanel}>
                  <div>
                    <span>Stat direction</span>
                    <strong>{build.statPriority}</strong>
                    <p>Use this as a gearing direction, not a rigid universal point allocation.</p>
                  </div>
                  <div>
                    <span>Equipment and card targets</span>
                    <div className={styles.tags}>
                      {build.gearTargets.map((target) => <em key={target}>{target}</em>)}
                    </div>
                  </div>
                </div>

                <h3 className={styles.subheading}>Skill priorities</h3>
                <div className={styles.priorityTable}>
                  {build.priorities.map((priority) => (
                    <article key={`${build.id}-${priority.skills}`}>
                      <span className={styles[`priority${priority.level}`]}>{priority.level}</span>
                      <div><strong>{priority.skills}</strong><p>{priority.reason}</p></div>
                    </article>
                  ))}
                </div>

                <h3 className={styles.subheading}>Starter combat loop</h3>
                <ol className={styles.rotation}>
                  {build.rotation.map((step) => <li key={step}>{step}</li>)}
                </ol>

                <div className={styles.modeGrid}>
                  <article><span>PvE</span><p>{build.pve}</p></article>
                  <article><span>PvP</span><p>{build.pvp}</p></article>
                  <article><span>F2P note</span><p>{build.budget}</p></article>
                </div>

                <div className={styles.buildLinks}>
                  <a href="/sea/skill_planner/">Build this path in the Skill Planner <span aria-hidden="true">→</span></a>
                  <a href="/sea/equipment/">Browse Equipment Index <span aria-hidden="true">→</span></a>
                  <a href="/sea/cards/">Check Card Index <span aria-hidden="true">→</span></a>
                </div>
              </section>
            ))}

            <section className={styles.sharedTools} id="shared-tools">
              <p className={styles.sectionKicker}>Complete the build</p>
              <h2>Use the same research path for every Druid form.</h2>
              <div className={styles.toolGrid}>
                <a href="/sea/skill_planner/"><img src="/media/images/zhujiemian/icon_zhujiemian_jineng.webp" alt="" width="54" height="54" /><span><strong>Skill Planner</strong><small>Inspect prerequisites and share a skill tree.</small></span></a>
                <a href="/sea/equipment/"><img src="/media/images/zhujiemian/icon_zhujiemian_jingji.webp" alt="" width="54" height="54" /><span><strong>Equipment Index</strong><small>Compare gear types, stats, and set effects.</small></span></a>
                <a href="/sea/cards/"><img src="/media/images/zhujiemian/icon_zhujiemian_tujian.webp" alt="" width="54" height="54" /><span><strong>Card Index</strong><small>Search bonuses that match the chosen damage type.</small></span></a>
                <a href="/sea/affix_planner/"><img src="/media/images/zhujiemian/icon_zhujiemian_chongwuzhuangbei.webp" alt="" width="54" height="54" /><span><strong>Affix Planner</strong><small>Plan the offensive and defensive stat package.</small></span></a>
              </div>
            </section>

            <section className={styles.faq} id="faq">
              <p className={styles.sectionKicker}>Frequently asked questions</p>
              <h2>Druid build FAQ</h2>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            <section className={styles.sources}>
              <p className={styles.sectionKicker}>Data and update policy</p>
              <h2>Skill mechanics come from the RTNW Hub game database.</h2>
              <p>
                Skill names, prerequisites, form bonuses, damage types, movement behavior, elemental tags, and advancement paths are checked against the Druid, Kanos, and Alithea data used by the Skill Planner. Priority labels and rotations are editorial recommendations and may change as stronger live-server builds emerge.
              </p>
              <div>
                <a href="/sea/skill_planner/">Open Druid Skill Planner →</a>
                <a href="/guides/class-tier-list/">Read Class Tier List →</a>
                <a href="/guides/beginner-progression/">Read Beginner Guide →</a>
              </div>
            </section>
          </article>
        </div>
      </main>

      <footer>
        <a className="brand footer-brand" href="/">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy"><strong>Ragnarok</strong><small>The New World Hub</small></span>
        </a>
        <div className="footer-meta">
          <p>Independent fan-made game-data toolkit for Ragnarok: The New World.</p>
          <a href="/guides/">Guides</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
        <a href="#druid-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

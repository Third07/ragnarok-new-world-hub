import type { Metadata } from "next";
import styles from "./farming.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Farming & Card Progression Guide",
  description:
    "Plan efficient Ragnarok: The New World card farms with the RTNW Card Index, Monster Index, and World Map. Learn card priorities, source evaluation, route planning, session tracking, and F2P progression.",
  alternates: { canonical: "/guides/farming-card-progression/" },
  openGraph: {
    type: "article",
    url: "/guides/farming-card-progression/",
    title: "Ragnarok: The New World Farming & Card Progression Guide",
    description:
      "Choose useful cards, verify their sources, inspect the target monster, map the route, and measure whether the farm is worth continuing.",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World card farming guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Farming & Card Progression Guide",
    description: "Card priorities, monster sources, map routes, and efficient F2P farming decisions.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

type WorkflowStep = {
  number: string;
  title: string;
  body: string;
  link: string;
  linkLabel: string;
  icon: string;
};

const workflow: WorkflowStep[] = [
  {
    number: "01",
    title: "Define the missing effect",
    body:
      "Start with the build problem: damage, HIT, CRIT, survivability, SP comfort, resistance, or a specific encounter mechanic. Searching by effect is more efficient than browsing only by rarity.",
    link: "/sea/skill_planner/",
    linkLabel: "Review the build first",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp",
  },
  {
    number: "02",
    title: "Shortlist cards in the Card Index",
    body:
      "Filter by card slot, rarity, monster class, obtain source, name, or effect. Confirm that the card can actually be equipped in the slot available to the build.",
    link: "/sea/cards/",
    linkLabel: "Search the Card Index",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp",
  },
  {
    number: "03",
    title: "Verify every obtain source",
    body:
      "A card may come from normal monsters, Elite, Mini, MVP, activities, trade, tasks, dungeons, towers, shops, or other systems. Do not assume the monster source is the only practical route.",
    link: "/sea/cards/",
    linkLabel: "Compare obtain sources",
    icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp",
  },
  {
    number: "04",
    title: "Inspect the monster and drops",
    body:
      "Check target level, type, element, race, size, habitat, linked cards, and other drops. A slightly weaker card can become the better progression choice when its monster is much easier to farm.",
    link: "/sea/monster_album/",
    linkLabel: "Open the Monster Index",
    icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp",
  },
  {
    number: "05",
    title: "Build a repeatable map route",
    body:
      "Use the World Map to locate habitats and markers. Prefer routes with low travel time, reliable monster access, safe recovery, and useful secondary drops.",
    link: "/sea/maps/?lang=en-US#map=101",
    linkLabel: "Plan on the World Map",
    icon: "/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp",
  },
  {
    number: "06",
    title: "Measure the session",
    body:
      "Track kills, useful drops, materials, travel time, deaths, and consumable cost. Continue because the route performs well—not because a previous dry session feels like it must be repaid.",
    link: "#session-plan",
    linkLabel: "Use the session template",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shitu.webp",
  },
];

const progressionStages = [
  {
    stage: "Stage 1",
    title: "Fill empty or mismatched slots",
    goal: "Immediate account stability",
    body:
      "Use accessible cards that provide a relevant base stat, resistance, or quality-of-life effect. A functional slot is better than holding an empty slot while waiting for an ideal rare card.",
    examples: [
      ["Cramp Card", "ATK and M.ATK", "/media/images/item/icon_item_card_ls_01.webp"],
      ["Poring Card", "LUK", "/media/images/item/icon_item_card_bl_01.webp"],
    ],
  },
  {
    stage: "Stage 2",
    title: "Solve content-specific problems",
    goal: "Progress through current walls",
    body:
      "Target cards that answer a repeated failure condition. Resistance and immunity effects can outperform a small damage gain when control effects are stopping the character from acting.",
    examples: [
      ["Giearth Card", "Confusion immunity", "/media/images/item/icon_item_card_jes_01.webp"],
      ["Marduk Card", "Silence immunity", "/media/images/item/icon_item_card_medk_01.webp"],
      ["Nightmare Card", "Sleep immunity", "/media/images/item/icon_item_card_my_01.webp"],
    ],
  },
  {
    stage: "Stage 3",
    title: "Strengthen the build engine",
    goal: "Scale the chosen damage or support identity",
    body:
      "Move from generic stats toward multipliers and effects that match the build. Confirm the exact slot and full equipment package before committing to a long farm.",
    examples: [
      ["Angra Mantis Card", "CRIT DMG", "/media/images/item/icon_item_card_fktl_01.webp"],
      ["Mistress Card", "Magic damage and SP efficiency", "/media/images/item/icon_item_card_fh_01.webp"],
    ],
  },
  {
    stage: "Stage 4",
    title: "Pursue prestige and MVP targets",
    goal: "Endgame optimization",
    body:
      "Gold and MVP cards can be transformative, but they should not block cheaper improvements across the rest of the loadout. Treat them as long projects with alternative sources checked first.",
    examples: [
      ["Pharaoh Card", "Physical and magic damage reduction", "/media/images/item/icon_item_card_flw_01.webp"],
      ["Orc Hero Card", "VIT and stun immunity", "/media/images/item/icon_item_card_sryx_01.webp"],
    ],
  },
] as const;

const evaluationFactors = [
  ["Build fit", "Does the card improve the character's actual damage type, role, resistance need, or current content objective?"],
  ["Source access", "Can the account reliably enter the map, activity, dungeon, tower, market, or boss schedule that supplies it?"],
  ["Kill speed", "How many relevant targets can be defeated per minute without excessive downtime or consumable use?"],
  ["Route density", "How much of the session is spent fighting useful targets rather than traveling, waiting, or recovering?"],
  ["Secondary value", "Do the same monsters provide useful materials, equipment, currency, experience, or additional card targets?"],
  ["Replacement risk", "Will the card remain useful after the next equipment, build, or content upgrade?"],
] as const;

const sourceTypes = [
  {
    title: "Normal, Elite, Mini and MVP monsters",
    body: "Use the monster-class filters to compare farm difficulty. The source index can include level, type, handbook status, and an available rate value.",
  },
  {
    title: "Activities and dungeons",
    body: "The card dataset includes sources such as MVP activities, boss trophies, Heim dungeons, Forest activities, and Infinity Tower. Check schedule and entry limits before choosing these as the main route.",
  },
  {
    title: "Trade, auction and shops",
    body: "A direct purchase may be more efficient than farming when the route has poor uptime or the card is also obtainable through trade, auction, or store systems.",
  },
  {
    title: "Tasks, sign-in and other sources",
    body: "Some cards have non-monster acquisition paths. Always inspect the complete source list before committing days of combat farming.",
  },
] as const;

const mistakes = [
  ["Farming by rarity alone", "Rarity does not guarantee build fit, slot compatibility, source access, or good return on time."],
  ["Ignoring alternative sources", "The Card Index can list trade, tasks, dungeons, towers, shops, sign-in, and other acquisition paths."],
  ["Choosing a monster you kill slowly", "A lower-value target with higher kills per minute can produce better total progression and less consumable pressure."],
  ["Using unknown rates as precise odds", "When no rate is shown, treat the probability as unknown. Do not invent a percentage or estimate expected completion time from missing data."],
  ["Farming one target with no stop rule", "Set a session length or resource limit, then reassess the route instead of chasing a dry streak indefinitely."],
  ["Consuming cards before checking fusion", "Review the Card Fusion tool and its official-versus-speculated information before using valuable cards as materials."],
] as const;

const faqs = [
  {
    question: "Should I always farm the highest-rarity card available?",
    answer:
      "No. Build fit, slot compatibility, source access, kill speed, and replacement risk matter more than rarity alone. An accessible card that immediately solves the build can be the stronger progression target.",
  },
  {
    question: "What should I do when the Card Index does not show a drop rate?",
    answer:
      "Treat the rate as unknown. Use the source, monster, and map information to evaluate whether the route is practical, but do not convert missing data into a made-up percentage or expected number of kills.",
  },
  {
    question: "How long should one card-farming session be?",
    answer:
      "Use a fixed block that fits the account: about 15 minutes for a route test, 45 minutes for a normal focused session, or a longer block only when the route remains efficient and does not displace higher-priority daily content.",
  },
  {
    question: "Is buying a card worse than farming it?",
    answer:
      "Not necessarily. Compare the market or shop cost with the time, consumables, entry limits, and alternative rewards of farming. Purchasing can be efficient when the same time produces more value elsewhere.",
  },
  {
    question: "When should I use Card Fusion?",
    answer:
      "Check Card Fusion after defining the target card and before consuming duplicates or valuable materials. Review the tool's official information separately from any clearly labeled speculative information.",
  },
];

export default function FarmingCardProgressionGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://rtnw.online/guides/farming-card-progression/#article",
        headline: "Ragnarok: The New World Farming and Card Progression Guide",
        description:
          "A practical workflow for choosing card targets, checking sources, inspecting monsters, building map routes, and measuring farming efficiency.",
        datePublished: "2026-08-03",
        dateModified: "2026-08-03",
        mainEntityOfPage: "https://rtnw.online/guides/farming-card-progression/",
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
            name: "Farming and Card Progression",
            item: "https://rtnw.online/guides/farming-card-progression/",
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
      <a className="skip-link" href="#farming-content">Skip to farming guide</a>

      <header className={styles.header}>
        <a className="brand" href="/" aria-label="RTNW Hub home">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy"><strong>Ragnarok</strong><small>The New World Hub</small></span>
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/guides/">Guides</a>
          <a href="/sea/cards/">Card Index</a>
          <a href="/sea/monster_album/">Monster Index</a>
        </nav>
        <a className={styles.headerAction} href="/sea/cards/">Find a card target <span aria-hidden="true">→</span></a>
      </header>

      <main id="farming-content">
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/">RTNW Hub</a><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <span>Farming and Card Progression</span>
            </nav>
            <p className={styles.kicker}>Updated August 3, 2026 · Card and monster data workflow</p>
            <div className={styles.heroTitleRow}>
              <img src="/media/images/zhujiemian/icon_zhujiemian_tujian.webp" alt="" width="92" height="92" />
              <h1>Farm the right target. <em>Not only the rarest one.</em></h1>
            </div>
            <p className={styles.lead}>
              Turn card effects into an efficient route: choose the build need, compare every obtain source, inspect the monster, locate the habitat, and measure whether the session is worth repeating.
            </p>
            <div className={styles.heroActions}>
              <a href="#workflow">Start the workflow <span aria-hidden="true">↓</span></a>
              <a href="/sea/cards/">Open Card Index <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <div className={styles.articleLayout}>
          <aside className={styles.contents}>
            <strong>On this page</strong>
            <a href="#workflow">Three-tool workflow</a>
            <a href="#progression">Card progression stages</a>
            <a href="#evaluation">Evaluate a target</a>
            <a href="#sources">Obtain sources</a>
            <a href="#session-plan">Session templates</a>
            <a href="#mistakes">Common mistakes</a>
            <a href="#tools">Research tools</a>
            <a href="#faq">FAQ</a>
          </aside>

          <article className={styles.article}>
            <section className={styles.workflowSection} id="workflow">
              <p className={styles.sectionKicker}>Card Index → Monster Index → World Map</p>
              <h2>A six-step farming workflow.</h2>
              <p>
                The strongest route begins with the build requirement rather than a famous card name. Follow the data from effect to source to monster to habitat, then confirm the route with real session results.
              </p>
              <div className={styles.workflowGrid}>
                {workflow.map((step) => (
                  <article key={step.number}>
                    <div className={styles.workflowTop}>
                      <span>{step.number}</span>
                      <img src={step.icon} alt="" width="58" height="58" loading="lazy" />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <a href={step.link}>{step.linkLabel} <span aria-hidden="true">→</span></a>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.progressionSection} id="progression">
              <p className={styles.sectionKicker}>Progression order</p>
              <h2>Upgrade the account in stages.</h2>
              <p>
                These are not universal card rankings. They are an investment sequence: fill weak slots, solve current content, strengthen the build engine, and only then pursue the longest prestige targets.
              </p>
              <div className={styles.stageList}>
                {progressionStages.map((item, index) => (
                  <article key={item.title}>
                    <div className={styles.stageNumber}>0{index + 1}</div>
                    <div className={styles.stageContent}>
                      <span>{item.stage} · {item.goal}</span>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                      <div className={styles.exampleCards}>
                        {item.examples.map(([name, effect, icon]) => (
                          <div key={name}>
                            <img src={icon} alt="" width="48" height="48" loading="lazy" />
                            <span><strong>{name}</strong><small>{effect}</small></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className={styles.dataNotice}>
                <strong>Examples, not universal recommendations.</strong>
                <span>Card effects and source fields come from the site's English card dataset. The correct target still depends on class, build, slot, content, and available sources.</span>
              </div>
            </section>

            <section className={styles.evaluationSection} id="evaluation">
              <p className={styles.sectionKicker}>Target evaluation</p>
              <h2>Score the route before committing to it.</h2>
              <div className={styles.factorGrid}>
                {evaluationFactors.map(([title, body], index) => (
                  <article key={title}>
                    <span>{index + 1}</span>
                    <div><h3>{title}</h3><p>{body}</p></div>
                  </article>
                ))}
              </div>
              <div className={styles.rulePanel}>
                <strong>Practical rule</strong>
                <p>
                  Prefer the target that improves the build and can be farmed consistently. A prestigious card with poor access, low uptime, or a likely near-term replacement can be a weaker account decision.
                </p>
              </div>
            </section>

            <section className={styles.sourcesSection} id="sources">
              <p className={styles.sectionKicker}>Obtain-source planning</p>
              <h2>Monster drops are only one source category.</h2>
              <p>
                The Card Index stores multiple acquisition tables. Compare all available sources before deciding that open-world farming is the correct method.
              </p>
              <div className={styles.sourceGrid}>
                {sourceTypes.map((source) => (
                  <article key={source.title}><h3>{source.title}</h3><p>{source.body}</p></article>
                ))}
              </div>
              <a className={styles.featureLink} href="/sea/cards/">Compare card obtain sources <span aria-hidden="true">→</span></a>
            </section>

            <section className={styles.sessionSection} id="session-plan">
              <p className={styles.sectionKicker}>Session templates</p>
              <h2>Test first, then scale the farm.</h2>
              <div className={styles.sessionGrid}>
                <article>
                  <span>15 minutes</span>
                  <h3>Route test</h3>
                  <ol>
                    <li>Confirm the correct monster and habitat.</li>
                    <li>Measure travel and respawn downtime.</li>
                    <li>Check survival and consumable pressure.</li>
                    <li>Decide whether the route deserves a full session.</li>
                  </ol>
                </article>
                <article>
                  <span>45 minutes</span>
                  <h3>Focused farm</h3>
                  <ol>
                    <li>Record starting consumables and currency.</li>
                    <li>Stay on one planned loop.</li>
                    <li>Count useful cards, materials, and secondary drops.</li>
                    <li>Compare the result with another source or target.</li>
                  </ol>
                </article>
                <article>
                  <span>Extended block</span>
                  <h3>Only after validation</h3>
                  <ol>
                    <li>Complete higher-priority limited daily content first.</li>
                    <li>Set a time or consumable stop rule.</li>
                    <li>Take breaks and reassess declining efficiency.</li>
                    <li>Stop when the route no longer justifies the opportunity cost.</li>
                  </ol>
                </article>
              </div>
              <div className={styles.trackingStrip}>
                <span>Track</span>
                <strong>Kills · useful drops · travel time · deaths · consumables · secondary value</strong>
              </div>
            </section>

            <section className={styles.mistakesSection} id="mistakes">
              <p className={styles.sectionKicker}>Avoid wasted sessions</p>
              <h2>Six common farming mistakes.</h2>
              <div className={styles.mistakeList}>
                {mistakes.map(([title, body], index) => (
                  <article key={title}>
                    <span>0{index + 1}</span>
                    <div><h3>{title}</h3><p>{body}</p></div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.toolsSection} id="tools">
              <p className={styles.sectionKicker}>Connected research tools</p>
              <h2>Move from effect to route without guessing.</h2>
              <div className={styles.toolGrid}>
                <a href="/sea/cards/"><img src="/media/images/zhujiemian/icon_zhujiemian_tujian.webp" alt="" width="58" height="58" /><span><strong>Card Index</strong><small>Search effects, slots, rarity, sources, monsters, rates, and fusion.</small></span></a>
                <a href="/sea/monster_album/"><img src="/media/images/zhujiemian/icon_zhujiemian_fuben.webp" alt="" width="58" height="58" /><span><strong>Monster Index</strong><small>Inspect level, element, race, size, habitat, stats, and drops.</small></span></a>
                <a href="/sea/maps/?lang=en-US#map=101"><img src="/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp" alt="" width="58" height="58" /><span><strong>World Map</strong><small>Locate monsters and build a low-travel farming loop.</small></span></a>
                <a href="/sea/equipment/"><img src="/media/images/zhujiemian/icon_zhujiemian_jingji.webp" alt="" width="58" height="58" /><span><strong>Equipment Index</strong><small>Confirm the target slot and the equipment package receiving the card.</small></span></a>
              </div>
            </section>

            <section className={styles.faq} id="faq">
              <p className={styles.sectionKicker}>Frequently asked questions</p>
              <h2>Farming and card FAQ</h2>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            <section className={styles.sourcesNote}>
              <p className={styles.sectionKicker}>Data and editorial policy</p>
              <h2>Use known data without inventing missing odds.</h2>
              <p>
                Card names, effects, slots, rarity values, obtain-source tables, monster classes, linked monsters, and available rates are taken from the RTNW Hub card and monster datasets. Route scoring, progression stages, and session templates are editorial recommendations. When a rate is absent, the guide treats it as unknown rather than estimating a percentage.
              </p>
              <div>
                <a href="/sea/cards/">Open Card Index →</a>
                <a href="/sea/monster_album/">Open Monster Index →</a>
                <a href="/guides/refining-equipment/">Read Equipment Guide →</a>
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
        <a href="#farming-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

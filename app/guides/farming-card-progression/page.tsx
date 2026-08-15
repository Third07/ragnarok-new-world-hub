import type { Metadata } from "next";
import Link from "next/link";
import styles from "./farming.module.css";

export const metadata: Metadata = {
  title: "RTNW Card Drop Gauge & Farming Guide (600 Kills)",
  description:
    "See the Ragnarok: The New World 600-monster card drop gauge math: green 400 kills, blue 910, purple 10,000, daily charts, routes, and F2P tips.",
  alternates: { canonical: "/guides/farming-card-progression/" },
  keywords: [
    "Ragnarok The New World card drop gauge",
    "RTNW card farming guide",
    "RTNW 600 monsters",
    "Ragnarok New World green blue purple cards",
    "RTNW card pity gauge",
  ],
  openGraph: {
    type: "article",
    url: "/guides/farming-card-progression/",
    title: "RTNW Card Drop Gauge & Farming Guide (600 Kills)",
    description:
      "Exact green, blue, and purple card-gauge totals, daily progress charts, final-day kill counts, and a practical farming workflow.",
    images: [
      {
        url: "/assets/guides/farming-card-progression/card-gauge-farming-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Green, blue, and purple fantasy cards for the RTNW card drop gauge guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Card Drop Gauge Guide: 600-Kill Math",
    description: "Green 400 kills, blue 910, purple 10,000—plus exact final-day totals and farming routes.",
    images: ["/assets/guides/farming-card-progression/card-gauge-farming-hero-1280.webp"],
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

const cardGaugeTiers = [
  {
    rarity: "Green",
    tone: "green",
    gain: "+0.25 pp",
    killsToMax: "400",
    dayOne: "100% after 400 kills",
    finish: "Day 1 · 400 kills",
  },
  {
    rarity: "Blue",
    tone: "blue",
    gain: "+0.11 pp",
    killsToMax: "910",
    dayOne: "66% after 600 kills",
    finish: "Day 2 · 310 more kills",
  },
  {
    rarity: "Purple",
    tone: "purple",
    gain: "+0.01 pp",
    killsToMax: "10,000",
    dayOne: "6% after 600 kills",
    finish: "Day 17 · 400 more kills",
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
    question: "How many monsters fill the green, blue, and purple card drop gauges?",
    answer:
      "From an empty gauge at the listed 600-monster-mode values, green needs 400 qualifying kills, blue needs 910, and purple needs 10,000. Blue requires 910 because 909 kills at 0.11 percentage points each produce only 99.99%.",
  },
  {
    question: "How many days does each card color take at 600 monsters per day?",
    answer:
      "Green completes after 400 kills on day 1. Blue reaches 66% after 600 kills and needs 310 more on day 2. Purple reaches 96% after 16 full 600-kill days and needs 400 more kills on day 17.",
  },
  {
    question: "Is card drop gauge progress the same as card drop chance?",
    answer:
      "No. The 0.25, 0.11, and 0.01 values in this guide are deterministic gauge percentage points gained per qualifying kill. They are not the random probability that the card drops on that kill.",
  },
  {
    question: "Do I need to farm all 600 monsters on the final day?",
    answer:
      "No, if the listed per-kill values apply and the gauge starts at 0%. Green stops at 400 kills on day 1, blue needs only 310 kills on day 2, and purple needs only 400 kills on day 17. Extra arithmetic above 100% should not be treated as carryover unless the current game UI explicitly says so.",
  },
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
        headline: "RTNW Card Drop Gauge and Farming Guide (600-Monster Mode)",
        description:
          "Exact green, blue, and purple card drop gauge totals for the 600-monster mode, plus daily progress charts and a practical card-farming workflow.",
        datePublished: "2026-08-03",
        dateModified: "2026-08-15",
        mainEntityOfPage: "https://rtnw.online/guides/farming-card-progression/",
        author: { "@type": "Organization", name: "RTNW Hub" },
        publisher: { "@type": "Organization", name: "RTNW Hub" },
        image: "https://rtnw.online/assets/guides/farming-card-progression/card-gauge-farming-hero-1280.webp",
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
            name: "Card Drop Gauge and Farming",
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

      <main id="farming-content">
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <span>Card Drop Gauge and Farming</span>
            </nav>
            <p className={styles.kicker}>Updated August 15, 2026 · 600-monster card gauge math</p>
            <div className={styles.heroTitleRow}>
              <img src="/media/images/zhujiemian/icon_zhujiemian_tujian.webp" alt="" width="92" height="92" />
              <h1>RTNW card drop gauge. <em>Exact 600-kill farming math.</em></h1>
            </div>
            <p className={styles.lead}>
              Green, blue, and purple gauges fill at very different speeds. See the exact kill totals, daily progress, final-day workload, and the route-planning workflow that turns those kills into useful account progress.
            </p>
            <div className={styles.heroActions}>
              <a href="#card-drop-gauge">See the gauge chart <span aria-hidden="true">↓</span></a>
              <a href="/sea/cards/">Open Card Index <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <div className={styles.articleLayout}>
          <aside className={styles.contents}>
            <strong>On this page</strong>
            <a href="#card-drop-gauge">600-monster gauge math</a>
            <a href="#daily-progress">Daily progress chart</a>
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
            <section className={styles.gaugeSection} id="card-drop-gauge">
              <p className={styles.sectionKicker}>600-monster mode</p>
              <h2>Green 400. Blue 910. Purple 10,000 kills.</h2>
              <p>
                These totals use the gauge values shown for the 600-monster mode and assume every qualifying kill goes to the same monster and matching card target. The percentage is deterministic <strong>gauge progress</strong>, not the random chance that a card drops on that kill.
              </p>

              <figure className={styles.chartFigure} tabIndex={0} aria-label="Scrollable card-gauge completion chart">
                <img
                  src="/assets/guides/farming-card-progression/card-gauge-600-summary.svg"
                  alt="Card drop gauge chart: green needs 400 kills, blue 910, and purple 10,000"
                  width="1200"
                  height="675"
                />
                <figcaption>Original RTNW Hub chart. “pp” means percentage points added to the gauge per qualifying kill.</figcaption>
              </figure>

              <div className={styles.gaugeTableWrap}>
                <table>
                  <caption>Card drop gauge completion table from 0% at up to 600 qualifying kills per day</caption>
                  <thead>
                    <tr>
                      <th scope="col">Card color</th>
                      <th scope="col">Gauge per kill</th>
                      <th scope="col">Kills to 100%</th>
                      <th scope="col">After day 1</th>
                      <th scope="col">Exact finish</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardGaugeTiers.map((tier) => (
                      <tr key={tier.rarity}>
                        <th scope="row">
                          <span className={styles.tierLabel} data-rarity={tier.tone}>
                            <span aria-hidden="true" />{tier.rarity}
                          </span>
                        </th>
                        <td>{tier.gain}</td>
                        <td><strong>{tier.killsToMax}</strong></td>
                        <td>{tier.dayOne}</td>
                        <td>{tier.finish}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.gaugeInsights}>
                <article>
                  <span>01</span>
                  <div>
                    <h3>Why blue takes 910 kills</h3>
                    <p>100 ÷ 0.11 = 909.09. Kills are whole numbers, so round up. At kill 909 the gauge is 99.99%; kill 910 crosses 100%.</p>
                  </div>
                </article>
                <article>
                  <span>02</span>
                  <div>
                    <h3>Do not count raw overflow</h3>
                    <p>A full day calculates to 150% green, two full days to 132% blue, and 17 full days to 102% purple. For planning, cap each gauge at 100% and stop when it completes.</p>
                  </div>
                </article>
              </div>
            </section>

            <section className={styles.dailyGaugeSection} id="daily-progress">
              <p className={styles.sectionKicker}>Daily progress tracker</p>
              <h2>The final day is only a partial 600-kill day.</h2>
              <p>
                At the full daily allowance, green finishes during day 1. Blue needs one full day plus 310 kills. Purple needs 16 full days plus 400 kills. Splitting the 600 kills between different monsters slows each individual card gauge.
              </p>

              <figure className={styles.chartFigure} tabIndex={0} aria-label="Scrollable daily card-gauge progress chart">
                <img
                  src="/assets/guides/farming-card-progression/card-gauge-daily-progress.svg"
                  alt="Daily progress chart showing green completing on day 1, blue on day 2, and purple on day 17"
                  width="1200"
                  height="675"
                  loading="lazy"
                />
                <figcaption>Progress is capped at 100%. The chart assumes the gauge starts empty and every listed kill qualifies.</figcaption>
              </figure>

              <div className={styles.formulaPanel}>
                <p className={styles.sectionKicker}>Use this for any current gauge</p>
                <p><strong>Kills remaining</strong> = ceiling((100 − current gauge %) ÷ gauge points per kill)</p>
                <p><strong>Days remaining</strong> = ceiling(kills remaining ÷ 600)</p>
              </div>

              <div className={styles.dataNotice}>
                <strong>Live-system check.</strong>
                <span>These calculations independently recalculate the values in the supplied 600-monster reference. Game rules can change by patch or region, so confirm the per-kill value and eligibility shown in your current in-game card gauge before planning a long purple-card farm.</span>
              </div>
            </section>

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
                <span>Card effects and source fields come from the site’s English card dataset. The correct target still depends on class, build, slot, content, and available sources.</span>
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
                <a href="/guides/mvp-hunting/"><img src="/media/images/activity/icon_activity_mvp.webp" alt="" width="58" height="58" /><span><strong>MVP Hunting Guide</strong><small>Compare mapped bosses, counters, markers, and party preparation.</small></span></a>
                <a href="/guides/zeny-farming/"><img src="/media/images/item/icon_item_currency2_zeny_01.webp" alt="" width="58" height="58" /><span><strong>Zeny Farming Guide</strong><small>Measure completed income, costs, and comparable net Zeny per hour.</small></span></a>
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
                <a href="/guides/mvp-hunting/">Read MVP Hunting Guide →</a>
                <a href="/guides/zeny-farming/">Use Zeny Calculator →</a>
              </div>
            </section>
          </article>
        </div>
      </main>

    </div>
  );
}

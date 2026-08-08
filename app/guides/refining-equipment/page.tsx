import type { Metadata } from "next";
import Link from "next/link";
import styles from "./refining.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Refining & Equipment Upgrade Guide",
  description:
    "Plan Ragnarok: The New World equipment upgrades with refine checkpoints, material bands, slot priorities, F2P budgeting, common mistakes, and direct links to RTNW equipment tools.",
  alternates: { canonical: "/guides/refining-equipment/" },
  openGraph: {
    type: "article",
    url: "/guides/refining-equipment/",
    title: "Ragnarok: The New World Refining & Equipment Upgrade Guide",
    description:
      "Choose better base equipment, distribute resources by slot, and plan around the +6, +9, +12, and +15 refine checkpoints.",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World refining and equipment guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Refining & Equipment Upgrade Guide",
    description: "Equipment selection, refine checkpoints, materials, budgeting, and F2P priorities.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

type Checkpoint = {
  level: string;
  label: string;
  audience: string;
  recommendation: string;
  risk: string;
  tone: "foundation" | "safe" | "focused" | "advanced" | "endgame";
};

const checkpoints: Checkpoint[] = [
  {
    level: "+3",
    label: "Foundation",
    audience: "New accounts and replacement gear",
    recommendation:
      "The first three attempts are listed at 100% in the SEA refine data. Use +3 as the inexpensive baseline for equipment already in your active loadout.",
    risk: "The attempt from +3 to +4 is the first listed step with a failure chance.",
    tone: "foundation",
  },
  {
    level: "+6",
    label: "First safe checkpoint",
    audience: "Early progression and F2P cores",
    recommendation:
      "Build a stable primary set before chasing higher numbers. +6 is the first safe checkpoint modeled by the Refine Simulator and a practical stopping point for secondary slots.",
    risk: "Safe does not mean the final attempt is guaranteed; reaching +6 still consumes materials and attempts.",
    tone: "safe",
  },
  {
    level: "+9",
    label: "Focused investment",
    audience: "Main weapon and long-term pieces",
    recommendation:
      "Push selectively. A damage dealer should normally prioritize the main weapon and proven long-term equipment instead of raising every slot evenly.",
    risk: "The current +7 to +8 and +8 to +9 rows include downgrade probability.",
    tone: "focused",
  },
  {
    level: "+12",
    label: "Advanced checkpoint",
    audience: "Established builds",
    recommendation:
      "Treat +12 as a deliberate project. Confirm the base item, set effect, cards, and affix direction before committing Enriched Oridecon and repeated Bound Zeny costs.",
    risk: "Recovery from an unsuccessful sequence can cost much more than the visible price of one attempt.",
    tone: "advanced",
  },
  {
    level: "+15 and beyond",
    label: "Endgame project",
    audience: "Optimized or high-budget characters",
    recommendation:
      "Do not use endgame refine materials to rescue a weak equipment choice. The base item and complete build package should already be correct before this stage.",
    risk: "The +15 to +20 band uses HD Oridecon and sits beyond the final listed safe checkpoint.",
    tone: "endgame",
  },
];

const workflow = [
  {
    number: "01",
    title: "Define the build",
    body: "Lock the job, damage type, primary stats, and content goal first. Werewolf, Wereraptor, and Human Arcanist do not evaluate the same offensive equipment as interchangeable.",
    href: "/guides/druid-builds/",
    link: "Review Druid builds",
  },
  {
    number: "02",
    title: "Choose the base item",
    body: "Filter by job, quality, equipment type, subtype, stats, and set effects. Rarity alone does not make an item efficient for the selected build.",
    href: "/sea/equipment/",
    link: "Search equipment",
  },
  {
    number: "03",
    title: "Value the complete package",
    body: "Price the item together with its refine plan, compatible cards, affix targets, and any additional pieces needed to activate the intended set effect.",
    href: "/sea/affix_planner/",
    link: "Plan affixes",
  },
  {
    number: "04",
    title: "Select a stopping point",
    body: "Choose the checkpoint before spending. A pre-committed target prevents emotional attempts after an unlucky sequence and protects resources reserved for other slots.",
    href: "/sea/refine/",
    link: "Simulate the target",
  },
];

const materialBands = [
  {
    range: "+0 → +10",
    name: "Oridecon",
    icon: "/media/images/item/icon_item_szjs_01.webp",
    note: "Used by simulator rows starting at refine levels +0 through +9.",
  },
  {
    range: "+10 → +15",
    name: "Enriched Oridecon",
    icon: "/media/images/item/icon_item_szjs_02.webp",
    note: "Used by simulator rows starting at +10 through +14.",
  },
  {
    range: "+15 → +20",
    name: "HD Oridecon",
    icon: "/media/images/item/icon_item_szjs_03.webp",
    note: "Used by simulator rows starting at +15 through +19.",
  },
];

const slotPriorities = [
  {
    title: "Main weapon",
    tag: "Default first priority",
    icon: "/media/images/zhujiemian/icon_zhujiemian_qianghua.webp",
    body: "For damage-focused progression, the main weapon usually provides the clearest offensive return and should receive the first selective push toward a higher checkpoint.",
    exception: "Tanks and supports may gain more practical value from survival, healing, or utility equipment.",
  },
  {
    title: "Set-defining equipment",
    tag: "Build-enabling priority",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
    body: "A piece that completes an essential set effect can outrank a stronger isolated item. Confirm that the full set is realistically obtainable before investing premium materials.",
    exception: "Do not preserve a weak set after its effect stops matching the build or content.",
  },
  {
    title: "Armor and survival slots",
    tag: "Raise the weakest link",
    icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp",
    body: "After the offensive core is stable, improve severely under-refined armor rather than overinvesting in one slot while the rest of the loadout remains fragile.",
    exception: "A specific encounter may justify prioritizing the defensive stat that solves its actual failure condition.",
  },
  {
    title: "Accessories and flex pieces",
    tag: "Finish after the core",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp",
    body: "Accessories become efficient when their base stats, cards, and affixes reinforce the same finalized build. Delay premium investment when replacement is likely.",
    exception: "A uniquely strong effect can move an accessory earlier, but the complete cost still matters.",
  },
];

const mistakes = [
  [
    "Refining temporary gear",
    "Confirm that the item will remain equipped long enough to justify its materials, cards, affixes, and Bound Zeny before pushing beyond the baseline.",
  ],
  [
    "Leveling every slot equally",
    "Equal refine numbers look tidy but may delay meaningful power. Fund the build-defining weapon or set first, then stabilize weak defensive slots.",
  ],
  [
    "Treating one attempt as the cost",
    "The real budget includes repeated attempts, downgrade recovery, support materials, and resources no longer available for other progression systems.",
  ],
  [
    "Using support materials automatically",
    "Check the current row and simulator effect first. Support value changes with the success, downgrade, and failure distribution of the attempted level.",
  ],
  [
    "Ignoring cards and affixes",
    "A refine level cannot repair a base item whose stat package, card plan, or affix direction conflicts with the class build.",
  ],
  [
    "Chasing losses",
    "Stop at the selected checkpoint or resource limit. An unlucky sequence does not make the next attempt more deserving of the account's remaining budget.",
  ],
] as const;

const tools = [
  {
    title: "Equipment Database",
    description: "Filter base items, jobs, quality, types, stats, and set effects.",
    href: "/sea/equipment/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
  },
  {
    title: "Refine Simulator",
    description: "Inspect rates, failures, downgrades, materials, and projected costs.",
    href: "/sea/refine/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_qianghua.webp",
  },
  {
    title: "Affix Planner",
    description: "Align the item's additional stats with the selected build.",
    href: "/sea/affix_planner/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_chongwuzhuangbei.webp",
  },
  {
    title: "Card Database",
    description: "Search card bonuses before committing valuable cards to a slot.",
    href: "/sea/cards/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp",
  },
  {
    title: "Shop Database",
    description: "Check listed shop items and currencies while planning acquisition.",
    href: "/sea/shop/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp",
  },
  {
    title: "Beginner Progression",
    description: "Fit equipment spending into the broader first-week resource plan.",
    href: "/guides/beginner-progression/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp",
  },
];

const faqs = [
  {
    question: "What are the safe refine levels in the RTNW Hub simulator?",
    answer:
      "The current SEA refine data marks +6, +9, +12, and +15 as safe checkpoints. The simulator models failure as returning to the nearest safe checkpoint at or below the current level.",
  },
  {
    question: "What refine level should an F2P player target first?",
    answer:
      "A practical route is to establish active equipment at +3, build the core set toward +6, then push only the main weapon or proven long-term pieces toward +9. Higher checkpoints should be separate projects.",
  },
  {
    question: "Should I refine my weapon before armor?",
    answer:
      "For most damage-focused builds, the main weapon is the default first priority. Tanks, supports, and characters blocked by survivability may need to prioritize defensive or utility equipment instead.",
  },
  {
    question: "Does a safe checkpoint mean the attempt is guaranteed?",
    answer:
      "No. A safe checkpoint is a protected stopping level in the simulator model. The attempt required to reach that checkpoint can still have a success rate below 100 percent.",
  },
  {
    question: "When should I use the Refine Simulator?",
    answer:
      "Use it before committing materials to compare rate changes, downgrade exposure, Bound Zeny consumption, support options, and the volatility between the current level and intended checkpoint.",
  },
];

export default function RefiningEquipmentGuidePage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://rtnw.online/guides/refining-equipment/#article",
        headline: "Ragnarok: The New World Refining and Equipment Upgrade Guide",
        description:
          "Equipment selection, slot priorities, refine checkpoints, material bands, budgeting, and F2P upgrade planning.",
        datePublished: "2026-08-03",
        dateModified: "2026-08-03",
        mainEntityOfPage: "https://rtnw.online/guides/refining-equipment/",
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
            name: "Refining and Equipment",
            item: "https://rtnw.online/guides/refining-equipment/",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <a className="skip-link" href="#refining-content">Skip to refining guide</a>

      <main id="refining-content">
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <span>Refining and Equipment</span>
            </nav>
            <p className={styles.kicker}>Updated August 3, 2026 · SEA data guide</p>
            <div className={styles.heroTitleRow}>
              <img src="/media/images/zhujiemian/icon_zhujiemian_qianghua.webp" alt="" width="92" height="92" />
              <h1>Refine less blindly. <em>Build more efficiently.</em></h1>
            </div>
            <p className={styles.lead}>
              Choose equipment for the build first, select the slot that deserves investment second, and decide the stopping checkpoint before making the first expensive attempt.
            </p>
            <div className={styles.heroActions}>
              <a href="#checkpoints">View refine checkpoints <span aria-hidden="true">↓</span></a>
              <a href="/sea/refine/">Open Refine Simulator <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <div className={styles.articleLayout}>
          <aside className={styles.contents}>
            <strong>On this page</strong>
            <a href="#workflow">Upgrade workflow</a>
            <a href="#checkpoints">Refine checkpoints</a>
            <a href="#materials">Materials and risk</a>
            <a href="#slots">Slot priorities</a>
            <a href="#budget">F2P budget rule</a>
            <a href="#mistakes">Common mistakes</a>
            <a href="#tools">Planning tools</a>
            <a href="#faq">FAQ</a>
          </aside>

          <article className={styles.article}>
            <section className={styles.workflow} id="workflow">
              <p className={styles.sectionKicker}>The correct order</p>
              <h2>Refining is the final decision—not the first.</h2>
              <p>
                A high refine number cannot make the wrong base item efficient. Use the same four-step process whenever a new weapon, armor piece, or accessory appears.
              </p>
              <div className={styles.workflowGrid}>
                {workflow.map((step) => (
                  <article key={step.number}>
                    <span>{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                    <a href={step.href}>{step.link} <span aria-hidden="true">→</span></a>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.checkpoints} id="checkpoints">
              <p className={styles.sectionKicker}>Checkpoint strategy</p>
              <h2>Plan around protected levels instead of one more attempt.</h2>
              <p>
                The current SEA data has a +20 maximum and marks +6, +9, +12, and +15 as safe levels. These recommendations are budget frameworks, not universal requirements for every class or slot.
              </p>
              <div className={styles.checkpointList}>
                {checkpoints.map((checkpoint) => (
                  <article className={styles[checkpoint.tone]} key={checkpoint.level}>
                    <div className={styles.checkpointLevel}>{checkpoint.level}</div>
                    <div className={styles.checkpointBody}>
                      <span>{checkpoint.label}</span>
                      <h3>{checkpoint.audience}</h3>
                      <p>{checkpoint.recommendation}</p>
                      <small><strong>Risk note:</strong> {checkpoint.risk}</small>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.materials} id="materials">
              <p className={styles.sectionKicker}>Materials and risk bands</p>
              <h2>The material changes when the project becomes more expensive.</h2>
              <p>
                Each attempt also consumes Bound Zeny in the simulator data. The visible price of one row is only the starting point because repeated attempts and downgrade recovery can multiply the total.
              </p>
              <div className={styles.materialGrid}>
                {materialBands.map((band) => (
                  <article key={band.range}>
                    <img src={band.icon} alt="" width="68" height="68" loading="lazy" />
                    <span>{band.range}</span>
                    <h3>{band.name}</h3>
                    <p>{band.note}</p>
                  </article>
                ))}
              </div>
              <div className={styles.riskPanel}>
                <div><span>Success</span><strong>The item moves to the target level.</strong></div>
                <div><span>Downgrade</span><strong>Applicable rows can move the item down one refine level.</strong></div>
                <div><span>Failure</span><strong>The simulator returns the item to the nearest safe checkpoint at or below its current level.</strong></div>
              </div>
              <p className={styles.dataNote}>
                The simulator exposes row-specific support options such as Blessing, No Downgrade, and Meteoric Iron where the loaded data enables them. Compare the displayed rates and material consumption before activating support.
              </p>
            </section>

            <section className={styles.slots} id="slots">
              <p className={styles.sectionKicker}>Where resources go first</p>
              <h2>Prioritize the slot that advances the build—not the lowest number.</h2>
              <div className={styles.slotGrid}>
                {slotPriorities.map((slot) => (
                  <article key={slot.title}>
                    <div className={styles.slotTop}>
                      <img src={slot.icon} alt="" width="58" height="58" loading="lazy" />
                      <span>{slot.tag}</span>
                    </div>
                    <h3>{slot.title}</h3>
                    <p>{slot.body}</p>
                    <small><strong>Exception:</strong> {slot.exception}</small>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.budget} id="budget">
              <p className={styles.sectionKicker}>F2P budget rule</p>
              <h2>Separate maintenance, progression, and high-risk materials.</h2>
              <p>
                Spending everything on one refine session can improve one slot while freezing the rest of the account. Keep three resource buckets so ordinary progression continues even when a checkpoint takes longer than expected.
              </p>
              <div className={styles.budgetGrid}>
                <article><span>01</span><h3>Maintenance reserve</h3><p>Bound Zeny and common materials kept for routine upgrades, replacement pieces, and normal progression.</p></article>
                <article><span>02</span><h3>Checkpoint fund</h3><p>A fixed pool for the selected target, such as one main weapon moving from +6 toward +9.</p></article>
                <article><span>03</span><h3>Premium protection reserve</h3><p>Scarcer support or high-tier materials held for rows where the displayed risk and long-term value justify their use.</p></article>
              </div>
              <div className={styles.stopRule}>
                <strong>Pre-commitment rule</strong>
                <p>
                  Before starting, write down the target checkpoint and the maximum resources available for the session. Stop when either limit is reached—even after a downgrade.
                </p>
              </div>
            </section>

            <section className={styles.mistakes} id="mistakes">
              <p className={styles.sectionKicker}>Common mistakes</p>
              <h2>Most wasted materials begin before the refine button is pressed.</h2>
              <div className={styles.mistakeList}>
                {mistakes.map(([title, body], index) => (
                  <article key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{title}</h3><p>{body}</p></div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.tools} id="tools">
              <p className={styles.sectionKicker}>Complete planning path</p>
              <h2>Evaluate every layer of the finished item.</h2>
              <div className={styles.toolGrid}>
                {tools.map((tool) => (
                  <a href={tool.href} key={tool.title}>
                    <img src={tool.icon} alt="" width="58" height="58" loading="lazy" />
                    <span><strong>{tool.title}</strong><small>{tool.description}</small></span>
                  </a>
                ))}
              </div>
            </section>

            <section className={styles.faq} id="faq">
              <p className={styles.sectionKicker}>Frequently asked questions</p>
              <h2>Refining and equipment FAQ</h2>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            <section className={styles.sources}>
              <p className={styles.sectionKicker}>Data and update policy</p>
              <h2>Rates and material bands come from the RTNW Hub SEA refine dataset.</h2>
              <p>
                The +20 maximum, safe checkpoints, success, downgrade and failure behavior, material bands, Bound Zeny costs, and support controls are checked against the data and logic used by the Refine Simulator. Slot priorities, stopping rules, and F2P budgeting are editorial recommendations and may change as equipment systems or live-server strategies evolve.
              </p>
              <div>
                <a href="/sea/refine/">Open Refine Simulator →</a>
                <a href="/sea/equipment/">Search Equipment →</a>
                <a href="/guides/druid-builds/">Read Druid Builds →</a>
              </div>
            </section>
          </article>
        </div>
      </main>

    </div>
  );
}

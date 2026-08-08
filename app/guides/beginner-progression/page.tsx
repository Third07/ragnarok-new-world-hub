import type { Metadata } from "next";
import Link from "next/link";
import styles from "./beginner.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Beginner Progression Guide",
  description:
    "Follow a practical Ragnarok: The New World beginner progression route for your first hours and first week, with daily priorities, F2P resource tips, common mistakes, and links to RTNW Hub tools.",
  alternates: { canonical: "/guides/beginner-progression/" },
  openGraph: {
    type: "article",
    url: "/guides/beginner-progression/",
    title: "Ragnarok: The New World Beginner Progression Guide",
    description:
      "A patch-safe first-hours and first-week roadmap using the RTNW Skill Planner, World Map, indexes, Events page, and Refine Simulator.",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World beginner progression guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Beginner Progression Guide",
    description: "First-hours route, daily routine, F2P upgrade priorities, and first-week checklist.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const firstRoute = [
  {
    number: "01",
    title: "Follow the main story first",
    text: "Use the opening quests to unlock the game systems in their intended order. Stop only to claim time-limited rewards, clear full inventory, or complete a tutorial the story points you toward.",
    href: "/sea/maps/?lang=en-US#map=101",
    link: "Open World Map",
    icon: "/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp",
  },
  {
    number: "02",
    title: "Choose one main combat plan",
    text: "Pick a class family and one practical role for your first investment cycle. Skill resets are forgiving, but equipment, cards, refinement, and market purchases still consume real resources.",
    href: "/sea/skill_planner/",
    link: "Open Skill Planner",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp",
  },
  {
    number: "03",
    title: "Join an active guild early",
    text: "A guild gives you party access, event coordination, boss information, and experienced players who can identify bad investments before they become expensive mistakes.",
    href: "/sea/events/",
    link: "Check Events",
    icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp",
  },
  {
    number: "04",
    title: "Build a repeatable daily routine",
    text: "Prioritize limited and reset-based activities before open-ended grinding. Use the event calendar to see what is available in your local time instead of relying on a static checklist.",
    href: "/sea/events/",
    link: "View Event Schedule",
    icon: "/media/images/zhujiemian/icon_zhujiemian_huodong.webp",
  },
  {
    number: "05",
    title: "Upgrade deliberately, not emotionally",
    text: "Compare equipment, cards, and refinement costs before spending. A focused build with sensible breakpoints usually progresses faster than several half-built loadouts.",
    href: "/sea/refine/",
    link: "Test Refine Costs",
    icon: "/media/images/zhujiemian/icon_zhujiemian_qianghua.webp",
  },
];

const phases = [
  {
    label: "First hours",
    title: "Unlock systems and learn your class",
    points: [
      "Advance the main story until the next requirement or natural stopping point.",
      "Claim newcomer, launch, mail, and event rewards before they expire.",
      "Test core skills and controls before spending heavily on equipment.",
      "Keep only one active damage plan while your resource income is still small.",
    ],
    href: "/guides/class-tier-list/",
    link: "Compare beginner classes",
  },
  {
    label: "Early routine",
    title: "Turn unlocks into daily progress",
    points: [
      "Check the Events page at login for timed and weekly activities.",
      "Complete limited-entry and high-value activities before long field farming.",
      "Join parties or guild groups when content rewards role coordination.",
      "Use spare time for side quests, exploration, gathering, and open-world farming.",
    ],
    href: "/sea/events/",
    link: "Open the event calendar",
  },
  {
    label: "Build foundation",
    title: "Create one efficient equipment path",
    points: [
      "Choose a primary weapon and role before upgrading several alternatives.",
      "Use the Equipment Index to compare stats, quality, types, and set effects.",
      "Use the Card Index to check bonuses and obtain sources before buying.",
      "Simulate refinement outcomes and costs before consuming rare materials.",
    ],
    href: "/sea/equipment/",
    link: "Browse Equipment Index",
  },
  {
    label: "First week",
    title: "Build consistency instead of chasing perfection",
    points: [
      "Repeat your essential routine even when you have limited playtime.",
      "Track weekly events and reserve time for the rewards your build needs most.",
      "Farm targets with a clear purpose: experience, card, material, or Zeny.",
      "Maintain a resource reserve instead of spending every currency immediately.",
    ],
    href: "/sea/monster_album/",
    link: "Plan a farming target",
  },
];

const routines = [
  {
    time: "15 minutes",
    title: "Minimum login",
    tasks: ["Claim mail and limited rewards", "Check the Event Schedule", "Complete the fastest expiring tasks", "Set up passive or offline progress before leaving"],
  },
  {
    time: "45 minutes",
    title: "Essential session",
    tasks: ["Finish limited-entry daily content", "Complete daily tasks that overlap with combat", "Handle guild contributions or group activities", "Use remaining time for one targeted farm"],
  },
  {
    time: "90+ minutes",
    title: "Full progression session",
    tasks: ["Complete the essential session first", "Add bosses, parties, side quests, or life skills", "Farm a specific card or equipment goal", "Review and prepare tomorrow's upgrade plan"],
  },
];

const resourcePriorities = [
  ["1", "Core build", "Skills, one weapon path, and equipment that directly supports your main role."],
  ["2", "Stable upgrades", "Refinement and materials at sensible milestones rather than risky impulse attempts."],
  ["3", "Correct cards", "Bonuses that fit your damage type, role, or survival needs—not merely the rarest card available."],
  ["4", "Account utility", "Storage, consumables, pets, and tools that save time or improve repeatable progression."],
  ["5", "Side builds", "Alternative weapons, second roles, and experimental setups after the main build is functional."],
] as const;

const mistakes = [
  {
    title: "Upgrading every item equally",
    fix: "Concentrate on the pieces that produce the largest improvement for your current role, then raise weaker slots in planned stages.",
  },
  {
    title: "Copying a build without checking its cost",
    fix: "A high-end community build may depend on refinement, cards, runes, and affixes that a new account cannot reproduce yet. Copy the concept, then make a budget version.",
  },
  {
    title: "Buying cards before checking their source",
    fix: "Use the Card Index, open the linked monster, and check the World Map before paying market prices for something you can reasonably farm.",
  },
  {
    title: "Ignoring timed activities",
    fix: "Open the Event Schedule at login. A missed limited activity cannot always be replaced by extra field grinding later.",
  },
  {
    title: "Splitting resources across multiple forms or classes",
    fix: "Experiment with skills freely, but keep equipment and upgrade spending focused until your primary build is stable.",
  },
  {
    title: "Grinding without a target",
    fix: "Choose a monster because it provides the experience, material, card, or habitat you need. Use the indexes and map to make the session measurable.",
  },
];

const faqs = [
  {
    question: "What should a new player do first in Ragnarok: The New World?",
    answer:
      "Follow the main story, claim limited rewards, choose one main class plan, and unlock the game's daily systems before spending long sessions on open-world farming.",
  },
  {
    question: "Can beginners safely experiment with skills?",
    answer:
      "Yes. The official game listing advertises free skill resets. Equipment, cards, refinement materials, and market spending still require caution, so test the skill plan before committing resources around it.",
  },
  {
    question: "What should F2P players upgrade first?",
    answer:
      "Prioritize one core weapon and equipment path that supports the main role, then add appropriate cards and deliberate refinement milestones. Avoid building several full loadouts at once.",
  },
  {
    question: "How do I find the right monster or card to farm?",
    answer:
      "Search the Card Index for the desired effect, follow its obtain-source link to the Monster Index, and open the World Map to locate the target habitat.",
  },
  {
    question: "What should I do when I only have a few minutes?",
    answer:
      "Claim expiring rewards, check the Event Schedule, complete the quickest limited tasks, and set up any available passive or offline progression before logging out.",
  },
];

export default function BeginnerProgressionPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://rtnw.online/guides/beginner-progression/#article",
        headline: "Ragnarok: The New World Beginner Progression Guide",
        description:
          "A practical first-hours and first-week progression route with daily priorities, F2P resource planning, and links to RTNW Hub tools.",
        datePublished: "2026-08-03",
        dateModified: "2026-08-03",
        mainEntityOfPage: "https://rtnw.online/guides/beginner-progression/",
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
            name: "Beginner Progression Guide",
            item: "https://rtnw.online/guides/beginner-progression/",
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
      <a className="skip-link" href="#beginner-content">Skip to beginner guide</a>

      <main id="beginner-content">
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <span>Beginner Progression</span>
            </nav>
            <p className={styles.kicker}>Updated August 3, 2026 · SEA beginner roadmap</p>
            <h1>Ragnarok: The New World <em>beginner progression guide.</em></h1>
            <p className={styles.lead}>
              A practical route for your first hours and first week—what to unlock, what to repeat, what to upgrade, and which early mistakes cost the most resources.
            </p>
            <div className={styles.heroActions}>
              <a href="#first-route">Start the beginner route <span aria-hidden="true">↓</span></a>
              <a href="/sea/events/">Check today’s events <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <div className={styles.articleLayout}>
          <aside className={styles.contents}>
            <strong>On this page</strong>
            <a href="#first-route">First five priorities</a>
            <a href="#phases">Progression phases</a>
            <a href="#daily-routine">Daily routine</a>
            <a href="#resources">F2P resources</a>
            <a href="#tools">Use RTNW tools</a>
            <a href="#mistakes">Common mistakes</a>
            <a href="#faq">FAQ</a>
          </aside>

          <article className={styles.article}>
            <section className={styles.routeSection} id="first-route">
              <p className={styles.sectionKicker}>Quick route</p>
              <h2>Your first five progression priorities.</h2>
              <p>
                The exact unlock levels and event availability can change by patch or server. This route focuses on decisions that remain useful even when individual requirements move.
              </p>
              <div className={styles.routeGrid}>
                {firstRoute.map((step) => (
                  <article className={styles.routeCard} key={step.number}>
                    <div className={styles.routeTop}>
                      <span>{step.number}</span>
                      <img src={step.icon} alt="" width="58" height="58" loading="lazy" />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    <a href={step.href}>{step.link} <span aria-hidden="true">→</span></a>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.phaseSection} id="phases">
              <p className={styles.sectionKicker}>Progression roadmap</p>
              <h2>Advance in phases instead of chasing a perfect day-one account.</h2>
              <div className={styles.phaseList}>
                {phases.map((phase, index) => (
                  <article className={styles.phaseCard} key={phase.label}>
                    <div className={styles.phaseNumber}>0{index + 1}</div>
                    <div>
                      <span>{phase.label}</span>
                      <h3>{phase.title}</h3>
                      <ul>
                        {phase.points.map((point) => <li key={point}>{point}</li>)}
                      </ul>
                      <a href={phase.href}>{phase.link} <span aria-hidden="true">→</span></a>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.routineSection} id="daily-routine">
              <p className={styles.sectionKicker}>Daily routine</p>
              <h2>Use a routine that fits the time you actually have.</h2>
              <p>
                These are planning templates, not official timers. Always check the in-game activity list and the RTNW Event Schedule because reset rules, availability, and event priorities can change.
              </p>
              <div className={styles.routineGrid}>
                {routines.map((routine) => (
                  <article key={routine.time}>
                    <span>{routine.time}</span>
                    <h3>{routine.title}</h3>
                    <ol>
                      {routine.tasks.map((task) => <li key={task}>{task}</li>)}
                    </ol>
                  </article>
                ))}
              </div>
              <a className={styles.featureLink} href="/sea/events/">Open the weekly and local-time Event Schedule <span aria-hidden="true">→</span></a>
            </section>

            <section className={styles.resourceSection} id="resources">
              <p className={styles.sectionKicker}>F2P resource order</p>
              <h2>Spend first on the parts of your build that compound.</h2>
              <p>
                Free skill resets make experimentation less punishing, but the surrounding build still has a cost. Use this order when two upgrades compete for the same limited currency or material.
              </p>
              <div className={styles.priorityList}>
                {resourcePriorities.map(([number, title, text]) => (
                  <article key={number}>
                    <span>{number}</span>
                    <div><h3>{title}</h3><p>{text}</p></div>
                  </article>
                ))}
              </div>
              <div className={styles.notice}>
                <strong>Budget rule:</strong>
                <span>Do not buy or refine an item merely because it is an upgrade. Confirm that it belongs to the build you intend to keep using.</span>
              </div>
            </section>

            <section className={styles.toolsSection} id="tools">
              <p className={styles.sectionKicker}>RTNW Hub workflow</p>
              <h2>Turn every farming or upgrade question into a short tool path.</h2>
              <div className={styles.toolPaths}>
                <article>
                  <img src="/media/images/zhujiemian/icon_zhujiemian_jineng.webp" alt="" width="64" height="64" loading="lazy" />
                  <h3>Planning a class</h3>
                  <p>Compare the tier list, inspect the skill tree, then build one focused skill path before choosing equipment.</p>
                  <div><a href="/guides/class-tier-list/">Tier List</a><a href="/sea/skill_planner/">Skill Planner</a></div>
                </article>
                <article>
                  <img src="/media/images/zhujiemian/icon_zhujiemian_tujian.webp" alt="" width="64" height="64" loading="lazy" />
                  <h3>Farming a card</h3>
                  <p>Search the effect, follow its monster source, then locate the habitat instead of wandering between maps.</p>
                  <div><a href="/sea/cards/">Card Index</a><a href="/sea/monster_album/">Monster Index</a><a href="/sea/maps/?lang=en-US#map=101">World Map</a></div>
                </article>
                <article>
                  <img src="/media/images/zhujiemian/icon_zhujiemian_qianghua.webp" alt="" width="64" height="64" loading="lazy" />
                  <h3>Upgrading equipment</h3>
                  <p>Compare gear first, simulate the target refine level, and inspect shop sources before spending materials or Zeny.</p>
                  <div><a href="/sea/equipment/">Equipment Index</a><a href="/sea/refine/">Refine Simulator</a><a href="/sea/shop/">Shop</a></div>
                </article>
              </div>
            </section>

            <section className={styles.mistakesSection} id="mistakes">
              <p className={styles.sectionKicker}>Avoidable losses</p>
              <h2>Six beginner mistakes that slow progression.</h2>
              <div className={styles.mistakeGrid}>
                {mistakes.map((mistake, index) => (
                  <article key={mistake.title}>
                    <span>0{index + 1}</span>
                    <h3>{mistake.title}</h3>
                    <p>{mistake.fix}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.faq} id="faq">
              <p className={styles.sectionKicker}>Frequently asked questions</p>
              <h2>Beginner progression FAQ</h2>
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            <section className={styles.sources}>
              <p className={styles.sectionKicker}>Sources and update policy</p>
              <h2>Patch-safe guidance with community context.</h2>
              <p>
                Official feature statements are checked against the game listing. Progression order and daily-priority advice are editorial summaries of current SEA community guides, then written conservatively so the route remains useful when exact levels, schedules, or reward values change.
              </p>
              <div>
                <a href="https://store.steampowered.com/app/4212480/Ragnarok_The_New_World/" rel="nofollow external">Official game listing ↗</a>
                <a href="https://ragnarok-the-new-world.wiki/en/guides/beginner-guide/" rel="nofollow external">Community beginner guide ↗</a>
                <a href="https://ragnarok-the-new-world.wiki/en/daily-guide/daily-routine-guide/" rel="nofollow external">Community daily guide ↗</a>
                <a href="/guides/">More RTNW guides →</a>
              </div>
            </section>
          </article>
        </div>
      </main>

    </div>
  );
}

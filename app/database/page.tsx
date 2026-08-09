import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "../FaqList";
import ResponsiveHeroImage from "../ResponsiveHeroImage";
import styles from "../field-guide.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Database (RTNW / RONW DB)",
  description:
    "Search the English Ragnarok: The New World database for monsters, cards, equipment, pets, shops, maps, quiz answers, and skill-planning tools on RTNW Hub.",
  alternates: { canonical: "/database/" },
  keywords: [
    "Ragnarok The New World database",
    "Ragnarok New World database",
    "Ragnarok New World DB",
    "RTNW database",
    "RONW database",
    "RO New World database",
    "Ragnarok The New World monsters",
    "Ragnarok The New World cards",
    "Ragnarok The New World equipment",
  ],
  openGraph: {
    type: "website",
    url: "/database/",
    title: "Ragnarok: The New World Database | RTNW Hub",
    description:
      "Open the RTNW monster, card, equipment, pet, map, shop, quiz-answer, and build-planning databases from one English index.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ragnarok: The New World Database | RTNW Hub",
    description: "Search RTNW monsters, cards, equipment, pets, maps, quiz answers, and build tools.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const databaseEntries = [
  {
    title: "Monster Database",
    description: "Search monster levels, types, races, elements, sizes, habitats, and connected drop data.",
    href: "/sea/monster_album/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_fuben.webp",
  },
  {
    title: "Card Database",
    description: "Look up card effects, equipment slots, obtain sources, and fusion information.",
    href: "/sea/cards/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tujian.webp",
  },
  {
    title: "Equipment Database",
    description: "Browse weapons, armor, accessories, item stats, descriptions, slots, and set effects.",
    href: "/sea/equipment/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
  },
  {
    title: "Pet Database",
    description: "Explore RTNW pet data, skills, feeding information, and related progression details.",
    href: "/sea/pet/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_pet.webp",
  },
  {
    title: "Interactive World Map",
    description: "Find monsters, landmarks, quests, chests, and locations while planning a farming route.",
    href: "/sea/maps/?lang=en-US#map=101",
    icon: "/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp",
  },
  {
    title: "Shop Catalogue",
    description: "Browse the in-game shop catalogue and reference available items from the SEA game data.",
    href: "/sea/shop/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp",
  },
  {
    title: "Quiz Answers",
    description: "Search Lucky Rabbit, Guild Banquet, Scholar Exam, and element matchup answers.",
    href: "/sea/study/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shitu.webp",
  },
  {
    title: "Skill Simulator & Planner",
    description: "Choose a class, inspect its skill tree and prerequisites, assign points, and share a build.",
    href: "/sea/skill_planner/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp",
  },
] as const;

const faqs = [
  {
    question: "What is the Ragnarok: The New World database on RTNW Hub?",
    answer:
      "It is an independent English index that connects RTNW monster, card, equipment, pet, map, shop, quiz-answer, and build-planning resources in one place.",
  },
  {
    question: "Can I search monsters, cards, and equipment together?",
    answer:
      "Yes. Use RTNW Hub unified search when you know a name or keyword, or open the individual databases when you want their full filters and detail views.",
  },
  {
    question: "Where is the Ragnarok: The New World skill database?",
    answer:
      "Open the Skill Simulator & Planner to choose a job, inspect skills and prerequisites, assign points, and create a shareable build link.",
  },
  {
    question: "Does the database include Ragnarok: The New World quiz answers?",
    answer:
      "Yes. The Quiz Answers tool includes Lucky Rabbit, Guild Banquet, Scholar Exam, and element matchup references with searchable question text.",
  },
] as const;

export default function DatabasePage() {
  const canonical = "https://rtnw.online/database/";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: "Ragnarok: The New World Database",
        description:
          "English RTNW database index for monsters, cards, equipment, pets, maps, shops, quiz answers, and skill-planning tools.",
        isPartOf: { "@id": "https://rtnw.online/#website" },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "RTNW Hub", item: "https://rtnw.online/" },
          { "@type": "ListItem", position: 2, name: "Database", item: canonical },
        ],
      },
      {
        "@type": "ItemList",
        name: "Ragnarok: The New World database sections",
        numberOfItems: databaseEntries.length,
        itemListElement: databaseEntries.map((entry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: entry.title,
          url: `https://rtnw.online${entry.href.split("?")[0]}`,
        })),
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
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className={styles.hero}>
        <ResponsiveHeroImage className={styles.heroImage} />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><span>Database</span>
          </nav>
          <p className={styles.kicker}>RTNW game-data index</p>
          <h1 className={styles.title}>Ragnarok: The New World database</h1>
          <p className={styles.dek}>
            Search monsters, cards, equipment, pets, maps, shops, quiz answers, and class skills from one English RTNW database hub.
          </p>
          <div className={styles.meta}>
            <span>Monster, card and equipment data</span>
            <span>Skill and build tools</span>
            <span>SEA game references</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <article className={styles.article}>
            <p className={styles.lead}>
              Start with the database category that matches your question, or use <a href="/search/">unified search</a> when you already know the monster, card, item, guide, or tool name you need.
            </p>

            <h2>Browse the RTNW database</h2>
            <div className={styles.cardGrid}>
              {databaseEntries.map((entry) => (
                <a className={styles.card} href={entry.href} key={entry.title}>
                  <img src={entry.icon} alt="" width="54" height="54" loading="lazy" />
                  <span>
                    <strong>{entry.title}</strong>
                    <span>{entry.description}</span>
                  </span>
                </a>
              ))}
            </div>

            <h2>How to use the database for progression</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <strong>Find the target</strong>
                <p>Search a monster, card, equipment item, pet, activity, or skill instead of browsing disconnected reference pages.</p>
              </div>
              <div className={styles.step}>
                <strong>Check the connected data</strong>
                <p>Move between monster, card, equipment, and map references to verify where a target fits into your current progression goal.</p>
              </div>
              <div className={styles.step}>
                <strong>Plan before spending resources</strong>
                <p>Use the Skill, Rune, Affix, and Refine tools to test the next build decision before committing upgrade materials in game.</p>
              </div>
            </div>

            <h2>Database, guides, and planners serve different questions</h2>
            <p>
              The database is best when you need a specific fact or game-data entry. <a href="/guides/">Guides</a> are better for progression decisions, class builds, farming routes, and setup advice. For example, the <a href="/guides/mvp-hunting/">MVP Hunting Guide</a> turns boss and map records into a hunt checklist, while the <a href="/guides/zeny-farming/">Zeny Farming Guide</a> adds a calculator for comparing real sessions. Planners help you model a build or upgrade before spending resources.
            </p>

            <h2>Ragnarok: The New World database FAQ</h2>
            <FaqList items={faqs} />
          </article>

          <aside className={styles.sidebar} aria-label="Database shortcuts">
            <section className={styles.sideCard}>
              <h2>Search everything</h2>
              <p>Search guides, tools, monsters, cards, and equipment from one page.</p>
              <a href="/search/">Open unified search →</a>
            </section>
            <section className={styles.sideCard}>
              <h2>Build planning</h2>
              <a href="/sea/skill_planner/">Skill Planner</a>
              <a href="/sea/rune_planner/">Rune Planner</a>
              <a href="/sea/affix_planner/">Affix Planner</a>
              <a href="/sea/refine/">Refine Simulator</a>
            </section>
            <section className={styles.sideCard}>
              <h2>Need a route?</h2>
              <p>Move from a database record to a practical target, hunt, or farming session.</p>
              <a href="/guides/mvp-hunting/">Plan an MVP hunt →</a>
              <a href="/tools/farming-target-finder/">Find a monster target →</a>
              <a href="/guides/zeny-farming/">Measure a Zeny route →</a>
              <a href="/guides/">Browse all RTNW guides →</a>
            </section>
          </aside>
        </div>
      </main>

    </div>
  );
}

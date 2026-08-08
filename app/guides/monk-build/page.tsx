import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../field-guide.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Monk Build & Skill Guide",
  description:
    "Review the current Ragnarok: The New World Monk skill data, Spirit Sphere mechanics, Fury buff, combo skills, and a safe build-planning route using the RTNW Skill Planner.",
  alternates: { canonical: "/guides/monk-build/" },
  keywords: [
    "Ragnarok The New World Monk",
    "Ragnarok The New World Monk build",
    "Ragnarok New World Monk build",
    "RTNW Monk",
    "RONW Monk",
    "Ragnarok New World Monk skills",
    "Ragnarok New World Spirit Sphere",
  ],
  openGraph: {
    type: "article",
    url: "/guides/monk-build/",
    title: "Ragnarok: The New World Monk Build & Skill Guide",
    description:
      "A data-backed look at the current Monk skill tree, Spirit Spheres, Fury, combo skills, and build-planning priorities.",
    publishedTime: "2026-08-08",
    modifiedTime: "2026-08-08",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World Monk build and skill guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Monk Build & Skill Guide",
    description: "Spirit Spheres, Fury, Monk combo skills, and a safe planning route using current English RTNW data.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const verifiedSkills = [
  {
    name: "Charge",
    role: "Spirit Sphere setup",
    detail:
      "Summons one Spirit Sphere. The current English Monk data allows up to five Spirit Spheres at a time.",
  },
  {
    name: "Fury",
    role: "Physical-damage buff",
    detail:
      "Consumes five Spirit Spheres. At level 3, the current data lists a 15% P.DMG increase for 600 seconds and changes the weapon size modifier against Large targets to 100%.",
  },
  {
    name: "Raging Trifecta Blow",
    role: "Combo opener",
    detail:
      "A three-hit Neutral melee attack tagged as a single-target combo skill in the current English job data.",
  },
  {
    name: "Raging Quadruple Blow",
    role: "Combo follow-up",
    detail:
      "Can be used within three seconds after Raging Trifecta Blow and continues the Monk's multi-hit Neutral melee combo chain.",
  },
] as const;

const faqs = [
  {
    question: "Is Monk in the current Ragnarok: The New World skill data?",
    answer:
      "Yes. The English data used by RTNW Hub lists Monk as job 522 with Acolyte as its parent job and a 40-point skill limit. Regional client availability can still differ by patch.",
  },
  {
    question: "How do Spirit Spheres work for Monk?",
    answer:
      "The current Charge skill summons one Spirit Sphere and allows up to five. Other Monk skills can then use those spheres as part of their setup or cost.",
  },
  {
    question: "What does Fury do for Monk?",
    answer:
      "Fury consumes five Spirit Spheres. At level 3, the current English data lists a 15% physical-damage increase for 600 seconds and a 100% weapon size modifier against Large targets.",
  },
  {
    question: "What is the basic Monk combo shown in the data?",
    answer:
      "Raging Trifecta Blow is a combo opener, and Raging Quadruple Blow can be used within three seconds afterward. Use the Skill Planner to inspect prerequisites and the rest of the current tree.",
  },
  {
    question: "What is the best Monk build in Ragnarok: The New World?",
    answer:
      "The safest recommendation right now is to plan around verified skill interactions instead of declaring one universal best build. Regional availability, balance changes, equipment, runes, and live testing can change the final priority order.",
  },
] as const;

export default function MonkBuildPage() {
  const canonical = "https://rtnw.online/guides/monk-build/";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: "Ragnarok: The New World Monk Build & Skill Guide",
        description:
          "Current English RTNW Monk skill data, Spirit Sphere mechanics, Fury, combo skills, and build-planning guidance.",
        datePublished: "2026-08-08",
        dateModified: "2026-08-08",
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: "RTNW Hub", url: "https://rtnw.online/" },
        publisher: {
          "@type": "Organization",
          name: "RTNW Hub",
          url: "https://rtnw.online/",
          logo: {
            "@type": "ImageObject",
            url: "https://rtnw.online/apple-touch-icon.png",
            width: 180,
            height: 180,
          },
        },
        inLanguage: "en",
        articleSection: "Classes and Builds",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "RTNW Hub", item: "https://rtnw.online/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://rtnw.online/guides/" },
          { "@type": "ListItem", position: 3, name: "Classes and Builds", item: "https://rtnw.online/guides/classes-builds/" },
          { "@type": "ListItem", position: 4, name: "Monk Build", item: canonical },
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
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <header className={styles.hero}>
        <img className={styles.heroImage} src="/assets/rtnw-hero-1280.webp" alt="" />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><a href="/guides/">Guides</a><span>/</span><span>Monk</span>
          </nav>
          <p className={styles.kicker}>Current English skill data · Updated August 8, 2026</p>
          <h1 className={styles.title}>Ragnarok: The New World Monk build &amp; skill guide</h1>
          <p className={styles.dek}>
            Understand the verified Monk skill-tree mechanics first: generate Spirit Spheres, decide when to spend five on Fury, and build around the Trifecta-to-Quadruple combo before committing skill points or gear.
          </p>
          <div className={styles.meta}>
            <span>Acolyte branch</span><span>40 skill points</span><span>Spirit Sphere and combo mechanics</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <article className={styles.article}>
            <p className={styles.lead}>
              This page is intentionally conservative: it uses the current English Monk data already committed to RTNW Hub instead of publishing an untested universal “best build.” Open the <a href="/sea/skill_planner/">Skill Planner</a> to inspect the live tree and prerequisites for your client version.
            </p>

            <div className={styles.note}>
              <strong>Availability note</strong>
              Regional release timing and balance can differ. The data used here currently lists Monk as job 522 under Acolyte, with a 40-point skill limit; verify the live client before spending resources.
            </div>

            <h2>Monk skill mechanics verified in the current data</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr><th scope="col">Skill</th><th scope="col">Role</th><th scope="col">What the current English data says</th></tr>
                </thead>
                <tbody>
                  {verifiedSkills.map((skill) => (
                    <tr key={skill.name}>
                      <th scope="row">{skill.name}</th>
                      <td>{skill.role}</td>
                      <td>{skill.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2>Build the resource loop before chasing damage</h2>
            <div className={styles.steps}>
              <div className={styles.step}>
                <strong>Generate Spirit Spheres</strong>
                <p>Charge creates one sphere and the current data caps the resource at five. Treat sphere generation as the setup layer for the rest of the Monk kit.</p>
              </div>
              <div className={styles.step}>
                <strong>Choose when Fury is worth five spheres</strong>
                <p>Fury trades a full five-sphere stack for a long physical-damage buff. That means a practical build should consider both buff uptime and the opportunity cost of spending the resource.</p>
              </div>
              <div className={styles.step}>
                <strong>Plan the combo window</strong>
                <p>Raging Quadruple Blow follows Raging Trifecta Blow within a three-second window, so skill order and accessibility matter as much as raw point allocation.</p>
              </div>
              <div className={styles.step}>
                <strong>Validate the rest in the live planner</strong>
                <p>Use the Skill Planner to inspect prerequisites and connected skills, then compare equipment, runes, and affixes after the core rotation is clear.</p>
              </div>
            </div>

            <h2>Early Monk build priorities</h2>
            <p>
              Until live SEA testing establishes stable endgame benchmarks, prioritize a coherent mechanic rather than spreading points across every branch. A combo-focused route should first preserve access to its opener and follow-up; a Fury-oriented physical route needs reliable five-sphere generation before the buff can function smoothly. Avoid copying stat or equipment numbers from another Ragnarok title without confirming that the RTNW client uses the same scaling.
            </p>

            <h2>Monk and Acolyte are separate planning questions</h2>
            <p>
              The existing <a href="/guides/acolyte-builds/">Acolyte build guide</a> focuses on Support Priest, Exorcist, and AGI-Crit directions. Monk has a different physical resource-and-combo identity, so this page keeps Monk planning separate instead of forcing those mechanics into the Priest guide.
            </p>

            <h2>Ragnarok: The New World Monk FAQ</h2>
            {faqs.map((faq) => {
              const id = `faq-${faq.question.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;
              return (
                <section key={faq.question} aria-labelledby={id}>
                  <h3 id={id}>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </section>
              );
            })}
          </article>

          <aside className={styles.sidebar} aria-label="Monk build tools">
            <section className={styles.sideCard}>
              <h2>Open the Monk tree</h2>
              <p>Choose Monk in the live English skill planner to inspect every current skill and prerequisite.</p>
              <a href="/sea/skill_planner/">Open Skill Planner →</a>
            </section>
            <section className={styles.sideCard}>
              <h2>Continue the build</h2>
              <a href="/sea/rune_planner/">Rune Planner</a>
              <a href="/sea/affix_planner/">Affix Planner</a>
              <a href="/sea/equipment/">Equipment Database</a>
              <a href="/sea/cards/">Card Database</a>
            </section>
            <section className={styles.sideCard}>
              <h2>Related class pages</h2>
              <a href="/guides/acolyte-builds/">Acolyte / Priest Builds</a>
              <a href="/guides/classes-builds/">All Classes and Builds</a>
              <a href="/guides/class-tier-list/">Class Tier List</a>
            </section>
          </aside>
        </div>
      </main>

    </div>
  );
}

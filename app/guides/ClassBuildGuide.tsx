import Link from "next/link";
import type { ClassBuildGuideData } from "./class-guide-data";
import styles from "./class-build-guide.module.css";

const relatedClassGuides = [
  ["Swordman", "/guides/swordman-builds/"],
  ["Mage", "/guides/mage-builds/"],
  ["Archer", "/guides/archer-builds/"],
  ["Acolyte", "/guides/acolyte-builds/"],
  ["Thief", "/guides/thief-builds/"],
  ["Merchant", "/guides/merchant-builds/"],
  ["Gunslinger", "/guides/gunslinger-builds/"],
  ["Druid", "/guides/druid-builds/"],
] as const;

export default function ClassBuildGuide({ guide }: { guide: ClassBuildGuideData }) {
  const pagePath = `/guides/${guide.slug}/`;
  const pageUrl = `https://rtnw.online${pagePath}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: `Ragnarok: The New World ${guide.title}`,
        description: guide.description,
        datePublished: "2026-08-03",
        dateModified: "2026-08-03",
        mainEntityOfPage: pageUrl,
        author: { "@type": "Organization", name: "RTNW Hub" },
        publisher: { "@type": "Organization", name: "RTNW Hub" },
        image: `https://rtnw.online${guide.icon}`,
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
            name: "Classes and Builds",
            item: "https://rtnw.online/guides/classes-builds/",
          },
          { "@type": "ListItem", position: 4, name: guide.className, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
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
      <a className="skip-link" href="#class-guide-content">Skip to class builds</a>

      <main id="class-guide-content">
        <section className={styles.hero}>
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <a href="/guides/classes-builds/">Classes</a><span aria-hidden="true">/</span>
              <span>{guide.className}</span>
            </nav>
            <div className={styles.heroGrid}>
              <div>
                <p className={styles.eyebrow}>{guide.eyebrow}</p>
                <h1>{guide.title}</h1>
                <p className={styles.lead}>{guide.lead}</p>
                <div className={styles.heroActions}>
                  <a href="#builds">Compare builds <span aria-hidden="true">↓</span></a>
                  <a href="/sea/skill_planner/">Plan skills <span aria-hidden="true">→</span></a>
                </div>
              </div>
              <div className={styles.classPortrait}>
                <img src={guide.icon} alt={`${guide.className} class icon`} width="180" height="180" />
                <span>{guide.lineage}</span>
              </div>
            </div>
            <aside className={styles.availability}>
              <strong>Current English data coverage</strong>
              <p>{guide.availability}</p>
            </aside>
          </div>
        </section>

        <div className={styles.articleLayout}>
          <aside className={styles.contents}>
            <strong>On this page</strong>
            <a href="#quick-answer">Quick answer</a>
            <a href="#builds">Build paths</a>
            <a href="#f2p">F2P roadmap</a>
            <a href="#mistakes">Common mistakes</a>
            <a href="#tools">Build tools</a>
            <a href="#faq">FAQ</a>
          </aside>

          <article className={styles.article}>
            <section className={styles.quickAnswer} id="quick-answer">
              <p className={styles.sectionKicker}>Quick answer</p>
              <h2>Choose one role before spending long-term resources.</h2>
              <div className={styles.answerGrid}>
                {guide.builds.map((build) => (
                  <a href={`#${build.id}`} key={build.id}>
                    <span>{build.role}</span>
                    <strong>{build.title}</strong>
                    <small>{build.bestFor}</small>
                  </a>
                ))}
              </div>
            </section>

            <section className={styles.section} id="builds">
              <p className={styles.sectionKicker}>Build comparison</p>
              <h2>{guide.className} build paths</h2>
              <p className={styles.sectionLead}>
                These are practical build directions, not one mandatory point-by-point tree. Confirm the exact skill descriptions and prerequisites in the live Skill Planner before assigning permanent resources.
              </p>

              <div className={styles.buildList}>
                {guide.builds.map((build, index) => (
                  <section className={styles.buildCard} id={build.id} key={build.id}>
                    <div className={styles.buildHeading}>
                      <div>
                        <span>Build {String(index + 1).padStart(2, "0")}</span>
                        <h3>{build.title}</h3>
                        <p>{build.subtitle}</p>
                      </div>
                      <a href="/sea/skill_planner/" aria-label={`Open Skill Planner for ${build.title}`}>
                        Plan skills →
                      </a>
                    </div>

                    <dl className={styles.facts}>
                      <div><dt>Role</dt><dd>{build.role}</dd></div>
                      <div><dt>Damage</dt><dd>{build.damage}</dd></div>
                      <div><dt>Range</dt><dd>{build.range}</dd></div>
                      <div><dt>Difficulty</dt><dd>{build.difficulty}</dd></div>
                      <div><dt>Best for</dt><dd>{build.bestFor}</dd></div>
                      <div><dt>Stats</dt><dd>{build.statPriority}</dd></div>
                    </dl>

                    <p className={styles.buildSummary}>{build.summary}</p>

                    <div className={styles.buildColumns}>
                      <div>
                        <h4>Skill investment order</h4>
                        <ol>
                          {build.skillPlan.map((item) => <li key={item}>{item}</li>)}
                        </ol>
                      </div>
                      <div>
                        <h4>Starter combat loop</h4>
                        <ol>
                          {build.rotation.map((item) => <li key={item}>{item}</li>)}
                        </ol>
                      </div>
                    </div>

                    <div className={styles.gearBlock}>
                      <h4>Equipment targets</h4>
                      <div>
                        {build.gearTargets.map((target) => <span key={target}>{target}</span>)}
                      </div>
                    </div>

                    <div className={styles.modeGrid}>
                      <article><span>PvE</span><p>{build.pve}</p></article>
                      <article><span>PvP</span><p>{build.pvp}</p></article>
                      <article><span>Budget</span><p>{build.budget}</p></article>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section className={styles.section} id="f2p">
              <p className={styles.sectionKicker}>Low-budget progression</p>
              <h2>F2P roadmap</h2>
              <div className={styles.roadmap}>
                {guide.f2pPlan.map((item, index) => (
                  <article key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.warningSection} id="mistakes">
              <div>
                <p className={styles.sectionKicker}>Avoid wasted investment</p>
                <h2>Common mistakes</h2>
              </div>
              <ul>
                {guide.mistakes.map((mistake) => <li key={mistake}>{mistake}</li>)}
              </ul>
            </section>

            <section className={styles.section} id="tools">
              <p className={styles.sectionKicker}>Connected RTNW tools</p>
              <h2>Turn the guide into a complete build.</h2>
              <div className={styles.toolGrid}>
                <a href="/sea/skill_planner/"><strong>Skill Planner</strong><span>Confirm skills and prerequisites →</span></a>
                <a href="/sea/equipment/"><strong>Equipment Index</strong><span>Compare weapons, armor and sets →</span></a>
                <a href="/sea/affix_planner/"><strong>Affix Planner</strong><span>Plan the required stat package →</span></a>
                <a href="/sea/cards/"><strong>Card Index</strong><span>Find cards supporting the chosen role →</span></a>
              </div>
            </section>

            <section className={styles.section} id="faq">
              <p className={styles.sectionKicker}>Frequently asked questions</p>
              <h2>{guide.className} build FAQ</h2>
              <div className={styles.faqList}>
                {guide.faqs.map((faq) => (
                  <details key={faq.question}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className={styles.related}>
              <p className={styles.sectionKicker}>Continue comparing classes</p>
              <h2>Other class guides</h2>
              <div>
                {relatedClassGuides
                  .filter(([, href]) => href !== pagePath)
                  .map(([label, href]) => <a href={href} key={href}>{label}<span aria-hidden="true">→</span></a>)}
              </div>
            </section>
          </article>
        </div>
      </main>

    </div>
  );
}

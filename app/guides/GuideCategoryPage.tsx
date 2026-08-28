import Link from "next/link";
import styles from "./category.module.css";

type GuideEntry = {
  title: string;
  description: string;
  href: string;
  label: string;
  meta: string;
  image?: string;
  imageAlt?: string;
};

type ToolEntry = {
  name: string;
  description: string;
  href: string;
};

type GuideCategoryPageProps = {
  currentPath: string;
  eyebrow: string;
  title: string;
  summary: string;
  introduction: string;
  guides: GuideEntry[];
  steps: string[];
  tools: ToolEntry[];
};

const categories = [
  ["Classes & Builds", "/guides/classes-builds/"],
  ["Guild Events", "/guides/guild-events/"],
  ["Beginner Guides", "/guides/beginner-guides/"],
  ["Progression & Equipment", "/guides/progression-equipment/"],
  ["Monsters, Cards & Farming", "/guides/monsters-cards-farming/"],
  ["PC & Account Setup", "/guides/technical/"],
] as const;

export default function GuideCategoryPage({
  currentPath,
  eyebrow,
  title,
  summary,
  introduction,
  guides,
  steps,
  tools,
}: GuideCategoryPageProps) {
  const categoryName = categories.find(([, href]) => href === currentPath)?.[0] ?? title;
  const canonicalUrl = `https://rtnw.online${currentPath}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description: summary,
        isPartOf: { "@id": "https://rtnw.online/#website" },
        publisher: { "@id": "https://rtnw.online/#organization" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: guides.length,
          itemListElement: guides.map((guide, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: guide.title,
            url: `https://rtnw.online${guide.href}`,
          })),
        },
        inLanguage: "en",
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
          {
            "@type": "ListItem",
            position: 3,
            name: categoryName,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.shell}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a className="skip-link" href="#category-content">Skip to category guides</a>

      <main id="category-content">
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link>
              <span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a>
              <span aria-hidden="true">/</span>
              <span>{categoryName}</span>
            </nav>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>{title}</h1>
            <p className={styles.summary}>{summary}</p>
            <div className={styles.heroMeta}>
              <span><strong>{guides.length}</strong> published {guides.length === 1 ? "guide" : "guides"}</span>
              <span><strong>{tools.length}</strong> tools</span>
              <span><strong>English</strong> SEA data</span>
            </div>
          </div>
        </section>

        <div className={styles.contentLayout}>
          <aside className={styles.sideNav} aria-label="Guide categories">
            <strong>Guide categories</strong>
            {categories.map(([label, href]) => (
              <a
                key={href}
                href={href}
                aria-current={href === currentPath ? "page" : undefined}
                className={href === currentPath ? styles.active : undefined}
              >
                {label}
              </a>
            ))}
          </aside>

          <div className={styles.content}>
            <section className={styles.introduction}>
              <p className={styles.sectionKicker}>Category overview</p>
              <h2>Use the guides in a practical order.</h2>
              <p>{introduction}</p>
            </section>

            <section className={styles.guideSection} aria-labelledby="published-guides-title">
              <div className={styles.sectionHeading}>
                <div>
                  <p className={styles.sectionKicker}>Guides</p>
                  <h2 id="published-guides-title">Start with the article that matches your current problem.</h2>
                </div>
              </div>
              <div className={styles.guideGrid}>
                {guides.map((guide, index) => (
                  <article className={styles.guideCard} key={guide.href}>
                    {guide.image ? (
                      <img
                        className={styles.guideCardImage}
                        src={guide.image}
                        alt={guide.imageAlt ?? ""}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <div className={styles.cardTopline}>
                      <span>0{index + 1}</span>
                      <small>{guide.label}</small>
                    </div>
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <footer>
                      <span>{guide.meta}</span>
                      <a href={guide.href}>Read guide <span aria-hidden="true">→</span></a>
                    </footer>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.sequenceSection} aria-labelledby="sequence-title">
              <p className={styles.sectionKicker}>Recommended sequence</p>
              <h2 id="sequence-title">What to do next.</h2>
              <ol className={styles.sequenceList}>
                {steps.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className={styles.toolSection} aria-labelledby="category-tools-title">
              <div className={styles.sectionHeading}>
                <div>
                  <p className={styles.sectionKicker}>Tools</p>
                  <h2 id="category-tools-title">Open a planner, map or database.</h2>
                </div>
                <p>Open the relevant planner or index without leaving RTNW Hub.</p>
              </div>
              <div className={styles.toolGrid}>
                {tools.map((tool) => (
                  <a href={tool.href} key={tool.href}>
                    <span>
                      <strong>{tool.name}</strong>
                      <small>{tool.description}</small>
                    </span>
                    <span aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </section>

            <section className={styles.nextSection}>
              <p className={styles.sectionKicker}>Continue exploring</p>
              <h2>Browse the complete guide library.</h2>
              <p>
                Find more class builds, farming advice and setup guides.
              </p>
              <a href="/guides/">Open all RTNW guides <span aria-hidden="true">→</span></a>
            </section>
          </div>
        </div>
      </main>

    </div>
  );
}

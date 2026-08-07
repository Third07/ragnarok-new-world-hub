import type { Metadata } from "next";
import styles from "../field-guide.module.css";

export type GuideSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  steps?: {
    title: string;
    text: string;
  }[];
  note?: string;
};

export type SourceGuide = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  kicker: string;
  dek: string;
  category: string;
  heroImage: string;
  heroAlt: string;
  sourceUrl: string;
  sourceTitle: string;
  sourceKind?: "official-guide" | "internal-data";
  sourceNote?: string;
  sourceStatus?: string;
  warning?: string;
  metaLabel?: string;
  published: string;
  modified: string;
  readTime: string;
  keywords: string[];
  quickFacts: string[][];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  related: string[][];
};

export function buildGuideMetadata(guide: SourceGuide): Metadata {
  return {
    title: guide.seoTitle,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}/` },
    keywords: guide.keywords,
    openGraph: {
      type: "article",
      url: `/guides/${guide.slug}/`,
      title: guide.seoTitle,
      description: guide.description,
      publishedTime: guide.published,
      modifiedTime: guide.modified,
      images: [
        {
          url: guide.heroImage,
          width: 1280,
          height: 720,
          alt: guide.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.seoTitle,
      description: guide.description,
      images: [guide.heroImage],
    },
  };
}

function formatGuideDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function GuideSectionContent({ section }: { section: GuideSection }) {
  return (
    <section aria-labelledby={`${section.id}-title`}>
      <h2 id={`${section.id}-title`}>{section.title}</h2>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {section.table ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {section.table.headers.map((header) => (
                  <th scope="col" key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) => (
                    index === 0
                      ? <th scope="row" key={`${cell}-${index}`}>{cell}</th>
                      : <td key={`${cell}-${index}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {section.bullets ? (
        <ul>
          {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
      ) : null}

      {section.steps ? (
        <div className={styles.steps}>
          {section.steps.map((step) => (
            <div className={styles.step} key={step.title}>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      ) : null}

      {section.note ? <div className={styles.note}>{section.note}</div> : null}
    </section>
  );
}

export default function SourceGuidePage({ guide }: { guide: SourceGuide }) {
  const canonical = `https://rtnw.online/guides/${guide.slug}/`;
  const imageUrl = guide.heroImage.startsWith("http")
    ? guide.heroImage
    : `https://rtnw.online${guide.heroImage}`;
  const absoluteSourceUrl = guide.sourceUrl.startsWith("http")
    ? guide.sourceUrl
    : `https://rtnw.online${guide.sourceUrl}`;
  const isInternalData = guide.sourceKind === "internal-data";
  const warning = guide.warning ??
    "Event schedules, rewards, traits, and balance values can change after game updates. Confirm the current in-game panel before spending rare materials or organizing a guild roster.";
  const metaLabel = guide.metaLabel ?? (isInternalData ? "Data-backed RTNW guide" : "Source-based RTNW guide");
  const sourceStatus = guide.sourceStatus ?? (isInternalData
    ? "Built from current RTNW Hub game data and the live planner. Recheck skill values after major balance patches."
    : "Based on an official GNJOY forum guide supplied to RTNW Hub. Always compare event times and balance details with the live game client.");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonical}#article`,
        headline: guide.title,
        description: guide.description,
        image: imageUrl,
        datePublished: guide.published,
        dateModified: guide.modified,
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
        isBasedOn: absoluteSourceUrl,
        inLanguage: "en",
        articleSection: guide.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "RTNW Hub", item: "https://rtnw.online/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://rtnw.online/guides/" },
          { "@type": "ListItem", position: 3, name: guide.title, item: canonical },
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
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <a className="skip-link" href="#guide-article">Skip to guide</a>

      <header className={styles.hero}>
        <img
          className={styles.heroImage}
          src={guide.heroImage}
          width="1280"
          height="720"
          alt={guide.heroAlt}
          fetchPriority="high"
        />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <a href="/">RTNW Hub</a>
            <span aria-hidden="true">/</span>
            <a href="/guides/">Guides</a>
            <span aria-hidden="true">/</span>
            <span>{guide.category}</span>
          </nav>
          <p className={styles.kicker}>{guide.kicker}</p>
          <h1 className={styles.title}>{guide.title}</h1>
          <p className={styles.dek}>{guide.dek}</p>
          <div className={styles.meta}>
            <span>Updated {formatGuideDate(guide.modified)}</span>
            <span>{guide.readTime}</span>
            <span>{metaLabel}</span>
          </div>
        </div>
      </header>

      <main className={styles.main} id="guide-article">
        <div className={styles.layout}>
          <article className={styles.article}>
            <p className={styles.lead}>{guide.description}</p>

            <div className={styles.warning}>{warning}</div>

            <section aria-labelledby="quick-facts-title">
              <h2 id="quick-facts-title">Quick guide summary</h2>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <tbody>
                    {guide.quickFacts.map(([label, value]) => (
                      <tr key={label}>
                        <th scope="row">{label}</th>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {guide.sections.map((section) => (
              <GuideSectionContent section={section} key={section.id} />
            ))}

            <section aria-labelledby="faq-title">
              <h2 id="faq-title">Frequently asked questions</h2>
              {guide.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </section>

            <section aria-labelledby="source-title">
              <h2 id="source-title">{isInternalData ? "Data source and build methodology" : "Source and editorial note"}</h2>
              {isInternalData ? (
                <p>
                  {guide.sourceNote ?? "This guide is built from the current English game data bundled with RTNW Hub and cross-checked against the live planner. Build labels, priorities, and rotations are RTNW Hub editorial recommendations organized from those verified mechanics; they are not copied from another Ragnarok title."}{" "}
                  <a href={guide.sourceUrl}>{guide.sourceTitle}</a>.
                </p>
              ) : (
                <p>
                  This RTNW Hub article is an independently rewritten and reorganized guide based on
                  the official GNJOY forum post{" "}
                  <a href={guide.sourceUrl} rel="noopener noreferrer nofollow">
                    “{guide.sourceTitle}”
                  </a>.
                  The source screenshots are reused as guide artwork where the RTNW database does not
                  contain an equivalent editorial image. The wording, structure, tables, and SEO
                  presentation are original to RTNW Hub.
                </p>
              )}
            </section>
          </article>

          <aside className={styles.sidebar} aria-label="Guide navigation">
            <section className={styles.sideCard}>
              <h2>On this page</h2>
              <a href="#quick-facts-title">Quick summary</a>
              {guide.sections.map((section) => (
                <a href={`#${section.id}-title`} key={section.id}>{section.title}</a>
              ))}
              <a href="#faq-title">FAQ</a>
            </section>

            <section className={styles.sideCard}>
              <h2>Related RTNW resources</h2>
              {guide.related.map(([label, href]) => (
                <a href={href} key={href}>{label}</a>
              ))}
            </section>

            <section className={styles.sideCard}>
              <h2>Source status</h2>
              <p>{sourceStatus}</p>
            </section>
          </aside>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Independent fan-made guide for Ragnarok: The New World.</span>
        <a href="/guides/">Browse all RTNW guides →</a>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
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
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
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

function GuideSectionContent({ section }: { section: GuideSection }) {
  return (
    <section aria-labelledby={`${section.id}-title`}>
      <h2 id={`${section.id}-title`}>{section.title}</h2>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {section.image ? (
        <figure className={styles.guideFigure}>
          <img
            src={section.image.src}
            alt={section.image.alt}
            loading="lazy"
            decoding="async"
          />
          {section.image.caption ? <figcaption>{section.image.caption}</figcaption> : null}
        </figure>
      ) : null}

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
            <Link href="/">RTNW Hub</Link>
            <span aria-hidden="true">/</span>
            <a href="/guides/">Guides</a>
            <span aria-hidden="true">/</span>
            <span>{guide.category}</span>
          </nav>
          <p className={styles.kicker}>{guide.kicker}</p>
          <h1 className={styles.title}>{guide.title}</h1>
          <p className={styles.dek}>{guide.dek}</p>
          <div className={styles.meta}>
            <span>Reviewed August 8, 2026</span>
            <span>{guide.readTime}</span>
            <span>{guide.category}</span>
          </div>
        </div>
      </header>

      <main className={styles.main} id="guide-article">
        <div className={styles.layout}>
          <article className={styles.article}>
            <p className={styles.lead}>{guide.description}</p>

            <div className={styles.warning}>
              Event schedules, rewards, traits, and balance values can change after game updates.
              Confirm the current in-game panel before spending rare materials or organizing a guild roster.
            </div>

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

            <aside
              className="rtnw-ad-slot rtnw-ad-slot--content-break"
              data-ad-slot="true"
              data-ad-format="responsive"
              data-ad-placement="guide-inline"
            />

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

            <aside
              className="rtnw-ad-slot rtnw-ad-slot--content-end"
              data-ad-slot="true"
              data-ad-format="responsive"
              data-ad-placement="guide-end"
            />
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
              <h2>Before you invest</h2>
              <p>
                Check live skill text, event times, and reward panels before spending rare materials
                or locking a guild roster. Balance and schedules can change between patches.
              </p>
            </section>
          </aside>
        </div>
      </main>

    </div>
  );
}

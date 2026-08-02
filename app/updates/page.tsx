import type { Metadata } from "next";
import { latestUpdateDate, siteUpdates } from "./update-data";
import styles from "./updates.module.css";

export const metadata: Metadata = {
  title: "Latest Updates and Changelog",
  description:
    "Review newly published RTNW Hub guides, tool improvements, SEO work, database changes, and site maintenance updates.",
  alternates: {
    canonical: "/updates/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    url: "/updates/",
    title: "RTNW Hub Latest Updates and Changelog",
    description: "New guides, tool improvements, indexing work, and site maintenance changes.",
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "Asia/Manila",
  }).format(new Date(value));
}

export default function UpdatesPage() {
  const pageUrl = "https://rtnw.online/updates/";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "RTNW Hub Latest Updates and Changelog",
        description: "Published RTNW Hub guide, tool, SEO, and site updates.",
        dateModified: latestUpdateDate,
        isPartOf: { "@id": "https://rtnw.online/#website" },
        publisher: { "@id": "https://rtnw.online/#organization" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: siteUpdates.length,
          itemListElement: siteUpdates.map((update, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: update.title,
            description: update.summary,
            url: `${pageUrl}#${update.id}`,
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
            name: "Latest Updates",
            item: pageUrl,
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
      <a className="skip-link" href="#updates-content">Skip to updates</a>

      <header className={styles.header}>
        <a className="brand" href="/" aria-label="RTNW Hub home">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy">
            <strong>Ragnarok</strong>
            <small>The New World Hub</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/guides/">Guides</a>
          <a href="/#tools">Tools</a>
          <a href="/updates/" aria-current="page">Updates</a>
        </nav>
        <a className={styles.feedAction} href="/feed.xml">
          RSS feed <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main id="updates-content">
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/">RTNW Hub</a>
              <span aria-hidden="true">/</span>
              <span>Latest Updates</span>
            </nav>
            <p className={styles.eyebrow}>Release notes and newly published content</p>
            <h1>Latest updates and <em>changelog.</em></h1>
            <p>
              Follow new guides, database work, tool improvements, SEO maintenance, and structural changes across RTNW Hub—without creating an account or enabling notifications.
            </p>
            <div className={styles.heroMeta}>
              <span><strong>{siteUpdates.length}</strong> recorded releases</span>
              <span><strong>RSS</strong> available</span>
              <span><strong>No account</strong> required</span>
            </div>
          </div>
        </section>

        <div className={styles.contentLayout}>
          <aside className={styles.sidebar}>
            <strong>Follow updates</strong>
            <a href="/feed.xml">Subscribe through RSS</a>
            <a href="/guides/">Browse all guides</a>
            <a href="/seo-status/">View SEO status</a>
            <a href="https://github.com/Third07/ragnarok-new-world-hub" target="_blank" rel="noreferrer">Open GitHub repository ↗</a>
          </aside>

          <section className={styles.timeline} aria-labelledby="release-history-title">
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Release history</p>
                <h2 id="release-history-title">What changed and where to find it.</h2>
              </div>
              <p>Entries are ordered newest first and link directly to the affected guide, tool, or maintenance resource.</p>
            </div>

            <div className={styles.updateList}>
              {siteUpdates.map((update) => (
                <article className={styles.updateCard} id={update.id} key={update.id}>
                  <div className={styles.updateMeta}>
                    <time dateTime={update.publishedAt}>{formatDate(update.publishedAt)}</time>
                    <span>{update.category}</span>
                  </div>
                  <h3>{update.title}</h3>
                  <p>{update.summary}</p>
                  <div className={styles.updateLinks}>
                    {update.links.map((link) => (
                      <a href={link.href} key={link.href}>{link.label}<span aria-hidden="true">→</span></a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer>
        <a className="brand footer-brand" href="/">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy"><strong>Ragnarok</strong><small>The New World Hub</small></span>
        </a>
        <div className="footer-meta">
          <p>Independent fan-made game-data toolkit for Ragnarok: The New World.</p>
          <div className={styles.footerLinks}>
            <a href="/updates/">Updates</a>
            <a href="/feed.xml">RSS</a>
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
        <a href="#updates-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

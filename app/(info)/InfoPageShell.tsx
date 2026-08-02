import type { ReactNode } from "react";
import styles from "./info.module.css";

const trustPages = [
  ["About", "/about/"],
  ["Contact", "/contact/"],
  ["Privacy", "/privacy/"],
  ["Terms", "/terms/"],
  ["Disclaimer", "/disclaimer/"],
] as const;

type InfoPageShellProps = {
  eyebrow: string;
  title: string;
  summary: string;
  currentPath: string;
  lastUpdated?: string;
  children: ReactNode;
};

export default function InfoPageShell({
  eyebrow,
  title,
  summary,
  currentPath,
  lastUpdated = "August 3, 2026",
  children,
}: InfoPageShellProps) {
  const currentLabel = trustPages.find(([, href]) => href === currentPath)?.[0] ?? title;
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `https://rtnw.online${currentPath}#webpage`,
        url: `https://rtnw.online${currentPath}`,
        name: title,
        description: summary,
        isPartOf: { "@id": "https://rtnw.online/#website" },
        dateModified: "2026-08-03",
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
            name: currentLabel,
            item: `https://rtnw.online${currentPath}`,
          },
        ],
      },
    ],
  };

  return (
    <div className={styles.shell}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <a className="skip-link" href="#info-content">Skip to content</a>

      <header className={styles.header}>
        <a className="brand" href="/" aria-label="RTNW Hub home">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy">
            <strong>Ragnarok</strong>
            <small>The New World Hub</small>
          </span>
        </a>

        <nav className={styles.primaryNav} aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/guides/">Guides</a>
          <a href="/#tools">Tools</a>
          <a href="/contact/">Contact</a>
        </nav>

        <a className={styles.headerAction} href="/guides/">
          Browse guides <span aria-hidden="true">→</span>
        </a>
      </header>

      <main id="info-content">
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <a href="/">RTNW Hub</a>
              <span aria-hidden="true">/</span>
              <span>{currentLabel}</span>
            </nav>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1>{title}</h1>
            <p className={styles.summary}>{summary}</p>
            <p className={styles.updated}>Last updated: {lastUpdated}</p>
          </div>
        </section>

        <div className={styles.contentLayout}>
          <aside className={styles.sideNav} aria-label="Trust and legal pages">
            <strong>Site information</strong>
            {trustPages.map(([label, href]) => (
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

          <article className={styles.article}>{children}</article>
        </div>
      </main>

      <footer>
        <a className="brand footer-brand" href="/">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy">
            <strong>Ragnarok</strong>
            <small>The New World Hub</small>
          </span>
        </a>
        <div className="footer-meta">
          <p>Independent fan-made game-data toolkit for Ragnarok: The New World.</p>
          <div className={styles.footerLinks}>
            {trustPages.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            <a href="/sitemap.xml">Sitemap</a>
          </div>
        </div>
        <a href="#info-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

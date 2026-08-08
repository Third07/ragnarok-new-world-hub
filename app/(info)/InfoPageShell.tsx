import Link from "next/link";
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

      <main id="info-content">
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link>
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

    </div>
  );
}

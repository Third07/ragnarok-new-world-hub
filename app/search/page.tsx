import type { Metadata } from "next";
import SearchClient from "./SearchClient";
import styles from "../field-guide.module.css";

export const metadata: Metadata = {
  title: "Search RTNW Guides, Monsters, Cards & Equipment",
  description:
    "Search RTNW Hub guides, tools, monsters, cards, and equipment from one page using the committed English Ragnarok: The New World database.",
  alternates: { canonical: "/search/" },
  keywords: [
    "Ragnarok The New World search",
    "RTNW database search",
    "Ragnarok New World monsters cards equipment",
  ],
  openGraph: {
    type: "website",
    url: "/search/",
    title: "Search the RTNW Hub Database",
    description: "Find guides, tools, monsters, cards, and equipment without opening each database separately.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

export default function SearchPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "@id": "https://rtnw.online/search/#webpage",
    url: "https://rtnw.online/search/",
    name: "Search RTNW Guides, Tools and Game Data",
    description:
      "Unified browser search across RTNW Hub guides, tools, monsters, cards, and equipment.",
    isPartOf: { "@id": "https://rtnw.online/#website" },
    inLanguage: "en",
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={styles.hero}>
        <img className={styles.heroImage} src="/assets/rtnw-hero-1280.webp" alt="" />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <a href="/">Home</a><span>/</span><span>Search</span>
          </nav>
          <p className={styles.kicker}>One search across RTNW Hub</p>
          <h1 className={styles.title}>Search guides, tools, monsters, cards, and equipment</h1>
          <p className={styles.dek}>
            Find a guide or search the English monster, card, and equipment indexes from one screen. Results open the existing detailed database pages.
          </p>
          <div className={styles.meta}>
            <span>Guide and tool search</span><span>Live committed database files</span><span>No account required</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.article} aria-label="Unified site search">
          <SearchClient />
        </section>
      </main>

      <footer className={styles.footer}>
        <span>RTNW Hub · Independent Ragnarok: The New World database.</span>
        <a href="/">Return home</a>
      </footer>
    </div>
  );
}

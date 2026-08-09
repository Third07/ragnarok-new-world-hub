import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveHeroImage from "../../ResponsiveHeroImage";
import FarmingTargetFinder from "./FarmingTargetFinder";
import styles from "../../field-guide.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Farming Target Finder",
  description:
    "Filter the RTNW monster database by level, monster type, race, element, size, and map availability to find suitable farming targets.",
  alternates: { canonical: "/tools/farming-target-finder/" },
  keywords: [
    "Ragnarok The New World farming spots",
    "RTNW monster finder",
    "Ragnarok New World monster level element map",
  ],
  openGraph: {
    type: "website",
    url: "/tools/farming-target-finder/",
    title: "RTNW Farming Target Finder",
    description: "Filter the committed English monster index by level, type, race, element, size, and map data.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

export default function FarmingTargetFinderPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ragnarok: The New World Farming Target Finder",
    url: "https://rtnw.online/tools/farming-target-finder/",
    applicationCategory: "GameApplication",
    operatingSystem: "Any web browser",
    description:
      "A browser-based monster filter using the RTNW Hub English monster database.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": "https://rtnw.online/#organization" },
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={styles.hero}>
        <ResponsiveHeroImage className={styles.heroImage} />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><a href="/search/">Search</a><span>/</span><span>Farming Target Finder</span>
          </nav>
          <p className={styles.kicker}>Database-driven monster tool</p>
          <h1 className={styles.title}>Ragnarok: The New World Farming Target Finder</h1>
          <p className={styles.dek}>
            Narrow the English monster index by level, classification, race, element, size, and map availability, then open the full Monster Album or World Map entry.
          </p>
          <div className={styles.meta}>
            <span>Uses committed RTNW database data</span><span>Shareable filters</span><span>No login required</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.article}>
          <p className={styles.lead}>
            This finder helps reduce a large monster list to a practical set of candidates. It does not estimate kills per hour, card chance, experience efficiency, or market value because those require reliable live combat and economy data.
          </p>
          <FarmingTargetFinder />

          <h2>How to use the results</h2>
          <ol>
            <li>Set a level range close to the character or party you are preparing.</li>
            <li>Use element and race filters when a build, card, or damage modifier targets those attributes.</li>
            <li>Enable map availability when you only want records connected to the current World Map dataset.</li>
            <li>Open the Monster Album entry to inspect available stats and drops.</li>
            <li>Use the map link to check the first recorded habitat before building a farming route.</li>
          </ol>

          <div className={styles.cardGrid}>
            <a className={styles.card} href="/sea/monster_album/">
              <img src="/media/images/zhujiemian/icon_zhujiemian_fuben.webp" alt="" />
              <span><strong>Monster Database</strong><span>Inspect the complete monster record, available drops, and linked data.</span></span>
            </a>
            <a className={styles.card} href="/sea/cards/">
              <img src="/media/images/zhujiemian/icon_zhujiemian_tujian.webp" alt="" />
              <span><strong>Card Database</strong><span>Search effects and open the listed monster obtain sources.</span></span>
            </a>
            <a className={styles.card} href="/sea/maps/?lang=en-US#map=101">
              <img src="/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp" alt="" />
              <span><strong>World Map</strong><span>Inspect habitats and build a route between targets.</span></span>
            </a>
            <a className={styles.card} href="/guides/farming-card-progression/">
              <img src="/media/images/zhujiemian/icon_zhujiemian_shitu.webp" alt="" />
              <span><strong>Farming Guide</strong><span>Turn database research into a repeatable progression workflow.</span></span>
            </a>
            <a className={styles.card} href="/guides/mvp-hunting/">
              <img src="/media/images/activity/icon_activity_mvp.webp" alt="" />
              <span><strong>MVP Hunting Guide</strong><span>Open mapped MVP locations, compare counters, and prepare a party.</span></span>
            </a>
            <a className={styles.card} href="/guides/zeny-farming/">
              <img src="/media/images/item/icon_item_currency2_zeny_01.webp" alt="" />
              <span><strong>Zeny Farming Calculator</strong><span>Measure completed income and costs from the route you test.</span></span>
            </a>
          </div>
        </section>
      </main>

    </div>
  );
}

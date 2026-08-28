import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveHeroImage from "../../ResponsiveHeroImage";
import WardrobeCatalogue from "./WardrobeCatalogue";
import styles from "../../field-guide.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Wardrobe Database | Outfits & Cosmetics",
  description: "Browse RTNW outfits, hairstyles, headwear, mounts, and cosmetic items. Search the SEA Wardrobe catalogue by name, category, gender, job, and dye support.",
  alternates: { canonical: "/database/wardrobe/" },
  openGraph: {
    type: "website", url: "/database/wardrobe/", title: "RTNW Wardrobe Database",
    description: "Search outfits, hairstyles, accessories, mounts, and other SEA cosmetic records.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
  twitter: { card: "summary_large_image", title: "RTNW Wardrobe Database", images: ["/assets/rtnw-hero-1280.webp"] },
};

export default function WardrobePage() {
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": "https://rtnw.online/database/wardrobe/#webpage", url: "https://rtnw.online/database/wardrobe/", name: "Ragnarok: The New World Wardrobe Database", inLanguage: "en", isPartOf: { "@id": "https://rtnw.online/#website" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "RTNW Hub", item: "https://rtnw.online/" },
      { "@type": "ListItem", position: 2, name: "Database", item: "https://rtnw.online/database/" },
      { "@type": "ListItem", position: 3, name: "Wardrobe", item: "https://rtnw.online/database/wardrobe/" },
    ] },
  ] };
  return <div className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <header className={styles.hero}>
      <ResponsiveHeroImage className={styles.heroImage} />
      <div className={styles.heroInner}>
        <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/database/">Database</Link><span>/</span><span>Wardrobe</span></nav>
        <p className={styles.kicker}>SEA cosmetic catalogue</p>
        <h1 className={styles.title}>Ragnarok: The New World Wardrobe</h1>
        <p className={styles.dek}>Find outfits, hairstyles, accessories, mounts, and cosmetic details for your next look.</p>
        <div className={styles.meta}><span>English item names</span><span>Local item images</span><span>Shareable filters</span></div>
      </div>
    </header>
    <main className={styles.main}>
      <section className={styles.article} aria-label="Wardrobe database">
        <p className={styles.lead}>Browse the public SEA Wardrobe records with category, gender, job, and dye filters. A database entry does not confirm that an item is currently obtainable on your server.</p>
        <WardrobeCatalogue />
        <h2>About these records</h2>
        <p>Names, categories, restrictions, and dye flags come from <a href="https://www.roworlddb.com/sea/wardrobe/?lang=en-US" target="_blank" rel="noopener noreferrer">RoworldDB’s SEA Wardrobe</a>. This page is an item catalogue; the source’s full 3D character viewer is available through that link. Check the game for current releases and acquisition methods.</p>
        <p>Choose a gender to include both matching and unrestricted items. Job filters also include cosmetics with no listed job restriction. Dye and highlight flags describe the source data, not a promise that every part of an item can be recolored.</p>
        <div className={styles.cardGrid}>
          <a className={styles.card} href="/sea/equipment/"><img src="/media/images/zhujiemian/icon_zhujiemian_jingji.webp" alt="" /><span><strong>Equipment Database</strong><span>Look up combat gear, stats, and set effects.</span></span></a>
          <a className={styles.card} href="/database/"><img src="/media/images/zhujiemian/icon_zhujiemian_tujian.webp" alt="" /><span><strong>All databases</strong><span>Find monsters, cards, pets, maps, and build tools.</span></span></a>
        </div>
      </section>
    </main>
  </div>;
}

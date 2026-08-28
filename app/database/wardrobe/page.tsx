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
        <div className={styles.meta}><span>Outfits and cosmetics</span><span>Dye and highlight filters</span><span>Shareable filters</span></div>
      </div>
    </header>
    <main className={styles.main}>
      <section className={styles.article} aria-label="Wardrobe database">
        <p className={styles.lead}>Find your next outfit by category, gender, job or dye support. Availability varies by server, so check the game for current releases and how to obtain each item.</p>
        <WardrobeCatalogue />
        <h2>Choose your look</h2>
        <p>Gender and job filters include unrestricted cosmetics as well as matching items. Use the dye and highlight filters to find customization options; the parts you can recolor vary by item.</p>
        <p>Preview outfits on a character in <a href="https://www.roworlddb.com/sea/wardrobe/?lang=en-US" target="_blank" rel="noopener noreferrer">RoworldDB’s 3D Wardrobe</a>.</p>
        <div className={styles.cardGrid}>
          <a className={styles.card} href="/sea/equipment/"><img src="/media/images/zhujiemian/icon_zhujiemian_jingji.webp" alt="" /><span><strong>Equipment Database</strong><span>Look up combat gear, stats, and set effects.</span></span></a>
          <a className={styles.card} href="/database/"><img src="/media/images/zhujiemian/icon_zhujiemian_tujian.webp" alt="" /><span><strong>All databases</strong><span>Find monsters, cards, pets, maps, and build tools.</span></span></a>
        </div>
      </section>
    </main>
  </div>;
}

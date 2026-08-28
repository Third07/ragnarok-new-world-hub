import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveHeroImage from "../../ResponsiveHeroImage";
import PcSetupChecker from "./PcSetupChecker";
import styles from "../../field-guide.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World PC Requirements Checker",
  description:
    "Check whether your PC is better suited to the official Steam client, a 64-bit Android emulator, or cloud gaming for Ragnarok: The New World.",
  alternates: { canonical: "/tools/pc-setup-checker/" },
  keywords: [
    "Ragnarok The New World system requirements",
    "Ragnarok New World PC checker",
    "Ragnarok New World emulator requirements",
  ],
  openGraph: {
    type: "website",
    url: "/tools/pc-setup-checker/",
    title: "RTNW PC Requirements & Setup Checker",
    description: "Compare Steam, Android emulator, and cloud routes using your RAM, storage, virtualization, and graphics setup.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

export default function PcSetupCheckerPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ragnarok: The New World PC Setup Checker",
    url: "https://rtnw.online/tools/pc-setup-checker/",
    applicationCategory: "GameApplication",
    operatingSystem: "Any web browser",
    description: "A browser-based comparison tool for choosing a Steam, Android emulator, or cloud setup for Ragnarok: The New World.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": "https://rtnw.online/#organization" },
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={styles.hero}>
        <ResponsiveHeroImage className={styles.heroImage} />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><a href="/guides/technical/">Setup guides</a><span>/</span><span>PC Setup Checker</span></nav>
          <p className={styles.kicker}>Find a setup for your PC</p>
          <h1 className={styles.title}>Ragnarok: The New World PC Setup Checker</h1>
          <p className={styles.dek}>Compare the official Steam client, an Android emulator, and cloud gaming based on the hardware and setup you actually have.</p>
          <div className={styles.meta}><span>Steam · Emulator · Cloud</span><span>Share your results</span><span>Updated August 28, 2026</span></div>
        </div>
      </header>

      <main className={styles.main}>
        <PcSetupChecker />
        <article className={styles.article} style={{ marginTop: 28 }}>
          <h2>How the recommendation works</h2>
          <p>The checker uses the currently published Steam memory and storage figures, common emulator resource requirements, virtualization status, graphics type, and your preferred play style. It is a route selector, not a benchmark: CPU generation, GPU model, cooling, Windows condition, driver support, and internet quality still affect the result.</p>
          <h2>What to do next</h2>
          <div className={styles.cardGrid}>
            <a className={styles.card} href="/guides/play-on-pc/"><img src="/media/images/zhujiemian/icon_zhujiemian_jingji.webp" alt="" /><span><strong>PC installation guide</strong><span>Install through Steam or use the Android build on PC.</span></span></a>
            <a className={styles.card} href="/guides/emulator-settings/"><img src="/media/images/zhujiemian/icon_zhujiemian_jineng.webp" alt="" /><span><strong>Emulator settings</strong><span>Use a stable baseline and fix black screens, crashes, and low FPS.</span></span></a>
            <a className={styles.card} href="/guides/cloud-gaming/"><img src="/media/images/zhujiemian/icon_zhujiemian_tianqixingchen.webp" alt="" /><span><strong>Cloud gaming guide</strong><span>Test latency, data use, billing, and account safety.</span></span></a>
            <a className={styles.card} href="/sea/skill_planner/"><img src="/media/images/zhujiemian/icon_zhujiemian_jineng.webp" alt="" /><span><strong>Skill Planner</strong><span>Plan your class after the game is running reliably.</span></span></a>
          </div>
          <div className={styles.note}><strong>Privacy:</strong> The values entered in this checker are calculated in the browser. The tool does not ask for a hardware serial number, game login, or account ID.</div>
        </article>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import ResponsiveHeroImage from "../../ResponsiveHeroImage";
import styles from "../../field-guide.module.css";

export const metadata: Metadata = {
  title: "PC, Emulator, Cloud Gaming & Top-Up Guides",
  description:
    "Practical Ragnarok: The New World guides for PC installation, Android emulators, cloud gaming, safe top-ups, account protection, and troubleshooting.",
  alternates: { canonical: "/guides/technical/" },
  keywords: [
    "Ragnarok The New World PC",
    "Ragnarok The New World emulator",
    "Ragnarok The New World top up",
    "Ragnarok The New World cloud gaming",
  ],
  openGraph: {
    type: "website",
    url: "/guides/technical/",
    title: "Ragnarok: The New World PC, Emulator & Top-Up Guides",
    description:
      "Install RTNW on PC, tune an emulator, compare cloud play, and top up without exposing your account.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const guides = [
  {
    title: "How to Play on PC",
    description: "Choose between the official Steam client and an Android emulator, then install the game without mixing regional accounts.",
    href: "/guides/play-on-pc/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jingji.webp",
  },
  {
    title: "Best Emulator Settings",
    description: "Fix black screens, crashes, low FPS, keymapping problems, and virtualization errors on BlueStacks or LDPlayer.",
    href: "/guides/emulator-settings/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp",
  },
  {
    title: "Safe Top-Up Guide",
    description: "Use official checkout routes, verify the character and server, compare fees, and avoid account-login resellers.",
    href: "/guides/top-up-safely/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp",
  },
  {
    title: "Cloud Gaming Guide",
    description: "Understand latency, data use, account risk, and when a cloud Android service is actually worth using.",
    href: "/guides/cloud-gaming/",
    icon: "/media/images/zhujiemian/icon_zhujiemian_tianqixingchen.webp",
  },
] as const;

export default function TechnicalGuidesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://rtnw.online/guides/technical/#webpage",
    url: "https://rtnw.online/guides/technical/",
    name: "Ragnarok: The New World PC, Emulator, Cloud Gaming and Top-Up Guides",
    description:
      "Technical setup, installation, payment safety, account security, and troubleshooting guides for Ragnarok: The New World.",
    isPartOf: { "@id": "https://rtnw.online/#website" },
    inLanguage: "en",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: guides.map((guide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: guide.title,
        url: `https://rtnw.online${guide.href}`,
      })),
    },
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={styles.hero}>
        <ResponsiveHeroImage className={styles.heroImage} />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><a href="/guides/">Guides</a><span>/</span><span>Setup and account</span>
          </nav>
          <p className={styles.kicker}>Setup, payments and troubleshooting</p>
          <h1 className={styles.title}>Play reliably before you worry about builds.</h1>
          <p className={styles.dek}>
            Clear installation and payment guidance for players using Steam, Android emulators, cloud devices, or mobile checkout. Each guide explains the trade-offs instead of pretending one setup works for everyone.
          </p>
          <div className={styles.meta}><span>Updated August 4, 2026</span><span>Independent fan guide</span><span>No affiliate links</span></div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.article}>
          <h2>Technical guides</h2>
          <p className={styles.lead}>
            Start with the page that matches the device or problem in front of you. The PC and emulator guides are installation-focused; the top-up and cloud guides concentrate on risk, cost, and account safety.
          </p>
          <div className={styles.cardGrid}>
            {guides.map((guide) => (
              <a className={styles.card} href={guide.href} key={guide.href}>
                <img src={guide.icon} alt="" />
                <span><strong>{guide.title}</strong><span>{guide.description}</span></span>
              </a>
            ))}
          </div>

          <h2>Useful setup tools</h2>
          <div className={styles.cardGrid}>
            <a className={styles.card} href="/tools/pc-setup-checker/">
              <img src="/media/images/zhujiemian/icon_zhujiemian_jingji.webp" alt="" />
              <span><strong>PC Setup Checker</strong><span>Compare your RAM, storage, virtualization, and preferred play style against native and emulator routes.</span></span>
            </a>
            <a className={styles.card} href="/tools/top-up-calculator/">
              <img src="/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp" alt="" />
              <span><strong>Top-Up Cost Calculator</strong><span>Calculate quantity, payment fees, discounts, and final cost before opening the payment page.</span></span>
            </a>
          </div>

          <div className={styles.note}>
            <strong>Editorial policy:</strong> RTNW Hub does not ask for game passwords, sell currency, or rank a reseller because it paid for placement. Prices and availability change, so payment pages should always be verified at checkout.
          </div>
        </section>
      </main>

    </div>
  );
}

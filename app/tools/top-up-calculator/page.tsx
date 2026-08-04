import type { Metadata } from "next";
import TopUpCalculator from "./TopUpCalculator";
import styles from "../../field-guide.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Top-Up Cost Calculator",
  description:
    "Calculate the final cost of Ragnarok: The New World top-ups after package quantity, discounts, percentage fees, and fixed payment charges.",
  alternates: { canonical: "/tools/top-up-calculator/" },
  keywords: [
    "Ragnarok The New World top up calculator",
    "RTNW top up price",
    "Ragnarok New World Starstone calculator",
    "game top up fee calculator",
  ],
  openGraph: {
    type: "website",
    url: "/tools/top-up-calculator/",
    title: "RTNW Top-Up Cost Calculator",
    description: "Compare the real checkout cost after discounts and payment fees without sharing account information.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

export default function TopUpCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ragnarok: The New World Top-Up Cost Calculator",
    url: "https://rtnw.online/tools/top-up-calculator/",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any web browser",
    description: "A browser calculator for top-up package quantities, discounts, service fees, fixed fees, and effective cost per package.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": "https://rtnw.online/#organization" },
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={styles.hero}>
        <img className={styles.heroImage} src="/assets/rtnw-hero-1280.webp" alt="" />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/guides/technical/">Setup guides</a><span>/</span><span>Top-Up Calculator</span></nav>
          <p className={styles.kicker}>Free payment-planning tool</p>
          <h1 className={styles.title}>Ragnarok: The New World Top-Up Cost Calculator</h1>
          <p className={styles.dek}>See the estimated final total and effective price per package after discounts and payment fees. The tool does not need your character ID, account login, or payment details.</p>
          <div className={styles.meta}><span>PHP, USD, IDR, THB, MYR and SGD</span><span>No login required</span><span>Calculated in your browser</span></div>
        </div>
      </header>

      <main className={styles.main}>
        <TopUpCalculator />
        <article className={styles.article} style={{ marginTop: 28 }}>
          <h2>How to use the calculator</h2>
          <ol>
            <li>Enter the price shown for one package.</li>
            <li>Enter how many packages you plan to purchase.</li>
            <li>Add a real voucher or promotion percentage, not an unconfirmed advertisement.</li>
            <li>Add any service or wallet percentage fee.</li>
            <li>Add a fixed payment charge when the checkout uses one.</li>
            <li>Compare the calculated total with the final payment screen before approving the transaction.</li>
          </ol>

          <h2>What the calculator does not include automatically</h2>
          <p>Regional tax, card conversion, wallet exchange rates, platform-specific pricing, first-purchase bonuses, and voucher eligibility can change. Enter known fees manually and treat the payment provider’s final confirmation screen as the authoritative amount.</p>

          <div className={styles.cardGrid}>
            <a className={styles.card} href="/guides/top-up-safely/"><img src="/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp" alt="" /><span><strong>Safe top-up guide</strong><span>Verify the merchant, server, character details, receipt, and scam warning signs.</span></span></a>
            <a className={styles.card} href="/sea/shop/"><img src="/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp" alt="" /><span><strong>Shop Catalogue</strong><span>Browse in-game shop data available in the RTNW database.</span></span></a>
            <a className={styles.card} href="/guides/beginner-progression/"><img src="/media/images/zhujiemian/icon_zhujiemian_shitu.webp" alt="" /><span><strong>Beginner progression</strong><span>Prioritize free progression and daily resources before spending.</span></span></a>
            <a className={styles.card} href="/guides/refining-equipment/"><img src="/media/images/zhujiemian/icon_zhujiemian_qianghua.webp" alt="" /><span><strong>Refining priorities</strong><span>Plan equipment checkpoints before committing paid resources.</span></span></a>
          </div>

          <div className={styles.warning}><strong>Account safety:</strong> A top-up calculator never needs a password, OTP, recovery code, card number, wallet PIN, or remote access to your device.</div>
        </article>
      </main>
      <footer className={styles.footer}><span>RTNW Hub · Free fan-made cost calculator.</span><a href="/guides/top-up-safely/">Read the safe top-up guide</a></footer>
    </div>
  );
}

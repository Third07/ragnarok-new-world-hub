import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../field-guide.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Top-Up Guide — Safe Payments",
  description:
    "Top up Ragnarok: The New World safely through official checkout routes. Verify server and character details, compare payment fees, avoid scams, and keep receipts.",
  alternates: { canonical: "/guides/top-up-safely/" },
  keywords: [
    "Ragnarok The New World top up",
    "Ragnarok New World top up Philippines",
    "Ragnarok The New World Starstone",
    "RTNW top up safe",
  ],
  openGraph: {
    type: "article",
    url: "/guides/top-up-safely/",
    title: "Ragnarok: The New World Safe Top-Up Guide",
    description: "Official checkout, server verification, receipts, fee comparison, and scam warning signs.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const faq = [
  { q: "What is the safest way to top up Ragnarok: The New World?", a: "Use the in-game store, the platform checkout attached to your official game installation, or a publisher top-up page reached from an official game channel. Never share the game password or one-time code with a seller." },
  { q: "What details should a legitimate direct top-up require?", a: "A direct top-up may require public delivery identifiers such as character ID, role ID, server, or region. It should not require your password, email password, recovery code, or two-factor authentication code." },
  { q: "Why can two stores show different prices?", a: "Prices can differ because of currency conversion, tax, payment-gateway fees, platform pricing, promotions, or reseller margin. Compare the final checkout total, not only the headline price." },
  { q: "What should I do if a top-up is delayed?", a: "Do not repeat the payment immediately. Save the order number and receipt, confirm the correct account and server, wait for the stated processing window, and contact the payment channel through its official support page." },
] as const;

export default function TopUpSafelyGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Ragnarok: The New World Top-Up Guide — Safe Payments and Account Protection",
        datePublished: "2026-08-04",
        dateModified: "2026-08-04",
        author: { "@id": "https://rtnw.online/#organization" },
        publisher: { "@id": "https://rtnw.online/#organization" },
        mainEntityOfPage: "https://rtnw.online/guides/top-up-safely/",
        image: "https://rtnw.online/assets/rtnw-hero-1280.webp",
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
      },
    ],
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className={styles.hero}>
        <img className={styles.heroImage} src="/assets/rtnw-hero-1280.webp" alt="" />
        <div className={styles.heroInner}>
          <nav className={styles.crumbs} aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><a href="/guides/">Guides</a><span>/</span><a href="/guides/technical/">Setup</a><span>/</span><span>Top up safely</span></nav>
          <p className={styles.kicker}>Payments and account security</p>
          <h1 className={styles.title}>How to top up Ragnarok: The New World safely</h1>
          <p className={styles.dek}>Verify the payment route, character, server, currency, and final fee before paying. A cheap offer is not a bargain when it requires your account login or leaves you without a usable receipt.</p>
          <div className={styles.meta}><span>Updated August 4, 2026</span><span>Philippines-friendly advice</span><span>No seller rankings or affiliate links</span></div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.layout}>
          <article className={styles.article}>
            <p className={styles.lead}>The safest purchase is the one you can trace from the official game to a recognized payment screen, with a receipt that identifies the order. Avoid any method that depends on a stranger logging into your account.</p>

            <h2>Use payment routes in this order</h2>
            <div className={styles.steps}>
              <div className={styles.step}><strong>In-game store or platform checkout</strong><p>Use the checkout provided by the official Steam, Google Play, or App Store installation. This is normally the easiest route to document and dispute if a charge fails.</p></div>
              <div className={styles.step}><strong>Publisher web top-up</strong><p>Use it only when the page is linked from the official game website, launcher, verified social account, or in-game notice. Type the address yourself or follow the official link rather than an advertisement.</p></div>
              <div className={styles.step}><strong>Authorized direct top-up partner</strong><p>Confirm that the partner is named by the publisher or uses a recognized publisher checkout. The final payment page should identify the merchant and provide an order number.</p></div>
              <div className={styles.step}><strong>Marketplace seller</strong><p>This carries the most uncertainty. Do not proceed when the seller needs your login, asks you to disable account security, or cannot explain the delivery and refund process.</p></div>
            </div>

            <div className={styles.warning}><strong>Never send these details:</strong> game password, email password, Google or Apple password, recovery code, authenticator code, SMS one-time password, backup code, or remote-access permission to your phone or PC.</div>

            <h2>Information a direct top-up may legitimately request</h2>
            <p>Some publisher-approved direct top-ups deliver currency by public account identifiers rather than by logging into the game. The exact fields vary, but they can include:</p>
            <ul>
              <li>Character ID, role ID, or player ID</li>
              <li>Server name or server number</li>
              <li>Region</li>
              <li>Character name for confirmation</li>
              <li>Email address for the receipt</li>
            </ul>
            <p>Read the ID inside the game rather than copying it from an old screenshot. Character name alone may not be unique enough for delivery.</p>

            <h2>Pre-payment checklist</h2>
            <ul>
              <li>Confirm the game title is <strong>Ragnarok: The New World</strong>, not another Ragnarok release.</li>
              <li>Confirm the region and server match your character.</li>
              <li>Check whether the package is a first-purchase bonus, recurring bundle, subscription, or one-time currency pack.</li>
              <li>Review the final amount after tax, conversion, wallet fee, voucher fee, or service charge.</li>
              <li>Check the merchant name shown by GCash, Maya, card issuer, wallet, or payment gateway.</li>
              <li>Take a screenshot of the package, final total, order number, and successful payment message.</li>
            </ul>

            <h2>How to compare prices correctly</h2>
            <p>Do not compare only the number printed on a banner. Use the amount that will actually leave your wallet.</p>
            <div className={styles.tableWrap}><table className={styles.table}>
              <thead><tr><th>Cost item</th><th>Why it matters</th></tr></thead>
              <tbody>
                <tr><td>Base package price</td><td>The listed price before adjustments</td></tr>
                <tr><td>Platform or service fee</td><td>Can erase an advertised discount</td></tr>
                <tr><td>Currency conversion</td><td>Your card or wallet may use a different exchange rate</td></tr>
                <tr><td>Tax</td><td>May appear only at the last checkout step</td></tr>
                <tr><td>Voucher discount</td><td>Check the minimum spend, expiry, and eligible payment method</td></tr>
                <tr><td>Bonus currency</td><td>Separate permanent pack value from one-time first-purchase bonuses</td></tr>
              </tbody>
            </table></div>
            <p>Use the <a href="/tools/top-up-calculator/">RTNW Top-Up Cost Calculator</a> to combine quantity, fee, and discount before buying.</p>

            <h2>Philippines payment notes</h2>
            <p>GCash, Maya, QR Ph, bank cards, and prepaid gaming wallets may appear depending on the checkout partner. Availability can change by merchant and region. Before approving a mobile-wallet payment:</p>
            <ul>
              <li>Read the merchant name and amount in the wallet confirmation screen.</li>
              <li>Do not approve a payment request sent by an unknown personal account.</li>
              <li>Do not let a seller guide you through screen sharing while your wallet is open.</li>
              <li>Save both the game-store order number and the wallet transaction reference.</li>
            </ul>

            <h2>Red flags that should stop the purchase</h2>
            <ul>
              <li>The price is dramatically below every official route with no clear promotion terms.</li>
              <li>The seller asks to log into your account “for faster delivery.”</li>
              <li>The checkout domain is misspelled or unrelated to the publisher/payment company.</li>
              <li>The seller insists on friends-and-family transfer, personal QR, cryptocurrency, or another non-refundable method.</li>
              <li>The only support contact is a newly created social-media account.</li>
              <li>The page pressures you with a countdown that resets after refreshing.</li>
              <li>The seller asks for an OTP, recovery code, or screenshot containing private account data.</li>
            </ul>

            <h2>If the currency does not arrive</h2>
            <div className={styles.steps}>
              <div className={styles.step}><strong>Do not pay again immediately.</strong><p>A delayed first order can turn into an accidental duplicate purchase.</p></div>
              <div className={styles.step}><strong>Confirm the account, character, region, and server.</strong><p>Compare the submitted details with the game profile and the receipt.</p></div>
              <div className={styles.step}><strong>Restart the game and check purchase mail or inventory.</strong><p>Some packages are claimed from mail, events, or a separate benefit screen instead of appearing directly in the currency balance.</p></div>
              <div className={styles.step}><strong>Contact the payment channel using the order number.</strong><p>Use the official support page, not a link supplied by an unknown commenter or direct message.</p></div>
              <div className={styles.step}><strong>Contact game support when payment succeeded but delivery failed.</strong><p>Provide the order reference, time, amount, server, character ID, and a redacted receipt. Never post the full receipt publicly.</p></div>
            </div>

            <h2>Refund and chargeback caution</h2>
            <p>Use the store’s support process before opening a card or wallet dispute. Chargebacks can lead to reversed currency, negative balances, purchase restrictions, or account review. Document the failed delivery and follow the official payment and game-support sequence.</p>

            <h2>Frequently asked questions</h2>
            {faq.map((item) => <section key={item.q}><h3>{item.q}</h3><p>{item.a}</p></section>)}
          </article>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}><h2>Payment tools</h2><a href="/tools/top-up-calculator/">Top-Up Cost Calculator</a><a href="/sea/shop/">In-game Shop Catalogue</a><a href="/guides/cloud-gaming/">Cloud account safety</a></div>
            <div className={styles.sideCard}><h3>Before spending</h3><a href="/guides/beginner-progression/">F2P progression guide</a><a href="/guides/refining-equipment/">Refining priorities</a><a href="/sea/skill_planner/">Plan skills first</a></div>
            <div className={styles.sideCard}><h3>Disclosure</h3><p>RTNW Hub does not sell top-ups, accept account credentials, or receive commission from a payment provider on this page.</p></div>
          </aside>
        </div>
      </main>
    </div>
  );
}

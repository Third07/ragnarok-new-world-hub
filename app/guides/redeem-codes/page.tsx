import type { Metadata } from "next";
import Link from "next/link";
import RedeemCodeList, { type RedeemCode } from "./RedeemCodeList";
import styles from "./redeem-codes.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Redeem Codes",
  description:
    "Copy current Ragnarok: The New World redeem codes and follow the Gift Code Exchange steps for Android, iOS, and PC. Updated August 4, 2026.",
  alternates: { canonical: "/guides/redeem-codes/" },
  openGraph: {
    type: "article",
    url: "/guides/redeem-codes/",
    title: "Ragnarok: The New World Redeem Codes",
    description:
      "Current RTNW SEA gift codes, reported rewards, redemption instructions, and troubleshooting.",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World redeem codes guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RTNW Redeem Codes",
    description: "Copy current Ragnarok: The New World gift codes and learn how to redeem them.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
};

const activeCodes: RedeemCode[] = [
  {
    code: "ROW0716",
    rewards: "10 Pet Tag Gacha Tickets, 5 Daily Hearty Meals, 5 Kafra Blind Boxes, and 30,000 Adventure Coins.",
    confidence: "Cross-checked",
  },
  {
    code: "ROWGO1ST",
    rewards: "1 Vintage Card Book, 30,000 Adventure Coins, and 20 Pet Food.",
    confidence: "Cross-checked",
  },
  {
    code: "ROWLAUNCH",
    rewards: "20,000 Adventure Coins and 10 Pet Food.",
    confidence: "Cross-checked",
  },
  {
    code: "ROW666",
    rewards: "1 Kafra Blind Box, 20,000 Adventure Coins, and 1 Common Hair Dye.",
    confidence: "Cross-checked",
  },
  {
    code: "ROW777",
    rewards: "1 Kafra Blind Box, 20,000 Adventure Coins, and 5 Pet Food.",
    confidence: "Cross-checked",
  },
  {
    code: "ROW888",
    rewards: "20,000 Adventure Coins, 1 Common Hair Dye, and 5 Pet Food.",
    confidence: "Cross-checked",
  },
  {
    code: "ROWORLD",
    rewards: "2 Hearty Dishes, 20,000 Adventure Coins, and 1 Common Hair Dye.",
    confidence: "Cross-checked",
  },
  {
    code: "ROWTOP1",
    rewards: "2 Hearty Dishes, 20,000 Adventure Coins, and 5 Pet Food.",
    confidence: "Cross-checked",
  },
  {
    code: "ROWMVP",
    rewards: "20,000 Adventure Coins and 10 Pet Food.",
    confidence: "Cross-checked",
  },
  {
    code: "BABYMONSTER",
    rewards: "Collaboration reward bundle reported to include consumables, enhancement materials, and bonus Zeny.",
    note: "The exact bundle can vary by event window or server.",
    confidence: "Cross-checked",
  },
];

const reportedCodes: RedeemCode[] = [
  {
    code: "ROARIEL",
    rewards: "Adventure Coins and growth materials have been reported by multiple community code lists.",
    note: "Lower confidence: reward contents and current availability are not confirmed by an accessible official announcement.",
    confidence: "Reported",
  },
];

const steps = [
  ["1", "Stay on the login screen", "Open Ragnarok: The New World but do not enter the game world yet."],
  ["2", "Open Account", "Tap the Poring-style Account icon in the upper-right corner of the login screen."],
  ["3", "Choose Gift Code Exchange", "Scroll through the account panel and select Gift Code Exchange."],
  ["4", "Confirm the character", "Select the correct server and character if they are not filled automatically."],
  ["5", "Enter one code", "Paste the code exactly as shown, complete the captcha, and tap Redeem."],
  ["6", "Claim the mail", "Enter the game, open Contacts, select Mail, and claim the delivered reward message."],
] as const;

const issues = [
  {
    title: "Invalid or expired",
    text: "Check capitalization and remove spaces. Codes can be disabled without advance notice, even when they worked recently.",
  },
  {
    title: "Already used",
    text: "Most shared codes can be redeemed only once per account. Check your mailbox and previously claimed mail.",
  },
  {
    title: "Wrong server or character",
    text: "Return to Gift Code Exchange and confirm the selected server and character before submitting again.",
  },
  {
    title: "Captcha keeps failing",
    text: "Refresh the captcha, enter the new characters carefully, and retry after maintenance if the service is unavailable.",
  },
  {
    title: "Reward did not arrive",
    text: "Enter the game and check Contacts → Mail. Delivery is normally through mailbox rather than directly to inventory.",
  },
  {
    title: "Region restriction",
    text: "Some promotion codes are limited by server, campaign, platform, or participating account. A code may work for another SEA server but not yours.",
  },
];

const faqs = [
  {
    question: "Are these Ragnarok: The New World codes guaranteed to work?",
    answer:
      "No. The main list was cross-checked across current code guides on August 4, 2026, but Gravity can expire, limit, or region-lock codes without notice. Redeem them promptly and treat the in-game result as authoritative.",
  },
  {
    question: "Are RTNW redeem codes case-sensitive?",
    answer:
      "Current redemption guides instruct players to enter codes exactly as written. Copying the uppercase code avoids capitalization and spacing errors.",
  },
  {
    question: "Where are code rewards delivered?",
    answer:
      "Successful redemptions are delivered through the in-game mailbox. Enter the game, open Contacts, and select Mail to claim the reward message.",
  },
  {
    question: "Can I redeem a code while already logged in?",
    answer:
      "Many clients also expose redemption through Menu, Settings, and User Center or a Redeem Code button. The exact label can vary by platform, so the login-screen Account method is the clearest common route.",
  },
  {
    question: "Where should I look for new official codes?",
    answer:
      "Check the official Ragnarok: The New World Discord, social channels, in-game notices, livestreams, and event announcements. Avoid websites that request your password or advertise code generators.",
  },
];

export default function RedeemCodesPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": "https://rtnw.online/guides/redeem-codes/#article",
        headline: "Ragnarok: The New World Redeem Codes",
        description:
          "Current RTNW SEA gift codes, reported rewards, redemption steps, and troubleshooting guidance.",
        datePublished: "2026-08-04",
        dateModified: "2026-08-04",
        mainEntityOfPage: "https://rtnw.online/guides/redeem-codes/",
        author: { "@type": "Organization", name: "RTNW Hub" },
        publisher: { "@type": "Organization", name: "RTNW Hub" },
        image: "https://rtnw.online/assets/rtnw-hero-1280.webp",
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "RTNW Hub", item: "https://rtnw.online/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://rtnw.online/guides/" },
          {
            "@type": "ListItem",
            position: 3,
            name: "Redeem Codes",
            item: "https://rtnw.online/guides/redeem-codes/",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <div className={styles.shell}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <a className="skip-link" href="#redeem-content">Skip to redeem codes</a>

      <main className={styles.main} id="redeem-content">
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <span>Redeem Codes</span>
            </nav>
            <p className={styles.kicker}>Checked August 4, 2026 · SEA servers</p>
            <h1>Ragnarok: The New World <em>redeem codes.</em></h1>
            <p className={styles.lead}>
              Copy the currently reported gift codes, claim their launch and event rewards, and follow the same Gift Code Exchange process on Android, iOS, and PC.
            </p>
            <div className={styles.heroActions}>
              <a href="#codes">View codes <span aria-hidden="true">↓</span></a>
              <a href="#how-to-redeem">How to redeem <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <div className={styles.notice}>
          <span className={styles.noticeIcon} aria-hidden="true">!</span>
          <div>
            <strong>Availability changes without notice.</strong>{" "}
            The codes below were cross-checked against current public code guides, but RTNW Hub cannot test every server and account. Copy them exactly, redeem them promptly, and trust the in-game response over any website status label.
          </div>
        </div>

        <section className={styles.section} id="codes">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Try these first</p>
              <h2>Currently reported working codes.</h2>
            </div>
            <p>
              These ten codes appear consistently across the most recent August and late-July lists. Reward wording is normalized for readability; regional bundles can still differ.
            </p>
          </div>
          <RedeemCodeList codes={activeCodes} />
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Lower-confidence report</p>
              <h2>One additional code worth trying.</h2>
            </div>
            <p>
              This code appears on multiple community lists but lacks an accessible official reward announcement. It is separated so uncertain data is not presented as confirmed.
            </p>
          </div>
          <RedeemCodeList codes={reportedCodes} />
        </section>

        <section className={styles.section} id="how-to-redeem">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Login-screen method</p>
              <h2>How to redeem RTNW gift codes.</h2>
            </div>
            <p>
              The login-screen Account route is the clearest common method across PC and mobile and avoids differences between in-game menu layouts.
            </p>
          </div>
          <div className={styles.steps}>
            {steps.map(([number, title, text]) => (
              <article className={styles.stepCard} key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className={styles.alternate}>
            <strong>Alternative while logged in:</strong> open Menu → Settings, then select User Center or the Redeem Code option and open Gift Code Exchange. The wording can vary by client. Rewards still arrive through in-game Mail.
          </div>
        </section>

        <section className={styles.section} id="problems">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Troubleshooting</p>
              <h2>Why a redeem code may fail.</h2>
            </div>
            <p>
              Most failures come from expiry, prior use, a mismatched server or character, captcha errors, or a region-specific promotion.
            </p>
          </div>
          <div className={styles.issueGrid}>
            {issues.map((issue) => (
              <article className={styles.issueCard} key={issue.title}>
                <h3>{issue.title}</h3>
                <p>{issue.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="sources">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Verification method</p>
              <h2>How this list was selected.</h2>
            </div>
            <p>
              We included codes repeated by multiple current guides, excluded unsupported strings that appeared only once, and separated the lower-confidence community report.
            </p>
          </div>
          <div className={styles.sources}>
            <p>
              The redemption path is also supported by a current OneOne promotion: Settings → User Center → Gift Code Exchange, followed by mailbox delivery.
            </p>
            <a href="https://discord.com/servers/ragnarok-the-new-world-official-1270573581201440789" target="_blank" rel="noopener noreferrer">Official Ragnarok: The New World Discord</a>
            <a href="https://gamingph.com/2026/05/list-of-all-ragnarok-the-new-world-redeem-codes/" target="_blank" rel="noopener noreferrer">GamingPH code and reward list</a>
            <a href="https://allthings.how/ragnarok-the-new-world-codes/" target="_blank" rel="noopener noreferrer">All Things How August 2026 verification</a>
            <a href="https://games.oneone.com/newsletters/smo-oneone-row" target="_blank" rel="noopener noreferrer">OneOne official partner redemption instructions</a>
          </div>
        </section>

        <section className={styles.section} id="faq">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>FAQ</p>
              <h2>Redeem-code questions.</h2>
            </div>
          </div>
          <div className={styles.faqs}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}

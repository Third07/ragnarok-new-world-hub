import type { Metadata } from "next";
import Link from "next/link";
import RedeemCodeList from "./RedeemCodeList";
import { activeCodes, reportedCodes, codeSources, codesReviewedAt, codesReviewedLabel, partnerPromotion } from "./redeem-code-data";
import styles from "./redeem-codes.module.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Codes (August 2026)",
  description:
    "RTNW SEA codes reviewed August 28: copy 9 source-listed codes, check disputed codes, and redeem on mobile or PC. Includes partner-code expiry details.",
  alternates: { canonical: "/guides/redeem-codes/" },
  openGraph: {
    type: "article",
    url: "/guides/redeem-codes/",
    title: "Ragnarok: The New World Codes (August 2026)",
    publishedTime: "2026-08-04",
    modifiedTime: codesReviewedAt,
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
      "No. Sources were reviewed on August 28, 2026, but these codes were not redeemed in-game by RTNW Hub. The main list contains nine codes listed by multiple sources. Conflicting reports and older codes are separated; the game's response is authoritative.",
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
        dateModified: codesReviewedAt,
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
        <nav className={styles.jumpNav} aria-label="Redeem code sections">
          <a href="#codes">Shared codes</a><a href="#disputed-codes">Disputed codes</a><a href="#partner-codes">Partner codes</a><a href="#how-to-redeem">Redeem steps</a><a href="#sources">Sources</a>
        </nav>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
              <Link href="/">RTNW Hub</Link><span aria-hidden="true">/</span>
              <a href="/guides/">Guides</a><span aria-hidden="true">/</span>
              <span>Redeem Codes</span>
            </nav>
            <p className={styles.kicker}>Sources reviewed <time dateTime={codesReviewedAt}>{codesReviewedLabel}</time> · SEA servers</p>
            <h1>Ragnarok: The New World <em>redeem codes.</em></h1>
            <p className={styles.lead}>
              Copy nine source-listed SEA gift codes, check disputed codes separately, and follow the Gift Code Exchange steps for mobile or PC.
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
            This is a review of published sources, not a successful in-game redemption test. No new broadly supported shared code was found in this review. Expiry dates for the nine shared codes are unconfirmed; trust the game&apos;s response for your server and character.
          </div>
        </div>

        <section className={styles.section} id="codes">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Try these first</p>
              <h2>Shared codes listed by current sources.</h2>
            </div>
            <p>
              These nine codes appear in multiple August lists. Start with ROWGO1ST and ROW0716, then try the remaining codes individually. Source agreement does not guarantee availability.
            </p>
          </div>
          <RedeemCodeList codes={activeCodes} />
        </section>

        <section className={styles.section} id="disputed-codes">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Not confirmed active</p>
              <h2>Disputed and older codes.</h2>
            </div>
            <p>
              BABYMONSTER and ROARIEL have conflicting reports. ROW0015 has an inactive report. These are kept outside the main copy list so old or disputed codes are not mistaken for newly verified rewards.
            </p>
          </div>
          <RedeemCodeList codes={reportedCodes} allowCopyAll={false} />
        </section>

        <section className={styles.section} id="partner-codes">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.sectionKicker}>Individual partner codes</p>
              <h2>A separate promotion with a stated deadline.</h2>
            </div>
            <p>Partner codes are not shared gift codes. Claim your own code through the participating partner; another player&apos;s code may already be used.</p>
          </div>
          <div className={styles.alternate}>
            <strong>{partnerPromotion.name}:</strong> the published deadline is <time dateTime={partnerPromotion.expiresAt}>{partnerPromotion.deadline}</time>.
            {" "}The offer is for SM Malls Online app users, once per UID and while stocks last.
            {" "}<a href={partnerPromotion.source} target="_blank" rel="noopener noreferrer">Read the official promotion terms</a>.
          </div>
          <p>BlueStacks also publishes limited single-use codes. We link to the original list under Sources instead of presenting those one-time strings as reusable codes for everyone.</p>
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
              We compared the August source lists on August 28, kept nine repeatedly listed codes together, and separated availability conflicts. Source links on each code show where its report came from; no expiry date is invented.
            </p>
          </div>
          <div className={styles.sources}>
            <p>
              The redemption path is also supported by a current OneOne promotion: Settings → User Center → Gift Code Exchange, followed by mailbox delivery.
            </p>
            <a href="https://www.facebook.com/RagnarokTheNewWorld.Gravity/" target="_blank" rel="noopener noreferrer">Official Ragnarok: The New World announcements</a>
            {codeSources.map((source) => (
              <a id={`source-${source.id}`} href={source.url} key={source.id} target="_blank" rel="noopener noreferrer">{source.label}</a>
            ))}
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

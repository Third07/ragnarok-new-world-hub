import type { Metadata } from "next";
import InfoPageShell from "../InfoPageShell";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Read the RTNW Hub privacy notice covering local browser preferences, hosting requests, third-party advertisements, and public GitHub reports.",
  alternates: { canonical: "/privacy/" },
  openGraph: {
    type: "website",
    url: "/privacy/",
    title: "RTNW Hub Privacy Notice",
    description:
      "RTNW Hub has no login system or user database. This notice explains local browser storage and third-party services.",
  },
};

export default function PrivacyPage() {
  return (
    <InfoPageShell
      eyebrow="How the site handles technical information"
      title="Privacy Notice"
      summary="RTNW Hub has no login page, user accounts, user profiles, payment system, or user database. This page explains the limited browser storage and third-party services used by the site."
      currentPath="/privacy/"
    >
      <section>
        <h2>What RTNW Hub does not collect</h2>
        <p>
          RTNW Hub does not operate a login system, account registration, direct messaging, payment processing, or a database of visitor profiles. The website does not ask visitors to provide a name, email address, password, billing information, or game-account credentials.
        </p>
        <div className={styles.callout}>
          <strong>RTNW Hub does not set first-party cookies.</strong>
          <p>The website itself uses local browser storage for selected tool preferences. Local storage is not a login account and is not synchronized to a user database.</p>
        </div>
      </section>

      <section>
        <h2>Local browser preferences</h2>
        <p>
          Some tools use your browser&apos;s local storage to remember settings such as language, selected client, planner state, or interface preferences. These values normally stay on the device and browser where they were created.
        </p>
        <p>
          You can remove locally saved values by clearing site data in your browser. Clearing them may reset language selections, planner progress, or other saved tool settings.
        </p>
      </section>

      <section>
        <h2>Hosting and technical requests</h2>
        <p>
          Services that host, deliver, or protect the website may receive standard technical request information, such as the requested page, date and time, IP address, browser information, referring page, and security signals. RTNW Hub does not copy this information into a separate user-profile database.
        </p>
      </section>

      <section>
        <h2>Third-party advertisements and external services</h2>
        <p>
          Advertising placements load content supplied by a third-party advertising provider. The provider may receive technical request information and may apply its own storage, measurement, security, or advertising practices. Those systems are controlled by the provider rather than by RTNW Hub.
        </p>
        <p>
          Visitors can use browser privacy controls, third-party-cookie blocking, or trusted content-blocking tools. External websites, GitHub, hosting services, and advertising providers operate under their own privacy policies.
        </p>
      </section>

      <section>
        <h2>GitHub reports</h2>
        <p>
          Bug reports, corrections, feature requests, and contact requests are handled through GitHub. GitHub issues are generally public and may display your GitHub username, comments, attachments, and timestamps.
        </p>
        <div className={styles.callout}>
          <strong>Do not post sensitive information in a public issue.</strong>
          <p>Do not include passwords, game-account credentials, payment details, identification documents, home addresses, or confidential files.</p>
        </div>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          This notice will be updated if RTNW Hub later adds accounts, analytics, direct forms, payments, or other features that change how information is handled.
        </p>
        <div className={styles.linkGrid}>
          <a className={styles.linkCard} href="/contact/">
            <small>Questions or corrections</small>
            <strong>Contact the project</strong>
            <span>Open Contact →</span>
          </a>
          <a className={styles.linkCard} href="/terms/">
            <small>Site rules</small>
            <strong>Read the Terms of Use</strong>
            <span>Open Terms →</span>
          </a>
        </div>
      </section>
    </InfoPageShell>
  );
}

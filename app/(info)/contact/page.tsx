import type { Metadata } from "next";
import InfoPageShell from "../InfoPageShell";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Contact RTNW Hub",
  description:
    "Report RTNW Hub data corrections, website bugs, feature requests, privacy concerns, or copyright and trademark issues through the project contact channels.",
  alternates: { canonical: "/contact/" },
  openGraph: {
    type: "website",
    url: "/contact/",
    title: "Contact RTNW Hub",
    description: "Report data problems, bugs, feature requests, privacy concerns, or rights-related issues.",
  },
};

const issueBase = "https://github.com/Third07/ragnarok-new-world-hub/issues/new";

export default function ContactPage() {
  return (
    <InfoPageShell
      eyebrow="Corrections, bugs and rights requests"
      title="Contact RTNW Hub"
      summary="Use the project issue tracker for game-data corrections, website bugs, feature suggestions, and requests that need the site owner’s attention."
      currentPath="/contact/"
    >
      <section>
        <h2>Choose the right contact path</h2>
        <div className={styles.linkGrid}>
          <a className={styles.linkCard} href={`${issueBase}?template=data-correction.yml`} target="_blank" rel="noreferrer">
            <small>Game data</small>
            <strong>Report incorrect information</strong>
            <span>Open correction form ↗</span>
          </a>
          <a className={styles.linkCard} href={`${issueBase}?template=bug-report.yml`} target="_blank" rel="noreferrer">
            <small>Website functionality</small>
            <strong>Report a bug</strong>
            <span>Open bug form ↗</span>
          </a>
          <a className={styles.linkCard} href={`${issueBase}?template=feature-request.yml`} target="_blank" rel="noreferrer">
            <small>Project development</small>
            <strong>Suggest a feature or guide</strong>
            <span>Open request form ↗</span>
          </a>
          <a className={styles.linkCard} href={`${issueBase}?template=private-contact-request.yml`} target="_blank" rel="noreferrer">
            <small>Privacy or rights matter</small>
            <strong>Request a private contact channel</strong>
            <span>Open contact request ↗</span>
          </a>
        </div>
      </section>

      <section>
        <h2>What to include</h2>
        <h3>For a data correction</h3>
        <ul>
          <li>The exact page or tool URL.</li>
          <li>The item, monster, card, skill, map, or value that appears incorrect.</li>
          <li>The current displayed value and the expected value.</li>
          <li>Your server, language, and game version when relevant.</li>
          <li>A screenshot or reliable source that helps verify the correction.</li>
        </ul>
        <h3>For a website bug</h3>
        <ul>
          <li>The device, operating system, and browser.</li>
          <li>Steps that reproduce the problem.</li>
          <li>What you expected and what happened instead.</li>
          <li>A screenshot or screen recording when useful.</li>
        </ul>
      </section>

      <section>
        <h2>Privacy, copyright and trademark requests</h2>
        <p>
          GitHub issues are public. Do not post government identifiers, home addresses, private account details, handwritten signatures, confidential documents, or other sensitive personal data in an issue.
        </p>
        <p>
          For a privacy, copyright, or trademark matter, open the private-contact request form with only a short description and a way for the project owner to identify the affected page. A private channel can then be arranged before sensitive details are exchanged.
        </p>
        <div className={styles.callout}>
          <strong>Rights notices should identify the affected material precisely.</strong>
          <p>Include the RTNW Hub URL, the protected work or mark, your relationship to the rights holder, and the action requested. Do not submit information you are not authorized to disclose.</p>
        </div>
      </section>

      <section>
        <h2>Response expectations</h2>
        <p>
          RTNW Hub is an independent community project, not a staffed support service. Reports are reviewed based on severity, reproducibility, available evidence, and the impact on players. Submitting a request does not guarantee a specific outcome or response time.
        </p>
        <p>
          Account, payment, ban, server, or official game-support problems must be sent to the game’s official support channels. RTNW Hub cannot access game accounts or publisher systems.
        </p>
      </section>
    </InfoPageShell>
  );
}

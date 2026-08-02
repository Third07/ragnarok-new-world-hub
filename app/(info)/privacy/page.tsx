import type { Metadata } from "next";
import InfoPageShell from "../InfoPageShell";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Privacy and Cookies",
  description:
    "Read the RTNW Hub privacy and cookies notice covering browser storage, hosting logs, third-party advertisements, GitHub reports, external links, retention, and privacy choices.",
  alternates: { canonical: "/privacy/" },
  openGraph: {
    type: "website",
    url: "/privacy/",
    title: "RTNW Hub Privacy and Cookies",
    description: "How RTNW Hub and connected service providers may process technical data and browser storage.",
  },
};

export default function PrivacyPage() {
  return (
    <InfoPageShell
      eyebrow="Privacy notice and browser-storage information"
      title="Privacy and Cookies"
      summary="This notice explains what information may be processed when you use RTNW Hub, which parts remain on your device, and how third-party hosting, advertising, and GitHub services are involved."
      currentPath="/privacy/"
    >
      <section>
        <h2>Summary of current site behavior</h2>
        <p>
          RTNW Hub does not currently provide user accounts, direct messaging, payment processing, or a first-party contact form. The project does not intentionally ask visitors to submit personal information through the website itself.
        </p>
        <p>
          Technical information may still be processed by the services that deliver, secure, advertise on, or link from the site. Some tools also store preferences or work-in-progress data in your browser.
        </p>
        <div className={styles.callout}>
          <strong>Do not submit sensitive information through public GitHub issues.</strong>
          <p>Issue reports are generally visible to the public. Use the Contact page to request a private channel for privacy, copyright, trademark, or other sensitive matters.</p>
        </div>
      </section>

      <section>
        <h2>Information that may be processed</h2>
        <h3>Hosting, security and request data</h3>
        <p>
          Hosting, network, and security providers may process information needed to deliver and protect the site, such as an IP address, requested URL, date and time, referring page, browser or device information, diagnostic events, and security signals. RTNW Hub does not operate a separate visitor-profile database from this technical traffic information.
        </p>
        <h3>Browser storage and preferences</h3>
        <p>
          Site tools may use local storage or similar browser features to remember language selection, planner state, interface preferences, or other locally saved tool data. This information normally remains on your device unless you deliberately copy, export, or share it.
        </p>
        <h3>Public reports and contact requests</h3>
        <p>
          When you open a GitHub issue, GitHub processes the account information and content you submit under its own terms and privacy practices. The issue may include your GitHub username, comments, attachments, timestamps, and any information you choose to provide.
        </p>
      </section>

      <section>
        <h2>Third-party advertisements and cookies</h2>
        <p>
          RTNW Hub contains advertising placements that load third-party advertisement content in sandboxed frames. When an advertisement loads, the advertising provider may receive technical request information and may use cookies or similar technologies for delivery, security, frequency control, measurement, or advertising purposes.
        </p>
        <p>
          Third-party advertising technology is controlled by the advertising provider, not by RTNW Hub. Its data handling, cookie duration, personalization choices, and opt-out mechanisms are governed by the provider’s own policies and applicable law.
        </p>
        <h3>Your browser choices</h3>
        <ul>
          <li>Block or delete cookies through your browser settings.</li>
          <li>Block third-party cookies while allowing first-party site storage.</li>
          <li>Use private-browsing mode, subject to the limitations of that mode.</li>
          <li>Use browser privacy or content-blocking tools that you trust.</li>
        </ul>
        <p>
          Blocking third-party advertising storage may prevent some advertisements from loading or measuring correctly, but the core guide and game-data tools are designed to remain usable.
        </p>
      </section>

      <section>
        <h2>Purposes and sharing</h2>
        <p>Information may be processed for the following limited purposes:</p>
        <ul>
          <li>Delivering pages, images, data files, and interactive tools.</li>
          <li>Remembering local preferences and tool state.</li>
          <li>Protecting the site from abuse, errors, and security threats.</li>
          <li>Displaying and measuring third-party advertisements.</li>
          <li>Receiving and resolving public bug reports, corrections, and requests.</li>
        </ul>
        <p>
          RTNW Hub may rely on hosting, content-delivery, security, advertising, and GitHub services to perform these functions. Those services may process data in countries other than your own.
        </p>
      </section>

      <section>
        <h2>Retention and deletion</h2>
        <ul>
          <li><strong>Browser storage:</strong> remains until the site removes it, it expires where applicable, or you clear it.</li>
          <li><strong>GitHub issues:</strong> remain according to GitHub’s systems and repository moderation decisions.</li>
          <li><strong>Hosting and security logs:</strong> are retained according to the relevant provider’s operational and security settings.</li>
          <li><strong>Advertising data:</strong> is retained according to the advertising provider’s policies and your browser or consent choices.</li>
        </ul>
        <p>
          A request to remove information controlled directly by the project can be submitted through the Contact page. RTNW Hub cannot directly delete information controlled solely by an independent third-party service.
        </p>
      </section>

      <section>
        <h2>Your privacy rights</h2>
        <p>
          Depending on your location and the circumstances, you may have rights to be informed, access personal data, request correction or deletion, object to or restrict certain processing, withdraw consent where consent applies, or complain to a data-protection authority.
        </p>
        <p>
          Submit a privacy contact request with the affected page or service and enough non-sensitive information to identify the issue. Identity verification may be required before acting on a request involving personal data.
        </p>
      </section>

      <section>
        <h2>Children, security and changes</h2>
        <p>
          RTNW Hub is a general game-reference site and is not designed to collect personal information from children. Visitors should not submit personal or sensitive information through public issue forms.
        </p>
        <p>
          Reasonable technical and organizational measures may be used to protect the site, but no internet service can guarantee absolute security or uninterrupted availability.
        </p>
        <p>
          This notice may be updated when the site adds new tools, providers, advertising technology, contact methods, analytics, or other data-processing features. The date at the top of the page identifies the latest published revision.
        </p>
        <div className={styles.linkGrid}>
          <a className={styles.linkCard} href="/contact/">
            <small>Privacy request</small>
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

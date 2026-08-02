import type { Metadata } from "next";
import InfoPageShell from "../InfoPageShell";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the RTNW Hub Terms of Use covering permitted use, community reports, game data, external services, advertisements, availability, warranties, and liability limitations.",
  alternates: { canonical: "/terms/" },
  openGraph: {
    type: "website",
    url: "/terms/",
    title: "RTNW Hub Terms of Use",
    description: "Rules and limitations that apply when using RTNW Hub guides, databases, planners, and simulators.",
  },
};

export default function TermsPage() {
  return (
    <InfoPageShell
      eyebrow="Rules for using the website and its tools"
      title="Terms of Use"
      summary="These terms explain the conditions that apply when you access RTNW Hub, use its planners and databases, follow its guides, or submit reports through connected services."
      currentPath="/terms/"
    >
      <section>
        <h2>Acceptance and scope</h2>
        <p>
          By accessing or using RTNW Hub, you agree to these Terms of Use and the related Privacy and Disclaimer pages. If you do not agree, do not use the site.
        </p>
        <p>
          These terms apply to the website, guide pages, searchable indexes, planners, simulators, downloadable or shareable outputs, and project contact channels controlled by RTNW Hub. Separate services such as GitHub, hosting providers, advertisers, and linked websites apply their own terms.
        </p>
      </section>

      <section>
        <h2>Permitted use</h2>
        <p>You may use RTNW Hub for personal, educational, commentary, research, and ordinary community-reference purposes.</p>
        <p>You must not:</p>
        <ul>
          <li>Attempt to disrupt, overload, damage, bypass, or gain unauthorized access to the site or its infrastructure.</li>
          <li>Use automated access in a way that creates unreasonable load or interferes with other visitors.</li>
          <li>Upload or submit malware, deceptive links, unlawful material, or content that infringes another person’s rights.</li>
          <li>Misrepresent RTNW Hub as an official game service or imply endorsement by a publisher, developer, platform, or rights holder.</li>
          <li>Use site content to deceive players, impersonate others, manipulate accounts, or facilitate prohibited game activity.</li>
          <li>Remove ownership, attribution, warning, source, or uncertainty labels from copied material in a misleading way.</li>
        </ul>
      </section>

      <section>
        <h2>Game data and editorial content</h2>
        <p>
          Database entries may be extracted, translated, normalized, or connected from available game-related data. Guides may combine those entries with community experience and editorial judgment.
        </p>
        <p>
          RTNW Hub does not guarantee that names, values, availability, drop information, translations, mechanics, rankings, routes, or recommendations are complete, current, or correct for every server, language, platform, account, or patch.
        </p>
        <div className={styles.callout}>
          <strong>Guide recommendations are not official instructions.</strong>
          <p>Tier lists, builds, rotations, farming routes, refine targets, and F2P priorities are informational opinions that may change as the game and community knowledge develop.</p>
        </div>
      </section>

      <section>
        <h2>Planners, simulators and shared outputs</h2>
        <p>
          Planners and simulators are estimation and organization tools. Their outputs do not guarantee in-game results, availability, success rates, damage, profitability, matchmaking outcomes, account progression, or compatibility with a future patch.
        </p>
        <p>
          You are responsible for checking important decisions in the live game before spending currency, materials, money, or significant playtime. RTNW Hub is not responsible for losses caused by relying on an incorrect value, an outdated recommendation, random outcomes, or a difference between the site data and the live server.
        </p>
      </section>

      <section>
        <h2>Community reports and submissions</h2>
        <p>
          When you submit an issue, correction, screenshot, suggestion, or other project feedback, you confirm that you have the right to share it and that it does not contain unlawful, confidential, malicious, or unnecessarily sensitive information.
        </p>
        <p>
          You allow RTNW Hub to review, quote, reproduce, adapt, and use the submitted material for investigating and improving the project. You retain any ownership rights you already hold in the original material.
        </p>
        <p>
          Reports may be edited, closed, declined, or removed when they are unsupported, duplicated, abusive, irrelevant, unsafe, or unsuitable for a public repository.
        </p>
      </section>

      <section>
        <h2>Third-party services, links and advertisements</h2>
        <p>
          RTNW Hub may display third-party advertisements and link to external websites, game services, community resources, GitHub, or other providers. A link or advertisement does not mean RTNW Hub controls, guarantees, or endorses the destination, seller, offer, security, availability, or privacy practice.
        </p>
        <p>
          You are responsible for evaluating third-party services before installing software, sharing information, making a purchase, or taking another action outside RTNW Hub.
        </p>
      </section>

      <section>
        <h2>Intellectual property and fan use</h2>
        <p>
          The RTNW Hub site design, original text, original code, organization, and original editorial material may be protected by applicable intellectual-property law. Game names, logos, characters, artwork, icons, screenshots, data, and trademarks remain the property of their respective owners.
        </p>
        <p>
          Nothing in these terms transfers ownership of third-party game intellectual property or grants permission beyond rights available under applicable law or a rights holder’s policy.
        </p>
      </section>

      <section>
        <h2>Availability, warranties and liability</h2>
        <p>
          RTNW Hub is provided on an “as is” and “as available” basis. The project may change, suspend, remove, or restrict any page, tool, dataset, feature, advertisement, or contact channel without notice.
        </p>
        <p>
          To the maximum extent allowed by applicable law, RTNW Hub disclaims warranties of accuracy, merchantability, fitness for a particular purpose, non-infringement, uninterrupted operation, and error-free availability.
        </p>
        <p>
          To the maximum extent allowed by applicable law, RTNW Hub and its contributors are not liable for indirect, incidental, special, consequential, exemplary, or economic loss arising from use of the site, inability to use it, reliance on its information, or interaction with a third party.
        </p>
        <p>
          Nothing in these terms excludes rights or liability that cannot lawfully be excluded or limited.
        </p>
      </section>

      <section>
        <h2>Changes and enforcement</h2>
        <p>
          These terms may be revised when the project, its tools, contact methods, or legal requirements change. Continued use after a published revision means the revised terms apply from that point forward.
        </p>
        <p>
          RTNW Hub may block abusive traffic, remove submissions, restrict access, or take other reasonable action to protect visitors, contributors, infrastructure, and rights holders.
        </p>
        <div className={styles.linkGrid}>
          <a className={styles.linkCard} href="/privacy/">
            <small>Data practices</small>
            <strong>Read Privacy and Cookies</strong>
            <span>Open Privacy →</span>
          </a>
          <a className={styles.linkCard} href="/disclaimer/">
            <small>Fan-site status</small>
            <strong>Read the Disclaimer</strong>
            <span>Open Disclaimer →</span>
          </a>
        </div>
      </section>
    </InfoPageShell>
  );
}

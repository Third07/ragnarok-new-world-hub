import type { Metadata } from "next";
import InfoPageShell from "../InfoPageShell";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "Fan-site Disclaimer",
  description:
    "Read the RTNW Hub fan-site disclaimer covering unofficial status, trademarks, game assets, patch-sensitive data, community builds, simulations, ads, and external links.",
  alternates: { canonical: "/disclaimer/" },
  openGraph: {
    type: "website",
    url: "/disclaimer/",
    title: "RTNW Hub Fan-site Disclaimer",
    description: "RTNW Hub is an independent, unofficial Ragnarok: The New World fan resource.",
  },
};

export default function DisclaimerPage() {
  return (
    <InfoPageShell
      eyebrow="Unofficial project and information limitations"
      title="Fan-site Disclaimer"
      summary="RTNW Hub is an independent community reference. It is not the game, an official support service, or a representative of the publisher, developer, platform operators, or intellectual-property owners."
      currentPath="/disclaimer/"
    >
      <section>
        <h2>Unofficial and independent</h2>
        <p>
          RTNW Hub is a fan-made website created to help players research Ragnarok: The New World. It is not affiliated with, sponsored by, approved by, or operated by the game’s publisher, developer, licensors, platform operators, or related companies unless a page explicitly states otherwise.
        </p>
        <p>
          References to the game, companies, services, and platforms are descriptive and do not imply an official relationship or endorsement.
        </p>
      </section>

      <section>
        <h2>Names, trademarks and game assets</h2>
        <p>
          Game names, logos, characters, artwork, icons, screenshots, item names, skill names, maps, data, and trademarks belong to their respective owners. Their appearance on RTNW Hub is intended for identification, commentary, criticism, comparison, education, and fan-reference purposes.
        </p>
        <p>
          Original RTNW Hub code, layout, written explanations, organization, and editorial material remain separate from third-party game intellectual property.
        </p>
        <div className={styles.callout}>
          <strong>Rights-holder concern?</strong>
          <p>Use the Contact page to identify the exact RTNW Hub URL, the affected work or mark, your relationship to the rights holder, and the requested action.</p>
        </div>
      </section>

      <section>
        <h2>Game-data limitations</h2>
        <p>
          Data may be extracted, translated, normalized, inferred from relationships, or connected across available project files. Some entries may be incomplete, unused, experimental, region-specific, language-specific, or not currently obtainable on the live server.
        </p>
        <p>
          Patches can change skill values, item effects, obtain sources, maps, event schedules, refine behavior, balance, and class performance. A page’s update date does not guarantee that every underlying value has been independently confirmed in the latest live client.
        </p>
      </section>

      <section>
        <h2>Builds, tier lists and community advice</h2>
        <p>
          Builds, stat directions, skill priorities, rotations, class rankings, farming routes, F2P recommendations, and upgrade stopping points are editorial or community-informed guidance. They are not official rankings and may not fit every player, party composition, account budget, server economy, control method, or patch.
        </p>
        <p>
          Community consensus can be useful while still being incomplete or biased toward the players and content represented in the available discussions. RTNW Hub may revise recommendations as stronger evidence becomes available.
        </p>
      </section>

      <section>
        <h2>Simulators and probabilities</h2>
        <p>
          Simulators model the data and rules available to the project. A simulated outcome is not a prediction or guarantee of an actual in-game result. Random systems can produce outcomes that differ substantially from a short simulated run or an expected average.
        </p>
        <p>
          When a rate or rule is missing, RTNW Hub may label it unknown, omit a projection, or provide a clearly marked editorial assumption. Visitors should verify high-cost decisions in the live game before spending valuable currency, materials, or money.
        </p>
      </section>

      <section>
        <h2>Official support and account matters</h2>
        <p>
          RTNW Hub cannot access game accounts, characters, purchases, bans, login records, support tickets, servers, or publisher systems. Account recovery, payment disputes, technical support, enforcement actions, and official event questions must be handled through the appropriate official game or platform support channel.
        </p>
      </section>

      <section>
        <h2>Advertisements and external resources</h2>
        <p>
          Advertisements and external links are supplied or operated by third parties. Their presence does not mean RTNW Hub verifies or endorses the advertiser, destination, product, claim, download, transaction, privacy practice, or security.
        </p>
        <p>
          Visitors should independently evaluate any external service before installing software, providing information, creating an account, or making a purchase.
        </p>
        <div className={styles.linkGrid}>
          <a className={styles.linkCard} href="/about/">
            <small>Editorial methods</small>
            <strong>Learn how information is classified</strong>
            <span>Open About →</span>
          </a>
          <a className={styles.linkCard} href="/contact/">
            <small>Corrections or rights requests</small>
            <strong>Contact RTNW Hub</strong>
            <span>Open Contact →</span>
          </a>
        </div>
      </section>
    </InfoPageShell>
  );
}

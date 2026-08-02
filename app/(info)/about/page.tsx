import type { Metadata } from "next";
import InfoPageShell from "../InfoPageShell";
import styles from "../info.module.css";

export const metadata: Metadata = {
  title: "About RTNW Hub",
  description:
    "Learn how RTNW Hub combines Ragnarok: The New World game data, community experience, editorial guides, planners, indexes, and correction workflows.",
  alternates: { canonical: "/about/" },
  openGraph: {
    type: "website",
    url: "/about/",
    title: "About RTNW Hub",
    description:
      "An independent Ragnarok: The New World guide and game-data project built around practical tools and transparent editorial methods.",
  },
};

export default function AboutPage() {
  return (
    <InfoPageShell
      eyebrow="Project, methods and editorial policy"
      title="About RTNW Hub"
      summary="RTNW Hub is an independent fan-made guide and game-data project for Ragnarok: The New World. It connects searchable data with practical planning tools and clearly labeled editorial recommendations."
      currentPath="/about/"
    >
      <section>
        <h2>What the site is built to do</h2>
        <p>
          RTNW Hub helps players move from a question to an actionable in-game plan. The site combines a Skill Planner, World Map, Monster Index, Card Index, Equipment Index, refine and affix tools, event references, and long-form guides in one mobile-friendly resource.
        </p>
        <div className={styles.cardGrid}>
          <article>
            <h3>Searchable game data</h3>
            <p>Indexes expose available names, effects, stats, sources, habitats, requirements, and relationships found in the project data.</p>
          </article>
          <article>
            <h3>Practical planning tools</h3>
            <p>Planners and simulators turn raw values into builds, routes, comparisons, and upgrade decisions.</p>
          </article>
          <article>
            <h3>Community-informed guides</h3>
            <p>Build priorities, tier lists, rotations, and progression advice may use player experience where no complete official strategy source exists.</p>
          </article>
          <article>
            <h3>Transparent uncertainty</h3>
            <p>Unknown rates, incomplete translations, developing metas, and patch-sensitive recommendations are labeled instead of being presented as confirmed facts.</p>
          </article>
        </div>
      </section>

      <section>
        <h2>How information is classified</h2>
        <h3>Database-backed information</h3>
        <p>
          Names, item effects, skill mechanics, prerequisites, monster attributes, obtain sources, map relationships, and refine tables are taken from the data files used by the website tools. A database entry can still be incomplete, mistranslated, unavailable on the current server, or changed by a later patch.
        </p>
        <h3>Editorial recommendations</h3>
        <p>
          Tier placements, build priorities, stat directions, rotations, route scores, F2P recommendations, and stopping rules are judgments based on the available data and current player experience. They are not official rankings or guarantees.
        </p>
        <h3>Community reports</h3>
        <p>
          Player reports are useful for identifying bugs, translation problems, live-server differences, and emerging strategies. Reports are reviewed before they are treated as established information.
        </p>
      </section>

      <section>
        <h2>Corrections and update policy</h2>
        <p>
          Every major guide includes an update date and a note explaining which parts are data-backed and which parts are editorial. When a patch or verified report changes a recommendation, the page may be revised without preserving outdated rankings.
        </p>
        <div className={styles.callout}>
          <strong>Found an incorrect value?</strong>
          <p>Use the Contact page to report the exact page, current value, expected value, server or language, and any supporting screenshot or source.</p>
        </div>
      </section>

      <section>
        <h2>Independent fan project</h2>
        <p>
          RTNW Hub is not an official game service and does not represent the game publisher, developer, platform operators, or intellectual-property owners. Game names, artwork, icons, and trademarks remain the property of their respective owners and are used for identification, commentary, and fan-reference purposes.
        </p>
        <div className={styles.linkGrid}>
          <a className={styles.linkCard} href="/guides/">
            <small>Published content</small>
            <strong>Browse the guide library</strong>
            <span>Open Guides →</span>
          </a>
          <a className={styles.linkCard} href="/contact/">
            <small>Corrections and requests</small>
            <strong>Contact the project</strong>
            <span>Open Contact →</span>
          </a>
        </div>
      </section>
    </InfoPageShell>
  );
}

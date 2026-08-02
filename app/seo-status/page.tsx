import type { Metadata } from "next";
import SeoStatusClient from "./SeoStatusClient";
import styles from "./seo-status.module.css";

export const metadata: Metadata = {
  title: "SEO Maintenance Status",
  description:
    "Private-facing RTNW Hub crawl diagnostics, search ownership status, sitemap checks, IndexNow configuration, and SEO maintenance instructions.",
  alternates: { canonical: "/seo-status/" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function SeoStatusPage() {
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#seo-status-content">Skip to SEO status</a>

      <header className={styles.header}>
        <a className="brand" href="/" aria-label="RTNW Hub home">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy">
            <strong>Ragnarok</strong>
            <small>The New World Hub</small>
          </span>
        </a>
        <nav aria-label="Maintenance navigation">
          <a href="/">Home</a>
          <a href="/updates/">Updates</a>
          <a href="/sitemap.xml">Sitemap</a>
          <a href="/robots.txt">Robots</a>
        </nav>
      </header>

      <main id="seo-status-content">
        <section className={styles.hero}>
          <p className={styles.kicker}>No accounts · No first-party analytics · No user database</p>
          <h1>SEO maintenance <em>status.</em></h1>
          <p>
            Build-time crawl diagnostics for RTNW Hub. This page reads a generated technical report and does not ask visitors to submit personal information.
          </p>
          <div className={styles.heroLinks}>
            <a href="/sitemap.xml">Open sitemap <span aria-hidden="true">↗</span></a>
            <a href="/feed.xml">Open RSS feed <span aria-hidden="true">↗</span></a>
            <a href="/seo-audit.json">Open raw audit <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <div className={styles.content}>
          <SeoStatusClient />

          <section className={styles.setupPanel} aria-labelledby="setup-title">
            <p className={styles.kicker}>Search ownership</p>
            <h2 id="setup-title">Add the real Google and Bing verification tokens.</h2>
            <ol>
              <li>
                In Google Search Console, choose the HTML-tag verification method and copy only the token inside the <code>content</code> attribute.
              </li>
              <li>
                Save it as <code>GOOGLE_SITE_VERIFICATION</code> in the deployment environment.
              </li>
              <li>
                In Bing Webmaster Tools, copy the <code>msvalidate.01</code> value and save it as <code>BING_SITE_VERIFICATION</code>.
              </li>
              <li>Redeploy, verify ownership, and submit <code>https://rtnw.online/sitemap.xml</code>.</li>
            </ol>
            <p>
              Do not paste the full meta tag. The project already generates the correct tag from each token. The variables are documented in <code>.env.example</code>.
            </p>
          </section>

          <section className={styles.setupPanel} aria-labelledby="indexnow-title">
            <p className={styles.kicker}>IndexNow</p>
            <h2 id="indexnow-title">Notify participating search engines after content changes.</h2>
            <ol>
              <li>The public key is hosted from <code>/4cc78cf9b31d099f4de23a0874b08a5e.txt</code>.</li>
              <li>The normal post-build hook submits sitemap URLs whose <code>lastmod</code> is today.</li>
              <li>Submission failures are logged but do not block the website deployment.</li>
              <li>Use the one-time full command after the first deployment when every current URL should be announced.</li>
            </ol>
            <p>
              Set <code>INDEXNOW_AUTO_SUBMIT=0</code> to disable the automatic post-build request. Set <code>INDEXNOW_SUBMIT_ALL=1</code> for one deployment to submit the full sitemap instead of only today&apos;s URLs.
            </p>
          </section>

          <section className={styles.commandsPanel} aria-labelledby="commands-title">
            <p className={styles.kicker}>Local maintenance</p>
            <h2 id="commands-title">Useful commands</h2>
            <div className={styles.commandGrid}>
              <article>
                <code>npm run seo:audit</code>
                <p>Generate the JSON report without failing the command on warnings.</p>
              </article>
              <article>
                <code>npm run seo:audit:strict</code>
                <p>Exit with an error when a critical crawl or metadata check fails.</p>
              </article>
              <article>
                <code>npm run indexnow:submit</code>
                <p>Submit sitemap URLs whose last-modified date is today.</p>
              </article>
              <article>
                <code>npm run indexnow:submit:all</code>
                <p>Submit every URL currently listed in the sitemap.</p>
              </article>
              <article>
                <code>npm run indexnow:dry-run</code>
                <p>Print the full IndexNow payload without sending it.</p>
              </article>
              <article>
                <code>npm run build</code>
                <p>Synchronize metadata, generate the audit, build, and run the non-blocking IndexNow hook.</p>
              </article>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <a className="brand footer-brand" href="/">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy"><strong>Ragnarok</strong><small>The New World Hub</small></span>
        </a>
        <div className="footer-meta">
          <p>Independent fan-made game-data toolkit for Ragnarok: The New World.</p>
          <a href="/updates/">Updates</a>
          <a href="/privacy/">Privacy</a>
          <a href="/contact/">Contact</a>
        </div>
        <a href="#seo-status-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

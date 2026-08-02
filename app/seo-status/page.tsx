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
          <a href="/guides/">Guides</a>
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
            <a href="/4cc78cf9b31d099f4de23a0874b08a5e.txt">Open IndexNow key <span aria-hidden="true">↗</span></a>
            <a href="/seo-audit.json">Open raw audit <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <div className={styles.content}>
          <SeoStatusClient />

          <section className={styles.setupPanel} aria-labelledby="setup-title">
            <p className={styles.kicker}>Search ownership</p>
            <h2 id="setup-title">Google and Bing ownership verification.</h2>
            <ol>
              <li>Keep the Google Search Console HTML-tag token in <code>GOOGLE_SITE_VERIFICATION</code>.</li>
              <li>Keep the Bing <code>msvalidate.01</code> value in <code>BING_SITE_VERIFICATION</code>.</li>
              <li>After metadata changes, redeploy and confirm both properties remain verified.</li>
              <li>Submit <code>https://rtnw.online/sitemap.xml</code> in both webmaster portals.</li>
            </ol>
            <p>
              Store only each provider&apos;s token value, not the complete meta tag. The project generates the correct HTML tags automatically.
            </p>
          </section>

          <section className={styles.setupPanel} aria-labelledby="indexnow-title">
            <p className={styles.kicker}>IndexNow</p>
            <h2 id="indexnow-title">Verify the key, submit changed URLs, then confirm receipt.</h2>
            <ol>
              <li>Open the public key URL and confirm it displays only <code>4cc78cf9b31d099f4de23a0874b08a5e</code>.</li>
              <li>Set the Cloudflare deploy command to <code>npm run deploy</code>. It deploys the Worker first and then runs the IndexNow submission client.</li>
              <li>In the deployment log, look for <code>IndexNow accepted ... with HTTP 200</code> or <code>HTTP 202</code>.</li>
              <li>In Bing Webmaster Tools, open the IndexNow section to confirm that Bing received the submitted URLs.</li>
            </ol>
            <p>
              HTTP 200 means the request was accepted. HTTP 202 means the URLs were received while key validation is pending. IndexNow announces changed URLs but does not guarantee crawling or ranking.
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
                <code>npm run indexnow:verify</code>
                <p>Fetch the live key file and confirm that its contents match the configured key.</p>
              </article>
              <article>
                <code>npm run indexnow:submit</code>
                <p>Submit sitemap URLs whose last-modified date is today.</p>
              </article>
              <article>
                <code>npm run indexnow:submit:all</code>
                <p>Submit every sitemap URL once after the initial IndexNow setup.</p>
              </article>
              <article>
                <code>npm run indexnow:dry-run</code>
                <p>Print the full IndexNow payload without sending it.</p>
              </article>
              <article>
                <code>npm run deploy</code>
                <p>Deploy the existing Cloudflare build and then submit today&apos;s changed URLs to IndexNow.</p>
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
          <a href="/guides/">Guides</a>
          <a href="/privacy/">Privacy</a>
          <a href="/contact/">Contact</a>
        </div>
        <a href="#seo-status-content">Back to top ↑</a>
      </footer>
    </div>
  );
}

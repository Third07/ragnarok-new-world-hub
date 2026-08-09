/* eslint-disable @next/next/no-html-link-for-pages -- Keep shared navigation on reliable document requests instead of Vinext *.rsc prefetches. */

export default function SiteFooter() {
  return (
    <>
      <footer className="shared-site-footer">
        <a className="brand footer-brand" href="/">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy">
            <strong>Ragnarok</strong>
            <small>The New World Hub</small>
          </span>
        </a>

        <div className="footer-meta">
          <p>Independent fan-made game-data toolkit for Ragnarok: The New World.</p>
          <nav className="shared-footer-links" aria-label="Footer navigation">
            <a href="/guides/">Guides</a>
            <a href="/database/">Database</a>
            <a href="/#tools">Tools</a>
            <a href="/search/">Search</a>
            <a href="/updates/">Updates</a>
            <a href="/guides/redeem-codes/">Redeem Codes</a>
            <a href="/about/">About</a>
            <a href="/contact/">Contact</a>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="/disclaimer/">Disclaimer</a>
            <a href="/sitemap.xml">Sitemap</a>
          </nav>
        </div>

        <a href="#page-top">Back to top ↑</a>
      </footer>

      <nav className="mobile-dock shared-mobile-dock" aria-label="Quick mobile navigation">
        <a href="/"><span aria-hidden="true">⌂</span>Home</a>
        <a href="/search/"><span aria-hidden="true">⌕</span>Search</a>
        <a href="/guides/"><span aria-hidden="true">◇</span>Guides</a>
        <a href="/#tools"><span aria-hidden="true">✦</span>Tools</a>
      </nav>
    </>
  );
}

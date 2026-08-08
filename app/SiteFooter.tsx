import Link from "next/link";

export default function SiteFooter() {
  return (
    <>
      <footer className="shared-site-footer">
        <Link className="brand footer-brand" href="/" aria-label="RTNW Hub home">
          <span className="brand-crest" aria-hidden="true">✦</span>
          <span className="brand-copy">
            <strong>Ragnarok</strong>
            <small>The New World Hub</small>
          </span>
        </Link>

        <div className="footer-meta">
          <p>Independent fan-made game-data toolkit for Ragnarok: The New World.</p>
          <nav className="shared-footer-links" aria-label="Footer navigation">
            <Link href="/guides/">Guides</Link>
            <Link href="/database/">Database</Link>
            <Link href="/#tools">Tools</Link>
            <Link href="/search/">Search</Link>
            <Link href="/updates/">Updates</Link>
            <Link href="/guides/redeem-codes/">Redeem Codes</Link>
            <Link href="/about/">About</Link>
            <Link href="/contact/">Contact</Link>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
            <Link href="/disclaimer/">Disclaimer</Link>
            <a href="/sitemap.xml">Sitemap</a>
          </nav>
        </div>

        <a href="#page-top">Back to top ↑</a>
      </footer>

      <nav className="mobile-dock shared-mobile-dock" aria-label="Quick mobile navigation">
        <Link href="/"><span aria-hidden="true">⌂</span>Home</Link>
        <Link href="/search/"><span aria-hidden="true">⌕</span>Search</Link>
        <Link href="/guides/"><span aria-hidden="true">◇</span>Guides</Link>
        <Link href="/#tools"><span aria-hidden="true">✦</span>Tools</Link>
      </nav>
    </>
  );
}

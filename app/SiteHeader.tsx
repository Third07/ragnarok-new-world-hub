"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides/" },
  { label: "Database", href: "/database/" },
  { label: "Tools", href: "/#tools" },
  { label: "Search", href: "/search/" },
] as const;

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href.includes("#")) return false;
  const path = href.split("?")[0].split("#")[0];
  return pathname === path || pathname.startsWith(path);
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header shared-site-header">
      <Link className="brand" href="/" aria-label="Ragnarok: The New World Hub home" onClick={() => setMenuOpen(false)}>
        <span className="brand-crest" aria-hidden="true">✦</span>
        <span className="brand-copy">
          <strong>Ragnarok</strong>
          <small>The New World Hub</small>
        </span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <Link className="search-shortcut" href="/search/" aria-label="Search all RTNW Hub content" onClick={() => setMenuOpen(false)}>
          <span aria-hidden="true">⌕</span>
          <span>Search</span>
          <kbd>All</kbd>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="shared-mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        id="shared-mobile-menu"
        className={`mobile-menu ${menuOpen ? "is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        {navigation.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/sea/skill_planner/" onClick={() => setMenuOpen(false)}>Skill Planner</Link>
        <Link href="/sea/maps/?lang=en-US#map=101" onClick={() => setMenuOpen(false)}>World Map</Link>
        <Link href="/sea/events/" onClick={() => setMenuOpen(false)}>Event Schedule</Link>
        <Link href="/updates/" onClick={() => setMenuOpen(false)}>Updates</Link>
      </nav>
    </header>
  );
}

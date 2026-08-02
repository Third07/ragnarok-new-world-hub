"use client";

import { useEffect } from "react";

const GUIDE_HREF = "/guides/";
const UPDATES_HREF = "/updates/";
const TRUST_LINKS = [
  ["About", "/about/"],
  ["Contact", "/contact/"],
  ["Privacy", "/privacy/"],
  ["Terms", "/terms/"],
  ["Disclaimer", "/disclaimer/"],
] as const;

function createLink(href: string, label: string, className?: string) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  if (href === GUIDE_HREF) link.dataset.guideNavigation = "true";
  if (href === UPDATES_HREF) link.dataset.updatesNavigation = "true";
  if (className) link.className = className;
  return link;
}

function hasLink(root: Element, href: string) {
  return Boolean(root.querySelector(`a[href="${href}"]`));
}

function injectTrustLinks(footerMeta: Element) {
  if (TRUST_LINKS.some(([, href]) => footerMeta.querySelector(`a[href="${href}"]`))) return;

  const nav = document.createElement("nav");
  nav.className = "trust-footer-links";
  nav.dataset.trustNavigation = "true";
  nav.setAttribute("aria-label", "Site information");

  for (const [label, href] of TRUST_LINKS) {
    nav.appendChild(createLink(href, label));
  }

  footerMeta.appendChild(nav);
}

function injectFooterLink(footerMeta: Element, href: string, label: string) {
  if (hasLink(footerMeta, href)) return;

  const link = createLink(href, label);
  const sitemapLink = footerMeta.querySelector('a[href="/sitemap.xml"]');
  const linkParent = sitemapLink?.parentElement;

  if (sitemapLink && linkParent) {
    linkParent.insertBefore(link, sitemapLink);
  } else {
    footerMeta.appendChild(link);
  }
}

function injectPrimaryLink(root: Element, href: string, label: string, before: Element | null) {
  if (hasLink(root, href)) return;
  root.insertBefore(createLink(href, label), before);
}

function injectGuideNavigation() {
  const desktopNav = document.querySelector(".desktop-nav");
  if (desktopNav) {
    const worldMapLink = desktopNav.querySelector('a[href^="/sea/maps/"]');
    injectPrimaryLink(desktopNav, GUIDE_HREF, "Guides", worldMapLink);
    injectPrimaryLink(desktopNav, UPDATES_HREF, "Updates", worldMapLink);
  }

  const mobileMenu = document.querySelector(".mobile-menu");
  if (mobileMenu) {
    const firstTool = mobileMenu.querySelector("a:nth-of-type(2)");
    injectPrimaryLink(mobileMenu, GUIDE_HREF, "Guides", firstTool);
    injectPrimaryLink(mobileMenu, UPDATES_HREF, "Updates", firstTool);
  }

  const guideOverview = document.querySelector(".guide-overview-heading");
  if (guideOverview && !hasLink(guideOverview, GUIDE_HREF)) {
    guideOverview.appendChild(createLink(GUIDE_HREF, "Browse all guides →", "guide-path-link"));
  }

  document.querySelectorAll(".footer-meta").forEach((footerMeta) => {
    injectFooterLink(footerMeta, GUIDE_HREF, "Guides");
    injectFooterLink(footerMeta, UPDATES_HREF, "Updates");
    injectTrustLinks(footerMeta);
  });
}

export default function GuideNavigation() {
  useEffect(() => {
    injectGuideNavigation();

    const observer = new MutationObserver(injectGuideNavigation);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}

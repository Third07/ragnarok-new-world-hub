"use client";

import { useEffect } from "react";

const GUIDE_HREF = "/guides/";

function createGuideLink(className?: string) {
  const link = document.createElement("a");
  link.href = GUIDE_HREF;
  link.textContent = className === "guide-path-link" ? "Browse all guides →" : "Guides";
  link.dataset.guideNavigation = "true";
  if (className) link.className = className;
  return link;
}

function hasGuideLink(root: Element) {
  return Boolean(root.querySelector(`a[href="${GUIDE_HREF}"]`));
}

function injectGuideNavigation() {
  const desktopNav = document.querySelector(".desktop-nav");
  if (desktopNav && !hasGuideLink(desktopNav)) {
    const guideLink = createGuideLink();
    const worldMapLink = desktopNav.querySelector('a[href^="/sea/maps/"]');
    desktopNav.insertBefore(guideLink, worldMapLink ?? null);
  }

  const mobileMenu = document.querySelector(".mobile-menu");
  if (mobileMenu && !hasGuideLink(mobileMenu)) {
    const guideLink = createGuideLink();
    const firstTool = mobileMenu.querySelector("a:nth-of-type(2)");
    mobileMenu.insertBefore(guideLink, firstTool ?? null);
  }

  const guideOverview = document.querySelector(".guide-overview-heading");
  if (guideOverview && !hasGuideLink(guideOverview)) {
    guideOverview.appendChild(createGuideLink("guide-path-link"));
  }

  const footerMeta = document.querySelector(".footer-meta");
  if (footerMeta && !hasGuideLink(footerMeta)) {
    const sitemapLink = footerMeta.querySelector('a[href="/sitemap.xml"]');
    footerMeta.insertBefore(createGuideLink(), sitemapLink ?? null);
  }
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

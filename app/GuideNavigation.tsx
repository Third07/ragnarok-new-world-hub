"use client";

import { useEffect } from "react";

const SEARCH_HREF = "/search/";
const UPDATE_HREF = "/updates/";
const GUIDE_HREF = "/guides/";
const REDEEM_HREF = "/guides/redeem-codes/";

const TRUST_LINKS = [
  ["About", "/about/"],
  ["Contact", "/contact/"],
  ["Privacy", "/privacy/"],
  ["Terms", "/terms/"],
  ["Disclaimer", "/disclaimer/"],
] as const;

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://www.youtube.com/@rtnw.online", mark: "▶" },
  { label: "TikTok", href: "https://www.tiktok.com/@rtnw.online", mark: "♪" },
  { label: "Facebook", href: "https://www.facebook.com/RtnwOnline", mark: "f" },
] as const;

function createLink(href: string, label: string, className?: string) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;
  if (className) link.className = className;
  return link;
}

function createSocialLink(label: string, href: string, mark: string) {
  const link = document.createElement("a");
  link.href = href;
  link.target = "_blank";
  link.rel = "me noopener noreferrer";
  link.title = `Follow RTNW Hub on ${label}`;
  link.setAttribute("aria-label", `Follow RTNW Hub on ${label} (opens in a new tab)`);

  const icon = document.createElement("span");
  icon.className = "social-footer-mark";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = mark;

  const text = document.createElement("span");
  text.textContent = label;
  link.append(icon, text);
  return link;
}

function hasLink(root: Element, href: string) {
  return Boolean(root.querySelector(`a[href="${href}"]`));
}

function injectTrustLinks(footerMeta: Element) {
  if (footerMeta.querySelector('[data-trust-navigation="true"]')) return;

  const nav = document.createElement("nav");
  nav.className = "trust-footer-links";
  nav.dataset.trustNavigation = "true";
  nav.setAttribute("aria-label", "Site information");
  for (const [label, href] of TRUST_LINKS) nav.appendChild(createLink(href, label));
  footerMeta.appendChild(nav);
}

function injectSocialLinks(footerMeta: Element) {
  if (footerMeta.querySelector('[data-social-navigation="true"]')) return;

  const nav = document.createElement("nav");
  nav.className = "social-footer-links";
  nav.dataset.socialNavigation = "true";
  nav.setAttribute("aria-label", "Follow RTNW Hub");

  const label = document.createElement("span");
  label.className = "social-footer-label";
  label.textContent = "Follow RTNW Hub";
  nav.appendChild(label);
  for (const social of SOCIAL_LINKS) nav.appendChild(createSocialLink(social.label, social.href, social.mark));
  footerMeta.appendChild(nav);
}

function injectFooterLink(footerMeta: Element, href: string, label: string) {
  if (hasLink(footerMeta, href)) return;

  const link = createLink(href, label);
  const sitemapLink = footerMeta.querySelector('a[href="/sitemap.xml"]');
  const linkParent = sitemapLink?.parentElement;
  if (sitemapLink && linkParent) linkParent.insertBefore(link, sitemapLink);
  else footerMeta.appendChild(link);
}

function injectGuideNavigation() {
  document.querySelectorAll(".footer-meta").forEach((footerMeta) => {
    injectFooterLink(footerMeta, SEARCH_HREF, "Search");
    injectFooterLink(footerMeta, UPDATE_HREF, "Updates");
    injectFooterLink(footerMeta, GUIDE_HREF, "Guides");
    injectFooterLink(footerMeta, REDEEM_HREF, "Redeem Codes");
    injectTrustLinks(footerMeta);
    injectSocialLinks(footerMeta);
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

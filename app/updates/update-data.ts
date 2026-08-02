export type UpdateLink = {
  label: string;
  href: string;
};

export type SiteUpdate = {
  id: string;
  publishedAt: string;
  category: "Guides" | "Tools" | "SEO" | "Site";
  title: string;
  summary: string;
  links: UpdateLink[];
};

export const siteUpdates: SiteUpdate[] = [
  {
    id: "indexnow-rss-changelog",
    publishedAt: "2026-08-03T03:30:00+08:00",
    category: "SEO",
    title: "IndexNow, RSS, and the public changelog",
    summary:
      "Added a public updates page, an RSS feed for returning readers, and IndexNow support for notifying participating search engines about newly added or modified RTNW Hub URLs.",
    links: [
      { label: "Latest updates", href: "/updates/" },
      { label: "RSS feed", href: "/feed.xml" },
      { label: "SEO status", href: "/seo-status/" },
    ],
  },
  {
    id: "guide-category-pages",
    publishedAt: "2026-08-03T03:08:00+08:00",
    category: "Guides",
    title: "Four guide category landing pages published",
    summary:
      "The guide library now has dedicated paths for classes and builds, beginner guidance, progression and equipment, and monsters, cards, and farming.",
    links: [
      { label: "Guide library", href: "/guides/" },
      { label: "Classes and builds", href: "/guides/classes-builds/" },
      { label: "Farming guides", href: "/guides/monsters-cards-farming/" },
    ],
  },
  {
    id: "seo-maintenance-dashboard",
    publishedAt: "2026-08-03T02:54:00+08:00",
    category: "SEO",
    title: "SEO ownership and crawl diagnostics added",
    summary:
      "Added verification-ready Google and Bing metadata, a build-time crawl audit, and a no-index SEO maintenance dashboard for sitemap and metadata checks.",
    links: [
      { label: "SEO status", href: "/seo-status/" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "Robots policy", href: "/robots.txt" },
    ],
  },
  {
    id: "social-sharing-cards",
    publishedAt: "2026-08-03T02:32:00+08:00",
    category: "Site",
    title: "Route-specific social sharing cards launched",
    summary:
      "Guides and major indexes now publish branded 1200 by 630 Open Graph and Twitter cards instead of sharing one generic site image.",
    links: [
      { label: "Druid builds", href: "/guides/druid-builds/" },
      { label: "Class tier list", href: "/guides/class-tier-list/" },
      { label: "World Map", href: "/sea/maps/" },
    ],
  },
  {
    id: "tool-structured-data",
    publishedAt: "2026-08-03T02:05:00+08:00",
    category: "SEO",
    title: "Structured data expanded across all 13 tools",
    summary:
      "Every legacy planner, simulator, index, and map now emits self-contained WebApplication schema connected to the RTNW Hub publisher identity.",
    links: [
      { label: "All tools", href: "/#tools" },
      { label: "Skill Planner", href: "/sea/skill_planner/" },
      { label: "Equipment Index", href: "/sea/equipment/" },
    ],
  },
  {
    id: "cornerstone-guides-complete",
    publishedAt: "2026-08-03T01:20:00+08:00",
    category: "Guides",
    title: "Five cornerstone guides completed",
    summary:
      "Published the class tier list, beginner roadmap, three-form Druid builds, refining and equipment guide, and farming and card progression guide.",
    links: [
      { label: "Browse guides", href: "/guides/" },
      { label: "Beginner progression", href: "/guides/beginner-progression/" },
      { label: "Farming progression", href: "/guides/farming-card-progression/" },
    ],
  },
  {
    id: "trust-legal-foundation",
    publishedAt: "2026-08-03T00:35:00+08:00",
    category: "Site",
    title: "Trust, contact, and legal pages published",
    summary:
      "Added About, Contact, Privacy, Terms, and fan-site Disclaimer pages plus structured GitHub forms for corrections, bugs, requests, and sensitive contact matters.",
    links: [
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
      { label: "Privacy", href: "/privacy/" },
    ],
  },
];

export const latestUpdateDate = siteUpdates[0]?.publishedAt ?? "2026-08-03T00:00:00+08:00";

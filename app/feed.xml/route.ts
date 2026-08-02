import { latestUpdateDate, siteUpdates } from "../updates/update-data";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const origin = "https://rtnw.online";
  const items = siteUpdates
    .map((update) => {
      const primaryLink = update.links[0]?.href ?? "/updates/";
      const link = primaryLink.startsWith("http") ? primaryLink : `${origin}${primaryLink}`;
      const relatedLinks = update.links
        .map((item) => {
          const href = item.href.startsWith("http") ? item.href : `${origin}${item.href}`;
          return `${item.label}: ${href}`;
        })
        .join(" · ");
      const description = relatedLinks ? `${update.summary}\n\n${relatedLinks}` : update.summary;

      return [
        "    <item>",
        `      <title>${escapeXml(update.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="false">rtnw-update-${escapeXml(update.id)}</guid>`,
        `      <pubDate>${new Date(update.publishedAt).toUTCString()}</pubDate>`,
        `      <category>${escapeXml(update.category)}</category>`,
        `      <description>${escapeXml(description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    "    <title>RTNW Hub Latest Updates</title>",
    `    <link>${origin}/updates/</link>`,
    "    <description>New Ragnarok: The New World guides, tools, data, and RTNW Hub maintenance updates.</description>",
    "    <language>en</language>",
    `    <lastBuildDate>${new Date(latestUpdateDate).toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />`,
    "    <generator>RTNW Hub</generator>",
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

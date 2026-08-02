/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const DEPLOYMENT_VERSION = "2026-08-03-route-fallback-1";

const guideFallbacks: Record<
  string,
  { title: string; description: string; links: Array<[string, string]> }
> = {
  "/guides/": {
    title: "Ragnarok: The New World Guides",
    description: "Browse RTNW class, build, beginner, equipment, refining, farming, monster, and card guides.",
    links: [
      ["Classes and Builds", "/guides/classes-builds/"],
      ["Beginner Guides", "/guides/beginner-guides/"],
      ["Progression and Equipment", "/guides/progression-equipment/"],
      ["Monsters, Cards and Farming", "/guides/monsters-cards-farming/"],
      ["Class Tier List", "/guides/class-tier-list/"],
      ["Beginner Progression", "/guides/beginner-progression/"],
      ["Druid Builds", "/guides/druid-builds/"],
      ["Refining and Equipment", "/guides/refining-equipment/"],
      ["Farming and Card Progression", "/guides/farming-card-progression/"],
    ],
  },
  "/guides/classes-builds/": {
    title: "Classes and Builds",
    description: "Compare class roles and focused build paths before spending skill points and equipment resources.",
    links: [
      ["Class Tier List: F2P, PvE and PvP", "/guides/class-tier-list/"],
      ["Druid Builds: Werewolf, Wereraptor and Arcanist", "/guides/druid-builds/"],
      ["Open Skill Planner", "/sea/skill_planner/"],
    ],
  },
  "/guides/beginner-guides/": {
    title: "Beginner Guides",
    description: "Follow practical first-hours, first-week, F2P, and account-progression guidance.",
    links: [
      ["Beginner Progression Guide", "/guides/beginner-progression/"],
      ["Class Tier List", "/guides/class-tier-list/"],
      ["Open Events Reference", "/sea/events/"],
    ],
  },
  "/guides/progression-equipment/": {
    title: "Progression and Equipment",
    description: "Plan equipment choices, refine checkpoints, affixes, cards, and F2P resource priorities.",
    links: [
      ["Refining and Equipment Guide", "/guides/refining-equipment/"],
      ["Beginner Progression Guide", "/guides/beginner-progression/"],
      ["Open Refine Simulator", "/sea/refine/"],
    ],
  },
  "/guides/monsters-cards-farming/": {
    title: "Monsters, Cards and Farming",
    description: "Choose useful card targets, verify monster sources, and build efficient World Map farming routes.",
    links: [
      ["Farming and Card Progression Guide", "/guides/farming-card-progression/"],
      ["Open Card Index", "/sea/cards/"],
      ["Open Monster Index", "/sea/monster_album/"],
      ["Open World Map", "/sea/maps/?lang=en-US#map=101"],
    ],
  },
  "/guides/class-tier-list/": {
    title: "Class Tier List: F2P, PvE and PvP",
    description: "Compare all eight class families separately for budget progression, PvE, and PvP.",
    links: [
      ["Browse Classes and Builds", "/guides/classes-builds/"],
      ["Open Skill Planner", "/sea/skill_planner/"],
    ],
  },
  "/guides/beginner-progression/": {
    title: "Beginner Progression Guide",
    description: "A practical route for the first hours, first week, daily routines, and F2P resource decisions.",
    links: [
      ["Browse Beginner Guides", "/guides/beginner-guides/"],
      ["Open Events Reference", "/sea/events/"],
    ],
  },
  "/guides/druid-builds/": {
    title: "Druid Builds: Werewolf, Wereraptor and Arcanist",
    description: "Separate stat, skill, rotation, equipment, PvE, PvP, and F2P directions for all three Druid forms.",
    links: [
      ["Browse Classes and Builds", "/guides/classes-builds/"],
      ["Open Skill Planner", "/sea/skill_planner/"],
    ],
  },
  "/guides/refining-equipment/": {
    title: "Refining and Equipment Upgrade Guide",
    description: "Choose the right base item, priority slot, material band, and refine checkpoint before investing.",
    links: [
      ["Browse Progression and Equipment", "/guides/progression-equipment/"],
      ["Open Refine Simulator", "/sea/refine/"],
      ["Open Equipment Index", "/sea/equipment/"],
    ],
  },
  "/guides/farming-card-progression/": {
    title: "Farming and Card Progression Guide",
    description: "Use the Card Index, Monster Index, and World Map to choose targets and measure farming efficiency.",
    links: [
      ["Browse Monsters, Cards and Farming", "/guides/monsters-cards-farming/"],
      ["Open Card Index", "/sea/cards/"],
      ["Open Monster Index", "/sea/monster_album/"],
    ],
  },
};

function withPerformanceHeaders(request: Request, response: Response): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  const url = new URL(request.url);
  const headers = new Headers(response.headers);
  const extension = url.pathname.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() || "";
  const versioned = url.searchParams.has("v") || /\.[a-f0-9]{8,}\./i.test(url.pathname);
  const staticAsset = /^(?:css|js|mjs|json|xml|txt|webp|png|jpe?g|gif|ico|woff2?)$/.test(extension);

  if (staticAsset) {
    headers.set("Cache-Control", versioned
      ? "public, max-age=31536000, immutable"
      : extension === "json"
        ? "public, max-age=3600, stale-while-revalidate=86400"
        : "public, max-age=3600, stale-while-revalidate=86400");
  } else if ((headers.get("content-type") || "").includes("text/html")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-RTNW-Deployment", DEPLOYMENT_VERSION);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function normalizedPagePath(pathname: string): string {
  if (pathname === "/guides") return "/guides/";
  if (pathname.startsWith("/guides/") && !pathname.endsWith("/")) return `${pathname}/`;
  if (pathname === "/updates") return "/updates/";
  if (pathname === "/seo-status") return "/seo-status/";
  return pathname;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fallbackPage(
  request: Request,
  options: {
    title: string;
    description: string;
    canonicalPath: string;
    links: Array<[string, string]>;
    noindex?: boolean;
  },
): Response {
  const origin = new URL(request.url).origin;
  const links = options.links
    .map(([label, href]) => `<a href="${escapeHtml(href)}">${escapeHtml(label)} <span aria-hidden="true">→</span></a>`)
    .join("");
  const robots = options.noindex ? '<meta name="robots" content="noindex,nofollow">' : '<meta name="robots" content="index,follow">';
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(options.title)} | RTNW Hub</title>
<meta name="description" content="${escapeHtml(options.description)}">
${robots}
<link rel="canonical" href="${origin}${escapeHtml(options.canonicalPath)}">
<style>
:root{font-family:Inter,ui-sans-serif,system-ui,sans-serif;color:#173f39;background:#f7f3e9}*{box-sizing:border-box}body{margin:0}header,main,footer{width:min(1040px,calc(100% - 32px));margin:auto}header{display:flex;align-items:center;justify-content:space-between;padding:22px 0;border-bottom:1px solid #d8cfb9}header a,footer a{color:#164e45;font-weight:800;text-decoration:none}.brand{font-family:Georgia,serif;font-size:22px}main{padding:72px 0 88px}.kicker{color:#9a6b12;font-size:12px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}h1{max-width:800px;margin:12px 0 18px;font:700 clamp(38px,7vw,72px)/1 Georgia,serif;color:#0b342f}p{max-width:760px;font-size:17px;line-height:1.75;color:#526a63}.links{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;margin-top:34px}.links a{display:flex;justify-content:space-between;gap:16px;padding:18px;color:#164e45;background:#fff;border:1px solid #d8cfb9;border-radius:12px;text-decoration:none;font-weight:850}.links a:hover{border-color:#d6a94f;transform:translateY(-1px)}.notice{margin-top:38px;padding:18px;border-left:4px solid #d6a94f;background:#fff}.notice strong{display:block;margin-bottom:5px;color:#0b342f}footer{display:flex;justify-content:space-between;gap:20px;padding:24px 0 40px;border-top:1px solid #d8cfb9;font-size:13px}@media(max-width:620px){header,footer{align-items:flex-start;flex-direction:column}main{padding-top:48px}}
</style>
</head>
<body>
<header><a class="brand" href="/">✦ RTNW Hub</a><nav><a href="/guides/">Guides</a> · <a href="/updates/">Updates</a></nav></header>
<main>
<p class="kicker">Ragnarok: The New World</p>
<h1>${escapeHtml(options.title)}</h1>
<p>${escapeHtml(options.description)}</p>
<div class="links">${links}</div>
<div class="notice"><strong>Emergency route fallback</strong>This page is served only when the primary application route is unavailable. The linked tools and content remain accessible while the latest Sites worker is being published.</div>
</main>
<footer><span>Independent fan-made game-data toolkit.</span><a href="/">Return home</a></footer>
</body>
</html>`;
  return new Response(request.method === "HEAD" ? null : html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

function updatesFallback(request: Request): Response {
  return fallbackPage(request, {
    title: "Latest Updates and Changelog",
    description: "Review newly published guides, guide categories, structured data, social sharing, SEO diagnostics, RSS, and IndexNow integration.",
    canonicalPath: "/updates/",
    links: [
      ["Browse all guides", "/guides/"],
      ["RSS feed", "/feed.xml"],
      ["SEO status", "/seo-status/"],
      ["Sitemap", "/sitemap.xml"],
    ],
  });
}

function seoStatusFallback(request: Request): Response {
  return fallbackPage(request, {
    title: "SEO Maintenance Status",
    description: "Open the RTNW sitemap, robots policy, SEO audit, IndexNow key, and search-engine maintenance resources.",
    canonicalPath: "/seo-status/",
    noindex: true,
    links: [
      ["Sitemap", "/sitemap.xml"],
      ["Robots policy", "/robots.txt"],
      ["Raw SEO audit", "/seo-audit.json"],
      ["IndexNow verification key", "/4cc78cf9b31d099f4de23a0874b08a5e.txt"],
    ],
  });
}

function rssFallback(request: Request): Response {
  const origin = new URL(request.url).origin;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>RTNW Hub Latest Updates</title>
<link>${origin}/updates/</link>
<description>New Ragnarok: The New World guides, tools, data, and RTNW Hub maintenance updates.</description>
<language>en</language>
<atom:link href="${origin}/feed.xml" rel="self" type="application/rss+xml" />
<item><title>IndexNow, RSS, and public changelog</title><link>${origin}/updates/</link><guid isPermaLink="false">rtnw-indexnow-rss-changelog</guid><pubDate>Sun, 02 Aug 2026 19:30:00 GMT</pubDate><description>Added the public updates page, RSS feed, and IndexNow support.</description></item>
<item><title>Guide category pages and five cornerstone guides</title><link>${origin}/guides/</link><guid isPermaLink="false">rtnw-guide-library</guid><pubDate>Sun, 02 Aug 2026 19:08:00 GMT</pubDate><description>Published dedicated guide categories and five connected guides.</description></item>
</channel>
</rss>\n`;
  return new Response(request.method === "HEAD" ? null : xml, {
    status: 200,
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}

async function assetResponse(request: Request, env: Env, path: string): Promise<Response> {
  const assetRequest = new Request(new URL(path, request.url), {
    method: request.method,
    headers: request.headers,
  });
  return env.ASSETS.fetch(assetRequest);
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withPerformanceHeaders(request, response);
    }

    if (url.pathname === "/robot.txt") {
      return Response.redirect(new URL("/robots.txt", request.url), 308);
    }

    if (
      url.pathname === "/robots.txt" ||
      url.pathname === "/sitemap.xml" ||
      url.pathname === "/seo-audit.json" ||
      url.pathname === "/deployment-version.txt" ||
      url.pathname === "/4cc78cf9b31d099f4de23a0874b08a5e.txt"
    ) {
      return withPerformanceHeaders(request, await assetResponse(request, env, url.pathname));
    }

    const response = await handler.fetch(request, env, ctx);
    if (response.status !== 404 || (request.method !== "GET" && request.method !== "HEAD")) {
      return withPerformanceHeaders(request, response);
    }

    const path = normalizedPagePath(url.pathname);
    const guide = guideFallbacks[path];
    if (guide) {
      return withPerformanceHeaders(
        request,
        fallbackPage(request, {
          ...guide,
          canonicalPath: path,
        }),
      );
    }
    if (path === "/updates/") return withPerformanceHeaders(request, updatesFallback(request));
    if (path === "/seo-status/") return withPerformanceHeaders(request, seoStatusFallback(request));
    if (path === "/feed.xml") return withPerformanceHeaders(request, rssFallback(request));

    return withPerformanceHeaders(request, response);
  },
};

export default worker;

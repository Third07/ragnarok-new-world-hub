/** Cloudflare Worker entry point for the Vinext application. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
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

const guideFallbacks: Record<
  string,
  { title: string; description: string; links: Array<[string, string]> }
> = {
  "/search/": {
    title: "Search RTNW Guides and Game Data",
    description: "Search guides, tools, monsters, cards, and equipment from one RTNW Hub page.",
    links: [
      ["Open Guide Library", "/guides/"],
      ["Open Monster Database", "/sea/monster_album/"],
      ["Open Card Database", "/sea/cards/"],
      ["Open Equipment Database", "/sea/equipment/"],
    ],
  },
  "/updates/": {
    title: "RTNW Hub Updates",
    description: "Review newly published guides, tools, database features, and recently updated site resources.",
    links: [
      ["Browse All Guides", "/guides/"],
      ["Open Unified Search", "/search/"],
      ["Open Events Reference", "/sea/events/"],
      ["Open Redeem Codes", "/guides/redeem-codes/"],
    ],
  },
  "/guides/": {
    title: "Ragnarok: The New World Guides",
    description: "Browse RTNW class, build, beginner, equipment, refining, farming, monster, card, PC, emulator, cloud, and top-up guides.",
    links: [
      ["Classes and Builds", "/guides/classes-builds/"],
      ["Beginner Guides", "/guides/beginner-guides/"],
      ["Progression and Equipment", "/guides/progression-equipment/"],
      ["Monsters, Cards and Farming", "/guides/monsters-cards-farming/"],
      ["PC and Setup Guides", "/guides/technical/"],
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
      ["Open Farming Target Finder", "/tools/farming-target-finder/"],
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
    description: "Use the Card Index, Monster Index, World Map, and Farming Target Finder to choose targets and build a repeatable route.",
    links: [
      ["Browse Monsters, Cards and Farming", "/guides/monsters-cards-farming/"],
      ["Open Farming Target Finder", "/tools/farming-target-finder/"],
      ["Open Card Index", "/sea/cards/"],
      ["Open Monster Index", "/sea/monster_album/"],
    ],
  },
  "/guides/technical/": {
    title: "PC, Emulator, Cloud Gaming and Top-Up Guides",
    description: "Install RTNW on PC, tune an emulator, compare cloud play, and protect your account while topping up.",
    links: [
      ["Play on PC", "/guides/play-on-pc/"],
      ["Emulator Settings", "/guides/emulator-settings/"],
      ["Safe Top-Up Guide", "/guides/top-up-safely/"],
      ["Cloud Gaming Guide", "/guides/cloud-gaming/"],
    ],
  },
  "/guides/play-on-pc/": {
    title: "How to Play Ragnarok: The New World on PC",
    description: "Compare the official PC route, Android emulators, and cloud alternatives with installation and account guidance.",
    links: [
      ["PC Setup Checker", "/tools/pc-setup-checker/"],
      ["Emulator Settings", "/guides/emulator-settings/"],
      ["Cloud Gaming Guide", "/guides/cloud-gaming/"],
    ],
  },
  "/guides/emulator-settings/": {
    title: "Best Emulator Settings for Ragnarok: The New World",
    description: "Configure virtualization, CPU, RAM, renderer, FPS, controls, and common crash fixes.",
    links: [
      ["PC Setup Checker", "/tools/pc-setup-checker/"],
      ["PC Installation Guide", "/guides/play-on-pc/"],
      ["Cloud Gaming Alternative", "/guides/cloud-gaming/"],
    ],
  },
  "/guides/top-up-safely/": {
    title: "How to Top Up Ragnarok: The New World Safely",
    description: "Check payment routes, account details, final fees, receipts, and scam warning signs before paying.",
    links: [
      ["Top-Up Cost Calculator", "/tools/top-up-calculator/"],
      ["Shop Catalogue", "/sea/shop/"],
      ["Beginner Progression", "/guides/beginner-progression/"],
    ],
  },
  "/guides/cloud-gaming/": {
    title: "Ragnarok: The New World Cloud Gaming Guide",
    description: "Compare cloud Android, catalogue streaming, and remote access to your own PC with account-safety guidance.",
    links: [
      ["PC Setup Checker", "/tools/pc-setup-checker/"],
      ["PC Installation Guide", "/guides/play-on-pc/"],
      ["Emulator Settings", "/guides/emulator-settings/"],
    ],
  },
  "/tools/farming-target-finder/": {
    title: "Ragnarok: The New World Farming Target Finder",
    description: "Filter the committed monster index by level, type, race, element, size, and map availability.",
    links: [
      ["Monster Database", "/sea/monster_album/"],
      ["Card Database", "/sea/cards/"],
      ["World Map", "/sea/maps/?lang=en-US#map=101"],
      ["Farming Guide", "/guides/farming-card-progression/"],
    ],
  },
  "/tools/pc-setup-checker/": {
    title: "Ragnarok: The New World PC Setup Checker",
    description: "Compare Steam, Android emulator, and cloud routes using RAM, storage, virtualization, graphics, and play style.",
    links: [
      ["PC Installation Guide", "/guides/play-on-pc/"],
      ["Emulator Settings", "/guides/emulator-settings/"],
      ["Cloud Gaming Guide", "/guides/cloud-gaming/"],
    ],
  },
  "/tools/top-up-calculator/": {
    title: "Ragnarok: The New World Top-Up Cost Calculator",
    description: "Calculate quantity, discounts, service fees, fixed charges, total checkout cost, and cost per package.",
    links: [
      ["Safe Top-Up Guide", "/guides/top-up-safely/"],
      ["Shop Catalogue", "/sea/shop/"],
      ["Refining Guide", "/guides/refining-equipment/"],
    ],
  },
};

const trailingSlashPages = new Set([
  ...Object.keys(guideFallbacks),
  "/guides/redfinger-cloud-phone/",
  "/database/wardrobe/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/terms/",
  "/disclaimer/",
  "/seo-status/",
]);

function withPerformanceHeaders(request: Request, response: Response): Response {
  if (request.method !== "GET" && request.method !== "HEAD") return response;
  const url = new URL(request.url);
  const headers = new Headers(response.headers);
  const extension = url.pathname.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() || "";
  const versioned = url.searchParams.has("v") || /\.[a-f0-9]{8,}\./i.test(url.pathname);
  const staticAsset = /^(?:css|js|mjs|json|xml|txt|webp|png|jpe?g|gif|ico|woff2?)$/.test(extension);

  if (staticAsset) {
    headers.set(
      "Cache-Control",
      versioned
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600, stale-while-revalidate=86400",
    );
  } else if ((headers.get("content-type") || "").includes("text/html")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function normalizedPagePath(pathname: string): string {
  if (pathname !== "/" && !pathname.endsWith("/") && trailingSlashPages.has(`${pathname}/`)) {
    return `${pathname}/`;
  }
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
    .map(
      ([label, href]) =>
        `<a href="${escapeHtml(href)}">${escapeHtml(label)} <span aria-hidden="true">→</span></a>`,
    )
    .join("");
  const robots = options.noindex
    ? '<meta name="robots" content="noindex,nofollow">'
    : '<meta name="robots" content="index,follow">';
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
<header><a class="brand" href="/">✦ RTNW Hub</a><nav><a href="/">Home</a> · <a href="/search/">Search</a> · <a href="/guides/">Guides</a></nav></header>
<main>
<p class="kicker">Ragnarok: The New World</p>
<h1>${escapeHtml(options.title)}</h1>
<p>${escapeHtml(options.description)}</p>
<div class="links">${links}</div>
<div class="notice"><strong>Emergency route fallback</strong>This page is served only when the primary application route is unavailable. The linked tools and content remain accessible while the latest Cloudflare Worker is being published.</div>
</main>
<footer><span>Independent fan-made game-data toolkit.</span><a href="/">Return home</a></footer>
</body>
</html>`;

  return new Response(request.method === "HEAD" ? null : html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
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
      ["Content sitemap", "/content-sitemap.xml"],
      ["Robots policy", "/robots.txt"],
      ["Raw SEO audit", "/seo-audit.json"],
      ["IndexNow verification key", "/4cc78cf9b31d099f4de23a0874b08a5e.txt"],
    ],
  });
}

async function assetResponse(request: Request, env: Env, path: string): Promise<Response> {
  const assetRequest = new Request(new URL(path, request.url), {
    method: request.method,
    headers: request.headers,
  });
  return env.ASSETS.fetch(assetRequest);
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (
      url.protocol !== "https:" ||
      url.hostname === "www.rtnw.online" ||
      url.hostname.endsWith(".workers.dev")
    ) {
      const canonicalUrl = new URL(`${url.pathname}${url.search}`, "https://rtnw.online");
      return Response.redirect(canonicalUrl, 308);
    }

    if (
      url.pathname !== "/" &&
      !url.pathname.endsWith("/") &&
      trailingSlashPages.has(`${url.pathname}/`)
    ) {
      const slashUrl = new URL(request.url);
      slashUrl.pathname = `${url.pathname}/`;
      return Response.redirect(slashUrl, 308);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(
        request,
        {
          fetchAsset: (path) =>
            env.ASSETS.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES.input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths,
      );
      return withPerformanceHeaders(request, response);
    }

    if (url.pathname === "/robot.txt") {
      return Response.redirect(new URL("/robots.txt", request.url), 308);
    }

    if (
      url.pathname === "/robots.txt" ||
      url.pathname === "/sitemap.xml" ||
      url.pathname === "/content-sitemap.xml" ||
      url.pathname === "/seo-audit.json" ||
      url.pathname === "/4cc78cf9b31d099f4de23a0874b08a5e.txt"
    ) {
      return withPerformanceHeaders(
        request,
        await assetResponse(request, env, url.pathname),
      );
    }

    const response = await handler.fetch(request, env, ctx);
    if (
      response.status !== 404 ||
      (request.method !== "GET" && request.method !== "HEAD")
    ) {
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
    if (path === "/seo-status/") {
      return withPerformanceHeaders(request, seoStatusFallback(request));
    }

    return withPerformanceHeaders(request, response);
  },
};

export default worker;

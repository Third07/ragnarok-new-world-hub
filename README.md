# RTNW Hub

RTNW Hub is an independent fan-made Ragnarok: The New World guide, planner, simulator, map, and game-data website.

## Stack

- Next.js App Router API surface through Vinext
- React 19
- Vite 8
- Cloudflare Workers
- Cloudflare Vite plugin
- Static game-data tools under `public/sea/`

The production source is the `main` branch of this GitHub repository. The application is built and deployed directly to Cloudflare Workers. OpenAI Sites is not part of the deployment path.

## Requirements

- Node.js `>=22.13.0`
- npm
- A Cloudflare account with Workers enabled
- Wrangler authentication for manual deployment, or a Git-connected Cloudflare Worker project

## Local development

```bash
npm ci
npm run dev
```

Useful commands:

```bash
npm run build             # Generate data and build the Vinext Cloudflare Worker
npm run preview           # Build and preview in the Cloudflare Workers runtime
npm test                  # Build and run repository integrity tests
npm run lint              # Run ESLint
npm run seo:audit         # Generate public/seo-audit.json
npm run indexnow:verify   # Verify the live public IndexNow key
npm run indexnow:dry-run  # Print the bulk submission without sending it
```

## Cloudflare configuration

The root `wrangler.jsonc` is the source configuration for the Worker. It defines:

- `worker/index.ts` as the Worker entry point
- `ASSETS` for Vite-generated static assets
- `IMAGES` for image optimization
- `nodejs_compat` for the Vinext runtime

The Cloudflare Vite plugin creates a deployment-ready output Wrangler configuration during `vite build`.

## Deployment

### Manual deployment

Authenticate Wrangler once, then run:

```bash
npm run deploy:full
```

This builds the site, deploys the generated Worker and assets, then sends a non-blocking IndexNow notification.

### Cloudflare Git integration

Connect this repository to the existing Cloudflare Worker and use:

- Production branch: `main`
- Root directory: `/`
- Install command: `npm ci`
- Build command: `npm run build`
- Deploy command: `npm run deploy`

The build stage generates the Worker. The deploy stage publishes it and then runs the IndexNow client. Keep the custom domain `rtnw.online` attached to this Worker in the Cloudflare dashboard.

## Deployment verification

After deployment, open:

```text
https://rtnw.online/deployment-version.txt
```

Expected value:

```text
version=2026-08-03-indexnow-1
```

Then verify these routes:

```text
/guides/
/seo-status/
/robots.txt
/sitemap.xml
/4cc78cf9b31d099f4de23a0874b08a5e.txt
```

The retired `/updates/` and `/feed.xml` routes should return 404.

## IndexNow

The public key is hosted at:

```text
https://rtnw.online/4cc78cf9b31d099f4de23a0874b08a5e.txt
```

It must display only:

```text
4cc78cf9b31d099f4de23a0874b08a5e
```

Commands:

```bash
npm run indexnow:verify       # Check the live key file
npm run indexnow:submit       # Submit sitemap URLs modified today
npm run indexnow:submit:all   # One-time submission of the complete sitemap
npm run indexnow:dry-run      # Inspect the complete payload without sending it
```

A successful submission prints HTTP 200 or HTTP 202. Bing Webmaster Tools provides the authoritative received-URL view under its IndexNow section.

## Environment variables

Configure these in the Cloudflare Worker settings when available:

```text
GOOGLE_SITE_VERIFICATION
BING_SITE_VERIFICATION
```

Optional IndexNow controls:

```text
INDEXNOW_AUTO_SUBMIT
INDEXNOW_ENDPOINT
INDEXNOW_KEY
INDEXNOW_KEY_LOCATION
```

Do not commit API tokens or Cloudflare credentials. Use Cloudflare secrets or deployment environment variables.

## Project structure

```text
app/                 Next/Vinext pages and route handlers
public/sea/          Legacy planners, indexes, maps and simulators
public/shared/       Shared browser scripts and styles
worker/index.ts      Cloudflare Worker entry point and route fallbacks
scripts/             Data, SEO, social-card and IndexNow maintenance scripts
tests/               Build and SEO integrity tests
wrangler.jsonc       Cloudflare Worker source configuration
vite.config.ts       Vinext and Cloudflare Vite configuration
```

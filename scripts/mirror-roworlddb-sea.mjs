#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const DEFAULT_ORIGIN = 'https://www.roworlddb.com';
const DEFAULT_OUTPUT = path.resolve('.roworlddb-mirror/sea');
const DEFAULT_LOCALES = ['en-US', 'zh-CN', 'th-TH', 'id-ID'];
const DEFAULT_TOOLS = [
  'skill_planner',
  'rune_planner',
  'affix_planner',
  'apocalypse_planner',
  'shop',
  'equipment',
  'cards',
  'monster_album',
  'maps',
  'events',
  'study',
  'pet',
  'refine',
];

const TOOL_ALIASES = {
  'skill-simulator': 'skill_planner',
  'rune-simulator': 'rune_planner',
  'affix-simulator': 'affix_planner',
  'apocalypse-simulator': 'apocalypse_planner',
  'card-simulator': 'cards',
  'monster-album': 'monster_album',
  'map-simulator': 'maps',
  'refine-simulator': 'refine',
};

const SEED_PATHS = {
  skill_planner: ['/sea/skill-simulator/data/skills_index_{locale}.json'],
  rune_planner: ['/sea/skill-simulator/data/engine_runes_{locale}.json'],
  affix_planner: ['/sea/affix-simulator/data/stunt_skill_library_{locale}.json'],
  shop: ['/sea/shop/data/shop_{locale}.json'],
  equipment: ['/sea/equipment/data/equipment_{locale}.json'],
  monster_album: ['/sea/monster-album/data/monster_album_{locale}.json'],
  maps: ['/sea/map-simulator/data/map_index_{locale}.json'],
};

function parseArgs(argv) {
  const args = {
    origin: DEFAULT_ORIGIN,
    output: DEFAULT_OUTPUT,
    locales: [...DEFAULT_LOCALES],
    tools: [...DEFAULT_TOOLS],
    timeoutMs: 30_000,
    maxFiles: 20_000,
    concurrency: 6,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--origin') args.origin = String(argv[++index] || '').replace(/\/+$/, '');
    else if (value === '--output') args.output = path.resolve(argv[++index] || '');
    else if (value === '--locales') args.locales = String(argv[++index] || '').split(',').map((entry) => entry.trim()).filter(Boolean);
    else if (value === '--tools') args.tools = String(argv[++index] || '').split(',').map((entry) => entry.trim()).filter(Boolean);
    else if (value === '--timeout') args.timeoutMs = Number(argv[++index] || 30_000);
    else if (value === '--max-files') args.maxFiles = Number(argv[++index] || 20_000);
    else if (value === '--concurrency') args.concurrency = Number(argv[++index] || 6);
    else if (value === '--help' || value === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${value}`);
  }

  args.tools = args.tools.map((tool) => TOOL_ALIASES[tool] || tool);
  for (const locale of args.locales) {
    if (!DEFAULT_LOCALES.includes(locale)) throw new Error(`Unsupported SEA locale: ${locale}`);
  }
  for (const tool of args.tools) {
    if (!DEFAULT_TOOLS.includes(tool)) throw new Error(`Unknown tool: ${tool}`);
  }
  if (!Number.isFinite(args.timeoutMs) || args.timeoutMs < 1_000) throw new Error('--timeout must be at least 1000ms');
  if (!Number.isInteger(args.maxFiles) || args.maxFiles < 100) throw new Error('--max-files must be at least 100');
  if (!Number.isInteger(args.concurrency) || args.concurrency < 1 || args.concurrency > 20) throw new Error('--concurrency must be between 1 and 20');
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mirror-roworlddb-sea.mjs [options]\n\nOptions:\n  --output <dir>          Mirror destination\n  --origin <url>          RoworldDB origin (default: ${DEFAULT_ORIGIN})\n  --locales <csv>         SEA locales (default: ${DEFAULT_LOCALES.join(',')})\n  --tools <csv>           Tool slugs, or all defaults\n  --timeout <ms>          Per-request timeout (default: 30000)\n  --concurrency <n>       Concurrent requests, 1-20 (default: 6)\n  --max-files <n>         Safety limit (default: 20000)\n  --help                  Show this message\n\nThis command is read-only. It mirrors public HTML, JavaScript, and JSON data,\ncreates checksums and coverage reports, and never changes RTNW Hub production data.`);
}

function sha256(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function sanitizeSegment(value) {
  return value.replace(/[^a-zA-Z0-9._-]+/g, '_').replace(/^_+|_+$/g, '') || '_';
}

function filePathForUrl(outputDir, url, kind, pageContext = null) {
  if (kind === 'page' && pageContext) {
    return path.join(outputDir, 'pages', pageContext.tool, pageContext.locale, 'index.html');
  }
  const segments = decodeURIComponent(url.pathname).split('/').filter(Boolean).map(sanitizeSegment);
  let filename = segments.pop() || 'index';
  if (!path.extname(filename)) filename += kind === 'script' ? '.js' : kind === 'json' ? '.json' : '.txt';
  if (url.search && kind !== 'json') filename = `${path.parse(filename).name}__${sha256(url.search).slice(0, 8)}${path.extname(filename)}`;
  return path.join(outputDir, kind === 'script' ? 'scripts' : kind === 'json' ? 'data' : 'other', ...segments, filename);
}

async function fetchBuffer(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      headers: {
        accept: 'text/html,application/json,text/javascript,application/javascript;q=0.9,*/*;q=0.1',
        'accept-language': 'en-US,en;q=0.8',
        'user-agent': 'RTNW-Hub public data mirror/1.0 (+https://rtnw.online/)',
      },
      redirect: 'follow',
      signal: controller.signal,
    });
    return { response, buffer: Buffer.from(await response.arrayBuffer()) };
  } finally {
    clearTimeout(timer);
  }
}

function canonicalUrl(value, baseUrl, origin) {
  if (!value) return null;
  const cleaned = String(value)
    .replace(/\\\//g, '/')
    .replace(/\\u002f/gi, '/')
    .replace(/&amp;/g, '&')
    .trim();
  if (!cleaned || cleaned.startsWith('data:') || cleaned.startsWith('blob:')) return null;
  try {
    const url = new URL(cleaned, baseUrl);
    if (url.origin !== origin) return null;
    url.hash = '';
    return url;
  } catch {
    return null;
  }
}

function expandLocaleTemplate(raw, locales) {
  const candidates = new Set([raw]);
  const placeholders = [
    '${ACTIVE_LOCALE}', '${locale}', '${LOCALE}', '${lang}', '${language}',
    '{locale}', '{lang}', '__LOCALE__', '%LOCALE%',
  ];
  for (const placeholder of placeholders) {
    if (!raw.includes(placeholder)) continue;
    candidates.delete(raw);
    for (const locale of locales) candidates.add(raw.split(placeholder).join(locale));
  }
  if (/_en-US(?=\.|\/|$)/.test(raw)) {
    for (const locale of locales) candidates.add(raw.replace(/_en-US(?=\.|\/|$)/g, `_${locale}`));
  }
  if (/\/en-US(?=\/|$)/.test(raw)) {
    for (const locale of locales) candidates.add(raw.replace(/\/en-US(?=\/|$)/g, `/${locale}`));
  }
  return [...candidates];
}

function extractScriptUrls(html, baseUrl, origin) {
  const urls = [];
  const regex = /<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
  for (const match of html.matchAll(regex)) {
    const url = canonicalUrl(match[1], baseUrl, origin);
    if (url) urls.push(url);
  }
  return urls;
}

function extractJsonCandidates(text, baseUrl, origin, locales) {
  const raw = new Set();
  const patterns = [
    /https?:\\?\/\\?\/[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%{}$-]+?\.json(?:\?[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%{}$-]*)?/gi,
    /\/[A-Za-z0-9._~/${}-]+?\.json(?:\?[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%{}$-]*)?/gi,
    /(?:\.\.\/|\.\/)[A-Za-z0-9._~/${}-]+?\.json(?:\?[A-Za-z0-9._~:/?#[\]@!$&'()*+,;=%{}$-]*)?/gi,
  ];
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) raw.add(match[0]);
  }

  const urls = [];
  for (const value of raw) {
    for (const expanded of expandLocaleTemplate(value, locales)) {
      if (expanded.includes('${') || expanded.includes('{locale}') || expanded.includes('{lang}')) continue;
      const url = canonicalUrl(expanded, baseUrl, origin);
      if (url) urls.push(url);
    }
  }
  return urls;
}

function walkJsonStrings(value, visit) {
  if (typeof value === 'string') visit(value);
  else if (Array.isArray(value)) value.forEach((entry) => walkJsonStrings(entry, visit));
  else if (value && typeof value === 'object') Object.values(value).forEach((entry) => walkJsonStrings(entry, visit));
}

function classifyContent(url, contentType) {
  const pathname = url.pathname.toLowerCase();
  const type = String(contentType || '').toLowerCase();
  if (pathname.endsWith('.json') || type.includes('application/json')) return 'json';
  if (pathname.endsWith('.js') || type.includes('javascript')) return 'script';
  if (pathname.endsWith('.html') || type.includes('text/html')) return 'page';
  return 'other';
}

function inferTool(url, fallback = '') {
  const segment = url.pathname.match(/^\/sea\/([^/]+)/)?.[1] || '';
  return TOOL_ALIASES[segment] || segment || fallback;
}

function enqueueFactory({ queue, queued, origin, maxFiles }) {
  return function enqueue(url, meta = {}) {
    const key = url.href;
    if (queued.has(key)) return false;
    if (queued.size >= maxFiles) throw new Error(`Safety limit reached: ${maxFiles} queued URLs`);
    queued.add(key);
    queue.push({ url, ...meta });
    return true;
  };
}

function addJsonDiscoveries({ parsed, text, url, origin, locales, enqueue, tool, locale }) {
  for (const candidate of extractJsonCandidates(text, url, origin, locales)) {
    enqueue(candidate, { kind: 'json', discoveredBy: url.href, tool: inferTool(candidate, tool), locale });
  }
  if (!parsed) return;
  walkJsonStrings(parsed, (value) => {
    if (!/\.json(?:\?|$)/i.test(value)) return;
    for (const expanded of expandLocaleTemplate(value, locales)) {
      const candidate = canonicalUrl(expanded, url, origin);
      if (candidate) enqueue(candidate, { kind: 'json', discoveredBy: url.href, tool: inferTool(candidate, tool), locale });
    }
  });

  const jobs = parsed?.jobs;
  if (jobs && typeof jobs === 'object' && !Array.isArray(jobs) && /skills_index_[^/]+\.json$/i.test(url.pathname)) {
    const indexLocale = url.pathname.match(/skills_index_([^/]+)\.json$/i)?.[1] || locale;
    for (const [id, job] of Object.entries(jobs)) {
      if (!job || typeof job !== 'object') continue;
      if (!(job.has_skills || job.has_unique_skills || job.has_traits)) continue;
      enqueue(new URL(`jobs_${indexLocale}/${id}.json`, url), {
        kind: 'json',
        discoveredBy: url.href,
        tool: 'skill_planner',
        locale: indexLocale,
      });
    }
  }
}

async function writeArtifact(outputPath, buffer) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buffer);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return printHelp();

  const origin = new URL(args.origin).origin;
  await mkdir(args.output, { recursive: true });

  const queue = [];
  const queued = new Set();
  const processed = new Set();
  const enqueue = enqueueFactory({ queue, queued, origin, maxFiles: args.maxFiles });
  const manifest = {
    schemaVersion: 1,
    source: 'RoworldDB SEA public pages and data',
    origin,
    startedAt: new Date().toISOString(),
    locales: args.locales,
    tools: args.tools,
    files: [],
    failures: [],
    coverage: {},
  };

  for (const tool of args.tools) {
    manifest.coverage[tool] = Object.fromEntries(args.locales.map((locale) => [locale, { pages: 0, scripts: 0, json: 0, bytes: 0, failures: 0 }]));
    for (const locale of args.locales) {
      enqueue(new URL(`/sea/${tool}/?lang=${encodeURIComponent(locale)}`, origin), {
        kind: 'page',
        tool,
        locale,
        pageContext: { tool, locale },
      });
      for (const template of SEED_PATHS[tool] || []) {
        enqueue(new URL(template.replace('{locale}', locale), origin), {
          kind: 'json',
          tool,
          locale,
          discoveredBy: 'seed',
        });
      }
    }
  }

  let active = 0;
  let completed = 0;
  let resolveDrain;
  let rejectDrain;
  const drain = new Promise((resolve, reject) => {
    resolveDrain = resolve;
    rejectDrain = reject;
  });

  const updateCoverage = (tool, locale, kind, bytes = 0, failed = false) => {
    const entry = manifest.coverage[tool]?.[locale];
    if (!entry) return;
    if (failed) entry.failures += 1;
    else {
      if (kind === 'page') entry.pages += 1;
      else if (kind === 'script') entry.scripts += 1;
      else if (kind === 'json') entry.json += 1;
      entry.bytes += bytes;
    }
  };

  const runOne = async (task) => {
    const requestedUrl = task.url.href;
    try {
      const { response, buffer } = await fetchBuffer(task.url, args.timeoutMs);
      const finalUrl = new URL(response.url || requestedUrl);
      const contentType = response.headers.get('content-type') || '';
      const kind = task.kind || classifyContent(finalUrl, contentType);
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

      const outputPath = filePathForUrl(args.output, finalUrl, kind, task.pageContext);
      await writeArtifact(outputPath, buffer);
      const tool = task.tool || inferTool(finalUrl);
      const locale = task.locale || '';
      manifest.files.push({
        requestedUrl,
        finalUrl: finalUrl.href,
        path: path.relative(args.output, outputPath).split(path.sep).join('/'),
        kind,
        tool,
        locale,
        discoveredBy: task.discoveredBy || null,
        bytes: buffer.length,
        sha256: sha256(buffer),
        contentType,
      });
      updateCoverage(tool, locale, kind, buffer.length, false);

      if (kind === 'page' || kind === 'script' || kind === 'json') {
        const text = buffer.toString('utf8');
        if (kind === 'page') {
          for (const scriptUrl of extractScriptUrls(text, finalUrl, origin)) {
            enqueue(scriptUrl, { kind: 'script', discoveredBy: finalUrl.href, tool, locale });
          }
        }
        if (kind === 'page' || kind === 'script') {
          for (const candidate of extractJsonCandidates(text, finalUrl, origin, args.locales)) {
            enqueue(candidate, { kind: 'json', discoveredBy: finalUrl.href, tool: inferTool(candidate, tool), locale });
          }
        } else {
          let parsed = null;
          try { parsed = JSON.parse(text); } catch {}
          addJsonDiscoveries({ parsed, text, url: finalUrl, origin, locales: args.locales, enqueue, tool, locale });
        }
      }
    } catch (error) {
      const tool = task.tool || inferTool(task.url);
      const locale = task.locale || '';
      manifest.failures.push({
        url: requestedUrl,
        tool,
        locale,
        kind: task.kind || null,
        discoveredBy: task.discoveredBy || null,
        error: error?.name === 'AbortError' ? `Timeout after ${args.timeoutMs}ms` : String(error?.message || error),
      });
      updateCoverage(tool, locale, task.kind, 0, true);
    } finally {
      processed.add(requestedUrl);
      completed += 1;
      if (completed % 50 === 0 || completed === queued.size) {
        console.log(`Processed ${completed}/${queued.size}; saved ${manifest.files.length}; failures ${manifest.failures.length}`);
      }
    }
  };

  const pump = () => {
    try {
      while (active < args.concurrency && queue.length) {
        const task = queue.shift();
        if (processed.has(task.url.href)) continue;
        active += 1;
        runOne(task)
          .then(() => {
            active -= 1;
            pump();
          })
          .catch((error) => {
            active -= 1;
            rejectDrain(error);
          });
      }
      if (active === 0 && queue.length === 0) resolveDrain();
    } catch (error) {
      rejectDrain(error);
    }
  };

  pump();
  await drain;

  manifest.finishedAt = new Date().toISOString();
  manifest.summary = {
    queued: queued.size,
    processed: processed.size,
    saved: manifest.files.length,
    failures: manifest.failures.length,
    bytes: manifest.files.reduce((sum, file) => sum + file.bytes, 0),
    byKind: Object.fromEntries(['page', 'script', 'json', 'other'].map((kind) => [kind, manifest.files.filter((file) => file.kind === kind).length])),
  };
  manifest.files.sort((a, b) => a.path.localeCompare(b.path) || a.finalUrl.localeCompare(b.finalUrl));
  manifest.failures.sort((a, b) => a.url.localeCompare(b.url));
  await writeFile(path.join(args.output, 'mirror-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const report = [
    '# RoworldDB SEA mirror report',
    '',
    `- Started: ${manifest.startedAt}`,
    `- Finished: ${manifest.finishedAt}`,
    `- Saved files: ${manifest.summary.saved}`,
    `- JSON files: ${manifest.summary.byKind.json}`,
    `- Scripts: ${manifest.summary.byKind.script}`,
    `- Pages: ${manifest.summary.byKind.page}`,
    `- Failures: ${manifest.summary.failures}`,
    `- Downloaded bytes: ${manifest.summary.bytes}`,
    '',
    '| Tool | Locale | Pages | Scripts | JSON | Failures | Bytes |',
    '|---|---|---:|---:|---:|---:|---:|',
  ];
  for (const tool of args.tools) {
    for (const locale of args.locales) {
      const item = manifest.coverage[tool][locale];
      report.push(`| ${tool} | ${locale} | ${item.pages} | ${item.scripts} | ${item.json} | ${item.failures} | ${item.bytes} |`);
    }
  }
  report.push('', 'Review `mirror-manifest.json` and failures before importing any tool into RTNW Hub.', '');
  await writeFile(path.join(args.output, 'mirror-report.md'), report.join('\n'), 'utf8');

  console.log(`Mirror complete: ${args.output}`);
  console.log(`Saved ${manifest.summary.saved} files (${manifest.summary.byKind.json} JSON); failures ${manifest.summary.failures}`);
  console.log(`Manifest: ${path.join(args.output, 'mirror-manifest.json')}`);
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});

import { readFile } from "node:fs/promises";

const siteOrigin = "https://rtnw.online";
const host = "rtnw.online";
const defaultKey = "4cc78cf9b31d099f4de23a0874b08a5e";
const endpoint = process.env.INDEXNOW_ENDPOINT?.trim() || "https://api.indexnow.org/indexnow";
const key = process.env.INDEXNOW_KEY?.trim() || defaultKey;
const keyLocation =
  process.env.INDEXNOW_KEY_LOCATION?.trim() || `${siteOrigin}/${key}.txt`;
const args = process.argv.slice(2);
const nonfatal = args.includes("--nonfatal");
const autoMode = args.includes("--auto");
const dryRun = args.includes("--dry-run") || process.env.INDEXNOW_DRY_RUN === "1";

function argumentValue(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function explicitUrls() {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--url" && args[index + 1]) values.push(args[index + 1]);
    if (arg.startsWith("--url=")) values.push(arg.slice(6));
  }
  return values;
}

function normalizeUrl(value) {
  const url = new URL(value, siteOrigin);
  if (url.hostname !== host || url.protocol !== "https:") {
    throw new Error(`IndexNow URL must belong to ${siteOrigin}: ${value}`);
  }
  url.hash = "";
  return url.toString();
}

function parseSitemap(xml) {
  return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>)?\s*<\/url>/g)].map(
    (match) => ({
      url: match[1].trim(),
      lastmod: match[2]?.trim() || "",
    }),
  );
}

async function selectUrls() {
  const supplied = explicitUrls();
  if (supplied.length) return supplied.map(normalizeUrl);

  const sitemap = await readFile("public/sitemap.xml", "utf8");
  const entries = parseSitemap(sitemap);
  const submitAll = args.includes("--all") || process.env.INDEXNOW_SUBMIT_ALL === "1";
  const since = argumentValue("--since");
  const today = new Date().toISOString().slice(0, 10);

  if (submitAll) return entries.map((entry) => normalizeUrl(entry.url));
  if (since) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) {
      throw new Error("--since must use YYYY-MM-DD format.");
    }
    return entries
      .filter((entry) => entry.lastmod && entry.lastmod >= since)
      .map((entry) => normalizeUrl(entry.url));
  }

  return entries
    .filter((entry) => entry.lastmod === today)
    .map((entry) => normalizeUrl(entry.url));
}

async function main() {
  if (autoMode && process.env.INDEXNOW_AUTO_SUBMIT === "0") {
    console.log("IndexNow automatic submission is disabled by INDEXNOW_AUTO_SUBMIT=0.");
    return;
  }

  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error("INDEXNOW_KEY must contain 8 to 128 letters, numbers, or dashes.");
  }

  const urls = [...new Set(await selectUrls())];
  if (urls.length === 0) {
    console.log("IndexNow: no matching sitemap URLs to submit.");
    return;
  }
  if (urls.length > 10_000) {
    throw new Error(`IndexNow accepts at most 10,000 URLs per request; received ${urls.length}.`);
  }

  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls,
  };

  if (dryRun) {
    console.log(JSON.stringify({ endpoint, ...payload }, null, 2));
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(15_000),
  });
  const responseBody = await response.text();

  if (response.status !== 200 && response.status !== 202) {
    throw new Error(
      `IndexNow returned HTTP ${response.status}${responseBody ? `: ${responseBody}` : ""}`,
    );
  }

  console.log(
    `IndexNow accepted ${urls.length} URL${urls.length === 1 ? "" : "s"} with HTTP ${response.status}.`,
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`IndexNow submission failed: ${message}`);
  if (!nonfatal) process.exitCode = 1;
});

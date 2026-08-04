import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const apply = process.argv.includes("--apply");
const nonfatal = process.argv.includes("--nonfatal");
const indexPath = path.join(root, "public", "sea", "map-simulator", "data", "map_index_en-US.json");
const outputDir = path.join(root, "public", "media", "images", "map");
const reportPath = path.join(root, "public", "map-image-audit.json");
const origins = ["https://www.roworlddb.com", "https://roworlddb.com"];
const extensions = ["webp", "png"];
const concurrency = 4;

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function collectPictureResources(mapIndex) {
  const values = [];
  for (const map of Array.isArray(mapIndex?.world_maps) ? mapIndex.world_maps : []) {
    if (map?.pic_res) values.push(String(map.pic_res));
  }
  for (const map of Object.values(mapIndex?.map_configs || {})) {
    if (map?.pic_res) values.push(String(map.pic_res));
  }
  return Array.from(new Set(values.filter(Boolean))).sort((left, right) => left.localeCompare(right));
}

function remoteCandidates(name) {
  return origins.flatMap((origin) => extensions.map((extension) => ({
    url: `${origin}/media/images/map/${encodeURIComponent(name)}.${extension}`,
    extension,
  })));
}

async function fetchImage(candidate) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(candidate.url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        Accept: "image/avif,image/webp,image/png,image/*,*/*;q=0.8",
        "User-Agent": "RTNW-Hub-Map-Asset-Sync/1.0 (+https://rtnw.online)",
      },
    });
    if (!response.ok) return null;
    const contentType = String(response.headers.get("content-type") || "").toLowerCase();
    if (!contentType.startsWith("image/")) return null;
    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength < 64) return null;
    return { bytes, contentType, finalUrl: response.url || candidate.url };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function findLocal(name) {
  for (const extension of extensions) {
    const file = path.join(outputDir, `${name}.${extension}`);
    if (await exists(file)) return { extension, file };
  }
  return null;
}

async function processPicture(name) {
  const local = await findLocal(name);
  if (local) {
    return {
      name,
      status: "present",
      path: path.relative(root, local.file).replaceAll(path.sep, "/"),
    };
  }

  for (const candidate of remoteCandidates(name)) {
    const image = await fetchImage(candidate);
    if (!image) continue;

    const destination = path.join(outputDir, `${name}.${candidate.extension}`);
    if (apply) {
      await mkdir(outputDir, { recursive: true });
      await writeFile(destination, image.bytes);
    }
    return {
      name,
      status: apply ? "downloaded" : "available-remotely",
      path: path.relative(root, destination).replaceAll(path.sep, "/"),
      source: image.finalUrl,
      contentType: image.contentType,
      bytes: image.bytes.byteLength,
    };
  }

  return { name, status: "missing-remotely" };
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  });
  await Promise.all(runners);
  return results;
}

const mapIndex = JSON.parse(await readFile(indexPath, "utf8"));
const pictureResources = collectPictureResources(mapIndex);
const results = await mapWithConcurrency(pictureResources, concurrency, processPicture);
const counts = results.reduce((summary, item) => {
  summary[item.status] = (summary[item.status] || 0) + 1;
  return summary;
}, {});
const unresolved = results.filter((item) => item.status === "missing-remotely");

const report = {
  generatedAt: new Date().toISOString(),
  sourceIndex: "public/sea/map-simulator/data/map_index_en-US.json",
  remoteOrigins: origins,
  apply,
  totalReferencedImages: pictureResources.length,
  counts,
  unresolved,
  results,
};

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`Map image audit: ${pictureResources.length} referenced, ${counts.present || 0} present, ${counts.downloaded || 0} downloaded, ${counts["available-remotely"] || 0} available remotely, ${unresolved.length} unresolved.`);
console.log(`Report written to ${path.relative(root, reportPath)}.`);

if (unresolved.length && !nonfatal) process.exitCode = 1;

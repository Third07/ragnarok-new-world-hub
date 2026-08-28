# All-tool SEA data refresh

RTNW Hub now refreshes supported public RoworldDB SEA datasets during the Cloudflare build, validates them before use, and preserves committed data when a source is unavailable or incomplete.

## Automatically refreshed

- Rune Planner
- Affix Planner
- Apocalypse Planner
- Shop
- Equipment
- Card Library and Card Fusion source data
- Monster Album
- Maps, monster spawns, subregions, and weather placements
- Complete exploration-marker indexes and their referenced files in all four SEA locales
- Events
- Pets
- Shared icon paths
- Wardrobe catalogue, with reused local thumbnails (the 3D viewer is not mirrored)

The Skill Planner remains on its dedicated guarded importer because its data is split into a locale index plus individual job files.

## Languages

The SEA interface and localized datasets support:

- English (`en-US`)
- Simplified Chinese (`zh-CN`)
- Thai (`th-TH`)
- Bahasa Indonesia (`id-ID`)

The shared language selector prioritizes the URL language, then the saved manual choice, then the browser language, with English as the fallback. Internal links preserve the active `lang` parameter.

## Preview without changing production files

```bash
npm run tools:data:sync:preview
npm run maps:data:preview
```

Reports are written to:

```text
.tool-data-import/roworlddb-sea/
├── tool-data-report.json
└── tool-data-report.md
```

## Apply validated datasets locally

```bash
npm run tools:data:sync:apply
npm run maps:data:sync
npm run wardrobe:data:sync
npm run data:optimize
```

Large catalogues are written to `source-data/` and converted into optimized indexes and chunks during the normal build. Smaller datasets are written directly under `public/`.

## Build behavior

`prebuild` performs these steps:

1. Enable the four SEA locales and safe English fallbacks.
2. Refresh and validate Skill Planner data.
3. Refresh and validate the remaining tool datasets, exploration packs, and referenced images.
4. Refresh the Wardrobe catalogue and align the MVP guide directory with current map records.
5. Version the Skill Planner assets, generate the creator image catalogue, and update its displayed count.
6. Run naming and social metadata updates, derive content-based tool cache versions, and check SEO.
7. Generate optimized catalogue chunks and build the site.

The build wrapper is nonfatal. If RoworldDB is temporarily unavailable, current committed English data remains usable. Missing localized source files fall back to English during performance-data generation.

## Optional datasets

Study question banks and Refine data are probed during synchronization. They are replaced only when the endpoint returns non-empty valid JSON. Otherwise, the current files remain unchanged.

Question filenames use lowercase underscore locale codes (`en_us`, `zh_cn`, `th_th`, `id_id`). Refine source data is published under `refine-simulator/data`, but our simulator reads the validated copy under `public/sea/refine/`. Events must use `/sea/events/data/`, not the HMT `/events/data/` path.

Use `--tools maps,events` (or another comma-separated tool list) to run a focused comparison. Reports include previous counts, new counts, source URLs, checksums, and change flags; staged JSON is retained under the report directory.

## Map and image safeguards

Exploration packs download and validate every filename in `_index.json` before updating a locale. Invalid paths, unindexed map IDs, malformed coordinates, empty files, or a record-count reduction greater than 20% preserve that locale's existing pack. Source records without coordinates are preserved without inventing positions. The browser falls back to English SEA exploration data when a locale is unavailable.

Weather imports validate unique positive IDs, known marker types, and finite coordinates. The map supports butterflies, bubbles, sun chests, snow, weather monster chests, and season chests. Counts describe recorded coordinates, not live availability or guaranteed total coverage. Weather and photography completion use separate browser-storage keys, preserving existing chest and quest progress.

Missing referenced map and catalogue images are fetched as validated WebP files. Unpublished source images remain reported, and event banners use a local fallback icon. Wardrobe excludes blank, reset, and blocked entries, stores only catalogue fields, and reuses existing images. No 3D models, external viewer scripts, or source analytics are copied.

`scripts/version-tool-data.mjs` hashes canonical data and entry scripts/styles into their cache versions. This avoids returning visitors being stuck with old JSON under an unchanged immutable URL.

The large localized catalogues and their optimized chunks are generated during builds; English canonical source data is committed as the fallback. Do not replace a complete reviewed skill dataset with an upstream feed that fails the existing required-skill checks.

## Review policy

A successful download does not automatically establish that Taiwan/HMT values match SEA. The synchronization uses only SEA paths for the four SEA locales. Exact numerical changes should still be reviewed against official patch notes when a balance update is known.

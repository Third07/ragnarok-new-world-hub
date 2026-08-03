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
- Events
- Pets
- Shared icon paths

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
npm run data:optimize
```

Large catalogues are written to `source-data/` and converted into optimized indexes and chunks during the normal build. Smaller datasets are written directly under `public/`.

## Build behavior

`prebuild` performs these steps:

1. Enable the four SEA locales and safe English fallbacks.
2. Refresh and validate Skill Planner data.
3. Refresh and validate the remaining tool datasets.
4. Version the multilingual Skill Planner assets.
5. Run naming, social metadata, and SEO checks.
6. Generate optimized catalogue chunks and build the site.

The build wrapper is nonfatal. If RoworldDB is temporarily unavailable, current committed English data remains usable. Missing localized source files fall back to English during performance-data generation.

## Optional datasets

Study question banks and Refine data are probed during synchronization. They are replaced only when the endpoint returns non-empty valid JSON. Otherwise, the current files remain unchanged.

## Review policy

A successful download does not automatically establish that Taiwan/HMT values match SEA. The synchronization uses only SEA paths for the four SEA locales. Exact numerical changes should still be reviewed against official patch notes when a balance update is known.

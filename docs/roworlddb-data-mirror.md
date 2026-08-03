# RoworldDB SEA data mirror

Use one read-only command to download the public datasets for every RTNW tool before updating RTNW Hub one tool at a time.

## Included tools

- Skill Planner
- Rune Planner
- Affix Planner
- Apocalypse Planner
- Shop
- Equipment
- Cards
- Monster Album
- Maps
- Events
- Study
- Pet
- Refine

## Included SEA locales

- `en-US`
- `zh-CN`
- `th-TH`
- `id-ID`

## Run from the repository

```bash
npm run data:mirror:roworlddb -- --output .roworlddb-mirror/sea
```

## Run from Termux

Download the script from GitHub, then run it against shared storage:

```bash
curl -L \
  "https://raw.githubusercontent.com/Third07/ragnarok-new-world-hub/main/scripts/mirror-roworlddb-sea.mjs" \
  -o /sdcard/Download/mirror-roworlddb-sea.mjs

node /sdcard/Download/mirror-roworlddb-sea.mjs \
  --output /sdcard/Download/roworlddb_all_data
```

The mirror saves:

```text
roworlddb_all_data/
├── pages/
├── scripts/
├── data/
├── mirror-manifest.json
└── mirror-report.md
```

The crawler downloads public HTML and JavaScript, discovers referenced JSON files, expands all four SEA locales, follows JSON references, and downloads skill job files discovered from each skill index.

A missing optional endpoint is recorded under `failures` instead of aborting the entire mirror. Review the manifest before importing any tool.

## Package for review

```bash
cd /sdcard/Download
pkg install zip
zip -r roworlddb_all_data.zip roworlddb_all_data
```

Upload `roworlddb_all_data.zip`. Each tool will then be compared and migrated independently. The mirror command is intentionally excluded from `prebuild` and does not modify production data.

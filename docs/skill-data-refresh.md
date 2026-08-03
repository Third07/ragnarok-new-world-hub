# Skill data refresh workflow

RTNW Hub keeps its committed English fallback data under:

```text
public/sea/skill-simulator/data/
```

The RoworldDB SEA planner publishes locale-specific indexes and job files using the same broad structure. The importer separates download, validation, comparison and application so incomplete upstream data cannot silently replace the planner dataset.

## Supported SEA locales

- `en-US`
- `zh-CN`
- `th-TH`
- `id-ID`

Traditional Chinese belongs to the HMT client and is not mixed into the SEA dataset.

## Manual preview

```bash
npm run skills:sync:preview
```

Preview mode:

1. Probes the known RoworldDB SEA data roots.
2. Downloads every supported locale index.
3. Downloads each job file marked as containing skills, unique skills or traits.
4. Validates job IDs and collection shapes.
5. Writes checksums and source URLs to `import-manifest.json`.
6. Compares source counts with the current repository dataset.
7. Writes a human-readable `import-report.md`.

Default staging directory:

```text
.skill-data-import/roworlddb-sea/
```

Production files are not changed in preview mode.

## Build-time synchronization

`npm run build` invokes:

```bash
npm run skills:sync:build
```

The build wrapper runs the validated importer with `--apply` inside the temporary build workspace. This makes current English, Simplified Chinese, Thai and Indonesian skill files available to the deployed static site without committing roughly 50 MB of generated JSON.

The importer downloads all required files before applying anything. If the upstream source is unavailable, incomplete or invalid, the wrapper logs a warning and continues with the committed English fallback dataset. A failed synchronization therefore does not leave a partially replaced data directory.

## Manual application

For a local repository checkout:

```bash
npm run skills:sync:apply
```

Apply mode creates a timestamped backup under `.skill-data-import/backups/`, then replaces the four locale indexes and job directories.

## Review requirements

Before deliberately committing imported JSON, review:

- Unexpected job additions or removals
- Skill, unique-skill and trait count changes
- Missing required job files
- SEA versus HMT client differences
- English terminology changes
- Share-link compatibility for stable job and skill IDs

Exact numeric changes should be spot-checked against the live SEA planner or official patch notes when possible.

## Multilingual planner behavior

The Skill Planner selects its locale in this order:

1. `?lang=` in the current URL
2. A manually saved `ro_lang` preference
3. Browser language
4. English fallback

Changing language preserves the current URL hash, including shared build data. The planner rewrites only its skill index and job-data requests; the existing simulator remains responsible for rendering and point allocation.

# Skill data refresh workflow

RTNW Hub keeps production skill data under:

```text
public/sea/skill-simulator/data/
```

The RoworldDB SEA planner currently publishes locale-specific indexes and job files using the same broad structure. The sync tool deliberately separates **download**, **validation**, **comparison**, and **production application** so an upstream change cannot silently break the planner.

## Supported SEA locales

- `en-US`
- `zh-CN`
- `th-TH`
- `id-ID`

Traditional Chinese belongs to the HMT client and must not be mixed into the SEA numeric dataset unless values are independently verified.

## Preview an import

```bash
npm run skills:sync:preview
```

This command:

1. Probes the known RoworldDB SEA data roots.
2. Downloads every supported locale index.
3. Downloads each job file marked as containing skills, unique skills, or traits.
4. Validates job IDs and collection shapes.
5. Writes checksums and source URLs to `import-manifest.json`.
6. Compares source counts with the current RTNW Hub dataset.
7. Writes a human-readable `import-report.md`.

Default output:

```text
.skill-data-import/roworlddb-sea/
```

Production files are not changed in preview mode.

## Review requirements

Before applying an import, review:

- Unexpected job additions or removals
- Skill, unique-skill, and trait count changes
- Missing required job files
- SEA versus HMT client differences
- English terminology changes
- Share-link compatibility for stable job and skill IDs

Exact numeric changes should be spot-checked against the live SEA planner or official patch notes when possible.

## Apply validated data

```bash
npm run skills:sync:apply
```

Apply mode creates a timestamped backup under `.skill-data-import/backups/`, then replaces the four locale indexes and job directories.

After applying:

```bash
npm run build
npm test
```

Do not add this sync command to `prebuild` or Cloudflare deployment. The website must build from reviewed, committed data rather than depending on another website at deployment time.

# RoworldDB SEA refresh — August 28, 2026

Compared the existing RTNW production source (`9a0e703`) with the public SEA data behind [RoworldDB Maps](https://www.roworlddb.com/sea/maps/?lang=en-US#map=101). The source page advertised asset version `20260827-235731`. This is a database comparison, not an in-game availability or balance verification.

## Findings and changes

| Dataset | Previous committed data | Refreshed source |
|---|---:|---:|
| Equipment records | 2,980 | 3,267 |
| Shop items / currencies | 673 / 36 | 758 / 44 |
| Affix packages | 355 | 385 |
| Apocalypse entries | 979 | 999 |
| Monster records | 2,897 | 2,921 |
| Pets | 29 | 31 |
| SEA weekly / calendar events | 37 / 5 | 38 / 18 |
| Exploration marker records | 2,158 | 2,178 |
| Exploration categories | 18 | 18 |
| Weather placements | Not committed or rendered | 298 |
| Wardrobe named, unblocked items | No catalogue | 776 |
| Shared icon mappings | 8,022 | 8,234 |

The weather locations contain 68 butterflies, 84 bubbles, 57 sun chests, 59 snow locations, 29 weather monster chests, and one season chest. Prontera exposes nine butterfly and thirteen bubble locations in the source map view. All 298 locations resolve to current SEA map geometry.

The source map configuration count changed from 404 to 380: 30 configurations were removed by the SEA source and six were added. The added records include Time Rift, three Bounty Hunt difficulties, Secret Garden, and Crusader Guild. Source removals are not claims about a game's release schedule. All 13 open-world choices and all weather-location references remain valid.

Rune and card counts are unchanged, but their current source records were compared and refreshed. English Guild Banquet, Lucky Rabbit, Scholar Exam, and Refine payloads were unchanged. Their sync paths were corrected, and localized payloads are available. SEA event times retain UTC+7.

## Website behavior

- Weather layers now have icons, filters, world coordinates, search support, completion toggles, and Hide checked behavior.
- Map membership uses shared map artwork and explicit scene aliases. Similar numeric map prefixes no longer mix locations from different maps; the deployed-preview check caught this before publication.
- Photography completion and optional card-reward icons are supported. Existing chest and quest storage keys are preserved.
- Exploration packs refresh as complete validated locale groups instead of leaving old files outside the importer.
- Wardrobe is a searchable catalogue with category, gender, job, and dye filters, pagination, and shareable filter URLs. Its full 3D viewer remains on RoworldDB and is explicitly linked as a separate feature.
- The MVP guide now reflects Maya's three recorded markers out of three. Its table is refreshed from the same source records during builds.
- Creator image totals, sitemap dates, discoverability links, and tool cache versions are updated with the data.

## Guarded or incomplete source areas

- The SEA skill importer rejected the current upstream English pack because job 513 lacked required skill 151306, Mana Recharge. No incomplete skill pack was applied. The existing reviewed skill data and established HMT overlay workflow are retained.
- Five source event-banner WebP URLs return 404. Event text and schedules remain available with a local event-icon fallback. No artwork or game availability was fabricated.
- Database records and weather locations do not establish live spawns, current shop availability, or server-specific unlock status.

## Verification

- Guarded tool import: all 55 regular/shared datasets fetched and validated from the SEA endpoints; all 12 correctly named quiz files validated separately.
- Exploration import: four complete locale packs, 18 categories and 2,178 records each; all required map/weather icons available.
- Map artwork audit: 135 referenced images resolved, including 36 previously missing files.
- Catalogue asset audit: 2,143 referenced images checked; 57 downloaded, with the five unpublished event banners handled by the fallback above.
- Wardrobe records use local thumbnails; no 3D asset or tracking dependencies are required.
- Production build and automated interaction/data/SEO tests are run before publication. Live deployment verification uses `roworlddb-sea-refresh-2026-08-28` and checks the actual public map and catalogue.

The Redfinger guide remains a separate, unmerged change until this database update is handled.

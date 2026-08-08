import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "mage-builds",
  "title": "Ragnarok: The New World Mage Build Guide",
  "seoTitle": "RTNW Mage Build Guide: Fire–Earth & Ice–Lightning Wizard",
  "description": "Compare Fire–Earth and Ice–Lightning Wizard builds in RTNW with INT and DEX stats, Instant Cast, traits, cards, cast-time targets, and PvE rotations.",
  "kicker": "Second Job Build Guide",
  "dek": "Control large areas and deliver high magic damage while solving Mage's long cast times, limited mobility, and positioning demands.",
  "category": "Classes and Builds",
  "heroImage": "/assets/guides/mage-builds/mage-hero.webp",
  "heroAlt": "Ragnarok: The New World Mage casting magic in combat",
  "published": "2026-08-06",
  "modified": "2026-08-08",
  "readTime": "8 min read",
  "keywords": [
    "Ragnarok The New World Mage build",
    "RTNW Wizard build",
    "Fire Earth Mage",
    "Ice Lightning Wizard",
    "Instant Cast RTNW"
  ],
  "quickFacts": [
    ["Role", "Ranged magic DPS and control"],
    ["Main builds", "Fire–Earth, Ice–Lightning"],
    ["Stats", "70 INT / 40 DEX"],
    ["Key early trait", "Instant Cast"],
    ["Recommended pet", "Piamette for cast reduction"],
    ["Fire target", "Meteor Storm near 1.3s cast late game"]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Mage and Wizard overview",
      "paragraphs": [
        "Mage combines high burst, safe range, wide-area skills, and control. Its weaknesses are long casting, limited movement during spells, and low tolerance for poor positioning.",
        "Mage works for both F2P and high-investment accounts: spenders can push burst, while budget players can contribute sustained damage and control."
      ]
    },
    {
      "id": "builds",
      "title": "Fire–Earth and Ice–Lightning builds",
      "table": {
        "headers": ["Build", "PVE core", "Secondary value", "Core traits"],
        "rows": [
          ["Fire–Earth", "Fire Pillar and Meteor Storm", "Earth skills add more PVP control", "Massive Meteorite, Fire of Destruction, Compress Spell."],
          ["Ice–Lightning", "Jupitel Thunder and Storm Gust", "Ice provides control; Lightning supports repeated damage", "Dual Roar and Lightning Conduction, or Cold Bloodline and Frost Impact."]
        ]
      },
      "paragraphs": [
        "Save Psychic build planning for the advanced second job. During first and normal second job, invest only in the element pair you intend to use."
      ],
      "image": {
        "src": "/assets/guides/mage-builds/wizard-builds.webp",
        "alt": "Wizard build overview comparing Fire–Earth and Ice–Lightning routes",
        "caption": "Build around one elemental pair so traits, skill points, and cards support the same rotation."
      }
    },
    {
      "id": "stats",
      "title": "INT, DEX, and cast time",
      "paragraphs": [
        "Casting contains fixed and variable portions. DEX reduces the variable component, so 70 INT and 40 DEX is a practical foundation, with MATK, INT, and DEX on equipment.",
        "For a developed Fire Mage, reduce Meteor Storm to roughly a 1.3-second cast. Each DEX point is listed as reducing variable cast by about 0.7%; use the in-game skill panel to verify the actual result on your character."
      ],
      "image": {
        "src": "/assets/guides/mage-builds/wizard-stats.webp",
        "alt": "Wizard stat allocation focused on INT and DEX"
      }
    },
    {
      "id": "progression",
      "title": "Leveling and trait route",
      "steps": [
        {"title": "Lv.1–40: forge Instant Cast", "text": "Instant Cast gives damage and a chance to skip casting. It is forged on Lv.25 weapons, and the early first-recharge weapon can carry an orange Lv.1 version."},
        {"title": "Use a cast-support pet", "text": "Piamette's active skill provides 10% cast reduction."},
        {"title": "Lv.40–54: complete one elemental package", "text": "Fire–Earth prioritizes Massive Meteorite then Fire of Destruction. Ice–Lightning chooses a Lightning pair or an Ice pair."},
        {"title": "Protect the Instant Cast slot", "text": "Only the weapon and two accessories carry weapon traits. Keep one weapon slot for the inherited Instant Cast when assembling the three-trait build."},
        {"title": "Lv.55–69", "text": "Farm boss gear, materials, and cards for the next advancement instead of diluting resources across both elemental branches."}
      ],
      "image": {
        "src": "/assets/guides/mage-builds/second-job-skills.webp",
        "alt": "Wizard second-job skill tree for elemental build planning"
      }
    },
    {
      "id": "cards",
      "title": "Card priorities",
      "bullets": [
        "Stat cards: MATK, DEX, and INT.",
        "Fire–Earth Meteor builds can use Fire damage cards such as Horong.",
        "Ice–Lightning has fewer direct element card options, so magic-resistance ignore or target-specific damage can be stronger.",
        "Mistress increases magic skill damage and is a major Mage card."
      ],
      "image": {
        "src": "/assets/guides/mage-builds/mistress-card.webp",
        "alt": "Mistress card details for a magic damage build"
      }
    },
    {
      "id": "pve",
      "title": "PVE rotations with and without Instant Cast",
      "bullets": [
        "Fire–Earth with Instant Cast: use Firebolt to trigger the proc, cast Meteor Storm, then fill with Fire Pillar.",
        "Ice–Lightning with Instant Cast: open with Jupitel Thunder, follow with Thunder Fury or Storm Gust, and use Jupitel Thunder between major cooldowns.",
        "Fire–Earth without the proc: cycle Meteor Storm and repeated Fire Pillar; Fire Pillar's cast can cover the gap.",
        "Lightning specialization: use Thunder Fury to establish the buff and Jupitel Thunder to refresh Dual Roar.",
        "Ice specialization: combine Storm Gust with repeated Jupitel Thunder."
      ],
      "image": {
        "src": "/assets/guides/mage-builds/jupitel-thunder.webp",
        "alt": "Mage casting Jupitel Thunder during combat"
      }
    }
  ],
  "faqs": [
    {"question": "What stats should Mage use in RTNW?", "answer": "Start with 70 INT and 40 DEX, with MATK, INT, and DEX prioritized on equipment."},
    {"question": "What is Instant Cast?", "answer": "It is a weapon trait that increases damage and gives a chance to skip a cast. It can be forged on Lv.25 weapons and retained through inheritance."},
    {"question": "Is Fire–Earth or Ice–Lightning better for PVE?", "answer": "Fire–Earth uses Meteor Storm and Fire Pillar for large AoE, while Ice–Lightning uses Jupitel Thunder and Storm Gust for sustained output. The better route depends on your traits and element counters."},
    {"question": "Can F2P players use Mage?", "answer": "Yes. Mage can contribute sustained output and control at low investment, while higher investment mainly raises burst and cast comfort."}
  ],
  "related": [
    ["Skill Planner", "/sea/skill_planner/"],
    ["Card database", "/sea/cards/"],
    ["Equipment database", "/sea/equipment/"],
    ["Monster database", "/sea/monster_album/"],
    ["Class tier list", "/guides/class-tier-list/"]
  ]
} satisfies SourceGuide;

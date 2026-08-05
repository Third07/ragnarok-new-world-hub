import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "mage-builds",
  "title": "Ragnarok: The New World Mage Build Guide",
  "seoTitle": "RTNW Mage Build Guide: Fire–Earth & Ice–Lightning Wizard",
  "description": "Compare Fire–Earth and Ice–Lightning Wizard builds in RTNW with INT and DEX stats, Instant Cast, core traits, cards, leveling, cast-time targets, and PVE rotations.",
  "kicker": "Second Job Build Guide",
  "dek": "Control large areas and deliver high magic damage while solving Mage's long cast times, limited mobility, and positioning demands.",
  "category": "Classes and Builds",
  "heroImage": "https://cdnimages.awselbcombine.com/public_images/one_image/2026/07/178488070835517205.png",
  "heroAlt": "Ragnarok: The New World Mage casting magic in combat",
  "sourceUrl": "https://forum.gnjoy.hk/forum/index.html?gameId=456&id=roseaforum#/post/106714",
  "sourceTitle": "Mage 2nd Job Guide: Master Mage Builds in 3 Minutes",
  "published": "2026-08-06",
  "modified": "2026-08-06",
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
    ["Recommended pet", "Piamette in the source"],
    ["Fire target", "Meteor Storm near 1.3s cast late game"]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Mage and Wizard overview",
      "paragraphs": [
        "Mage combines high burst, safe range, wide-area skills, and control. Its weaknesses are long casting, limited movement during spells, and low tolerance for poor positioning.",
        "The source presents Mage as viable for both F2P and high-investment accounts: spenders can push burst, while budget players can contribute sustained damage and control."
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
        "Psychic builds are not considered before advanced second job in the supplied guide. During first and normal second job, invest only in the element pair you intend to use."
      ]
    },
    {
      "id": "stats",
      "title": "INT, DEX, and cast time",
      "paragraphs": [
        "Casting contains fixed and variable portions. DEX reduces the variable component, so the source recommends 70 INT and 40 DEX as a practical foundation, with MATK, INT, and DEX on equipment.",
        "For a developed Fire Mage, the guide suggests reducing Meteor Storm to roughly a 1.3-second cast. It also states that each DEX point reduces variable cast by about 0.7%; use the in-game skill panel to verify your actual result."
      ]
    },
    {
      "id": "progression",
      "title": "Leveling and trait route",
      "steps": [
        {"title": "Lv.1–40: forge Instant Cast", "text": "Instant Cast gives damage and a chance to skip casting, and the source says it is only forged on Lv.25 weapons. The early first-recharge weapon also carries an orange Lv.1 version."},
        {"title": "Use a cast-support pet", "text": "Piamette's source-listed active skill gives 10% cast reduction."},
        {"title": "Lv.40–54: complete one elemental package", "text": "Fire–Earth prioritizes Massive Meteorite then Fire of Destruction. Ice–Lightning chooses a Lightning pair or an Ice pair."},
        {"title": "Protect the Instant Cast slot", "text": "Only the weapon and two accessories carry weapon traits. Keep one weapon slot for the inherited Instant Cast when assembling the three-trait build."},
        {"title": "Lv.55–69", "text": "Farm boss gear, materials, and cards for the next advancement instead of diluting resources across both elemental branches."}
      ]
    },
    {
      "id": "cards",
      "title": "Card priorities",
      "bullets": [
        "Stat cards: MATK, DEX, and INT.",
        "Fire–Earth Meteor builds can use Fire damage cards such as Horong.",
        "Ice–Lightning has fewer direct element cards in the source, so magic-resistance ignore or target-specific damage can be stronger.",
        "Mistress increases magic skill damage and is identified as a major Mage card."
      ]
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
      ]
    }
  ],
  "faqs": [
    {"question": "What stats should Mage use in RTNW?", "answer": "The supplied guide recommends 70 INT and 40 DEX, with MATK, INT, and DEX prioritized on equipment."},
    {"question": "What is Instant Cast?", "answer": "It is a weapon trait that increases damage and gives a chance to skip a cast. The source says it can be forged on Lv.25 weapons and retained through inheritance."},
    {"question": "Is Fire–Earth or Ice–Lightning better for PVE?", "answer": "Fire–Earth uses Meteor Storm and Fire Pillar for large AoE, while Ice–Lightning uses Jupitel Thunder and Storm Gust for sustained output. The better route depends on your traits and element counters."},
    {"question": "Can F2P players use Mage?", "answer": "Yes. The source describes Mage as playable at low investment through sustained output and control, while higher investment mainly raises burst and cast comfort."}
  ],
  "related": [
    ["Skill Planner", "/sea/skill_planner/"],
    ["Card database", "/sea/cards/"],
    ["Equipment database", "/sea/equipment/"],
    ["Monster database", "/sea/monster_album/"],
    ["Class tier list", "/guides/class-tier-list/"]
  ]
} satisfies SourceGuide;

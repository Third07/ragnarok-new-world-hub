import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "acolyte-builds",
  "title": "Ragnarok: The New World Acolyte Build Guide",
  "seoTitle": "RTNW Acolyte Build Guide: Support, Exorcist & AGI-Crit",
  "description": "Build a Support, Exorcist, or AGI-Crit Priest in Ragnarok: The New World with stats, traits, cards, Rune Engine priorities, buffs, and PvE rotations.",
  "kicker": "Second Job Build Guide",
  "dek": "Prioritize the indispensable healing setup for parties, then add a solo physical or magic damage build only when resources allow.",
  "category": "Classes and Builds",
  "heroImage": "/assets/guides/acolyte-builds/acolyte-hero.webp",
  "heroAlt": "Ragnarok: The New World Priest character in the field",
  "published": "2026-08-06",
  "modified": "2026-08-08",
  "readTime": "8 min read",
  "keywords": [
    "Ragnarok The New World Acolyte build",
    "RTNW Priest guide",
    "Support Priest build",
    "Exorcist Acolyte",
    "AGI Crit Priest"
  ],
  "quickFacts": [
    ["Primary party role", "Healing and support"],
    ["Second-job builds", "Support, Exorcist, AGI-Crit"],
    ["Support stats", "70 INT / 40 DEX / 40 VIT"],
    ["Cast target", "Sanctuary within about 1 second"],
    ["Rune priority", "Lv.3 Holy resonance"],
    ["PVE recommendation", "Support Priest"]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Acolyte and Priest overview",
      "paragraphs": [
        "Acolyte is the dedicated healing and support class. First-job solo progress relies on Holy Light and can feel slower, but the class becomes essential when dungeons and raids begin.",
        "Every developed Priest should maintain a support/healing setup. Exorcist and AGI-Crit are supplemental solo, farming, or leveling builds rather than substitutes for the party role."
      ]
    },
    {
      "id": "builds",
      "title": "Support, Exorcist, and AGI-Crit builds",
      "table": {
        "headers": ["Build", "Recommended stats", "Damage or role", "Priority"],
        "rows": [
          ["Support Priest", "70 INT / 40 DEX / 40 VIT; DEX can be traded for more VIT", "Healing, buffs, shields, revival", "Primary party build."],
          ["Exorcist", "INT main, DEX support", "Holy magic AoE", "Solo and farming alternative."],
          ["AGI-Crit", "STR > AGI > LUK", "Physical AoE and normal attacks", "Solo physical alternative."]
        ]
      },
      "paragraphs": [
        "Because Sanctuary is the key casted group-heal skill, aim to keep its cast time near one second. If traits and equipment already make casting comfortable, additional VIT can be more valuable than DEX."
      ],
      "image": {
        "src": "/assets/guides/acolyte-builds/priest-stats.webp",
        "alt": "Priest stat allocation screen showing an INT, DEX, and VIT support setup",
        "caption": "Use the stat screen as a starting point, then trade excess DEX for VIT once Sanctuary casts quickly enough."
      }
    },
    {
      "id": "traits",
      "title": "Core support traits",
      "bullets": [
        "Prioritize Divine Healing, then Radiant Healing and Radiant Cooldown.",
        "Build Master can supply purple Radiant Healing at stage 3 and weapon Radiant Cooldown at stage 5; forge Divine Healing on an accessory to complete the three-trait core.",
        "AGI-Crit can use Renovatio Radiance, Renovatio Cooldown, and Holy Incarnation.",
        "Exorcist focuses on Reincarnation Lightning and Holy Exorcism, then Holy Incarnation or Absolute Justice.",
        "Elite Guard is a basic PVE survival trait; Unshakable Guard works with Priest shields; Overhealing later turns excess healing into shields."
      ],
      "image": {
        "src": "/assets/guides/acolyte-builds/divine-healing.webp",
        "alt": "Divine Healing trait details for a Priest support build",
        "caption": "Divine Healing is one part of the three-trait support core."
      }
    },
    {
      "id": "progression",
      "title": "Leveling and Rune Engine route",
      "steps": [
        {"title": "Lv.1–40", "text": "Take one damage skill for progression and reset it into Angelus for difficult late-game party content. Save Lv.40 molds instead of forging weak early traits."},
        {"title": "Choose a support pet", "text": "Use Piamette for party ASPD and cast reduction; Baphomet Jr. or Rock Mammoth are solo or defensive alternatives."},
        {"title": "Lv.40–54", "text": "Complete the three-trait support package before investing heavily in a second damage build."},
        {"title": "Lv.55–69", "text": "Farm boss gear and cards. Prioritize Lv.3 Holy resonance for healing, then Earth resonance for automatic shielding and reduction or Wind resonance for global-cooldown help."}
      ],
      "image": {
        "src": "/assets/guides/acolyte-builds/radiant-healing.webp",
        "alt": "Radiant Healing trait displayed in the Priest build interface"
      }
    },
    {
      "id": "cards",
      "title": "Card priorities",
      "bullets": [
        "Stat cards: MATK, INT, VIT, and DEX.",
        "Wormtail reduces variable cast and is useful for Exorcist.",
        "Orc Skeleton is a key Holy damage card for AGI-Crit and Exorcist.",
        "Vitata and Obeaune provide healing-related effects and are important support acquisitions."
      ],
      "image": {
        "src": "/assets/guides/acolyte-builds/vitata-card.webp",
        "alt": "Vitata card details showing a healing-focused support effect"
      }
    },
    {
      "id": "pve",
      "title": "Support Priest PVE rotation",
      "steps": [
        {"title": "Apply party buffs", "text": "Use B.S Sacramenti to cast learned buffs together before the fight."},
        {"title": "Maintain the tank", "text": "Use Heal continuously while positioning yourself away from unnecessary boss attacks."},
        {"title": "Pre-shield large attacks", "text": "Cast Kyrie Eleison before full-screen or heavy group damage."},
        {"title": "Time Sanctuary", "text": "Use Sanctuary for sustained group recovery through the dangerous phase rather than after the damage has already ended."},
        {"title": "Protect the core pair", "text": "The tank and Priest are the party's recovery foundation. Prioritize their survival before risky damage optimization."}
      ],
      "image": {
        "src": "/assets/guides/acolyte-builds/sanctuary-rotation.webp",
        "alt": "Priest using Sanctuary during a party encounter",
        "caption": "Place Sanctuary so the tank and nearby party members stay inside its healing area during the dangerous phase."
      }
    }
  ],
  "faqs": [
    {"question": "Which Acolyte build is best for PVE parties?", "answer": "Support Priest is the dependable party build. Exorcist and AGI-Crit are mainly solo, farming, or leveling alternatives."},
    {"question": "What stats should Support Priest use?", "answer": "Start around 70 INT, 40 DEX, and 40 VIT, then replace some DEX with VIT when Sanctuary already casts quickly enough."},
    {"question": "What are the core Support Priest traits?", "answer": "Divine Healing, Radiant Healing, and Radiant Cooldown form the three-trait support core."},
    {"question": "How should Priest handle boss damage?", "answer": "Keep Heal on the tank, use Kyrie Eleison before large attacks, and time Sanctuary so its sustained healing covers the dangerous period."}
  ],
  "related": [
    ["High Priest advanced guide", "/guides/high-priest-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Card database", "/sea/cards/"],
    ["Equipment database", "/sea/equipment/"],
    ["Event schedule", "/sea/events/"],
    ["Swordsman build guide", "/guides/swordman-builds/"]
  ]
} satisfies SourceGuide;

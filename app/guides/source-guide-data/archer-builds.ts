import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "archer-builds",
  "title": "Ragnarok: The New World Archer Build Guide",
  "seoTitle": "RTNW Archer Build Guide: ADL, Pet & Trap Hunter",
  "description": "Build an ADL, Pet, or Trap Hunter in Ragnarok: The New World with stat priorities, traits, cards, elemental arrows, ASPD planning, and a safe PVE rotation.",
  "kicker": "Second Job Build Guide",
  "dek": "Use long-range sustained damage without ignoring Hunter's low durability, positioning requirements, and high ASPD investment.",
  "category": "Classes and Builds",
  "heroImage": "/assets/guides/archer-builds/archer-hero.webp",
  "heroAlt": "Ragnarok: The New World Archer aiming a bow in the field",
  "published": "2026-08-06",
  "modified": "2026-08-08",
  "readTime": "8 min read",
  "keywords": [
    "Ragnarok The New World Archer build",
    "RTNW Hunter build",
    "ADL Hunter guide",
    "Pet Hunter build",
    "Trap Hunter stats"
  ],
  "quickFacts": [
    ["Role", "Ranged single-target DPS"],
    ["Main builds", "ADL, Pet, Trap"],
    ["ADL stats", "70 AGI / 70 DEX / 30 LUK"],
    ["Trap stats", "DEX > INT, then VIT"],
    ["ASPD goal", "193 for high-end ADL/Pet"],
    ["Element control", "Use counter-element arrows"]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Archer and Hunter overview",
      "paragraphs": [
        "Archer is a stable long-range physical damage class. Its safe distance and continuous single-target output suit boss fights, but low durability makes positioning mistakes expensive.",
        "ADL and Pet Hunter share an AGI–DEX–LUK foundation. Trap Hunter changes to DEX and INT because trap damage follows a different stat model."
      ]
    },
    {
      "id": "builds",
      "title": "ADL, Pet, and Trap builds",
      "table": {
        "headers": ["Build", "Core loop", "Stats", "Best fit"],
        "rows": [
          ["ADL", "Normal attacks plus Crescive Bolt", "70 AGI → 70 DEX → 30 LUK", "Stable single-target physical DPS."],
          ["Pet Hunter", "Normal attacks plus Blitz Beat and Steel Crow", "AGI > DEX > LUK", "Falcon-assisted sustained damage."],
          ["Trap Hunter", "Elemental or control traps", "DEX > INT; remaining VIT", "Players who prefer skill-based setup and utility."]
        ]
      },
      "image": {
        "src": "/assets/guides/archer-builds/hunter-builds.webp",
        "alt": "Hunter build overview comparing ADL, Pet, and Trap routes",
        "caption": "Pick one damage route first so stats, traits, and cards reinforce the same attack pattern."
      }
    },
    {
      "id": "traits",
      "title": "Core skills and traits",
      "bullets": [
        "First job: Double Strafe and passives; Phantom Archer greatly strengthens Double Strafe and can appear on the early first-recharge weapon.",
        "ADL: Linked Arrow and Vulnerable Arrow, with Matrix Effect as an important DEX and ASPD target.",
        "Pet Hunter: Keen Falcon is the central trait; Whirlwind Impact adds useful area damage.",
        "One trap level can be used for a trait-based ASPD bonus when chasing 193 ASPD."
      ],
      "image": {
        "src": "/assets/guides/archer-builds/progressive-shot.webp",
        "alt": "Progressive Shot skill details for a Hunter build"
      }
    },
    {
      "id": "progression",
      "title": "Leveling and gear route",
      "steps": [
        {"title": "Farm within the experience range", "text": "Use monsters from ten levels above to five below your level and buy arrows that counter their element."},
        {"title": "Lv.1–40", "text": "Build around Double Strafe and secure Phantom Archer if available. Piamette can supply a useful 5% ASPD bonus."},
        {"title": "Lv.40–54", "text": "Complete the chosen second-job trait pair. Build Master gives Linked Arrow to ADL and Vulnerable Arrow to Pet Hunter, making an early swap possible with limited gear changes."},
        {"title": "Lv.55–69", "text": "Farm boss gear and aim for Lv.3 Wind resonance. Relics can add AGI and DEX, but cards remain important because Hunter has less built-in ASPD than AGI Sword or Assassin."}
      ],
      "image": {
        "src": "/assets/guides/archer-builds/hunter-stats.webp",
        "alt": "Hunter stat allocation focused on AGI, DEX, and LUK"
      }
    },
    {
      "id": "cards",
      "title": "Card priorities",
      "bullets": [
        "Stat cards: AGI, DEX, LUK, Critical, Critical DMG, ASPD, ATK, and Hit.",
        "Kobold Archer supports normal-attack Critical damage.",
        "Archer Skeleton gives a strong general damage bonus and is useful early.",
        "Because arrows change element, permanent elemental cards are less mandatory than on classes without ammunition conversion."
      ],
      "image": {
        "src": "/assets/guides/archer-builds/archer-skeleton-card.webp",
        "alt": "Archer Skeleton card details for a ranged damage build"
      }
    },
    {
      "id": "pve",
      "title": "Hunter PVE rotation and positioning",
      "paragraphs": [
        "Activate Improve Concentration, place the selected trap under your position, and weave Crescive Bolt between normal attacks. Pet Hunter replaces the active bolt weave with Blitz Beat.",
        "The most important performance skill is maintaining a safe output distance. Longer uninterrupted uptime often matters more than a risky attempt to squeeze out one extra attack."
      ],
      "bullets": [
        "Detecting is an anti-stealth PVP skill and can be skipped in a pure PVE setup.",
        "Crescive Bolt Lv.1 can still provide its passive three-meter range benefit.",
        "Adjust Beastbane or Arrow Mastery points around the boss's race and your need for the trap ASPD trait."
      ],
      "image": {
        "src": "/assets/guides/archer-builds/blitz-beat.webp",
        "alt": "Hunter using Blitz Beat in combat",
        "caption": "Pet Hunter weaves Blitz Beat into the normal-attack loop while maintaining safe range."
      }
    }
  ],
  "faqs": [
    {"question": "What is the best Hunter build in RTNW?", "answer": "ADL is the straightforward sustained-damage route, while Pet Hunter moves investment into Blitz Beat and Steel Crow. Trap Hunter uses a separate DEX–INT stat plan."},
    {"question": "What stats should ADL Hunter use?", "answer": "Start with 70 AGI, then 70 DEX, then 30 LUK, prioritizing AGI first for ASPD."},
    {"question": "How does Hunter reach 193 ASPD?", "answer": "Combine AGI, ASPD cards, Matrix Effect, a trap-related ASPD trait, Lv.3 Wind resonance, pet bonuses, and useful Relic stats."},
    {"question": "How should Hunter fight bosses?", "answer": "Maintain maximum safe range, keep Improve Concentration active, and weave Crescive Bolt or Blitz Beat between normal attacks."}
  ],
  "related": [
    ["Skill Planner", "/sea/skill_planner/"],
    ["Monster database", "/sea/monster_album/"],
    ["Card database", "/sea/cards/"],
    ["Equipment database", "/sea/equipment/"],
    ["Gunslinger build guide", "/guides/gunslinger-builds/"]
  ]
} satisfies SourceGuide;

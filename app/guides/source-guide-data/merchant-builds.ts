import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "merchant-builds",
  "title": "Ragnarok: The New World Merchant Build Guide",
  "seoTitle": "RTNW Merchant Build Guide: Cart, Axe & Turret",
  "description": "Compare Merchant Cart, Axe Throwing, and Turret builds in Ragnarok: The New World, with stats, core traits, leveling priorities, cards, and PVE team value.",
  "kicker": "Second Job Build Guide",
  "dek": "Choose between Cart AoE, rapid Axe attacks, and Turret summons while preserving Merchant's unique storage and team-size support.",
  "category": "Classes and Builds",
  "heroImage": "/assets/guides/merchant-builds/merchant-hero.webp",
  "heroAlt": "Ragnarok: The New World Merchant character in Prontera",
  "published": "2026-08-06",
  "modified": "2026-08-08",
  "readTime": "8 min read",
  "keywords": [
    "Ragnarok The New World Merchant build",
    "RTNW Merchant guide",
    "Merchant Cart build",
    "Merchant Axe Throwing build",
    "Merchant Turret build"
  ],
  "quickFacts": [
    ["Role", "Physical DPS and party utility"],
    ["Main stat", "STR"],
    ["Builds", "Cart, Axe Throwing, Turret"],
    ["Recommended pet", "Piamette for the ASPD active bonus"],
    ["Key team skill", "Weapon Perfection"],
    ["Farming range", "Monsters +10 to −5 levels"]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Merchant class overview",
      "paragraphs": [
        "Merchant combines physical damage with the Cart system. The Cart adds 6,000 weight capacity and 50 item slots, and its carried weight directly improves Cart-related skill damage.",
        "First job centers on Cart skills and Mammonite. Second job adds two distinct alternatives: fast Axe attacks and summoned Turrets. The class also contributes Weapon Perfection, which helps a party overcome weapon-versus-size penalties."
      ]
    },
    {
      "id": "builds",
      "title": "Cart, Axe Throwing, and Turret builds",
      "table": {
        "headers": ["Build", "Damage pattern", "Core traits", "Best fit"],
        "rows": [
          ["Cart", "Continuous AoE skill damage with High Speed Cart Ram", "Fatal Greed, Overloaded Cart", "Auto-farming and straightforward area damage."],
          ["Axe Throwing", "Frequent physical attacks with Critical scaling", "Double Spin, Flying Axe Crit", "Players who prefer an active rapid-attack physical build."],
          ["Turret", "Damage from constructed summoned units", "Summoned Count, Level Up Construction", "Stable summon-focused PVE and hands-off damage."]
        ]
      },
      "image": {
        "src": "/assets/guides/merchant-builds/merchant-builds.webp",
        "alt": "Merchant Cart, Axe Throwing, and Turret build overview",
        "caption": "Choose one route first; each build rewards a different combination of traits and supporting stats."
      }
    },
    {
      "id": "stats",
      "title": "Merchant stats and early priorities",
      "paragraphs": [
        "STR is the core stat. Raise it to roughly 70–90 before adding VIT; Axe Throwing and Turret players can add LUK when Critical contributes to their setup.",
        "Before investing heavily in Lv.25 forged gear, fill the Cart. The guide reports that Cart skills can exceed double damage after Cart weight passes 5,000."
      ],
      "bullets": [
        "Use Piamette for its stated 5% ASPD active bonus if it fits your account.",
        "For auto-farming, target monsters no more than ten levels above or five levels below your character.",
        "Do not spend early resources on gear that is replaced immediately if Cart weight gives a larger gain."
      ],
      "image": {
        "src": "/assets/guides/merchant-builds/merchant-stats.webp",
        "alt": "Merchant stat allocation focused on STR and supporting survivability"
      }
    },
    {
      "id": "progression",
      "title": "Level 40–69 trait and equipment route",
      "steps": [
        {"title": "Lv.40–54: form the second-job build", "text": "Forge or farm purple/orange traits. Combine the two build-specific traits with Battle Hardened or Solo Hunt. Build Master rewards can provide the core traits at the appropriate stages."},
        {"title": "Keep build costs focused", "text": "Axe Throwing wants ASPD and Critical. Turret investment should support summoned units rather than copying an Axe setup."},
        {"title": "Lv.55–69: prepare for advanced second job", "text": "Farm boss gear, materials, and cards. Water–Fire resonance is a practical damage route because Merchant has difficulty reaching 193 ASPD; prioritize damage increase and STR on Relics."}
      ],
      "image": {
        "src": "/assets/guides/merchant-builds/second-job-skills.webp",
        "alt": "Merchant second-job skill tree for planning build progression"
      }
    },
    {
      "id": "cards",
      "title": "Card priorities",
      "bullets": [
        "Stat cards: STR, Critical, physical ATK, VIT, and HP.",
        "Look for cards that combine multiple useful physical stats rather than chasing rarity alone.",
        "Size-modifier cards become especially relevant because Merchant already gains size-related support and can further amplify that category."
      ],
      "image": {
        "src": "/assets/guides/merchant-builds/kobold-card.webp",
        "alt": "Kobold card details for a physical Merchant build"
      }
    },
    {
      "id": "pve",
      "title": "Merchant PVE role and rotation",
      "paragraphs": [
        "Axe Throwing and Turret are the most practical dungeon options. Their burst is lower than some pure damage classes, but their sustained output is stable once the second-job traits are complete.",
        "Weapon Perfection is a major raid contribution. In larger ten-player content, correcting weapon-size penalties for several teammates can add more group value than Merchant's personal damage alone."
      ],
      "note": "The ideal build depends on your traits and party. Use the Skill Planner and Equipment Database before transferring expensive traits.",
      "image": {
        "src": "/assets/guides/merchant-builds/size-counter-chart.webp",
        "alt": "Weapon size modifier chart used when planning Merchant party utility",
        "caption": "Weapon Perfection matters most when party weapons would otherwise lose damage against the target's size."
      }
    }
  ],
  "faqs": [
    {"question": "What is the best Merchant stat in RTNW?", "answer": "STR is the primary stat, generally raised to about 70–90 before adding more VIT. Axe Throwing and Turret setups may add LUK for Critical."},
    {"question": "Which Merchant build is best for farming?", "answer": "The Cart build uses High Speed Cart Ram for continuous AoE and is presented as a convenient auto-farming option."},
    {"question": "Which Merchant build is best for PVE bosses?", "answer": "Axe Throwing or Turret provides stable dungeon damage, while Weapon Perfection adds valuable party-wide size correction."},
    {"question": "Why should I fill the Cart early?", "answer": "Cart skill damage scales with Cart weight and can more than double after the carried weight exceeds 5,000."}
  ],
  "related": [
    ["Whitesmith advanced guide", "/guides/whitesmith-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Refine simulator", "/sea/refine/"],
    ["Class tier list", "/guides/class-tier-list/"]
  ]
} satisfies SourceGuide;

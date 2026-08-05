import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "thief-builds",
  "title": "Ragnarok: The New World Thief Build Guide",
  "seoTitle": "RTNW Thief Build Guide: Dual Dagger, Katar & Venom",
  "description": "Compare Dual Dagger, Critical Katar, and Venom Assassin builds in Ragnarok: The New World, including stats, core traits, poison counters, cards, ASPD, and PVE choices.",
  "kicker": "Second Job Build Guide",
  "dek": "Build for rapid dual-dagger attacks, stealth Katar burst, or poison damage while understanding the cost and boss-resistance tradeoffs.",
  "category": "Classes and Builds",
  "heroImage": "https://cdnimages.awselbcombine.com/public_images/one_image/2026/07/178480863021452234.png",
  "heroAlt": "Ragnarok: The New World Assassin character in the desert",
  "sourceUrl": "https://forum.gnjoy.hk/forum/index.html?gameId=456&id=roseaforum#/post/106123",
  "sourceTitle": "Thief 2nd Job Guide: Master Thief Builds in 3 Minutes",
  "published": "2026-08-06",
  "modified": "2026-08-06",
  "readTime": "8 min read",
  "keywords": [
    "Ragnarok The New World Thief build",
    "RTNW Assassin build",
    "Dual Dagger Assassin RTNW",
    "Critical Katar build",
    "Venom Assassin guide"
  ],
  "quickFacts": [
    ["Role", "Melee burst DPS"],
    ["First job", "Dual dagger only"],
    ["Second-job builds", "Dual Dagger, Critical Katar, Venom"],
    ["PVE recommendation", "Dual Dagger in the supplied guide"],
    ["ASPD target", "193 for rapid builds"],
    ["Primary stats", "STR and AGI; LUK support"]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Thief and Assassin overview",
      "paragraphs": [
        "Thief is a high-burst melee class that rewards stealth, flanking, and target selection. First job uses dual daggers; Assassin opens Dual Dagger, Critical Katar, and Venom paths.",
        "The class has a high investment ceiling. Dual Dagger and Venom can equip two main weapons and therefore support four weapon traits, but developing both hands also costs more."
      ]
    },
    {
      "id": "builds",
      "title": "Assassin builds compared",
      "table": {
        "headers": ["Build", "Stats from the source", "Strength", "Limitation"],
        "rows": [
          ["Dual Dagger", "STR > AGI > LUK; example 70/70/30", "Rapid multi-hit damage, easier 193 ASPD, flexible neutral or poison attacks.", "Requires two developed weapons."],
          ["Critical Katar", "STR ≥ AGI > LUK", "Stealth into Sonic Blow control and powerful single-target PVP burst.", "Lower sustained ASPD than Dual Dagger."],
          ["Venom", "STR > AGI > LUK", "High ASPD and stable poison damage-over-time.", "Many current bosses resist Poison."]
        ]
      }
    },
    {
      "id": "traits",
      "title": "Core traits and skill changes",
      "bullets": [
        "Dual Dagger: Multi Stab, Rapid Stab, Weapon Master, and Poison Master.",
        "Critical Katar: Echo Slash, Extreme Sonic Blow, and Weapon Master.",
        "Venom: Poison Knife, Poison Blade Wound, Poison Master, and Weapon Master.",
        "For dungeon farming, the source suggests moving five Enhanced Hiding points to Enchant Poison on Dual Dagger so attacks can trigger poison and Poison Master."
      ]
    },
    {
      "id": "element",
      "title": "Understand Poison matchups",
      "paragraphs": [
        "The supplied guide states that Poison counters Earth, Fire, Water, and Wind. Poison is in turn countered by Poison, Holy, Shadow, and Undead targets.",
        "This makes Venom strong when the target allows poison but unreliable as a universal boss build. Always check the monster's attributes in the database or event guide."
      ]
    },
    {
      "id": "progression",
      "title": "Leveling, ASPD, and cards",
      "steps": [
        {"title": "Lv.1–40", "text": "Use dual daggers. Early weapon traits have limited second-job value; Piamette is the source's recommended 5% ASPD pet."},
        {"title": "Lv.40–54", "text": "Forge or farm the core traits for one Assassin path. Avoid splitting resources across Katar and two daggers before one setup works."},
        {"title": "Lv.55–69", "text": "Aim for Lv.3 Wind resonance for all-stat and ASPD bonuses. Relics can add AGI and DEX."}
      ],
      "bullets": [
        "Prioritize AGI and ASPD cards before reaching the target attack speed.",
        "Poison Spore supports poison damage; Kobold Archer supports normal-attack Critical damage.",
        "Atroce adds physical damage and an ASPD proc; Hunter Fly adds sustain; Boa can poison; Moonlight Flower improves movement."
      ]
    },
    {
      "id": "pve",
      "title": "Best PVE choice in the supplied guide",
      "paragraphs": [
        "Dual Dagger is the recommended general PVE setup. Fatal Stab has high damage, high hit count, and a short cooldown, and the build can switch between neutral and poison attacks.",
        "The source warns that several five-player and ten-player bosses use Undead or Shadow attributes and heavily reduce poison damage. For a simple boss loop, weave Fatal Stab between normal attacks."
      ]
    }
  ],
  "faqs": [
    {"question": "Which Assassin build is best for PVE in RTNW?", "answer": "The supplied guide recommends Dual Dagger because it reaches high ASPD more easily, uses Fatal Stab for sustained damage, and can switch between neutral and poison attacks."},
    {"question": "Which Assassin build is best for PVP?", "answer": "Critical Katar is the dedicated stealth-burst option, using Sonic Blow control followed by a high-damage combo."},
    {"question": "Why is Venom weaker against some bosses?", "answer": "Poison damage is resisted by Poison, Holy, Shadow, and Undead targets in the supplied guide, and several current dungeon bosses fall into resistant categories."},
    {"question": "What stats should Dual Dagger Assassin use?", "answer": "The source suggests STR > AGI > LUK, with an example of 70 STR, 70 AGI, and 30 LUK before completing the 193 ASPD target."}
  ],
  "related": [
    ["Skill Planner", "/sea/skill_planner/"],
    ["Monster database", "/sea/monster_album/"],
    ["Card database", "/sea/cards/"],
    ["Equipment database", "/sea/equipment/"],
    ["Class tier list", "/guides/class-tier-list/"]
  ]
} satisfies SourceGuide;

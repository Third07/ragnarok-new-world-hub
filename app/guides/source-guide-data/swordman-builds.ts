import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "swordman-builds",
  "title": "Ragnarok: The New World Swordsman Build Guide",
  "seoTitle": "RTNW Swordsman Build Guide: VIT Tank, AGI Sword & Spear",
  "description": "Build a VIT Tank, AGI Sword, or Spear Knight in Ragnarok: The New World with stats, traits, ASPD planning, defensive cards, leveling, aggro, and boss rotations.",
  "kicker": "Second Job Build Guide",
  "dek": "Start with the early-game tank role or invest in AGI Sword and Spear damage while preserving Knight's team utility.",
  "category": "Classes and Builds",
  "heroImage": "https://cdnimages.awselbcombine.com/public_images/one_image/2026/07/178513640608204542.png",
  "heroAlt": "Ragnarok: The New World Knight standing in the open world",
  "sourceUrl": "https://forum.gnjoy.hk/forum/index.html?gameId=456&id=roseaforum#/post/108124",
  "sourceTitle": "Swordman 2nd Job Guide: Master Swordman Builds in 3 Minutes",
  "published": "2026-08-06",
  "modified": "2026-08-06",
  "readTime": "8 min read",
  "keywords": [
    "Ragnarok The New World Swordsman build",
    "RTNW Knight tank build",
    "AGI Sword Knight",
    "Spear Knight PVP",
    "VIT Knight guide"
  ],
  "quickFacts": [
    ["Role", "Tank or melee physical DPS"],
    ["Beginner recommendation", "VIT Knight"],
    ["Damage builds", "AGI Sword and Spear"],
    ["Tank stats", "STR + VIT; source suggests 90 VIT first for light spenders"],
    ["AGI stats", "70 AGI, then STR and LUK"],
    ["ASPD goal", "193 later with stacked bonuses"]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Swordsman and Knight overview",
      "paragraphs": [
        "Swordsman is the early team cornerstone. The supplied guide recommends VIT Knight during early and mid-game dungeon progression because it combines damage reduction, healing, shields, resistance, aggro, and control.",
        "AGI Sword and Spear are damage alternatives, but they need more supporting traits and equipment before matching the immediate party value of a tank."
      ]
    },
    {
      "id": "builds",
      "title": "Knight builds compared",
      "table": {
        "headers": ["Build", "Stats from the source", "Purpose", "Key mechanics"],
        "rows": [
          ["VIT Tank", "STR + VIT; light spenders can raise VIT to 90 first", "Five- and ten-player PVE", "Counter Attack, Endure, Provoke, Increase HP Recovery, Phantom Sword, Burning Blood."],
          ["AGI Sword", "70 AGI, then STR and LUK", "Fast sustained melee damage", "Sword ASPD Boost, later Dual Blade Dance, Wind resonance, pet/card/Relic ASPD."],
          ["Spear Knight", "STR + VIT, later DEX", "PVP burst and durability", "Precise Strike and Destructive Charge traits; enough DEX to prevent key misses."]
        ]
      }
    },
    {
      "id": "progression",
      "title": "Early and mid-game equipment route",
      "steps": [
        {"title": "Before Lv.40", "text": "Split STR and AGI for faster open-world leveling. Gear is replaced quickly, and the second job may change your weapon type, so avoid overinvesting."},
        {"title": "Lv.40–54 tank traits", "text": "Choose Thorned Body for frequent automatic counterattacks or Boiling Blood for more recovery triggers. Elite Guard supports PVE; Opponent Resistance is a PVP option."},
        {"title": "Preserve damage traits", "text": "Keep Precise Strike and Destructive Charge for a later Spear setup. AGI Sword can use Sword ASPD Boost before Lv.55."},
        {"title": "Lv.55–69", "text": "Transfer useful traits into orange or kingdom gear. The fixed Thor's Edge can coexist with other traits, but duplicate traits do not stack."},
        {"title": "Complete ASPD support", "text": "Use Wind resonance, AGI/DEX Relics, suitable cards, and pet bonuses to progress toward 193 ASPD."}
      ]
    },
    {
      "id": "tank",
      "title": "VIT Knight boss rotation",
      "steps": [
        {"title": "Engage and turn the boss", "text": "Use Charge Attack, secure aggro, and face the boss away from the party so frontal attacks do not hit the backline."},
        {"title": "Maintain the simple sustain loop", "text": "Use normal attacks and heroic strikes for healing while automatic counters provide damage and mitigation."},
        {"title": "Shield predictable burst", "text": "Cast Burning Blood before full-screen, high-damage, or targeted boss attacks and coordinate with Priest shields."},
        {"title": "Recover lost aggro", "text": "Use Provoke immediately when a damage dealer pulls the boss."}
      ]
    },
    {
      "id": "cards",
      "title": "Defensive card planning",
      "paragraphs": [
        "A tank should not use one universal card page. Prepare damage-reduction sets for the relevant Element, Race, and Size, plus defensive conversion cards when they fit the encounter.",
        "Knight's low personal-damage requirement makes VIT Tank friendly to F2P and light-spending players during early and mid-game PVE."
      ]
    },
    {
      "id": "pvp",
      "title": "PVP notes",
      "bullets": [
        "Spear Knight needs enough DEX to land important skills.",
        "Provoke can protect the backline by slowing and reducing the damage of nearby enemies.",
        "AGI Sword's high attack speed becomes much stronger after the advanced trait package is complete.",
        "Do not switch away from tank if your regular dungeon group has no replacement frontline."
      ]
    }
  ],
  "faqs": [
    {"question": "Which Knight build is best for beginners?", "answer": "The supplied guide recommends VIT Knight because it is immediately useful in five- and ten-player dungeons and has a straightforward tank rotation."},
    {"question": "What stats should VIT Knight use?", "answer": "Use STR and VIT. The source suggests that light spenders can raise VIT to around 90 before adding more STR to maximize early durability."},
    {"question": "How does AGI Sword Knight reach 193 ASPD?", "answer": "Stack Sword ASPD Boost, later traits, Wind resonance, pets, cards, and AGI/DEX Relic stats."},
    {"question": "How should a Knight tank a boss?", "answer": "Engage with Charge Attack, turn the boss away from teammates, maintain aggro and healing, use Burning Blood for major attacks, and Provoke if aggro is lost."}
  ],
  "related": [
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Refine simulator", "/sea/refine/"],
    ["Acolyte build guide", "/guides/acolyte-builds/"]
  ]
} satisfies SourceGuide;

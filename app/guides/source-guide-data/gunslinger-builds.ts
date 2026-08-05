import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "gunslinger-builds",
  "title": "Ragnarok: The New World Gunslinger Build Guide",
  "seoTitle": "RTNW Gunslinger Build Guide: Pistol, Gatling, Rifle & Shotgun",
  "description": "Compare Pistol, Gatling Gun, Rifle, and Shotgun Gunslinger builds in RTNW, including ADL stats, weapon traits, leveling, cards, elemental bullets, and PVE rotations.",
  "kicker": "Second Job Build Guide",
  "dek": "Pick the right firearm for rapid normal attacks, mobile AoE, long-range burst, or PVP control—and avoid mixing incompatible weapon traits.",
  "category": "Classes and Builds",
  "heroImage": "https://cdnimages.awselbcombine.com/public_images/one_image/2026/07/178462975545132497.png",
  "heroAlt": "Ragnarok: The New World Gunslinger using firearms in combat",
  "sourceUrl": "https://forum.gnjoy.hk/forum/index.html?gameId=456&id=roseaforum#/post/105171",
  "sourceTitle": "Gunslinger 2nd Job Guide: Master Gunslinger Builds in 3 Minutes",
  "published": "2026-08-06",
  "modified": "2026-08-06",
  "readTime": "8 min read",
  "keywords": [
    "Ragnarok The New World Gunslinger build",
    "RTNW Gunslinger guide",
    "Pistol build RTNW",
    "Gatling Gun build",
    "Rifle Shotgun Rebel build"
  ],
  "quickFacts": [
    ["Damage", "Ranged physical"],
    ["Stats", "70 AGI / 70 DEX / 30 LUK"],
    ["First-job recommendation", "Pistol"],
    ["PVE recommendation", "Gatling Gun in the supplied guide"],
    ["Weapon types", "Pistol, Shotgun, Gatling, Rifle"],
    ["Element control", "Buy elemental bullets"]
  ],
  "sections": [
    {
      "id": "overview",
      "title": "Gunslinger class overview",
      "paragraphs": [
        "Gunslinger uses elemental bullets purchased with Adventure Coins to counter monsters, similar to Archer ammunition. Its defining difference is access to four weapon families with exclusive skills.",
        "Pistols and Shotguns are available at first job; Gatling Guns and Rifles unlock after the Rebel advancement. Because skills are weapon-restricted, one complete build cannot freely use every firearm."
      ]
    },
    {
      "id": "builds",
      "title": "Four weapon builds compared",
      "table": {
        "headers": ["Weapon", "Playstyle", "Content focus", "Important source skills or traits"],
        "rows": [
          ["Pistol", "Normal attacks plus repeated multi-hit AoE and mobility", "PVP and mobile general play", "Chain Action, Desperado, Platinum Altar, Fallen Angel, Return to Heaven."],
          ["Gatling Gun", "Very rapid normal attacks", "Single-target PVE", "Eternal Chain, Last Stand, Gatling Fever; later drone triggers."],
          ["Rifle", "Long-range skill burst", "Single-target PVE", "Tracking, Bull's Eye, Tranquil Mind, Mercury Bullet, Crimson Marker."],
          ["Shotgun", "Heavy AoE, burst, and control", "PVP and grouped enemies", "Spread Shot, Crowd Control Shot, Point-Blank Shot, Total Annihilation, Blazing Gunfire."]
        ]
      }
    },
    {
      "id": "stats",
      "title": "Stats and first-job route",
      "paragraphs": [
        "The source uses a classic ADL distribution of 70 AGI, 70 DEX, and 30 LUK for all four ranged physical variants. Gunslinger may not reach 193 ASPD easily, but double-hit and triple-shot effects still produce high attack frequency.",
        "Pistol is the recommended first-job weapon. Chain Action, Desperado, and Platinum Altar form a complete early loop, and Desperado remains central to the later Pistol AGI setup."
      ]
    },
    {
      "id": "progression",
      "title": "Leveling and trait investment",
      "steps": [
        {"title": "Lv.1–40: preserve useful Pistol traits", "text": "The source notes that Lv.25 Gunslinger traits can remain relevant at Lv.40 and Lv.55. Chain Barrage and Sacrifice are early Pistol targets; Shotgun players can delay crafting if the available early traits do not fit."},
        {"title": "Lv.40–54: build one weapon first", "text": "Pistol wants Return to Heaven; Rifle wants Tranquil Mind, Mercury Bullet, and Crimson Marker; Shotgun wants Point-Blank Shot, Total Annihilation, and Blazing Gunfire."},
        {"title": "Keep duplicate slots", "text": "PVE and PVP firearm sets use different traits. Do not dismantle duplicate weapons or accessories until both intended builds are planned."},
        {"title": "Lv.55–69: prepare two sets only when affordable", "text": "Farm boss gear and materials. The source recommends Water or Wind resonance for damage and Fire resonance for PVP."}
      ]
    },
    {
      "id": "cards",
      "title": "Card and element priorities",
      "bullets": [
        "Stat cards: AGI, DEX, LUK, Critical, Critical DMG, ASPD, ATK, and Hit.",
        "Hunter Fly adds normal-attack healing and can improve sustain.",
        "Atroce offers physical damage and a chance-based ASPD effect; Kobold Archer supports normal-attack Critical damage.",
        "Because bullets can change attack element, general physical, Critical, and target-category cards may be more flexible than permanent elemental cards."
      ]
    },
    {
      "id": "pve",
      "title": "PVE rotations by weapon",
      "bullets": [
        "Gatling: activate Last Stand and rely on rapid normal attacks; advanced second job adds a normal-attack-triggered drone.",
        "Pistol: cast Platinum Altar, use Fallen Angel for movement and its damage window, then repeat Desperado.",
        "Shotgun: combine Spread Shot and first-job Crowd Control Shot for area damage and control.",
        "Rifle: maintain distance and combine Bull's Eye with Tracking for high single-target damage."
      ]
    }
  ],
  "faqs": [
    {"question": "Which Gunslinger weapon is best for PVE?", "answer": "The supplied guide recommends Gatling Gun for stable single-target boss damage, while Rifle is another long-range burst option."},
    {"question": "Which Gunslinger build is best for PVP?", "answer": "Pistol offers mobility and repeated multi-hit AoE, while Shotgun adds burst, slows, disarm, armor break, and stun after its traits are assembled."},
    {"question": "What stats should Gunslinger use?", "answer": "The source recommends 70 AGI, 70 DEX, and 30 LUK as a general ADL foundation."},
    {"question": "Do Gunslinger builds share gear?", "answer": "Not completely. Weapon-restricted skills and different PVE/PVP traits mean developed accounts may need separate weapon and accessory sets."}
  ],
  "related": [
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Monster database", "/sea/monster_album/"],
    ["Archer build guide", "/guides/archer-builds/"]
  ]
} satisfies SourceGuide;

import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "gunslinger-builds",
  "title": "Ragnarok: The New World Gunslinger Build Guide",
  "seoTitle": "RTNW Gunslinger Builds: Pistol, Gatling, Rifle & Shotgun",
  "description": "Compare Pistol, Gatling, Rifle, and Shotgun Gunslinger builds in RTNW with ADL stats, weapon traits, cards, elemental bullets, leveling, and PvE rotations.",
  "kicker": "Second Job Build Guide",
  "dek": "Pick the right firearm for rapid normal attacks, mobile AoE, long-range burst, or PVP control—and avoid mixing incompatible weapon traits.",
  "category": "Classes and Builds",
  "heroImage": "/assets/guides/gunslinger-builds/gunslinger-hero.webp",
  "heroAlt": "Ragnarok: The New World Gunslinger using firearms in combat",
  "published": "2026-08-06",
  "modified": "2026-08-08",
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
    ["PVE recommendation", "Gatling Gun for steady boss damage"],
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
        "headers": ["Weapon", "Playstyle", "Content focus", "Important skills or traits"],
        "rows": [
          ["Pistol", "Normal attacks plus repeated multi-hit AoE and mobility", "PVP and mobile general play", "Chain Action, Desperado, Platinum Altar, Fallen Angel, Return to Heaven."],
          ["Gatling Gun", "Very rapid normal attacks", "Single-target PVE", "Eternal Chain, Last Stand, Gatling Fever; later drone triggers."],
          ["Rifle", "Long-range skill burst", "Single-target PVE", "Tracking, Bull's Eye, Tranquil Mind, Mercury Bullet, Crimson Marker."],
          ["Shotgun", "Heavy AoE, burst, and control", "PVP and grouped enemies", "Spread Shot, Crowd Control Shot, Point-Blank Shot, Total Annihilation, Blazing Gunfire."]
        ]
      },
      "image": {
        "src": "/assets/guides/gunslinger-builds/gunslinger-builds.webp",
        "alt": "Gunslinger firearm build overview comparing four weapon routes",
        "caption": "Weapon-restricted skills make the firearm choice the first major build decision."
      }
    },
    {
      "id": "stats",
      "title": "Stats and first-job route",
      "paragraphs": [
        "Use a classic ADL foundation of 70 AGI, 70 DEX, and 30 LUK for the four ranged physical variants. Gunslinger may not reach 193 ASPD easily, but double-hit and triple-shot effects still produce high attack frequency.",
        "Pistol is the recommended first-job weapon. Chain Action, Desperado, and Platinum Altar form a complete early loop, and Desperado remains central to the later Pistol AGI setup."
      ],
      "image": {
        "src": "/assets/guides/gunslinger-builds/gunslinger-stats.webp",
        "alt": "Gunslinger stat allocation focused on AGI, DEX, and LUK"
      }
    },
    {
      "id": "progression",
      "title": "Leveling and trait investment",
      "steps": [
        {"title": "Lv.1–40: preserve useful Pistol traits", "text": "Lv.25 Gunslinger traits can remain relevant at Lv.40 and Lv.55. Chain Barrage and Sacrifice are early Pistol targets; Shotgun players can delay crafting if the available early traits do not fit."},
        {"title": "Lv.40–54: build one weapon first", "text": "Pistol wants Return to Heaven; Rifle wants Tranquil Mind, Mercury Bullet, and Crimson Marker; Shotgun wants Point-Blank Shot, Total Annihilation, and Blazing Gunfire."},
        {"title": "Keep duplicate slots", "text": "PVE and PVP firearm sets use different traits. Do not dismantle duplicate weapons or accessories until both intended builds are planned."},
        {"title": "Lv.55–69: prepare two sets only when affordable", "text": "Farm boss gear and materials. Use Water or Wind resonance for damage and Fire resonance for PVP."}
      ],
      "image": {
        "src": "/assets/guides/gunslinger-builds/second-job-skills.webp",
        "alt": "Gunslinger second-job skill tree used to plan firearm specialization"
      }
    },
    {
      "id": "cards",
      "title": "Card and element priorities",
      "bullets": [
        "Stat cards: AGI, DEX, LUK, Critical, Critical DMG, ASPD, ATK, and Hit.",
        "Hunter Fly adds normal-attack healing and can improve sustain.",
        "Atroce offers physical damage and a chance-based ASPD effect; Kobold Archer supports normal-attack Critical damage.",
        "Because bullets can change attack element, general physical, Critical, and target-category cards may be more flexible than permanent elemental cards."
      ],
      "image": {
        "src": "/assets/guides/gunslinger-builds/elemental-bullets.webp",
        "alt": "Elemental bullet options for countering monster attributes"
      }
    },
    {
      "id": "pve",
      "title": "PVE rotations by weapon",
      "bullets": [
        "Gatling: activate Last Stand and rely on rapid normal attacks; advanced second job adds a normal-attack-triggered drone.",
        "Pistol: cast Platinum Altar, use Fallen Angel for movement and its damage window, then repeat Desperado.",
        "Shotgun: combine Spread Shot and first-job Crowd Control Shot for area damage and control.",
        "Rifle: maintain distance and combine Bull's Eye with Tracking for high single-target damage."
      ],
      "image": {
        "src": "/assets/guides/gunslinger-builds/desperado-skill.webp",
        "alt": "Gunslinger using the Desperado skill during combat",
        "caption": "Pistol builds use Desperado as a repeatable multi-hit area attack."
      }
    }
  ],
  "faqs": [
    {"question": "Which Gunslinger weapon is best for PVE?", "answer": "Gatling Gun provides stable single-target boss damage, while Rifle is another long-range burst option."},
    {"question": "Which Gunslinger build is best for PVP?", "answer": "Pistol offers mobility and repeated multi-hit AoE, while Shotgun adds burst, slows, disarm, armor break, and stun after its traits are assembled."},
    {"question": "What stats should Gunslinger use?", "answer": "Use 70 AGI, 70 DEX, and 30 LUK as a general ADL foundation."},
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

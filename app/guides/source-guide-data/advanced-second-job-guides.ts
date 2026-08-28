import type { SourceGuide } from "../SourceGuidePage";

export const lordKnightGuide = {
  slug: "lord-knight-builds",
  title: "Ragnarok: The New World Lord Knight Build Guide",
  seoTitle: "Lord Knight Builds: Tank, AGI & Spear | Ragnarok New World",
  description: "Compare Ragnarok: The New World Lord Knight tank, AGI sword, and spear builds: stats, skills, cards, upgrade order, and fixes for damage or survivability.",
  kicker: "Advanced Second-Job Guide",
  dek: "Turn the established Knight paths into complete level-70 builds: a safer permanent tank, rapid AGI Sword pressure, or heavy-weapon Spear burst.",
  category: "Classes and Builds",
  heroImage: "/assets/guides/lord-knight-builds/lord-knight-hero.webp",
  heroAlt: "Lord Knight build selection showing Tank Knight, AGI Knight, and Spear Knight paths",
  published: "2026-08-08",
  modified: "2026-08-28",
  quickAnswer: "Choose VIT Tank when your party needs a frontline, AGI Sword for sustained melee play, or Spear for a burst-focused setup. Keep a working weapon and trait package while preparing the next build; a higher item level is not a complete upgrade by itself.",
  reviewNote: "August 28 update: clearer build choices and checks against the Skill Planner reference descriptions. This is not a new live-server DPS benchmark.",
  dataSources: [{ label: "Imported Lord Knight skill descriptions", href: "/sea/skill-simulator/data/jobs_en-US/213.json" }, { label: "Compare skill levels in the Skill Planner", href: "/sea/skill_planner/" }],
  readTime: "9 min read",
  keywords: [
    "Ragnarok The New World Lord Knight build",
    "RTNW Lord Knight",
    "Lord Knight tank build",
    "Lord Knight AGI Sword build",
    "Lord Knight Spear build",
  ],
  quickFacts: [
    ["Advanced job", "Knight → Lord Knight"],
    ["Tank stats", "VIT first, then STR"],
    ["AGI Sword stats", "AGI, then STR and LUK"],
    ["Spear stats", "STR, then VIT or DEX"],
    ["Tank resonance", "Earth + Holy"],
    ["Damage resonance", "Wind + Water for AGI; Fire + Water for Spear"],
  ],
  sections: [
    {
      id: "roles",
      title: "What changes after becoming Lord Knight",
      paragraphs: [
        "Lord Knight strengthens all three Knight identities instead of replacing them. Tank remains the dependable dungeon frontline, AGI Sword receives stronger basic-attack links, and Spear finally gains the active burst tools needed to threaten targets in PVP.",
        "The largest playstyle change belongs to Spear. Tank and AGI Sword mostly keep their familiar rotations while adding safer buffs and automatic follow-up damage.",
      ],
      table: {
        headers: ["Build", "Primary job", "Stat direction", "First priority"],
        rows: [
          ["VIT Tank", "Main tank for group PVE", "VIT → STR", "Durability, aggro, and Wrath Release"],
          ["AGI Sword", "Sustained melee and farming", "AGI → STR → LUK", "193 ASPD support and sword-aura triggers"],
          ["Spear", "PVP engage and burst", "STR → VIT/DEX", "Clashing Spiral and Joint Beat setup"],
        ],
      },
    },
    {
      id: "skills",
      title: "Lord Knight skills and point priorities",
      paragraphs: [
        "AGI Sword should secure Aura Blade and Concentration before investing deeply in Traumatic Blow. The goal is to make fast basic attacks carry additional effects instead of relying on a long manual rotation.",
        "Spear should prioritize Joint Beat and Clashing Spiral, then add the general damage buffs. Joint Beat prepares the target with Fracture while Clashing Spiral converts weapon weight into a hard single-target burst.",
        "Tank can take the same broad buffs as AGI Sword, add Parrying, and reserve a point for Berserk so the Wrath Release equipment trait can reshape it into a sustainable defensive buff.",
      ],
      image: {
        src: "/assets/guides/lord-knight-builds/clashing-spiral.webp",
        alt: "Clashing Spiral Lord Knight skill details",
        caption: "Clashing Spiral scales partly from weapon weight, so compare heavy two-handed Spears instead of judging only their listed ATK.",
        compact: true,
      },
    },
    {
      id: "traits",
      title: "Equipment traits and Rune Engine",
      bullets: [
        "Tank: start with Wrath Release, then add Fearless Act and Dual Blade Dance. Use level-3 Earth and Holy Resonance for shielding, healing, and survival.",
        "AGI Sword: Surging Sword Aura is the build-defining weapon trait. Add Rending Wound and Sharp Aura, then use Wind and Water Resonance.",
        "Spear: Maelstrom Glaive ties the build together through automatic Joint Beat pressure. Rapid Spiral and Ruthless Hunt complete the burst package. Use Fire and Water Resonance.",
        "Level-70 gear opens a new trait pool, so plan reforging costs before replacing a working level-55 or level-60 setup.",
      ],
      image: {
        src: "/assets/guides/lord-knight-builds/aura-blade.webp",
        alt: "Aura Blade support skill for Lord Knight",
        compact: true,
      },
    },
    {
      id: "cards",
      title: "Card plan for each Lord Knight build",
      paragraphs: [
        "Keep a universal set of race, element, and size modifiers for encounter swapping. Tank then favors Max HP, VIT, DEF, and MDEF; AGI Sword wants AGI, CRIT, ASPD, and physical damage; Spear values STR, ATK, physical damage, and enough accuracy for its target.",
        "Match elemental cards to the skills you actually use. Aura Blade's additional hit and Clashing Spiral are labeled Neutral in the imported data, so do not assume a Fire-damage card improves the whole Lord Knight kit.",
      ],
    },
    {
      id: "rotation",
      title: "Practical Lord Knight rotations",
      steps: [
        { title: "Tank", text: "Open with charge and Provoke, turn the boss away from the group, maintain mitigation, and use the reshaped Berserk buff before dangerous phases." },
        { title: "AGI Sword", text: "Maintain Aura Blade and Concentration, keep basic attacks flowing, and let attack-linked traits trigger Traumatic Blow and sword-aura damage." },
        { title: "Spear", text: "Charge into range, apply Joint Beat or its automatic trait trigger, then use Clashing Spiral while the target is fractured." },
      ],
      image: {
        src: "/assets/guides/lord-knight-builds/joint-beat.webp",
        alt: "Joint Beat skill used in the Lord Knight Spear combo",
        compact: true,
      },
    },
    {
      "id": "upgrade-order",
      "title": "What to upgrade first on a limited budget",
      "steps": [
        {
          "title": "Choose the job you must perform",
          "text": "A tank upgrade should improve survival or reliable threat. A damage upgrade should improve the attacks you actually use. Judge a candidate against that role before comparing its displayed power."
        },
        {
          "title": "Keep the build-defining trait",
          "text": "Compare the complete old and new weapon setup, including traits, card slots, and refine investment. Do not replace a functioning sword-aura or Spear combination with an unfinished higher-level piece."
        },
        {
          "title": "Check the finished build in the planner",
          "text": "Spend prerequisite points before adding optional damage or utility skills. Keep separate Tank, AGI Sword, and Spear plans so you can see what each swap really costs."
        }
      ]
    },
    {
      "id": "damage-checks",
      "title": "Lord Knight damage and tanking checks",
      "table": {
        "headers": [
          "Problem",
          "Check first",
          "Useful comparison"
        ],
        "rows": [
          [
            "The tank survives, but the party does not",
            "Boss facing, target control, and mitigation timing",
            "Watch the next dangerous mechanic rather than only your HP bar."
          ],
          [
            "AGI Sword feels weaker after an upgrade",
            "Aura Blade uptime and the required attack-linked traits",
            "Compare sustained attacks with the same buffs and target."
          ],
          [
            "Spear damage barely changes with a new weapon",
            "Weapon weight, ATK, and the Clashing Spiral description",
            "Compare the full weapon package; weight is only one part of its formula."
          ],
          [
            "An elemental card gives little improvement",
            "The element of each damaging skill and additional hit",
            "Aura Blade's extra hit and Clashing Spiral are labeled Neutral in the imported skill data."
          ]
        ]
      },
      "note": "These are diagnostic checks, not a live-server damage ranking. Test one change at a time before spending rare materials."
    },
  ],
  faqs: [
    {"question":"Should an F2P Lord Knight build Tank and Spear at the same time?","answer":"Finish the role your regular content needs first. A second build becomes more practical when you can preserve the first weapon, traits, and cards instead of dismantling them to fund a partial replacement."},
    { question: "Which Lord Knight build is best for group PVE?", answer: "VIT Tank remains the safest group-PVE choice because it provides the frontline, aggro control, and defensive margin that parties consistently need." },
    { question: "Which weapon is best for Clashing Spiral?", answer: "Compare two-handed Spears by weight as well as ATK and traits. Clashing Spiral receives an extra multiplier from weapon weight, so the heaviest suitable weapon can outperform a lighter option." },
    { question: "What is the best Rune Engine for AGI Lord Knight?", answer: "Wind plus Water is the practical AGI Sword combination: Wind supports ASPD and action speed, while Water adds damage and defense ignore." },
    { question: "Should Lord Knight keep old equipment traits?", answer: "Keep a strong old piece until the replacement has the required level-70 core trait. A higher item level alone does not compensate for losing the mechanic that makes the build work." },
  ],
  related: [
    ["Knight build guide", "/guides/swordman-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Class guides", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;
export const nightWalkerGuide = {
  slug: "night-walker-builds",
  title: "Ragnarok: The New World Night Walker Build Guide",
  seoTitle: "RTNW Night Walker Builds: Pistol, Machine Gun, Rifle & Shotgun",
  description: "Plan a Night Walker Pistol, Machine Gun, Rifle, or Shotgun build with advanced second-job skills, AGI and DEX priorities, equipment traits, runes, cards, and combat rotations.",
  kicker: "Advanced Second-Job Guide",
  dek: "Keep each firearm focused: mobile Pistol AOE, relentless Machine Gun attacks, Rifle burst, or Shotgun control.",
  category: "Classes and Builds",
  heroImage: "/assets/guides/night-walker-builds/night-walker-hero.webp",
  heroAlt: "Night Walker build selection showing Gunslinger weapon paths",
  published: "2026-08-08",
  modified: "2026-08-08",
  readTime: "10 min read",
  keywords: ["Ragnarok The New World Night Walker build", "RTNW Night Walker", "Night Walker Pistol build", "Night Walker Rifle build", "Night Walker Machine Gun build"],
  quickFacts: [
    ["Advanced job", "Gunslinger → Night Walker"],
    ["Recommended first build", "AGI Pistol"],
    ["PVE alternatives", "Machine Gun or Rifle"],
    ["PVP control", "Shotgun"],
    ["Speed resonance", "Wind + Water"],
    ["Burst resonance", "Water + Fire"],
  ],
  sections: [
    {
      id: "builds",
      title: "Night Walker firearm builds compared",
      table: {
        headers: ["Weapon", "Main use", "Stat direction", "Core advanced skills"],
        rows: [
          ["Pistol", "Farming, PVP, flexible PVE", "AGI → DEX", "Fire Dance, Rapid Shower, Auto Grenade Launcher"],
          ["Machine Gun", "Stable boss damage", "AGI to attack cap → DEX", "Rapid Shower, Auto Grenade Launcher, Focused Aim"],
          ["Rifle", "Skill burst and bosses", "DEX for cast time → AGI", "Unique Bullet, Spiral Shot, God's Hammer"],
          ["Shotgun", "PVP burst and control", "AGI + DEX", "Wildfire, Rapid Shower, Focused Aim"],
        ],
      },
      paragraphs: [
        "Night Walker has more advanced-job skills than most classes because every firearm needs its own payoff. Avoid mixing weapon-exclusive skills: choose the firearm first, then spend only on the package that supports it.",
      ],
    },
    {
      id: "pistol",
      title: "Pistol and Machine Gun priorities",
      paragraphs: [
        "Pistol begins with Fire Dance, then adds Rapid Shower and Auto Grenade Launcher. Fire Dance upgrades the familiar Desperado playstyle into a faster, wider AOE rotation suitable for daily farming and group fights.",
        "Machine Gun stays simpler. Maintain its buffs, reach the attack-frequency cap, and let basic attacks plus drone-linked effects carry sustained PVE damage.",
      ],
      image: {
        src: "/assets/guides/night-walker-builds/fire-dance.webp",
        alt: "Fire Dance skill for the Night Walker Pistol build",
        compact: true,
      },
    },
    {
      id: "rifle-shotgun",
      title: "Rifle and Shotgun priorities",
      paragraphs: [
        "Rifle should combine Unique Bullet with Focused Aim, then add Spiral Shot and God's Hammer for high-damage PVE windows. Use Spiral Shot when multiple targets matter and Unique Bullet for focused single-target pressure.",
        "Shotgun is the close-range PVP option. Wildfire and Full Firepower form its main burst sequence, while its equipment traits add the control needed to survive at short range.",
      ],
      image: {
        src: "/assets/guides/night-walker-builds/unique-bullet.webp",
        alt: "Unique Bullet skill for the Night Walker Rifle build",
        compact: true,
      },
    },
    {
      id: "traits",
      title: "Equipment traits and Rune Engine",
      bullets: [
        "Pistol: Hunting Dance first, followed by Speed Dance and Advanced AI Drone. Auto Grenade Launcher needs Advanced AI Drone to function for Pistol.",
        "Machine Gun: Drone Frenzy, Resonance Frenzy, and Concussion Grenade form the main package; pure PVE players can retain Rapid Warm-Up instead of extra control.",
        "Rifle: Lethal Beat and Celestial Unity are the key interaction. Add Ace in Play, or Mercury Bullet when Tracking still supplies a meaningful part of the rotation.",
        "Shotgun: Flame Apostle and Shattering Blaze are mandatory; Point-Blank Shot is a useful third trait for PVP control.",
      ],
      image: {
        src: "/assets/guides/night-walker-builds/auto-grenade-launcher.webp",
        alt: "Auto Grenade Launcher skill used by Night Walker firearm builds",
        compact: true,
      },
    },
    {
      id: "cards",
      title: "Night Walker cards and investment order",
      paragraphs: [
        "Start with race, element, and size modifiers, then build the firearm's stat package. AGI and ASPD are especially valuable because Gunslinger receives less built-in attack speed than several other rapid-attack classes. Add DEX, ATK, LUK, CRIT, CRIT damage, and physical damage as the build requires.",
        "Pistol is the most efficient first investment because it covers farming, GVG, and early PVE. Develop Rifle or Machine Gun second when difficult bosses demand a dedicated dungeon setup.",
      ],
    },
  ],
  faqs: [
    { question: "What is the best first Night Walker build?", answer: "AGI Pistol is the most flexible first build because its mobile AOE works in farming, PVP, GVG, and much of early PVE." },
    { question: "Which Night Walker build is best for bosses?", answer: "Rifle offers high skill burst, while Machine Gun provides steadier sustained damage. Choose based on whether the encounter rewards burst windows or continuous uptime." },
    { question: "Does Pistol need Advanced AI Drone?", answer: "Yes if you want Auto Grenade Launcher to work with Pistol. Until that trait is equipped, use another reliable buff such as Focused Aim." },
    { question: "What stats does Night Walker use?", answer: "Every firearm uses AGI and DEX, but the order changes: Pistol and Machine Gun prioritize speed, Rifle first solves cast time with DEX, and Shotgun balances both." },
  ],
  related: [
    ["Gunslinger build guide", "/guides/gunslinger-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Class guides", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;

export const whitesmithGuide = {
  slug: "whitesmith-builds",
  title: "Ragnarok: The New World Whitesmith Build Guide",
  seoTitle: "RTNW Whitesmith Builds: Axe, Turret & Cart",
  description: "Build an advanced second-job Whitesmith for Axe damage, Turret summons, or Cart farming with skills, stats, equipment traits, Rune Engine choices, cards, and party buffs.",
  kicker: "Advanced Second-Job Guide",
  dek: "Whitesmith completes Merchant's damage kit while preserving two of the best party-speed and weapon-size buffs.",
  category: "Classes and Builds",
  heroImage: "/assets/guides/whitesmith-builds/whitesmith-hero.webp",
  heroAlt: "Whitesmith build selection showing Cart, Axe, and Turret paths",
  published: "2026-08-08",
  modified: "2026-08-08",
  readTime: "8 min read",
  keywords: ["Ragnarok The New World Whitesmith build", "RTNW Whitesmith", "Whitesmith Axe build", "Whitesmith Turret build", "Whitesmith Cart build"],
  quickFacts: [
    ["Advanced job", "Merchant → Whitesmith"],
    ["PVE damage", "Axe or Turret"],
    ["Farming option", "Cart"],
    ["Shared mandatory skills", "Heavy Weaponry Research + Adrenaline Rush"],
    ["Recommended resonance", "Fire + Water"],
    ["Party value", "ASPD and Weapon Perfection buffs"],
  ],
  sections: [
    {
      id: "overview",
      title: "Whitesmith roles after the advanced job change",
      paragraphs: [
        "Whitesmith keeps Merchant's hybrid identity: respectable damage, off-tank durability, summoned support, and valuable party buffs. Heavy Weaponry Research improves the character directly, while Adrenaline Rush supplies a party-wide speed increase.",
        "Axe and Turret are the better long-term PVE routes. Cart remains useful for movement and AOE farming but usually produces less value in difficult group content.",
      ],
      image: {
        src: "/assets/guides/whitesmith-builds/adrenaline-rush.webp",
        alt: "Adrenaline Rush party attack-speed buff for Whitesmith",
        compact: true,
      },
    },
    {
      id: "stats",
      title: "Whitesmith stats and skills",
      table: {
        headers: ["Build", "Stat direction", "Advanced skills", "Best use"],
        rows: [
          ["Axe", "STR → VIT → DEX/LUK", "Axe Hurricane, Heavy Weaponry Research, Adrenaline Rush", "Stable melee PVE"],
          ["Turret", "AGI → STR", "FAW Magic Decoy, Construction Mastery", "Safe sustained summon damage"],
          ["Cart", "AGI → STR", "Cart Boost plus shared buffs", "Daily farming and mobility"],
        ],
      },
      image: {
        src: "/assets/guides/whitesmith-builds/axe-hurricane.webp",
        alt: "Axe Hurricane Whitesmith damage skill",
        compact: true,
      },
    },
    {
      id: "traits",
      title: "Whitesmith equipment traits",
      bullets: [
        "Axe: Crit Spin automates the flying axe, while Axe Surge shortens the main damage cycle. Use Extreme Acceleration, Ultimate Destruction, or Capable Assistant for the third slot.",
        "Turret: Summon Enhance and Auto Missile are the advanced core. Retain Summoned Count from the earlier trait pool because direct player buffs often do not affect summons.",
        "Cart: Cart Fury and Berserk Cart are the core pair. Finish with Ultimate Destruction or Extreme Acceleration rather than overinvesting in a weaker assistant bonus.",
        "Use Fire and Water Resonance to maximize raw damage and defense ignore. The class's automated attacks reduce the value of building entirely around Wind Resonance.",
      ],
      image: {
        src: "/assets/guides/whitesmith-builds/faw-magic-decoy.webp",
        alt: "FAW Magic Decoy summon skill for the Whitesmith Turret build",
        compact: true,
      },
    },
    {
      id: "cards",
      title: "Whitesmith card priorities",
      paragraphs: [
        "Build the usual race, element, and size swap set first. For general stats, prioritize STR, VIT, ATK, HP, physical damage, and melee physical damage. Cards combining several of those stats are especially efficient.",
        "Whitesmith does not need an expensive permanent elemental-card collection for every situation. Use the correct elemental converter for the boss, then rely on Weapon Perfection and encounter-specific modifiers.",
      ],
    },
    {
      id: "gameplay",
      title: "How to use Whitesmith in a party",
      steps: [
        { title: "Maintain party buffs", text: "Keep Adrenaline Rush and Weapon Perfection available for teammates before entering the main damage cycle." },
        { title: "Commit to one damage engine", text: "Axe stays in melee range and loops Hurricane effects; Turret establishes summons and protects their uptime; Cart uses mobility and AOE for farming." },
        { title: "Reposition early", text: "Whitesmith damage is steady rather than explosive, so moving before a mechanic begins protects more total uptime than chasing one final hit." },
      ],
    },
  ],
  faqs: [
    { question: "Which Whitesmith build is best for PVE?", answer: "Axe and Turret are the strongest general PVE options. Axe offers active sustained damage, while Turret is safer and easier to keep attacking during mechanics." },
    { question: "Is Cart Whitesmith worth building?", answer: "Cart is useful for daily farming and mobility, but it is normally a lower priority than Axe or Turret for raids and difficult bosses." },
    { question: "What are the mandatory Whitesmith skills?", answer: "Heavy Weaponry Research and Adrenaline Rush benefit every build. Then add Axe Hurricane and Cart Boost for their paths, or FAW Magic Decoy and Construction Mastery for Turret." },
    { question: "What Rune Engine should Whitesmith use?", answer: "Fire plus Water is the straightforward damage setup, adding burst, skill damage, and defense ignore without relying on the character's own attack speed for every damage source." },
  ],
  related: [
    ["Merchant build guide", "/guides/merchant-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Class guides", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;

export const highWizardGuide = {
  slug: "high-wizard-builds",
  title: "Ragnarok: The New World High Wizard Build Guide",
  seoTitle: "High Wizard Builds: Fire, Ice & Ghost | Ragnarok New World",
  description: "Choose a Ragnarok: The New World High Wizard build with Fire, Ice, or Ghost skills, INT/DEX priorities, cast-time and SP checks, cards, and upgrade advice.",
  kicker: "Advanced Second-Job Guide",
  dek: "Strengthen the two established elemental paths or move into the new Ghost Wizard single-target and control build.",
  category: "Classes and Builds",
  heroImage: "/assets/guides/mage-builds/mage-hero.webp",
  heroAlt: "High Wizard casting advanced elemental magic",
  published: "2026-08-08",
  modified: "2026-08-28",
  quickAnswer: "Continue the element supported by your current weapon, traits, and cards before funding a full switch. Fire–Earth and Ice–Lightning remain established routes; Ghost centers on Napalm Vulcan and Gravitational Field. For bosses, check cast uptime and SP use as well as the largest damage number.",
  reviewNote: "August 28 update: clearer build choices and checks against the Skill Planner reference descriptions. This is not a new live-server DPS benchmark.",
  dataSources: [{ label: "Imported High Wizard skill descriptions", href: "/sea/skill-simulator/data/jobs_en-US/313.json" }, { label: "Compare skill levels in the Skill Planner", href: "/sea/skill_planner/" }],
  readTime: "9 min read",
  keywords: ["Ragnarok The New World High Wizard build", "RTNW High Wizard", "Ghost Wizard build", "High Wizard Fire Earth build", "High Wizard Ice Lightning build"],
  quickFacts: [
    ["Advanced job", "Wizard → High Wizard"],
    ["Shared stat direction", "INT first, then DEX"],
    ["Established builds", "Fire–Earth and Ice–Lightning"],
    ["New build", "Ghost Wizard"],
    ["Shared skills", "Soul Drain + Mystical Amplification"],
    ["Damage resonance", "Water + Fire"],
  ],
  sections: [
    {
      id: "builds",
      title: "High Wizard builds compared",
      table: {
        headers: ["Build", "Damage profile", "Advanced skills", "Best use"],
        rows: [
          ["Fire–Earth", "AOE burst, burn, control", "Flame Mastery, Sienna Execrate", "Farming and area pressure"],
          ["Ice–Lightning", "Elemental AOE and control", "Frost Mastery, Storm Mastery", "PVE and controlled group fights"],
          ["Ghost", "Single-target pressure plus AOE", "Napalm Vulcan, Gravitational Field", "Boss damage and PVP control"],
        ],
      },
      paragraphs: [
        "Every High Wizard starts with Soul Drain and Mystical Amplification. Soul Drain supports SP recovery on kills, while Mystical Amplification provides a timed damage and variable-cast-time buff. Their conditions matter: neither guarantees uninterrupted casting in every encounter.",
      ],
      image: {
        src: "/assets/guides/high-wizard-builds/mystical-amplification.webp",
        alt: "Mystical Amplification universal High Wizard buff",
        compact: true,
      },
    },
    {
      id: "elements",
      title: "Fire–Earth and Ice–Lightning priorities",
      paragraphs: [
        "Fire–Earth should retain Massive Meteorite from the earlier trait pool, then add Meteor Acceleration and Deep Burn. Sienna Execrate adds repeatable Earth damage and control without changing the familiar Meteor rotation.",
        "Ice–Lightning has more good traits than available slots. Surging Current is the first Wind choice, followed by the best combination of Charging Storm, Biting Frost, and Polar Blizzard for the content you play most.",
      ],
    },
    {
      id: "ghost",
      title: "Ghost Wizard skill loop",
      paragraphs: [
        "Napalm Vulcan is the fast, lock-on spell that fills the gaps in the rotation. Gravitational Field supplies the large AOE payoff and gains sustained damage and soft control after its trait package is complete.",
        "Because Ghost has fewer dedicated earlier-job damage skills, it can spend otherwise mandatory points on Quagmire, Frost Nova, and Storm Gust. That gives the build a deep control kit without sacrificing its two main Ghost attacks.",
      ],
      image: {
        src: "/assets/guides/high-wizard-builds/gravitational-field.webp",
        alt: "Gravitational Field AOE skill for Ghost High Wizard",
        compact: true,
      },
    },
    {
      id: "traits-runes",
      title: "Traits, Rune Engine, and cast planning",
      bullets: [
        "Solve Variable Cast Time before stacking small damage bonuses; a spell that lands on time is worth more than a stronger spell interrupted by mechanics.",
        "Fire–Earth can use Water plus Fire Resonance for maximum damage and defense ignore.",
        "Ice–Lightning can use Wind plus Water when action speed and smoother casting matter more than pure burst.",
        "Ghost generally favors Water plus Fire, then adjusts crystal subskills for PVP control or boss damage.",
      ],
      image: {
        src: "/assets/guides/high-wizard-builds/napalm-vulcan.webp",
        alt: "Napalm Vulcan single-target Ghost High Wizard skill",
        compact: true,
      },
    },
    {
      id: "cards",
      title: "High Wizard card sets",
      paragraphs: [
        "All builds need MATK, INT, DEX, and encounter-specific race, element, and size modifiers. Maintain defensive conversion cards for the boss's attack element instead of using one fixed defensive page everywhere.",
        "Fire–Earth adds Fire damage cards, Ice–Lightning keeps both Wind and Water options, and Ghost prioritizes Ghost damage. Do not mix three elemental packages on one page; swap the set with the active build.",
      ],
      image: {
        src: "/assets/guides/high-wizard-builds/soul-drain.webp",
        alt: "Soul Drain passive skill for High Wizard SP sustain",
        compact: true,
      },
    },
    {
      "id": "sustain-and-casting",
      "title": "Soul Drain and Mystical Amplification are not the same kind of effect",
      "table": {
        "headers": [
          "Skill",
          "What the imported description says",
          "What to check in play"
        ],
        "rows": [
          [
            "Soul Drain",
            "Raises maximum SP and restores SP when an enemy is killed",
            "A boss fight without adds may not trigger the on-kill recovery. Do not assume farming sustain carries over."
          ],
          [
            "Mystical Amplification",
            "A timed magic-skill-damage and variable-cast-time buff",
            "Check its uptime during your damaging casts. It is not a permanent passive cast-time reduction."
          ]
        ]
      },
      "note": "Read the selected skill level in the Skill Planner, then compare it with the current client. Imported values and translated names can differ after a server patch."
    },
    {
      "id": "damage-checks",
      "title": "Why High Wizard damage can feel low",
      "table": {
        "headers": [
          "Symptom",
          "Likely area to inspect",
          "Next test"
        ],
        "rows": [
          [
            "Strong hits, slow clears",
            "Cast downtime, movement, or an interrupted rotation",
            "Compare a full encounter, including time spent unable to cast."
          ],
          [
            "SP runs out on a boss",
            "Reliance on on-kill SP recovery",
            "Repeat the test without assuming that extra enemies will be available."
          ],
          [
            "A new elemental build is weaker",
            "Old cards or traits still support the previous element",
            "Match the whole loadout to the active spells before judging the build."
          ],
          [
            "A bigger MATK number barely helps",
            "Enemy resistance and bonuses that do not apply to the chosen spell",
            "Read the monster entry and the spell's damage type, then change one item."
          ]
        ]
      },
      "paragraphs": [
        "For a low-budget account, repair the missing part of the existing rotation first. Buying a second elemental card set is a separate investment, not an automatic damage upgrade."
      ]
    },
  ],
  faqs: [
    {"question":"Does Soul Drain solve High Wizard SP problems against every boss?","answer":"No. Its imported description restores SP on a kill. A single boss without adds does not provide the same recovery pattern as farming packs, so test your boss rotation's SP use separately."},
    {"question":"Is Mystical Amplification a passive skill?","answer":"The imported RTNW description gives Mystical Amplification a duration and a temporary magic-damage/cast-time effect. Do not count that benefit as permanently active when comparing builds."},
    { question: "What stats should High Wizard use?", answer: "Prioritize INT for magic damage, then DEX until the build's important spells reach a comfortable cast time. Gear and resonance can change the exact split." },
    { question: "Is Ghost Wizard a real advanced-job build?", answer: "Yes. Napalm Vulcan and Gravitational Field give High Wizard a dedicated Ghost path with single-target pressure, AOE damage, and strong control options." },
    { question: "Should Fire High Wizard replace Massive Meteorite?", answer: "No. Massive Meteorite remains central to Fire damage, so retain it while adding the stronger level-70 traits rather than replacing the mechanic blindly." },
    { question: "Which High Wizard build is easiest to continue?", answer: "Continue the elemental build that already owns your best weapon, traits, and cards. Ghost is attractive, but changing elements can require a second card and equipment package." },
  ],
  related: [
    ["RTNW image library", "/creator-kit/"],
    ["Mage and Wizard build guide", "/guides/mage-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Class guides", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;

export const assassinCrossGuide = {
  slug: "assassin-cross-builds",
  title: "Ragnarok: The New World Assassin Cross Build Guide",
  seoTitle: "Assassin Cross Builds | Ragnarok: The New World",
  description: "Compare Ragnarok: The New World Assassin Cross Dagger, Katar, Poison, and Soul Destroyer builds, with stats, key skills, card choices, and switching checks.",
  kicker: "Advanced Second-Job Guide",
  dek: "Choose sustained dagger damage, Katar skill criticals, poison pressure, or the new ranged Soul Destroyer route.",
  category: "Classes and Builds",
  heroImage: "/assets/guides/assassin-cross-builds/assassin-cross-hero.webp",
  heroAlt: "Assassin Cross build selection showing advanced Thief paths",
  published: "2026-08-08",
  modified: "2026-08-28",
  quickAnswer: "Use the weapon and trait package you can finish: Dual Dagger for sustained melee, Critical Katar for a skill-critical setup, Poison for poison pressure, or Soul Destroyer for ranged physical attacks. Compare the whole loadout before switching; these paths do not share every useful card bonus.",
  reviewNote: "August 28 update: clearer build choices and checks against the Skill Planner reference descriptions. This is not a new live-server DPS benchmark.",
  dataSources: [{ label: "Imported Assassin Cross skill descriptions", href: "/sea/skill-simulator/data/jobs_en-US/613.json" }, { label: "Compare skill levels in the Skill Planner", href: "/sea/skill_planner/" }],
  readTime: "10 min read",
  keywords: ["Ragnarok The New World Assassin Cross build", "RTNW Assassin Cross", "Soul Destroyer build", "Critical Katar Assassin Cross", "Poison Assassin Cross"],
  quickFacts: [
    ["Advanced job", "Assassin → Assassin Cross"],
    ["Shared skills", "Enchant Deadly Poison + Shadow of Deception"],
    ["PVE recommendation", "Dual Dagger"],
    ["PVP recommendations", "Critical Katar or Soul Destroyer"],
    ["New ranged build", "Soul Destroyer"],
    ["Common resonance", "Wind + Water; Poison uses Water + Fire"],
  ],
  sections: [
    {
      id: "builds",
      title: "Assassin Cross paths compared",
      table: {
        headers: ["Build", "Stat direction", "Advanced skill", "Main role"],
        rows: [
          ["Dual Dagger", "AGI → STR", "Dancing Knife", "PVE and farming"],
          ["Critical Katar", "LUK, then damage and speed", "Rolling Cutter", "PVP/GVG burst"],
          ["Poison", "STR", "Poison Buster", "Sustained poison pressure"],
          ["Soul Destroyer", "STR", "Soul Destroyer", "Ranged PVP damage"],
        ],
      },
      paragraphs: [
        "Enchant Deadly Poison and Shadow of Deception belong in every build. The first raises damage and adds poison pressure; the second improves survival when stealth and positioning do not prevent retaliation.",
      ],
      image: {
        src: "/assets/guides/assassin-cross-builds/enchant-deadly-poison.webp",
        alt: "Enchant Deadly Poison universal Assassin Cross buff",
        compact: true,
      },
    },
    {
      id: "dagger-katar",
      title: "Dual Dagger and Critical Katar",
      paragraphs: [
        "Dual Dagger builds around Dancing Knife. Double Blood Blade and Chance Blood Blade are the core trait pair, with the final slot chosen from a general Assassin damage trait or a strong earlier-job stab trait.",
        "Critical Katar needs Free Spin and Spinning Fan of Knives to turn Rolling Cutter into a reliable skill-critical engine. Way of the Assassin is the straightforward damage choice for the remaining slot.",
      ],
      image: {
        src: "/assets/guides/assassin-cross-builds/rolling-cutter.webp",
        alt: "Rolling Cutter skill for Critical Katar Assassin Cross",
        compact: true,
      },
    },
    {
      id: "poison-soul",
      title: "Poison and Soul Destroyer",
      paragraphs: [
        "Poison uses Rapid Venom and Toxic Crit from the accessory trait pool. It does not depend as heavily on attack speed, so Water and Fire Resonance provides a cleaner damage package.",
        "Soul Destroyer is a ranged physical build. Focus Mind and Silent Mind increase its reach and output, letting Assassin Cross pressure the frontline from safer positions in GVG.",
      ],
      image: {
        src: "/assets/guides/assassin-cross-builds/soul-destroyer.webp",
        alt: "Soul Destroyer ranged physical skill for Assassin Cross",
        compact: true,
      },
    },
    {
      id: "cards",
      title: "Cards and Rune Engine",
      bullets: [
        "All builds need encounter-specific race, element, and size bonuses plus STR, AGI, physical damage, CRIT, ASPD, and defense ignore where appropriate.",
        "Poison adds Poison damage cards such as Poison Spore and Zenorc.",
        "Critical Katar prioritizes CRIT and CRIT damage so the main skills actually land critical hits.",
        "Soul Destroyer is ranged physical damage, so use ranged physical cards rather than the melee cards carried by Dagger and Katar.",
        "Use Wind plus Water for Dagger, Katar, and Soul Destroyer; use Water plus Fire for Poison.",
      ],
    },
    {
      id: "gameplay",
      title: "PVE and GVG decisions",
      paragraphs: [
        "Dual Dagger remains the efficient boss and farming route because rapid attacks interact well with elemental consumables and on-hit effects. Critical Katar excels at entering from stealth, bursting the backline, and escaping with its mobility tools.",
        "Soul Destroyer trades attack frequency for safety and reach. Its cooldown limits the number of hits per second, but the extended range lets it contribute without standing inside the enemy frontline.",
      ],
    },
    {
      "id": "damage-types",
      "title": "Check damage type before choosing cards",
      "table": {
        "headers": [
          "Skill",
          "Imported damage label",
          "Build implication"
        ],
        "rows": [
          [
            "Rolling Cutter",
            "Neutral melee physical damage; can critically hit",
            "Check bonuses against this skill, rather than assuming a basic-attack-only bonus will apply."
          ],
          [
            "Dancing Knife",
            "Melee physical follow-up triggered by deadly skills",
            "Read the trigger and cooldown before attributing every extra hit to attack speed."
          ],
          [
            "Soul Destroyer",
            "Neutral ranged physical damage with ATK/MATK and STR/INT contributions",
            "Mixed stat scaling does not make the final hit magic damage. Match cards to the stated damage type."
          ]
        ]
      },
      "note": "This comparison uses RTNW's imported skill descriptions, not formulas from Ragnarok Online, Origin, or another Ragnarok title. Recheck your current client before committing to a stat reset."
    },
    {
      "id": "switching-checklist",
      "title": "Before changing from Dagger to Katar or Soul Destroyer",
      "steps": [
        {
          "title": "Save the existing build",
          "text": "Record the working skill, trait, card, and weapon setup first. Keep it available so the comparison does not depend on memory."
        },
        {
          "title": "Check the missing pieces",
          "text": "For Katar, inspect Rolling Cutter and its skill-critical trait setup. For Soul Destroyer, check ranged physical bonuses. A weapon swap alone does not supply those supporting effects."
        },
        {
          "title": "Compare the same fight",
          "text": "Use the same target, buffs, duration, and consumables. Include time lost to movement or deaths; compare sustained output rather than a single favorable critical hit."
        }
      ]
    },
  ],
  faqs: [
    {"question":"Why does Soul Destroyer mention MATK if it deals physical damage?","answer":"The imported RTNW formula includes both ATK and MATK, but labels the resulting hit Neutral ranged physical damage. Scaling inputs and final damage type are different; inspect both before selecting cards or copying a build from another Ragnarok game."},
    { question: "Which Assassin Cross build is best for PVE?", answer: "Dual Dagger is the safest general PVE recommendation because its rapid sustained attacks work well against bosses and during open-world farming." },
    { question: "Is Soul Destroyer magic damage?", answer: "No. In this build it is ranged physical damage, so use ranged physical bonuses and physical defense ignore rather than magic-damage cards." },
    { question: "Which Assassin Cross build is best for GVG?", answer: "Critical Katar is excellent for stealth entry and backline burst, while Soul Destroyer offers safer ranged pressure. Choose between assassination mobility and sustained range." },
    { question: "Why does Assassin Cross only use three weapon traits with two Daggers?", answer: "The off-hand Dagger's trait is sealed, so dual-wielding does not provide a fourth active equipment trait." },
  ],
  related: [
    ["Thief and Assassin build guide", "/guides/thief-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Class guides", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;

export const highPriestGuide = {
  slug: "high-priest-builds",
  title: "Ragnarok: The New World High Priest Build Guide",
  seoTitle: "RTNW High Priest Builds: Support, Battle & Exorcist",
  description: "Build a High Priest for Support healing, Battle basic attacks, or Exorcist Holy magic with advanced skills, stats, equipment traits, Rune Engine choices, cards, and rotations.",
  kicker: "Advanced Second-Job Guide",
  dek: "High Priest adds a second party heal, stronger protection, and complete offensive loops for Battle and Exorcist builds.",
  category: "Classes and Builds",
  heroImage: "/assets/guides/high-priest-builds/high-priest-hero.webp",
  heroAlt: "High Priest build selection showing Support, Battle, and Exorcist paths",
  published: "2026-08-08",
  modified: "2026-08-08",
  readTime: "9 min read",
  keywords: ["Ragnarok The New World High Priest build", "RTNW High Priest", "High Priest Support build", "High Priest Battle build", "High Priest Exorcist build"],
  quickFacts: [
    ["Advanced job", "Priest → High Priest"],
    ["Party recommendation", "Support"],
    ["Support/Exorcist stats", "DEX → INT"],
    ["Battle stats", "AGI/LUK → STR"],
    ["Support resonance", "Holy + Wind or Earth"],
    ["Damage resonance", "Water + Fire for Exorcist; Wind + Water for Battle"],
  ],
  sections: [
    {
      id: "skills",
      title: "High Priest skills by role",
      paragraphs: [
        "Assumptio, Meditatio, and Basilica benefit every High Priest route. Support then adds Heal Light, Coluseo Heal, and Lex Aeterna for party recovery, cleansing, and a valuable damage window.",
        "Battle needs Duple Light to attach Holy damage to its rapid hammer attacks. Exorcist uses Judex as its main advanced offensive spell while retaining the class's support utility.",
      ],
      table: {
        headers: ["Build", "Stat direction", "Advanced focus", "Recommended content"],
        rows: [
          ["Support", "DEX → INT", "Heal Light, Coluseo Heal, Lex Aeterna", "Dungeons, raids, GVG"],
          ["Battle", "AGI/LUK → STR", "Duple Light and attack-trigger traits", "Solo farming"],
          ["Exorcist", "DEX → INT", "Judex and Holy-damage traits", "AOE farming and magic damage"],
        ],
      },
      image: {
        src: "/assets/guides/high-priest-builds/coluseo-heal.webp",
        alt: "Coluseo Heal party-healing skill for Support High Priest",
        compact: true,
      },
    },
    {
      id: "support",
      title: "Support High Priest equipment traits",
      paragraphs: [
        "Overhealing is the first level-70 weapon trait because it converts excess healing into a shield. Mater Misericordiae and Healing Light are strong follow-ups, but do not discard a high-quality Divine Healing trait simply because it comes from the earlier pool.",
        "The finished support kit already contains shields, party damage reduction, two regular party heals, and a healing ultimate. Prioritize reliability and cooldown flow over stacking a redundant sixth emergency button.",
      ],
      image: {
        src: "/assets/guides/high-priest-builds/basilica.webp",
        alt: "Basilica party protection skill for High Priest",
        compact: true,
      },
    },
    {
      id: "damage",
      title: "Battle and Exorcist trait packages",
      bullets: [
        "Exorcist: Auto Rebirth and Judex Cross are the core pair. Choose Heretic Judex for proc-based burst or Vulnerable Light for steadier Holy damage.",
        "Battle: Renovatio Hammer or Auto Light must be on the weapon. Add the stronger available option between Heretic Judex and Vulnerable Light.",
        "Battle's higher attack frequency gives Heretic Judex more chances to trigger, while Exorcist may prefer the consistency of Vulnerable Light.",
      ],
      image: {
        src: "/assets/guides/high-priest-builds/assumptio.webp",
        alt: "Assumptio shared High Priest attack buff",
        compact: true,
      },
    },
    {
      id: "runes",
      title: "Rune Engine and cards",
      paragraphs: [
        "Support should reach level-3 Holy Resonance, then choose Wind for faster casts and cooldowns or Earth for stronger personal survival. Exorcist uses Water and Fire for magic damage. Battle uses Wind and Water for ASPD and physical output.",
        "Support spends card slots on healing, INT, DEX, HP, and defensive conversions. Battle wants STR, AGI, physical damage, CRIT, and ASPD. Exorcist wants INT, MATK, DEX, magic damage, and Holy damage. Keep encounter-specific race, size, and element cards for both damage builds.",
      ],
    },
    {
      id: "priority",
      title: "Which High Priest build should you invest in first?",
      paragraphs: [
        "Support remains the best main build for accounts that join dungeons, raids, and guild content. Exorcist is the most efficient second build because it shares INT, DEX, magic gear, and many defensive resources with Support while clearing open-world groups quickly.",
        "Battle is enjoyable and complete after its trigger traits are online, but it requires a more separate physical card and stat package. Treat it as the higher-cost alternative unless it is your primary playstyle.",
      ],
    },
  ],
  faqs: [
    { question: "Which High Priest build is most wanted in parties?", answer: "Support is the most consistently requested route because its healing, shielding, cleansing, mitigation, and damage buffs directly increase group success." },
    { question: "What stats should Support High Priest use?", answer: "Prioritize DEX until important casts feel reliable, then invest in INT for healing, SP, and magic scaling. Gear and resonance determine the final balance." },
    { question: "Should Support replace Divine Healing?", answer: "Not automatically. Divine Healing from the earlier trait pool can remain stronger than a weaker level-70 option, so compare the actual trait quality and function." },
    { question: "What is the best second build for a Support High Priest?", answer: "Exorcist is the efficient second build because it shares INT, DEX, magic gear, and many defensive resources with Support." },
  ],
  related: [
    ["RTNW image library", "/creator-kit/"],
    ["Acolyte and Priest build guide", "/guides/acolyte-builds/"],
    ["Monk build guide", "/guides/monk-build/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Card database", "/sea/cards/"],
    ["Class guides", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;

export const sniperGuide = {
  slug: "sniper-builds",
  title: "Ragnarok: The New World Sniper Build Guide",
  seoTitle: "Sniper Builds: ADL, Falcon & Trap | Ragnarok New World",
  description: "Compare Ragnarok: The New World Sniper ADL, Falcon, and Trap builds, including stats, skill priorities, timed buffs, equipment traits, cards, and farming checks.",
  kicker: "Advanced Second-Job Guide",
  dek: "Push ranged damage further with ADL or Falcon, or commit to Trap control for PVP and GVG.",
  category: "Classes and Builds",
  heroImage: "/assets/guides/sniper-builds/sniper-hero.webp",
  heroAlt: "Sniper build selection showing ADL, Trap, and Falcon paths",
  published: "2026-08-08",
  modified: "2026-08-28",
  quickAnswer: "Start with ADL or Falcon if you want a ranged PVE setup; choose Trap when control and trap placement are the goal. ADL means AGI, DEX, and LUK. Finish one path before mixing the offensive stats and traits of all three.",
  reviewNote: "August 28 update: clearer build choices and checks against the Skill Planner reference descriptions. This is not a new live-server DPS benchmark.",
  dataSources: [{ label: "Imported Sniper skill descriptions", href: "/sea/skill-simulator/data/jobs_en-US/413.json" }, { label: "Compare skill levels in the Skill Planner", href: "/sea/skill_planner/" }],
  readTime: "9 min read",
  keywords: ["Ragnarok The New World Sniper build", "RTNW Sniper", "Sniper ADL build", "Sniper Falcon build", "Sniper Trap build"],
  quickFacts: [
    ["Advanced job", "Hunter → Sniper"],
    ["PVE recommendation", "ADL or Falcon"],
    ["PVP control", "Trap"],
    ["ADL/Falcon stats", "AGI → DEX/LUK"],
    ["Trap stats", "INT = DEX"],
    ["Recommended resonance", "Wind + Water"],
  ],
  sections: [
    {
      id: "skills",
      title: "Sniper skills and build identities",
      paragraphs: [
        "Falcon Eyes and Wind Walker are timed Sniper buffs, not permanent passives. Falcon Eyes adds offensive stats, while Wind Walker helps the party move. The advanced tree also supplies defensive traps for controlling approaches in PVP.",
        "After the shared skills, each build has a clear active priority: Focused Arrow Strike for ADL, Falcon Assault for Falcon, and Enhanced Elemental Trap for Trap.",
      ],
      table: {
        headers: ["Build", "Stat direction", "Core advanced skill", "Main use"],
        rows: [
          ["ADL", "AGI → DEX/LUK", "Focused Arrow Strike", "Long-range PVE and GVG"],
          ["Falcon", "AGI → DEX/LUK", "Falcon Assault", "Safe sustained PVE"],
          ["Trap", "INT = DEX", "Enhanced Elemental Trap", "PVP control"],
        ],
      },
      image: {
        src: "/assets/guides/sniper-builds/falcon-eyes.webp",
        alt: "Falcon Eyes universal Sniper passive skill",
        compact: true,
      },
    },
    {
      id: "traits",
      title: "Sniper equipment traits",
      bullets: [
        "ADL: Burst Shot, Focused Amplification, and Deadeye Aim directly improve the advanced attack package.",
        "Falcon: Hawk Squadron and Hunting Hour are the core pair. Use Keen Falcon or another strong earlier-job all-damage trait for the third slot.",
        "Trap: Razor Trap, Hair Trigger, and Chain Deployment are the focused control and damage package.",
        "Do not assume every level-70 trait is better. Reliable all-skill, PVE, or PVP bonuses from the earlier pool can beat a narrow upgrade to one skill.",
      ],
      image: {
        src: "/assets/guides/sniper-builds/progressive-shot.webp",
        alt: "Progressive Shot skill that provides extra Hunter attack range",
        compact: true,
      },
    },
    {
      id: "runes",
      title: "Rune Engine and stat planning",
      paragraphs: [
        "All three builds can use Wind plus Water Resonance. Wind improves attack speed, global cooldown, cast time, and all stats; Water adds defense ignore and skill damage.",
        "ADL and Falcon should raise AGI toward their speed target before dividing remaining points between DEX and LUK. Trap should raise INT and DEX together because its physical trap damage scales from both even though INT appears in the formula.",
      ],
      image: {
        src: "/assets/guides/sniper-builds/blast-mine.webp",
        alt: "Blast Mine defensive trap used by Sniper builds",
        compact: true,
      },
    },
    {
      id: "cards",
      title: "Sniper card priorities",
      paragraphs: [
        "Sniper can change arrow elements, so prepare race, element, size, and elemental-damage cards instead of relying on one permanent page. ADL and Falcon prioritize AGI, DEX, ASPD, physical damage, defense ignore, CRIT, and ATK.",
        "Trap uses INT and DEX but still deals physical damage. Select physical damage and physical defense ignore rather than magic damage, then swap elemental and encounter modifiers with the active trap setup.",
      ],
    },
    {
      id: "gameplay",
      title: "Sniper positioning in PVE and GVG",
      paragraphs: [
        "ADL and Falcon remain the efficient PVE choices because they attack safely and continuously from range. Learn at least level 1 Progressive Shot when its passive range increase is available; extra distance is valuable in both boss fights and Guild League.",
        "Trap becomes more important in late PVP and GVG. Place control zones on likely Assassin entry paths and Knight charge lanes instead of dropping every trap directly under the frontline.",
      ],
    },
    {
      "id": "buff-uptime",
      "title": "Falcon Eyes and Wind Walker: check their duration",
      "table": {
        "headers": [
          "Skill",
          "Imported effect",
          "Practical use"
        ],
        "rows": [
          [
            "Falcon Eyes",
            "A timed increase to stats, HIT, CRIT, and physical skill damage",
            "Compare your build with consistent buff uptime; do not treat the bonus as permanent."
          ],
          [
            "Wind Walker",
            "A short movement-speed increase for you and teammates",
            "Use it for repositioning. The listed effect is movement speed, not a permanent attack-speed passive."
          ]
        ]
      },
      "paragraphs": [
        "The advanced skills support different jobs. Reading the full description prevents a movement tool from being mistaken for a damage stat when deciding how much AGI or attack-speed gear to use."
      ]
    },
    {
      "id": "farming-checks",
      "title": "ADL, Falcon, or Trap: make a fair farming comparison",
      "table": {
        "headers": [
          "Build",
          "Check before spending",
          "Keep the comparison fair"
        ],
        "rows": [
          [
            "ADL",
            "Basic-attack uptime, range, accuracy, and relevant damage bonuses",
            "Use the same monster, buffs, and arrows where applicable."
          ],
          [
            "Falcon",
            "Falcon-related skill and trait coverage, not just displayed ATK",
            "Measure the complete rotation, including its secondary damage."
          ],
          [
            "Trap",
            "The chosen trap's scaling, damage type, and whether enemies enter its area",
            "Test placement and enemy movement instead of judging only one stationary target."
          ]
        ]
      },
      "note": "Track clear time, deaths, and consumable use. A setup with a larger hit can still be worse for the farming route you actually play."
    },
  ],
  faqs: [
    {"question":"Does Wind Walker permanently increase Sniper attack speed?","answer":"No. The imported description lists a short movement-speed effect for the player and teammates. Check attack-speed bonuses separately instead of counting Wind Walker as a permanent ASPD passive."},
    { question: "Which Sniper build is best for PVE?", answer: "ADL and Falcon are the safest PVE choices because they provide frequent ranged damage with strong uptime and less setup than Trap." },
    { question: "Does Trap Sniper deal magic damage?", answer: "No. Trap uses INT and DEX for scaling but deals physical damage, so physical damage and physical defense ignore remain the correct offensive bonuses." },
    { question: "What Rune Engine should Sniper use?", answer: "Wind plus Water works across ADL, Falcon, and Trap by combining speed and cast benefits with defense ignore and skill damage." },
    { question: "Why should Sniper learn Progressive Shot?", answer: "Its passive range increase helps Sniper attack bosses, towers, and enemy formations from safer positions, even when Progressive Shot is not the main damage skill." },
  ],
  related: [
    ["Archer and Hunter build guide", "/guides/archer-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Equipment database", "/sea/equipment/"],
    ["Card database", "/sea/cards/"],
    ["Guild League guide", "/guides/guild-league/"],
  ],
} satisfies SourceGuide;

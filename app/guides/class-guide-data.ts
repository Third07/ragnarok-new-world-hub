export type ClassBuildPath = {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  damage: string;
  range: string;
  difficulty: string;
  bestFor: string;
  statPriority: string;
  gearTargets: string[];
  summary: string;
  skillPlan: string[];
  rotation: string[];
  pve: string;
  pvp: string;
  budget: string;
};

export type ClassBuildGuideData = {
  slug: string;
  className: string;
  title: string;
  eyebrow: string;
  lead: string;
  description: string;
  openGraphDescription: string;
  icon: string;
  lineage: string;
  availability: string;
  builds: ClassBuildPath[];
  f2pPlan: string[];
  mistakes: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export const classBuildGuides: Record<string, ClassBuildGuideData> = {
  swordman: {
    slug: "swordman-builds",
    className: "Swordman",
    title: "Swordman Builds: Knight and Crusader",
    eyebrow: "Frontline damage, tanking and shield utility",
    lead:
      "Choose the Knight line for direct melee pressure or the Crusader line for a tougher shield-oriented frontline. Both are forgiving starting paths, but they spend resources very differently.",
    description:
      "Plan Ragnarok: The New World Swordman builds for Knight, Lord Knight, Rune Knight, Crusader, Paladin, and Royal Guard, with stats, equipment, rotations, PvE, PvP, and F2P priorities.",
    openGraphDescription:
      "Compare Knight damage and Crusader tank builds with practical stats, equipment targets, rotations, and budget advice.",
    icon: "/media/images/job/icon_jsxq_201.webp",
    lineage: "Swordman → Knight / Crusader",
    availability:
      "The English Skill Planner currently includes Knight → Lord Knight → Rune Knight and Crusader → Paladin → Royal Guard.",
    builds: [
      {
        id: "knight-dps",
        title: "Knight damage",
        subtitle: "Spear or two-handed melee pressure",
        role: "Frontline physical DPS",
        damage: "Melee physical",
        range: "Close",
        difficulty: "Beginner-friendly",
        bestFor: "Solo progression, bosses, sustained PvE",
        statPriority: "STR → HIT / LUK → VIT",
        gearTargets: ["ATK", "Melee P.DMG", "HIT", "CRIT", "ASPD", "Max HP"],
        summary:
          "This route uses Swordman's reliable melee foundation and turns it into sustained Knight-line damage. Build enough accuracy to keep attacks consistent, then add durability so boss mechanics and crowded pulls do not interrupt uptime.",
        skillPlan: [
          "Max the main weapon-compatible damage engine first instead of splitting points across every weapon route.",
          "Take the passives that directly improve your chosen spear or two-handed setup.",
          "Add mobility, crowd control, and defensive utility only after the core damage loop is functional.",
        ],
        rotation: [
          "Open with the class's engage or movement tool when the target is outside melee range.",
          "Use the strongest cooldown attack, then maintain pressure with the weapon's repeatable damage skill.",
          "Refresh offensive buffs before a boss burst window rather than after cooldowns are already committed.",
          "Hold one control or movement option for mechanics, target swaps, or disengaging from dangerous ground effects.",
        ],
        pve:
          "A strong general-purpose melee route. It performs best when the encounter allows consistent target contact and when the build has enough HIT to avoid wasted attacks.",
        pvp:
          "Treat target access and durability as part of the damage build. A Knight that cannot reach or remain on a target contributes less than a slightly lower-damage setup with better control resistance and survivability.",
        budget:
          "F2P players should commit to one weapon family, refine a dependable main weapon, and stop at safe armor checkpoints before chasing expensive CRIT or ASPD breakpoints.",
      },
      {
        id: "crusader-tank",
        title: "Crusader tank",
        subtitle: "Shield frontline and party protection",
        role: "Tank and defensive utility",
        damage: "Physical with support utility",
        range: "Close",
        difficulty: "Moderate",
        bestFor: "Dungeons, group PvE, frontline PvP",
        statPriority: "VIT → HIT / STR → defensive utility",
        gearTargets: ["Max HP", "DEF / MDEF", "Damage reduction", "Block", "HIT", "Status resistance"],
        summary:
          "The Crusader line trades some personal damage for shield value, party stability, and safer frontline play. The build succeeds by surviving predictable burst and keeping enemies positioned for the party.",
        skillPlan: [
          "Prioritize the shield and mitigation skills that define the tank role.",
          "Take reliable threat, control, or interruption tools before optional personal-damage nodes.",
          "Add party protection and emergency cooldowns once basic survivability is established.",
        ],
        rotation: [
          "Enter first and establish enemy attention before damage dealers commit long cooldowns.",
          "Use control to keep dangerous enemies facing away from the party or inside allied AoE.",
          "Rotate mitigation instead of stacking every defensive cooldown at once.",
          "Save the strongest protection skill for scripted boss damage or coordinated enemy burst.",
        ],
        pve:
          "One of the safest group investments when parties need a stable frontline. Personal farming is slower than a damage Knight, so use a focused damage preset for solo content when possible.",
        pvp:
          "Excellent for contesting space, disrupting enemy movement, and protecting vulnerable allies. Status resistance and movement tools can matter more than raw DEF against coordinated teams.",
        budget:
          "Tank value scales well from practical defensive gear. Prioritize Max HP, damage reduction, and reliable shield pieces before spending on luxury offensive stats.",
      },
    ],
    f2pPlan: [
      "Choose Knight damage or Crusader tank before buying a long-term weapon.",
      "Build enough HIT for the content you currently farm, then increase damage or durability.",
      "Refine the main weapon and one or two high-value defensive slots instead of raising every item equally.",
      "Use the Skill Planner to avoid investing in both weapon routes during early progression.",
    ],
    mistakes: [
      "Funding spear, two-handed, and shield setups at the same time.",
      "Stacking damage while ignoring HIT and target access.",
      "Using all defensive cooldowns together and having nothing for the next mechanic.",
    ],
    faqs: [
      {
        question: "Is Knight or Crusader better for F2P players?",
        answer:
          "Knight is usually faster for solo progression, while Crusader provides strong group value with practical defensive gear. Choose according to whether you spend more time farming alone or tanking for parties.",
      },
      {
        question: "What stats should a Swordman build first?",
        answer:
          "Damage builds generally begin with STR and enough HIT, then add VIT. Tank builds begin with VIT and defensive consistency, then add enough HIT and STR to maintain threat and utility.",
      },
    ],
  },
  mage: {
    slug: "mage-builds",
    className: "Mage",
    title: "Mage Builds: Wizard AoE and Control",
    eyebrow: "Elemental farming, burst casting and battlefield control",
    lead:
      "Mage is the safest dedicated farming caster when you build one elemental rotation first. The Wizard line rewards positioning, cast comfort, SP sustain, and matching spells to enemy elements.",
    description:
      "Plan Ragnarok: The New World Mage and Wizard builds for AoE farming, boss damage, and PvP control, including stats, equipment, rotations, F2P priorities, and Sage availability notes.",
    openGraphDescription:
      "Build Wizard AoE farming or control setups with practical casting, SP, element, PvE, PvP, and F2P guidance.",
    icon: "/media/images/job/icon_jsxq_301.webp",
    lineage: "Mage → Wizard / Sage",
    availability:
      "Wizard → High Wizard → Warlock is represented in the English Skill Planner. Sage appears in the class tree but currently has no English skill data, so this guide does not invent a Sage build.",
    builds: [
      {
        id: "wizard-farming",
        title: "Wizard AoE farming",
        subtitle: "Fast field clearing and dungeon waves",
        role: "Area magic DPS",
        damage: "Elemental magic",
        range: "Long",
        difficulty: "Moderate",
        bestFor: "Field farming, dungeon waves, group PvE",
        statPriority: "INT → cast comfort / SP → VIT",
        gearTargets: ["MATK", "M.DMG", "Element damage", "Cast reduction", "SP recovery", "INT"],
        summary:
          "The farming route prioritizes repeatable area damage and enough cast speed or protection to complete spells safely. Start with one dependable element pair, then expand coverage after the core rotation is efficient.",
        skillPlan: [
          "Max one repeatable AoE spell and its supporting elemental passives first.",
          "Add a second element that covers common resistances rather than leveling every spell equally.",
          "Take cast, SP, and control utility that increases real uptime between pulls.",
        ],
        rotation: [
          "Group enemies at maximum safe range before committing the long cast.",
          "Apply control or a setup spell, then place the main AoE where enemies will remain.",
          "Use a faster secondary spell to finish survivors instead of repeating the longest cast unnecessarily.",
          "Move before the next pull while SP regeneration and cooldowns recover.",
        ],
        pve:
          "Excellent for clearing groups and contributing ranged elemental damage. Element knowledge and positioning produce larger gains than simply stacking more MATK.",
        pvp:
          "AoE pressure is valuable, but exposed casts are easy to punish. Coordinate control with allies and avoid standing in predictable locations after the first spell.",
        budget:
          "Build shared MATK and cast comfort before buying narrow elemental luxury pieces. One efficient farming rotation is more valuable than several incomplete spell trees.",
      },
      {
        id: "wizard-control",
        title: "Wizard control",
        subtitle: "Slows, zones and coordinated burst",
        role: "Control caster",
        damage: "Elemental magic and crowd control",
        range: "Long",
        difficulty: "Advanced",
        bestFor: "Arena, group PvP, difficult dungeons",
        statPriority: "INT → cast reliability → VIT / resistance",
        gearTargets: ["Cast reduction", "MATK", "Status accuracy", "Max HP", "Damage reduction", "SP sustain"],
        summary:
          "The control route sacrifices some farming simplicity to create safer zones and coordinated kill windows. Its real value is forcing movement, interrupting approaches, and making enemy positioning predictable.",
        skillPlan: [
          "Prioritize the control spell that best supports your regular team composition.",
          "Keep one reliable damage sequence so the build can capitalize on its own control.",
          "Invest in defensive and cast-reliability utility before optional low-impact elemental branches.",
        ],
        rotation: [
          "Place control where enemies must move, not only where they are currently standing.",
          "Use the team's burst after the control lands rather than before it.",
          "Reposition immediately after a major cast to avoid counter-engage.",
          "Keep one quick spell available for interruption, finishing, or self-protection.",
        ],
        pve:
          "Useful when difficult enemies must be grouped, slowed, or prevented from reaching the backline. Pure farming speed may be lower than a fully offensive AoE setup.",
        pvp:
          "One of Mage's strongest coordinated roles. Cast reliability, survivability, and disciplined positioning are more important than maximum paper damage.",
        budget:
          "F2P control builds should use broadly useful MATK and defensive pieces. Avoid buying several expensive elemental sets before the basic cast-and-survive loop works.",
      },
    ],
    f2pPlan: [
      "Choose one primary farming element and one backup element.",
      "Improve MATK, SP sustain, and cast comfort before chasing rare elemental bonuses.",
      "Use terrain and range to reduce potion and defensive-stat pressure.",
      "Do not plan around Sage until usable skill data is published in the current client data.",
    ],
    mistakes: [
      "Spreading skill points across every element too early.",
      "Ignoring cast interruption and survivability.",
      "Using long AoE casts on enemies that are already moving out of the target area.",
    ],
    faqs: [
      {
        question: "Is Mage good for F2P farming?",
        answer:
          "Yes. Mage and Wizard are strong low-budget farmers when one AoE rotation receives focused skill and equipment investment. Positioning and SP efficiency help more than spreading resources across every element.",
      },
      {
        question: "Can I build Sage now?",
        answer:
          "Sage appears in the current class index, but the English Skill Planner does not currently expose Sage skill data. This guide therefore limits recommendations to the supported Wizard line.",
      },
    ],
  },
  archer: {
    slug: "archer-builds",
    className: "Archer",
    title: "Archer Builds: Hunter, Bard and Dancer",
    eyebrow: "Ranged damage, mobile farming and party songs",
    lead:
      "Archer offers the broadest role choice among the original classes: Hunter for direct ranged damage, Bard for team support, and Dancer for support and control. Pick one identity before investing in weapons and utility stats.",
    description:
      "Plan Ragnarok: The New World Archer builds for Hunter, Sniper, Ranger, Bard, Clown, Dancer, and Gypsy with stats, equipment, rotations, PvE, PvP, and F2P priorities.",
    openGraphDescription:
      "Compare Hunter ranged DPS, Bard support, and Dancer control builds with practical progression advice.",
    icon: "/media/images/job/icon_jsxq_401.webp",
    lineage: "Archer → Hunter / Bard / Dancer",
    availability:
      "Hunter → Sniper → Ranger is represented in the English data. Bard currently continues through Clown, and Dancer through Gypsy; later names are not exposed in the current English index.",
    builds: [
      {
        id: "hunter-dps",
        title: "Hunter DPS",
        subtitle: "Safe ranged damage and mobile farming",
        role: "Ranged physical DPS",
        damage: "Ranged physical",
        range: "Long",
        difficulty: "Beginner-friendly",
        bestFor: "Solo farming, bosses, sustained PvE",
        statPriority: "AGI / DEX → HIT / CRIT → VIT",
        gearTargets: ["Ranged P.DMG", "ATK", "ASPD", "HIT", "CRIT", "FLEE"],
        summary:
          "Hunter is the simplest Archer route for independent progression. Range reduces incoming damage, while focused attack speed, accuracy, and ranged bonuses provide consistent farming and boss uptime.",
        skillPlan: [
          "Max the repeatable ranged attack and its weapon passives first.",
          "Add one AoE or multi-target option for farming efficiency.",
          "Take traps, movement, or control according to the content you actually play.",
        ],
        rotation: [
          "Start at maximum range and maintain the main ranged attack loop.",
          "Use AoE only when enough enemies are grouped to justify its cooldown or SP cost.",
          "Place control between yourself and the enemy rather than directly under your current position.",
          "Reposition before melee enemies reach you instead of waiting until damage interrupts the rotation.",
        ],
        pve:
          "Reliable for field farming and boss encounters because range supports high uptime. Damage falls when accuracy or positioning is neglected.",
        pvp:
          "Strong sustained pressure when protected, but vulnerable to fast divers. Keep movement and control tools available for target access rather than spending every cooldown on damage.",
        budget:
          "A focused bow setup is F2P-friendly. Build reliable ATK, ranged damage, and HIT before paying for expensive CRIT and ASPD breakpoints.",
      },
      {
        id: "bard-support",
        title: "Bard support",
        subtitle: "Songs, buffs and ranged utility",
        role: "Party support",
        damage: "Ranged physical with buffs",
        range: "Mid to long",
        difficulty: "Moderate",
        bestFor: "Party PvE, group PvP, coordinated teams",
        statPriority: "DEX / INT → VIT → utility",
        gearTargets: ["Skill uptime", "SP recovery", "DEX", "INT", "Max HP", "Damage reduction"],
        summary:
          "Bard trades some solo damage for party-wide value. The build should keep its most important song or buff available while maintaining enough survivability to stay active throughout the fight.",
        skillPlan: [
          "Prioritize the song or party buff your regular group benefits from most.",
          "Keep one efficient ranged attack for solo tasks and downtime between support casts.",
          "Add SP sustain, duration, and defensive utility before optional damage branches.",
        ],
        rotation: [
          "Apply the main party buff before the pull or coordinated engagement.",
          "Maintain safe range while contributing basic damage or secondary utility.",
          "Refresh support effects before they expire during a dangerous phase.",
          "Reposition with the backline instead of remaining stationary to finish a low-value attack.",
        ],
        pve:
          "Excellent in organized parties where buffs affect several strong damage dealers. Solo farming is functional but usually slower than Hunter.",
        pvp:
          "Valuable when the team protects its support line. Build enough HP and resistance to avoid being removed before the key song or utility cycle.",
        budget:
          "Support value does not require top-tier personal damage gear. Prioritize uptime, SP, and survivability, then improve damage with shared ranged pieces.",
      },
      {
        id: "dancer-control",
        title: "Dancer support and control",
        subtitle: "Debuffs, spacing and team utility",
        role: "Support and control",
        damage: "Ranged physical with utility",
        range: "Mid to long",
        difficulty: "Moderate",
        bestFor: "Group PvP, party support, control-heavy teams",
        statPriority: "DEX / INT → VIT → resistance",
        gearTargets: ["Utility uptime", "SP recovery", "DEX", "INT", "Max HP", "Status resistance"],
        summary:
          "Dancer focuses on controlling tempo and supporting allied pressure. The best build depends on whether the team needs stronger offensive support, defensive utility, or enemy disruption.",
        skillPlan: [
          "Choose the primary dance or debuff around your regular party composition.",
          "Maintain one ranged damage option for solo progression.",
          "Prioritize uptime and survival over several low-level utility skills.",
        ],
        rotation: [
          "Open with the support or control effect that enables the team's first engagement.",
          "Stay near enough to affect allies but far enough to avoid frontline crowd control.",
          "Use ranged attacks only when they do not delay the next important utility cast.",
          "Move with allied supports so enemies cannot isolate you easily.",
        ],
        pve:
          "Useful when party utility outweighs raw personal damage. Hunter remains the easier solo farming choice.",
        pvp:
          "A strong coordinated support route. Survival, positioning, and timing determine more value than personal damage statistics.",
        budget:
          "Build a durable utility core first. Expensive ranged damage pieces are optional until the support cycle is reliable.",
      },
    ],
    f2pPlan: [
      "Choose Hunter, Bard, or Dancer before committing to long-term weapons and runes.",
      "Hunter should secure ranged damage and HIT first; support lines should secure uptime, SP, and survivability.",
      "Keep one solo-friendly attack even on a support build.",
      "Do not try to fund Hunter damage and full support gear simultaneously during early progression.",
    ],
    mistakes: [
      "Chasing ASPD while missing too many attacks.",
      "Building support skills without enough SP sustain or survivability.",
      "Standing still after melee enemies have already committed to the backline.",
    ],
    faqs: [
      {
        question: "Which Archer branch is best for solo players?",
        answer:
          "Hunter is the easiest solo recommendation because it converts Archer's range into consistent farming and boss damage. Bard and Dancer are stronger when their party utility affects several allies.",
      },
      {
        question: "Are Bard and Dancer F2P-friendly?",
        answer:
          "Yes for organized group play. Their support value can remain useful without maximum personal damage investment, but they still need SP sustain and enough survivability to maintain utility.",
      },
    ],
  },
  acolyte: {
    slug: "acolyte-builds",
    className: "Acolyte",
    title: "Acolyte Builds: Priest and Monk",
    eyebrow: "Healing, party support and close-range burst",
    lead:
      "Acolyte can become the safest party investment through Priest or a focused burst fighter through Monk. These paths share a starting class but should not share the same long-term stat and equipment plan.",
    description:
      "Plan Ragnarok: The New World Acolyte builds for Priest, High Priest, Arch Bishop, Monk, Champion, and Sura, including stats, equipment, rotations, PvE, PvP, and F2P advice.",
    openGraphDescription:
      "Compare Priest healing and Monk burst builds with practical stats, skill priorities, equipment, and F2P progression.",
    icon: "/media/images/job/icon_jsxq_501.webp",
    lineage: "Acolyte → Priest / Monk",
    availability:
      "The English Skill Planner currently includes Priest → High Priest → Arch Bishop and Monk → Champion → Sura.",
    builds: [
      {
        id: "priest-support",
        title: "Priest support",
        subtitle: "Healing, buffs and party recovery",
        role: "Healer and support",
        damage: "Holy magic and healing",
        range: "Mid",
        difficulty: "Beginner-friendly in groups",
        bestFor: "Dungeons, raids, group PvP",
        statPriority: "INT → VIT → cast / SP utility",
        gearTargets: ["Healing power", "INT", "SP recovery", "Cast reduction", "Max HP", "Damage reduction"],
        summary:
          "Priest remains useful without competing for top damage. The build should deliver reliable healing, maintain essential buffs, and survive long enough to recover the party during mistakes or scripted damage.",
        skillPlan: [
          "Max the primary efficient heal and the party buffs used in every activity.",
          "Add cleansing, revival, or emergency recovery before optional damage skills.",
          "Invest in Holy damage only after the core support kit is dependable.",
        ],
        rotation: [
          "Apply long-duration buffs before combat.",
          "Use efficient healing for routine damage and save the strongest recovery for emergencies.",
          "Cleanse or reposition before repeatedly healing a target that remains inside avoidable damage.",
          "Keep enough SP and cooldown capacity for the next scripted party-wide hit.",
        ],
        pve:
          "One of the most reliable party roles at modest investment. Solo progression is slower, so use Holy damage options and party play to reduce farming friction.",
        pvp:
          "Extremely valuable in coordinated teams. Build HP, resistance, and cast reliability because opponents will often target the healer first.",
        budget:
          "F2P support works well with practical healing, SP, and defensive gear. Avoid overspending on personal damage before the healing cycle and survivability are stable.",
      },
      {
        id: "monk-burst",
        title: "Monk burst",
        subtitle: "Mobile melee pressure and finisher damage",
        role: "Melee burst DPS",
        damage: "Melee physical",
        range: "Close",
        difficulty: "Advanced",
        bestFor: "Boss burst, arena, target elimination",
        statPriority: "STR → HIT / AGI → VIT",
        gearTargets: ["ATK", "Melee P.DMG", "HIT", "Burst damage", "SP recovery", "Max HP"],
        summary:
          "Monk converts the Acolyte foundation into a resource-sensitive melee burst route. It rewards deliberate setup, accurate target selection, and saving the finisher for a real kill or boss window.",
        skillPlan: [
          "Prioritize the resource-generation and core combo skills required by the finisher.",
          "Build one complete burst sequence before taking several unrelated utility attacks.",
          "Add movement, control, and defensive options once the combo is reliable.",
        ],
        rotation: [
          "Prepare the class resource or stance before entering the burst window.",
          "Use movement or control to secure contact with the chosen target.",
          "Complete the setup attacks, then commit the finisher only when it can land safely.",
          "Disengage or return to resource generation instead of remaining exposed after the burst cycle.",
        ],
        pve:
          "Strong concentrated damage when the setup is uninterrupted. General farming can feel slower than ranged AoE classes, so target valuable enemies rather than inefficient large pulls.",
        pvp:
          "Dangerous against isolated targets but punishable after the burst is spent. HIT, control timing, and target selection are essential.",
        budget:
          "More demanding than Priest because the build needs offense, accuracy, survivability, and resource support. Complete one burst setup before chasing luxury secondary stats.",
      },
    ],
    f2pPlan: [
      "Choose Priest support or Monk damage before selecting long-term equipment.",
      "Priest should prioritize healing, SP, and survival; Monk should prioritize a complete accurate burst cycle.",
      "Use party demand to accelerate Priest progression rather than forcing a pure solo routine.",
      "Keep separate presets when switching between support and damage roles.",
    ],
    mistakes: [
      "Trying to use one stat distribution for both Priest and Monk.",
      "Spending emergency healing before the dangerous phase begins.",
      "Building a Monk finisher without the setup, accuracy, or resource engine needed to land it.",
    ],
    faqs: [
      {
        question: "Is Priest a good F2P class?",
        answer:
          "Yes. Priest provides valuable healing and support without requiring top damage gear. F2P players should prioritize healing power, SP sustain, survivability, and the buffs their regular party uses most.",
      },
      {
        question: "Is Monk better than Priest for solo play?",
        answer:
          "Monk has stronger direct combat and burst potential, while Priest is safer and more valuable in parties. Monk also demands a more focused offensive and accuracy investment.",
      },
    ],
  },
  thief: {
    slug: "thief-builds",
    className: "Thief",
    title: "Thief Builds: Assassin CRIT and Burst",
    eyebrow: "Mobility, single-target pressure and target elimination",
    lead:
      "Thief becomes Assassin for the current supported damage route. Build either sustained CRIT pressure or a focused burst setup, but keep enough HIT and survivability to reach real targets consistently.",
    description:
      "Plan Ragnarok: The New World Thief and Assassin builds for CRIT, sustained PvE, poison or burst PvP, including stats, equipment, rotations, F2P priorities, and Rogue availability notes.",
    openGraphDescription:
      "Build Assassin CRIT or burst setups with practical accuracy, mobility, equipment, PvE, PvP, and F2P guidance.",
    icon: "/media/images/job/icon_jsxq_601.webp",
    lineage: "Thief → Assassin / Rogue",
    availability:
      "Assassin → Assassin Cross → Guillotine Cross is represented in the English Skill Planner. Rogue, Stalker, and Shadow Chaser appear in the class tree but currently expose no English skill data.",
    builds: [
      {
        id: "assassin-crit",
        title: "Assassin CRIT",
        subtitle: "Sustained melee pressure and boss uptime",
        role: "Single-target physical DPS",
        damage: "Melee physical",
        range: "Close",
        difficulty: "Moderate",
        bestFor: "Bosses, sustained PvE, mobile farming",
        statPriority: "AGI / STR → LUK / HIT → VIT",
        gearTargets: ["ATK", "Melee P.DMG", "ASPD", "CRIT", "HIT", "FLEE"],
        summary:
          "The sustained route uses attack speed, CRIT, and mobility to maintain pressure. Accuracy still matters against difficult targets, and pure glass-cannon investment can lose more uptime than it gains.",
        skillPlan: [
          "Max the primary repeatable attack and passives supporting the chosen weapon style.",
          "Add CRIT or attack-speed scaling only after the core damage engine is complete.",
          "Take movement, concealment, or escape tools before optional low-use attacks.",
        ],
        rotation: [
          "Approach from a safe angle and activate offensive buffs before contact.",
          "Maintain the repeatable attack loop while staying behind or beside the target when possible.",
          "Use movement to follow mechanics rather than remaining inside dangerous ground effects.",
          "Save escape for forced disengagement or enemy counter-control.",
        ],
        pve:
          "Strong sustained boss damage when melee uptime is safe. Large-group farming is less efficient than dedicated AoE classes.",
        pvp:
          "Useful for extended pressure, but coordinated enemies can punish predictable melee commitment. Mobility and target selection remain essential.",
        budget:
          "Build ATK, accuracy, and one reliable weapon first. Add CRIT and ASPD breakpoints gradually instead of sacrificing every defensive stat.",
      },
      {
        id: "assassin-burst",
        title: "Assassin burst",
        subtitle: "Stealth approach and fast elimination",
        role: "PvP burst assassin",
        damage: "Melee physical with debuffs",
        range: "Close",
        difficulty: "Advanced",
        bestFor: "Arena, small-team PvP, priority targets",
        statPriority: "STR → HIT / burst → AGI / VIT",
        gearTargets: ["Burst P.DMG", "ATK", "HIT", "Penetration", "Status accuracy", "Max HP"],
        summary:
          "The burst route spends more resources on a short elimination window. It succeeds when the Assassin enters at the right time, lands the setup, and leaves before the enemy team can trade back.",
        skillPlan: [
          "Build one complete engage-to-finisher sequence.",
          "Prioritize accuracy and the debuff or setup that enables the main burst skill.",
          "Take concealment, movement, and escape before secondary damage branches.",
        ],
        rotation: [
          "Wait until enemy control or defensive cooldowns are committed elsewhere.",
          "Use concealment or movement to enter from an angle with limited counter-pressure.",
          "Apply the setup or debuff, commit the burst sequence, then evaluate the kill immediately.",
          "Escape after the window instead of chasing through the enemy frontline.",
        ],
        pve:
          "Effective for priority enemies and boss burst, but less efficient for repetitive large pulls.",
        pvp:
          "One of the strongest target-elimination identities when accuracy and timing are sufficient. Poor target selection leaves the build exposed with no cooldowns.",
        budget:
          "F2P burst is viable but unforgiving. Secure a dependable weapon and enough HIT before buying expensive peak-damage pieces.",
      },
    ],
    f2pPlan: [
      "Use Assassin as the supported progression route until Rogue skill data is available.",
      "Build one weapon and one damage identity: sustained CRIT or short burst.",
      "Keep HIT at a practical level before increasing CRIT or penetration.",
      "Treat mobility and survival as required damage uptime, not optional utility.",
    ],
    mistakes: [
      "Assuming CRIT removes every accuracy requirement.",
      "Entering before enemy control cooldowns are committed.",
      "Funding both sustained and burst gear before either setup is complete.",
    ],
    faqs: [
      {
        question: "Is Assassin good for F2P players?",
        answer:
          "Assassin is playable as F2P but needs focused investment. A dependable weapon, sufficient HIT, and one clear sustained or burst route are more important than collecting several partial gear sets.",
      },
      {
        question: "Can I build Rogue now?",
        answer:
          "Rogue, Stalker, and Shadow Chaser appear in the current class index, but their English skill data is not currently available in the Skill Planner. The guide therefore avoids inventing a Rogue build.",
      },
    ],
  },
  merchant: {
    slug: "merchant-builds",
    className: "Merchant",
    title: "Merchant Builds: Blacksmith and Alchemist",
    eyebrow: "Economy utility, melee enhancement and chemical support",
    lead:
      "Merchant can become a weapon-focused Blacksmith or a utility-heavy Alchemist. Both add account value beyond personal damage, but they require different stats, equipment, and expectations for solo progression.",
    description:
      "Plan Ragnarok: The New World Merchant builds for Blacksmith, Whitesmith, Mechanic, Alchemist, and Creator with stats, equipment, rotations, PvE, PvP, economy, and F2P priorities.",
    openGraphDescription:
      "Compare Blacksmith melee and Alchemist utility builds with practical economy, equipment, PvE, PvP, and F2P advice.",
    icon: "/media/images/job/icon_jsxq_701.webp",
    lineage: "Merchant → Blacksmith / Alchemist",
    availability:
      "The English data currently includes Blacksmith → Whitesmith → Mechanic and Alchemist → Creator. A later Alchemist job is not represented in the current English index.",
    builds: [
      {
        id: "blacksmith-melee",
        title: "Blacksmith melee",
        subtitle: "Weapon enhancement and physical pressure",
        role: "Melee physical DPS and party enhancement",
        damage: "Melee physical",
        range: "Close",
        difficulty: "Moderate",
        bestFor: "Bosses, party buffs, economy-focused accounts",
        statPriority: "STR → HIT / AGI → VIT",
        gearTargets: ["ATK", "Melee P.DMG", "HIT", "ASPD", "Max HP", "Weapon bonuses"],
        summary:
          "Blacksmith combines direct melee output with weapon-related utility. A focused weapon route and reliable buff uptime produce more value than spreading points across every crafting and combat option.",
        skillPlan: [
          "Prioritize the main weapon attack and the enhancement buffs used in every fight.",
          "Take passives matching the chosen weapon rather than several incompatible routes.",
          "Add crafting or economy utility after the combat loop is dependable.",
        ],
        rotation: [
          "Apply weapon and party enhancements before the pull.",
          "Engage with the main physical attack loop and maintain buff uptime.",
          "Use burst or control during boss vulnerability windows.",
          "Refresh buffs between phases instead of interrupting the strongest damage sequence.",
        ],
        pve:
          "Useful when personal melee damage and group enhancement both matter. Farming comfort depends on mobility, accuracy, and access to an efficient repeatable attack.",
        pvp:
          "Can contribute pressure and team enhancement, but requires durability to survive frontline contact.",
        budget:
          "One dependable weapon and practical buff uptime are the first priorities. Economy benefits can offset progression costs, but do not overinvest in crafting before the combat setup functions.",
      },
      {
        id: "alchemist-utility",
        title: "Alchemist utility",
        subtitle: "Chemical damage, support and preparation",
        role: "Utility damage and support",
        damage: "Mixed utility damage",
        range: "Mid",
        difficulty: "Advanced",
        bestFor: "Prepared group play, utility PvE, account support",
        statPriority: "INT / STR → VIT → cast / resource utility",
        gearTargets: ["Skill damage", "INT / STR", "SP recovery", "Cast comfort", "Max HP", "Utility bonuses"],
        summary:
          "Alchemist rewards preparation and a clear choice between personal damage and support utility. The build should avoid collecting many situational skills without enough resources to sustain them.",
        skillPlan: [
          "Choose the primary chemical, summon, or support engine and complete it first.",
          "Take the resource and duration passives that keep the selected engine active.",
          "Add emergency support or secondary damage only after the main setup is sustainable.",
        ],
        rotation: [
          "Prepare required resources and long-duration effects before combat.",
          "Establish the main utility or damage engine before spending secondary cooldowns.",
          "Use support items or effects during real danger rather than routine damage.",
          "Rebuild resources between encounters instead of entering the next pull incomplete.",
        ],
        pve:
          "Flexible in organized content but more preparation-heavy than straightforward damage classes. Efficiency improves when the same utility benefits several party members.",
        pvp:
          "Potentially disruptive and supportive, but vulnerable when caught without preparation or defensive stats.",
        budget:
          "Start with broadly useful stats and one complete utility engine. Avoid buying several niche consumable or equipment paths before identifying the content you play most.",
      },
    ],
    f2pPlan: [
      "Choose Blacksmith combat enhancement or Alchemist utility before committing skill points.",
      "Use Merchant's economy value to support one primary combat set.",
      "Prioritize reusable upgrades before expensive situational resources.",
      "Keep preparation costs proportional to the rewards of the content being cleared.",
    ],
    mistakes: [
      "Treating every crafting or utility node as mandatory.",
      "Spreading stats between incompatible Blacksmith and Alchemist setups.",
      "Spending more preparation resources than the activity returns.",
    ],
    faqs: [
      {
        question: "Is Merchant good for a main character?",
        answer:
          "Merchant can be a strong account-focused main when you value economy and group utility. Direct progression may feel slower than dedicated farming classes, so one focused Blacksmith or Alchemist combat route is important.",
      },
      {
        question: "Which Merchant branch is easier for F2P?",
        answer:
          "Blacksmith is generally easier for straightforward combat because one weapon and buff package can carry progression. Alchemist is flexible but may require more preparation and resource management.",
      },
    ],
  },
  gunslinger: {
    slug: "gunslinger-builds",
    className: "Gunslinger",
    title: "Gunslinger Builds: Rebel and Night Watch",
    eyebrow: "Weapon-specialized ranged burst and boss damage",
    lead:
      "Gunslinger offers a high ranged damage ceiling through Rebel and Night Watch, but weapon specialization matters. Choose handgun mobility, rifle precision, or heavier AoE pressure before investing deeply.",
    description:
      "Plan Ragnarok: The New World Gunslinger, Rebel, and Night Watch builds for handgun, rifle, and AoE weapons with stats, equipment, rotations, PvE, PvP, and F2P priorities.",
    openGraphDescription:
      "Compare mobile handgun, rifle burst, and heavier AoE Gunslinger builds with practical weapon and budget guidance.",
    icon: "/media/images/job/icon_jsxq_801.webp",
    lineage: "Gunslinger → Rebel → Night Watch",
    availability:
      "Gunslinger → Rebel → Night Watch is represented in the English Skill Planner. The following job entry is currently labelled “Not yet available,” so this guide does not assign it an unofficial name.",
    builds: [
      {
        id: "handgun-mobile",
        title: "Handgun mobility",
        subtitle: "Fast ranged pressure and repositioning",
        role: "Mobile ranged DPS",
        damage: "Ranged physical",
        range: "Mid to long",
        difficulty: "Moderate",
        bestFor: "General PvE, mobile farming, arena",
        statPriority: "DEX / AGI → HIT / CRIT → VIT",
        gearTargets: ["Ranged P.DMG", "ATK", "ASPD", "HIT", "CRIT", "Movement"],
        summary:
          "The handgun route emphasizes movement and continuous pressure. It is the most flexible everyday setup when you need to reposition often and cannot rely on a long stationary burst window.",
        skillPlan: [
          "Max the repeatable handgun attack and its weapon passives first.",
          "Add movement-compatible burst and one practical AoE option.",
          "Take reload, resource, or cooldown utility that prevents rotation downtime.",
        ],
        rotation: [
          "Maintain range while using the repeatable handgun attack.",
          "Commit burst after the target uses movement or defensive tools.",
          "Reposition during reload or low-damage downtime.",
          "Save one movement skill for mechanics or enemy engage rather than using every charge offensively.",
        ],
        pve:
          "Comfortable for varied content and open-world movement. Peak boss damage may trail a fully specialized rifle setup.",
        pvp:
          "Strong when constant movement prevents enemy contact. Accuracy and disciplined escape timing are essential.",
        budget:
          "The most practical F2P Gunslinger route because one mobile weapon setup covers many activities. Build ATK and HIT before luxury ASPD or CRIT breakpoints.",
      },
      {
        id: "rifle-burst",
        title: "Rifle burst",
        subtitle: "Long-range precision and boss windows",
        role: "Single-target ranged burst",
        damage: "Ranged physical",
        range: "Very long",
        difficulty: "Advanced",
        bestFor: "Bosses, MVPs, priority-target PvP",
        statPriority: "DEX → HIT / CRIT → survivability",
        gearTargets: ["Ranged P.DMG", "Burst damage", "ATK", "HIT", "CRIT", "Penetration"],
        summary:
          "The rifle route converts preparation and positioning into concentrated single-target damage. It performs best when the user can predict boss windows or attack from protected angles.",
        skillPlan: [
          "Prioritize the rifle finisher, its setup skill, and weapon-specific passives.",
          "Take reload or resource support needed to repeat the burst cycle.",
          "Add one defensive or movement tool before optional secondary-weapon attacks.",
        ],
        rotation: [
          "Position before the vulnerability window begins.",
          "Apply the setup or mark, then use the strongest rifle cooldowns in sequence.",
          "Use lower-cost attacks while the main burst recovers.",
          "Move immediately when the position becomes unsafe instead of forcing one extra cast.",
        ],
        pve:
          "A leading single-target identity when the encounter allows stable positioning. Less efficient for rapid weak-enemy farming.",
        pvp:
          "Threatening against exposed priority targets, but vulnerable to dives and line-of-sight pressure.",
        budget:
          "High ceiling but more demanding than handgun. Secure one strong rifle and reliable accuracy before investing in expensive peak-burst modifiers.",
      },
      {
        id: "heavy-aoe",
        title: "Heavy AoE",
        subtitle: "Shotgun or explosive group clearing",
        role: "Ranged area DPS",
        damage: "Ranged physical AoE",
        range: "Short to long by weapon",
        difficulty: "Moderate",
        bestFor: "Dungeon waves, grouped farming, area denial",
        statPriority: "DEX → HIT / damage → VIT",
        gearTargets: ["AoE P.DMG", "ATK", "HIT", "Cooldown recovery", "Max HP", "Resource sustain"],
        summary:
          "The heavier-weapon route focuses on grouped enemies and area denial. It should be built around one weapon's range and resource pattern rather than mixing shotgun and explosive skills without enough points.",
        skillPlan: [
          "Choose shotgun or explosive emphasis and complete that weapon package first.",
          "Prioritize the repeatable AoE and its cooldown or resource support.",
          "Add close-range defense for shotgun or positioning tools for longer-range explosive play.",
        ],
        rotation: [
          "Wait until enemies are grouped before spending the major AoE cooldown.",
          "Use the repeatable area attack to maintain pressure after the first burst.",
          "Reposition according to the selected weapon's effective range.",
          "Avoid emptying every resource on weak enemies before an elite or boss wave.",
        ],
        pve:
          "Strong for dungeon waves and grouped farming. Single-target efficiency depends on the selected weapon and supporting skills.",
        pvp:
          "Useful for area denial and punishing stacked teams, but easier to avoid when cast patterns are predictable.",
        budget:
          "F2P players should select one heavy weapon. Funding handgun, rifle, shotgun, and explosive gear together is the fastest way to stall progression.",
      },
    ],
    f2pPlan: [
      "Choose one weapon family before refining or buying specialized gear.",
      "Handgun is the most flexible general route; rifle is the focused boss route; heavy weapons specialize in grouped enemies.",
      "Build HIT and a reliable resource loop before peak burst modifiers.",
      "Do not invest around the unnamed next job until the English data publishes its actual identity and skills.",
    ],
    mistakes: [
      "Funding several weapon families at once.",
      "Building maximum burst without reload, resource, or positioning support.",
      "Using every movement option offensively and having no answer to a dive or mechanic.",
    ],
    faqs: [
      {
        question: "Which Gunslinger weapon is best for F2P?",
        answer:
          "Handgun is the most flexible starting recommendation because one mobile setup works across many activities. Rifle offers stronger focused boss windows, while heavier weapons are better for grouped enemies.",
      },
      {
        question: "What comes after Night Watch?",
        answer:
          "The current English class data contains a following entry labelled “Not yet available.” This guide avoids assigning an unofficial class name until the client data publishes one.",
      },
    ],
  },
};

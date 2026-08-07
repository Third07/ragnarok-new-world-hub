import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  slug: "monk-build",
  title: "Ragnarok: The New World Monk Build Guide",
  seoTitle: "RTNW Monk Build Guide 2026: Combo, Guillotine Fist & Sphere",
  description:
    "Build Monk in Ragnarok: The New World with released-class skill priorities, Spirit Sphere management, combo and Guillotine Fist rotations, ranged Throw Spirit Sphere options, and PvP defensive tools.",
  kicker: "Released Class Build Guide",
  dek:
    "Monk is live. Build around one clear damage route, keep Spirit Sphere generation reliable, and use the class's mobility and defensive skills to protect your burst windows.",
  category: "Classes and Builds",
  heroImage: "/assets/rtnw-hero-1280.webp",
  heroAlt: "Ragnarok: The New World Monk build guide",
  sourceUrl: "/sea/skill_planner/",
  sourceTitle: "Open the RTNW Skill Planner",
  sourceKind: "internal-data",
  sourceNote:
    "This guide uses the current English Monk job dataset in RTNW Hub (job 522) together with the live skill planner. Numeric skill values below come from that dataset; build routes and rotations are RTNW Hub recommendations for the released class.",
  sourceStatus:
    "Released-class guide using current English Monk job data (job 522). Skill multipliers and balance can change in later patches, so recheck the planner after major updates.",
  warning:
    "Monk is released and playable. The skill values on this page reflect the current English RTNW dataset; future balance patches can change multipliers, cooldowns, or optimal point distribution.",
  metaLabel: "Released class · Data-backed guide",
  published: "2026-08-08",
  modified: "2026-08-08",
  readTime: "9 min read",
  keywords: [
    "Ragnarok The New World Monk build",
    "Ragnarok New World Monk build",
    "RTNW Monk build",
    "RONW Monk build",
    "Ragnarok The New World Monk skills",
    "Ragnarok New World Guillotine Fist",
    "Ragnarok New World Spirit Sphere",
    "Ragnarok New World Monk combo",
    "Acolyte Monk build",
  ],
  quickFacts: [
    ["Release status", "Released / live class"],
    ["Job branch", "Acolyte → Monk"],
    ["Job ID", "522"],
    ["Skill-point limit", "40"],
    ["Core resource", "Spirit Spheres, up to 5"],
    ["Main damage routes", "Combo DPS, Throw Spirit Sphere, Guillotine Fist burst"],
    ["Mobility", "Body Relocation"],
    ["Sustain", "Spiritual Cadence"],
  ],
  sections: [
    {
      id: "overview",
      title: "Monk is released: what the class actually plays like",
      paragraphs: [
        "Monk is the physical-damage branch of Acolyte built around Spirit Spheres, short combo windows, burst spending, mobility, and unusually strong defensive utility. The current English data lists Monk as job 522 with a 40-point skill limit.",
        "The class does not need to be treated as a preview anymore. The useful build question is which live mechanic you want to emphasize: the Raging combo chain for melee pressure, Throw Spirit Sphere for ranged damage, Guillotine Fist for committed burst, or a PvP-oriented setup that invests more heavily in Root and Mental Strength.",
      ],
    },
    {
      id: "core-skills",
      title: "Core Monk skills and Spirit Sphere economy",
      table: {
        headers: ["Skill", "Current English data", "Build use"],
        rows: [
          ["Charge", "Summons 1 Spirit Sphere; up to 5 can be held.", "The basic resource generator used by every Monk route."],
          ["Fury", "Consumes 5 Spirit Spheres. At Lv.3, P.DMG +15% for 600 sec and the Large-target weapon size modifier becomes 100%.", "Long-duration physical damage setup; plan how you will rebuild spheres after spending the full stack."],
          ["Spiritual Cadence", "Meditates for 3 sec, restores HP/SP, and gains 1 Spirit Sphere every second. Lv.5 lists 30% HP/SP restoration.", "Recovery and sphere rebuilding between burst or combo cycles."],
          ["Body Relocation", "Dashes 5 m in the target direction with a 5 sec cooldown.", "Gap close, disengage, mechanic dodge, and PvP target access."],
          ["Flee", "Passive FLEE bonus; Lv.5 lists +28 FLEE.", "Low-maintenance survivability for melee-focused setups."],
        ],
      },
      note:
        "Spirit Spheres are not just a prerequisite check. Fury spends all five, Raging Thrust spends one, Throw Spirit Sphere spends one, Root spends one, and several defensive or burst tools can consume a full stack. Good Monk play is largely resource sequencing.",
    },
    {
      id: "builds",
      title: "Recommended Monk build directions",
      paragraphs: [
        "Do not spread the 40 Monk points evenly across every branch. Choose one primary damage engine first, then buy the defensive and recovery tools that solve the content you actually play.",
      ],
      table: {
        headers: ["Build", "Core skills", "Best use", "Main trade-off"],
        rows: [
          ["Melee Combo DPS", "Raging Trifecta Blow → Raging Quadruple Blow → Raging Thrust, plus Charge", "Sustained single-target PvE and active melee play", "Requires clean combo timing and at least one sphere for Raging Thrust."],
          ["Throw Spirit Sphere", "Throw Spirit Sphere, Charge, Spiritual Cadence", "Safer ranged pressure, target swapping, and kiting", "Damage uptime is limited by sphere generation if you spend faster than you rebuild."],
          ["Guillotine Fist Burst", "Guillotine Fist, five-sphere preparation, required Fury Unleashed state, Spiritual Cadence", "Boss burst and committed PvP finishing windows", "Consumes five spheres and all SP, then forces a recovery period."],
          ["Defensive / PvP Monk", "Root, Mental Strength, Body Relocation, Flee", "Survival, counter-engage, duels, and group PvP utility", "More points in defense means fewer points available for maximum damage scaling."],
        ],
      },
    },
    {
      id: "combo",
      title: "Melee combo build and rotation",
      paragraphs: [
        "The current tree defines a clear three-stage melee chain. Raging Quadruple Blow can be used within three seconds after Raging Trifecta Blow, and Raging Thrust can be used within three seconds after Raging Quadruple Blow. Raging Thrust consumes one Spirit Sphere.",
      ],
      steps: [
        { title: "Prepare at least one Spirit Sphere", text: "Raging Thrust needs one sphere. Enter the combo with the resource already available instead of stopping after the second skill." },
        { title: "Open with Raging Trifecta Blow", text: "This is the combo starter and establishes the first three-second follow-up window." },
        { title: "Follow with Raging Quadruple Blow", text: "Use it inside the Trifecta window. The skill performs a multi-hit Neutral melee follow-up." },
        { title: "Finish with Raging Thrust", text: "Use it inside the Quadruple window. At natural Lv.10, the current data lists 1500% Neutral Melee P.DMG and a one-sphere cost." },
        { title: "Rebuild and reposition", text: "Use Charge or Spiritual Cadence to restore sphere economy and Body Relocation when you need to reconnect with the target or avoid mechanics." },
      ],
    },
    {
      id: "guillotine",
      title: "Guillotine Fist burst build",
      paragraphs: [
        "Guillotine Fist is the class's high-commitment burst skill. The current English data says it can be used while in Fury Unleashed, consumes five Spirit Spheres and all remaining SP, removes Fury Unleashed after casting, and applies Spirit Exhaustion for 10 seconds.",
        "At natural Lv.10, the listed formula is [(150 + Remaining SP/10) × 100]% forced Neutral Melee P.DMG. In PvP, the skill also lists additional damage equal to 10% of the target's current HP. This makes SP and sphere preparation part of the damage setup rather than an afterthought.",
      ],
      steps: [
        { title: "Enter the burst window with five spheres", text: "Guillotine Fist consumes the full five-sphere stack, so do not spend spheres casually immediately before your finisher." },
        { title: "Preserve SP before the cast", text: "The damage formula scales with remaining SP and the skill consumes all SP, so the burst route rewards deliberate resource preparation." },
        { title: "Commit only when the target is reachable", text: "Use Body Relocation and positioning first. A missed or poorly timed burst costs the full sphere and SP setup." },
        { title: "Plan the 10-second recovery", text: "After the finisher, transition into survival, movement, or resource rebuilding instead of expecting an immediate second burst." },
      ],
    },
    {
      id: "sphere",
      title: "Throw Spirit Sphere ranged build",
      paragraphs: [
        "Throw Spirit Sphere gives Monk a real ranged damage option rather than forcing every build into point-blank melee. It consumes one Spirit Sphere per cast and is tagged as Neutral Ranged physical damage in the current English data.",
      ],
      table: {
        headers: ["Throw Spirit Sphere value", "Current data"],
        rows: [
          ["Natural Lv.10 multiplier", "900% Neutral Ranged P.DMG"],
          ["Range", "9 m"],
          ["Cooldown", "0.5 sec"],
          ["Sphere cost", "1 Spirit Sphere"],
          ["Practical priority", "Pair high skill investment with reliable Charge / Spiritual Cadence sphere recovery"],
        ],
      },
      note:
        "The ranged route is strongest when your sphere income keeps pace with your cast frequency. Treat Charge and Spiritual Cadence as part of the damage engine, not optional utility.",
    },
    {
      id: "defense",
      title: "PvP and defensive Monk skills",
      paragraphs: [
        "Mental Strength is extremely defensive but deliberately shuts off active skills while it is running. Use it as a survival mode, not as a damage buff. Root is less restrictive and fits more naturally into an aggressive PvP rotation because it combines mitigation with a counter-control effect.",
      ],
      table: {
        headers: ["Skill", "Natural-max behavior in current data", "When to use it"],
        rows: [
          ["Root", "At Lv.10: consumes 1 sphere, gives +28% P.DMG and M.DMG Reduction for 5 sec; being attacked during the state Silences and Roots the attacker for 2 sec.", "Counter-engage, duels, surviving an enemy burst window."],
          ["Mental Strength", "At Lv.10: consumes 5 spheres and gives +90% P.DMG and M.DMG Reduction for 10 sec, but active skills cannot be used and MSPD is reduced by 30%.", "Emergency survival, soaking predictable damage, stalling while a team resets."],
          ["Body Relocation", "5 m directional dash, 5 sec cooldown.", "Engage, escape, dodge, and target access."],
          ["Flee", "Lv.5 grants +28 FLEE.", "Passive survivability when you can afford the points."],
        ],
      },
    },
    {
      id: "skill-priority",
      title: "How to spend Monk's 40 skill points",
      bullets: [
        "Every build needs Charge because Spirit Spheres are the shared resource for Monk's major offensive and defensive skills.",
        "Combo DPS should prioritize the Trifecta → Quadruple → Thrust chain before spending heavily on secondary defensive branches.",
        "Throw Spirit Sphere builds should prioritize Throw Spirit Sphere and the recovery tools that keep sphere income sustainable.",
        "Guillotine Fist builds should prioritize the finisher and the sphere/SP recovery needed to prepare repeated burst windows.",
        "PvP builds can shift spare points into Root, Mental Strength, Body Relocation, and Flee depending on whether the role needs counter-control, emergency mitigation, or mobility.",
        "Use the Skill Planner before committing the final 40-point distribution so prerequisites and your exact route are visible together.",
      ],
      note:
        "The guide intentionally recommends priority order rather than pretending one 40-point allocation is universally best. Monk has several legitimate live routes, and the correct utility split changes between PvE farming, bossing, arena, and group PvP.",
    },
  ],
  faqs: [
    {
      question: "Is Monk released in Ragnarok: The New World?",
      answer:
        "Yes. Monk is released and playable. RTNW Hub's current English data lists Monk as job 522 under the Acolyte branch with a 40-point skill limit.",
    },
    {
      question: "What is the best Monk build in Ragnarok: The New World?",
      answer:
        "For sustained melee damage, build around Raging Trifecta Blow, Raging Quadruple Blow, and Raging Thrust. For ranged pressure, build around Throw Spirit Sphere. For committed burst, Guillotine Fist is the defining finisher. PvP builds should reserve more points for Root, Mental Strength, and Body Relocation.",
    },
    {
      question: "How many Spirit Spheres can Monk hold?",
      answer:
        "The current Charge skill data allows up to five Spirit Spheres. Several major Monk skills consume one or all five, so sphere management is central to every build.",
    },
    {
      question: "What is Monk's main combo?",
      answer:
        "The live data defines Raging Trifecta Blow into Raging Quadruple Blow, then Raging Thrust. Each follow-up has a three-second activation window, and Raging Thrust consumes one Spirit Sphere.",
    },
    {
      question: "How does Guillotine Fist work?",
      answer:
        "Guillotine Fist consumes five Spirit Spheres and all SP while in its required Fury Unleashed state. Its damage scales with remaining SP, it removes Fury Unleashed after the cast, and it applies Spirit Exhaustion for 10 seconds. The current PvP data also lists additional damage equal to 10% of the target's current HP.",
    },
    {
      question: "Is Throw Spirit Sphere a real ranged Monk build?",
      answer:
        "Yes. Throw Spirit Sphere is listed as Neutral Ranged physical damage with 9 m range and a one-sphere cost. At natural Lv.10, the current data lists a 900% multiplier and a 0.5-second cooldown.",
    },
  ],
  related: [
    ["Monk Skill Planner", "/sea/skill_planner/"],
    ["Rune Planner", "/sea/rune_planner/"],
    ["Affix Planner", "/sea/affix_planner/"],
    ["Equipment Database", "/sea/equipment/"],
    ["Card Database", "/sea/cards/"],
    ["Acolyte / Priest Build Guide", "/guides/acolyte-builds/"],
    ["All Classes and Builds", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;

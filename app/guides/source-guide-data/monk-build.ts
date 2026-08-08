import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  slug: "monk-build",
  title: "Ragnarok: The New World Monk Build Guide",
  seoTitle: "RTNW Monk Builds: Combo, Guillotine Fist & PVP",
  description: "Build a released Ragnarok: The New World Monk around Spirit Spheres, combo skills, Guillotine Fist burst, ranged pressure, or defensive PVP tools with practical skill and stat priorities.",
  kicker: "Released Class Build Guide",
  dek: "Generate Spirit Spheres deliberately, then spend them on a complete combo, Guillotine Fist burst, ranged pressure, or defensive control.",
  category: "Classes and Builds",
  heroImage: "/assets/rtnw-hero-1280.webp",
  heroAlt: "Ragnarok: The New World Monk build and skill guide",
  published: "2026-08-08",
  modified: "2026-08-08",
  readTime: "8 min read",
  keywords: [
    "Ragnarok The New World Monk build",
    "RTNW Monk build",
    "Monk combo build",
    "Monk Guillotine Fist build",
    "Monk Spirit Sphere guide",
  ],
  quickFacts: [
    ["Release status", "Released and playable"],
    ["Job path", "Acolyte → Monk"],
    ["Skill-point limit", "40 Monk points"],
    ["Core resource", "Up to 5 Spirit Spheres"],
    ["Main damage routes", "Combo chain, Guillotine Fist, or Throw Spirit Sphere"],
    ["PVP utility", "Root, Mental Strength, and Body Relocation"],
  ],
  sections: [
    {
      id: "resource",
      title: "How Monk's Spirit Sphere loop works",
      paragraphs: [
        "Monk is released, and its build starts with resource flow rather than one isolated damage skill. Charge creates one Spirit Sphere up to a five-sphere cap. Spiritual Cadence restores HP and SP while generating one sphere per second during its channel.",
        "Decide what the next five spheres are for before spending them. Fury uses a full stack for a long physical-damage buff, Mental Strength uses five for a short defensive stance, and Guillotine Fist needs Fury plus another five-sphere setup for its finishing burst.",
      ],
      table: {
        headers: ["Skill", "Sphere cost", "Purpose", "Planning note"],
        rows: [
          ["Charge", "Generates 1", "Basic setup", "Build to five before a major sequence"],
          ["Spiritual Cadence", "Generates during channel", "Recovery and setup", "Use from a safe position"],
          ["Fury", "Consumes 5", "Long physical-damage buff", "Required before Guillotine Fist"],
          ["Raging Thrust", "Consumes 1", "Combo finisher", "Available after Quadruple Blow"],
          ["Throw Spirit Sphere", "Consumes 1", "Ranged physical pressure", "Preserve enough spheres for the next plan"],
          ["Mental Strength", "Consumes 5", "Emergency mitigation", "Locks active skills and slows movement"],
        ],
      },
    },
    {
      id: "combo",
      title: "Combo Monk build",
      paragraphs: [
        "The core chain is Raging Trifecta Blow into Raging Quadruple Blow, followed by Raging Thrust. Quadruple Blow must be used within three seconds of Trifecta, and Thrust has the same three-second follow-up window after Quadruple Blow.",
        "A practical combo build prioritizes access to the entire chain before overleveling one middle skill. Raise physical damage and attack consistency, maintain at least one Spirit Sphere for Raging Thrust, and practice the sequence until movement or target switching no longer breaks the window.",
      ],
      steps: [
        { title: "Prepare", text: "Generate spheres and activate Fury when the upcoming fight is long enough to justify spending the full stack." },
        { title: "Open", text: "Use Raging Trifecta Blow and immediately confirm the three-second follow-up window." },
        { title: "Continue", text: "Cast Raging Quadruple Blow, then reserve one sphere for Raging Thrust." },
        { title: "Reset", text: "Rebuild spheres with Charge or Spiritual Cadence before committing to the next chain." },
      ],
    },
    {
      id: "guillotine",
      title: "Guillotine Fist burst build",
      paragraphs: [
        "Guillotine Fist is the high-commitment finisher. It requires Fury, consumes five Spirit Spheres and all remaining SP, removes Fury afterward, and applies a ten-second Spirit Exhaustion period. Its formula also scales with remaining SP, so casting it from an empty resource bar wastes the skill's defining advantage.",
        "Build this route around STR, physical damage, SP capacity, and a reliable setup window. Use Body Relocation to reach or escape a target, but do not spend the burst until Fury, five spheres, and a healthy SP pool are ready.",
      ],
      note: "Guillotine Fist is not a normal cooldown button. Treat it as a planned finisher with a recovery phase, especially in PVP where a failed attempt leaves Monk exposed.",
    },
    {
      id: "pvp",
      title: "PVP control and defensive tools",
      bullets: [
        "Root consumes one Spirit Sphere and enters a blocking state. When hit, it can Silence and Root the attacker, making it useful against predictable engages.",
        "Mental Strength spends five spheres for major physical and magic damage reduction, but active skills become unavailable and movement speed drops during the stance.",
        "Body Relocation is a five-meter directional dash that can start an engage, close distance for Guillotine Fist, or disengage after a failed combo.",
        "Throw Spirit Sphere gives Monk a ranged physical option when entering melee would be unsafe, but every throw delays the next five-sphere setup.",
      ],
    },
    {
      id: "build-plan",
      title: "Monk build priorities by playstyle",
      table: {
        headers: ["Route", "Stat direction", "Skill priority", "Best fit"],
        rows: [
          ["Combo", "STR with AGI and enough VIT", "Full Trifecta → Quadruple → Thrust chain", "Sustained melee and general play"],
          ["Guillotine Fist", "STR, physical damage, and SP support", "Fury, Guillotine Fist, sphere generation", "Boss windows and PVP finishing"],
          ["Bruiser/Control", "STR + VIT", "Root, Body Relocation, Mental Strength", "PVP frontline disruption"],
          ["Ranged utility", "STR and physical-ranged support", "Throw Spirit Sphere plus mobility", "Safer pressure while waiting to engage"],
        ],
      },
      paragraphs: [
        "Use the live Skill Planner to check prerequisites before assigning the 40 Monk points. A finished mechanic is more valuable than several expensive skills that cannot be supported by the same sphere economy, gear, or rotation.",
      ],
    },
  ],
  faqs: [
    { question: "Is Monk released in Ragnarok: The New World?", answer: "Yes. Monk is released and playable. RTNW Hub's current English data lists it under Acolyte with a 40-point Monk skill limit." },
    { question: "How many Spirit Spheres can Monk hold?", answer: "Monk can hold up to five Spirit Spheres. Charge generates one, while Spiritual Cadence can generate spheres during its recovery channel." },
    { question: "What is the Monk combo order?", answer: "Use Raging Trifecta Blow, follow with Raging Quadruple Blow within three seconds, then use Raging Thrust within the next three-second window while at least one Spirit Sphere is available." },
    { question: "How does Guillotine Fist work?", answer: "While Fury is active, Guillotine Fist consumes five Spirit Spheres and all SP, scales partly from remaining SP, removes Fury, and applies Spirit Exhaustion for ten seconds." },
    { question: "Which Monk build is best for beginners?", answer: "The combo route is the easiest general starting point because it teaches sphere management without staking the entire rotation on Guillotine Fist. Add the high-commitment burst route after the setup is comfortable." },
  ],
  related: [
    ["Acolyte and Priest build guide", "/guides/acolyte-builds/"],
    ["High Priest build guide", "/guides/high-priest-builds/"],
    ["Skill Planner", "/sea/skill_planner/"],
    ["Rune Planner", "/sea/rune_planner/"],
    ["Class guides", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;

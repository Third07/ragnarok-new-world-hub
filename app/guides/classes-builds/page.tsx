import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Classes and Builds",
  description:
    "Browse RTNW build guides for Swordman, Mage, Archer, Acolyte, Monk, Thief, Merchant, Gunslinger, and Druid, with stats, traits, cards, skill mechanics, rotations, and progression advice.",
  alternates: { canonical: "/guides/classes-builds/" },
  openGraph: {
    type: "website",
    url: "/guides/classes-builds/",
    title: "Ragnarok: The New World Classes and Builds",
    description:
      "Compare current class builds, stat priorities, second-job traits, Monk skill mechanics, equipment routes, cards, PvE rotations, and F2P investment requirements.",
  },
};

const guides = [
  {
    title: "Class Tier List: F2P, PvE and PvP",
    description:
      "Compare all eight class families in three separate rankings, with practical notes about budget efficiency, farming, boss damage, team utility, and competitive roles.",
    href: "/guides/class-tier-list/",
    label: "Class comparison",
    meta: "8 class families · 3 tier lists",
  },
  {
    title: "Swordman Builds: VIT Tank, AGI Sword and Spear",
    description:
      "Plan an early VIT Knight tank, a high-ASPD AGI Sword route, or a durable Spear setup with traits, cards, aggro management, and boss rotations.",
    href: "/guides/swordman-builds/",
    label: "Knight build guide",
    meta: "VIT Tank · AGI Sword · Spear",
    image: "/assets/guides/swordman-builds/swordsman-hero.webp",
    imageAlt: "Knight standing in the open world",
  },
  {
    title: "Mage Builds: Fire–Earth and Ice–Lightning",
    description:
      "Compare Wizard element pairs, INT and DEX targets, Instant Cast, core traits, card choices, cast-time planning, and PvE spell cycles.",
    href: "/guides/mage-builds/",
    label: "Wizard build guide",
    meta: "Fire–Earth · Ice–Lightning",
    image: "/assets/guides/mage-builds/mage-hero.webp",
    imageAlt: "Mage casting a spell in combat",
  },
  {
    title: "Archer Builds: ADL, Pet and Trap Hunter",
    description:
      "Build around ranged sustained damage, falcon attacks, or traps with ASPD planning, elemental arrows, traits, cards, and safe boss positioning.",
    href: "/guides/archer-builds/",
    label: "Hunter build guide",
    meta: "ADL · Pet · Trap",
    image: "/assets/guides/archer-builds/archer-hero.webp",
    imageAlt: "Archer aiming a bow in the field",
  },
  {
    title: "Acolyte Builds: Support, Exorcist and AGI-Crit",
    description:
      "Complete the essential Support Priest setup first, then compare Holy magic and physical solo alternatives with separate stats and traits.",
    href: "/guides/acolyte-builds/",
    label: "Priest build guide",
    meta: "Support · Exorcist · AGI-Crit",
    image: "/assets/guides/acolyte-builds/acolyte-hero.webp",
    imageAlt: "Priest standing in the field",
  },
  {
    title: "Monk Build & Skill Guide: Spirit Spheres, Fury and Combos",
    description:
      "Use the current English Monk data to understand Spirit Sphere generation, Fury, the Trifecta-to-Quadruple combo, and a safe build-planning route before spending points or gear resources.",
    href: "/guides/monk-build/",
    label: "Data-backed Monk guide",
    meta: "Spirit Spheres · Fury · Combo chain",
  },
  {
    title: "Thief Builds: Dual Dagger, Katar and Venom",
    description:
      "Compare sustained dual-dagger damage, stealth Katar burst, and poison-focused Venom with ASPD, weapon-cost, and boss-resistance tradeoffs.",
    href: "/guides/thief-builds/",
    label: "Assassin build guide",
    meta: "Dual Dagger · Katar · Venom",
    image: "/assets/guides/thief-builds/thief-hero.webp",
    imageAlt: "Assassin character in the desert",
  },
  {
    title: "Merchant Builds: Cart, Axe and Turret",
    description:
      "Use Cart weight for AoE farming, build rapid Axe attacks, or develop summoned Turrets while preserving Merchant's Weapon Perfection team value.",
    href: "/guides/merchant-builds/",
    label: "Merchant build guide",
    meta: "Cart · Axe · Turret",
    image: "/assets/guides/merchant-builds/merchant-hero.webp",
    imageAlt: "Merchant character in Prontera",
  },
  {
    title: "Gunslinger Builds: Pistol, Gatling, Rifle and Shotgun",
    description:
      "Choose the correct firearm for mobile AoE, rapid PVE normal attacks, long-range burst, or PVP control without mixing incompatible traits.",
    href: "/guides/gunslinger-builds/",
    label: "Gunslinger build guide",
    meta: "4 firearm builds",
    image: "/assets/guides/gunslinger-builds/gunslinger-hero.webp",
    imageAlt: "Gunslinger using firearms in combat",
  },
  {
    title: "Druid Builds: Werewolf, Wereraptor and Arcanist",
    description:
      "Choose one of Druid's three distinct combat identities and review its stat direction, equipment targets, skill priorities, starter rotation, and F2P investment warning.",
    href: "/guides/druid-builds/",
    label: "Druid build guide",
    meta: "3 forms · PvE and PvP notes",
  },
];

const steps = [
  "Start with the class tier list and choose the game mode that matters most: F2P progression, PvE, or PvP.",
  "Open the current guide for your class and choose one weapon, element, role, or verified skill mechanic as the primary build.",
  "Use the Skill Planner to confirm the live English skill tree and prerequisites before assigning points.",
  "Use the Equipment, Card, Rune, and Affix tools to translate the guide into a build your account can afford.",
];

const tools = [
  {
    name: "Skill Planner",
    description: "Inspect class trees and plan skill-point priorities.",
    href: "/sea/skill_planner/",
  },
  {
    name: "Rune Planner",
    description: "Compare rune effects after the core build direction is set.",
    href: "/sea/rune_planner/",
  },
  {
    name: "Affix Planner",
    description: "Plan the stat combinations required by the selected build.",
    href: "/sea/affix_planner/",
  },
  {
    name: "Equipment Index",
    description: "Search weapons, armor, stats, slots, and set effects.",
    href: "/sea/equipment/",
  },
];

export default function ClassesBuildsCategoryPage() {
  return (
    <GuideCategoryPage
      currentPath="/guides/classes-builds/"
      eyebrow="Class selection, second-job builds and practical progression"
      title="Classes and Builds"
      summary="Compare practical second-job routes and current class mechanics, then convert one role into a focused skill, equipment, trait, rune, affix, and card plan."
      introduction="Choose one class and one primary role before spreading resources across multiple builds. Each guide turns the core stats, skills, traits, cards, and rotations into a focused plan, then links back to the live database and planning tools for verification."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

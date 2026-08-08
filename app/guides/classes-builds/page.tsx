import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Classes and Builds",
  description:
    "Browse RTNW class and advanced second-job build guides for Monk, Lord Knight, High Wizard, Sniper, High Priest, Assassin Cross, Whitesmith, Night Walker, and more.",
  alternates: { canonical: "/guides/classes-builds/" },
  openGraph: {
    type: "website",
    url: "/guides/classes-builds/",
    title: "Ragnarok: The New World Classes and Builds",
    description:
      "Compare released class builds, advanced second-job skills, stat priorities, equipment traits, Rune Engine choices, cards, rotations, and F2P investment requirements.",
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
    title: "Lord Knight Builds: Tank, AGI Sword and Spear",
    description:
      "Complete the level-70 Tank, AGI Sword, or Spear route with advanced skills, equipment traits, Rune Engine choices, cards, and combat loops.",
    href: "/guides/lord-knight-builds/",
    label: "Advanced Swordman guide",
    meta: "Tank · AGI Sword · Spear",
    image: "/assets/guides/lord-knight-builds/lord-knight-hero.webp",
    imageAlt: "Lord Knight advanced build selection",
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
    title: "High Wizard Builds: Fire, Ice and Ghost",
    description:
      "Strengthen Fire–Earth and Ice–Lightning or build the new Ghost route with Napalm Vulcan, Gravitational Field, traits, runes, and cards.",
    href: "/guides/high-wizard-builds/",
    label: "Advanced Mage guide",
    meta: "Fire–Earth · Ice–Lightning · Ghost",
    image: "/assets/guides/mage-builds/mage-hero.webp",
    imageAlt: "High Wizard casting advanced magic",
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
    title: "Sniper Builds: ADL, Falcon and Trap",
    description:
      "Use advanced ranged passives, focused attacks, Falcon upgrades, or defensive traps with the correct stats, traits, resonance, and cards.",
    href: "/guides/sniper-builds/",
    label: "Advanced Archer guide",
    meta: "ADL · Falcon · Trap",
    image: "/assets/guides/sniper-builds/sniper-hero.webp",
    imageAlt: "Sniper advanced build selection",
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
    title: "High Priest Builds: Support, Battle and Exorcist",
    description:
      "Add party healing, protection, Holy magic, or attack-trigger damage with advanced skills, traits, Rune Engine options, and cards.",
    href: "/guides/high-priest-builds/",
    label: "Advanced Acolyte guide",
    meta: "Support · Battle · Exorcist",
    image: "/assets/guides/high-priest-builds/high-priest-hero.webp",
    imageAlt: "High Priest advanced build selection",
  },
  {
    title: "Monk Builds: Combo, Guillotine Fist and PVP",
    description:
      "Build the released Monk around Spirit Sphere generation, the full combo chain, Guillotine Fist burst, ranged pressure, or defensive control.",
    href: "/guides/monk-build/",
    label: "Released Monk guide",
    meta: "Combo · Guillotine Fist · PVP",
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
    title: "Assassin Cross: Dagger, Katar, Poison and Soul Destroyer",
    description:
      "Choose sustained Dual Dagger, skill-critical Katar, poison pressure, or ranged Soul Destroyer with complete advanced trait and card plans.",
    href: "/guides/assassin-cross-builds/",
    label: "Advanced Thief guide",
    meta: "Dagger · Katar · Poison · Soul Destroyer",
    image: "/assets/guides/assassin-cross-builds/assassin-cross-hero.webp",
    imageAlt: "Assassin Cross advanced build selection",
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
    title: "Whitesmith Builds: Axe, Turret and Cart",
    description:
      "Complete Merchant's advanced job with Axe Hurricane, stronger Turrets, Cart utility, party ASPD buffs, traits, resonance, and cards.",
    href: "/guides/whitesmith-builds/",
    label: "Advanced Merchant guide",
    meta: "Axe · Turret · Cart",
    image: "/assets/guides/whitesmith-builds/whitesmith-hero.webp",
    imageAlt: "Whitesmith advanced build selection",
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
    title: "Night Walker: Pistol, Machine Gun, Rifle and Shotgun",
    description:
      "Build each advanced firearm path around its correct skills, AGI and DEX targets, weapon traits, Rune Engine pair, and PVE or PVP role.",
    href: "/guides/night-walker-builds/",
    label: "Advanced Gunslinger guide",
    meta: "4 firearm builds",
    image: "/assets/guides/night-walker-builds/night-walker-hero.webp",
    imageAlt: "Night Walker advanced build selection",
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
      eyebrow="Released classes, second jobs, advanced jobs and practical progression"
      title="Classes and Builds"
      summary="Compare practical class and advanced second-job routes, then convert one role into a focused skill, equipment, trait, rune, affix, and card plan."
      introduction="Choose one released class and one primary role before spreading resources across multiple builds. The advanced-job guides continue the matching earlier route so you can see what changes at level 70 without losing the foundation that already works."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

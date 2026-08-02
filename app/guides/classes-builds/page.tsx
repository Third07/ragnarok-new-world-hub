import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Classes and Builds",
  description:
    "Browse RTNW class tier lists and detailed build guides for Swordman, Mage, Archer, Acolyte, Thief, Merchant, Gunslinger, and Druid.",
  alternates: { canonical: "/guides/classes-builds/" },
  openGraph: {
    type: "website",
    url: "/guides/classes-builds/",
    title: "Ragnarok: The New World Classes and Builds",
    description:
      "Compare all eight class families, their supported advancement paths, investment requirements, and focused PvE, PvP, and F2P build directions.",
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
    title: "Swordman Builds: Knight and Crusader",
    description:
      "Choose sustained Knight damage or a shield-focused Crusader frontline, with separate stats, equipment priorities, rotations, and low-budget progression plans.",
    href: "/guides/swordman-builds/",
    label: "Swordman build guide",
    meta: "Knight DPS · Crusader tank",
  },
  {
    title: "Mage Builds: Wizard AoE and Control",
    description:
      "Build an efficient elemental farming rotation or a coordinated battlefield-control setup, with an explicit note about currently unavailable Sage skill data.",
    href: "/guides/mage-builds/",
    label: "Mage build guide",
    meta: "AoE farming · PvP control",
  },
  {
    title: "Archer Builds: Hunter, Bard and Dancer",
    description:
      "Compare ranged Hunter damage with Bard and Dancer support routes, including solo progression, party utility, PvP positioning, and equipment direction.",
    href: "/guides/archer-builds/",
    label: "Archer build guide",
    meta: "Hunter · Bard · Dancer",
  },
  {
    title: "Acolyte Builds: Priest and Monk",
    description:
      "Separate Priest healing and support from Monk melee burst, with different stat priorities, rotations, party roles, and F2P investment expectations.",
    href: "/guides/acolyte-builds/",
    label: "Acolyte build guide",
    meta: "Priest support · Monk burst",
  },
  {
    title: "Thief Builds: Assassin CRIT and Burst",
    description:
      "Plan sustained Assassin CRIT pressure or a short PvP elimination window, while avoiding unsupported recommendations for the current Rogue branch data.",
    href: "/guides/thief-builds/",
    label: "Thief build guide",
    meta: "Assassin CRIT · Assassin burst",
  },
  {
    title: "Merchant Builds: Blacksmith and Alchemist",
    description:
      "Compare Blacksmith melee and weapon enhancement with Alchemist preparation and utility, including economy-aware progression and resource management.",
    href: "/guides/merchant-builds/",
    label: "Merchant build guide",
    meta: "Blacksmith · Alchemist",
  },
  {
    title: "Gunslinger Builds: Rebel and Night Watch",
    description:
      "Choose handgun mobility, rifle burst, or a heavier AoE weapon route without spreading limited refinement and skill resources across every firearm.",
    href: "/guides/gunslinger-builds/",
    label: "Gunslinger build guide",
    meta: "Handgun · Rifle · Heavy AoE",
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
  "Start with the class tier list and choose the game mode that matters most to you: F2P progression, PvE, or PvP.",
  "Open the detailed guide for your class family and choose one supported branch or weapon identity.",
  "Use the Skill Planner to confirm the current English skill tree, prerequisites, and any branches that are not yet available.",
  "Build one primary equipment, affix, rune, and card direction instead of funding several incompatible setups at the same time.",
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
      eyebrow="Class selection, roles and complete build paths"
      title="Classes and Builds"
      summary="Compare all eight current class families, then convert one role into a focused skill, equipment, affix, rune, and card plan."
      introduction="The library now covers every current class family. Each guide separates supported advancement paths, practical build identities, PvE and PvP use, low-budget priorities, and unavailable English skill data so unfinished branches are not presented as confirmed builds."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

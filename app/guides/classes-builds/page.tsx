import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Classes and Builds",
  description:
    "Browse RTNW class tier lists and build guides, including F2P, PvE, PvP, Werewolf, Wereraptor, and Human Arcanist recommendations.",
  alternates: { canonical: "/guides/classes-builds/" },
  openGraph: {
    type: "website",
    url: "/guides/classes-builds/",
    title: "Ragnarok: The New World Classes and Builds",
    description: "Compare class roles, investment requirements, and detailed build paths connected to the RTNW Skill Planner.",
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
    title: "Druid Builds: Werewolf, Wereraptor and Arcanist",
    description:
      "Choose one of Druid's three distinct combat identities and review its stat direction, equipment targets, skill priorities, starter rotation, and F2P investment warning.",
    href: "/guides/druid-builds/",
    label: "Build guide",
    meta: "3 forms · PvE and PvP notes",
  },
];

const steps = [
  "Start with the class tier list and choose the game mode that matters most to you: F2P progression, PvE, or PvP.",
  "Open the Skill Planner and inspect the actual class tree before committing skill points or changing branches.",
  "Choose one primary equipment direction instead of funding several incompatible physical or magic setups at the same time.",
  "Use the Equipment, Affix, and Card indexes to turn the selected role into a complete build plan.",
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
      summary="Choose a class for the content you actually play, then convert that choice into a focused skill, equipment, affix, rune, and card plan."
      introduction="Begin with the broad class comparison, then move into a detailed build article once you know the role and investment profile you want. The category separates editorial rankings from database-backed skill mechanics and links every recommendation to the relevant planner."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

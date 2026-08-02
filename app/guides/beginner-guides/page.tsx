import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Beginner Guides",
  description:
    "Start Ragnarok: The New World with first-hours priorities, daily routines, F2P resource planning, class preparation, and connected tools.",
  alternates: { canonical: "/guides/beginner-guides/" },
  openGraph: {
    type: "website",
    url: "/guides/beginner-guides/",
    title: "Ragnarok: The New World Beginner Guides",
    description: "A practical starting route for new and returning RTNW players.",
  },
};

const guides = [
  {
    title: "Beginner Progression Guide",
    description:
      "Follow a first-hours and first-week route with session templates, F2P spending priorities, class preparation, card-farming workflows, and common mistakes to avoid.",
    href: "/guides/beginner-progression/",
    label: "Starting guide",
    meta: "First hours · First week · Daily routines",
  },
  {
    title: "Class Tier List: F2P, PvE and PvP",
    description:
      "Compare the eight class families before committing your main progression resources, with a dedicated ranking for free-to-play efficiency.",
    href: "/guides/class-tier-list/",
    label: "Class choice",
    meta: "8 class families · F2P ranking",
  },
];

const steps = [
  "Complete the main progression route and unlock the systems naturally instead of scattering time across every side activity immediately.",
  "Choose one main class direction and use free skill resets to test the role before spending heavily on several gear paths.",
  "Build a repeatable daily routine around your available playtime rather than copying a schedule designed for much longer sessions.",
  "Use the Events, World Map, Monster Index, and Card Index to replace guesswork with a specific daily objective.",
];

const tools = [
  {
    name: "Events",
    description: "Review current event tasks, schedules, and rewards.",
    href: "/sea/events/",
  },
  {
    name: "Skill Planner",
    description: "Explore a class tree before spending progression resources.",
    href: "/sea/skill_planner/",
  },
  {
    name: "World Map",
    description: "Locate monsters, quests, chests, landmarks, and services.",
    href: "/sea/maps/?lang=en-US#map=101",
  },
  {
    name: "Monster Index",
    description: "Check levels, elements, habitats, stats, and drops.",
    href: "/sea/monster_album/",
  },
];

export default function BeginnerGuidesCategoryPage() {
  return (
    <GuideCategoryPage
      currentPath="/guides/beginner-guides/"
      eyebrow="First hours, first week and F2P priorities"
      title="Beginner Guides"
      summary="Build a stable account foundation with clear priorities, realistic daily routines, and tools that show where to go next."
      introduction="New players benefit most from a controlled sequence: progress the main systems, select a focused class direction, establish a repeatable routine, and only then optimize cards, refining, and specialized equipment. These guides avoid hard-coded unlock values when live patches may change them."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

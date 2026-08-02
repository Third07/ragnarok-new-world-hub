import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Monsters, Cards and Farming Guides",
  description:
    "Plan RTNW card targets and farming routes using the Card Index, Monster Index, World Map, source data, and repeatable session workflows.",
  alternates: { canonical: "/guides/monsters-cards-farming/" },
  openGraph: {
    type: "website",
    url: "/guides/monsters-cards-farming/",
    title: "Ragnarok: The New World Monsters, Cards and Farming Guides",
    description: "Choose useful card targets, verify their sources, and build efficient farming routes.",
  },
};

const guides = [
  {
    title: "Farming and Card Progression Guide",
    description:
      "Use the Card Index, Monster Index, and World Map as one workflow. Evaluate build fit, source access, kill speed, route density, replacement risk, and session results before repeating a farm.",
    href: "/guides/farming-card-progression/",
    label: "Farming guide",
    meta: "Card → Monster → Map workflow",
  },
  {
    title: "Beginner Progression Guide",
    description:
      "Place farming inside a realistic daily routine and avoid spending the entire session on a low-access target that does not solve the account's current progression need.",
    href: "/guides/beginner-progression/",
    label: "Routine planning",
    meta: "15-minute · 45-minute · Extended",
  },
];

const steps = [
  "Search the Card Index by the stat or effect your current build actually needs instead of starting from rarity alone.",
  "Open the linked monster and verify its level, element, race, size, habitat, other drops, and available rate information.",
  "Use the World Map to compare travel time, nearby targets, route density, and whether the location supports a repeatable loop.",
  "Record the result of a timed session and keep the route only when its total value justifies the time and consumables spent.",
];

const tools = [
  {
    name: "Card Index",
    description: "Search effects, slots, rarity, sources, fusion, and linked monsters.",
    href: "/sea/cards/",
  },
  {
    name: "Monster Index",
    description: "Inspect habitats, elements, races, sizes, stats, drops, and cards.",
    href: "/sea/monster_album/",
  },
  {
    name: "World Map",
    description: "Locate targets and turn source data into a practical route.",
    href: "/sea/maps/?lang=en-US#map=101",
  },
  {
    name: "Equipment Index",
    description: "Check whether a target card still fits the planned equipment path.",
    href: "/sea/equipment/",
  },
];

export default function MonstersCardsFarmingCategoryPage() {
  return (
    <GuideCategoryPage
      currentPath="/guides/monsters-cards-farming/"
      eyebrow="Target selection, source verification and route planning"
      title="Monsters, Cards and Farming"
      summary="Turn a build requirement into a verified monster source, a mapped route, and a farming session that is worth repeating."
      introduction="Efficient farming begins with the effect the build needs, not the prestige of the card. The category connects card data to monster data and map locations, then adds practical checks for accessibility, kill speed, route density, side drops, and replacement risk."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

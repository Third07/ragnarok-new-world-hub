import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Monsters, Cards and Farming Guides",
  description:
    "Plan RTNW MVP hunts, Zeny farming, card targets, and monster routes with mapped boss locations, a session calculator, databases, and practical workflows.",
  alternates: { canonical: "/guides/monsters-cards-farming/" },
  openGraph: {
    type: "website",
    url: "/guides/monsters-cards-farming/",
    title: "Ragnarok: The New World Monsters, Cards and Farming Guides",
    description: "Find mapped MVPs, measure Zeny sessions, choose useful card targets, and build efficient farming routes.",
  },
};

const guides = [
  {
    title: "MVP Hunting Guide: Locations, Counters and Party Setup",
    description:
      "Compare 20 mapped MVP records by level, element, race, size, map, and marker coverage. Open featured bosses directly, prepare a balanced party, and plan a hunt without treating map markers as live timers.",
    href: "/guides/mvp-hunting/",
    label: "MVP guide",
    meta: "20 mapped bosses · Direct database links",
  },
  {
    title: "Zeny Farming Guide and Session Calculator",
    description:
      "Separate spendable Zeny, Bound Zeny, and unsold inventory; compare Life Jobs, monster routes, and MVP sessions; then calculate actual net income after consumables and fees.",
    href: "/guides/zeny-farming/",
    label: "Economy guide",
    meta: "Interactive net Zeny calculator",
  },
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
  "Define the goal first: a build-relevant card, a mapped MVP, a progression material, or completed Zeny income.",
  "Open the monster record and check level, element, race, size, habitat, drops, and any available rate information.",
  "Use the World Map to compare markers, travel time, nearby targets, route density, and a safe regroup point.",
  "Record a timed session and repeat the route only when completed value justifies the time, waiting, and consumables spent.",
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
  {
    name: "Farming Target Finder",
    description: "Filter monsters by level, type, race, element, size, and mapped availability.",
    href: "/tools/farming-target-finder/",
  },
  {
    name: "Zeny Session Calculator",
    description: "Compare actual net session results after consumables and route costs.",
    href: "/guides/zeny-farming/#zeny-session-calculator",
  },
];

export default function MonstersCardsFarmingCategoryPage() {
  return (
    <GuideCategoryPage
      currentPath="/guides/monsters-cards-farming/"
      eyebrow="Target selection, source verification and route planning"
      title="Monsters, Cards and Farming"
      summary="Find mapped MVPs, turn a build requirement into a practical monster route, and measure whether a Zeny or card-farming session is worth repeating."
      introduction="Efficient farming begins with a clear account goal, not rarity alone. This category connects MVP, card, monster, and map data with practical checks for access, counters, kill speed, route density, completed sale value, costs, and replacement risk."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

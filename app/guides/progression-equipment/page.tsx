import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Progression and Equipment Guides",
  description:
    "Plan RTNW equipment, refining, affixes, cards, and F2P upgrade priorities with connected indexes and simulators.",
  alternates: { canonical: "/guides/progression-equipment/" },
  openGraph: {
    type: "website",
    url: "/guides/progression-equipment/",
    title: "Ragnarok: The New World Progression and Equipment Guides",
    description: "Choose the right base gear, upgrade the correct slot, and spend refining materials deliberately.",
  },
};

const guides = [
  {
    title: "Refining and Equipment Upgrade Guide",
    description:
      "Separate base-item choice, slot priority, and refine target decisions. Review the +6, +9, +12, and +15 checkpoints, material bands, and F2P budgeting strategy.",
    href: "/guides/refining-equipment/",
    label: "Equipment guide",
    meta: "+20 dataset · Safe checkpoints",
  },
  {
    title: "Beginner Progression Guide",
    description:
      "Place equipment spending inside a broader first-week plan so upgrading does not consume resources needed for class development, cards, or routine progression.",
    href: "/guides/beginner-progression/",
    label: "Progression context",
    meta: "F2P priorities · First-week route",
  },
];

const steps = [
  "Confirm that the base item supports the build before spending refine materials, cards, or affix resources on it.",
  "Prioritize the slot that improves the build's main role instead of raising every equipment slot evenly.",
  "Use the Refine Simulator to understand the current material band, success rate, downgrade risk, and checkpoint before attempting an upgrade.",
  "Re-evaluate the item after major progression changes so sunk costs do not force you to keep an outdated equipment path.",
];

const tools = [
  {
    name: "Equipment Index",
    description: "Compare base equipment, stats, slots, and set effects.",
    href: "/sea/equipment/",
  },
  {
    name: "Refine Simulator",
    description: "Review rates, material requirements, and enhancement outcomes.",
    href: "/sea/refine/",
  },
  {
    name: "Affix Planner",
    description: "Plan secondary stat combinations for the selected build.",
    href: "/sea/affix_planner/",
  },
  {
    name: "Card Index",
    description: "Find card effects that complete the equipment plan.",
    href: "/sea/cards/",
  },
];

export default function ProgressionEquipmentCategoryPage() {
  return (
    <GuideCategoryPage
      currentPath="/guides/progression-equipment/"
      eyebrow="Gear selection, refining and resource efficiency"
      title="Progression and Equipment"
      summary="Choose better base gear, invest in the slot that matters, and stop at deliberate refine checkpoints instead of upgrading blindly."
      introduction="Equipment progression is a chain of decisions rather than one refine button. The category starts with build fit, then evaluates the base item, the priority slot, the material band, and the replacement risk before recommending further investment."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Guild Event Guides",
  description:
    "Prepare for RTNW Guild League, Polarity Zone, and Hazy Forest with schedules, eligibility, boss mechanics, GVG strategy, counter setups, and guild-management checklists.",
  alternates: { canonical: "/guides/guild-events/" },
  openGraph: {
    type: "website",
    url: "/guides/guild-events/",
    title: "Ragnarok: The New World Guild Event Guides",
    description:
      "Source-based Guild League, Polarity Zone, and Hazy Forest guides with timing, roles, rewards, mechanics, and strategy.",
  },
};

const guides = [
  {
    title: "Guild League: Schedule, Tiers and GVG Strategy",
    description:
      "Plan the 60-player Main Battlefield, Sub Battlefield resource teams, command skills, tier promotion, tower pressure, and comeback tactics.",
    href: "/guides/guild-league/",
    label: "GVG strategy guide",
    meta: "8 tiers · 60 vanguards · 22-minute battle",
  },
  {
    title: "Polarity Zone: Guild Setup and Boss Mechanics",
    description:
      "Assign Zone Elites, maximize Common Dungeon clears, prepare Element–Race–Size counters, and execute Goblin Leader, Eddga, and Baphomet mechanics.",
    href: "/guides/polarity-zone/",
    label: "Weekly guild dungeon guide",
    meta: "Sunday · 90 minutes · 3 bosses",
  },
  {
    title: "Hazy Forest: Timing, Counters and Score Route",
    description:
      "Use the 1×, 2×, and 3× Treasure phases efficiently, fit four monster attempts into the event, and prepare counter cards and attack conversion.",
    href: "/guides/hazy-forest/",
    label: "Weekly scoring guide",
    meta: "Thursday · 15 minutes · solo scoring",
  },
];

const steps = [
  "Check the live Event Schedule and confirm that the supplied server times still match the current client.",
  "Publish guild rosters, parties, boss counters, and required consumables before the event window.",
  "Assign leaders who can call rotations, move players between groups, and react to failed attempts.",
  "Review rewards and participation requirements so members do not miss eligibility or auction dividends.",
];

const tools = [
  {
    name: "Event Schedule",
    description: "Check the current weekly RTNW activity calendar.",
    href: "/sea/events/",
  },
  {
    name: "Monster Database",
    description: "Inspect boss attributes and related monster information.",
    href: "/sea/monster_album/",
  },
  {
    name: "Card Database",
    description: "Find Element, Race, Size, damage, and defensive card options.",
    href: "/sea/cards/",
  },
  {
    name: "Skill Planner",
    description: "Prepare event-specific skill and party-role loadouts.",
    href: "/sea/skill_planner/",
  },
];

export default function GuildEventsCategoryPage() {
  return (
    <GuideCategoryPage
      currentPath="/guides/guild-events/"
      eyebrow="Guild schedules, GVG command and weekly boss execution"
      title="Guild Event Guides"
      summary="Prepare every roster, counter set, battlefield role, and cooldown route before the guild event begins."
      introduction="These guides are independently rewritten from official GNJOY forum training plans supplied to RTNW Hub. They preserve the event rules and mechanics from the source while adding clearer tables, checklists, internal links, FAQ schema, and mobile-friendly organization."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

import type { Metadata } from "next";
import GuideCategoryPage from "../GuideCategoryPage";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Guild Event Guides",
  description:
    "Run a stronger RTNW guild and prepare for Guild League, Polarity Zone, and Hazy Forest with schedules, leadership routines, boss mechanics, GVG strategy, and counter setups.",
  alternates: { canonical: "/guides/guild-events/" },
  openGraph: {
    type: "website",
    url: "/guides/guild-events/",
    title: "Ragnarok: The New World Guild Event Guides",
    description:
      "Guild management, Guild League, Polarity Zone, and Hazy Forest guides with timing, roles, rewards, mechanics, and practical strategy.",
  },
};

const guides = [
  {
    title: "Guild Management: Members, Events and Resources",
    description:
      "Build fixed teams, assign officer roles, publish a repeatable calendar, prioritize guild buildings, and set transparent auction rules.",
    href: "/guides/guild-management/",
    label: "Guild leadership guide",
    meta: "Members · events · resources",
    image: "/assets/guides/guild-management/guild-activities.webp",
    imageAlt: "RTNW guild activity and reward overview",
  },
  {
    title: "Guild League: Schedule, Tiers and GVG Strategy",
    description:
      "Plan the 60-player Main Battlefield, Sub Battlefield resource teams, command skills, tier promotion, tower pressure, and comeback tactics.",
    href: "/guides/guild-league/",
    label: "GVG strategy guide",
    meta: "8 tiers · 60 vanguards · 22-minute battle",
    image: "/assets/guides/guild-league/battlefield-map.webp",
    imageAlt: "Guild League three-lane battlefield map",
  },
  {
    title: "Polarity Zone: Guild Setup and Boss Mechanics",
    description:
      "Assign Zone Elites, maximize Common Dungeon clears, prepare Element–Race–Size counters, and execute Goblin Leader, Eddga, and Baphomet mechanics.",
    href: "/guides/polarity-zone/",
    label: "Weekly guild dungeon guide",
    meta: "Sunday · 90 minutes · 3 bosses",
    image: "/assets/guides/polarity-zone/boss-fight.webp",
    imageAlt: "Guild party fighting a Polarity Zone boss",
  },
  {
    title: "Hazy Forest: Timing, Counters and Score Route",
    description:
      "Use the 1×, 2×, and 3× Treasure phases efficiently, fit four monster attempts into the event, and prepare counter cards and attack conversion.",
    href: "/guides/hazy-forest/",
    label: "Weekly scoring guide",
    meta: "Thursday · 15 minutes · solo scoring",
    image: "/assets/guides/hazy-forest/hazy-forest-battle.webp",
    imageAlt: "Hazy Forest treasure monster battle",
  },
];

const steps = [
  "Check the live Event Schedule and confirm that listed server times still match the current client.",
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
      introduction="Start with the guild-management playbook, then open the event guide for the roster, boss, or scoring route you need. Each page uses quick-reference tables, checklists, screenshots, and links to the tools that support the plan."
      guides={guides}
      steps={steps}
      tools={tools}
    />
  );
}

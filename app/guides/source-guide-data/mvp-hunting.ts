import type { SourceGuide } from "../SourceGuidePage";

export const mvpHuntingGuide = {
  slug: "mvp-hunting",
  title: "Ragnarok: The New World MVP Hunting Guide",
  seoTitle: "RTNW MVP Hunting Guide: Locations, Counters & Map",
  description:
    "Find mapped Ragnarok: The New World MVP locations, compare level, element, race and size, prepare a party, and inspect each boss in the RTNW database.",
  kicker: "MVP Map and Party Route",
  dek:
    "Turn the Monster Database and World Map into a repeatable hunt: identify the target, inspect its attributes, open its recorded markers, prepare counters, and evaluate the rewards.",
  category: "Monsters, Cards and Farming",
  heroImage: "/media/images/map/icon_map_10008.webp",
  heroAlt: "Ragnarok: The New World map artwork used for MVP route planning",
  published: "2026-08-08",
  modified: "2026-08-08",
  readTime: "10 min read",
  keywords: [
    "Ragnarok The New World MVP guide",
    "RTNW MVP locations",
    "Ragnarok New World boss map",
    "RTNW MVP cards",
    "Ragnarok The New World Baphomet",
    "Ragnarok The New World MVP hunting",
  ],
  verification: "20 mapped MVP records included",
  notice:
    "This directory shows MVP records and marker coverage currently available on RTNW Hub. It does not claim live spawn status, exact respawn timers, channel availability, or guaranteed drops. Confirm those details in the current game client.",
  sidebarTitle: "Marker data is not a timer",
  sidebarText:
    "A recorded marker is a location reference, not proof that an MVP is alive in that channel. Use the live MVP panel and in-game tracking tools for current availability.",
  quickFacts: [
    ["Mapped MVP entries", "20 current SEA map records"],
    ["First check", "Level, element, race and size"],
    ["Location tool", "Interactive World Map"],
    ["Boss detail tool", "Monster Database"],
    ["Reward check", "Card Database and complete monster drops"],
    ["Unknown values", "Live status and exact respawn timing"],
  ],
  sections: [
    {
      id: "hunt-workflow",
      title: "Use a five-step MVP hunting workflow",
      paragraphs: [
        "Do not start by teleporting randomly between maps. Pick a target that matches the party's level and reward goal, inspect its combat attributes, then open the recorded map and monster entries before the group moves.",
        "The World Map records known marker positions while the Monster Database provides the boss record and available drops. The live client remains the authority for current spawn status, channel competition, entry rules, and event-specific behavior.",
      ],
      steps: [
        { title: "Choose the target", text: "Pick an MVP whose level, map access, and potential reward fit the party instead of selecting only by card rarity." },
        { title: "Inspect attributes", text: "Check element, race and size so weapons, cards, converters, resistance and damage modifiers match the encounter." },
        { title: "Open the recorded map", text: "Review the available markers and identify a short search loop, regroup point and safe recovery location." },
        { title: "Confirm the live state", text: "Use the in-game MVP interface and tracking tools to check availability. The database does not estimate a live timer." },
        { title: "Measure the result", text: "Record travel time, attempts, consumables, useful drops and party reliability before repeating the route." },
      ],
    },
    {
      id: "mapped-directory",
      title: "Current mapped MVP directory",
      paragraphs: [
        "The table below connects the English Monster Database with the World Map. Level and attributes come from each monster record. Marker coverage means collected coordinate records divided by the total spawn spots represented in the map data; it is not the number of bosses that spawn at once.",
      ],
      table: {
        headers: ["MVP", "Map", "Element · Race · Size", "Recorded markers"],
        rows: [
          ["Angeling · Lv.40", "Prontera", "Holy · Angel · Medium", "3 of 3"],
          ["Deviling · Lv.40", "Poring Home", "Shadow · Demon · Medium", "3 of 3"],
          ["Golden Thief Bug · Lv.60", "Prontera Sewer 2F", "Fire · Insect · Large", "2 of 4"],
          ["Maya · Lv.60", "Ant Hell 2F", "Earth · Insect · Large", "1 of 3"],
          ["Goblin Leader · Lv.60", "Orc Village", "Wind · Demi-Human · Medium", "2 of 3"],
          ["Drake · Lv.60", "Ghost Ship", "Undead · Undead · Medium", "1 of 1"],
          ["Mistress · Lv.60", "Mt. Mjolnir", "Wind · Insect · Small", "1 of 1"],
          ["Phreeoni · Lv.80", "Morroc", "Neutral · Brute · Large", "3 of 4"],
          ["Osiris · Lv.80", "Pyramid 3F", "Undead · Undead · Medium", "5 of 5"],
          ["Orc Hero · Lv.80", "Orc Village", "Earth · Demi-Human · Large", "2 of 3"],
          ["Orc Lord · Lv.80", "Orc Cave 1F", "Earth · Demi-Human · Large", "1 of 2"],
          ["Eddga · Lv.100", "Payon", "Fire · Brute · Large", "3 of 3"],
          ["Amon Ra · Lv.100", "Pyramid 2F", "Earth · Demi-Human · Large", "2 of 3"],
          ["Moonlight Flower · Lv.100", "Munak Cave 2F", "Fire · Demon · Medium", "1 of 1"],
          ["Doppelganger · Lv.100", "Geffen Underground B2", "Shadow · Demon · Medium", "2 of 2"],
          ["Baphomet · Lv.120", "Morroc", "Shadow · Demon · Large", "2 of 3"],
          ["Atroce · Lv.120", "Geffen", "Shadow · Brute · Large", "2 of 3"],
          ["Dracula · Lv.120", "Geffen Underground B1", "Shadow · Demon · Large", "2 of 2"],
          ["Pharaoh · Lv.130", "Sphinx 2F", "Shadow · Demi-Human · Large", "1 of 3"],
          ["Kraken · Lv.130", "Undersea Tunnel 2F", "Water · Fish · Large", "3 of 3"],
        ],
      },
      note:
        "When marker coverage is incomplete, treat the map as a starting reference and confirm the remaining locations in game. Never convert marker counts into a respawn probability.",
    },
    {
      id: "featured-targets",
      title: "Open useful MVP records directly",
      paragraphs: [
        "These shortcuts open the complete Monster Database record for several early, mid and later targets. Use the database entry to inspect available drop information, then return to the World Map for location planning.",
      ],
      cards: [
        {
          title: "Angeling",
          meta: "Lv.40 · Prontera",
          text: "Holy, Angel and Medium. Three recorded map markers.",
          href: "/sea/monster_album/#showAll=1&monsterId=40024",
          image: "/media/images/monster/icon_monster_head_tianshiboli_01.webp",
          imageAlt: "Angeling monster icon",
        },
        {
          title: "Golden Thief Bug",
          meta: "Lv.60 · Sewer 2F",
          text: "Fire, Insect and Large. Check the complete boss and card record.",
          href: "/sea/monster_album/#showAll=1&monsterId=40025",
          image: "/media/images/monster/icon_monster_head_huangjinchong_01.webp",
          imageAlt: "Golden Thief Bug monster icon",
        },
        {
          title: "Maya",
          meta: "Lv.60 · Ant Hell 2F",
          text: "Earth, Insect and Large. One of three represented markers is recorded.",
          href: "/sea/monster_album/#showAll=1&monsterId=80001",
          image: "/media/images/monster/icon_monster_head_yihou_01.webp",
          imageAlt: "Maya monster icon",
        },
        {
          title: "Osiris",
          meta: "Lv.80 · Pyramid 3F",
          text: "Undead element, Undead race and Medium size with five recorded markers.",
          href: "/sea/monster_album/#showAll=1&monsterId=80013",
          image: "/media/images/monster/icon_monster_head_esls_01.webp",
          imageAlt: "Osiris monster icon",
        },
        {
          title: "Orc Hero",
          meta: "Lv.80 · Orc Village",
          text: "Earth, Demi-Human and Large. Compare the boss and card data before hunting.",
          href: "/sea/monster_album/#showAll=1&monsterId=80009",
          image: "/media/images/monster/icon_monster_head_sryx_01.webp",
          imageAlt: "Orc Hero monster icon",
        },
        {
          title: "Eddga",
          meta: "Lv.100 · Payon",
          text: "Fire, Brute and Large with all three represented markers recorded.",
          href: "/sea/monster_album/#showAll=1&monsterId=80004",
          image: "/media/images/monster/icon_monster_head_huwang_01.webp",
          imageAlt: "Eddga monster icon",
        },
        {
          title: "Baphomet",
          meta: "Lv.120 · Morroc",
          text: "Shadow, Demon and Large. Prepare for a later-level target and verify live access.",
          href: "/sea/monster_album/#showAll=1&monsterId=40023",
          image: "/media/images/monster/icon_monster_head_dabafengte_01.webp",
          imageAlt: "Baphomet monster icon",
        },
        {
          title: "Mistress",
          meta: "Lv.60 · Mt. Mjolnir",
          text: "Wind, Insect and Small with one represented marker recorded.",
          href: "/sea/monster_album/#showAll=1&monsterId=80007",
          image: "/media/images/monster/icon_monster_head_fh_01.webp",
          imageAlt: "Mistress monster icon",
        },
      ],
    },
    {
      id: "counter-check",
      title: "Build counters from attributes, not boss names",
      paragraphs: [
        "A strong MVP setup is specific to the target. Recheck every modifier after changing bosses because element, race and size can all change even when two targets share the same map or level band.",
      ],
      table: {
        headers: ["Check", "How to use it"],
        rows: [
          ["Element", "Choose compatible damage, converters and resistance after confirming the current element interaction reference."],
          ["Race", "Equip cards or effects that explicitly apply to the recorded race rather than a visually similar monster."],
          ["Size", "Check weapon size performance and size-specific modifiers before comparing headline attack values."],
          ["Level", "Treat level as a preparation signal, not a guarantee of difficulty; mechanics, party composition and live scaling still matter."],
          ["Map access", "Confirm the party can reach the location, change channel if available, regroup safely and repeat the search loop without excessive downtime."],
        ],
      },
    },
    {
      id: "party-readiness",
      title: "Prepare roles before the MVP appears",
      cards: [
        {
          title: "Frontline",
          meta: "Position and survival",
          text: "Hold the boss away from vulnerable players and keep movement predictable for healers and ranged damage.",
          image: "/media/images/zhujiemian/icon_zhujiemian_qianghua.webp",
          imageAlt: "Defensive equipment icon",
        },
        {
          title: "Support",
          meta: "Healing and recovery",
          text: "Keep the frontline stable, pre-position for dangerous phases and avoid standing inside unnecessary area damage.",
          image: "/media/images/zhujiemian/icon_zhujiemian_pet.webp",
          imageAlt: "Support preparation icon",
        },
        {
          title: "Damage",
          meta: "Uptime over one hit",
          text: "Match the target attributes, preserve safe uptime and stop attacking when survival or mechanics require movement.",
          image: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp",
          imageAlt: "Skill preparation icon",
        },
        {
          title: "Scout and caller",
          meta: "Map and communication",
          text: "Coordinate marker checks, channel information, regroup calls and the next target so the party does not split inefficiently.",
          image: "/media/images/zhujiemian/icon_zhujiemian_miwusenlin.webp",
          imageAlt: "World map icon",
        },
      ],
    },
    {
      id: "reward-value",
      title: "Evaluate the full hunt instead of chasing one card",
      paragraphs: [
        "The monster index connects many mapped MVPs to a named MVP card, but a listed card is not a guaranteed drop and some records may not expose every reward. Open the complete monster and card entries before deciding that one boss is the best use of the group's time.",
        "A practical evaluation includes travel, waiting, competition, consumables, party assembly, useful non-card drops and whether the same time could complete a limited daily or weekly activity. Rare does not automatically mean efficient.",
      ],
      bullets: [
        "Set a maximum search time before moving to another target or activity.",
        "Record consumables and recovery costs, not only successful drops.",
        "Check whether a desired card has another acquisition route before committing to repeated hunts.",
        "Use a stable party and one caller to reduce assembly and channel-checking time.",
      ],
    },
    {
      id: "hunt-checklist",
      title: "A compact pre-hunt checklist",
      steps: [
        { title: "Target", text: "Boss name, level, map, element, race and size confirmed." },
        { title: "Build", text: "Skills, cards, weapon, converters, recovery and resistance checked for that target." },
        { title: "Route", text: "Recorded markers, regroup point and search order opened on the World Map." },
        { title: "Live status", text: "Availability checked in game without assuming a timer from static map data." },
        { title: "Stop rule", text: "The party agrees when to switch channel, move target or return to limited progression content." },
      ],
    },
  ],
  faqs: [
    {
      question: "Where can I find MVP locations in Ragnarok: The New World?",
      answer:
        "Use the RTNW World Map and the mapped directory in this guide. The current dataset connects 20 MVP entries to maps and recorded marker positions, including Angeling in Prontera, Golden Thief Bug in Prontera Sewer 2F, Maya in Ant Hell 2F, and Drake on the Ghost Ship.",
    },
    {
      question: "Do the RTNW map markers show whether an MVP is alive?",
      answer:
        "No. A map marker is a recorded location reference. It does not report current spawn status, channel availability, the number of bosses alive, or an exact respawn countdown.",
    },
    {
      question: "What is the exact MVP respawn timer?",
      answer:
        "This guide does not publish an exact timer because the current site data does not validate one. Check the in-game MVP interface and live channel state rather than relying on an invented value.",
    },
    {
      question: "What should I check before fighting an MVP?",
      answer:
        "Confirm level, element, race, size, map access, party roles, recovery supplies and the complete monster record. Then verify the live boss state in game before traveling.",
    },
    {
      question: "Is the highest-level MVP always the best target?",
      answer:
        "No. The best target depends on the party's reward goal, clear reliability, travel and waiting time, consumable cost, competition and alternative activities. Measure the complete hunt rather than level alone.",
    },
  ],
  related: [
    ["Interactive World Map", "/sea/maps/?lang=en-US#map=101"],
    ["Monster Database", "/sea/monster_album/"],
    ["Farming Target Finder", "/tools/farming-target-finder/?type=MVP&mapped=1"],
    ["Card Database", "/sea/cards/"],
    ["Zeny farming guide", "/guides/zeny-farming/"],
    ["Class build guides", "/guides/classes-builds/"],
  ],
} satisfies SourceGuide;

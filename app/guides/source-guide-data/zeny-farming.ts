import type { SourceGuide } from "../SourceGuidePage";

export const zenyFarmingGuide = {
  slug: "zeny-farming",
  title: "Ragnarok: The New World Zeny Farming Guide",
  seoTitle: "RTNW Zeny Farming Guide: Daily Income, Trade & Routes",
  description:
    "Earn and protect Zeny in Ragnarok: The New World with daily priorities, Life Job trading, focused monster routes, a net-per-hour calculator, and F2P stop rules.",
  kicker: "Measured F2P Economy Route",
  dek:
    "Build a repeatable Zeny routine around completed rewards, sellable demand, efficient farming targets, controlled costs, and real session results instead of made-up hourly claims.",
  category: "Monsters, Cards and Farming",
  heroImage: "/assets/rtnw-hero-1280.webp",
  heroAlt: "Ragnarok: The New World adventurers preparing a farming route",
  published: "2026-08-08",
  modified: "2026-08-08",
  readTime: "9 min read",
  keywords: [
    "Ragnarok The New World Zeny farming",
    "RTNW Zeny guide",
    "Ragnarok New World money making",
    "RTNW Life Jobs Trading Post",
    "Ragnarok The New World farming spots",
    "RTNW F2P Zeny",
  ],
  verification: "Net-session calculator included",
  notice:
    "Market prices, listing costs, daily rewards, available activities and demand vary by server and update. This guide does not promise a fixed Zeny-per-hour rate. Use the calculator with your own completed income and costs.",
  sidebarTitle: "Count completed value",
  sidebarText:
    "Unsold items are not realized Zeny. Track direct income, completed sales, costs and Bound Zeny separately so a rare drop or optimistic listing price does not distort the route comparison.",
  quickFacts: [
    ["Best first priority", "Limited reliable account rewards"],
    ["Player-economy route", "Life Jobs into Trading Post listings"],
    ["Open-world route", "Purposeful monster and material farming"],
    ["Efficiency measure", "Net Zeny per hour from actual sessions"],
    ["Main cost check", "Consumables, travel, fees and downtime"],
    ["Track separately", "Zeny, Bound Zeny and unsold inventory"],
  ],
  sections: [
    {
      id: "currency-plan",
      title: "Separate Zeny, Bound Zeny and inventory value",
      paragraphs: [
        "A useful economy plan starts by separating currencies and outcomes. Zeny earned through player-economy activity is not the same as Bound Zeny consumed by systems such as refining, and an item listed for sale is not completed income until it sells.",
        "Keep three simple totals: spendable Zeny, Bound Zeny reserved for progression, and unsold inventory. This prevents an expensive refine session or a pile of slow-moving items from looking like a profitable farming day.",
      ],
      cards: [
        {
          title: "Spendable Zeny",
          meta: "Completed currency",
          text: "Count direct gains and completed sales that are actually available to spend.",
          image: "/media/images/item/icon_item_currency2_zeny_01.webp",
          imageAlt: "Zeny currency icon",
        },
        {
          title: "Bound Zeny",
          meta: "Progression reserve",
          text: "Track separately for refining and other bound-currency costs instead of combining it with trade income.",
          image: "/media/images/item/icon_item_currency_boundzeny.webp",
          imageAlt: "Bound Zeny currency icon",
        },
        {
          title: "Unsold inventory",
          meta: "Potential value",
          text: "Record quantity and listing status, but do not treat an asking price as guaranteed income.",
          image: "/media/images/item/icon_item_GoldCoinBag_01.webp",
          imageAlt: "Game currency bag icon",
        },
        {
          title: "Net result",
          meta: "Income minus costs",
          text: "Compare routes after consumables, recovery, travel, listing costs and failed sessions are included.",
          image: "/media/images/zhujiemian/icon_zhujiemian_shangcheng.webp",
          imageAlt: "Shop and economy icon",
        },
      ],
    },
    {
      id: "income-order",
      title: "Use four income lanes in the right order",
      paragraphs: [
        "The safest routine does not begin with an extremely rare card. Complete limited reliable activities first, maintain a small Trading Post pipeline, then use remaining time on a measured farming route. Speculative boss or rare-card hunting belongs last unless the group already has another reason to run it.",
      ],
      table: {
        headers: ["Income lane", "What to do", "Main risk"],
        rows: [
          ["Limited account rewards", "Complete worthwhile daily, weekly and guild rewards before unlimited grinding.", "Missing a reset-limited reward while spending too long on an open-ended farm."],
          ["Life Jobs and Trading Post", "Create items with demonstrated demand and list sensible quantities.", "Producing more than the market absorbs or ignoring fees and listing time."],
          ["Focused monster route", "Target useful materials, cards or drops with a dense, repeatable route.", "Low kill speed, excessive travel, consumables or unsold drops."],
          ["MVP and rare targets", "Join when the party, reward goal and live availability already justify the hunt.", "Waiting and competition can reduce income even when the possible reward is valuable."],
        ],
      },
    },
    {
      id: "life-jobs",
      title: "Turn Life Jobs into a Trading Post pipeline",
      paragraphs: [
        "Life Job items can be listed on the Trading Post to earn Zeny. Profit still depends on current server demand, sale speed, input cost and listing conditions, so one high visible price is not enough evidence to mass-produce an item.",
      ],
      steps: [
        { title: "Observe demand", text: "Check which useful items sell repeatedly, not only which listings have the highest asking price." },
        { title: "Calculate the input", text: "Include gathered materials, purchased inputs, Energy or time constraints, fees and the value of an alternative item." },
        { title: "List a test batch", text: "Start small and measure time-to-sale before using the same resources for a larger batch." },
        { title: "Reprice deliberately", text: "Do not race to the lowest price automatically; compare turnover, margin and how quickly resources need to be recovered." },
        { title: "Stop slow inventory", text: "When items remain unsold, pause production and move resources to a faster or more useful route." },
      ],
      image: {
        src: "/media/images/zhujiemian/icon_zhujiemian_lifecareer.webp",
        alt: "Ragnarok: The New World Life Jobs icon",
        caption: "Life Jobs can feed the Trading Post, but completed sales—not listings—determine realized Zeny.",
        compact: true,
      },
    },
    {
      id: "farming-route",
      title: "Choose farming targets by net value and repeatability",
      paragraphs: [
        "Use the Farming Target Finder to shortlist monsters around the character's practical level and damage profile, then inspect each target in the Monster Database. A route is valuable when the character can repeat it with high uptime and the drops solve a real progression or market need.",
        "Track kills only when that helps compare routes. The more important result is completed value after costs. A weaker monster can outperform a higher-level target when travel is shorter, density is better, recovery is easier and the drops sell or remain useful.",
      ],
      table: {
        headers: ["Factor", "Question to answer"],
        rows: [
          ["Kill speed", "Can the character defeat targets consistently without long recovery or excessive skill cost?"],
          ["Route density", "How much of the session is active combat instead of travel, waiting or searching?"],
          ["Drop usefulness", "Will the materials, equipment or cards be used, sold, fused or left idle?"],
          ["Sale speed", "Did comparable items actually sell during the measurement window?"],
          ["Costs", "What was spent on consumables, recovery, travel, listing and replacement supplies?"],
          ["Opportunity cost", "Would a limited daily, guild activity, Life Job batch or different map produce more account value?"],
        ],
      },
      note:
        "Do not invent a drop rate when the database does not provide one. Compare real session results over several runs and keep the same measurement method.",
    },
    {
      id: "bound-zeny",
      title: "Protect a Bound Zeny reserve before upgrading",
      paragraphs: [
        "Refining can consume Bound Zeny repeatedly, especially when failures or downgrade recovery extend the path. Keep a maintenance reserve for routine progression before starting an aggressive refine target.",
        "Treat the desired refine level as a budget project. Confirm that the equipment, cards, set direction and build will remain useful long enough to justify the materials and Bound Zeny, then simulate the path before spending.",
      ],
      bullets: [
        "Fund ordinary upgrades and replacements before a prestige refine attempt.",
        "Use the Refine Simulator to inspect each step and possible downgrade exposure.",
        "Set a stop level and reserve floor before the first attempt.",
        "Do not use successful early attempts as proof that the remaining path will be cheap.",
      ],
    },
    {
      id: "session-routines",
      title: "Use a routine that matches the available time",
      table: {
        headers: ["Available time", "Suggested order"],
        rows: [
          ["About 20 minutes", "Collect important limited rewards, maintain listings, then stop instead of starting an open-ended rare farm."],
          ["About 45 minutes", "Complete priority dailies, check the Trading Post, and run one measured farming block."],
          ["About 90 minutes", "Finish limited content, prepare or collect Life Job production, then compare two timed farming routes or join a planned MVP group."],
          ["Extended session", "Use repeated blocks with recorded costs and breaks; reassess after each block rather than chasing a dry streak."],
        ],
      },
    },
    {
      id: "mistakes",
      title: "Avoid the Zeny traps that make a route look better than it is",
      bullets: [
        "Counting an unsold listing as completed income.",
        "Reporting one lucky card drop as a normal hourly rate.",
        "Ignoring consumables, travel, listing fees, recovery and waiting time.",
        "Grinding after limited daily or weekly rewards have been neglected.",
        "Producing a large Life Job batch before testing real sale speed.",
        "Mixing Bound Zeny with spendable Zeny when planning upgrades.",
        "Changing several variables between sessions and then comparing the results as if the routes were identical.",
      ],
    },
  ],
  faqs: [
    {
      question: "What is the best way to farm Zeny in Ragnarok: The New World?",
      answer:
        "Complete worthwhile limited rewards first, maintain a small Life Job and Trading Post pipeline, then use remaining time on a measured monster route. Compare net completed income after costs rather than relying on a fixed rate claimed by another account.",
    },
    {
      question: "Can Life Jobs earn Zeny?",
      answer:
        "Yes. Items produced through Life Jobs can be listed on the Trading Post to earn Zeny. Profit depends on demand, inputs, fees and whether the item actually sells.",
    },
    {
      question: "How do I calculate Zeny per hour?",
      answer:
        "Add direct Zeny and completed sale income, subtract consumables, travel, listing and other costs, then divide the net result by the session minutes and multiply by 60. Use the calculator on this page to keep the method consistent.",
    },
    {
      question: "Should unsold items count as Zeny income?",
      answer:
        "No. Keep unsold inventory separate. You may record an estimated value for planning, but do not combine it with completed income until the item sells or clearly label the comparison as an estimate.",
    },
    {
      question: "Are MVPs the fastest Zeny method?",
      answer:
        "Not automatically. Possible rewards can be valuable, but travel, waiting, competition, consumables and uncertain drops can lower the net result. Hunt MVPs when the party and reward goal justify them, then compare the complete session with other routes.",
    },
    {
      question: "Is Zeny the same as Bound Zeny?",
      answer:
        "No. Track them separately. Bound Zeny is used by progression systems such as refining, while spendable Zeny and player-economy income have different uses and acquisition paths.",
    },
  ],
  related: [
    ["Farming Target Finder", "/tools/farming-target-finder/"],
    ["Monster Database", "/sea/monster_album/"],
    ["Shop Catalogue", "/sea/shop/"],
    ["MVP hunting guide", "/guides/mvp-hunting/"],
    ["Farming and Card guide", "/guides/farming-card-progression/"],
    ["Refine Simulator", "/sea/refine/"],
    ["Refining guide", "/guides/refining-equipment/"],
  ],
} satisfies SourceGuide;

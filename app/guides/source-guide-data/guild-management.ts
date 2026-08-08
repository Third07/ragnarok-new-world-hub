import type { SourceGuide } from "../SourceGuidePage";

export const guide = {
  "slug": "guild-management",
  "title": "Ragnarok: The New World Guild Management Guide",
  "seoTitle": "RTNW Guild Management Guide: Members, Events & Resources",
  "description": "Run a stronger Ragnarok: The New World guild with weekly events, fixed teams, officer roles, building priorities, auction rules, and member routines.",
  "kicker": "Guild Leadership Playbook",
  "dek": "Turn scattered daily activity into a predictable guild routine that improves attendance, progression, teamwork, and GVG readiness.",
  "category": "Guild Events",
  "heroImage": "/assets/guides/guild-management/guild-activities.webp",
  "heroAlt": "Ragnarok: The New World guild activity and reward overview",
  "published": "2026-08-08",
  "modified": "2026-08-08",
  "readTime": "9 min read",
  "keywords": [
    "Ragnarok The New World guild management",
    "RTNW guild guide",
    "RTNW guild building priority",
    "RTNW guild events",
    "RTNW guild leader tips"
  ],
  "quickFacts": [
    ["Core management areas", "Members, events, and resources"],
    ["Best team structure", "Stable five-player and ten-player groups"],
    ["First building priority", "Main Hall"],
    ["Next building priorities", "Dormitory and Shop before Library early on"],
    ["Essential weekly target", "Merit for Guild Shop exchanges"],
    ["Competitive role", "Dedicated League Commander"]
  ],
  "sections": [
    {
      "id": "activity-loop",
      "title": "Build the guild around its weekly activity loop",
      "paragraphs": [
        "A healthy guild gives members several reasons to log in: steady personal growth, organized group content, rare auction rewards, useful social connections, and a competitive GVG path. Leadership should make those benefits easy to understand and easy to join.",
        "Separate the calendar into solo tasks members can finish independently and team events that require a shared start time. This prevents routine progress from depending on a full party while preserving strong attendance for the activities that need coordination."
      ],
      "table": {
        "headers": ["Activity type", "Examples", "Leadership focus"],
        "rows": [
          ["Solo", "Guild Sign-In, Salary, Shop, Training, Life Jobs, Cat Cargo, Guild Dailies", "Publish weekly targets and remind members before reset."],
          ["Team", "Guild Banquet, Mirror World, Hazy Forest, Guild League, Gold Heist, Siege, Polarity Zone", "Set event times, parties, backups, and one clear shot-caller."],
          ["Support runs", "Hard five-player dungeons, ten-player dungeons, Ancient Ruins, Bounty Hunts, Endless Tower", "Pair experienced members with developing players and keep fixed teams stable."]
        ]
      },
      "image": {
        "src": "/assets/guides/guild-management/guild-activities.webp",
        "alt": "Guild activity panel showing solo and team objectives"
      }
    },
    {
      "id": "weekly-rewards",
      "title": "Make weekly rewards visible and attainable",
      "paragraphs": [
        "Guild progression matters because several high-value rewards are tied to activities, Merit, and Guild Auctions. Members are more likely to participate when leadership explains the exact weekly benefit instead of posting a generic attendance reminder.",
        "The Guild Shop can provide enhancement stones, refine materials, Advanced and Common Gem Boxes, Elemental Crystal Boxes, and a one-time Skel Worker Card exchange. Put the most important purchases and their Merit cost in the weekly announcement."
      ],
      "bullets": [
        "Post the weekly Merit target and the activities that supply it.",
        "Remind members which limited exchanges reset soon.",
        "Explain which events contribute rare pets, Royal Gear, advanced gems, or purple cards to the auction pool.",
        "Keep attendance tracking simple enough that officers can maintain it consistently."
      ],
      "image": {
        "src": "/assets/guides/guild-management/guild-shop.webp",
        "alt": "Guild Shop interface with weekly progression materials",
        "caption": "A short weekly shopping list gives members a concrete reason to complete Merit objectives before reset."
      }
    },
    {
      "id": "members",
      "title": "Recruit for reliability, then form fixed teams",
      "paragraphs": [
        "Power helps, but reliable attendance and cooperative behavior are what keep a guild functional. Ask active members to invite good teammates they meet in daily dungeons, and make the expected schedule clear before a recruit joins.",
        "Stable teams progress at a similar pace, coordinate better than ad-hoc groups, and can take defined roles in dungeons and Guild League. Leaders should help highly active members form a core group, then maintain a substitute list for absences."
      ],
      "steps": [
        {"title": "Define the guild promise", "text": "State whether the guild is casual, progression-focused, or competitive and list the normal event windows."},
        {"title": "Recruit through good runs", "text": "Invite players who communicate well and complete group content reliably, not only the highest visible power."},
        {"title": "Create fixed teams", "text": "Build balanced five-player groups first, then connect two compatible teams for ten-player content."},
        {"title": "Track backups", "text": "Give substitutes a clear contact and rotate them into ordinary runs so they are ready for important events."}
      ]
    },
    {
      "id": "calendar",
      "title": "Publish one calendar and repeat it every week",
      "paragraphs": [
        "Event organization has one goal: put enough prepared members online at the same time. Use a single weekly schedule in guild mail, chat, or a pinned community message and avoid changing the format every few days.",
        "Polarity Zone requires management to choose a Sunday start time, while other activities follow fixed schedules. Confirm the live event panel after patches, then announce any change with enough notice for members to adjust."
      ],
      "image": {
        "src": "/assets/guides/guild-management/weekly-calendar.webp",
        "alt": "Weekly guild activity calendar",
        "caption": "Use one consistent schedule for event times, party assembly, and backup check-in."
      }
    },
    {
      "id": "resources",
      "title": "Spend Guild Fund in the right order",
      "paragraphs": [
        "Guild Fund upgrades five buildings. The Main Hall raises the cap for the others, the Vault increases fund storage, the Dormitory expands member capacity, the Library unlocks Guild Training projects, and the Shop expands item exchanges.",
        "Upgrade the Main Hall first. In the early stages, Dormitory and Shop usually create a faster guild-wide return than Library because they add members and unlock valuable weekly exchanges. Library becomes more important as long-term training gains accumulate."
      ],
      "table": {
        "headers": ["Building", "What it controls", "Early priority"],
        "rows": [
          ["Main Hall", "Maximum level of other guild buildings", "First"],
          ["Dormitory", "Guild member capacity", "High"],
          ["Shop", "Available item exchanges", "High"],
          ["Vault", "Guild Fund storage limit", "Raise before the cap becomes restrictive"],
          ["Library", "Guild Training projects", "Long-term priority after core capacity and shop access"]
        ]
      },
      "image": {
        "src": "/assets/guides/guild-management/guild-skills.webp",
        "alt": "Guild Training and skill development interface"
      }
    },
    {
      "id": "auctions",
      "title": "Write the auction policy before rare items drop",
      "paragraphs": [
        "Rare pets, Advanced Gem Boxes, Royal Gear, and purple cards can create conflict when allocation rules are vague. Pick a policy before the event and apply it consistently.",
        "Contribution-based priority can strengthen a competitive core quickly, while open guild auctions return Starstones to participating members through dividends. Either model can work when eligibility, priority, and exceptions are explained in advance."
      ],
      "bullets": [
        "Define how activity, combat power, event attendance, and recent wins affect priority.",
        "Publish whether core teams receive first access to role-defining items.",
        "Keep a visible record of decisions so the same rule is used next time.",
        "Discuss policy changes before the event rather than after a valuable drop appears."
      ]
    },
    {
      "id": "roles",
      "title": "Divide officer duties and set rules that match the guild",
      "paragraphs": [
        "One Guild Leader should not handle recruitment, removals, announcements, social activity, event planning, and live GVG command alone. Assign named owners and make their permissions match their responsibilities.",
        "Casual guilds can emphasize a relaxed environment, stable daily teams, and basic inactivity rules. Competitive guilds need explicit weekly activity and GVG expectations, plus a League Commander who owns tactics, assignments, and live calls. Voice communication is usually faster than text during GVG."
      ],
      "table": {
        "headers": ["Role", "Primary responsibility"],
        "rows": [
          ["Recruiter", "Invite suitable players and explain expectations"],
          ["Roster officer", "Track inactivity, absences, and replacements"],
          ["Communications officer", "Maintain mail, announcements, and the weekly schedule"],
          ["Community officer", "Keep social activity healthy and help members form teams"],
          ["League Commander", "Prepare tactics, assign battlefield groups, and call GVG decisions"]
        ]
      },
      "image": {
        "src": "/assets/guides/guild-management/guild-permissions.webp",
        "alt": "Guild role and permission management interface",
        "caption": "Match permissions to a clearly named responsibility so work is distributed without creating uncertainty."
      }
    },
    {
      "id": "weekly-checklist",
      "title": "A simple weekly leadership checklist",
      "steps": [
        {"title": "After reset", "text": "Post the event calendar, Merit target, shop priorities, and any building-fund goal."},
        {"title": "Before team events", "text": "Confirm leaders, parties, substitutes, counter items, and the communication channel."},
        {"title": "After each event", "text": "Record attendance, reward outcomes, weak groups, and one tactical change for next week."},
        {"title": "Before auction", "text": "Repeat the allocation policy and confirm who is eligible to bid or receive priority."},
        {"title": "End of week", "text": "Review inactive members, fill roster gaps, and recognize consistent contributors before the next reset."}
      ]
    }
  ],
  "faqs": [
    {"question": "What should an RTNW guild upgrade first?", "answer": "Upgrade the Main Hall first because it controls the level cap of the other buildings. Dormitory and Shop are usually the next early priorities, with Vault raised before its storage cap becomes restrictive."},
    {"question": "How can a guild improve event attendance?", "answer": "Use one repeated weekly calendar, announce rosters early, maintain substitute players, and explain the concrete reward or progression benefit of each event."},
    {"question": "Why are fixed teams useful?", "answer": "Stable teams coordinate faster, progress at a similar pace, clear daily content more efficiently, and can take defined tactical roles in Guild League and other group events."},
    {"question": "Should guild auction items be assigned or openly auctioned?", "answer": "Both systems can work. Contribution-based assignment accelerates a competitive core, while open auctions distribute Starstone dividends more broadly. The important part is publishing the rule before valuable items appear and applying it consistently."}
  ],
  "related": [
    ["Guild League guide", "/guides/guild-league/"],
    ["Polarity Zone guide", "/guides/polarity-zone/"],
    ["Hazy Forest guide", "/guides/hazy-forest/"],
    ["Event schedule", "/sea/events/"],
    ["Guild event guide library", "/guides/guild-events/"]
  ]
} satisfies SourceGuide;

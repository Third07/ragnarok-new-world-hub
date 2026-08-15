import { ImageResponse } from "next/og";

export const socialSize = { width: 1200, height: 630 };
export const socialContentType = "image/png";

export const socialCardSlugs = [
  "home",
  "guides",
  "class-tier-list",
  "beginner-progression",
  "druid-builds",
  "refining-equipment",
  "farming-card-progression",
  "world-map",
  "monster-index",
  "card-index",
  "equipment-index",
] as const;

type SocialCardSlug = (typeof socialCardSlugs)[number];

type SocialCardConfig = {
  badge: string;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
};

const cards: Record<SocialCardSlug, SocialCardConfig> = {
  home: {
    badge: "RTNW HUB",
    eyebrow: "Ragnarok: The New World",
    title: "Guides, Builds & Tools",
    description: "English planners, indexes, simulators, and World Map.",
    accent: "#d6a94f",
  },
  guides: {
    badge: "GUIDE LIBRARY",
    eyebrow: "Ragnarok: The New World",
    title: "Guides, Builds & Progression",
    description: "Five cornerstone guides connected to working tools.",
    accent: "#d6a94f",
  },
  "class-tier-list": {
    badge: "CLASS RANKINGS",
    eyebrow: "F2P, PvE & PvP",
    title: "Class Tier List",
    description: "Compare all eight class families by the mode you play.",
    accent: "#d85a6a",
  },
  "beginner-progression": {
    badge: "BEGINNER GUIDE",
    eyebrow: "Start Strong",
    title: "Progression Roadmap",
    description: "First hours, daily routines, and F2P resource priorities.",
    accent: "#4faf9d",
  },
  "druid-builds": {
    badge: "DRUID GUIDE",
    eyebrow: "Three Forms",
    title: "Werewolf · Wereraptor · Arcanist",
    description: "Separate stats, skills, rotations, and investment paths.",
    accent: "#7cb85a",
  },
  "refining-equipment": {
    badge: "EQUIPMENT GUIDE",
    eyebrow: "Refine Smarter",
    title: "Upgrade Checkpoints",
    description: "Choose the base item, slot priority, and safe target.",
    accent: "#e2a23a",
  },
  "farming-card-progression": {
    badge: "600-KILL GUIDE",
    eyebrow: "Green · Blue · Purple",
    title: "Card Drop Gauge Math",
    description: "Exact totals, daily progress, and smarter farming routes.",
    accent: "#8063df",
  },
  "world-map": {
    badge: "INTERACTIVE TOOL",
    eyebrow: "Ragnarok: The New World",
    title: "World Map",
    description: "Find monsters, quests, chests, landmarks, and services.",
    accent: "#48a6b0",
  },
  "monster-index": {
    badge: "GAME DATA",
    eyebrow: "Ragnarok: The New World",
    title: "Monster Index",
    description: "Search stats, habitats, elements, drops, and linked cards.",
    accent: "#c96b55",
  },
  "card-index": {
    badge: "GAME DATA",
    eyebrow: "Ragnarok: The New World",
    title: "Card Index",
    description: "Search effects, slots, sources, drops, and fusion data.",
    accent: "#8b6cc7",
  },
  "equipment-index": {
    badge: "GAME DATA",
    eyebrow: "Ragnarok: The New World",
    title: "Equipment Index",
    description: "Browse gear, stats, slots, set effects, and upgrades.",
    accent: "#c89b42",
  },
};

export function isSocialCardSlug(value: string): value is SocialCardSlug {
  return socialCardSlugs.includes(value as SocialCardSlug);
}

export function renderSocialCard(slug: string) {
  const card = isSocialCardSlug(slug) ? cards[slug] : cards.home;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        color: "#fffaf0",
        background:
          "radial-gradient(circle at 82% 18%, rgba(255,255,255,.16), transparent 32%), linear-gradient(135deg, #082f2b 0%, #0b453d 64%, #123f39 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 18,
          display: "flex",
          border: "2px solid rgba(214,169,79,.42)",
          borderRadius: 24,
        }}
      />

      <div
        style={{
          position: "absolute",
          right: -105,
          top: -90,
          width: 520,
          height: 760,
          display: "flex",
          transform: "rotate(-17deg)",
          background: "rgba(255,255,255,.055)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: 118,
          top: 138,
          width: 300,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `4px solid ${card.accent}38`,
          borderRadius: 999,
        }}
      >
        <div
          style={{
            width: 210,
            height: 210,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `4px solid ${card.accent}52`,
            borderRadius: 999,
          }}
        >
          <div
            style={{
              width: 104,
              height: 104,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fffaf0",
              background: card.accent,
              borderRadius: 24,
              fontSize: 72,
              fontWeight: 900,
              transform: "rotate(45deg)",
            }}
          >
            <span style={{ transform: "rotate(-45deg)", display: "flex" }}>✦</span>
          </div>
        </div>
      </div>

      <div
        style={{
          width: 810,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "70px 0 50px 70px",
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            display: "flex",
            padding: "11px 19px",
            color: "white",
            background: card.accent,
            borderRadius: 999,
            fontSize: 23,
            fontWeight: 900,
            letterSpacing: 1.2,
          }}
        >
          {card.badge}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 42,
            color: "#ead9b2",
            fontFamily: "Georgia, serif",
            fontSize: 35,
            fontStyle: "italic",
          }}
        >
          {card.eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 14,
            maxWidth: 800,
            fontSize: card.title.length > 30 ? 59 : 70,
            fontWeight: 900,
            lineHeight: 1.03,
            letterSpacing: -2.2,
          }}
        >
          {card.title}
        </div>

        <div
          style={{
            width: 220,
            height: 8,
            display: "flex",
            marginTop: 22,
            background: card.accent,
            borderRadius: 8,
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 28,
            maxWidth: 760,
            color: "#d7e8e1",
            fontSize: 28,
            lineHeight: 1.35,
          }}
        >
          {card.description}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "auto",
            gap: 21,
          }}
        >
          <span style={{ display: "flex", fontSize: 24, fontWeight: 900 }}>RTNW.ONLINE</span>
          <span
            style={{
              width: 4,
              height: 24,
              display: "flex",
              background: card.accent,
              borderRadius: 4,
            }}
          />
          <span style={{ display: "flex", color: "#a9c6bb", fontSize: 19 }}>
            Independent fan-made guide and game-data hub
          </span>
        </div>
      </div>
    </div>,
    {
      ...socialSize,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      },
    },
  );
}

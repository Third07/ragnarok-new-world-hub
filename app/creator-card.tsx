import { ImageResponse } from "next/og";

export const creatorCards = [
  {
    slug: "high-wizard-build",
    badge: "BUILD GUIDE",
    eyebrow: "Ragnarok: The New World",
    title: "HIGH WIZARD",
    subtitle: "Fire · Ice · Ghost builds",
    accent: "#69b7ff",
    accentSoft: "#b9e4ff",
    mark: "W",
    relatedHref: "/guides/high-wizard-builds/",
    downloadName: "ragnarok-new-world-high-wizard-build-thumbnail.png",
  },
  {
    slug: "high-priest-build",
    badge: "BUILD GUIDE",
    eyebrow: "Ragnarok: The New World",
    title: "HIGH PRIEST",
    subtitle: "Support · Battle · Exorcist",
    accent: "#f4c762",
    accentSoft: "#fff0b3",
    mark: "P",
    relatedHref: "/guides/high-priest-builds/",
    downloadName: "ragnarok-new-world-high-priest-build-thumbnail.png",
  },
  {
    slug: "monk-build",
    badge: "BUILD GUIDE",
    eyebrow: "Ragnarok: The New World",
    title: "MONK",
    subtitle: "Combo · Guillotine · PvP",
    accent: "#ff846f",
    accentSoft: "#ffc2ad",
    mark: "M",
    relatedHref: "/guides/monk-build/",
    downloadName: "ragnarok-new-world-monk-build-thumbnail.png",
  },
  {
    slug: "world-map",
    badge: "MAP GUIDE",
    eyebrow: "Ragnarok: The New World",
    title: "WORLD MAP",
    subtitle: "Monsters · Quests · Chests",
    accent: "#62d7c8",
    accentSoft: "#b6fff1",
    mark: "⌖",
    relatedHref: "/sea/maps/?lang=en-US",
    downloadName: "ragnarok-new-world-map-thumbnail.png",
  },
  {
    slug: "mvp-hunting",
    badge: "BOSS GUIDE",
    eyebrow: "Ragnarok: The New World",
    title: "MVP HUNTING",
    subtitle: "Locations · Counters · Party",
    accent: "#df6076",
    accentSoft: "#ffb7c3",
    mark: "MVP",
    relatedHref: "/guides/mvp-hunting/",
    downloadName: "ragnarok-new-world-mvp-hunting-thumbnail.png",
  },
  {
    slug: "blank-template",
    badge: "CREATOR TEMPLATE",
    eyebrow: "Ragnarok: The New World",
    title: "YOUR VIDEO TITLE",
    subtitle: "Add your topic, class, or event",
    accent: "#6f86ff",
    accentSoft: "#c7d0ff",
    mark: "+",
    relatedHref: "/creator-kit/#usage",
    downloadName: "rtnw-blank-youtube-thumbnail-template.png",
  },
] as const;

export type CreatorCardSlug = (typeof creatorCards)[number]["slug"];

export function isCreatorCardSlug(value: string): value is CreatorCardSlug {
  return creatorCards.some((card) => card.slug === value);
}

export function renderCreatorCard(slug: CreatorCardSlug) {
  const card = creatorCards.find((item) => item.slug === slug) ?? creatorCards[0];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        color: "#fffdf4",
        background:
          "radial-gradient(circle at 84% 18%, rgba(121,220,255,.2), transparent 30%), linear-gradient(135deg, #092f36 0%, #174f55 48%, #133b69 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 34,
          display: "flex",
          border: "2px solid rgba(244,199,98,.42)",
          borderRadius: 28,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -150,
          top: -210,
          width: 730,
          height: 980,
          display: "flex",
          transform: "rotate(-14deg)",
          background: "rgba(255,255,255,.045)",
          border: "2px solid rgba(255,255,255,.08)",
        }}
      />

      <div
        style={{
          width: 830,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px 0 62px 72px",
        }}
      >
        <div
          style={{
            alignSelf: "flex-start",
            display: "flex",
            padding: "11px 18px",
            borderRadius: 999,
            color: "#082f35",
            background: card.accent,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 1.5,
          }}
        >
          {card.badge}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 34,
            color: card.accentSoft,
            fontFamily: "Georgia, serif",
            fontSize: 34,
            fontStyle: "italic",
          }}
        >
          {card.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 8,
            fontSize: card.title.length > 13 ? 72 : 88,
            fontWeight: 900,
            lineHeight: .98,
            letterSpacing: -3,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 21,
            color: "rgba(255,253,244,.78)",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: .4,
          }}
        >
          {card.subtitle}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 52,
            color: "rgba(255,253,244,.7)",
            fontSize: 20,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          <span style={{ color: "#f4c762", fontSize: 27 }}>✦</span>
          RTNW HUB&nbsp; · &nbsp;RTNW.ONLINE
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: 95,
          top: 108,
          width: 350,
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `3px solid ${card.accent}55`,
          borderRadius: 999,
          boxShadow: `0 0 0 34px ${card.accent}12, 0 0 0 72px ${card.accent}0a`,
        }}
      >
        <div
          style={{
            width: 238,
            height: 238,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#082f35",
            background: `linear-gradient(145deg, ${card.accentSoft}, ${card.accent})`,
            border: "8px solid rgba(255,255,255,.2)",
            borderRadius: 64,
            fontSize: card.mark.length > 1 ? 62 : 112,
            fontWeight: 900,
            transform: "rotate(8deg)",
            boxShadow: "0 28px 60px rgba(0,0,0,.26)",
          }}
        >
          <span style={{ display: "flex", transform: "rotate(-8deg)" }}>{card.mark}</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 83,
          bottom: 73,
          display: "flex",
          color: "rgba(255,255,255,.46)",
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: 1.1,
        }}
      >
        1280 × 720 · CREATOR SAFE AREA
      </div>
    </div>,
    {
      width: 1280,
      height: 720,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000",
      },
    },
  );
}

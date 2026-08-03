import type { Metadata, Viewport } from "next";
import GuideNavigation from "./GuideNavigation";
import "./globals.css";
import "./trust-navigation.css";
import "../public/shared/responsive_ads.css";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim();

const siteVerification: Metadata["verification"] =
  googleSiteVerification || bingSiteVerification
    ? {
        ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
        ...(bingSiteVerification
          ? { other: { "msvalidate.01": bingSiteVerification } }
          : {}),
      }
    : undefined;

export const metadata: Metadata = {
  metadataBase: new URL("https://rtnw.online"),
  title: {
    default: "Ragnarok: The New World Guides, Builds & Tools | RTNW Hub",
    template: "%s | RTNW Hub",
  },
  description:
    "Explore Ragnarok: The New World guides, class builds, skill and rune planners, interactive maps, monsters, cards, equipment, pets, events, and more.",
  applicationName: "RTNW Hub",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "RTNW Hub",
    title: "Ragnarok: The New World Guides, Builds & Tools",
    description:
      "English Ragnarok: The New World guides, builds, planners, interactive maps, and game databases.",
    images: [
      {
        url: "/assets/rtnw-hero-1280.webp",
        width: 1280,
        height: 720,
        alt: "Ragnarok: The New World adventurers exploring Rune-Midgard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ragnarok: The New World Guides, Builds & Tools",
    description: "English RTNW planners, maps, monsters, cards, equipment, pets, events, and guides.",
    images: ["/assets/rtnw-hero-1280.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: siteVerification,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "games",
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1f665c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://rtnw.online/#organization",
        name: "RTNW Hub",
        alternateName: "Ragnarok: The New World Hub",
        url: "https://rtnw.online/",
        logo: {
          "@type": "ImageObject",
          url: "https://rtnw.online/apple-touch-icon.png",
          width: 180,
          height: 180,
        },
        description:
          "Independent fan-made Ragnarok: The New World guide and game-data project.",
        sameAs: [
          "https://github.com/Third07/ragnarok-new-world-hub",
          "https://www.youtube.com/@rtnw.online",
          "https://www.tiktok.com/@rtnw.online",
          "https://www.facebook.com/RtnwOnline",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://rtnw.online/#website",
        url: "https://rtnw.online/",
        name: "RTNW Hub",
        alternateName: "Ragnarok: The New World Hub",
        description:
          "English Ragnarok: The New World guides, builds, planners, maps, and game databases.",
        publisher: { "@id": "https://rtnw.online/#organization" },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <script
          src="/shared/responsive_ads.js?v=20260804-ads3"
          defer
          data-rtnw-ads="true"
        />
        <GuideNavigation />
        {children}
      </body>
    </html>
  );
}

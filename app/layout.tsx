import type { Metadata, Viewport } from "next";
import GuideNavigation from "./GuideNavigation";
import LanguageSwitcher from "./LanguageSwitcher";
import "./globals.css";
import "./trust-navigation.css";
import "./language-switcher.css";
import "../public/shared/responsive_ads.css";
import "./dark-ragnarok.css";
import "./route-fixes.css";
import "./panel-site-theme.css";

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
    default: "Ragnarok: The New World Database & Skill Simulator | RTNW Hub",
    template: "%s | RTNW Hub",
  },
  description:
    "Search the Ragnarok: The New World database for monsters, cards, equipment, and pets. Use the skill simulator, interactive map, quiz answers, class builds, and guides.",
  applicationName: "RTNW Hub",
  authors: [{ name: "RTNW Hub", url: "https://rtnw.online/" }],
  creator: "RTNW Hub",
  publisher: "RTNW Hub",
  keywords: [
    "Ragnarok The New World database",
    "Ragnarok The New World skill simulator",
    "Ragnarok New World database",
    "Ragnarok New World quiz answers",
    "RTNW",
    "RTNW database",
    "Ragnarok The New World maps",
    "Ragnarok The New World builds",
  ],
  alternates: {
    canonical: "/",
    languages: { "en": "/" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "RTNW Hub",
    title: "Ragnarok: The New World Database & Skill Simulator",
    description:
      "Search monsters, cards, equipment, and pets, then use the RTNW skill simulator, interactive map, quiz answers, class builds, and guides.",
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
    title: "Ragnarok: The New World Database & Skill Simulator",
    description:
      "Search RTNW monsters, cards, equipment, pets, quiz answers, builds, maps, and skill tools.",
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#5b6ee8",
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
        alternateName: [
          "Ragnarok: The New World Hub",
          "Ragnarok The New World Database",
          "RTNW Database",
        ],
        description:
          "English Ragnarok: The New World database, skill simulator, interactive map, quiz answers, class builds, and practical guides.",
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
          src="/shared/responsive_ads.js?v=20260805-ads2"
          defer
          data-rtnw-ads="true"
        />
        <GuideNavigation />
        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}

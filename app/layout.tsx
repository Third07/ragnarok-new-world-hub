import type { Metadata, Viewport } from "next";
import "./globals.css";
import "../public/shared/responsive_ads.css";

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
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://rtnw.online/#website",
    url: "https://rtnw.online/",
    name: "RTNW Hub",
    alternateName: "Ragnarok: The New World Hub",
    description:
      "English Ragnarok: The New World guides, builds, planners, maps, and game databases.",
    inLanguage: "en",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

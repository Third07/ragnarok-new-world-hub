import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ragnarok: The New World Hub — Tools, Maps & Planners",
  description: "English planners, databases, interactive maps, monster data, and build tools for Ragnarok: The New World.",
  other: { "codex-preview": "development" },
  icons: { icon: "/media/images/zhujiemian/icon_zhujiemian_jineng.webp" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1f665c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

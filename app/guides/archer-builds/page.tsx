import type { Metadata } from "next";
import ClassBuildGuide from "../ClassBuildGuide";
import { classBuildGuides } from "../class-guide-data";

const guide = classBuildGuides.archer;

export const metadata: Metadata = {
  title: `Ragnarok: The New World ${guide.title}`,
  description: guide.description,
  alternates: { canonical: `/guides/${guide.slug}/` },
  openGraph: {
    type: "article",
    url: `/guides/${guide.slug}/`,
    title: `Ragnarok: The New World ${guide.title}`,
    description: guide.openGraphDescription,
    images: [{ url: "/assets/rtnw-hero-1280.webp", width: 1280, height: 720, alt: `${guide.className} build guide` }],
  },
  twitter: { card: "summary_large_image", title: `RTNW ${guide.title}`, description: guide.openGraphDescription, images: ["/assets/rtnw-hero-1280.webp"] },
};

export default function ArcherBuildsPage() {
  return <ClassBuildGuide guide={guide} />;
}

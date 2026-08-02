import { isSocialCardSlug, renderSocialCard, socialCardSlugs } from "../../social-card";

export const runtime = "edge";

export function generateStaticParams() {
  return socialCardSlugs.map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return renderSocialCard(isSocialCardSlug(slug) ? slug : "home");
}

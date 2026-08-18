import {
  creatorCards,
  isCreatorCardSlug,
  renderCreatorCard,
} from "../../creator-card";

export const runtime = "edge";

export function generateStaticParams() {
  return creatorCards.map((card) => ({ slug: card.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!isCreatorCardSlug(slug)) return new Response("Creator asset not found", { status: 404 });
  return renderCreatorCard(slug);
}

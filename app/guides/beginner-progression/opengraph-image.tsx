import { renderSocialCard, socialContentType, socialSize } from "../../social-card";

export const alt = "Ragnarok: The New World beginner progression roadmap";
export const size = socialSize;
export const contentType = socialContentType;

export default function Image() {
  return renderSocialCard("beginner-progression");
}

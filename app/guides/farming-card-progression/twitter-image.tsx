import { renderSocialCard, socialContentType, socialSize } from "../../social-card";

export const alt = "Ragnarok: The New World farming and card progression guide";
export const size = socialSize;
export const contentType = socialContentType;

export default function Image() {
  return renderSocialCard("farming-card-progression");
}

import { renderSocialCard, socialContentType, socialSize } from "../../social-card";

export const alt = "Ragnarok: The New World F2P, PvE, and PvP class tier list";
export const size = socialSize;
export const contentType = socialContentType;

export default function Image() {
  return renderSocialCard("class-tier-list");
}

import { renderSocialCard, socialContentType, socialSize } from "./social-card";

export const alt = "Ragnarok: The New World guides, builds, tools, and game data";
export const size = socialSize;
export const contentType = socialContentType;

export default function Image() {
  return renderSocialCard("home");
}

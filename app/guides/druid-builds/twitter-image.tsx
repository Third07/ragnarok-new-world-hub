import { renderSocialCard, socialContentType, socialSize } from "../../social-card";

export const alt = "Ragnarok: The New World Druid Werewolf, Wereraptor, and Arcanist builds";
export const size = socialSize;
export const contentType = socialContentType;

export default function Image() {
  return renderSocialCard("druid-builds");
}

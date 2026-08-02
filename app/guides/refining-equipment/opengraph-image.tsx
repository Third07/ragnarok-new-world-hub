import { renderSocialCard, socialContentType, socialSize } from "../../social-card";

export const alt = "Ragnarok: The New World refining and equipment upgrade guide";
export const size = socialSize;
export const contentType = socialContentType;

export default function Image() {
  return renderSocialCard("refining-equipment");
}

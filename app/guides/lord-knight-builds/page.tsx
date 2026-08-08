import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { lordKnightGuide } from "../source-guide-data/advanced-second-job-guides";

export const metadata = buildGuideMetadata(lordKnightGuide);

export default function Page() {
  return <SourceGuidePage guide={lordKnightGuide} />;
}

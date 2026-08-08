import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { nightWalkerGuide } from "../source-guide-data/advanced-second-job-guides";

export const metadata = buildGuideMetadata(nightWalkerGuide);

export default function Page() {
  return <SourceGuidePage guide={nightWalkerGuide} />;
}

import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { sniperGuide } from "../source-guide-data/advanced-second-job-guides";

export const metadata = buildGuideMetadata(sniperGuide);

export default function Page() {
  return <SourceGuidePage guide={sniperGuide} />;
}

import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { assassinCrossGuide } from "../source-guide-data/advanced-second-job-guides";

export const metadata = buildGuideMetadata(assassinCrossGuide);

export default function Page() {
  return <SourceGuidePage guide={assassinCrossGuide} />;
}

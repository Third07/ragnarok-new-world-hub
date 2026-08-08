import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { highPriestGuide } from "../source-guide-data/advanced-second-job-guides";

export const metadata = buildGuideMetadata(highPriestGuide);

export default function Page() {
  return <SourceGuidePage guide={highPriestGuide} />;
}

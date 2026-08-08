import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { whitesmithGuide } from "../source-guide-data/advanced-second-job-guides";

export const metadata = buildGuideMetadata(whitesmithGuide);

export default function Page() {
  return <SourceGuidePage guide={whitesmithGuide} />;
}

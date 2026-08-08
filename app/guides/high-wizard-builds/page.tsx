import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { highWizardGuide } from "../source-guide-data/advanced-second-job-guides";

export const metadata = buildGuideMetadata(highWizardGuide);

export default function Page() {
  return <SourceGuidePage guide={highWizardGuide} />;
}

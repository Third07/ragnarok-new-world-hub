import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { guide } from "../source-guide-data/monk-build";

export const metadata = buildGuideMetadata(guide);

export default function MonkBuildPage() {
  return <SourceGuidePage guide={guide} />;
}

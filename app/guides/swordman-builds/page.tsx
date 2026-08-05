import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { guide } from "../source-guide-data/swordman-builds";

export const metadata = buildGuideMetadata(guide);

export default function Page() {
  return <SourceGuidePage guide={guide} />;
}

import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { mvpHuntingGuide } from "../source-guide-data/mvp-hunting";

export const metadata = buildGuideMetadata(mvpHuntingGuide);

export default function MvpHuntingPage() {
  return <SourceGuidePage guide={mvpHuntingGuide} />;
}

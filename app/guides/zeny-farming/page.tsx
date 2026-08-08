import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { zenyFarmingGuide } from "../source-guide-data/zeny-farming";
import ZenySessionCalculator from "./ZenySessionCalculator";

export const metadata = buildGuideMetadata(zenyFarmingGuide);

export default function ZenyFarmingPage() {
  return (
    <SourceGuidePage guide={zenyFarmingGuide}>
      <ZenySessionCalculator />
    </SourceGuidePage>
  );
}

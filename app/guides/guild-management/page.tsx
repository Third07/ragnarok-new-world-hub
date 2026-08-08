import SourceGuidePage, { buildGuideMetadata } from "../SourceGuidePage";
import { guide } from "../source-guide-data/guild-management";

export const metadata = buildGuideMetadata(guide);

export default function GuildManagementPage() {
  return <SourceGuidePage guide={guide} />;
}

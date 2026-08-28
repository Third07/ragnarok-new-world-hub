// A source review is not an in-game redemption test. Keep the date explicit;
// never advance it automatically at build time.
export const codesReviewedAt = "2026-08-28";
export const codesReviewedLabel = "August 28, 2026";

export type RedeemCode = {
  code: string;
  rewards: string;
  note?: string;
  confidence: "Source listed" | "Conflicting reports" | "Reported inactive";
  sources: readonly string[];
};

export const codeSources = [
  { id: "gamingph", label: "GamingPH: shared codes and rewards", url: "https://gamingph.com/2026/05/list-of-all-ragnarok-the-new-world-redeem-codes/" },
  { id: "mobi", label: "Mobi.gg: August 26 code list", url: "https://mobi.gg/en/tips/ragnarok-the-new-world-codes/" },
  { id: "pockettactics", label: "Pocket Tactics: August 24 code list", url: "https://www.pockettactics.com/ragnarok-the-new-world/codes" },
  { id: "wiki", label: "Community wiki: conflicting and inactive-code reports", url: "https://www.rothenewworld.wiki/redeem-codes/" },
  { id: "oneone", label: "OneOne: official partner promotion and redemption steps", url: "https://games.oneone.com/newsletters/smo-oneone-row" },
  { id: "bluestacks", label: "BlueStacks: limited single-use partner codes", url: "https://www.bluestacks.com/blog/redeem-codes/ragnarok-the-new-world-redeem-codes-en.html" },
] as const;

export const activeCodes: readonly RedeemCode[] = [
  { code: "ROWGO1ST", rewards: "1 Vintage Card Book, 30,000 Adventure Coins, and 20 Pet Food.", confidence: "Source listed", sources: ["gamingph", "mobi"] },
  { code: "ROW0716", rewards: "10 Pet Tag Gacha Tickets, 5 Daily Hearty Meals, 5 Kafra Blind Boxes, and 30,000 Adventure Coins.", confidence: "Source listed", sources: ["gamingph", "mobi"] },
  { code: "ROWLAUNCH", rewards: "20,000 Adventure Coins and 10 Pet Food.", confidence: "Source listed", sources: ["gamingph", "mobi"] },
  { code: "ROW666", rewards: "1 Kafra Blind Box, 20,000 Adventure Coins, and 1 Common Hair Dye.", confidence: "Source listed", sources: ["gamingph", "mobi"] },
  { code: "ROW777", rewards: "1 Kafra Blind Box, 20,000 Adventure Coins, and 5 Pet Food.", confidence: "Source listed", sources: ["gamingph", "mobi"] },
  { code: "ROW888", rewards: "20,000 Adventure Coins, 1 Common Hair Dye, and 5 Pet Food.", note: "Some lists show a Blind Box instead of Hair Dye. Check the reward preview; sources disagree on this bundle.", confidence: "Source listed", sources: ["gamingph", "mobi", "pockettactics"] },
  { code: "ROWORLD", rewards: "2 Hearty Dishes, 20,000 Adventure Coins, and 1 Common Hair Dye.", confidence: "Source listed", sources: ["gamingph", "mobi"] },
  { code: "ROWTOP1", rewards: "2 Hearty Dishes, 20,000 Adventure Coins, and 5 Pet Food.", confidence: "Source listed", sources: ["gamingph", "mobi"] },
  { code: "ROWMVP", rewards: "20,000 Adventure Coins and 10 Pet Food.", confidence: "Source listed", sources: ["gamingph", "mobi"] },
];

export const reportedCodes: readonly RedeemCode[] = [
  { code: "BABYMONSTER", rewards: "Collaboration rewards; current contents are unconfirmed.", note: "Pocket Tactics still lists this code, but the community wiki reports it stopped working on August 8. It is not included in Copy all codes.", confidence: "Conflicting reports", sources: ["pockettactics", "wiki"] },
  { code: "ROARIEL", rewards: "Previously reported Adventure Coins and growth materials.", note: "Mobi.gg still lists it, while the community wiki reports it stopped working on August 8. Availability is unresolved, not verified active.", confidence: "Conflicting reports", sources: ["mobi", "wiki"] },
  { code: "ROW0015", rewards: "No reliable current reward list.", note: "The community wiki reports this older code stopped working. There is no confirmed expiry date or fresh redemption test from RTNW Hub.", confidence: "Reported inactive", sources: ["wiki"] },
];

export const partnerPromotion = {
  name: "SM Malls Online × OneOne",
  expiresAt: "2026-08-31T23:59:00+08:00",
  deadline: "August 31, 2026, 11:59 PM (GMT+8 / Philippine time)",
  source: "https://games.oneone.com/newsletters/smo-oneone-row",
};

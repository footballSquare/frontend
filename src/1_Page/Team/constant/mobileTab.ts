export enum MobileTabKey {
  Info = "info",
  Members = "members",
  Matches = "matches",
}

export const MOBILE_TABS: { key: MobileTabKey; label: string }[] = [
  { key: MobileTabKey.Info, label: "정보" },
  { key: MobileTabKey.Members, label: "멤버" },
  { key: MobileTabKey.Matches, label: "경기" },
];

export enum MobileTabKey {
  Info = "info",
  Members = "members",
  Matches = "matches",
  Boards = "boards",
}

export const MOBILE_TABS: { key: MobileTabKey; label: string }[] = [
  { key: MobileTabKey.Info, label: "정보" },
  { key: MobileTabKey.Members, label: "멤버" },
  { key: MobileTabKey.Matches, label: "경기" },
  { key: MobileTabKey.Boards, label: "게시판" },
];

export enum DesktopTabKey {
  Matches = "matches",
  Boards = "boards",
}

export const DESKTOP_TABS: { key: DesktopTabKey; label: string }[] = [
  { key: DesktopTabKey.Matches, label: "경기" },
  { key: DesktopTabKey.Boards, label: "게시판" },
];

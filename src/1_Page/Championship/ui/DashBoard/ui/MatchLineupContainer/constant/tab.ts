export enum ViewMode {
  Team = "team",
  Lineup = "lineup",
  Personal = "personal",
}

export const BUTTON_TEXT = {
  [ViewMode.Team]: "팀 기록 보기",
  [ViewMode.Lineup]: "라인업 보기",
  [ViewMode.Personal]: "개인 기록 보기",
  DETAIL: "매치 상세 보기",
} as const;

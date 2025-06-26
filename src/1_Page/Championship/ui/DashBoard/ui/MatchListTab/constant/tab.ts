export enum VIEW_MODE {
  Team = "team",
  Lineup = "lineup",
  Personal = "personal",
}

export const VIEW_MODE_BUTTONS = [
  { id: VIEW_MODE.Lineup, label: "라인업 보기" },
  { id: VIEW_MODE.Team, label: "팀 기록 보기" },
  { id: VIEW_MODE.Personal, label: "개인 기록 보기" },
];

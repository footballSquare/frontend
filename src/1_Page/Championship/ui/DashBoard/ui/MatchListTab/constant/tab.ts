export enum VIEW_MODE {
  Team = "team",
  Lineup = "lineup",
  Personal = "personal",
}

export const BUTTON_TEXT = {
  [VIEW_MODE.Team]: "팀 기록 보기",
  [VIEW_MODE.Lineup]: "라인업 보기",
  [VIEW_MODE.Personal]: "개인 기록 보기",
  DETAIL: "매치 상세 보기",
} as const;

export const VIEW_MODE_BUTTONS = [
  { id: VIEW_MODE.Lineup, label: BUTTON_TEXT[VIEW_MODE.Lineup] },
  { id: VIEW_MODE.Team, label: BUTTON_TEXT[VIEW_MODE.Team] },
  {
    id: VIEW_MODE.Personal,
    label: BUTTON_TEXT[VIEW_MODE.Personal],
  },
];

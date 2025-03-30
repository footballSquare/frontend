export enum ACTIVE_TAB {
  PLAYERS = "players",
  TEAMS = "teams",
  MATCHES = "matches",
}

export const activeTabList = [
  { id: ACTIVE_TAB.PLAYERS, label: "출전 선수" },
  { id: ACTIVE_TAB.TEAMS, label: "팀 목록" },
  { id: ACTIVE_TAB.MATCHES, label: "매치 목록" },
];

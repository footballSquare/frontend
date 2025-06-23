export enum ACTIVE_TAB {
  MATCHES = "matches",
  PLAYERS = "players",
  TEAMS = "teams",
  TEAM_LIST = "team_list",
}

export const activeTabList = [
  { id: ACTIVE_TAB.MATCHES, label: "매치 목록" },
  { id: ACTIVE_TAB.PLAYERS, label: "출전 선수" },
  { id: ACTIVE_TAB.TEAMS, label: "팀 기록" },
  { id: ACTIVE_TAB.TEAM_LIST, label: "참가 팀" },
];

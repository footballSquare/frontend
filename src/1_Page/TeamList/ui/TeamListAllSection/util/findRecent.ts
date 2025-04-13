export const findRecentTeam = (teamLists: TeamListInfo[]) => {
  const recentTeam = teamLists.find((team) => team.team_list_created_at);
  return recentTeam ? recentTeam.team_list_idx : null;
};

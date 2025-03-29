export const convertToFilterMatchList = (
  matchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[]
) => {
  const eliminatedTeams: number[] = [];

  matchList.forEach((match) => {
    console.log(match.championship_match_first.common_status_idx);
    if (match.championship_match_first.common_status_idx !== 4) {
      eliminatedTeams.push(match.championship_match_second.team_list_idx);
      eliminatedTeams.push(match.championship_match_first.team_list_idx);
    }
    if (
      match.championship_match_first.match_team_stats_our_score >
      match.championship_match_second.match_team_stats_our_score
    ) {
      eliminatedTeams.push(match.championship_match_second.team_list_idx);
    } else if (
      match.championship_match_first.match_team_stats_our_score <
      match.championship_match_second.match_team_stats_our_score
    ) {
      eliminatedTeams.push(match.championship_match_first.team_list_idx);
    }
  });

  // 경기 결과가 끝난 후, 패배팀을 제외한 팀들만 필터링
  const filteredTeamList = teamList.filter(
    (team) => !eliminatedTeams.includes(team.team_list_idx)
  );

  return filteredTeamList;
};

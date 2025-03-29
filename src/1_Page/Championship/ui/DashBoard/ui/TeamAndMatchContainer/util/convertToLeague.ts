export const convertToLeague = (
  matches: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[]
): [LeagueData[]] => {
  const statsMap: { [teamId: number]: LeagueData } = {};

  // 팀 리스트로 팀 배열 생성
  teamList.forEach((team) => {
    statsMap[team.team_list_idx] = {
      team_list_idx: team.team_list_idx,
      team_list_name: team.team_list_name,
      team_list_short_name: team.team_list_short_name,
      team_list_color: team.team_list_color,
      team_list_emblem: team.team_list_emblem,
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };
  });

  // 매치 리스트를 통해 팀 리스트 데이터 업데이트
  matches.forEach((match) => {
    const team1 = match.championship_match_first;
    const team2 = match.championship_match_second;

    // 매치의 팀1의 데이터 업데이트
    statsMap[team1.team_list_idx].matchesPlayed += 1;
    statsMap[team1.team_list_idx].goalsFor += team1.match_team_stats_our_score;
    statsMap[team1.team_list_idx].goalsAgainst +=
      team1.match_team_stats_other_score;
    if (team1.match_team_stats_our_score > team1.match_team_stats_other_score) {
      statsMap[team1.team_list_idx].wins += 1;
      statsMap[team1.team_list_idx].points += 3;
    } else if (
      team1.match_team_stats_our_score === team1.match_team_stats_other_score
    ) {
      statsMap[team1.team_list_idx].draws += 1;
      statsMap[team1.team_list_idx].points += 1;
    } else {
      statsMap[team1.team_list_idx].losses += 1;
    }

    // 매치의 팀2의 데이터 업데이트
    statsMap[team2.team_list_idx].matchesPlayed += 1;
    statsMap[team2.team_list_idx].goalsFor += team2.match_team_stats_our_score;
    statsMap[team2.team_list_idx].goalsAgainst +=
      team2.match_team_stats_other_score;
    if (team2.match_team_stats_our_score > team2.match_team_stats_other_score) {
      statsMap[team2.team_list_idx].wins += 1;
      statsMap[team2.team_list_idx].points += 3;
    } else if (
      team2.match_team_stats_our_score === team2.match_team_stats_other_score
    ) {
      statsMap[team2.team_list_idx].draws += 1;
      statsMap[team2.team_list_idx].points += 1;
    } else {
      statsMap[team2.team_list_idx].losses += 1;
    }
  });

  // 골득실 계산
  Object.values(statsMap).forEach((team) => {
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });

  // 객체 배열화 및 sosrt 함수를 통한 정렬
  const teamStatsArray = Object.values(statsMap);
  teamStatsArray.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference)
      return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return [teamStatsArray];
};

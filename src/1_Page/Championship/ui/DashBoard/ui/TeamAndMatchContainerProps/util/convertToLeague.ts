export const convertToLeague = (
  matches: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[]
): TeamStats[] => {
  const statsMap: { [teamId: number]: TeamStats } = {};

  // Initialize statsMap using teamList data so that every team appears
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

  // Process match data to update team statistics
  matches.forEach((match) => {
    const team1 = match.championship_match_first;
    const team2 = match.championship_match_second;

    // Ensure team1 is in statsMap in case it's not in teamList
    if (!statsMap[team1.team_list_idx]) {
      statsMap[team1.team_list_idx] = {
        team_list_idx: team1.team_list_idx,
        team_list_name: team1.team_list_name,
        team_list_short_name: team1.team_list_short_name,
        team_list_color: team1.team_list_color,
        team_list_emblem: team1.team_list_emblem,
        matchesPlayed: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    }

    // Ensure team2 is in statsMap in case it's not in teamList
    if (!statsMap[team2.team_list_idx]) {
      statsMap[team2.team_list_idx] = {
        team_list_idx: team2.team_list_idx,
        team_list_name: team2.team_list_name,
        team_list_short_name: team2.team_list_short_name,
        team_list_color: team2.team_list_color,
        team_list_emblem: team2.team_list_emblem,
        matchesPlayed: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    }

    // Update team1 statistics
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

    // Update team2 statistics
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

  // Calculate goal difference for each team
  Object.values(statsMap).forEach((team) => {
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });

  // Convert statsMap to an array and sort by points, goal difference, and goals for
  const teamStatsArray = Object.values(statsMap);
  teamStatsArray.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference)
      return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return teamStatsArray;
};

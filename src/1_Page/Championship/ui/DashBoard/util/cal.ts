import { TeamStats } from "../ui/MatchList/type";
import { ChampionshipMatchList } from "../../../../../3_Entity/Championship/types/response";

export const calculateTeamStats = (
  matches: ChampionshipMatchList[]
): TeamStats[] => {
  const statsMap: { [teamId: number]: TeamStats } = {};

  matches.forEach((match) => {
    const team1 = match.championship_match_first;
    const team2 = match.championship_match_second;

    // 팀1 초기화
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
    // 팀2 초기화
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

    // 팀1 통계 업데이트
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

    // 팀2 통계 업데이트
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

  // 결과를 배열로 변환하고, 포인트, 골득실, 득점 순으로 정렬
  const teamStatsArray = Object.values(statsMap);
  teamStatsArray.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference)
      return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return teamStatsArray;
};

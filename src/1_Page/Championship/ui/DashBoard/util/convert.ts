export const convertToFilterMatchList = (
  matchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[],
  tournamentData: TournamentData[]
) => {
  const eliminatedTeams: number[] = [];
  const teams = getHighestRoundTeamIndices(tournamentData);

  matchList.forEach((match) => {
    // 종료되지 않은 경기라면 제거해야할 팀에 두팀 모두 추가
    if (match.championship_match_first.common_status_idx !== 4) {
      eliminatedTeams.push(match.championship_match_second.team_list_idx);
      eliminatedTeams.push(match.championship_match_first.team_list_idx);
    } else if (
      match.championship_match_first.match_team_stats_our_score === null ||
      match.championship_match_second.match_team_stats_our_score === null
    ) {
      eliminatedTeams.push(match.championship_match_second.team_list_idx);
      eliminatedTeams.push(match.championship_match_first.team_list_idx);
    }
    // 승자 결정 후 진팀만 제거해야할 리스트에 추가
    else if (
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
    (team) =>
      !eliminatedTeams.includes(team.team_list_idx) &&
      !teams.includes(team.team_list_idx)
  );

  return filteredTeamList;
};
const getHighestRoundTeamIndices = (
  tournamentData: TournamentData[]
): number[] => {
  if (!tournamentData?.length) return [];

  // 마지막 라운드부터 시작하여 더미 데이터 경기가 아닌 팀 데이터가 존재하는 첫 번째 라운드를 찾음
  const validRound = tournamentData
    .slice()
    .reverse()
    .find((roundData) =>
      roundData.matchList.some(
        (match) =>
          match.championship_match_first.team_list_idx !== -1 ||
          match.championship_match_second.team_list_idx !== -1
      )
    );

  if (!validRound) return [];

  // 만약 해당 라운드의 모든 경기에서 양쪽 팀의 인덱스가 유효하다면, 즉 경기가 완료되었다면 빈 배열 반환
  const allMatchesComplete = validRound.matchList.every(
    (match) =>
      match.championship_match_first.team_list_idx !== -1 &&
      match.championship_match_second.team_list_idx !== -1
  );

  if (allMatchesComplete) return [];

  // 그렇지 않으면, 해당 라운드의 경기들 중 더미 데이터(-1)가 아닌 팀 idx들을 모음
  const teamIndices = validRound.matchList.reduce((acc: Set<number>, match) => {
    const {
      championship_match_first,
      championship_match_second,
      championship_match_idx,
    } = match;
    if (championship_match_idx === 0) {
      return acc; // dummy 경기라면 현재 누적값 반환
    }
    if (championship_match_first.team_list_idx !== -1) {
      acc.add(championship_match_first.team_list_idx);
    }
    if (championship_match_second.team_list_idx !== -1) {
      acc.add(championship_match_second.team_list_idx);
    }

    return acc;
  }, new Set<number>());

  return Array.from(teamIndices);
};

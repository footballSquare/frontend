export const getHighestRoundTeamIndices = (
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
    const { championship_match_first, championship_match_second } = match;
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

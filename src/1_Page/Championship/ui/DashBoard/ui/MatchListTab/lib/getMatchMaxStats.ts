export const getMatchMaxStats = (
  championshipDetail?: ChampionshipMatchDetail | null
) => {
  // 데이터가 아직 로딩되지 않았거나 비어 있을 때의 안전 장치
  if (!championshipDetail) {
    return { maxGoal: 0, maxAssist: 0 };
  }

  // 두 팀 전체 선수 배열 (옵셔널 체이닝 + 기본값)
  const allPlayers = [
    ...(championshipDetail.first_team?.player_stats ?? []),
    ...(championshipDetail.second_team?.player_stats ?? []),
  ];

  const maxGoal =
    allPlayers.length > 0
      ? Math.max(...allPlayers.map((p) => p.match_player_stats_goal ?? 0))
      : 0;

  const maxAssist =
    allPlayers.length > 0
      ? Math.max(...allPlayers.map((p) => p.match_player_stats_assist ?? 0))
      : 0;

  return {
    maxGoal,
    maxAssist,
  };
};

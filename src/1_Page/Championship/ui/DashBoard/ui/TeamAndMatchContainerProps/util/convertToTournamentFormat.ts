export const convertToTournamentFormat = (
  matches: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[]
): TournamentData[] => {
  // 1) 팀 등장 횟수로 라운드를 분류 → Flat 배열 만들기
  // ----------------------------
  const rounds: { [key: number]: ChampionshipMatchList[] } = {
    16: [],
    8: [],
    4: [],
    2: [],
    1: [],
  };

  // (1-1) 팀 등장 횟수 계산
  const teamAppearanceCount: { [teamId: number]: number } = {};
  matches.forEach((match) => {
    const fId = match.championship_match_first.team_list_idx;
    const sId = match.championship_match_second.team_list_idx;

    teamAppearanceCount[fId] = (teamAppearanceCount[fId] || 0) + 1;
    teamAppearanceCount[sId] = (teamAppearanceCount[sId] || 0) + 1;
  });

  // (1-2) minAppearances로 해당 경기가 16/8/4/2/결승 중 어디인지 결정
  matches.forEach((match) => {
    const fId = match.championship_match_first.team_list_idx;
    const sId = match.championship_match_second.team_list_idx;
    const minAppearances = Math.min(
      teamAppearanceCount[fId] || 0,
      teamAppearanceCount[sId] || 0
    );

    if (minAppearances === 1) rounds[16].push(match); // 16강
    else if (minAppearances === 2) rounds[8].push(match); // 8강
    else if (minAppearances === 3) rounds[4].push(match); // 4강
    else if (minAppearances === 4) rounds[2].push(match); // 결승(2강)
    else if (minAppearances === 5) rounds[1].push(match); // 우승전(1강)
  });

  // (1-3) 각 라운드별 경기 정렬
  Object.keys(rounds).forEach((key) => {
    const r = parseInt(key, 10);
    rounds[r].sort(
      (a, b) => a.championship_match_idx - b.championship_match_idx
    );
  });

  // (1-4) flat 배열 생성 (16→8→4→2→1 순서)
  const flatMatches = [
    ...rounds[16],
    ...rounds[8],
    ...rounds[4],
    ...rounds[2],
    ...rounds[1],
  ];

  // 만약 경기 데이터가 없으면, teamList를 기반으로 더미 경기(첫 라운드)를 생성
  let flatMatchesFinal = flatMatches;
  if (flatMatches.length === 0) {
    const dummyMatches: ChampionshipMatchList[] = [];
    for (let i = 0; i < teamList.length; i += 2) {
      dummyMatches.push({
        championship_match_idx: i / 2,
        championship_match_first: {
          ...teamList[i],
          match_team_stats_our_score: 0,
          match_team_stats_other_score: 0,
        },
        championship_match_second: {
          ...teamList[i + 1],
          match_team_stats_our_score: 0,
          match_team_stats_other_score: 0,
        },
      } as ChampionshipMatchList);
    }
    flatMatchesFinal = dummyMatches;
  }

  // 2) Flat 배열을 라운드별로 잘라서 { round, label, matches } 형태로 만들기
  const teamCount = teamList.length; // teamList 기준 팀 수 사용
  const totalRounds = Math.log2(teamCount);

  const result: {
    round: number;
    label: string;
    matches: ChampionshipMatchList[];
  }[] = [];
  let startIndex = 0;

  for (let r = 0; r < totalRounds; r++) {
    // 라운드별 경기 수
    const matchesInThisRound = teamCount / Math.pow(2, r + 1);
    const roundMatches = flatMatchesFinal.slice(
      startIndex,
      startIndex + matchesInThisRound
    );
    startIndex += matchesInThisRound;

    // 라벨 (ex. 16강, 8강, 4강, 결승)
    const roundIndex = r + 1; // 1부터 시작하는 라운드 인덱스
    let label = "";

    // 수정된 remainingTeams 계산법
    const remainingTeams = Math.pow(2, totalRounds - roundIndex + 1);

    if (remainingTeams === 2) {
      label = "결승";
    } else if (remainingTeams === 4) {
      label = "준결승";
    } else {
      label = `${remainingTeams}강`;
    }

    result.push({
      round: roundIndex,
      label,
      matches: roundMatches,
    });
  }

  return result;
};

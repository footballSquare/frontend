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

  // 만약 flatMatches 자체가 아예 없으면, teamList를 이용해 첫 라운드 dummy 경기를 생성
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

  // ----------------------------
  // 2) Flat 배열을 라운드별로 잘라서 { round, label, matches } 형태로 만들기
  // ----------------------------
  // 총 팀 수는 teamList 기준
  const teamCount = teamList.length;
  const totalRounds = Math.log2(teamCount);
  const result: {
    round: number;
    label: string;
    matches: ChampionshipMatchList[];
  }[] = [];
  let startIndex = 0;

  // prevRoundMatches는 이전 라운드의 경기들을 보관 (dummy 경기 생성 시 활용)
  // 첫 라운드(예: 16강)는 flatMatchesFinal에서 가져옴
  let prevRoundMatches: ChampionshipMatchList[] = flatMatchesFinal;

  for (let r = 0; r < totalRounds; r++) {
    // 각 라운드에서 필요한 경기 수
    const expectedMatches = teamCount / Math.pow(2, r + 1);
    const roundMatches = flatMatchesFinal.slice(
      startIndex,
      startIndex + expectedMatches
    );
    startIndex += expectedMatches;

    // 만약 해당 라운드의 경기 수가 부족하면, 이전 라운드 경기 승자(dummy)를 이용해 채워 넣음.
    // 예: 16강의 매치 1,2 승자는 VS 매치 3,4 승자 (즉, prevRoundMatches[0,1]와 prevRoundMatches[2,3]를 활용)
    if (roundMatches.length < expectedMatches) {
      const missing = expectedMatches - roundMatches.length;
      for (let i = 0; i < missing; i++) {
        let dummyFirst, dummySecond;
        // 다음 라운드의 한 경기(j)를 생성할 때, 해당 경기는 이전 라운드에서 2경기를 쌍으로 묶어 생성.
        if (prevRoundMatches.length >= i * 2 + 2) {
          const matchA = prevRoundMatches[i * 2];
          const matchB = prevRoundMatches[i * 2 + 1];
          dummyFirst = {
            team_list_idx: -1,
            team_list_name: `승자 (${matchA.championship_match_idx})`,
            team_list_short_name: "",
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
          };
          dummySecond = {
            team_list_idx: -1,
            team_list_name: `승자 (${matchB.championship_match_idx})`,
            team_list_short_name: "",
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
          };
        } else {
          // 이전 라운드 정보가 부족하면 기본 dummy 값 사용
          dummyFirst = {
            team_list_idx: -1,
            team_list_name: `Dummy 승자1`,
            team_list_short_name: "",
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
          };
          dummySecond = {
            team_list_idx: -1,
            team_list_name: `Dummy 승자2`,
            team_list_short_name: "",
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
          };
        }
        const dummyMatch: ChampionshipMatchList = {
          championship_match_idx: startIndex + i, // 임시 인덱스 할당
          championship_match_first: dummyFirst,
          championship_match_second: dummySecond,
        } as ChampionshipMatchList;
        roundMatches.push(dummyMatch);
      }
    }

    // 현재 라운드의 경기들을 다음 라운드 dummy 생성용으로 저장
    prevRoundMatches = roundMatches;

    // 라운드 라벨 설정 (예: 16강, 8강, 4강, 결승)
    const roundIndex = r + 1;
    let label = "";
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

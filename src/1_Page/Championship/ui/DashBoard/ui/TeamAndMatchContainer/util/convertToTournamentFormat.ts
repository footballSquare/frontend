export const convertToTournamentFormat = (
  matches: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[],
  championship_type: number
): [convertedData: TournamentData[], eliminatedTeams: number[]] => {
  // championship_type 기반 bracket 크기 결정 (없으면 teamList.length 사용)
  const roundSizeMap: Record<number, number> = {
    1: 16,
    2: 8,
    3: 4,
  };

  // 대회 타입에 따른 라운드 사이즈
  const startingRoundSize = roundSizeMap[championship_type];
  //round 개수 계산 ex 16강:4개 8강:3
  const totalRounds = Math.log2(startingRoundSize);

  // 1) 팀 등장 횟수로 라운드를 분류 → Flat 배열 만들기
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
    // 두 팀 중 진 팀의 발현횟수를 기준으로 라운드 결정:
    // 진팀의 발현횟숙가 1이면 가장 하위 라운드
    const minAppearances = Math.min(
      teamAppearanceCount[fId] || 0,
      teamAppearanceCount[sId] || 0
    );
    // 동적으로 round key 계산: startingRoundSize에 따라
    const roundKey = startingRoundSize / Math.pow(2, minAppearances - 1);
    if (roundKey >= 1) {
      rounds[roundKey].push(match);
    }
  });

  // (1-3) 각 라운드별 경기 정렬 매치 idx로 정렬
  Object.keys(rounds).forEach((key) => {
    const r = parseInt(key, 10);
    rounds[r].sort(
      (a, b) => a.championship_match_idx - b.championship_match_idx
    );
  });

  // (1-4) 객체 -> flat 배열 생성 (16→8→4→2→1 순서)
  const flatMatches = [
    ...rounds[16],
    ...rounds[8],
    ...rounds[4],
    ...rounds[2],
    ...rounds[1],
  ];

  // 경기가 매치가 생성되지 않았고 팀만 있는경우 dummy 경기 생성
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
  // 시각화를 위해서 형태 변형

  // 총 팀 수는 championship_type에 따른 bracket 크기를 사용 (예: 16강이면 16)
  const teamCount = startingRoundSize;
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
    // 각 라운드에서 필요한 경기 수 계산
    const expectedMatches = teamCount / Math.pow(2, r + 1);

    // 현재 라운드에 해당하는 경기만 잘라냄
    const roundMatches = flatMatchesFinal.slice(
      startIndex,
      startIndex + expectedMatches
    );
    startIndex += expectedMatches;

    // 만약 해당 라운드의 실제 경기 수가 예상 경기수 보다 적다면 더미데이터 추가
    if (roundMatches.length < expectedMatches) {
      const missing = expectedMatches - roundMatches.length;
      for (let i = 0; i < missing; i++) {
        let dummyFirst, dummySecond;
        if (prevRoundMatches.length >= i * 2 + 2) {
          const matchA = prevRoundMatches[i * 2];
          const matchB = prevRoundMatches[i * 2 + 1];
          dummyFirst = {
            team_list_idx: -1,
            team_list_name: `매치(${matchA.championship_match_idx})승자`,
            team_list_short_name: `매치 ${matchA.championship_match_idx} 승자`,
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
          };
          dummySecond = {
            team_list_idx: -1,
            team_list_name: `매치 (${matchB.championship_match_idx}) 승자`,
            team_list_short_name: `매치 ${matchB.championship_match_idx} 승자`,
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
          };
        } else {
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
        // 더미 데이터 완성
        const dummyMatch: ChampionshipMatchList = {
          championship_match_idx: 0,
          championship_match_first: dummyFirst,
          championship_match_second: dummySecond,
        } as ChampionshipMatchList;
        roundMatches.push(dummyMatch);
      }
    }

    // 현재 라운드의 경기들을 다음 라운드 dummy 생성용으로 저장
    // 다음 경기에 match 승자들을 가져오기 위해
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

  const eliminatedTeams: number[] = [];

  matches.forEach((match) => {
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

  return [result, eliminatedTeams];
};

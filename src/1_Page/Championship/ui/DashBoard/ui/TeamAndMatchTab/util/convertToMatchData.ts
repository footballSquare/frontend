export const convertToMatchData = (
  displayMatchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[],
  championshipTypeIdx: number
): {
  leagueData: LeagueData[];
  tournamentData: TournamentData[];
  filteredTeamList: ChampionshipTeamInfo[];
} => {
  if (championshipTypeIdx === 0) {
    return {
      leagueData: convertToLeague(displayMatchList, teamList),
      filteredTeamList: teamList,
      tournamentData: [],
    };
  } else {
    const tournamentData = convertToTournamentFormat(
      displayMatchList,
      teamList,
      championshipTypeIdx
    );
    const filteredTeamList = convertToFilterMatchList(
      displayMatchList,
      teamList,
      tournamentData
    );
    return {
      tournamentData,
      filteredTeamList,
      leagueData: [],
    };
  }
};

const convertToFilterMatchList = (
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

const convertToLeague = (
  matchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[]
): LeagueData[] => {
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
  matchList.forEach((match) => {
    const team1 = match.championship_match_first;
    const team2 = match.championship_match_second;

    // 매치의 팀1의 데이터 업데이트
    statsMap[team1.team_list_idx].matchesPlayed += 1;
    statsMap[team1.team_list_idx].goalsFor +=
      team1.match_team_stats_our_score || 0;
    statsMap[team1.team_list_idx].goalsAgainst +=
      team1.match_team_stats_other_score || 0;
    if (
      team1.match_team_stats_our_score ||
      0 > (team1.match_team_stats_other_score || 0)
    ) {
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
    statsMap[team2.team_list_idx].goalsFor +=
      team2.match_team_stats_our_score || 0;
    statsMap[team2.team_list_idx].goalsAgainst +=
      team2.match_team_stats_other_score || 0;
    if (
      team2.match_team_stats_our_score ||
      0 > (team2.match_team_stats_other_score || 0)
    ) {
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

  return teamStatsArray;
};

const convertToTournamentFormat = (
  matchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[],
  championshipTypeIdx: number
): TournamentData[] => {
  // championship_type 기반 bracket 크기 결정 (없으면 teamList.length 사용)
  const roundSizeMap: Record<number, number> = {
    1: 16,
    2: 8,
    3: 4,
  };

  // 대회 타입에 따른 라운드 사이즈
  const startingRoundSize = roundSizeMap[championshipTypeIdx];
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
  matchList.forEach((match) => {
    const fId = match.championship_match_first.team_list_idx;
    const sId = match.championship_match_second.team_list_idx;
    teamAppearanceCount[fId] = (teamAppearanceCount[fId] || 0) + 1;
    teamAppearanceCount[sId] = (teamAppearanceCount[sId] || 0) + 1;
  });

  // (1-2) minAppearances로 해당 경기가 16/8/4/2/결승 중 어디인지 결정
  matchList.forEach((match) => {
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
        championship_match_idx: 0,
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

  // 2) Flat 배열을 라운드별로 잘라서 { round, label, matchList } 형태로 만들기
  // 시각화를 위해서 형태 변형

  // 총 팀 수는 championship_type에 따른 bracket 크기를 사용 (예: 16강이면 16)
  const teamCount = startingRoundSize;
  const result: {
    round: number;
    label: string;
    matchList: ChampionshipMatchList[];
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
      matchList: roundMatches,
    });
  }

  return result;
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

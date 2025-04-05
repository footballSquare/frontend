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
  /*********************************************
   * championship_typeIdx에 따른 기본 라운드 크기 설정
   * 예: 1=16강, 2=8강, 3=4강
   *********************************************/
  const roundSizeMap: Record<number, number> = {
    1: 16, // 16강
    2: 8, // 8강
    3: 4, // 4강
  };

  // 대회 시작 라운드 (16,8,4)
  const startingRoundSize = roundSizeMap[championshipTypeIdx];

  // 예) 16강 -> 전체 라운드는 4번 (16->8->4->2->1)
  const totalRounds = Math.log2(startingRoundSize);

  /********************************************************
   * 1) 각 팀이 몇 번 등장했는지 계산하여, 경기의 라운드를 분류
   *    (minAppearances = 1 -> 가장 하위 라운드)
   ********************************************************/
  const rounds: { [key: number]: ChampionshipMatchList[] } = {
    16: [],
    8: [],
    4: [],
    2: [],
    1: [],
  };

  // 팀별 등장 횟수
  const teamAppearanceCount: { [teamId: number]: number } = {};
  matchList.forEach((match) => {
    const fId = match.championship_match_first.team_list_idx;
    const sId = match.championship_match_second.team_list_idx;
    teamAppearanceCount[fId] = (teamAppearanceCount[fId] || 0) + 1;
    teamAppearanceCount[sId] = (teamAppearanceCount[sId] || 0) + 1;
  });

  // minAppearances 기준으로 라운드 분류
  matchList.forEach((match) => {
    const fId = match.championship_match_first.team_list_idx;
    const sId = match.championship_match_second.team_list_idx;
    const minAppear = Math.min(
      teamAppearanceCount[fId] || 0,
      teamAppearanceCount[sId] || 0
    );
    // minAppear=1 -> 16강, 2->8강, 3->4강, 4->2강, 5->결승
    const roundKey = startingRoundSize / Math.pow(2, minAppear - 1);
    if (roundKey >= 1) {
      rounds[roundKey].push(match);
    }
  });

  // 각 라운드별 idx 오름차순 정렬
  Object.keys(rounds).forEach((k) => {
    const numKey = parseInt(k, 10);
    rounds[numKey].sort(
      (a, b) => a.championship_match_idx - b.championship_match_idx
    );
  });

  /*********************************************************
   * 2) 라운드별로 필요한 경기 수보다 부족하면 해당 라운드 안에서 더미 추가
   *    16강 -> 16/2=8경기, 8강->4경기, 4강->2경기, 2->1경기, 1->? (결승)
   *********************************************************/
  const roundOrder = [16, 8, 4, 2, 1]; // 내림차순

  roundOrder.forEach((rKey) => {
    // 라운드별 예상 경기 수 (16강 -> 8, 8강 ->4, 4강->2, 2강->1, 1강->??(0.5?)
    // 결승(1)을 1경기로 가정
    // 만약 1이라면 1/2=0.5인데, 정수로 올림
    let expectedMatches = Math.floor(rKey / 2);
    if (rKey === 1) {
      expectedMatches = 1; // 결승
    }

    const currentMatches = rounds[rKey];
    if (currentMatches.length < expectedMatches) {
      const missing = expectedMatches - currentMatches.length;
      for (let i = 0; i < missing; i++) {
        // 더미 매치 생성
        const dummyMatch: ChampionshipMatchList = {
          championship_match_idx: 0, // 가짜 idx
          championship_match_first: {
            team_list_idx: -1,
            championship_match_first_idx: 0,
            team_list_name: `매치 A(${rKey})`,
            team_list_short_name: "",
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
            common_status_idx: 0,
          },
          championship_match_second: {
            team_list_idx: -1,
            championship_match_second_idx: 0,
            team_list_name: `매치 A(${rKey})`,
            team_list_short_name: "",
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
            common_status_idx: 0,
          },
        };
        currentMatches.push(dummyMatch);
      }
    }
  });

  // (2-1) 라운드별 매치가 늘었을 수 있으므로 다시 정렬
  Object.keys(rounds).forEach((k) => {
    const numKey = parseInt(k, 10);
    rounds[numKey].sort(
      (a, b) => a.championship_match_idx - b.championship_match_idx
    );
  });

  /*********************************************************
   * 3) 모든 라운드를 평탄화하여 순서대로 나열 (16 -> 8 -> 4 -> 2 -> 1)
   *********************************************************/
  const flatMatches = [
    ...rounds[16],
    ...rounds[8],
    ...rounds[4],
    ...rounds[2],
    ...rounds[1],
  ];

  /********************************************************************
   * 4) flat 배열이 없으면 (경기가 없고 팀만 존재한다면) 더미 생성
   ********************************************************************/
  let flatMatchesFinal = flatMatches;
  if (flatMatches.length === 0) {
    const dummyMatches: ChampionshipMatchList[] = [];
    // 팀들을 2개씩 묶어 가짜 경기 생성
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

  /*************************************************************************
   * 5) flatMatchesFinal을 라운드별로 잘라 { round, label, matchList } 형태로 반환
   *************************************************************************/
  const teamCount = startingRoundSize;
  const result: TournamentData[] = [];
  let startIndex = 0;
  let prevRoundMatches: ChampionshipMatchList[] = flatMatchesFinal;

  for (let r = 0; r < totalRounds; r++) {
    const expectedMatches = teamCount / Math.pow(2, r + 1);

    const roundMatches = flatMatchesFinal.slice(
      startIndex,
      startIndex + expectedMatches
    );
    startIndex += expectedMatches;

    // 부족분 더미 생성
    if (roundMatches.length < expectedMatches) {
      const missing = expectedMatches - roundMatches.length;

      // 간단한 getWinner 함수: 점수가 있는 경우 점수가 높은 쪽을 winner.
      // 무승부거나 점수가 없으면 first를 winner로 가정.
      const getWinner = (
        match: ChampionshipMatchList
      ): ChampionshipTeamInfo => {
        const first = match.championship_match_first;
        const second = match.championship_match_second;

        // 예) '경기 종료'를 가리키는 common_status_idx===4 인 경우만 점수 비교
        if (first.common_status_idx === 4) {
          const fScore = first.match_team_stats_our_score || 0;
          const sScore = second.match_team_stats_our_score || 0;
          if (fScore > sScore) {
            return { ...first };
          } else if (fScore < sScore) {
            return { ...second };
          } else {
            // 동점이면 임의로 first
            return { ...first };
          }
        } else {
          // 미완료인 경우 임의로 first팀을 승자로 가정
          return { ...first };
        }
      };

      for (let i = 0; i < missing; i++) {
        // 이전 라운드에서 2경기씩 가져와 승자를 만들어야 함
        let winnerA: ChampionshipTeamInfo | null = null;
        let winnerB: ChampionshipTeamInfo | null = null;

        // prevRoundMatches에 충분히 경기(2개) 존재하는지 검사
        if (prevRoundMatches.length >= i * 2 + 2) {
          const matchA = prevRoundMatches[i * 2];
          const matchB = prevRoundMatches[i * 2 + 1];
          winnerA = getWinner(matchA);
          winnerB = getWinner(matchB);
        }

        // winnerA/B가 없는 경우는 완전히 dummy 처리
        const dummyFirst = winnerA
          ? {
              ...winnerA,
              // 혹시 색상이나 엠블렘이 null일 수 있으면 기본값 처리
              team_list_color: winnerA.team_list_color || "#cccccc",
              team_list_emblem: winnerA.team_list_emblem || "",
              championship_match_first_idx: 0,
              match_team_stats_our_score: 0,
              match_team_stats_other_score: 0,
              common_status_idx: 0,
            }
          : {
              team_list_idx: -1,
              team_list_name: "매치 승자1",
              team_list_short_name: "",
              team_list_color: "#cccccc",
              team_list_emblem: "",
              match_team_stats_our_score: 0,
              match_team_stats_other_score: 0,
              championship_match_first_idx: 0,
              common_status_idx: 0,
            };

        const dummySecond = winnerB
          ? {
              ...winnerB,
              team_list_color: winnerB.team_list_color || "#cccccc",
              team_list_emblem: winnerB.team_list_emblem || "",
              championship_match_second_idx: 0,
              match_team_stats_our_score: 0,
              match_team_stats_other_score: 0,
              common_status_idx: 0,
            }
          : {
              team_list_idx: -1,
              team_list_name: "매치 승자2",
              team_list_short_name: "",
              team_list_color: "#cccccc",
              team_list_emblem: "",
              match_team_stats_our_score: 0,
              match_team_stats_other_score: 0,
              championship_match_second_idx: 0,
              common_status_idx: 0,
            };

        const dummyMatch: ChampionshipMatchList = {
          championship_match_idx: 0,
          championship_match_first: dummyFirst,
          championship_match_second: dummySecond,
        };

        roundMatches.push(dummyMatch);
      }
    }

    roundMatches.sort((a, b) => {
      // 둘 다 idx=0 (둘 다 더미)이면 순서 변경 없이 유지
      if (a.championship_match_idx === 0 && b.championship_match_idx === 0) {
        return 0;
      }

      // a만 idx=0 → a를 뒤로 보냄
      if (a.championship_match_idx === 0) {
        return 1;
      }

      // b만 idx=0 → b를 뒤로 보냄
      if (b.championship_match_idx === 0) {
        return -1;
      }

      // 둘 다 실제 경기라면 그대로 idx 기준 정렬
      return a.championship_match_idx - b.championship_match_idx;
    });

    prevRoundMatches = roundMatches;

    // 라벨 결정
    const roundIndex = r + 1;
    let label = "";
    const remainTeams = Math.pow(2, totalRounds - roundIndex + 1);

    if (remainTeams === 2) {
      label = "결승";
    } else if (remainTeams === 4) {
      label = "준결승";
    } else {
      label = `${remainTeams}강`;
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

export const convertToMatchData = (
  displayMatchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[],
  championshipTypeIdx: number,
  isLeague: boolean
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
    const filteredTeamList = isLeague
      ? teamList
      : convertToFilterMatchList(displayMatchList, teamList, tournamentData);
    return {
      tournamentData,
      filteredTeamList,
      leagueData: [],
    };
  }
};

// 토너먼트의 경우 추가가 가능한 팀 목록
const convertToFilterMatchList = (
  matchList: ChampionshipMatchList[],
  teamList: ChampionshipTeamInfo[],
  tournamentData: TournamentData[]
) => {
  const eliminatedTeams: number[] = [];
  const teams = getHighestRoundTeamIndices(tournamentData);

  matchList.forEach((match) => {
    // 종료되지 않은 경기라면 제거해야할 팀에 두팀 모두 추가
    if (match?.championship_match_first?.common_status_idx !== 4) {
      eliminatedTeams.push(match?.championship_match_second?.team_list_idx);
      eliminatedTeams.push(match?.championship_match_first?.team_list_idx);
    } else if (
      match?.championship_match_first?.match_team_stats_our_score === null ||
      match?.championship_match_second?.match_team_stats_our_score === null
    ) {
      eliminatedTeams.push(match?.championship_match_second?.team_list_idx);
      eliminatedTeams.push(match?.championship_match_first?.team_list_idx);
    }
    // 승자 결정 후 진팀만 제거해야할 리스트에 추가
    else if (
      match.championship_match_first.match_team_stats_our_score >
      match.championship_match_second.match_team_stats_our_score
    ) {
      eliminatedTeams.push(match?.championship_match_second?.team_list_idx);
    } else if (
      match.championship_match_first.match_team_stats_our_score <
      match.championship_match_second.match_team_stats_our_score
    ) {
      eliminatedTeams.push(match?.championship_match_first?.team_list_idx);
    }
  });

  // 경기 결과가 끝난 후, 패배팀을 제외한 팀들만 필터링
  const filteredTeamList = teamList.filter(
    (team) =>
      !eliminatedTeams.includes(team?.team_list_idx) &&
      !teams.includes(team?.team_list_idx)
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

    // 팀1이 statsMap에 존재하는지 확인
    if (statsMap[team1.team_list_idx]) {
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
    }

    // 팀2가 statsMap에 존재하는지 확인
    if (statsMap[team2.team_list_idx]) {
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
    }
  });

  // 골득실 계산
  Object.values(statsMap).forEach((team) => {
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });

  // 객체 배열화 및 sort 함수를 통한 정렬
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
  // 1) championshipTypeIdx에 따른 기본 라운드 크기 설정
  //    ex) 1=16강, 2=8강, 3=4강
  const roundSizeMap: Record<number, number> = {
    1: 16, // 16강
    2: 8, // 8강
    3: 4, // 4강
  };

  const startingRoundSize = roundSizeMap[championshipTypeIdx];
  // 예: 16강 → totalRounds=4 (16→8→4→2)

  // 2) 각 경기(매치)의 라운드를 분류하기 위해, 팀별 등장 횟수를 센다.
  //    minAppear=1 → 16강, 2→8강, 3→4강, 4 이상→2강(결승)
  const rounds: { [key: number]: ChampionshipMatchList[] } = {
    16: [],
    8: [],
    4: [],
    2: [],
  };

  // 팀별 등장 횟수 계산
  const teamAppearanceCount: Record<number, number> = {};
  matchList.forEach((match) => {
    const fId = match?.championship_match_first?.team_list_idx;
    const sId = match?.championship_match_second?.team_list_idx;
    teamAppearanceCount[fId] = (teamAppearanceCount[fId] || 0) + 1;
    teamAppearanceCount[sId] = (teamAppearanceCount[sId] || 0) + 1;
  });

  // minAppear에 따라 라운드 배정
  matchList.forEach((match) => {
    const fId = match?.championship_match_first?.team_list_idx;
    const sId = match?.championship_match_second?.team_list_idx;
    const minAppear = Math.min(
      teamAppearanceCount[fId] || 0,
      teamAppearanceCount[sId] || 0
    );

    // 4회 이상이면 결승(2강)
    const effectiveAppear = Math.min(minAppear, 4);
    // ex) 16 → 8 → 4 → 2
    const roundKey = startingRoundSize / Math.pow(2, effectiveAppear - 1);

    if (rounds[roundKey]) {
      rounds[roundKey].push(match);
    }
  });

  // 라운드별 idx 오름차순 정렬
  Object.keys(rounds).forEach((k) => {
    const numKey = parseInt(k, 10);
    rounds[numKey].sort(
      (a, b) => a.championship_match_idx - b.championship_match_idx
    );
  });

  /*********************************************************
   * 3) 라운드별 '예상 경기 수'보다 부족할 경우 더미 매치 생성
   *    16강 → 8경기, 8강 →4경기, 4강 →2경기, 2강 →1경기
   *********************************************************/
  const roundOrder = [16, 8, 4, 2];

  // 예시: rKey=8(8강)에서 누락된 경기가 있다면
  //       prevRoundKey=16(16강)에서 (1,2번 매치) 승자 → 상위1,
  //                             (3,4번 매치) 승자 → 상위2
  roundOrder.forEach((rKey) => {
    const expectedMatches = rKey / 2; // ex) 16강->8, 8강->4, 4강->2, 2강->1
    const currentMatches = rounds[rKey];

    // 현재 라운드의 이전 라운드 키를 구한다
    const currentIndex = roundOrder.indexOf(rKey);
    // 이전 라운드가 존재하지 않으면 null (ex: 16강은 이전 라운드 없음)
    const prevRoundKey = currentIndex > 0 ? roundOrder[currentIndex - 1] : null;

    if (currentMatches.length < expectedMatches) {
      const missing = expectedMatches - currentMatches.length;

      for (let i = 0; i < missing; i++) {
        // 하위라운드가 없거나, 매치 정보를 제대로 구할 수 없다면
        // 임시로 "승자(매치 #?)" 라벨만 달아놓은 더미 매치 생성
        let firstTeamName = `매치 A(${rKey})`;
        let secondTeamName = `매치 B(${rKey})`;

        if (prevRoundKey) {
          // (i*2 + 1)번, (i*2 + 2)번 매치의 승자라 가정하고 표시
          const matchNumA = i * 2 + 1;
          const matchNumB = i * 2 + 2;

          firstTeamName = `승자 (${prevRoundKey}강 ${matchNumA}번)`;
          secondTeamName = `승자 (${prevRoundKey}강 ${matchNumB}번)`;
        }

        const dummyMatch: ChampionshipMatchList = {
          match_match_start_time: "",
          championship_match_idx: 0,
          championship_match_first: {
            match_match_idx: 0,
            team_list_idx: -1,
            team_list_name: firstTeamName,
            team_list_short_name: "",
            team_list_color: "#cccccc",
            team_list_emblem: "",
            match_team_stats_our_score: 0,
            match_team_stats_other_score: 0,
            common_status_idx: 0,
          },
          championship_match_second: {
            match_match_idx: 0,
            team_list_idx: -1,
            team_list_name: secondTeamName,
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

  // 더미 추가 후 재정렬
  Object.keys(rounds).forEach((k) => {
    const numKey = parseInt(k, 10);
    rounds[numKey].sort((a, b) => {
      // If both dummy matches, keep same order
      if (a.championship_match_idx === 0 && b.championship_match_idx === 0) {
        return 0;
      }
      // If only "a" is dummy, push it after "b"
      if (a.championship_match_idx === 0) {
        return 1;
      }
      // If only "b" is dummy, push it after "a"
      if (b.championship_match_idx === 0) {
        return -1;
      }
      // Otherwise, compare by idx ascending
      return a.championship_match_idx - b.championship_match_idx;
    });
  });

  /********************************************************************
   * 4) 해당 라운드가 비어 있고 팀만 있다면, 팀들을 2개씩 묶어 더미 매치 생성
   ********************************************************************/
  roundOrder.forEach((rKey) => {
    const selectRound = rounds[rKey];
    if (selectRound.length === 0) {
      const dummyMatches: ChampionshipMatchList[] = [];
      // 2개씩 묶어 임시 매치 생성
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
      rounds[rKey] = dummyMatches;
    }
  });

  /*************************************************************************
   * 5) 이제 rounds 데이터를 { round, label, matchList } 형태로 모아 최종 반환
   *************************************************************************/
  const result: TournamentData[] = [];

  roundOrder.forEach((rKey, idx) => {
    if (startingRoundSize < rKey) return;
    // roundOrder 순서대로 라벨 지정
    let label = `${rKey}강`;
    if (rKey === 4) label = "준결승";
    else if (rKey === 2) label = "결승";

    result.push({
      round: idx + 1, // (16강=1, 8강=2, 4강=3, 결승=4)
      label,
      matchList: rounds[rKey],
    });
  });

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
      match?.championship_match_first?.team_list_idx !== -1 &&
      match?.championship_match_second?.team_list_idx !== -1
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

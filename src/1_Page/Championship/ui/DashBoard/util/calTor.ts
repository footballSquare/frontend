import { ChampionshipMatchList } from "../../../../../3_Entity/Championship/types/response";

/**
 * 무작위 순서의 `ChampionshipMatchList[]`를 받아,
 * 1) 팀 등장 횟수로 16강/8강/4강/2강/결승 라운드 파악
 * 2) 그 순서대로 Flat 배열 생성
 * 3) 각 라운드별로 분할하여 { round, label, matches }[] 형태로 반환
 */
export function convertToTournamentFormat(
  matches: ChampionshipMatchList[]
): { round: number; label: string; matches: ChampionshipMatchList[] }[] {
  // ----------------------------
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
      teamAppearanceCount[fId],
      teamAppearanceCount[sId]
    );

    if (minAppearances === 1) rounds[16].push(match); // 16강
    else if (minAppearances === 2) rounds[8].push(match); // 8강
    else if (minAppearances === 3) rounds[4].push(match); // 4강
    else if (minAppearances === 4) rounds[2].push(match); // 결승(2강)
    else if (minAppearances === 5) rounds[1].push(match); // 우승전(1강) - 보통은 결승으로 끝나므로 잘 안 쓰일 가능성
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

  // ----------------------------
  // 2) Flat 배열을 라운드별로 잘라서 { round, label, matches } 형태로 만들기
  // ----------------------------
  const totalMatches = flatMatches.length; // ex) 7 => 8강 / 15 => 16강
  const teamCount = totalMatches + 1; // ex) 7+1=8팀, 15+1=16팀
  const totalRounds = Math.log2(teamCount);
  if (!Number.isInteger(totalRounds)) {
    throw new Error(
      `팀 수가 2의 거듭제곱 형태가 아닙니다. (teamCount=${teamCount})`
    );
  }

  // 혹시 또 정렬이 필요하면 여기서 다시 match_idx 정렬
  // (이미 위에서 라운드별 정렬을 했으니 대부분 OK)
  // flatMatches.sort((a, b) => a.championship_match_idx - b.championship_match_idx);

  const result: {
    round: number;
    label: string;
    matches: ChampionshipMatchList[];
  }[] = [];
  let startIndex = 0;

  for (let r = 0; r < totalRounds; r++) {
    // 라운드별 경기 수
    const matchesInThisRound = teamCount / Math.pow(2, r + 1);
    const roundMatches = flatMatches.slice(
      startIndex,
      startIndex + matchesInThisRound
    );
    startIndex += matchesInThisRound;

    // 라벨 (ex. 16강, 8강, 4강, 결승)
    const roundIndex = r + 1; // 1부터 시작하는 라운드 인덱스
    let label = "";

    // 🔹 **수정된 `remainingTeams` 계산법**
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

  // 최종 반환: [{ round: 1, label: '16강', matches: [...] }, { round: 2, label: '8강', ... }, ... ]
  return result;
}

// formationsCoordinates.ts

interface FormationPosition {
  position: string; // "GK", "RB", "ST" 등
  top: string; // 예: "70%"
  left: string; // 예: "50%"
}

/**
 * ex) "4-3-3", "4-4-2" 등에 따른 position 좌표 미리 매핑
 * 실제로는 원하시는 대로 좌표, 포지션 순서 등을 수정하면 됩니다.
 */
export const formationCoordinateMap: Record<string, FormationPosition[]> = {
  "4-4-2": [
    // GK
    { position: "GK", top: "85%", left: "50%" },
    // 4백 수비
    { position: "RB", top: "65%", left: "15%" },
    { position: "RCB", top: "65%", left: "35%" },
    { position: "LCB", top: "65%", left: "65%" },
    { position: "LB", top: "65%", left: "85%" },
    // 미드필더 4명
    { position: "RM", top: "50%", left: "15%" },
    { position: "RCM", top: "50%", left: "35%" },
    { position: "LCM", top: "50%", left: "65%" },
    { position: "LM", top: "50%", left: "85%" },
    // 스트라이커 2명
    { position: "ST", top: "30%", left: "40%" },
    { position: "ST", top: "30%", left: "60%" },
  ],
  "4-3-3": [
    { position: "GK", top: "85%", left: "50%" },
    // 4백
    { position: "RB", top: "65%", left: "20%" },
    { position: "RCB", top: "65%", left: "35%" },
    { position: "LCB", top: "65%", left: "65%" },
    { position: "LB", top: "65%", left: "80%" },
    // 미드필더 3명
    { position: "RCM", top: "50%", left: "30%" },
    { position: "CM", top: "50%", left: "50%" },
    { position: "LCM", top: "50%", left: "70%" },
    // 공격 3명
    { position: "RW", top: "30%", left: "25%" },
    { position: "ST", top: "25%", left: "50%" },
    { position: "LW", top: "30%", left: "75%" },
  ],
  // 나머지 "4-2-3-1", "3-4-3", "3-2-5", "RUSH" 등은 비슷하게 정의 가능
};

// MatchLineup.tsx
import { matchFormation } from "../../../../../../../../../../4_Shared/constant/matchFormation"; // ["4-3-3","4-4-2",...] 등
import useGetChampionshipDetail from "../../../../../../../../../../3_Entity/Championship/useGetChampionshipDetail";

type MatchLineupProps = {
  matchIdx: number;
};

const MatchLineup = (props: MatchLineupProps) => {
  const { matchIdx } = props;
  // ↑ 질문 데이터에 formation이 없어 임시로 "4-4-2"로 가정
  // 실제로는 API에서 받은 데이터로 setFormation()할 수 있음

  const [championshipDetail, loading] = useGetChampionshipDetail(matchIdx);

  if (loading) return <div>로딩중...</div>;

  console.log(championshipDetail);
  const firstTeamPlayers = championshipDetail?.first_team?.player_stats;
  const secondTeamPlayers = championshipDetail?.second_team?.player_stats;

  // 1) 선택된 formation에 대응하는 좌표 세트
  const secondCoord =
    formationCoordinateMap[
      matchFormation[
        championshipDetail?.first_team?.stats?.match_team_stats_possession
      ]
    ] || [];
  const firstCoord =
    formationCoordinateMap[
      matchFormation[
        championshipDetail?.second_team?.stats?.match_team_stats_possession
      ]
    ] || [];

  // 2) firstTeam, secondTeam 각각 좌표에 맞춰서 선수 매칭
  //    실제로는 선수의 position을 보고, coords의 position과 매칭하는 로직이 더 자연스럽습니다.

  const assignedFirst = secondCoord.map((coord, i) => ({
    ...coord,
    nickname: firstTeamPlayers[i]?.player_list_nickname || `빈자리${i + 1}`,
  }));

  const assignedSecond = firstCoord.map((coord, i) => ({
    ...coord,
    nickname: secondTeamPlayers[i]?.player_list_nickname || `빈자리${i + 1}`,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">매치 #{matchIdx} 라인업</h2>

      {/* 축구장 (중앙 영역) */}
      <div className="relative w-full max-w-md mx-auto h-96 bg-green-600 rounded-md">
        {/* 첫 번째 팀 (왼편) */}
        {assignedFirst.map((player, idx) => (
          <div
            key={`first-${idx}`}
            className="absolute bg-white text-black text-xs rounded-full w-6 h-6 flex items-center justify-center shadow"
            style={{
              top: player.top,
              left: player.left,
              transform: "translate(-120%, -50%)", // 살짝 왼쪽으로
            }}>
            {player.nickname}
          </div>
        ))}

        {/* 두 번째 팀 (오른편) */}
        {assignedSecond.map((player, idx) => (
          <div
            key={`second-${idx}`}
            className="absolute bg-white text-black text-xs rounded-full w-6 h-6 flex items-center justify-center shadow"
            style={{
              top: player.top,
              left: player.left,
              transform: "translate(20%, -50%)", // 살짝 오른쪽으로
            }}>
            {player.nickname}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchLineup;

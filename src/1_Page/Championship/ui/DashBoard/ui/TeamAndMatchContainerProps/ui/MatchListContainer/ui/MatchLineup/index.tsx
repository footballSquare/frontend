import useGetChampionshipDetail from "../../../../../../../../../../3_Entity/Championship/useGetChampionshipDetail";
import { formation } from "../../../../../../../../../../4_Shared/constant/formation";

const formationCoordinateMap = {
  "4-4-2": [
    { position: "GK", top: "85%", left: "50%" },
    { position: "RB", top: "65%", left: "15%" },
    { position: "RCB", top: "65%", left: "35%" },
    { position: "LCB", top: "65%", left: "65%" },
    { position: "LB", top: "65%", left: "85%" },
    { position: "RM", top: "50%", left: "15%" },
    { position: "RCM", top: "50%", left: "35%" },
    { position: "LCM", top: "50%", left: "65%" },
    { position: "LM", top: "50%", left: "85%" },
    { position: "ST", top: "30%", left: "40%" },
    { position: "ST", top: "30%", left: "60%" },
  ],
  "4-3-3": [
    { position: "GK", top: "85%", left: "50%" },
    { position: "RB", top: "65%", left: "15%" },
    { position: "RCB", top: "65%", left: "35%" },
    { position: "LCB", top: "65%", left: "65%" },
    { position: "LB", top: "65%", left: "85%" },
    { position: "RCM", top: "50%", left: "30%" },
    { position: "CM", top: "50%", left: "50%" },
    { position: "LCM", top: "50%", left: "70%" },
    { position: "RW", top: "30%", left: "25%" },
    { position: "ST", top: "25%", left: "50%" },
    { position: "LW", top: "30%", left: "75%" },
  ],
  "3-5-2": [
    { position: "GK", top: "85%", left: "50%" },
    { position: "RCB", top: "65%", left: "30%" },
    { position: "CB", top: "65%", left: "50%" },
    { position: "LCB", top: "65%", left: "70%" },
    { position: "RM", top: "50%", left: "15%" },
    { position: "RCM", top: "50%", left: "35%" },
    { position: "CM", top: "50%", left: "50%" },
    { position: "LCM", top: "50%", left: "65%" },
    { position: "LM", top: "50%", left: "85%" },
    { position: "ST", top: "30%", left: "40%" },
    { position: "ST", top: "30%", left: "60%" },
  ],
  "3-4-3": [
    { position: "GK", top: "85%", left: "50%" },
    { position: "RCB", top: "65%", left: "30%" },
    { position: "CB", top: "65%", left: "50%" },
    { position: "LCB", top: "65%", left: "70%" },
    { position: "RM", top: "50%", left: "20%" },
    { position: "RCM", top: "50%", left: "40%" },
    { position: "LCM", top: "50%", left: "60%" },
    { position: "LM", top: "50%", left: "80%" },
    { position: "RW", top: "30%", left: "25%" },
    { position: "ST", top: "25%", left: "50%" },
    { position: "LW", top: "30%", left: "75%" },
  ],
  "5-3-2": [
    { position: "GK", top: "85%", left: "50%" },
    { position: "RWB", top: "65%", left: "10%" },
    { position: "RCB", top: "65%", left: "30%" },
    { position: "CB", top: "65%", left: "50%" },
    { position: "LCB", top: "65%", left: "70%" },
    { position: "LWB", top: "65%", left: "90%" },
    { position: "RCM", top: "50%", left: "35%" },
    { position: "CM", top: "50%", left: "50%" },
    { position: "LCM", top: "50%", left: "65%" },
    { position: "ST", top: "30%", left: "40%" },
    { position: "ST", top: "30%", left: "60%" },
  ],
  "5-4-1": [
    { position: "GK", top: "85%", left: "50%" },
    { position: "RWB", top: "65%", left: "10%" },
    { position: "RCB", top: "65%", left: "30%" },
    { position: "CB", top: "65%", left: "50%" },
    { position: "LCB", top: "65%", left: "70%" },
    { position: "LWB", top: "65%", left: "90%" },
    { position: "RM", top: "50%", left: "15%" },
    { position: "RCM", top: "50%", left: "35%" },
    { position: "LCM", top: "50%", left: "65%" },
    { position: "LM", top: "50%", left: "85%" },
    { position: "ST", top: "30%", left: "50%" },
  ],
};

type MatchLineupProps = {
  matchIdx: number;
};

const MatchLineup = (props: MatchLineupProps) => {
  const { matchIdx } = props;
  const [championshipDetail, loading] = useGetChampionshipDetail(matchIdx);

  if (loading) return <div>로딩중...</div>;

  const firstTeamPlayers = championshipDetail?.first_team?.player_stats || [];
  const secondTeamPlayers = championshipDetail?.second_team?.player_stats || [];

  const firstTeamFormation = formation[
    championshipDetail?.first_team?.team_formation_idx
  ] as keyof typeof formationCoordinateMap;
  const secondTeamFormation = formation[
    championshipDetail?.second_team?.team_formation_idx
  ] as keyof typeof formationCoordinateMap;

  console.log(
    championshipDetail?.second_team?.team_formation_idx,
    championshipDetail?.first_team?.team_formation_idx
  );

  const firstCoord = formationCoordinateMap[firstTeamFormation] || [];
  const secondCoord = formationCoordinateMap[secondTeamFormation] || [];

  // 선수 포지션 매핑 개선
  const assignedFirst = firstCoord.map((coord, idx) => ({
    ...coord,
    nickname: firstTeamPlayers[idx]?.player_list_nickname || "빈자리",
  }));

  const assignedSecond = secondCoord.map((coord, idx) => ({
    ...coord,
    nickname: secondTeamPlayers[idx]?.player_list_nickname || "빈자리",
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        매치 #{matchIdx} 라인업
      </h2>

      {/* 두 개의 포메이션을 나란히 배치 */}
      <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto">
        {/* 첫 번째 팀 */}
        <div className="relative w-full h-96 bg-green-600 rounded-md">
          {assignedFirst.map((player, idx) => (
            <div
              key={`first-${idx}`}
              className="absolute bg-white text-black text-sm rounded-full w-8 h-8 flex items-center justify-center shadow"
              style={{
                top: player.top,
                left: player.left,
                transform: "translateX(-50%)",
              }}>
              {player.nickname}
            </div>
          ))}
        </div>

        {/* 두 번째 팀 */}
        <div className="relative w-full h-96 bg-green-600 rounded-md">
          {assignedSecond.map((player, idx) => (
            <div
              key={`second-${idx}`}
              className="absolute bg-white text-black text-sm rounded-full w-8 h-8 flex items-center justify-center shadow"
              style={{
                top: player.top,
                left: player.left,
                transform: "translateX(-50%)",
              }}>
              {player.nickname}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchLineup;

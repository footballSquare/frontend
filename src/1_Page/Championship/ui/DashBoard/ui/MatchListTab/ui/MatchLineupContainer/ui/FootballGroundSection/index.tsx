import { formation } from "../../../../../../../../../../4_Shared/constant/formation";
import PlayerGroundPoint from "../../../../../../../../../../2_Widget/PlayerGroundPoint";

const FootballGroundSection = (props: FootballGroundSectionProps) => {
  const { championshipDetail } = props;

  // championshipDetail에서 데이터 파싱 (새로운 타입 구조에 맞게)
  const firstTeamFormation =
    championshipDetail?.match_info?.first_match_formation_idx;
  const firstTeamPlayers = championshipDetail?.first_team?.player_stats;
  const firstTeamMomPlayerIdx =
    championshipDetail?.first_team?.stats?.mom_player_idx;
  const firstTeamIdx = championshipDetail?.first_team?.team_list_idx;

  const secondTeamFormation =
    championshipDetail?.match_info?.second_match_formation_idx;
  const secondTeamPlayers = championshipDetail?.second_team?.player_stats;
  const secondTeamMomPlayerIdx =
    championshipDetail?.second_team?.stats?.mom_player_idx;
  const secondTeamIdx = championshipDetail?.second_team?.team_list_idx;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* 팀 헤더 정보 */}
      <div className="flex justify-between items-center mb-3 px-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">H</span>
            </div>
            <div>
              <div className="text-xs text-gray-300">홈팀</div>
              <div className="font-semibold text-white text-sm">
                {firstTeamIdx ? `팀 ${firstTeamIdx}` : "첫 번째 팀"}
              </div>
            </div>
          </div>
          <div className="px-2 py-1 bg-blue-600/20 rounded-full border border-blue-600/30">
            <span className="text-blue-300 text-xs font-medium">
              {formation[firstTeamFormation || 0] || "포메이션 없음"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2 py-1 bg-red-600/20 rounded-full border border-red-600/30">
            <span className="text-red-300 text-xs font-medium">
              {formation[secondTeamFormation || 0] || "포메이션 없음"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <div className="text-xs text-gray-300 text-right">어웨이팀</div>
              <div className="font-semibold text-white text-right text-sm">
                {secondTeamIdx ? `팀 ${secondTeamIdx}` : "두 번째 팀"}
              </div>
            </div>
            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </div>
      </div>

      {/* 축구장 */}
      <div className="relative w-full mx-auto">
        {/* 축구장 컨테이너 - 비율 고정 (3:4로 더 컴팩트하게) */}
        <div
          className="relative w-full bg-gradient-to-b from-green-500 via-green-600 to-green-500 rounded-xl overflow-hidden"
          style={{ aspectRatio: "3/4" }}>
          {/* 축구장 라인 - HTML/CSS로 구현 */}

          {/* 외곽선 */}
          <div className="absolute inset-0 border-3 border-white border-opacity-80 rounded-xl"></div>

          {/* 중앙선 */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-white opacity-80 transform -translate-y-1/2"></div>

          {/* 중앙 원 */}
          <div
            className="absolute top-1/2 left-1/2 border-3 border-white border-opacity-80 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ width: "20%", aspectRatio: "1/1" }}></div>
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white opacity-80 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

          {/* 홈팀 페널티 박스 (상단) */}
          <div className="absolute top-0 left-1/2 w-3/5 h-1/6 border-3 border-white border-opacity-80 border-t-0 transform -translate-x-1/2"></div>

          {/* 홈팀 골 박스 (상단) */}
          <div className="absolute top-0 left-1/2 w-2/5 h-[8.33%] border-3 border-white border-opacity-80 border-t-0 transform -translate-x-1/2"></div>

          {/* 홈팀 페널티 스팟 (상단) */}
          <div
            className="absolute left-1/2 w-2 h-2 border-3 border-white border-opacity-80 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: "14.17%" }}></div>

          {/* 어웨이팀 페널티 박스 (하단) */}
          <div className="absolute bottom-0 left-1/2 w-3/5 h-1/6 border-3 border-white border-opacity-80 border-b-0 transform -translate-x-1/2"></div>

          {/* 어웨이팀 골 박스 (하단) */}
          <div className="absolute bottom-0 left-1/2 w-2/5 h-[8.33%] border-3 border-white border-opacity-80 border-b-0 transform -translate-x-1/2"></div>

          {/* 어웨이팀 페널티 스팟 (하단) */}
          <div
            className="absolute left-1/2 w-2 h-2 border-3 border-white border-opacity-80 rounded-full transform -translate-x-1/2 translate-y-1/2"
            style={{ bottom: "14.17%" }}></div>

          {/* 팀 영역 구분선 (시각적 가이드) */}
          <div
            className="absolute left-0 right-0 top-1/2 h-0.5 bg-white opacity-30 transform -translate-y-1/2"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, white 0, white 10px, transparent 10px, transparent 15px)",
            }}></div>

          {/* 홈팀 플레이어들 (상위 50% 영역) */}
          {firstTeamPlayers?.map((player: PlayerStats, index: number) => (
            <PlayerGroundPoint
              key={`home-${player.player_list_idx}`}
              player={player}
              index={index}
              formation={firstTeamFormation || 0}
              isMOM={firstTeamMomPlayerIdx === player.player_list_idx}
              teamColor={"#3B82F6"}
              teamType="home"
            />
          ))}

          {/* 어웨이팀 플레이어들 (하위 50% 영역) */}
          {secondTeamPlayers?.map((player: PlayerStats, index: number) => (
            <PlayerGroundPoint
              key={`away-${player.player_list_idx}`}
              player={player}
              index={index}
              formation={secondTeamFormation || 0}
              isMOM={secondTeamMomPlayerIdx === player.player_list_idx}
              teamColor={"#EF4444"}
              teamType="away"
            />
          ))}
        </div>
      </div>

      {/* 주석 */}
      <div className="flex justify-center items-center gap-3 mt-3 text-xs text-gray-400 flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span>MOM</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>홈팀</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <span>어웨이팀</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-black rounded-full flex items-center justify-center text-white text-xs border border-white">
            ⚽
          </div>
          <span>골</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-black rounded-full flex items-center justify-center text-white text-xs border border-white">
            🅰
          </div>
          <span>어시스트</span>
        </div>
      </div>
    </div>
  );
};

export default FootballGroundSection;

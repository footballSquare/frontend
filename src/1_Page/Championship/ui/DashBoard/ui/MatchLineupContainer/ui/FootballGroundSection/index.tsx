import React from "react";
import { useNavigate } from "react-router-dom";
import { formations } from "../../../../../../../../2_Widget/MatchModal/constant/formation";
import { matchPosition } from "../../../../../../../../4_Shared/constant/matchPosition";
import useChampionshipInfoContext from "../../../../../../model/useChampionshipInfoContext";
import { getTextColorFromBackground } from "../../../../../../../../4_Shared/lib/colorChecker";

const FootballGroundSection = (props: FootballGroundSectionProps) => {
  const { players, teamFormation, isFirstTeam, isFormationView, momPlayerIdx } =
    props;

  const navigate = useNavigate();
  const [activeTooltipId, setActiveTooltipId] = React.useState<number | null>(
    null
  );

  /** 챔피언십 메인 색 */
  const { championshipListColor } = useChampionshipInfoContext();
  const accent = championshipListColor || "#3b82f6";
  const accentText = getTextColorFromBackground(accent);

  /** 공통 카드 스타일 */
  const cardBase =
    "relative p-3 border-b rounded-md shadow-sm cursor-pointer transition-colors duration-150";
  const whiteCard =
    cardBase + " bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-100";

  /** 포메이션 배경 */
  const pitchBg =
    "w-full sm:w-[300px] h-[500px] rounded-lg shadow-xl p-2 relative bg-green-600 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-700 via-green-600 to-green-700";

  return (
    <div className="flex flex-col sm:flex-row items-center w-full md:w-auto">
      {/* 팀 라인업 (왼쪽 팀만) */}
      {isFirstTeam && (
        <div
          className={`w-full sm:w-1/4 flex-col ${
            isFormationView ? "hidden" : "flex"
          }`}>
          {players?.map((p) => (
            <div
              key={`lineup-${p.player_list_idx}`}
              onClick={() =>
                setActiveTooltipId(
                  activeTooltipId === p.player_list_idx
                    ? null
                    : p.player_list_idx
                )
              }
              className={whiteCard}>
              <span
                className={`truncate whitespace-nowrap ${
                  p.player_list_idx === momPlayerIdx
                    ? "text-yellow-400 font-bold"
                    : ""
                }`}>
                {p.player_list_idx === momPlayerIdx && "MOM "}
                {matchPosition[p.match_position_idx]} : {p.player_list_nickname}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 포메이션 */}
      <div
        className={`${pitchBg} ${
          isFormationView ? "block" : "hidden"
        } sm:block`}>
        {/* 센터 서클 & 골문 */}
        <div className="absolute top-0 left-1/2 w-24 h-12 overflow-hidden -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border border-white -translate-y-1/2" />
        </div>
        <div className="absolute bottom-0 left-1/2 w-24 h-10 border-t border-l border-r border-white -translate-x-1/2" />

        {players?.map((p) => {
          const loc = formations[teamFormation].find(
            (f) => f.positionIdx === p.match_position_idx
          ) || { top: 0, left: 0 };

          return (
            <div
              key={`formation-${p.player_list_idx}`}
              onClick={() =>
                setActiveTooltipId(
                  activeTooltipId === p.player_list_idx
                    ? null
                    : p.player_list_idx
                )
              }
              className="absolute flex flex-col items-center"
              style={{
                top: loc.top,
                left: loc.left,
                transform: "translateX(-50%)",
              }}>
              {/* 플레이어 이름 */}
              <p
                className={`truncate max-w-[90px] text-[10px] leading-tight ${
                  p.player_list_idx === momPlayerIdx
                    ? "text-yellow-300 font-bold"
                    : "text-white"
                }`}>
                {p.player_list_idx === momPlayerIdx && "MOM "}
                {p.player_list_nickname}
              </p>

              {/* 원형 아이콘 */}
              <div
                className={`relative rounded-full w-8 h-8 flex items-center justify-center shadow transition-transform duration-200 ${
                  p.player_list_idx === momPlayerIdx
                    ? "bg-yellow-300"
                    : "bg-white"
                } hover:scale-110`}>
                {/* 골/어시스트 표시 */}
                {(p.match_player_stats_goal ?? 0) > 0 && (
                  <span className="absolute -bottom-1 -left-1 text-[10px] bg-black text-white px-1 rounded-full flex items-center gap-0.5">
                    ⚽
                    {(p.match_player_stats_goal ?? 0) > 1 && (
                      <span className="ml-0.5">
                        +{p.match_player_stats_goal}
                      </span>
                    )}
                  </span>
                )}
                {(p.match_player_stats_assist ?? 0) > 0 && (
                  <span className="absolute -bottom-1 -right-1 text-[10px] bg-black text-white px-1 rounded-full flex items-center gap-0.5">
                    🎯
                    {(p.match_player_stats_assist ?? 0) > 1 && (
                      <span className="ml-0.5">
                        +{p.match_player_stats_assist}
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* 툴팁 */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+8px)] z-10 max-w-[160px] p-2 rounded-md border whitespace-nowrap text-xs transition-opacity duration-200 ${
                  activeTooltipId === p.player_list_idx
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                style={{
                  backgroundColor: "white",
                  borderColor: accent,
                  color: accentText,
                }}>
                <p
                  className="cursor-pointer underline"
                  onClick={() => navigate(`/profile/${p.player_list_idx}`)}>
                  프로필 보기
                </p>
                <div>Pos: {matchPosition[p.match_position_idx]}</div>
                <div>골: {p.match_player_stats_goal || 0}</div>
                <div>도움: {p.match_player_stats_assist || 0}</div>
                <div>패스: {p.match_player_stats_successrate_pass || 0}</div>
                <div>
                  드리블: {p.match_player_stats_successrate_dribble || 0}
                </div>
                <div>태클: {p.match_player_stats_successrate_tackle || 0}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 상대 팀 라인업 */}
      {!isFirstTeam && (
        <div
          className={`w-full sm:w-1/4 flex-col ${
            isFormationView ? "hidden" : "flex"
          }`}>
          {players?.map((p) => (
            <div
              key={`lineup-${p.player_list_idx}`}
              onClick={() =>
                setActiveTooltipId(
                  activeTooltipId === p.player_list_idx
                    ? null
                    : p.player_list_idx
                )
              }
              className={whiteCard}>
              <span
                className={`truncate whitespace-nowrap ${
                  p.player_list_idx === momPlayerIdx
                    ? "text-yellow-400 font-bold"
                    : ""
                }`}>
                {p.player_list_idx === momPlayerIdx && "MOM "}
                {matchPosition[p.match_position_idx]} : {p.player_list_nickname}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FootballGroundSection;

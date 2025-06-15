import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formations } from "../../../../../../../../2_Widget/MatchModal/constant/formation";
import { matchPosition } from "../../../../../../../../4_Shared/constant/matchPosition";
import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";

const FootballGroundSection = (props: FootballGroundSectionProps) => {
  const { players, teamFormation, isFirstTeam, isFormationView, momPlayerIdx } =
    props;

  const navigate = useNavigate();
  const [activeTooltipId, setActiveTooltipId] = React.useState<number | null>(
    null
  );
  const tooltipRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [flipTooltip, setFlipTooltip] = useState<{ [key: number]: boolean }>(
    {}
  );
  useEffect(() => {
    if (activeTooltipId !== null) {
      const tooltipEl = tooltipRefs.current[activeTooltipId];
      if (tooltipEl) {
        const rect = tooltipEl.getBoundingClientRect();
        // 화면 높이의 절반 기준으로 아래쪽이면 위로 플립
        setFlipTooltip((prev) => ({
          ...prev,
          [activeTooltipId]: rect.top > window.innerHeight / 2,
        }));
      }
    }
  }, [activeTooltipId]);

  /** 챔피언십 메인 색 */
  const { championshipListColor } = useChampionshipInfoContext();
  const accent = championshipListColor || "#3b82f6";

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
                className={`whitespace-normal break-words text-sm ${
                  p.player_list_idx === momPlayerIdx
                    ? "text-yellow-400 font-bold"
                    : "text-gray-100"
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
                className={`whitespace-normal break-words max-w-[120px] text-xs leading-snug text-center ${
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
                ref={(el) => (tooltipRefs.current[p.player_list_idx] = el)}
                className={`bg-white text-black absolute left-1/2 -translate-x-1/2 ${
                  flipTooltip[p.player_list_idx]
                    ? "bottom-[calc(100%+8px)]"
                    : "top-[calc(100%+8px)]"
                } z-10 max-w-[160px] p-2 rounded-md border whitespace-nowrap text-xs transition-opacity duration-200 ${
                  activeTooltipId === p.player_list_idx
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
                style={{
                  borderColor: accent,
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

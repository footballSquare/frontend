import React from "react";
import FootballGroundSection from "./ui/FootballGroundSection";
import VerticalTeamStatCards from "./ui/VerticalTeamStatCards";

import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";
import useMatchModalStore from "../../../../../../../../4_Shared/zustand/useMatchModal";
import { BUTTON_TEXT, VIEW_MODE_BUTTONS, ViewMode } from "./constant/tab";
import VerticalPersonStatCards from "./ui/VerticalPersonStatCards";
import useGetChampionshipEvidence from "../../../../../../../../3_Entity/Championship/useGetChampionshipEvidence";

const MatchLineupContainer = (props: MatchLineupContainerProps) => {
  const { championshipMatchIdx, selectedTeams, championshipDetail, matchIdx } =
    props;

  // admin
  const { championshipListColor } = useChampionshipInfoContext();
  const [evidenceImage] = useGetChampionshipEvidence(championshipMatchIdx);
  // championshipMatchIdx에 해당하는 증거 이미지 필터링
  const accentColor = championshipListColor || "#3b82f6";

  const [viewMode, setViewMode] = React.useState<ViewMode>(ViewMode.Lineup);

  // zustand
  const { setMatchIdx, toggleMatchModal } = useMatchModalStore();

  return (
    <div className="px-2 py-3 text-gray-100 lg:p-4">
      {!championshipMatchIdx ? (
        /* 매치 미선택 안내 – 어두운 배경·밝은 텍스트 */
        <div className="flex flex-col items-center justify-center h-full py-8 lg:py-10">
          <div className="bg-gray-800 rounded-full p-3 mb-3 lg:p-4 lg:mb-4">
            <span className="text-gray-300 text-xl lg:text-2xl">{"⚽"}</span>
          </div>
          <h3 className="text-base font-semibold text-gray-100 mb-2 lg:text-lg lg:font-medium">
            매치를 선택해주세요
          </h3>
          <p className="text-sm text-gray-400 text-center max-w-md px-4 lg:px-0">
            왼쪽 패널에서 확인하고 싶은 매치를 선택하면 상세 정보가 표시됩니다.
          </p>
        </div>
      ) : (
        <div>
          {/* 상단 탭 네비게이션 */}
          <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3 lg:mb-6 lg:gap-4">
            {/* 스크롤 가능한 탭 버튼 목록 */}
            <div className="flex overflow-x-auto space-x-2 p-1 rounded-lg scrollbar-hide w-full lg:w-auto lg:p-2 lg:rounded-md">
              {VIEW_MODE_BUTTONS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`flex-shrink-0 px-5 py-3 rounded-full text-base font-semibold transition lg:px-4 lg:py-2 lg:text-sm lg:font-medium ${
                    viewMode === id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  }`}
                  style={
                    viewMode === id
                      ? { backgroundColor: accentColor }
                      : undefined
                  }>
                  {label}
                </button>
              ))}
            </div>

            {/* 상세 보기 버튼 */}
            <button
              className="px-5 py-3 rounded-full text-base font-semibold bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-700 transition-colors duration-200 w-full md:w-auto lg:px-4 lg:py-2 lg:text-sm lg:font-medium"
              onClick={() => {
                setMatchIdx(matchIdx);
                toggleMatchModal();
              }}>
              {BUTTON_TEXT.DETAIL}
            </button>
          </nav>

          {viewMode === ViewMode.Team ? (
            /* 팀 통계 카드 – 필터링된 증거 이미지 사용 */
            <div className="container mx-auto px-0 py-3 lg:px-4 lg:py-6">
              <VerticalTeamStatCards
                firstTeam={{
                  teamListIdx:
                    championshipDetail?.first_team?.team_list_idx || 0,
                  name: selectedTeams.selectTeamList[0],
                  stats: championshipDetail?.first_team?.stats,
                  players: championshipDetail?.first_team.player_stats,
                  evidenceImage: evidenceImage?.first_team_evidence ?? [],
                  matchIdx,
                }}
                secondTeam={{
                  teamListIdx:
                    championshipDetail?.second_team?.team_list_idx || 0,
                  name: selectedTeams.selectTeamList[1],
                  stats: championshipDetail?.second_team?.stats,
                  players: championshipDetail?.second_team.player_stats,
                  evidenceImage: evidenceImage?.second_team_evidence ?? [],
                  matchIdx,
                }}
              />
            </div>
          ) : viewMode === ViewMode.Personal ? (
            /* 개인 기록 보기 – 필터링된 증거 이미지 사용 */
            <div className="container mx-auto px-0 py-3 lg:px-4 lg:py-6">
              <VerticalPersonStatCards
                personEvidenceImage={evidenceImage.player_evidence ?? []}
                teamName1={selectedTeams.selectTeamList[0]}
                teamName2={selectedTeams.selectTeamList[1]}
                team1PlayerStats={championshipDetail?.first_team?.player_stats}
                team2PlayerStats={championshipDetail?.second_team?.player_stats}
              />
            </div>
          ) : (
            /* 라인업/포메이션 영역 – 기존 코드 그대로 */
            <div>
              <div className="flex justify-center items-center gap-3 mb-3 lg:gap-4 lg:mb-4">
                <h2 className="text-lg font-bold lg:text-xl">
                  {selectedTeams.selectTeamList[0] || ""}
                  {`(${selectedTeams.selectTeamScore[0] || ""})`}
                </h2>
                <span className="text-lg font-bold text-gray-300 lg:text-xl">
                  VS
                </span>
                <h2 className="text-lg font-bold lg:text-xl">
                  {selectedTeams.selectTeamList[1] || ""}{" "}
                  {`(${selectedTeams.selectTeamScore[1] || ""})`}
                </h2>
              </div>

              <h2 className="text-lg font-bold mb-3 text-center lg:text-xl lg:mb-4">
                매치 #{championshipMatchIdx} 라인업
              </h2>

              <div className="flex flex-col md:flex-row flex-wrap justify-center gap-3 lg:gap-4">
                {/* FotMob 스타일 통합 축구장 */}
                <div className="w-full max-w-4xl mx-auto">
                  <FootballGroundSection
                    championshipDetail={championshipDetail}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchLineupContainer;

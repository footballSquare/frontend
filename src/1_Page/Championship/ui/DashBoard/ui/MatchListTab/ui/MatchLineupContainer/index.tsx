import React from "react";
import FootballGroundSection from "./ui/FootballGroundSection";
import VerticalTeamStatCards from "./ui/VerticalTeamStatCards";

import useChampionshipInfoContext from "../../../../../../../../4_Shared/model/useChampionshipInfoContext";
import useMatchModalStore from "../../../../../../../../4_Shared/zustand/useMatchModal";
import { BUTTON_TEXT, ViewMode } from "./constant/tab";
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
    <div className="p-4 text-gray-100">
      {!championshipMatchIdx ? (
        /* 매치 미선택 안내 – 어두운 배경·밝은 텍스트 */
        <div className="flex flex-col items-center justify-center h-full py-10">
          <div className="bg-gray-800 rounded-full p-4 mb-4">
            <span className="text-gray-300 text-2xl">{"⚽"}</span>
          </div>
          <h3 className="text-lg font-medium text-gray-100 mb-2">
            매치를 선택해주세요
          </h3>
          <p className="text-sm text-gray-400 text-center max-w-md">
            왼쪽 패널에서 확인하고 싶은 매치를 선택하면 상세 정보가 표시됩니다.
          </p>
        </div>
      ) : (
        <div>
          {/* 상단 탭 네비게이션 */}
          <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            {/* 스크롤 가능한 탭 버튼 목록 */}
            <div className="flex overflow-x-auto space-x-2 p-2 rounded-md scrollbar-hide">
              {(
                [
                  { id: ViewMode.Team, label: BUTTON_TEXT[ViewMode.Team] },
                  { id: ViewMode.Lineup, label: BUTTON_TEXT[ViewMode.Lineup] },
                  {
                    id: ViewMode.Personal,
                    label: BUTTON_TEXT[ViewMode.Personal],
                  },
                ] as { id: ViewMode; label: string }[]
              ).map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setViewMode(id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
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
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800 text-gray-200 border border-gray-600 hover:bg-gray-700 transition-colors duration-200"
              onClick={() => {
                setMatchIdx(matchIdx);
                toggleMatchModal();
              }}>
              {BUTTON_TEXT.DETAIL}
            </button>
          </nav>

          {viewMode === ViewMode.Team ? (
            /* 팀 통계 카드 – 필터링된 증거 이미지 사용 */
            <div className="container mx-auto px-4 py-6">
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
            <div className="container mx-auto px-4 py-6">
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
              <div className="flex justify-center items-center gap-4 mb-4">
                <h2 className="text-xl font-bold">
                  {selectedTeams.selectTeamList[0] || ""}
                  {`(${selectedTeams.selectTeamScore[0] || ""})`}
                </h2>
                <span className="text-xl font-bold text-gray-300">VS</span>
                <h2 className="text-xl font-bold">
                  {selectedTeams.selectTeamList[1] || ""}{" "}
                  {`(${selectedTeams.selectTeamScore[1] || ""})`}
                </h2>
              </div>

              <h2 className="text-xl font-bold mb-4 text-center">
                매치 #{championshipMatchIdx} 라인업
              </h2>

              <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
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

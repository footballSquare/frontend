import FootballGroundSection from "./ui/FootballGroundSection";
import VerticalTeamStatCards from "./ui/VerticalTeamStatCards";
import EvidenceDetailModal from "./ui/EvidenceDetailModal";

import useToggleState from "../../../../../../4_Shared/model/useToggleState";
import { useChampionshipContextInfo } from "../../../../model/useChampionshipContext";
import { getTextColorFromBackground } from "../../../../../../4_Shared/lib/colorChecker";
import useMatchModalStore from "../../../../../../4_Shared/zustand/useMatchModal";

const MatchLineupContainer = (props: MatchLineupContainerProps) => {
  const { championshipMatchIdx, selectedTeams, championshipDetail, matchIdx } =
    props;

  // admin
  const { isCommunityManager, isCommunityOperator, championship_list_color } =
    useChampionshipContextInfo();

  const accentColor = championship_list_color || "#3b82f6";
  const accentText = getTextColorFromBackground(accentColor);

  // state
  const [isModalOpen, handleToggleModal] = useToggleState();
  const [isFormationView, toggleIsFormationView] = useToggleState();
  const [isTeamHistoryView, toggleIsTeamHistoryView] = useToggleState();

  // zustand
  const { setMatchIdx, toggleMatchModal } = useMatchModalStore();

  /* 매치 미선택 안내 – 어두운 배경·밝은 텍스트 */
  if (!championshipMatchIdx)
    return (
      <div className="flex flex-col items-center justify-center h-full py-10">
        <div className="bg-gray-800 rounded-full p-4 mb-4">
          <span className="text-gray-300 text-2xl">⚽</span>
        </div>
        <h3 className="text-lg font-medium text-gray-100 mb-2">
          매치를 선택해주세요
        </h3>
        <p className="text-sm text-gray-400 text-center max-w-md">
          왼쪽 패널에서 확인하고 싶은 매치를 선택하면 상세 정보가 표시됩니다.
        </p>
      </div>
    );

  return (
    /* 카드 여백만 둔 어두운 컨테이너 */
    <div className="p-4 text-gray-100">
      {isCommunityManager ||
        (isCommunityOperator && (
          <button
            style={{ color: accentColor }}
            className="hover:opacity-80 transition-colors"
            onClick={handleToggleModal}>
            증거 자세히 보기
          </button>
        ))}

      {/* 상단 토글 버튼 그룹 */}
      <div className="flex justify-center mb-4 gap-4">
        <button
          className={`px-4 py-2 rounded-full border transition-colors duration-200 `}
          style={
            isTeamHistoryView
              ? {
                  backgroundColor: accentColor,
                  borderColor: accentColor,
                  color: accentText,
                }
              : undefined
          }
          onClick={toggleIsTeamHistoryView}>
          팀 기록 보기
        </button>
        <button
          className={`px-4 py-2 rounded-full border transition-colors duration-200 `}
          style={
            !isTeamHistoryView
              ? {
                  backgroundColor: accentColor,
                  borderColor: accentColor,
                  color: accentText,
                }
              : undefined
          }
          onClick={toggleIsTeamHistoryView}>
          라인업 보기
        </button>
        <button
          className="px-4 py-2 rounded-full border bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 transition-colors duration-200"
          onClick={() => {
            setMatchIdx(matchIdx);
            toggleMatchModal();
          }}>
          매치 상세 보기
        </button>
      </div>

      {isTeamHistoryView ? (
        /* 팀 통계 카드 – 카드 자체는 그대로 두고 상위 배경만 통일 */
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <VerticalTeamStatCards
              teamName={selectedTeams.selectTeamList[0]}
              stats={championshipDetail?.first_team?.stats}
              color="blue"
            />
            <VerticalTeamStatCards
              teamName={selectedTeams.selectTeamList[1]}
              stats={championshipDetail?.second_team?.stats}
              color="green"
            />
          </div>
        </div>
      ) : (
        /* 라인업/포메이션 영역 */
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

          {/* 모바일 토글 – 회색 / 활성 블루 */}
          <div className="md:hidden flex justify-center gap-4 mb-4">
            <button
              className={`px-4 py-2 border rounded `}
              style={
                isFormationView
                  ? {
                      backgroundColor: accentColor,
                      borderColor: accentColor,
                      color: accentText,
                    }
                  : undefined
              }
              onClick={toggleIsFormationView}>
              포메이션 보기
            </button>
            <button
              className={`px-4 py-2 border rounded `}
              style={
                !isFormationView
                  ? {
                      backgroundColor: accentColor,
                      borderColor: accentColor,
                      color: accentText,
                    }
                  : undefined
              }
              onClick={toggleIsFormationView}>
              라인업 보기
            </button>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
            {/* 첫 번째 팀 */}
            <FootballGroundSection
              teamFormation={
                championshipDetail?.match_info?.first_match_formation_idx || 0
              }
              momPlayerIdx={
                championshipDetail?.first_team?.stats?.mom_player_idx
              }
              players={championshipDetail?.first_team?.player_stats}
              isFirstTeam={true}
              isFormationView={isFormationView}
            />
            {/* 두 번째 팀 */}
            <FootballGroundSection
              teamFormation={
                championshipDetail?.match_info?.second_match_formation_idx || 0
              }
              momPlayerIdx={
                championshipDetail?.second_team?.stats?.mom_player_idx
              }
              players={championshipDetail?.second_team?.player_stats}
              isFirstTeam={false}
              isFormationView={isFormationView}
            />
          </div>
        </div>
      )}

      {/* 증거 모달 */}
      {isModalOpen && (
        <EvidenceDetailModal
          handleToggleModal={handleToggleModal}
          championshipMatchIdx={championshipMatchIdx}
          selectTeamList={selectedTeams.selectTeamList}
        />
      )}
    </div>
  );
};

export default MatchLineupContainer;

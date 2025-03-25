import React from "react";
import TeamSection from "./ui/TeamSection";
import useGetChampionshipDetail from "../../../../../../../../../../3_Entity/Championship/useGetChampionshipDetail";
import TeamStatsCard from "./ui/TeamStatCard";
import EvidenceDetailModal from "./ui/EvidenceDetailModal";

const MatchLineup = (props: MatchLineupProps) => {
  const { matchIdx, selectTeamList, selectTeamScore } = props;
  const [isFormationView, setIsFormationView] = React.useState<boolean>(true);
  const [isTeamHistoryView, setIsTeamHistoryView] =
    React.useState<boolean>(false);
  const [championshipDetail] = useGetChampionshipDetail(matchIdx);

  return (
    <div className="p-4">
      <EvidenceDetailModal
        matchIdx={matchIdx}
        selectTeamList={selectTeamList}
      />
      <div className="flex justify-center mb-4 gap-4">
        <button
          className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
            isTeamHistoryView
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setIsTeamHistoryView(true)}>
          팀 기록 보기
        </button>
        <button
          className={`px-4 py-2 rounded-full border transition-colors duration-200 ${
            !isTeamHistoryView
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setIsTeamHistoryView(false)}>
          라인업 보기
        </button>
      </div>

      {isTeamHistoryView ? (
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamStatsCard
              teamName={selectTeamList[0]}
              stats={championshipDetail?.first_team.stats}
              color="blue"
            />

            <TeamStatsCard
              teamName={selectTeamList[1]}
              stats={championshipDetail?.second_team.stats}
              color="green"
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center gap-4 mb-4">
            <h2 className="text-xl font-bold mb-4 text-center">
              {selectTeamList[0]} {`(${selectTeamScore[0]})`}
            </h2>
            <span className="text-xl font-bold">VS</span>
            <h2 className="text-xl font-bold mb-4 text-center">
              {selectTeamList[1]} {`(${selectTeamScore[1]})`}
            </h2>
          </div>

          <h2 className="text-xl font-bold mb-4 text-center">
            매치 #{matchIdx} 라인업
          </h2>

          {/* 모바일에서는 선택할 수 있는 토글 버튼 */}
          <div className="md:hidden flex justify-center gap-4 mb-4">
            <button
              className={`px-4 py-2 border rounded ${
                isFormationView ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setIsFormationView(true)}>
              포메이션 보기
            </button>
            <button
              className={`px-4 py-2 border rounded ${
                !isFormationView ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
              onClick={() => setIsFormationView(false)}>
              라인업 보기
            </button>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
            {/* 첫 번째 팀 (왼쪽) */}
            <TeamSection
              momPlayerIdx={
                championshipDetail?.first_team?.stats?.mom_player_idx
              }
              players={championshipDetail?.first_team?.player_stats}
              isFirstTeam={true}
              isFormationView={isFormationView}
            />

            {/* 두 번째 팀 (오른쪽) */}
            <TeamSection
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
    </div>
  );
};

export default MatchLineup;

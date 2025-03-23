import React from "react";
import useGetChampionshipDetail from "../../../../../../../../../../3_Entity/Championship/useGetChampionshipDetail";
import TeamSection from "./ui/TeamSection";
import { convertMatchData } from "./util/convert";

const MatchLineup = (props: MatchLineupProps) => {
  const { matchIdx } = props;
  const [isFormationView, setIsFormationView] = React.useState<boolean>(true);

  const [championshipDetail] = useGetChampionshipDetail(matchIdx);

  const { assignedFirst, assignedSecond } =
    convertMatchData(championshipDetail);

  return (
    <div className="p-4">
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
            isFormationView ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsFormationView(false)}>
          라인업 보기
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4">
        {/* 첫 번째 팀 (왼쪽) */}
        <TeamSection
          players={championshipDetail?.first_team?.player_stats}
          assignedPositions={assignedFirst}
          isFirstTeam={true}
          isFormationView={isFormationView}
        />

        {/* 두 번째 팀 (오른쪽) */}
        <TeamSection
          players={championshipDetail?.second_team?.player_stats}
          assignedPositions={assignedSecond}
          isFirstTeam={false}
          isFormationView={isFormationView}
        />
      </div>
    </div>
  );
};

export default MatchLineup;

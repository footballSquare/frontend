import ChampionshipMatchCardContainer from "./ui/ChampionshipMatchCardContainer";
import MatchLineupContainer from "./ui/MatchLineupContainer";
import useSelectHandler from "./model/useSelectHandler";
import useGetChampionshipDetail from "../../../../../../../../3_Entity/Championship/useGetChampionshipDetail";

const MatchListTab = (props: MatchListTabProps) => {
  const { matchList, filteredTeamList, matchHandlers } = props;
  const [selectedIdx, selectedTeams, handleSelect] =
    useSelectHandler(matchList);
  const [championshipDetail] = useGetChampionshipDetail(selectedIdx);

  return (
    <div className="w-full mx-auto flex flex-col md:flex-row gap-4">
      {/* 매치 결과 리스트 (좌측) */}
      <ChampionshipMatchCardContainer
        matchHandlers={matchHandlers}
        filteredTeamList={filteredTeamList}
        matchList={matchList}
        selectedIdx={selectedIdx}
        handleSelect={handleSelect}
      />

      {/* MatchLineup (반응형 적용) */}
      <div className="flex-1 min-h-[500px] bg-gray-100 p-4 overflow-x-auto md:overflow-visible">
        <MatchLineupContainer
          matchIdx={selectedIdx}
          selectedTeams={selectedTeams}
          championshipDetail={championshipDetail}
        />
      </div>
    </div>
  );
};

export default MatchListTab;

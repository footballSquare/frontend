import useGetChampionshipMatchList from "../../../../../../3_Entity/Championship/useGetChampionshipMatchList";
import MatchCard from "./ui/MatchCard";

import { MatchListProps } from "./type";

const MatchList = (props: MatchListProps) => {
  const { championshipIdx } = props;
  const [matchList] = useGetChampionshipMatchList(championshipIdx);

  return (
    <div className="w-full max-w-md mx-auto ">
      <h2 className="text-lg font-bold text-blue-700 mb-4">매치 결과</h2>
      <ul className="space-y-3 w-full max-h-[470px] overflow-y-scroll ">
        {matchList.map((match, index) => (
          <MatchCard match={match} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default MatchList;

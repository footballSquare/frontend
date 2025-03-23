import MatchCard from "./ui/MatchCard";
import { MatchListProps } from "./type";

const MatchList = (props: MatchListProps) => {
  const { matchList } = props;

  return (
    <div className="w-full max-w-md mx-auto ">
      <h2 className="text-lg font-bold text-blue-700 mb-4">매치 결과</h2>
      <ul className="space-y-3 w-full max-h-[470px] overflow-y-scroll overflow-x-hidden cursor-pointer flex flex-col items-center">
        {matchList.map((match, index) => (
          <MatchCard match={match} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default MatchList;

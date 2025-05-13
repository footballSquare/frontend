import TournamentMatchColumn from "./ui/TournamentMatchColumn";
import useScale from "./model/useScale";

const TournamentBracket = (props: TournamentBracketProps) => {
  const { tournamentData } = props;
  const { scale, increaseScale, decreaseScale } = useScale();

  return (
    <div className="p-6  text-gray-100 rounded-lg overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        토너먼트 대진표
      </h1>

      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={decreaseScale}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-sm rounded text-gray-100">
          -
        </button>
        <button
          onClick={increaseScale}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-sm rounded text-gray-100">
          +
        </button>
      </div>

      <div
        className="flex min-w-max justify-center transition-all overflow-x-auto"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {tournamentData.map((roundContnet, index) => (
          <div
            key={index + "_match_" + roundContnet.round}
            className="flex-shrink-0 px-4"
            style={{ width: "280px" }}>
            {/* 라운드 제목 16, 8 ,4 등 */}
            <div className="py-2 px-4 rounded-t-lg text-center font-bold bg-gray-700 text-gray-100">
              {roundContnet.label}
            </div>

            {/* 매치 컨테이너 */}
            <div className="space-y-12 relative mt-4">
              {roundContnet.matchList.map(
                (match: ChampionshipMatchList, index: number) => (
                  <TournamentMatchColumn
                    key={index + "_MatchBox_" + match.championship_match_idx}
                    match={match}
                  />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;

import MatchBox from "./ui/MatchBox";

export const TournamentBracket = (props: TournamentBracketProps) => {
  const { tournamentData } = props;

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-lg overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        토너먼트 대진표
      </h1>

      {/* 반응형 크기 조정 */}
      <div className="flex min-w-max justify-center md:scale-100 sm:scale-90 xs:scale-75 transition-all overflow-x-auto">
        {tournamentData.map((roundContnet) => (
          <div
            key={roundContnet.round}
            className="flex-shrink-0 px-4"
            style={{ width: "280px" }}>
            {/* 라운드 제목 16, 8 ,4 등 */}
            <div className="bg-blue-600 text-white py-2 px-4 rounded-t-lg text-center font-bold">
              {roundContnet.label}
            </div>

            {/* 매치 컨테이너 */}
            <div className="space-y-12 relative mt-4">
              {roundContnet.matches.map((match) => (
                <MatchBox match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;

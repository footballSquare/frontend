import LeagueBracket from "./ui/LeagueBracket";
import TournamentBracket from "./ui/TournamentBracket";

const TeamHistoryTab = (props: TeamHistoryTabProps) => {
  const { teamList, isLeague, leagueData, tournamentData } = props;
  return (
    <section className="bg-gray-800 rounded-lg shadow-md">
      {/* 헤더 */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gray-800 rounded-full p-3">
            <span className="text-gray-300 text-xl">🏆</span>
          </div>
          <h2 className="text-2xl font-bold text-white">팀 기록</h2>
        </div>
        <p className="text-gray-400">
          대회 진행 상황과 팀별 순위를 브래킷 형태로 확인할 수 있습니다.
        </p>
      </div>

      <div className="p-4">
        {teamList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <span className="text-gray-400 text-2xl">🏆</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              팀 정보가 없습니다.
            </h3>
            <p className="text-sm text-gray-500">
              대회에 참가 중인 팀이 없거나 아직 등록되지 않았습니다.
            </p>
          </div>
        ) : isLeague ? (
          <LeagueBracket leagueData={leagueData} />
        ) : (
          <TournamentBracket tournamentData={tournamentData} />
        )}
      </div>
    </section>
  );
};

export default TeamHistoryTab;

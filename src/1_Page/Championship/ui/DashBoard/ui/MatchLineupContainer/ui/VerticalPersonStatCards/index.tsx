import React from "react";
import TeamTable from "./ui/TeamTable";

/* ------------- 메인 컴포넌트 ------------- */
const VerticalPersonStatCards = (props: VerticalPersonStatCardsProps) => {
  const { team1PlayerStats, team2PlayerStats } = props;
  const [activeTeam, setActiveTeam] = React.useState<1 | 2>(1);

  // 두 팀 전체 선수 배열
  const allPlayers = [...team1PlayerStats, ...team2PlayerStats];

  const maxGoal = Math.max(
    ...allPlayers.map((p) => p.match_player_stats_goal ?? 0)
  );
  const maxAssist = Math.max(
    ...allPlayers.map((p) => p.match_player_stats_assist ?? 0)
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* 모바일: 탭 전환 */}
      <div className="lg:hidden">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {[1, 2].map((n) => (
            <button
              key={n}
              onClick={() => setActiveTeam(n as 1 | 2)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTeam === n
                  ? "bg-gray-700 text-gray-100 shadow-sm"
                  : "text-gray-400 hover:text-gray-100"
              }`}>
              {n}st Team
            </button>
          ))}
        </div>

        <div className="mt-6">
          <TeamTable
            players={activeTeam === 1 ? team1PlayerStats : team2PlayerStats}
            teamLabel={activeTeam === 1 ? "1st Team" : "2nd Team"}
            maxGoal={maxGoal}
            maxAssist={maxAssist}
          />
        </div>
      </div>

      {/* 데스크톱: 2열 */}
      <div className="hidden lg:grid grid-cols-2 gap-6">
        <TeamTable
          players={team1PlayerStats}
          teamLabel="1st Team"
          maxGoal={maxGoal}
          maxAssist={maxAssist}
        />
        <TeamTable
          players={team2PlayerStats}
          teamLabel="2nd Team"
          maxGoal={maxGoal}
          maxAssist={maxAssist}
        />
      </div>
    </div>
  );
};

export default VerticalPersonStatCards;

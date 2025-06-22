import React from "react";
import PlayerHistoryTableProps from "../../../../../../../../../../2_Widget/PlayerHistoryTable";

const VerticalPersonStatCards = (props: VerticalPersonStatCardsProps) => {
  const {
    team1PlayerStats,
    team2PlayerStats,
    teamName1,
    teamName2,
    personEvidenceImage,
  } = props;
  const [activeTeam, setActiveTeam] = React.useState<0 | 1>(0);

  // 두 팀 전체 선수 배열
  const allPlayers = [...team1PlayerStats, ...team2PlayerStats];

  const maxGoal = Math.max(
    ...allPlayers.map((p) => p.match_player_stats_goal ?? 0)
  );
  const maxAssist = Math.max(
    ...allPlayers.map((p) => p.match_player_stats_assist ?? 0)
  );

  return (
    <div className="w-full mx-auto px-2 py-4 space-y-6 lg:p-4 lg:space-y-6 lg:max-w-6xl">
      {/* 모바일: 탭 전환 */}
      <div className="lg:hidden">
        <div className="flex w-full space-x-1 bg-gray-800 p-1.5 rounded-xl lg:space-x-2 lg:p-2">
          {[teamName1, teamName2].map((teamName, index) => (
            <button
              key={index}
              onClick={() => setActiveTeam(index as 0 | 1)}
              className={`flex-1 py-3 px-3 text-lg font-semibold rounded-lg transition-colors lg:py-4 lg:px-6 ${
                activeTeam === index
                  ? "bg-gray-700 text-gray-100 shadow-sm"
                  : "text-gray-400 hover:text-gray-100"
              }`}>
              {teamName}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto lg:mt-10">
          <PlayerHistoryTableProps
            players={activeTeam === 1 ? team1PlayerStats : team2PlayerStats}
            teamLabel={activeTeam === 1 ? teamName1 : teamName2}
            maxGoal={maxGoal}
            maxAssist={maxAssist}
            personEvidenceImage={personEvidenceImage}
          />
        </div>
      </div>

      {/* 데스크톱: 2열 */}
      <div className="hidden lg:grid grid-cols-2 gap-6">
        <PlayerHistoryTableProps
          players={team1PlayerStats}
          teamLabel={teamName1}
          maxGoal={maxGoal}
          maxAssist={maxAssist}
          personEvidenceImage={personEvidenceImage}
        />
        <PlayerHistoryTableProps
          players={team2PlayerStats}
          teamLabel={teamName2}
          maxGoal={maxGoal}
          maxAssist={maxAssist}
          personEvidenceImage={personEvidenceImage}
        />
      </div>
    </div>
  );
};

export default VerticalPersonStatCards;

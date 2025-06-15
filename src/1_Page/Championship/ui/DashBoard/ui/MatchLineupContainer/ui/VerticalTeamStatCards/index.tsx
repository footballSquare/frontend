import React from "react";
import TeamStatCard from "./ui/TeamStatCard";

const VerticalTeamStatCards = (props: VerticalTeamStatCardsProps) => {
  const {
    team1Stats,
    team2Stats,
    teamName1,
    teamName2,
    teamEvidenceImage,
    team1Player,
    team2Player,
  } = props;
  const [activeTeam, setActiveTeam] = React.useState<0 | 1>(0);

  console.log(team1Stats);
  const handleTeam1Save = (data: PostTeamStatsForm) => {
    console.log("Team 1 stats saved:", data);
    // 실제 구현에서는 API 호출
  };

  const handleTeam2Save = (data: PostTeamStatsForm) => {
    console.log("Team 2 stats saved:", data);
    // 실제 구현에서는 API 호출
  };

  const teams = [
    {
      name: teamName1,
      stats: team1Stats,
      onSave: handleTeam1Save,
      teamEvidenceImage: teamEvidenceImage?.first_team_evidence,
      teamPlayer: team1Player,
    },
    {
      name: teamName2,
      stats: team2Stats,
      onSave: handleTeam2Save,
      teamEvidenceImage: teamEvidenceImage?.second_team_evidence,
      teamPlayer: team2Player,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* 모바일: 탭 전환 */}
      <div className="lg:hidden">
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {teams.map((team, index) => (
            <button
              key={index}
              onClick={() => setActiveTeam(index as 0 | 1)}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTeam === index
                  ? "bg-gray-700 text-gray-100 shadow-sm"
                  : "text-gray-400 hover:text-gray-100"
              }`}>
              {team.name}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <TeamStatCard
            teamName={teams[activeTeam].name}
            stats={teams[activeTeam].stats}
            onSave={teams[activeTeam].onSave}
            teamEvidenceImage={teams[activeTeam].teamEvidenceImage}
            teamPlayer={teams[activeTeam].teamPlayer}
          />
        </div>
      </div>

      {/* 데스크톱: 2열 */}
      <div className="hidden lg:grid grid-cols-2 gap-6">
        {teams.map((team, index) => (
          <TeamStatCard
            key={index}
            teamName={team.name}
            stats={team.stats}
            onSave={team.onSave}
            teamEvidenceImage={team.teamEvidenceImage}
            teamPlayer={team.teamPlayer}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalTeamStatCards;

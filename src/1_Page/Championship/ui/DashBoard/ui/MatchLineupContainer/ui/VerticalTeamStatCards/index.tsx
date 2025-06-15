import React from "react";
import TeamStatCard from "./ui/TeamStatCard";

const VerticalTeamStatCards = (props: VerticalTeamStatCardsProps) => {
  const { firstTeam, secondTeam } = props;
  const [activeTeam, setActiveTeam] = React.useState<0 | 1>(0);

  const teams = [firstTeam, secondTeam];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* 모바일: 탭 전환 */}
      <div className="">
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
          <TeamStatCard teamData={teams[activeTeam]} />
        </div>
      </div>
    </div>
  );
};

export default VerticalTeamStatCards;

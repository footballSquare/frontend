import React from "react";
import { DashBoardProps } from "./type";
import MatchList from "./ui/MatchList";
import ParticipationMembers from "./ui/ParticipationMembers";
import { navList } from "./constant/navList";
import useGetChampionshipMatchList from "../../../../3_Entity/Championship/useGetChampionshipMatchList";
import { calculateTeamStats } from "./util/cal";
import TeamRankingLeagueTable from "./ui/TeamRanking";

const DashBoard = (props: DashBoardProps) => {
  const { championshipIdx } = props;
  const [activeTab, setActiveTab] = React.useState("players");

  const [matchList] = useGetChampionshipMatchList(championshipIdx);
  const teamStats = calculateTeamStats(matchList);

  return (
    <div className="w-full p-4">
      <nav className="flex justify-around bg-blue-600 text-white p-2 rounded-md">
        {navList.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === id ? "bg-blue-800" : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {label}
          </button>
        ))}
      </nav>
      <main className="pt-2">
        <div className={activeTab === "players" ? "block" : "hidden"}>
          <ParticipationMembers championshipIdx={championshipIdx} />
        </div>
        <div className={activeTab === "teams" ? "block" : "hidden"}>
          <TeamRankingLeagueTable teamStats={teamStats} />
        </div>
        <div className={activeTab === "matches" ? "block" : "hidden"}>
          <MatchList matchList={matchList} />
        </div>
      </main>
    </div>
  );
};
export default DashBoard;

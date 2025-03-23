import React from "react";
import { navList } from "./constant/navList";
import { calculateTeamStats } from "./util/cal";

import MatchContainer from "./ui/MatchContainer";
import ParticipationMembers from "./ui/ParticipationMembers";
import TeamRankingLeagueTable from "./ui/TeamRankingLeagueTable";
import TeamRangkingTornement from "./ui/TeamRangkingTornement";

import useGetChampionshipMatchList from "../../../../3_Entity/Championship/useGetChampionshipMatchList";
import { convertToTournamentFormat } from "./util/calTor";

const DashBoard = (props: DashBoardProps) => {
  const { championshipIdx, isLeague } = props;
  const [activeTab, setActiveTab] = React.useState("players");
  const [matchList] = useGetChampionshipMatchList(championshipIdx);

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
          {isLeague ? (
            <TeamRankingLeagueTable teamStats={calculateTeamStats(matchList)} />
          ) : (
            <TeamRangkingTornement
              rounds={convertToTournamentFormat(matchList)}
            />
          )}
        </div>
        <div className={activeTab === "matches" ? "block" : "hidden"}>
          <MatchContainer matchList={matchList} />
        </div>
      </main>
    </div>
  );
};
export default DashBoard;

import React from "react";
import { navList } from "./constant/navList";

import ParticipationMembers from "./ui/ParticipationMembers";
import MatchDataContainer from "./ui/MatchDataContainer";

const DashBoard = (props: DashBoardProps) => {
  const { championshipIdx, isLeague } = props;
  const [activeTab, setActiveTab] = React.useState("players");

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
        <MatchDataContainer
          isLeague={isLeague}
          championshipIdx={championshipIdx}
          activeTab={activeTab}
        />
      </main>
    </div>
  );
};
export default DashBoard;

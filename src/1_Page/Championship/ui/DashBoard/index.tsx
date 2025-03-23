import React from "react";
import { DashBoardProps } from "./type";
import MatchList from "./ui/MatchList";
import ParticipationMembers from "./ui/ParticipationMembers";
import TeamList from "./ui/TeamList";
import { navList } from "./constant/navList";

const DashBoard = (props: DashBoardProps) => {
  const { championshipIdx } = props;
  const [activeTab, setActiveTab] = React.useState("players"); // 기본 탭 설정

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
          <TeamList teamIdx={0} />
        </div>
        <div className={activeTab === "matches" ? "block" : "hidden"}>
          <MatchList championshipIdx={championshipIdx} />
        </div>
      </main>
    </div>
  );
};
export default DashBoard;

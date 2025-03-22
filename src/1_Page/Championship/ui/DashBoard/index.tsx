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
    <div className="w-full">
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
      <main className="px-4 py-8">
        {activeTab === "players" && (
          <ParticipationMembers championshipIdx={championshipIdx} />
        )}
        {activeTab === "teams" && <TeamList teamIdx={0} />}
        {activeTab === "matches" && (
          <MatchList championshipIdx={championshipIdx} />
        )}
      </main>
    </div>
  );
};
export default DashBoard;

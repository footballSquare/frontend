import React from "react";
import { navList } from "./constant/navList";
import { ACTIVE_TAB } from "./constant/activeTab";

import ParticipationMembers from "./ui/ParticipationMembers";
import TeamAndMatchContainerProps from "./ui/TeamAndMatchContainerProps";

const DashBoard = (props: DashBoardProps) => {
  const { championshipIdx, isLeague } = props;
  const [activeTab, setActiveTab] = React.useState<ACTIVE_TAB>(
    ACTIVE_TAB.PLAYERS
  );

  return (
    <div className="w-full p-4">
      <nav className="flex justify-around bg-blue-600 text-white p-2 rounded-md">
        {navList.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as ACTIVE_TAB)}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === id ? "bg-blue-800" : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {label}
          </button>
        ))}
      </nav>
      <main className="pt-2">
        {/* 출전선수 목록 */}
        <div className={activeTab === ACTIVE_TAB.PLAYERS ? "block" : "hidden"}>
          <ParticipationMembers championshipIdx={championshipIdx} />
        </div>
        {/* 팀 and 매치 목록 */}
        <TeamAndMatchContainerProps
          isLeague={isLeague}
          championshipIdx={championshipIdx}
          activeTab={activeTab}
        />
      </main>
    </div>
  );
};
export default DashBoard;

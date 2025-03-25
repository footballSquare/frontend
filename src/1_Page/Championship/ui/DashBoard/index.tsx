import React from "react";
import { navList } from "./constant/navList";
import { ACTIVE_TAB } from "./constant/activeTab";

import ParticipationMembers from "./ui/ParticipationMembers";
import TeamAndMatchContainerProps from "./ui/TeamAndMatchContainerProps";

const DashBoard = (props: DashBoardProps) => {
  const { championshipIdx, championship_type } = props;
  const [activeTab, setActiveTab] = React.useState<ACTIVE_TAB>(
    ACTIVE_TAB.PLAYERS
  );

  return (
    <div className="w-full p-4">
      <nav className="flex overflow-x-auto space-x-2 bg-white p-2 rounded-md scrollbar-hide">
        {navList.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as ACTIVE_TAB)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
          championship_type={championship_type}
          championshipIdx={championshipIdx}
          activeTab={activeTab}
        />
      </main>
    </div>
  );
};
export default DashBoard;

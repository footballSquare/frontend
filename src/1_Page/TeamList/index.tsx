import React from "react";
import TeamListAllSection from "./ui/TeamListAllSection";
import TeamRecruitListSection from "./ui/TeamRecruitListSection";
import TeamCreatePanel from "./ui/TeamCreatePanel";

import { TEAM_TAB } from "./constant/TEAM_TAB";
import TeamBanner from "./ui/TeamSideBanner";

const TeamListPage = () => {
  const [activeTab, setActiveTab] = React.useState(TEAM_TAB.ALL_TEAMS);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* 상단 헤더 - 토스 스타일 */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">팀 둘러보기</h1>
            <TeamCreatePanel />
          </div>
        </div>
      </header>

      <main className="py-6 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lg:hidden flex border-b mb-4">
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === TEAM_TAB.RECRUITING_TEAMS
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(TEAM_TAB.RECRUITING_TEAMS)}>
              모집 중인 팀
            </button>
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === TEAM_TAB.ALL_TEAMS
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(TEAM_TAB.ALL_TEAMS)}>
              전체 팀 목록
            </button>
          </div>

          <div className="lg:flex lg:space-x-6">
            {/* 좌측 배너 섹션 */}
            <div className="hidden lg:block lg:w-1/4 mb-6 lg:mb-0">
              <TeamBanner />
            </div>

            {/* 중앙 - 팀 목록 섹션 */}
            <section
              className={`${
                activeTab === TEAM_TAB.ALL_TEAMS ? "block" : "hidden"
              } lg:block lg:w-3/8`}>
              <TeamListAllSection />
            </section>

            {/* 우측 - 모집 중 팀 섹션 */}
            <section
              className={`${
                activeTab === TEAM_TAB.RECRUITING_TEAMS ? "block" : "hidden"
              } lg:block lg:w-3/8 mt-4 lg:mt-0`}>
              <TeamRecruitListSection />
            </section>
          </div>

          {/* 모바일에서만 보이는 배너 */}
          <div className="lg:hidden mt-8">
            <TeamBanner />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamListPage;

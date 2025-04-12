import React from "react";
import TeamListAllSection from "./ui/TeamListAllSection";
import TeamRecruitListSection from "./ui/TeamRecruitListSection ";

enum TEAEM_TAB {
  ALL_TEAMS = "allTeams",
  RECRUITING_TEAMS = "recruitingTeams",
}

const TeamListPage = () => {
  const [activeTab, setActiveTab] = React.useState<TEAEM_TAB>(
    TEAEM_TAB.ALL_TEAMS
  );

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* 상단 헤더 - 토스 스타일 */}
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">팀 둘러보기</h1>
          </div>
        </div>
      </header>

      <main className="py-6 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mobile Tab Navigation (visible only on mobile) */}
          <div className="sm:hidden flex border-b mb-4">
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === TEAEM_TAB.RECRUITING_TEAMS
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(TEAEM_TAB.RECRUITING_TEAMS)}>
              모집 중인 팀
            </button>
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === TEAEM_TAB.ALL_TEAMS
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab(TEAEM_TAB.ALL_TEAMS)}>
              전체 팀 목록
            </button>
          </div>

          {/* Unified Layout: Both sections are rendered once; visibility on mobile is controlled by Tailwind classes */}
          <div className="sm:flex sm:space-x-6">
            {/* 팀 목록 섹션 */}
            <section
              className={`${
                activeTab === TEAEM_TAB.ALL_TEAMS ? "block" : "hidden"
              } sm:block sm:w-1/2`}>
              <TeamListAllSection />
            </section>

            {/* 모든 팀 섹션 */}
            <section
              className={`${
                activeTab === TEAEM_TAB.RECRUITING_TEAMS ? "block" : "hidden"
              } sm:block sm:w-1/2 mt-4 sm:mt-0`}>
              <TeamRecruitListSection />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamListPage;

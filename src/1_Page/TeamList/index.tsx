import React from "react";
import TeamListAllSection from "./ui/TeamListAllSection";

const TeamListPage = () => {
  const [activeTab, setActiveTab] = React.useState("teamList");

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
                activeTab === "teamList"
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("teamList")}>
              팀 목록
            </button>
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === "allTeams"
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("allTeams")}>
              모든 팀
            </button>
          </div>

          {/* Unified Layout: Both sections are rendered once; visibility on mobile is controlled by Tailwind classes */}
          <div className="sm:flex sm:space-x-6">
            {/* 팀 목록 섹션 */}
            <section
              className={`${
                activeTab === "teamList" ? "block" : "hidden"
              } sm:block sm:w-1/2`}>
              <h2 className="text-lg font-bold mb-3 px-1">팀 목록</h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4">
                  <TeamListAllSection />
                </div>
              </div>
            </section>

            {/* 모든 팀 섹션 */}
            <section
              className={`${
                activeTab === "allTeams" ? "block" : "hidden"
              } sm:block sm:w-1/2 mt-4 sm:mt-0`}>
              <h2 className="text-lg font-bold mb-3 px-1">모든 팀</h2>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4">
                  <p className="text-gray-600">모든 팀 목록 내용</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamListPage;

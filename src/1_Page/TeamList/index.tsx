import React from "react";
import TeamListAllSection from "./ui/TeamListAllSection";
import TeamRecruitListSection from "./ui/TeamRecruitListSection";
import TeamCreatePanel from "./ui/TeamCreatePanel";

import { TEAM_TAB } from "./constant/TEAM_TAB";
import TeamListBannerIcon from "../../4_Shared/assets/svg/team-list-banner.svg";
import infoSvg from "../../4_Shared/assets/svg/info.svg";

const TeamListPage = () => {
  const [activeTab, setActiveTab] = React.useState(TEAM_TAB.ALL_TEAMS);

  return (
    <div className="min-h-screen w-full bg-gray-900">
      {/* 상단 헤더 - 토스 스타일 */}
      <header className="w-full bg-gray-800 shadow-sm border-b border-grass/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-100">팀 둘러보기</h1>
            <TeamCreatePanel />
          </div>
        </div>
      </header>

      <main className="py-6 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="lg:hidden flex border-b border-gray-700 mb-4">
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === TEAM_TAB.RECRUITING_TEAMS
                  ? "border-b-2 border-grass text-grass font-semibold"
                  : "text-gray-300 hover:text-grass transition-colors"
              }`}
              onClick={() => setActiveTab(TEAM_TAB.RECRUITING_TEAMS)}
              role="tab"
              aria-selected={activeTab === TEAM_TAB.RECRUITING_TEAMS}>
              모집 중인 팀
            </button>
            <button
              className={`flex-1 text-center py-2 ${
                activeTab === TEAM_TAB.ALL_TEAMS
                  ? "border-b-2 border-grass text-grass font-semibold"
                  : "text-gray-300 hover:text-grass transition-colors"
              }`}
              onClick={() => setActiveTab(TEAM_TAB.ALL_TEAMS)}
              role="tab"
              aria-selected={activeTab === TEAM_TAB.ALL_TEAMS}>
              전체 팀 목록
            </button>
          </div>

          <div className="lg:flex lg:space-x-6">
            {/* 좌측 배너 섹션 */}
            <div className="hidden lg:block lg:w-1/4 mb-6 lg:mb-0">
              <div className="bg-gray-800 border border-grass/30 rounded-xl shadow-md overflow-hidden">
                <div className="relative bg-gradient-to-br from-grass via-grass/80 to-grass/50 p-6 text-white">
                  <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-2">
                      나에게 맞는 팀을 찾아보세요
                    </h2>
                    <p className="mb-4 text-grass">
                      함께하면 더 즐거운 활동이 기다리고 있어요
                    </p>
                  </div>

                  {/* 배너 SVG 이미지 */}
                  <div className="absolute right-4 bottom-0 w-32 h-32 opacity-10">
                    <img src={TeamListBannerIcon} />
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-100 mb-3">빠른 이동</h3>

                  <div className="space-y-2">
                    <a
                      href="#recent"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-grass/20 group transition-colors">
                      <span className="text-gray-300">최근 생성된 팀</span>
                      <span className="text-gray-400 group-hover:text-grass">
                        ›
                      </span>
                    </a>

                    <a
                      href="#myteam"
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-grass/20 group transition-colors">
                      <span className="text-gray-300">내가 속한 팀</span>
                      <span className="text-gray-400 group-hover:text-grass">
                        ›
                      </span>
                    </a>
                  </div>

                  <div className="mt-6 p-4 bg-gray-700/70 rounded-lg border-l-4 border-grass">
                    <div className="flex items-center mb-2">
                      <img src={infoSvg} />
                      <span className="ml-2 text-sm font-medium text-grass">
                        알고 계셨나요?
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      팀원 모집 상태를 '모집 중'으로 설정하면 더 많은 사람들에게
                      노출됩니다.
                    </p>
                  </div>
                </div>
              </div>
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
        </div>
      </main>
    </div>
  );
};

export default TeamListPage;

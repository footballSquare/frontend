import TeamListAllSection from "./ui/TeamListAllSection";
import TeamRecruitListSection from "./ui/TeamRecruitListSection";
import TeamCreatePanel from "./ui/TeamCreatePanel";
import useActiveTab from "./model/useTab";

const TeamListPage = () => {
  const { activeTab, handleTabClick } = useActiveTab();

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <header className="w-full bg-gray-800 shadow-sm border-b border-grass/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-100">팀 둘러보기</h1>
            <TeamCreatePanel />
          </div>
        </div>
      </header>

      <main className="w-full">
        <div className="border-b border-gray-700">
          <nav
            className="-mb-px flex space-x-8 max-w-4xl mx-auto px-4 sm:px-6"
            aria-label="Tabs">
            <button
              onClick={() => handleTabClick(0)}
              className={`${
                activeTab === 0
                  ? "border-grass text-grass"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              전체 팀
            </button>
            <button
              onClick={() => handleTabClick(1)}
              className={`${
                activeTab === 1
                  ? "border-grass text-grass"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              팀원 모집
            </button>
          </nav>
        </div>

        <div className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {activeTab === 0 && <TeamListAllSection />}
            {activeTab === 1 && <TeamRecruitListSection />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamListPage;

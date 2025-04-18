import useGetTeamInfo from "../../3_Entity/Team/useGetTeamInfo";
import HistoryListBox from "./ui/HistoryListBox";
import TeamMatchBox from "./ui/TeamMatchBox";
import TeamMemberListBox from "./ui/TeamMemberListBox";
import TeamAwards from "./ui/TeamAwards";
import ManageModalBtnPanel from "./ui/ManageModalBtnPanel";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";

import useManageTeamInfo from "./model/useManagePage";

const Team = () => {
  const [teamIdx] = useValidParamInteger("teamIdx");
  const [teamInfo, loading] = useGetTeamInfo(teamIdx);
  const { displayTeamInfo, handlers } = useManageTeamInfo(teamInfo);

  const {
    team_list_banner,
    team_list_emblem,
    team_list_color,
    team_list_name,
    team_list_short_name,
    team_list_announcement,
  } = displayTeamInfo;

  return (
    <main className="flex flex-col w-full sm:w-[90%] max-w-7xl mx-auto text-sm pt-5 px-4 sm:px-0">
      {loading ? (
        <div className="text-center py-10">로딩중...</div>
      ) : (
        <div className="space-y-6">
          {/* 배너 영역 */}
          <section className="relative w-full">
            {team_list_banner ? (
              <img
                className="w-full h-[200px] object-cover rounded-xl shadow-md"
                src={team_list_banner}
                alt="Team Banner"
              />
            ) : (
              <div className="w-full h-[200px] rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-md">
                {team_list_name}
              </div>
            )}
          </section>

          {/* 트로피, 혹은 기타 상훈 정보 */}
          <TeamAwards />

          {/* 본문: 그리드 레이아웃 */}
          <article className="grid grid-cols-1 sm:grid-cols-5 gap-6">
            {/* 왼쪽 섹션: 팀 정보와 역사 */}
            <div className="sm:col-span-2 space-y-6">
              {/* 팀 기본 정보 */}
              <div className="flex flex-col items-center sm:items-start space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 shadow-md bg-gray-100 flex items-center justify-center">
                    {team_list_emblem ? (
                      <img
                        src={team_list_emblem}
                        alt="Team Emblem"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 font-bold text-xl">
                        {team_list_short_name || "팀"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center sm:items-start">
                    <h1
                      className="text-xl font-bold text-center sm:text-left"
                      style={{ color: team_list_color }}>
                      {team_list_name} #{team_list_short_name}
                    </h1>
                    <ManageModalBtnPanel
                      handlers={handlers}
                      teamInfo={displayTeamInfo}
                    />
                  </div>
                </div>

                {/* 팀 연혁 */}
                <div className="w-full">
                  <h2 className="text-base font-semibold mb-2">팀 연혁</h2>
                  <HistoryListBox />
                </div>
              </div>

              {/* 팀 설명 및 팀 현황 */}
              <div className="bg-white ">
                <div className="rounded-lg shadow p-4">
                  <h2 className="text-base font-semibold text-gray-800 mb-2">
                    팀 설명
                  </h2>
                  <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                    {team_list_announcement}
                  </p>
                </div>
                <div className="mt-4">
                  <h2 className="text-base font-semibold text-gray-800 mb-2">
                    팀 현황
                  </h2>
                  <TeamMemberListBox />
                </div>
              </div>
            </div>

            {/* 오른쪽 섹션: 경기 정보 */}
            <div className="sm:col-span-3 space-y-3">
              <h2 className="text-base font-semibold">현재 경기</h2>
              <TeamMatchBox />
            </div>
          </article>
        </div>
      )}
    </main>
  );
};

export default Team;

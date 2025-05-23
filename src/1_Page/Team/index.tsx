import useGetTeamInfo from "../../3_Entity/Team/useGetTeamInfo";
import HistoryListBox from "./ui/HistoryListBox";
import TeamMatchBox from "./ui/TeamMatchBox";
import TeamMemberListBox from "./ui/TeamMemberListBox";
import TeamAwards from "./ui/TeamAwards";
import BtnGroupManageModalPanel from "./ui/BtnGroupManageModalPanel";
import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";

import useManageTeamInfo from "./model/useManagePage";
import { useMyTeamIdx } from "../../4_Shared/lib/useMyInfo";

const Team = () => {
  const [teamIdx] = useValidParamInteger("teamIdx");
  const [myTeamIdx] = useMyTeamIdx();

  // api
  const [teamInfo, loading] = useGetTeamInfo(teamIdx);
  // optimistic state
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
    <main className="bg-gray-900 min-h-screen w-full">
      <div className=" text-white flex flex-col w-full h-auto sm:w-[90%] max-w-7xl mx-auto text-sm pt-5 px-4 sm:px-0">
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
            <article className="grid grid-cols-1 sm:grid-cols-5 gap-6 pb-4">
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
                      <BtnGroupManageModalPanel
                        handlers={handlers}
                        teamInfo={displayTeamInfo}
                      />
                    </div>
                  </div>

                  {/* 팀 연혁 */}

                  <HistoryListBox />
                </div>

                {/* 팀 설명 */}
                <div className="rounded-lg shadow p-4 bg-gray-800">
                  <h2 className="text-base font-semibold  mb-2">팀 설명</h2>
                  <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                    {team_list_announcement}
                  </p>
                </div>

                {/* 팀 멤버 현황 */}
                <TeamMemberListBox />
              </div>

              {/* 오른쪽 섹션: 경기 정보 */}
              <div className="sm:col-span-3 space-y-3">
                <h2 className="text-base font-semibold">현재 경기</h2>
                {teamInfo?.team_list_idx === myTeamIdx ? (
                  <TeamMatchBox />
                ) : (
                  <div>
                    <div className="rounded-lg shadow p-4 bg-gray-800">
                      <h2 className="text-base font-semibold  mb-2">
                        팀 경기 정보
                      </h2>
                      <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                        현재 경기 정보는 팀원만 확인할 수 있습니다.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          </div>
        )}
      </div>
    </main>
  );
};

export default Team;

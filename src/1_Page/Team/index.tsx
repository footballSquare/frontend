import useGetTeamInfo from "../../3_Entity/Team/useGetTeamInfo";
import HistoryListBox from "./ui/HistoryListBox";
import PresentMatchBox from "./ui/PresentMatchBox";
import TeamMemberListBox from "./ui/TeamMemberListBox";
import TeamAwards from "./ui/TeamAwards";
import TeamManageButtonGroupProps from "./ui/TeamManageButtonGroupProps";

import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import ManagePage from "./ui/ManagePage";
import useManagePage from "./model/useManagePage";

const Team = () => {
  const [teamIdx] = useValidParamInteger("teamIdx");
  const [teamInfo, loading] = useGetTeamInfo(teamIdx);
  const [isManagePage, handleTogglePage] = useManagePage();

  const {
    team_list_banner,
    team_list_emblem,
    team_list_color,
    team_list_name,
    team_list_short_name,
    team_list_announcement,
  } = teamInfo;

  return isManagePage ? (
    <ManagePage teamInfo={teamInfo} handleTogglePage={handleTogglePage} />
  ) : (
    <main className="flex flex-col w-[90%] text-sm pt-5">
      {loading ? (
        <div>로딩중</div>
      ) : (
        <div>
          {/* 배너 */}
          <section className="flex justify-center">
            <img
              className="w-full h-[200px] object-cover rounded-lg"
              src={team_list_banner}
              alt="팀 배너"
            />
          </section>

          {/* 트로피 */}
          <TeamAwards teamIdx={teamIdx} />

          {/* 내용 */}
          <article className="flex flex-col gap-5 sm:grid grid-cols-5 w-full ">
            <div className="w-full flex flex-wrap gap-1 sm:col-span-2 ">
              <div className="flex flex-col items-center ">
                <div className="flex items-center ">
                  <img
                    src={team_list_emblem}
                    alt="Team Emblem"
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                  />
                  <section className="flex flex-col items-center min-w-[120px]">
                    <h1
                      className={`text-xl font-bold text-center`}
                      style={{ color: team_list_color }}>
                      {team_list_name} {"#"}
                      {team_list_short_name}
                    </h1>

                    <TeamManageButtonGroupProps
                      handleTogglePage={handleTogglePage}
                      teamInfo={teamInfo}
                    />
                  </section>
                </div>
                <section className="flex flex-col items-start w-full">
                  <h2 className="text-base font-semibold">팀 연혁</h2>
                  <HistoryListBox />
                </section>
              </div>

              <section className="space-y-3 w-full">
                <div className="max-w-[400px]">
                  <h2 className="text-base font-semibold">팀 설명</h2>
                  <p className="text-gray-600 text-xs whitespace-pre-line">
                    {team_list_announcement}
                  </p>
                  <div>
                    <h2 className="text-base font-semibold">팀 현황</h2>
                    <TeamMemberListBox />
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-3 sm:col-span-3">
              <h2 className="text-base font-semibold">현재 경기</h2>
              <PresentMatchBox />
            </div>
          </article>
        </div>
      )}
    </main>
  );
};

export default Team;

import useGetTeamInfo from "../../3_Entity/Team/useGetTeamInfo";
import HistoryListBox from "./ui/HistoryListBox";
import TeamMatchBox from "./ui/TeamMatchBox";
import TeamMemberListBox from "./ui/TeamMemberListBox";
import TeamAwards from "./ui/TeamAwards";
import TeamManageButtonGroupProps from "./ui/TeamManageButtonGroupProps";

import default_banner from "../../4_Shared/assets/img/banner_soccer.jpg";

import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import ManageModal from "./ui/ManageModal";
import useToggleState from "../../4_Shared/model/useToggleState";
import useManageTeamInfo from "./model/useManagePage";

const Team = () => {
  const [teamIdx] = useValidParamInteger("teamIdx");
  const [teamInfo, loading] = useGetTeamInfo(teamIdx);
  const { displayTeamInfo, handlers } = useManageTeamInfo(teamInfo);
  const [isManageModal, handleToggleManageModal] = useToggleState();

  const {
    team_list_banner,
    team_list_emblem,
    team_list_color,
    team_list_name,
    team_list_short_name,
    team_list_announcement,
  } = displayTeamInfo;

  return (
    <main className="flex flex-col w-[90%] text-sm pt-5">
      {loading ? (
        <div>로딩중</div>
      ) : (
        <div>
          {/* 배너 */}
          <section className="flex justify-center">
            {team_list_banner ? (
              <img
                className="w-full h-[200px] object-cover rounded-lg shadow-lg"
                src={team_list_banner}
                alt="Team Banner"
              />
            ) : (
              <div className="w-full h-[200px] rounded-lg bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                {team_list_name}
              </div>
            )}
          </section>

          {/* 트로피 */}
          <TeamAwards />

          {/* 내용 */}
          <article className="flex flex-col gap-5 sm:grid grid-cols-5 w-full ">
            <div className="w-full flex flex-wrap gap-1 sm:col-span-2 ">
              <div className="flex flex-col items-center ">
                <div className="flex items-center ">
                  <img
                    src={team_list_emblem || default_banner}
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
                      handleToggleManageModal={handleToggleManageModal}
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
              <TeamMatchBox />
            </div>
          </article>
        </div>
      )}
      {isManageModal && (
        <ManageModal
          handlers={handlers}
          teamInfo={displayTeamInfo}
          handleToggleManageModal={handleToggleManageModal}
        />
      )}
    </main>
  );
};

export default Team;

import useGetTeamInfo from "../../3_Entity/Team/useGetTeamInfo";
import HistoryListBox from "./ui/HistoryListBox";
import PresentMatchBox from "./ui/PresentMatchBox";
import TeamMemberListBox from "./ui/TeamMemberListBox";
import TeamAwards from "./ui/TeamAwards";
import TeamJoinLeaveButton from "./ui/TeamJoinLeaveButton";

import useValidParamInteger from "../../4_Shared/model/useValidParamInteger";
import ManagePage from "./ui/ManagePage";
import useManagePage from "./useManagePage";

const Team = () => {
  const TEST_ROLE = 0; // 테스트 role  0: 팀장 1: 팀원 2: 그외
  const isTeamPlayer = TEST_ROLE === 0 || TEST_ROLE === 1;
  const isTeamReader = TEST_ROLE === 0;

  const [teamIdx] = useValidParamInteger("teamIdx");
  const [teamInfo, loading] = useGetTeamInfo(teamIdx);
  const [isManagePage, handleTogglePage] = useManagePage();

  if (isManagePage)
    return (
      <ManagePage teamInfo={teamInfo} handleMoveTeamPage={handleTogglePage} />
    );

  return (
    <main className="flex flex-col w-[90%] text-sm pt-5">
      {loading ? (
        <div>로딩중</div>
      ) : (
        <div>
          {/* 배너 */}
          <div className="flex justify-center">
            <img
              className="w-full h-[200px] object-cover rounded-lg"
              src={teamInfo?.team_list_banner}
              alt="팀 배너"
            />
          </div>

          {/* 트로피 */}
          <TeamAwards />

          {/* 내용 */}
          <div className="flex flex-col gap-5 sm:grid grid-cols-5 w-full ">
            <div className="w-full flex flex-wrap gap-1 sm:col-span-2">
              <div className="flex flex-col items-center">
                <div className="flex items-center ">
                  <img
                    src={teamInfo.team_list_emblem}
                    alt="Team Emblem"
                    className="w-16 h-16 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex flex-col items-center min-w-[120px]">
                    <h1
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        textAlign: "center",
                        color: teamInfo.team_list_color,
                      }}>
                      {teamInfo.team_list_name} {"#"}
                      {teamInfo.team_list_short_name}
                    </h1>
                    <TeamJoinLeaveButton
                      handleTogglePage={handleTogglePage}
                      isTeamPlayer={isTeamPlayer}
                      isTeamReader={isTeamReader}
                      teamListIdx={teamInfo.team_list_idx}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start w-full">
                  <h2 className="text-base font-semibold">팀 연혁</h2>
                  <HistoryListBox />
                </div>
              </div>

              <div className="space-y-3">
                <div className="max-w-[200px]">
                  <h2 className="text-base font-semibold">팀 설명</h2>
                  <p className="text-gray-600 text-xs whitespace-pre-line">
                    {teamInfo.team_list_announcement}
                  </p>
                  <div>
                    <h2 className="text-base font-semibold">팀 현황</h2>
                    <TeamMemberListBox />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:col-span-3">
              <h2 className="text-base font-semibold">현재 경기</h2>
              <PresentMatchBox team_list_idx={teamInfo.team_list_idx} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Team;

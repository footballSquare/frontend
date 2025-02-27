import useGetTeamInfo from "../../3_Entity/Team/useGetTeamInfo";
import HistoryListBox from "./ui/HistoryListBox";
import PresentMatchBox from "./ui/PresentMatchBox";
import TeamMemberListBox from "./ui/TeamMemberListBox";
import AwardList from "./ui/AwardList";
import LeaderMatchButton from "./ui/LeaderMatchButton";

const TEST_ROLE = 0; // 테스트 role  0: 팀장 1: 팀원 2: 그외

const Team = () => {
  const isAdmin = TEST_ROLE === 0 || TEST_ROLE === 1;
  const isTeamReader = TEST_ROLE === 0;
  const [teamInfo, loading] = useGetTeamInfo();

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
          <AwardList />

          {/* 내용 */}
          <div className="flex flex-col gap-5 sm:grid grid-cols-5 w-full ">
            <div className="w-full flex flex-wrap gap-1 sm:col-span-2">
              <div className="flex flex-col items-center">
                <div className="flex flex-row">
                  <img
                    src="URL"
                    className="w-16 h-16 rounded-full"
                    alt="팀 엠블럼"
                  />
                  <div className="flex flex-col items-start min-w-[100px]">
                    <h1 className="text-xl font-bold">
                      {teamInfo?.team_list_name}
                    </h1>
                    <div className="flex flex-col items-start gap-2">
                      <button
                        className={`${
                          isAdmin ? "bg-red-500" : "bg-blue-500"
                        } text-white text-sm font-medium py-1 px-3 rounded-full`}>
                        {isAdmin ? "팀 탈퇴" : "팀 가입"}
                      </button>
                      {isTeamReader && (
                        <LeaderMatchButton
                          team_list_idx={teamInfo.team_list_idx}
                        />
                      )}
                    </div>
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
              <PresentMatchBox />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Team;

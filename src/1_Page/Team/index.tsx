import useGetTeamInfo from "../../3_Entity/Team/useGetTeamInfo";
import Button from "../../4_Shared/components/Button";
import HistoryListBox from "./ui/HistoryListBox";
import PresentMatchBox from "./ui/PresentMatchBox";
import TeamMemberListBox from "./ui/TeamMemberListBox";
import AwardList from "./ui/AwardList";
import { useCallback } from "react";

const Team = () => {
  const role = "팀장";
  const handleButtonClick = useCallback(() => {
    alert(
      role === "팀장"
        ? "팀 관리페이지 이동"
        : role === "팀원"
        ? "팀 탈퇴 되었습니다"
        : "팀 가입 신청 되었습니다"
    );
  }, [role]);
  const [teamInfo] = useGetTeamInfo();
  return (
    <main className="flex flex-col w-[90%] text-sm pt-5">
      {/* 배너 */}
      <div className="flex justify-center">
        <img className="w-[100%] h-[200px]" src={teamInfo?.team_list_banner} />
      </div>
      {/* 트로피 */}
      <AwardList />
      {/* 내용  */}
      <div className="grid grid-cols-5 w-full">
        <div className="col-span-2 flex flex-row flex-wrap gap-1">
          <div className="flex flex-col items-center ">
            <div className="flex flex-row">
              <img
                src="URL"
                alt="Team Logo"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-xl font-bold">
                  {teamInfo?.team_list_name}
                </h1>
                <Button
                  onClickHandler={handleButtonClick}
                  text={
                    role === "팀장"
                      ? "팀 관리"
                      : role === "팀원"
                      ? "팀 탈퇴"
                      : "팀 가입"
                  }
                />
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <h2 className="text-base font-semibold">팀 연혁</h2>
              <HistoryListBox />
            </div>
          </div>
          <div className="col-span-1 space-y-3">
            <div className="max-w-[200px]">
              <h2 className="text-base font-semibold">팀 설명</h2>
              <p className="text-gray-600 text-xs whitespace-pre-line">
                {teamInfo?.team_list_announcement}
              </p>
              <div>
                <h2 className="text-base font-semibold ">팀 현황</h2>
                <TeamMemberListBox />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 space-y-3">
          <h2 className="text-base font-semibold">현재 경기</h2>
          <PresentMatchBox />
        </div>
      </div>
    </main>
  );
};

export default Team;

import { TeamManageButtonGroupProps } from "./type";
import useManageAction from "./model/useManageAction";

import useDeleteLeaveTeam from "../../../../3_Entity/Team/useDeleteLeaveTeam";
import usePutSignTeam from "../../../../3_Entity/Team/usePutSignTeam";
import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeTeamMatchModal";

const TeamManageButtonGroup = (props: TeamManageButtonGroupProps) => {
  const { isTeamReader, isTeamPlayer, teamListIdx, handleTogglePage } = props;

  const [deleteLeaveTeam] = useDeleteLeaveTeam(teamListIdx);
  const [putSignTeam] = usePutSignTeam(teamListIdx);

  const { setToggleModal } = useMakeTeamMatchModalStore(); // 팀매치 생성 모달 전역으로 관리

  const {
    isLeaving,
    isPending,
    confirmAction,
    updateToLeave,
    updateToSignPending,
  } = useManageAction(isTeamPlayer);

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <div>
        {isPending ? (
          <button className="bg-black text-white text-sm font-medium py-1 px-3 rounded-full transition-all duration-300">
            가입신청중
          </button>
        ) : isLeaving ? (
          <button
            className="bg-red-500 text-white text-sm font-medium py-1 px-3 rounded-full transition-all duration-300"
            onClick={() => {
              if (confirmAction()) {
                updateToLeave();
                deleteLeaveTeam();
              }
            }}>
            팀 탈퇴
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px- rounded-full transition-all duration-300"
            onClick={() => {
              if (confirmAction()) {
                updateToSignPending();
                putSignTeam();
              }
            }}>
            팀 가입
          </button>
        )}
      </div>

      {/* 팀 리더일 경우에만 팀 관리 및 매치 생성 버튼 */}
      {isTeamReader && isLeaving && !isPending && (
        <div className="flex gap-2 mt-2">
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
            onClick={handleTogglePage}>
            팀관리
          </button>
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
            onClick={setToggleModal}>
            매치 생성
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamManageButtonGroup;

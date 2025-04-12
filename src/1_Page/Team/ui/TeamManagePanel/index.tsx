import useManageAction from "./model/useManageAction";

import useDeleteLeaveTeam from "../../../../3_Entity/Team/useDeleteLeaveTeam";
import usePutSignTeam from "../../../../3_Entity/Team/usePutSignTeam";
import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeMatchModalStore";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import {
  useMyTeamIdx,
  useMyTeamRoleIdx,
} from "../../../../4_Shared/lib/useMyInfo";
import useManageServerState from "./model/useManageServerState";
import useToggleState from "../../../../4_Shared/model/useToggleState";
import ManageModal from "./ui/ManageModal";

const TeamManageButtonGroup = (props: TeamManageButtonGroupProps) => {
  const { teamInfo, handlers } = props;
  const teamIdx = useParamInteger("teamIdx");
  const [deleteLeaveTeam, serverState] = useDeleteLeaveTeam(teamIdx);
  useManageServerState(serverState); // deleteLeaveTeam 서버 상태 관리

  const [isModalOpen, handleToggleManageModal] = useToggleState();
  const [putSignTeam] = usePutSignTeam(teamIdx);

  // 팀 권한과
  const [myTeamIDx] = useMyTeamIdx();
  const [myTeamRoleIdx] = useMyTeamRoleIdx();
  const isTeamPlayer = myTeamIDx === teamIdx;
  const isTeamReader =
    isTeamPlayer && (myTeamRoleIdx === 0 || myTeamRoleIdx == 1);

  // 팀 가입 신청 상태
  const {
    isLeaving,
    isPending,
    confirmAction,
    updateToLeave,
    updateToSignPending,
  } = useManageAction(isTeamPlayer);

  // 팀매치 생성 모달 전역으로 관리
  const { toggleMakeMatchModal } = useMakeTeamMatchModalStore(); // 팀매치 생성 모달 전역으로 관리

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
            onClick={handleToggleManageModal}>
            팀관리
          </button>
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
            onClick={toggleMakeMatchModal}>
            매치 생성
          </button>
        </div>
      )}

      {isModalOpen && (
        <ManageModal
          handleToggleManageModal={handleToggleManageModal}
          teamInfo={teamInfo}
          handlers={handlers}
        />
      )}
    </div>
  );
};

export default TeamManageButtonGroup;

import useManageAction from "./model/useManageAction";

import useDeleteLeaveTeam from "../../../../3_Entity/Team/useDeleteLeaveTeam";
import usePutSignTeam from "../../../../3_Entity/Team/usePutSignTeam";
import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeMatchModalStore";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import {
  useIsLogin,
  useMyTeamIdx,
  useMyTeamRoleIdx,
} from "../../../../4_Shared/lib/useMyInfo";
import useManageDeleteServerState from "./model/useManageDeleteServerState";
import useToggleState from "../../../../4_Shared/model/useToggleState";
import ManageModal from "./ui/ManageModal";
import useManagePutServerState from "./model/useManagePutServerState";
import { useNavigate } from "react-router-dom";

const BtnGroupManageModalPanel = (props: BtnGroupManageModalPanelProps) => {
  const { teamInfo, handlers } = props;
  const naviagate = useNavigate();

  const teamIdx = useParamInteger("teamIdx");

  const [isModalOpen, handleToggleManageModal] = useToggleState();
  const [isLogin] = useIsLogin();

  // 팀 권한과
  const [myTeamIDx] = useMyTeamIdx();
  const [myTeamRoleIdx] = useMyTeamRoleIdx();
  const isTeamPlayer = myTeamIDx === teamIdx;
  const isTeamTopLeader = isTeamPlayer && myTeamRoleIdx === 0; // 팀장만 허용
  const isTeamLeaders = isTeamTopLeader || myTeamRoleIdx === 1;

  // 팀 가입 신청 상태
  const {
    isLeaving,
    isPending,
    updateToLeave,
    updateToSignPending,
    cancelUpdateToLeave,
    cancelUpdateToSignPending,
  } = useManageAction(isTeamPlayer);

  const [deleteLeaveTeam, deleteServerState] = useDeleteLeaveTeam(teamIdx);
  const [putSignTeam, putServerState] = usePutSignTeam(teamIdx);
  useManageDeleteServerState({ deleteServerState, cancelUpdateToLeave }); // deleteLeaveTeam 서버 상태 관리
  useManagePutServerState({ putServerState, cancelUpdateToSignPending }); // deleteLeaveTeam 서버 상태 관리

  // 팀매치 생성 모달 전역으로 관리
  const { toggleMakeMatchModal } = useMakeTeamMatchModalStore(); // 팀매치 생성 모달 전역으로 관리

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <div>
        {!isTeamTopLeader && isPending ? (
          <button className="bg-black hover:bg-black/80 text-white text-sm font-medium py-2 px-4 rounded-full shadow transition transform hover:scale-105 duration-300">
            가입신청중
          </button>
        ) : isLeaving ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-full shadow transition transform hover:scale-105 duration-300"
            onClick={() => {
              if (!isLogin) {
                alert("로그인 후 이용해주세요.");
                naviagate("/login");
                return;
              }
              const confirmResult = !confirm(
                `정말로 팀을 ${isLeaving ? "탈퇴" : "가입"}하시겠습니까?`
              );
              if (!confirmResult) {
                return;
              }
              deleteLeaveTeam();
              updateToLeave();
            }}>
            팀 탈퇴
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-full shadow transition transform hover:scale-105 duration-300"
            onClick={() => {
              if (!isLogin) {
                alert("로그인 후 이용해주세요.");
                naviagate("/login");
                return;
              }
              const confirmResult = !confirm(
                `정말로 팀을 ${isLeaving ? "탈퇴" : "가입"}하시겠습니까?`
              );
              if (!confirmResult) {
                return;
              }
              putSignTeam();
              updateToSignPending();
            }}>
            팀 가입
          </button>
        )}
      </div>

      {/* 팀 리더일 경우에만 팀 관리 및 매치 생성 버튼 */}
      {isTeamTopLeader && isLeaving && (
        <button
          className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
          onClick={handleToggleManageModal}>
          팀관리
        </button>
      )}

      {/* 부팀장 또는 팀장의 경우만*/}
      {isTeamLeaders && isLeaving && !isPending && (
        <button
          className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
          onClick={toggleMakeMatchModal}>
          매치 생성
        </button>
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

export default BtnGroupManageModalPanel;

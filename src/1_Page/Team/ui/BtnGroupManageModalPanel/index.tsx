import useManageAction from "./model/useManageAction";
import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeMatchModalStore";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import {
  useIsLogin,
  useMyTeamIdx,
  useMyTeamRoleIdx,
} from "../../../../4_Shared/lib/useMyInfo";
import useDeleteLeaveTeamHandler from "./model/useDeleteLeaveTeamHandler";
import useToggleState from "../../../../4_Shared/model/useToggleState";
import ManageModal from "./ui/ManageModal";
import usePutSignTeamHandler from "./model/usePutSignTeamHandler";
import { useNavigate } from "react-router-dom";

import exitIcon from "../../../../4_Shared/assets/svg/exit.svg";
import joinIcon from "../../../../4_Shared/assets/svg/join.svg";
import settingIcon from "../../../../4_Shared/assets/svg/setting.svg";
import plusIcon from "../../../../4_Shared/assets/svg/plus.svg";

const BtnGroupManageModalPanel = (props: BtnGroupManageModalPanelProps) => {
  const { teamInfo, handlers } = props;
  const naviagate = useNavigate();

  const teamIdx = useParamInteger("teamIdx");

  const [isModalOpen, handleToggleManageModal] = useToggleState();
  const [isLogin] = useIsLogin();

  // 팀 권한과
  const [myTeamIdx] = useMyTeamIdx();
  const [myTeamRoleIdx] = useMyTeamRoleIdx();

  const isTeamPlayer = myTeamIdx === teamIdx;
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

  // api
  const [handleDeleteLeaveTeam] =
    useDeleteLeaveTeamHandler(cancelUpdateToLeave);
  const [handlePutSignTeam] = usePutSignTeamHandler(cancelUpdateToSignPending);

  // 팀매치 생성 모달 전역으로 관리
  const { toggleMakeMatchModal } = useMakeTeamMatchModalStore(); // 팀매치 생성 모달 전역으로 관리

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <div className="w-full max-w-xs">
        {!isTeamTopLeader && isPending ? (
          <button className="w-full bg-gray-700 text-gray-300 text-sm font-medium py-2.5 px-6 rounded-lg shadow-lg border border-gray-600 flex items-center justify-center gap-2 cursor-not-allowed">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            가입신청중
          </button>
        ) : isLeaving ? (
          <button
            className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-800 hover:to-red-700 text-white text-sm font-medium py-2.5 px-6 rounded-lg shadow-lg transition transform hover:translate-y-px duration-200 flex items-center justify-center"
            onClick={() => {
              if (confirm(`정말로 팀을 탈퇴 하시겠습니까?`)) {
                handleDeleteLeaveTeam();
                updateToLeave();
              }
            }}>
            <img src={exitIcon} alt="팀 탈퇴" className="h-4 w-4 mr-2" />팀 탈퇴
          </button>
        ) : (
          <button
            className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white text-sm font-medium py-2.5 px-6 rounded-lg shadow-lg transition transform hover:translate-y-px duration-200 flex items-center justify-center"
            onClick={() => {
              if (!isLogin) {
                alert("로그인 후 이용해주세요.");
                naviagate("/login");
                return;
              }
              if (confirm(`정말로 팀을 가입 하시겠습니까?`)) {
                handlePutSignTeam();
                updateToSignPending();
              }
            }}>
            <img src={joinIcon} alt="팀 가입" className="h-4 w-4 mr-2" />팀 가입
          </button>
        )}
      </div>

      {/* 팀 리더 및 매치 생성 버튼 그룹 */}
      <div className="flex gap-3">
        {/* 팀 리더일 경우에만 팀 관리 버튼 */}
        {isTeamTopLeader && isLeaving && (
          <button
            className="bg-gray-800 hover:bg-gray-700 text-gray-200 text-sm font-medium py-2 px-4 rounded-lg border border-gray-700 shadow-md transition flex items-center"
            onClick={handleToggleManageModal}>
            <img src={settingIcon} alt="팀 관리" className="h-4 w-4 mr-1.5" />
            팀관리
          </button>
        )}

        {/* 부팀장 또는 팀장의 경우만*/}
        {isTeamLeaders && isLeaving && !isPending && (
          <button
            className="bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition flex items-center"
            onClick={toggleMakeMatchModal}>
            <img src={plusIcon} alt="매치 생성" className="h-4 w-4 mr-1.5" />
            매치 생성
          </button>
        )}
      </div>

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

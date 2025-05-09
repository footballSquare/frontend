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
  const [deleteLeaveTeam, deleteServerState] = useDeleteLeaveTeam(teamIdx);
  const [putSignTeam, putServerState] = usePutSignTeam(teamIdx);

  // manage server state
  useManageDeleteServerState({ deleteServerState, cancelUpdateToLeave });
  useManagePutServerState({ putServerState, cancelUpdateToSignPending });

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
                deleteLeaveTeam();
                updateToLeave();
              }
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            팀 탈퇴
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
                putSignTeam();
                updateToSignPending();
              }
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            팀 가입
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            팀관리
          </button>
        )}

        {/* 부팀장 또는 팀장의 경우만*/}
        {isTeamLeaders && isLeaving && !isPending && (
          <button
            className="bg-indigo-700 hover:bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition flex items-center"
            onClick={toggleMakeMatchModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
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

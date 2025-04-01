import { TeamManageButtonGroupProps } from "./type";
import useManageAction from "./model/useManageAction";

import useDeleteLeaveTeam from "../../../../3_Entity/Team/useDeleteLeaveTeam";
import usePutSignTeam from "../../../../3_Entity/Team/usePutSignTeam";
import useMakeTeamMatchModalStore from "../../../../4_Shared/zustand/useMakeMatchModalStore";
import useDisplayMatchInfoStore from "../../../../4_Shared/zustand/useDisplayMatchInfoStore";
import { useCookies } from "react-cookie";
import useParamInteger from "../../../../4_Shared/model/useParamInteger";
import React from "react";

const TeamManageButtonGroup = (props: TeamManageButtonGroupProps) => {
  const { handleTogglePage } = props;

  const teamIdx = useParamInteger("teamIdx");

  const [deleteLeaveTeam] = useDeleteLeaveTeam(teamIdx);
  const [putSignTeam] = usePutSignTeam(teamIdx);

  // 팀 권한과 가입여부
  const [cookies] = useCookies(["team_role_idx", "team_idx"]);
  const teamRoleIdx = cookies.team_role_idx;
  const isTeamPlayer = cookies.team_idx !== teamIdx;
  const isTeamReader = cookies.team_idx === teamIdx && teamRoleIdx === 0;
  const {
    isLeaving,
    isPending,
    confirmAction,
    updateToLeave,
    updateToSignPending,
  } = useManageAction(isTeamPlayer);

  // 팀매치 생성 모달 전역으로 관리
  const { openTeamMatch } = useMakeTeamMatchModalStore(); // 팀매치 생성 모달 전역으로 관리

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
      {!isTeamReader && isLeaving && !isPending && (
        <div className="flex gap-2 mt-2">
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
            onClick={handleTogglePage}>
            팀관리
          </button>
          <button
            className="bg-blue-500 text-white text-sm font-medium py-1 px-3 rounded-full"
            onClick={() => {
              openTeamMatch(teamIdx);
            }}>
            매치 생성
          </button>
        </div>
      )}
    </div>
  );
};

export default TeamManageButtonGroup;

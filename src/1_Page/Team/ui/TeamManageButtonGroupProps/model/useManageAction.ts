import React from "react";
import { RESULT_STATE } from "../../../../../4_Shared/constant/result";

const useManageAction = (
  isTeamPlayer: boolean
): {
  isLeaving: boolean;
  isPending: boolean;
  confirmAction: () => boolean;
  updateToLeave: () => void;
  updateToSignPending: () => void;
} => {
  const [isTeamMember, setIsTeamMember] = React.useState<ResultStateType>(
    isTeamPlayer
      ? (RESULT_STATE.AVAILABLE as ResultStateType)
      : (RESULT_STATE.UNAVAILABLE as ResultStateType)
  );

  const isPending = isTeamMember === RESULT_STATE.PENDING;
  const isLeaving = isTeamMember === RESULT_STATE.AVAILABLE;

  const confirmAction = (): boolean => {
    const action = isLeaving ? "탈퇴" : "가입";
    return confirm(`정말로 팀을 ${action}하시겠습니까?`);
  };

  const updateToLeave = () => {
    setIsTeamMember(RESULT_STATE.UNAVAILABLE as ResultStateType);
  };

  const updateToSignPending = () => {
    setIsTeamMember(RESULT_STATE.PENDING as ResultStateType);
  };

  return {
    isLeaving,
    isPending,
    confirmAction,
    updateToLeave,
    updateToSignPending,
  };
};

export default useManageAction;

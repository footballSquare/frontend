import React from "react";
import { RESULT_STATE } from "../../../../../4_Shared/constant/result";

const useManageAction = (isTeamPlayer: boolean): UseManageActionReturn => {
  const [isTeamMember, setIsTeamMember] = React.useState<ResultStateType>(
    isTeamPlayer
      ? (RESULT_STATE.AVAILABLE as ResultStateType)
      : (RESULT_STATE.UNAVAILABLE as ResultStateType)
  );

  const isPending = isTeamMember === RESULT_STATE.PENDING;
  const isLeaving = isTeamMember === RESULT_STATE.AVAILABLE;

  const updateToLeave = () => {
    setIsTeamMember(RESULT_STATE.UNAVAILABLE as ResultStateType);
  };

  const cancelUpdateToLeave = () => {
    setIsTeamMember(RESULT_STATE.AVAILABLE as ResultStateType);
  };

  const updateToSignPending = () => {
    setIsTeamMember(RESULT_STATE.PENDING as ResultStateType);
  };

  const cancelUpdateToSignPending = () => {
    setIsTeamMember(RESULT_STATE.UNAVAILABLE as ResultStateType);
  };

  return {
    isLeaving,
    isPending,
    updateToLeave,
    updateToSignPending,
    cancelUpdateToLeave,
    cancelUpdateToSignPending,
  };
};

export default useManageAction;

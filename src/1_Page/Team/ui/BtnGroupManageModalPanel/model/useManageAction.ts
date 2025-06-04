import React from "react";
import { RESULT_STATE } from "../../../../../4_Shared/constant/result";

const useManageAction = (isTeamPlayer: boolean): UseManageActionReturn => {
  const [teamMembershipStatus, setTeamMembershipStatus] =
    React.useState<ResultStateType>(
      RESULT_STATE.UNAVAILABLE as ResultStateType
    );

  React.useEffect(() => {
    if (isTeamPlayer) {
      setTeamMembershipStatus(RESULT_STATE.AVAILABLE as ResultStateType);
    } else {
      setTeamMembershipStatus(RESULT_STATE.UNAVAILABLE as ResultStateType);
    }
  }, [isTeamPlayer]);

  const isJoinRequestPending = teamMembershipStatus === RESULT_STATE.PENDING;
  const isCurrentTeamMember = teamMembershipStatus === RESULT_STATE.AVAILABLE;

  const updateToLeave = () => {
    setTeamMembershipStatus(RESULT_STATE.UNAVAILABLE as ResultStateType);
  };

  const cancelUpdateToLeave = () => {
    setTeamMembershipStatus(RESULT_STATE.AVAILABLE as ResultStateType);
  };

  const updateToSignPending = () => {
    setTeamMembershipStatus(RESULT_STATE.PENDING as ResultStateType);
  };

  const cancelUpdateToSignPending = () => {
    setTeamMembershipStatus(RESULT_STATE.UNAVAILABLE as ResultStateType);
  };

  return {
    isJoinRequestPending,
    isCurrentTeamMember,
    updateToLeave,
    updateToSignPending,
    cancelUpdateToLeave,
    cancelUpdateToSignPending,
  };
};

export default useManageAction;

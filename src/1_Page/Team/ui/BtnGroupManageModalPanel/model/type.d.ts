type ResultStateType = "AVAILABLE" | "UNAVAILABLE" | "PENDING";

type UseManageDeleteServerStateProps = {
  deleteServerState: Record<string, unknown> | null;
  cancelUpdateToLeave: () => void;
};

type UseManagePutServerStateProps = {
  putServerState: Record<string, unknown> | null;
  cancelUpdateToSignPending: () => void;
};

type UseJoinActionReturn = {
  isTeamCaptain: boolean;
  isTeamSubLeader: boolean;
  isJoinRequestPending: boolean;
  isCurrentTeamMember: boolean;
  setMembershipToAvailable: () => void;
  setMembershipToPending: () => void;
  setMembershipToUnavailable: () => void;
};

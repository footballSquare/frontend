type ResultStateType = "AVAILABLE" | "UNAVAILABLE" | "PENDING";

type UseManageDeleteServerStateProps = {
  deleteServerState: Record<string, unknown> | null;
  deleteLeaveTeam: () => void;
};

type UseManagePutServerStateProps = {
  putServerState: Record<string, unknown> | null;
  updateToSignPending: () => void;
};

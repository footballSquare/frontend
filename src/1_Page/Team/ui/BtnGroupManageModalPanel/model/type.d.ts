type ResultStateType = "AVAILABLE" | "UNAVAILABLE" | "PENDING";

type UseManageDeleteServerStateProps = {
  deleteServerState: Record<string, unknown> | null;
  cancelUpdateToLeave: () => void;
};

type UseManagePutServerStateProps = {
  putServerState: Record<string, unknown> | null;
  cancelUpdateToSignPending: () => void;
};

type UseManageActionReturn = {
  isLeaving: boolean;
  isPending: boolean;
  updateToLeave: () => void;
  updateToSignPending: () => void;
  cancelUpdateToLeave: () => void;
  cancelUpdateToSignPending: () => void;
};

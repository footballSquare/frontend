type UseManageServerStateProps = {
  serverState: Record<string, unknown> | null;
  insertPostData: (data: MatchInfo) => void;
  toggleMakeMatchModal: () => void;
};

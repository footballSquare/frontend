type UseManageServerStateProps = {
  serverState: Record<string, unknown> | null;
  reset: UseFormReset<UserInfoForm>;
};

type UseManageServerStateReturn = {
  modifyMode: boolean;
  inputBackupDataRef: MutableRefObject<UserInfoForm>;
  handleModifyFalse: () => void;
  handleModifyTrue: () => void;
};

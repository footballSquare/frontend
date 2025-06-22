type UseProfileDashBoardHookformReturn = {
  form: UseFormReturn<UserInfoForm>;
  isModifyMode: boolean;
  inputBackupDataRef: React.MutableRefObject<UserInfoForm>;
  handleEdit: () => void;
  handleCancel: () => void;
  toggleIsModifyMode: () => void;
  handleImageChange: (file: File | null) => void;
};

type UsePutUserInfoHandlerProps = {
  reset: (data: UserInfoForm) => void;
  inputBackupDataRef: React.MutableRefObject<UserInfoForm>;
  isDirty?: boolean;
  toggleIsModifyMode?: () => void;
};

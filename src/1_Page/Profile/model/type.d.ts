type UseProfileDashBoardHookformReturn = {
  form: UseFormReturn<UserInfoForm>;
  inputBackupDataRef: React.MutableRefObject<UserInfoForm>;
  handleEdit: () => void;
  handleCancel: () => void;
  handleImageChange: (file: File | null) => void;
};

type UsePutUserInfoHandlerProps = {
  reset: (data: UserInfoForm) => void;
  inputBackupDataRef: React.MutableRefObject<UserInfoForm>;
  isDirty?: boolean;
  toggleIsModifyMode?: () => void;
};

type UseProfileDashBoardHookformProps = {
  userInfo: UserInfoForm;
  toggleIsModifyMode: () => void;
};

import usePutUserInfo from "../../../3_Entity/Account/usePutUserInfo";

const usePutUserInfoHandler = (
  props: UsePutUserInfoHandlerProps
): [(data: UserInfoForm) => void] => {
  const { reset, inputBackupDataRef, isDirty, toggleIsModifyMode } = props;

  const [putUserInfo] = usePutUserInfo();

  const handlePutUserInfo = async (formData: UserInfoForm) => {
    toggleIsModifyMode?.();
    if (!isDirty) {
      return;
    }
    const result = await putUserInfo(formData);
    if (result === 200) {
      inputBackupDataRef.current = formData;
    } else {
      reset(inputBackupDataRef.current);
      alert("변경 실패했습니다");
    }
  };

  return [handlePutUserInfo];
};
export default usePutUserInfoHandler;

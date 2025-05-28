import usePutUserInfo from "../../../../../3_Entity/Account/usePutUserInfo";

const usePutUserInfoHandler = (
  props: UseManageServerStateProps
): [(data: UserInfoForm) => void] => {
  const { reset, inputBackupDataRef } = props;

  const [putUserInfo] = usePutUserInfo();

  const handlePutUserInfo = async (formData: UserInfoForm) => {
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

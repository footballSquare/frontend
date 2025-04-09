import React from "react";

const useManageModifyAndServerState = (
  props: UseManageServerStateProps
): UseManageServerStateReturn => {
  const { serverState, reset } = props;
  const inputBackupDataRef = React.useRef<UserInfoForm>({} as UserInfoForm);
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  const handleCancle = () => {
    reset(inputBackupDataRef.current);
    setModifyMode(false);
  };
  const handleModifyFalse = () => {
    setModifyMode(false);
  };
  const handleModifyTrue = () => {
    setModifyMode(true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        break;
      default:
        handleCancle();
        alert("변경 실패했습니다");
        break;
    }
  }, [serverState]);

  return {
    inputBackupDataRef,
    modifyMode,
    handleModifyFalse,
    handleModifyTrue,
  };
};
export default useManageModifyAndServerState;

import React from "react";
import usePutUserInfo from "../../../../../3_Entity/Account/usePutUserInfo";

const usePutUserInfoHandler = (
  props: UseManageServerStateProps
): [(data: UserInfoForm) => void] => {
  const { reset, inputBackupDataRef } = props;

  const [putUserInfo, serverState] = usePutUserInfo();

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        break;
      default:
        reset(inputBackupDataRef.current);
        alert("변경 실패했습니다");
        break;
    }
  }, [serverState]);

  return [putUserInfo];
};
export default usePutUserInfoHandler;

import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutUserInfo = (): [
  postEvent: (userInfo: UsePutUserInfoProps) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putUserInfo = (userInfo: UsePutUserInfoProps) => {
    const endPoint = "/account/user/update";
    request("PUT", endPoint, userInfo, true);
  };

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case "200":
        alert("변경 되었습니다");
        break;
      default:
        alert("변경 실패했습니다");
        window.location.reload();
        break;
    }
  }, [serverState]);

  return [putUserInfo, serverState, loading];
};

export default usePutUserInfo;

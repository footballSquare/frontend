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
      case "403":
    }
  }, [serverState]);

  return [putUserInfo, serverState, loading];
};

export default usePutUserInfo;

import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const usePutUserInfo = (
  userIdx: number
): [
  postEvent: (userInfo: PutUserInfoProps) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const putUserInfo = (userInfo: PutUserInfoProps) => {
    request({ userIdx, userInfo });
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

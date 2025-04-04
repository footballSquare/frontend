import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";

const useGetUserInfo = (userIdx: number): [UserInfo, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [userInfo, setUserInfo] = React.useState<UserInfo>({} as UserInfo);

  React.useEffect(() => {
    const endPoint = `/account/info/${userIdx}`;
    request("GET", endPoint, null, true);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "user" in serverState) {
      setUserInfo((serverState as { user: UserInfo }).user);
    }
  }, [loading, serverState]);

  return [userInfo, loading];
};

export default useGetUserInfo;

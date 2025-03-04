import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil.ts";
import { mockUserInfo } from "../../4_Shared/mock/userInfo.ts";
import { UserInfo } from "./type.ts";

const useGetUserInfo = (userIdx: string | undefined): [UserInfo, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [userInfo, setUserInfo] = React.useState<UserInfo>({} as UserInfo);

  React.useEffect(() => {
    console.log(userIdx);
    request(mockUserInfo);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "user" in serverState) {
      setUserInfo((serverState as { user: UserInfo }).user);
    }
  }, [loading, serverState]);

  return [userInfo, loading];
};

export default useGetUserInfo;

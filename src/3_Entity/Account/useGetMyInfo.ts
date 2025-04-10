import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";
import { useIsLogin } from "../../4_Shared/lib/useMyInfo.ts";

const useGetMyInfo = (): [MyInfo, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [myInfo, setMyInfo] = React.useState<MyInfo>({} as MyInfo);
  const [isLogin] = useIsLogin();

  React.useEffect(() => {
    if (isLogin) {
      request("GET", `/account/myinfo/`, null, true);
    }
  }, [request, isLogin]);

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          if ("data" in serverState) {
            setMyInfo((serverState as { data: MyInfo }).data);
          }
          break;
      }
      setMyInfo((serverState as { data: MyInfo }).data);
    }
  }, [loading, serverState]);

  return [myInfo, loading];
};

export default useGetMyInfo;

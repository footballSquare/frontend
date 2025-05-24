import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";
import { useNavigate } from "react-router-dom";

const useGetUserInfo = (userIdx: number): [UserInfo, boolean] => {
  const [serverState, request, loading] = useFetchData();
  const [userInfo, setUserInfo] = React.useState<UserInfo>({} as UserInfo);
  const navigate = useNavigate();

  React.useEffect(() => {
    const endPoint = `/account/info/${userIdx}`;
    request("GET", endPoint, null, true);
  }, [userIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          if ("data" in serverState) {
            setUserInfo((serverState as { data: UserInfo }).data);
          }
          break;
        case 404:
          navigate("/404");
          break;
      }
      setUserInfo((serverState as { data: UserInfo }).data);
    }
  }, [loading, serverState, navigate]);

  return [userInfo, loading];
};

export default useGetUserInfo;

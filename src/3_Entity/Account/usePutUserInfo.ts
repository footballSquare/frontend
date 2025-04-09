import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutUserInfo = (): [
  putUserInfo: (userInfo: UsePutUserInfoProps) => void,
  Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putUserInfo = (userInfo: UsePutUserInfoProps) => {
    const endPoint = "/account/user/update";
    request("PUT", endPoint, userInfo, true);
  };

  return [putUserInfo, serverState, loading];
};

export default usePutUserInfo;

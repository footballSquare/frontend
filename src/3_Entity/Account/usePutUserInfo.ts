import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutUserInfo = (): [
  putUserInfo: (userInfo: UsePutUserInfoProps) => Promise<number | undefined>,
  Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putUserInfo = async (userInfo: UsePutUserInfoProps) => {
    const endPoint = "/account/user/update";
    return await request("PUT", endPoint, userInfo, true);
  };

  return [putUserInfo, serverState, loading];
};

export default usePutUserInfo;

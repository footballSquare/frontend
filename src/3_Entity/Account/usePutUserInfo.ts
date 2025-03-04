import { useFetch } from "../../4_Shared/util/apiUtil";
import { UserInfoPost } from "./type";

const usePutUserInfo = ({
  userIdx,
}: {
  userIdx: number;
  onFail?: () => void;
}): [
  postEvent: (userInfo: UserInfoPost) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postEvent = (userInfo: UserInfoPost) => {
    request({ userIdx, userInfo });
    console.log("전송된 데이터:", userInfo);
  };

  // React.useEffect(() => {
  //   if (!serverState) return;
  //   switch (serverState.) {
  //     case "403":
  //       onFail();
  //   }
  // }, [serverState]);

  return [postEvent, serverState, loading];
};

export default usePutUserInfo;

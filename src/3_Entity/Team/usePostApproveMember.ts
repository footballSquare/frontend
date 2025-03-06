import { useFetch } from "../../4_Shared/util/apiUtil";
const usePostApproveMember = (): [
  postEvent: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postEvent = (userIdx: number) => {
    request({ userIdx });
    console.log("확인 요청:", userIdx);
  };

  return [postEvent, serverState, loading];
};

export default usePostApproveMember;

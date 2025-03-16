import { useFetch } from "../../4_Shared/util/apiUtil";
const usePostApproveMember = (
  teamListIdx: number
): [
  postApproveMember: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postApproveMember = (userIdx: number) => {
    request({ userIdx });
    console.log("확인 요청:", teamListIdx, userIdx);
  };

  return [postApproveMember, serverState, loading];
};

export default usePostApproveMember;

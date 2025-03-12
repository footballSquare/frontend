import { useFetch } from "../../4_Shared/util/apiUtil";
const usePostApproveMember = (
  team_list_idx: number
): [
  postEvent: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postEvent = (userIdx: number) => {
    request({ userIdx });
    console.log("확인 요청:", team_list_idx, userIdx);
  };

  return [postEvent, serverState, loading];
};

export default usePostApproveMember;

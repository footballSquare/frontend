import { useFetch } from "../../4_Shared/util/apiUtil";

const usePostChangeTeamRole = (): [
  postEvent: (userIdx: number, newRole: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postEvent = (userIdx: number, newRole: number) => {
    request({ userIdx, newRole });
    console.log("전송된 역할 변경 요청:", userIdx, newRole);
  };

  return [postEvent, serverState, loading];
};

export default usePostChangeTeamRole;

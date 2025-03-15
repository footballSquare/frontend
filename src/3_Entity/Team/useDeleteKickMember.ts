import { useFetch } from "../../4_Shared/util/apiUtil";
const useDeleteKickMember = (
  teamListIdx: number
): [
  deleteEvent: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const deleteEvent = (userIdx: number) => {
    request({ userIdx });
    console.log("삭제 요청:", userIdx, teamListIdx);
  };

  return [deleteEvent, serverState, loading];
};

export default useDeleteKickMember;

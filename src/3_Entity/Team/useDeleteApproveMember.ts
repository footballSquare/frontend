import { useFetch } from "../../4_Shared/util/apiUtil";
const useDeleteApproveMember = (
  team_list_idx: number
): [
  deleteEvent: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const deleteEvent = (userIdx: number) => {
    request({ userIdx });
    console.log("삭제 요청:", team_list_idx, userIdx);
  };

  return [deleteEvent, serverState, loading];
};

export default useDeleteApproveMember;

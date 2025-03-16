import { useFetch } from "../../4_Shared/util/apiUtil";
const useDeleteApproveMember = (
  team_list_idx: number
): [
  deleteApproveMember: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const deleteApproveMember = (userIdx: number) => {
    request({ userIdx });
    console.log("삭제 요청:", team_list_idx, userIdx);
  };

  return [deleteApproveMember, serverState, loading];
};

export default useDeleteApproveMember;

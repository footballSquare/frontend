import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteApproveMember = (
  team_list_idx: number
): [
  deleteApproveMember: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteApproveMember = (userIdx: number) => {
    const endPoint = `/team/${team_list_idx}/member/${userIdx}/access`;
    request("DELETE", endPoint, null, true);
  };

  return [deleteApproveMember, serverState, loading];
};

export default useDeleteApproveMember;

import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteApproveMember = (
  team_list_idx: number
): [
  deleteApproveMember: (userIdx: number) => Promise<number | undefined>,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteApproveMember = async (userIdx: number) => {
    const endPoint = `/team/${team_list_idx}/member/${userIdx}/access`;
    return await request("DELETE", endPoint, null, true);
  };

  return [deleteApproveMember, serverState, loading];
};

export default useDeleteApproveMember;

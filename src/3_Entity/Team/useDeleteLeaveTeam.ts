import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteLeaveTeam = (
  teamListIdx: number
): [
  deleteLeaveTeam: () => Promise<number | undefined>,
  serverState: Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteLeaveTeam = async () => {
    const endPoint = `/team/${teamListIdx}/leave`;
    return await request("DELETE", endPoint, null, true);
  };

  return [deleteLeaveTeam, serverState, loading];
};

export default useDeleteLeaveTeam;

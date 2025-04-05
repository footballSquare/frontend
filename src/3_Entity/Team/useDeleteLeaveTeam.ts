import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteLeaveTeam = (
  teamListIdx: number
): [
  deleteLeaveTeam: () => void,
  serverState: Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteLeaveTeam = () => {
    const endPoint = `/team/${teamListIdx}/leave`;
    request("DELETE", endPoint, null, true);
  };

  return [deleteLeaveTeam, serverState, loading];
};

export default useDeleteLeaveTeam;

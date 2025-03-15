import { useFetch } from "../../4_Shared/util/apiUtil";
const useDeleteKickMember = (
  teamListIdx: number
): [
  deleteKickMember: (userIdx: number) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const deleteKickMember = (userIdx: number) => {
    request({ userIdx });
    console.log("삭제 요청:", userIdx, teamListIdx);
  };

  return [deleteKickMember, serverState, loading];
};

export default useDeleteKickMember;

import { useFetchData } from "../../4_Shared/util/apiUtil";
const usePostApproveMember = (
  teamListIdx: number
): [
  postApproveMember: (userIdx: number) => Promise<number | undefined>,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const postApproveMember = async (userIdx: number) => {
    const endPoint = `/team/${teamListIdx}/member/${userIdx}/access`;
    return await request("POST", endPoint, null, true);
  };

  return [postApproveMember, serverState, loading];
};

export default usePostApproveMember;

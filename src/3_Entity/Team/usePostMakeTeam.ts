import { useFetchData } from "../../4_Shared/util/apiUtil";
const usePostMakeTeam = (): [
  postMakeTeam: (props: UsePostMakeTeam) => Promise<number | undefined>,
  serverState: Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const postMakeTeam = async (props: UsePostMakeTeam) => {
    const endPoint = `/team`;
    return await request("POST", endPoint, props, true);
  };

  return [postMakeTeam, serverState, loading];
};

export default usePostMakeTeam;

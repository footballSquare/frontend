import { useFetchData } from "../../4_Shared/util/apiUtil";
const usePostMakeTeam = (): [
  postMakeTeam: (props: UsePostMakeTeam) => void,
  serverState: Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const postMakeTeam = (props: UsePostMakeTeam) => {
    const endPoint = `/team`;
    request("POST", endPoint, props, true);
  };

  return [postMakeTeam, serverState, loading];
};

export default usePostMakeTeam;

import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostTeamMatch = (
  props: UsePostTeamMatchProps
): [
  postTeamMatch: (props: PostTeamMatchProps) => void,
  serverState: Record<string, unknown> | null,
  loading: boolean
] => {
  const { teamIdx } = props;
  const [serverState, request, loading] = useFetchData();

  const postTeamMatch = (props: PostTeamMatchProps) => {
    const endPoint = `/match/team/${teamIdx}`;
    request("POST", endPoint, props, true);
  };

  return [postTeamMatch, serverState, loading];
};

export default usePostTeamMatch;

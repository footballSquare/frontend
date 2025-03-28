import { useFetch } from "../../4_Shared/util/apiUtil";

const usePostTeamMatch = (
  props: UsePostTeamMatchProps
): [
  postEvent: (props: PostTeamMatchProps) => void,
  serverState: unknown,
  loading: boolean
] => {
  const { teamIdx } = props;
  const [serverState, request, loading] = useFetch();
  const postTeamMatch = (props: PostTeamMatchProps) => {
    request(props);
    console.log(props, teamIdx);
  };

  return [postTeamMatch, serverState, loading];
};
export default usePostTeamMatch;

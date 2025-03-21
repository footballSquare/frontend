import { useFetch } from "../../4_Shared/util/apiUtil";
import { PostTeamMatchProps } from "./types/request";

const usePostTeamMatch = (
  teamIdx: number
): [
  postEvent: (props: PostTeamMatchProps) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postTeamMatch = (props: PostTeamMatchProps) => {
    request(props);
    console.log(props, teamIdx);
  };

  return [postTeamMatch, serverState, loading];
};
export default usePostTeamMatch;

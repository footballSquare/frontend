import { useFetch } from "../../4_Shared/util/apiUtil";
import { MatchFormData } from "./types/response";

const usePostTeamMatch = (
  teamListIdx: number
): [
  postEvent: (matchFormData: MatchFormData) => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetch();

  const postEvent = (matchFormData: MatchFormData) => {
    request(matchFormData);
    console.log(matchFormData, teamListIdx);
  };

  return [postEvent, serverState, loading];
};
export default usePostTeamMatch;

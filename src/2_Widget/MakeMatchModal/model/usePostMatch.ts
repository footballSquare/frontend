import PAGE_URI from "../../../4_Shared/constant/pageUri";
import usePostOpenMatch from "../../../3_Entity/Match/usePostOpenMatch";
import usePostTeamMatch from "../../../3_Entity/Match/usePostTeamMatch";
import { useMyTeamIdx } from "../../../4_Shared/lib/useMyInfo";

const usePostMatch = (): [(props: PostMatchProps) => void, string] => {
  const pageUri = `/${window.location.pathname.split("/")[1]}`;
  const postMatchType = pageUri === PAGE_URI.FREEMATCH ? "OPEN" : "TEAM";
  const [teamIdx] = useMyTeamIdx();
  const [postOpenMatch] = usePostOpenMatch();
  const [postTeamMatch] = usePostTeamMatch({ teamIdx });

  const postMatch = (props: PostMatchProps) => {
    if (postMatchType === "OPEN") {
      postOpenMatch(props);
    } else {
      postTeamMatch(props);
    }
    window.location.reload();
  };



  return [postMatch, postMatchType];
};

export default usePostMatch;

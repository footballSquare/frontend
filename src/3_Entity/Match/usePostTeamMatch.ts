import React from "react";
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

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState.status === 200) {
        alert("매치가 생성되었습니다.");
        window.location.reload();
      } else {
        alert("매치 생성에 실패했습니다.");
      }
    }
  }, [loading, serverState]);

  return [postTeamMatch, serverState, loading];
};

export default usePostTeamMatch;

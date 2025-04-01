import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostTeamMatch = (
  props: UsePostTeamMatchProps
): [
  postTeamMatch: (props: PostTeamMatchProps) => void,
  newMatchData: MatchInfo | null
] => {
  const { teamIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [newMatchData, setNewMatchData] = React.useState<MatchInfo | null>(
    null
  );

  const postTeamMatch = (props: PostTeamMatchProps) => {
    if (!teamIdx) return;
    const endPoint = `/match/team/${teamIdx}`;
    request("POST", endPoint, props, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState.status === 200 && serverState.data) {
        setNewMatchData(serverState.data as MatchInfo); // match 데이터 저장
        alert("매치가 생성되었습니다.");
      } else {
        alert("매치 생성에 실패했습니다.");
      }
    }
  }, [loading, serverState]);

  return [postTeamMatch, newMatchData];
};

export default usePostTeamMatch;

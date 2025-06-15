import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostTeamStat = (): [
  postTeamMatch: (props: PostTeamStatProps) => Promise<number | undefined>
] => {
  const [serverState, request, loading] = useFetchData();

  const postTeamMatch = async (props: PostTeamStatProps) => {
    const { matchIdx, teamStat } = props;
    return await request(
      "POST",
      `/match/${matchIdx}/team_stats`,
      teamStat,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          break;
        default:
          alert(serverState.message || "팀 스탯 저장에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);
  return [postTeamMatch];
};

export default usePostTeamStat;

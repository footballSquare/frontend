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
          alert("팀 스탯이 등록되었습니다.");
          break;
        default:
          alert("팀 스탯이 등록이 완료되지 못했습니다.");
          break;
      }
    }
  }, [loading, serverState]);
  return [postTeamMatch];
};

export default usePostTeamStat;

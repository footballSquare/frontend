import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostPlayerStats = (): [
  postTeamMatch: (props: PostPlayerStatProps) => Promise<number | undefined>
] => {
  const [serverState, request, loading] = useFetchData();

  const postPlayerStats = async (props: PostPlayerStatProps) => {
    const { matchIdx, teamStat } = props;
    return await request(
      "POST",
      `/match/${matchIdx}/player_stats`,
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
          alert("팀 스탯이 등록이 완료되지 못했습니다.");
          break;
      }
    }
  }, [loading, serverState]);
  return [postPlayerStats];
};

export default usePostPlayerStats;

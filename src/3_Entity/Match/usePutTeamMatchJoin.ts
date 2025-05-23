import { useFetchData } from "../../4_Shared/util/apiUtil";
import React from "react";
const usePutTeamMatchJoin = (): [
  (props: PutTeamMatchJoinProps) => Promise<number | undefined>
] => {
  const [serverState, request, loading] = useFetchData();
  const putTeamMatchJoin = async (props: PutTeamMatchJoinProps) => {
    const { matchIdx, matchPositionIdx, teamIdx } = props;
    return await request(
      "PUT",
      `/match/${matchIdx}/team/${teamIdx}/join?match_position_idx=${matchPositionIdx}`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          break;
        case 401:
          alert("로그인이 필요합니다.");
          break;
        default:
          alert("매치 참가에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [putTeamMatchJoin];
};
export default usePutTeamMatchJoin;

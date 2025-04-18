import { useFetchData } from "../../4_Shared/util/apiUtil";
import React from "react";
const usePutOpenMatchJoin = (): [(props: PutOpenMatchJoinProps) => void] => {
  const [serverState, request, loading] = useFetchData();
  const putOpenMatchJoin = (props: PutOpenMatchJoinProps) => {
    const { matchIdx, matchPositionIdx } = props;
    request(
      "PUT",
      `/match/${matchIdx}/open/join?match_position_idx=${matchPositionIdx}`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("매치에 참가했습니다.");
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

  return [putOpenMatchJoin];
};
export default usePutOpenMatchJoin;

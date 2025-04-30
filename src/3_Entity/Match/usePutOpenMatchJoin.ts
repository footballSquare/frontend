import { useFetchData } from "../../4_Shared/util/apiUtil";
import React from "react";
const usePutOpenMatchJoin = (): [
  (props: PutOpenMatchJoinProps) => void,
  Record<string, unknown> | null,
  boolean
] => {
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
          // 2_Widget > MatchModal > model > useMatchApply 에서 관리
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [putOpenMatchJoin, serverState, loading];
};
export default usePutOpenMatchJoin;

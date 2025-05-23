import { useFetchData } from "../../4_Shared/util/apiUtil";
import React from "react";
const usePutOpenMatchJoin = (): [
  putOpenMatchJoin: (
    props: PutOpenMatchJoinProps
  ) => Promise<number | undefined>
] => {
  const [serverState, request, loading] = useFetchData();
  const putOpenMatchJoin = async (props: PutOpenMatchJoinProps) => {
    const { matchIdx, matchPositionIdx } = props;
    return await request(
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
        case 403:
          alert("같은 시간대 참가중인 매치가 존재합니다.");
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [putOpenMatchJoin];
};
export default usePutOpenMatchJoin;

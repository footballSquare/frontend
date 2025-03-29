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
        case 404:
          alert("없는 매치 입니다.");
          break;
        case 429:
          alert("요청이 너무 많습니다! 잠시 기다려주세요.");
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [putOpenMatchJoin];
};
export default usePutOpenMatchJoin;

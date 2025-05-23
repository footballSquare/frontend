import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteMatchJoin = (): [(props: DeleteMatchJoinProps) => void] => {
  const [serverState, request, loading] = useFetchData();

  const deleteMatchJoin = async (props: DeleteMatchJoinProps) => {
    const { matchIdx, userIdx } = props;
    return await request(
      "delete",
      `/match/${matchIdx}/leave?target_player_idx=${userIdx}`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("매치 참가가 취소되었습니다.");
          break;
        default:
          alert("매치 참가 취소에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteMatchJoin];
};
export default useDeleteMatchJoin;

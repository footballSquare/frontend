import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostMatchApproval = (): [(props: PostMatchApprovalProps) => void] => {
  const [serverState, request, loading] = useFetchData();

  const postMatchApproval = (props: PostMatchApprovalProps) => {
    const { matchIdx, userIdx, matchPositionIdx } = props;
    request(
      "POST",
      `/match/${matchIdx}/approval?player_list_idx=${userIdx}&match_position_idx=${matchPositionIdx}`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("매치 승인 완료");
          break;
        case 429:
          alert("요청이 너무 많습니다! 잠시 기다려주세요.");
          break;
        default:
          break;
      }
    }
  }, [loading, serverState]);

  return [postMatchApproval];
};
export default usePostMatchApproval;

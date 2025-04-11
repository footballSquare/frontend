import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteCommunityTeam = (): [
  (props: DeleteCommunityTeamProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteCommunityTeam = (props: DeleteCommunityTeamProps) => {
    const { communityIdx, teamIdx } = props;
    request(
      "DELETE",
      `/community/${communityIdx}/team/${teamIdx}/kick`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("소속 팀 추방이 완료 되었습니다.");
          break;
        default:
          alert("소속 팀 추방에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteCommunityTeam];
};

export default useDeleteCommunityTeam;

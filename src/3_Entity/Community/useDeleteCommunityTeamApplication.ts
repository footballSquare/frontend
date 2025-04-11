import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteCommunityTeamApplication = (): [
  (props: DeleteCommunityTeamApplicationProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteCommunityTeamApplication = (
    props: DeleteCommunityTeamApplicationProps
  ) => {
    const { communityIdx, teamIdx } = props;
    request(
      "DELETE",
      `/community/${communityIdx}/team/${teamIdx}/access`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("소속 팀 가입 거절 완료 되었습니다.");
          break;
        default:
          alert("소속 팀 거절에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteCommunityTeamApplication];
};

export default useDeleteCommunityTeamApplication;

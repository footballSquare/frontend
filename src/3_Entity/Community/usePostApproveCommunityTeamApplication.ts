import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostApproveCommunityTeamApplication = (): [
  (
    props: PostApproveCommunityTeamApplicationProps
  ) => Promise<number | undefined>
] => {
  const [serverState, request, loading] = useFetchData();

  const postApproveCommunityTeamApplication = async (
    props: PostApproveCommunityTeamApplicationProps
  ) => {
    const { communityIdx, teamIdx } = props;
    return await request(
      "POST",
      `/community/${communityIdx}/team/${teamIdx}/access`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("소속 팀 가입 승인 완료 되었습니다.");
          break;
        default:
          alert("소속 팀 승인에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [postApproveCommunityTeamApplication];
};

export default usePostApproveCommunityTeamApplication;

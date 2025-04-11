import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostApplyCommunityTeam = (): [
  postApplyCommunityTeam: (props: PostApplyCommunityTeamProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postApplyCommunityTeam = (props: PostApplyCommunityTeamProps) => {
    const { communityIdx } = props;
    request("POST", `/community/${communityIdx}/team/application`, null, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("커뮤니티 소속 팀에 지원완료 되었습니다.");
          break;
        default:
          alert("지원에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [postApplyCommunityTeam];
};

export default usePostApplyCommunityTeam;

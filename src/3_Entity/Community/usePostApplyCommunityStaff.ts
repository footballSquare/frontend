import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostApplyCommunityStaff = (): [
  postApplyCommunityStaff: (props: PostApplyCommunityStaffProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postApplyCommunityStaff = (props: PostApplyCommunityStaffProps) => {
    const { communityIdx } = props;
    request("POST", `/community/${communityIdx}/staff/application`, null, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("운영진에 지원완료 되었습니다.");
          break;
        case 401:
          alert("로그인이 필요합니다.");
          break;
        default:
          alert("운영진 지원에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [postApplyCommunityStaff];
};

export default usePostApplyCommunityStaff;

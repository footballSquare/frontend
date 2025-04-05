import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostApproveCommunityStaffAppication = (): [
  (props: PostApproveCommunityStaffApplicationProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postApproveCommunityStaffApplication = (
    props: PostApproveCommunityStaffApplicationProps
  ) => {
    const { communityIdx, userIdx } = props;
    request(
      "POST",
      `/community/${communityIdx}/staff/${userIdx}/access`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("운영진 가입 승인 완료 되었습니다.");
          break;
        default:
          alert("운영진 승인에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [postApproveCommunityStaffApplication];
};

export default usePostApproveCommunityStaffAppication;

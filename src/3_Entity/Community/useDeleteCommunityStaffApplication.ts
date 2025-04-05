import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteCommunityStaffApplication = (): [
  (props: DeleteCommunityStaffApplicationProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteCommunityStaffApplication = (
    props: DeleteCommunityStaffApplicationProps
  ) => {
    const { communityIdx, userIdx } = props;
    request(
      "DELETE",
      `/community/${communityIdx}/staff/${userIdx}/access`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("운영진 가입 거절이 완료 되었습니다.");
          break;
        default:
          alert("운영진 가입 거절에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteCommunityStaffApplication];
};

export default useDeleteCommunityStaffApplication;

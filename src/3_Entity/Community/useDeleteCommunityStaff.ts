import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteCommunityStaff = (): [
  (props: DeleteCommunityStaffProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteCommunityStaff = (props: DeleteCommunityStaffProps) => {
    const { communityIdx, userIdx } = props;
    request(
      "DELETE",
      `/community/${communityIdx}/staff/${userIdx}/kick`,
      null,
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("운영진 추방이 완료 되었습니다.");
          break;
        default:
          alert("운영진 추방에 실패했습니다.");
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteCommunityStaff];
};

export default useDeleteCommunityStaff;

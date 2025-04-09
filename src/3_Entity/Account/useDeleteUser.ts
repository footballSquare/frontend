import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteUser = (): [
  deleteUser: () => void,
  Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteUser = () => {
    const endPoint = `/account/user/delete`;
    request("DELETE", endPoint, null, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("탈퇴 되었습니다");
          break;
        default:
          alert("잘못된 접근");
          window.location.reload();
          break;
      }
    }
  }, [loading, serverState]);

  return [deleteUser, serverState, loading];
};

export default useDeleteUser;

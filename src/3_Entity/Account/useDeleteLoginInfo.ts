import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../4_Shared/lib/useMyInfo";

const useDeleteLoginInfo = (): [
  deleteLoginInfo: () => Promise<number | undefined>,
  Record<string, unknown> | null,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();
  const navigate = useNavigate();
  const [logout] = useLogout();

  const deleteLoginInfo = async () => {
    logout();
    return await request("DELETE", `/account/logout`, null, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          break;
        default:
          alert("다시 시도해주세요.");
          break;
      }
    }
  }, [navigate, loading, serverState]);

  return [deleteLoginInfo, serverState, loading];
};

export default useDeleteLoginInfo;

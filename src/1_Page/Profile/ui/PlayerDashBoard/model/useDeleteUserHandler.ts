import React from "react";
import useDeleteUser from "../../../../../3_Entity/Account/useDeleteUser";
import { useLogout } from "../../../../../4_Shared/lib/useMyInfo";

const useDeleteUserHandler = (): [() => void] => {
  const [deleteUser, serverState] = useDeleteUser();
  const [logout] = useLogout();

  React.useEffect(() => {
    if (!serverState) return;
    switch (serverState.status) {
      case 200:
        alert("삭제 되었습니다");
        logout();
        break;
      default:
        alert("삭제 실패했습니다");
        break;
    }
  }, [serverState]);

  return [deleteUser];
};
export default useDeleteUserHandler;

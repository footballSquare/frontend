import useDeleteUser from "../../../3_Entity/Account/useDeleteUser";
import { useLogout } from "../../../4_Shared/lib/useMyInfo";

const useDeleteUserHandler = (): [() => void] => {
  const [deleteUser] = useDeleteUser();
  const [logout] = useLogout();

  const handleDeleteUser = async () => {
    const result = await deleteUser();
    if (result === 200) {
      alert("탈퇴 되었습니다");
      logout();
    } else {
      alert("잘못된 접근");
      window.location.reload();
    }
  };

  return [handleDeleteUser];
};
export default useDeleteUserHandler;

import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteUser = (): [
  deleteEvent: () => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteUser = () => {
    const endPoint = `/account/user/delete`;
    request("DELETE", endPoint, null, true);
  };

  return [deleteUser, serverState, loading];
};

export default useDeleteUser;

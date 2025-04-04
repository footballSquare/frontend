import { useFetchData } from "../../4_Shared/util/apiUtil";

const useDeleteUserInfo = (): [
  deleteEvent: () => void,
  serverState: unknown,
  loading: boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const deleteEvent = () => {
    const endPoint = `/account/user/delete`;
    request("DELETE", endPoint, null, true);
  };

  return [deleteEvent, serverState, loading];
};

export default useDeleteUserInfo;

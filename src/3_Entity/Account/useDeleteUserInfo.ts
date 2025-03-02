import { useFetch } from "../../4_Shared/util/apiUtil";

const useDeleteUserInfo = (
  userIdx: number
): [deleteEvent: () => void, serverState: unknown, loading: boolean] => {
  const [serverState, request, loading] = useFetch();

  const deleteEvent = () => {
    request({ userIdx });
    console.log("삭제된 데이터:", userIdx);
  };

  return [deleteEvent, serverState, loading];
};

export default useDeleteUserInfo;

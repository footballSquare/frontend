import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostBoard = (): [
  (data: PostEditFormFields, category: number) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();

  const postBoard = (data: PostEditFormFields, category: number) => {
    const endPoint = `/board/?category=${category}`;
    request("POST", endPoint, data, true);
  };

  return [postBoard, serverState];
};

export default usePostBoard;

import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostBoard = (): [
  (formData: FormData, category: number) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();

  const postBoard = (formData: FormData, category: number) => {
    const endPoint = `/board/?category=${category}`;
    request("POST", endPoint, formData, true);
  };

  return [postBoard, serverState];
};

export default usePostBoard;

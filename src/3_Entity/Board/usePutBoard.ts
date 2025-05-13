import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutBoard = (
  boardListIdx: number
): [
  (formData: FormData) => void,
  serverState: Record<string, unknown> | null
] => {
  const [serverState, request] = useFetchData();

  const putBoard = (formData: FormData) => {
    const endPoint = `/board/${boardListIdx}`;
    request("PUT", endPoint, formData, true);
  };

  return [putBoard, serverState];
};

export default usePutBoard;

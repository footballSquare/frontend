import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutBoard = (
  boardListIdx: number
): [(data: PostEditFormFields) => void, Record<string, unknown> | null] => {
  const [serverState, request] = useFetchData();

  const putBoard = (data: PostEditFormFields) => {
    const endPoint = `/board/${boardListIdx}`;
    request("PUT", endPoint, data, true);
  };

  return [putBoard, serverState];
};

export default usePutBoard;

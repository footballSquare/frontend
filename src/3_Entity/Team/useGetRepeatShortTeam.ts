import React from "react";
import { ResultStateType } from "./types/response";

import { useFetch } from "../../4_Shared/util/apiUtil";
import { RESULT_STATE } from "../../4_Shared/constant/result";

const useGetRepeatShortTeam = (): [
  ResultStateType,
  boolean,
  (teamName: string) => void,
  () => void
] => {
  const [serverState, request, loading] = useFetch();

  const [result, setResult] = React.useState<ResultStateType>(
    RESULT_STATE.UNAVAILABLE
  );
  const resetResult = () => {
    setResult(RESULT_STATE.PENDING);
  };

  const getRepeatShortTeam = (teamName: string) => {
    setResult(RESULT_STATE.PENDING);
    request({ teamName });
  };

  React.useEffect(() => {
    if (!serverState) return;
    setResult(RESULT_STATE.AVAILABLE);
    switch (serverState.status) {
      case 200:
        setResult(RESULT_STATE.AVAILABLE);
        console.log("중복 없음");
        return;
      case 409:
        setResult(RESULT_STATE.UNAVAILABLE);
        console.log("중복");
        return;
      default:
        return;
    }
  }, [serverState]);

  return [result, loading, getRepeatShortTeam, resetResult];
};

export default useGetRepeatShortTeam;

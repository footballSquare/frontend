import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

export const RESULT_STATE = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  PENDING: null,
} as const;

export type ResultStateType = (typeof RESULT_STATE)[keyof typeof RESULT_STATE];

const useGetRepeatTeam = (): [
  ResultStateType,
  boolean,
  (teamName: string) => void,
  () => void
] => {
  const [serverState, request, loading] = useFetch();

  const resetResult = () => {
    setResult(RESULT_STATE.PENDING);
  };

  const [result, setResult] = React.useState<ResultStateType>(
    RESULT_STATE.UNAVAILABLE
  );

  const checkRepeat = (teamName: string) => {
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

  return [result, loading, checkRepeat, resetResult];
};

export default useGetRepeatTeam;

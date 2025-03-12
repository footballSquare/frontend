import React from "react";
import { RESULT_STATE } from "../../../../../../../../../3_Entity/Team/useGetRepeatTeam";
import { UseResultHandlerProps } from "./type";

const useResultHandler = ({
  result,
  modifyMode,
  resetResult,
}: UseResultHandlerProps): [boolean, boolean] => {
  const isNotRepeat = result === RESULT_STATE.AVAILABLE;
  const isRepeat = result === RESULT_STATE.UNAVAILABLE;

  React.useEffect(() => {
    if (!modifyMode) {
      resetResult();
    }
  }, [modifyMode, resetResult]);

  return [isNotRepeat, isRepeat];
};

export default useResultHandler;

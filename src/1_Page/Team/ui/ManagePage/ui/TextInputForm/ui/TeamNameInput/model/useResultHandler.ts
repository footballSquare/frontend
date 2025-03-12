import React from "react";
import { RESULT_STATE } from "../../../../../../../../../4_Shared/constant/result";
import { UseResultHandlerProps } from "./type";

const useResultHandler = ({
  repeatFormKey,
  result,
  modifyMode,
  resetResult,
  setValue,
  trigger,
}: UseResultHandlerProps): [boolean, boolean] => {
  const isNotRepeat = result === RESULT_STATE.AVAILABLE;
  const isRepeat = result === RESULT_STATE.UNAVAILABLE;

  React.useEffect(() => {
    if (!modifyMode) {
      resetResult();
    }
  }, [modifyMode, resetResult]);

  React.useEffect(() => {
    if (isNotRepeat) {
      setValue(repeatFormKey, true);
      trigger(repeatFormKey);
    }
  }, [isNotRepeat]);

  return [isNotRepeat, isRepeat];
};

export default useResultHandler;

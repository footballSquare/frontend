import React from "react";
import { useLoadHandler } from "./type";

const useLoadHandler = ({
  loading,
  modifyMode,
  isRepeat,
  setValue,
  trigger,
  repeatFormKey,
}: useLoadHandler) => {
  const [loadState, setLoadState] = React.useState<boolean>(true);
  React.useEffect(() => {
    setLoadState(loading);
  }, [loading]);

  React.useEffect(() => {
    setLoadState(true);
  }, [modifyMode]);

  React.useEffect(() => {
    if (!isRepeat) {
      setValue(repeatFormKey, true);
      trigger(repeatFormKey);
    }
  }, [isRepeat]);

  return [loadState];
};

export default useLoadHandler;

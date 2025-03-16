import React from "react";
import { useLoadHandlerProps } from "./type";

const useLoadHandler = ({
  loading,
  modifyMode,
  isRepeat,
  setValue,
  trigger,
  repeatFormKey,
}: useLoadHandlerProps) => {
  const [loadState, setLoadState] = React.useState<boolean>(true);
  React.useEffect(() => {
    setLoadState(loading);
  }, [loading]);

  React.useEffect(() => {
    setLoadState(true);
  }, [modifyMode]);

  React.useEffect(() => {
    if (loadState) return;
    if (!isRepeat) {
      setValue(repeatFormKey, true);
      trigger(repeatFormKey);
    }
  }, [isRepeat, loadState]);

  return [loadState];
};

export default useLoadHandler;

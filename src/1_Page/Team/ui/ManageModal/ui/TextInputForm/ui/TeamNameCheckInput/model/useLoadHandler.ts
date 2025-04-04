import React from "react";

const useLoadHandler = (props: UseLoadHandlerProps) => {
  const { loading, repeatFormKey, isRepeat, modifyMode, setValue, trigger } =
    props;

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

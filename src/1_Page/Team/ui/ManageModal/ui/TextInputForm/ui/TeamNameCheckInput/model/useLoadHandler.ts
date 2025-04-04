import React from "react";

const useLoadHandler = (props: UseLoadHandlerProps): UseLoadHandlerReturn => {
  const {
    loading,
    repeatFormKey,
    isRepeat,
    modifyMode,
    setValue,
    trigger,
    getValues,
    formKey,
  } = props;

  const [isNotChange, setIsNotChange] = React.useState<boolean>(false);
  const backupRef = React.useRef<string>();

  React.useEffect(() => {
    if (backupRef.current != getValues(formKey)) {
      setIsNotChange(false);
    } else {
      setIsNotChange(true);
    }
  }, [getValues, formKey]);

  const handleSetAllow = () => {
    setValue(repeatFormKey, true);
    trigger(repeatFormKey);
    setIsNotChange(true);
  };

  React.useEffect(() => {
    if (modifyMode) {
      setIsNotChange(false);
      const backupValue = getValues(formKey);
      backupRef.current = backupValue;
    }
  }, [modifyMode]);

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

  return { loadState, isNotChange, backupRef, handleSetAllow };
};

export default useLoadHandler;

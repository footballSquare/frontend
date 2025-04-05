import React from "react";

function useLoadHandler(props: UseLoadHandlerProps): UseLoadHandlerReturn {
  const {
    loading,
    repeatFormKey,
    isRepeat,
    modifyMode,
    setValue,
    trigger,
    getValues,
    formKey,
    getRepeatEvent,
  } = props;

  const [isNotChange, setIsNotChange] = React.useState<boolean>(false);
  const [loadState, setLoadState] = React.useState<boolean>(true);
  const backupRef = React.useRef<string>("");

  // 1) 수정 모드가 시작되면 백업값 세팅 + loadState 초기화
  //    수정 모드가 아닐 때는 넘어온 loading 값으로 loadState 동기화
  React.useEffect(() => {
    if (modifyMode) {
      backupRef.current = getValues(formKey);
      setIsNotChange(false);
      setLoadState(true);
    } else {
      setLoadState(loading);
    }
  }, [modifyMode, loading, getValues, formKey]);

  // 2) 백업값과 현재값이 다르면 변경됨(false), 같으면 변경 없음(true)
  React.useEffect(() => {
    const currentValue = getValues(formKey);
    setIsNotChange(backupRef.current === currentValue);
  }, [getValues, formKey]);

  // 3) 로딩 완료 후, 중복이 아닌 경우 repeatFormKey 를 true 로 설정
  React.useEffect(() => {
    if (!loadState && !isRepeat) {
      setValue(repeatFormKey, true);
      trigger(repeatFormKey);
    }
  }, [loadState, isRepeat, repeatFormKey, setValue, trigger]);

  // 4) 중복확인 버튼 클릭
  const handleClick = React.useCallback(async () => {
    const currentValue = getValues(formKey);

    // 변경사항이 없는 경우 => repeatFormKey 설정 후 isNotChange=true
    if (backupRef.current === currentValue) {
      setValue(repeatFormKey, true);
      await trigger(repeatFormKey);
      setIsNotChange(true);
      return;
    }
    // 변경사항 있는 경우 => 유효성 검증 후 중복검사
    const isValid = await trigger(formKey);
    if (isValid) {
      getRepeatEvent(currentValue);
    }
  }, [
    getValues,
    formKey,
    backupRef,
    repeatFormKey,
    setValue,
    trigger,
    getRepeatEvent,
  ]);

  return {
    loadState,
    isNotChange,
    handleClick,
  };
}

export default useLoadHandler;

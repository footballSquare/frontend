import React from "react";
import { UseModifyHandlerProps } from "./type";

const useModifyHandler = (props: UseModifyHandlerProps) => {
  const { userInfoForm, reset, inputBackupDataRef } = props;
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  React.useEffect(() => {
    reset(userInfoForm);
  }, [userInfoForm]); // 초기값 설정

  const handleCancle = () => {
    reset(inputBackupDataRef.current);
    setModifyMode(false);
  };
  const handleModifyFalse = () => {
    setModifyMode(false);
  };
  return { modifyMode, handleCancle, handleModifyFalse };
};

export default useModifyHandler;

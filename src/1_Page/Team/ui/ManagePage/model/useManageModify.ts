import React from "react";

import { TeamInfoInput } from "../type";
import { UseFormReset } from "react-hook-form";

const useManageModify = (
  reset: UseFormReset<TeamInfoInput>,
  defaultTeamInfoInput: TeamInfoInput
): [boolean, () => void, () => void, (data: TeamInfoInput) => void] => {
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  const cancleRef = React.useRef<boolean>(false);
  const inputBackupDataRef = React.useRef<TeamInfoInput>(defaultTeamInfoInput);

  React.useEffect(() => {
    if (modifyMode) {
      cancleRef.current = false;
    }
  }, [modifyMode]);

  const handleModifyFalse = () => {
    setModifyMode(false);
  };

  const handleCancle = () => {
    setModifyMode(false);
    cancleRef.current = true;
    reset(inputBackupDataRef.current);
  };

  const handleBackupData = (data: TeamInfoInput) => {
    setModifyMode(true);
    inputBackupDataRef.current = data;
  };

  return [modifyMode, handleCancle, handleModifyFalse, handleBackupData];
};

export default useManageModify;

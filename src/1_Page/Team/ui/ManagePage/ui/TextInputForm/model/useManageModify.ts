import React from "react";

import { TeamInfoInput } from "../type";
import { UseManageModifyProps } from "./type";

const useManageModify = (
  props: UseManageModifyProps
): {
  modifyMode: boolean;
  handleCancle: () => void;
  handleModifyFalse: () => void;
  handleBackupData: (data: TeamInfoInput) => void;
} => {
  const { reset, setValue, teamInfoInput } = props;
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  const inputBackupDataRef = React.useRef<TeamInfoInput>(teamInfoInput);
  const resetRepeat = {
    team_repeat_checked: false,
    short_team_repeat_checked: false,
  };

  const handleModifyFalse = () => {
    setModifyMode(false);
    setValue("team_repeat_checked", false);
    setValue("short_team_repeat_checked", false);
  };

  const handleCancle = () => {
    setModifyMode(false);
    reset({
      ...inputBackupDataRef.current,
      ...resetRepeat,
    });
  };

  const handleBackupData = (data: TeamInfoInput) => {
    setModifyMode(true);
    inputBackupDataRef.current = data;
  };

  return {
    modifyMode,
    handleCancle,
    handleModifyFalse,
    handleBackupData,
  };
};

export default useManageModify;

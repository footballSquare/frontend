import React from "react";

import { TeamInfoInput } from "../type";
import { ModifyPropsType } from "./type";

const useManageModify = (
  props: ModifyPropsType
): {
  modifyMode: boolean;
  handleCancle: () => void;
  handleModifyFalse: () => void;
  handleBackupData: (data: TeamInfoInput) => void;
} => {
  const { reset, teamInfo } = props;

  const [modifyMode, setModifyMode] = React.useState<boolean>(false);
  const inputBackupDataRef = React.useRef<TeamInfoInput>(teamInfo);
  const resetRepeat = {
    team_repeat_checked: false,
    short_team_repeat_checked: false,
  };

  const handleModifyFalse = () => {
    setModifyMode(false);
    reset(resetRepeat);
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

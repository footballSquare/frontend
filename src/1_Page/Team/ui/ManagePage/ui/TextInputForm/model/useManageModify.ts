import React from "react";

import { TeamInfoForm } from "../type";
import { UseManageModifyProps } from "./type";

const useManageModify = (
  props: UseManageModifyProps
): {
  modifyMode: boolean;
  handleCancle: () => void;
  handleModifyFalse: () => void;
  handleBackupData: (data: TeamInfoForm) => void;
} => {
  const { reset, setValue, teamInfoForm } = props;
  const [modifyMode, setModifyMode] = React.useState<boolean>(false);

  const inputBackupDataRef = React.useRef<TeamInfoForm>(teamInfoForm);
  const resetRepeat = {
    team_repeat_checked: false,
    short_team_repeat_checked: false,
  };

  React.useEffect(() => {
    reset(teamInfoForm);
  }, [teamInfoForm]);

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

  const handleBackupData = (data: TeamInfoForm) => {
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

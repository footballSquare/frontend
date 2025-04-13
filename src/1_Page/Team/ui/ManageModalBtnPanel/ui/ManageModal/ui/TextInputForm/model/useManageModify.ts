import React from "react";

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

  const inputBackupDataRef = React.useRef<TeamInfoForm>({} as TeamInfoForm);

  // 초기값 설정
  React.useEffect(() => {
    reset(teamInfoForm);
  }, [teamInfoForm]);

  //  수정 완료
  const handleModifyFalse = () => {
    setModifyMode(false);
    setValue("team_repeat_checked", false);
    setValue("short_team_repeat_checked", false);
  };

  // 취소 클릭
  const handleCancle = () => {
    setModifyMode(false);
    reset({
      ...inputBackupDataRef.current,
      team_repeat_checked: false,
      short_team_repeat_checked: false,
    });
  };

  // 수정 상태 진입시 데이터 저장 취소위한 (백업)
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

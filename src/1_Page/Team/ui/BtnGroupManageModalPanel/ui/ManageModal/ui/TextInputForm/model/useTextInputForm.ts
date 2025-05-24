import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { teamManageTextInputSchema } from "../../../../../../../../../4_Shared/hookForm/TeamManageTextInput/schema";

const useTextInputForm = (
  props: UseTextInputFormProps
): UseTextInputFormReturn => {
  const { teamInfo } = props;

  const forms = useForm<TeamInfoForm>({
    resolver: yupResolver(teamManageTextInputSchema),
    mode: "onChange",
  });
  const { reset, getValues, clearErrors } = forms;

  const inputBackupDataRef = React.useRef<TeamInfoForm>({} as TeamInfoForm);

  // 초기값 설정
  React.useEffect(() => {
    reset({
      ...teamInfo,
      team_list_name_repeat: false,
      team_list_short_name_repeat: false,
    });
  }, [teamInfo, reset]);

  // 취소 클릭
  const handleCancle = () => {
    reset({
      ...inputBackupDataRef.current,
      team_list_name_repeat: false,
      team_list_short_name_repeat: false,
    });
    clearErrors();
  };

  // 수정 상태 진입시 데이터 저장 취소위한 (백업)
  const handleBackupData = () => {
    const presentData = getValues();
    inputBackupDataRef.current = presentData;
  };

  return {
    forms,
    handleCancle,
    handleBackupData,
  };
};

export default useTextInputForm;

type UseTextInputFormProps = {
  teamInfo: TeamInfo;
};

type UseTextInputFormReturn = {
  forms: ReturnType<typeof useForm<TeamInfoForm>>;
  handleCancle: () => void;
  handleBackupData: () => void;
};

type UsePutTeamInfoHandlerProps = {
  teamInfo: TeamInfo;
  setValue: (name: string, value: boolean) => void;
  handleSetTeamInfoPreview: (data: TeamInfoForm) => void;
};

type UsePutTeamInfoHandlerReturn = {
  handlePutTeamInfo: (data: TeamInfoForm) => Promise<void>;
};

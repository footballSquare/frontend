type UseLoadHandlerProps = {
  loading: boolean;
  repeatFormKey: "short_team_repeat_checked" | "team_repeat_checked";
  formKey: "team_list_short_name" | "team_list_name";
  isRepeat: boolean;
  modifyMode: boolean;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
};

type UseLoadHandlerReturn = {
  loadState: boolean;
  isNotChange: boolean;
  backupRef: React.MutableRefObject<string | undefined>;
  handleSetAllow: () => void;
};

type UseGetRepeatReturn = {
  isRepeat: boolean;
  loading: boolean;
  getRepeatEvent: (text: string) => void;
  formKey: "team_list_short_name" | "team_list_name";
  repeatFormKey: "short_team_repeat_checked" | "team_repeat_checked";
};

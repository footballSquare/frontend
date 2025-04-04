type UseLoadHandlerProps = {
  loading: boolean;
  repeatFormKey: "short_team_repeat_checked" | "team_repeat_checked";
  isRepeat: boolean;
  modifyMode: boolean;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
};

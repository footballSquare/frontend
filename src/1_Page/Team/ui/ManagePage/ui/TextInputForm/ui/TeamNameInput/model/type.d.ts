import { FieldValues, UseFormSetValue, UseFormTrigger } from "react-hook-form";

export type useLoadHandlerProps = {
  loading: boolean;
  repeatFormKey: "short_team_repeat_checked" | "team_repeat_checked";
  isRepeat: boolean;
  modifyMode: boolean;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
};

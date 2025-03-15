import { FieldValues, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { ResultStateType } from "../../../../../../../../../3_Entity/Team/useGetRepeatTeam";

export type UseResultHandlerProps = {
  repeatFormKey: "short_team_repeat_checked" | "team_repeat_checked";
  result: ResultStateType;
  modifyMode: boolean;
  resetResult: () => void;
  setValue: UseFormSetValue<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
};

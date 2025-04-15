import { UseFormReset, UseFormSetValue } from "react-hook-form";

export type UseManageModifyProps = {
  setValue: UseFormSetValue<TeamInfoForm>;
  reset: UseFormReset<TeamInfoForm>;
  teamInfoForm: TeamInfoForm;
};

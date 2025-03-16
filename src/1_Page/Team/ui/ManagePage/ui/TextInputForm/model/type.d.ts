import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { TeamInfoForm } from "../type";

export type UseManageModifyProps = {
  setValue: UseFormSetValue<TeamInfoForm>;
  reset: UseFormReset<TeamInfoForm>;
  teamInfoForm: TeamInfoForm;
};

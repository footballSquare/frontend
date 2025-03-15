import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { TeamInfoInput } from "../type";

export type UseManageModifyProps = {
  setValue: UseFormSetValue<TeamInfoInput>;
  reset: UseFormReset<TeamInfoInput>;
  teamInfoInput: TeamInfoInput;
};

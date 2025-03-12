import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { TeamInfoInput } from "../type";

export type ModifyPropsType = {
  setValue: UseFormSetValue<TeamInfoInput>;
  reset: UseFormReset<TeamInfoInput>;
  teamInfo: TeamInfoInput;
};

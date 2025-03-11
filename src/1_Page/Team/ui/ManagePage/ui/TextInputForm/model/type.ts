import { UseFormReset } from "react-hook-form";
import { TeamInfoInput } from "../type";

export type ModifyPropsType = {
  reset: UseFormReset<TeamInfoInput>;
  teamInfo: TeamInfoInput;
};

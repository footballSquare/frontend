import { UseFormReset } from "react-hook-form";
import { TeamInfo } from "../../../../../3_Entity/Team/type";
import { TeamInfoInput } from "../type";

export type ModifyPropsType = {
  reset: UseFormReset<TeamInfoInput>;
  teamInfo: TeamInfo;
};

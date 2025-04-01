import { TeamInfo } from "../../../../3_Entity/Team/types/response";

export type TeamManageButtonGroupProps = {
  teamInfo: TeamInfo;
  handleTogglePage: () => void;
};

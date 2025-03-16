import { TeamInfo } from "../../../../3_Entity/Team/types/response";

export type ManagePageProps = {
  teamInfo: TeamInfo;
  handleTogglePage: () => void;
};

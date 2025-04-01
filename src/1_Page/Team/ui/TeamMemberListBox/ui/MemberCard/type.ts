import { TeamMembers } from "../../../../../../3_Entity/Team/types/response";

export type MemberProps = TeamMembers & {
  index: number;
  observeRef?: (node?: Element | null) => void;
  isTeamReader: boolean;
};

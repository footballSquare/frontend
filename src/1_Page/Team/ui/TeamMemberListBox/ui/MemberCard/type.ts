import { TeamMembers } from "../../../../../../3_Entity/Team/types/response";

export type MemberProps = TeamMembers & {
  index: number;
  teamIdx: number;
  observeRef?: (node?: Element | null) => void;
  isTeamReader: boolean;
};

import { TeamMembers } from "../../../../../../3_Entity/Team/type";

export type MemberProps = TeamMembers & {
  index: number;
  observeRef?: (node?: Element | null) => void;
  reFetch: () => void;
};

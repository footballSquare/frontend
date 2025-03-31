import { TeamMatchInfo } from "../../../../../../3_Entity/Match/types/response";

export type MatchCardProps = TeamMatchInfo & {
  observeRef?: (node?: Element | null) => void;
  index: number;
};

import { MatchInfo } from "../../../../../../3_Entity/Match/types/response";

export type MatchCardProps = MatchInfo & {
  observeRef?: ((node?: Element | null) => void);
} 

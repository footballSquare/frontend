import { MatchInfo } from "../../../../../../3_Entity/Match/type";

export type MatchCardProps = MatchInfo & {
  observeRef?: ((node?: Element | null) => void);
} 

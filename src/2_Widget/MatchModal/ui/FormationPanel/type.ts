import { MatchDetail } from "../../../../3_Entity/Match/type";

export type FormationPanelProps = Pick<
  MatchDetail,
  "match_formation_idx" | "match_formation_position" | "match_participant"
>;

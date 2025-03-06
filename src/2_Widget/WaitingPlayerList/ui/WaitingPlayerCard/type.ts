import { WaitingPlayerInfo } from "../../../../3_Entity/Match/type";

export type WaitingPlayerCardProps = WaitingPlayerInfo & {
  observeRef?: (node?: Element | null) => void;
};

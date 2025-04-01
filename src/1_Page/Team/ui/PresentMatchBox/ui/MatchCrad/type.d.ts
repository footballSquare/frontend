export type MatchCardProps = MatchInfo & {
  observeRef?: (node?: Element | null) => void;
  index: number;
};

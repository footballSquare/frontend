type TeamSummaryCardProps = {
  team: TeamListInfo;
  observeRef?: (node?: Element | null) => void;
  isRecent?: boolean;
  isMyTeam?: boolean;
};

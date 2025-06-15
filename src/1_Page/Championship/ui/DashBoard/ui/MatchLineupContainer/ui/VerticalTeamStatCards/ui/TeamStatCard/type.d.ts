type TeamStatCardProps = {
  teamName: string;
  stats: TeamStats;
  onSave?: (data: PostTeamStatsForm) => void;
  teamEvidenceImage?: TeamEvidenceImg[];
  teamPlayer?: PlayerStats[];
};

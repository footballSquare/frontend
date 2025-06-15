type VerticalTeamStatCardsProps = {
  team1Stats: TeamStats;
  team2Stats: TeamStats;
  teamName1: string;
  teamName2: string;
  team1Player?: PlayerStats[];
  team2Player?: PlayerStats[];
  teamEvidenceImage?: {
    first_team_evidence: TeamEvidenceImg[];
    second_team_evidence: TeamEvidenceImg[];
  };
};

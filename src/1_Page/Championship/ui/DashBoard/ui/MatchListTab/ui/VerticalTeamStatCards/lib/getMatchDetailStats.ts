export function getCurrentMomPlayer(
  players: PlayerStats[] | undefined,
  momIdx: number
) {
  return players?.find((p) => p.player_list_idx === momIdx);
}

export function getEvidenceUrls(
  responseUrl: string[] | null,
  evidenceImage: TeamEvidenceImg[] | undefined
) {
  return (
    responseUrl ??
    evidenceImage?.map((i) => i.match_team_stats_evidence_img) ??
    []
  );
}

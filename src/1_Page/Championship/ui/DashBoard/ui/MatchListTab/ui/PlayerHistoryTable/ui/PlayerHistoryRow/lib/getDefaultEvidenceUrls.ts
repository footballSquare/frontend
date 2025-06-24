export const getDefaultEvidenceUrls = (
  responseUrl: string[] | null,
  personEvidenceImage:
    | { player_list_idx: number; match_player_stats_evidence_img: string }[]
    | undefined,
  playerListIdx: number
): string[] => {
  return (
    responseUrl ||
    personEvidenceImage
      ?.filter((item) => item.player_list_idx === playerListIdx)
      .map((item) => item.match_player_stats_evidence_img) ||
    []
  );
};

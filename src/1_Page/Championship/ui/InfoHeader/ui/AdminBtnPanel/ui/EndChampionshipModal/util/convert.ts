export const convertToPutAwardData = (
  props: EndChampionshipParams
): PutChampionshipEndAward[] => {
  const { selectedAwardPlayers, championshipEndData } = props;
  const awardsPayload = championshipEndData.awards.map((award, index) => ({
    championship_award_idx: award.championship_award_idx,
    championship_winner_idxs: [
      selectedAwardPlayers[index]?.player_list_idx,
    ].filter((id): id is number => id !== undefined),
  }));
  return awardsPayload;
};

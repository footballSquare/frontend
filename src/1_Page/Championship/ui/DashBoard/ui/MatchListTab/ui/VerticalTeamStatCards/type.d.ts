type VerticalTeamStatCardsProps = {
  championshipMatchDetail: ChampionshipMatchDetail;
  selectedMatchList: ChampionshipMatchList | undefined;
  evidenceImage: EvidenceImage;
  handleUpdateMatchScore: (
    matchIdx: number,
    ourScore: number,
    otherScore: number
  ) => void;
};

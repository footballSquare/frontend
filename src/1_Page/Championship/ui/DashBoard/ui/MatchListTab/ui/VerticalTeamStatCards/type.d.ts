type VerticalTeamStatCardsProps = {
  championshipMatchDetail: ChampionshipMatchDetail;
  matchList: ChampionshipMatchList | undefined;
  evidenceImage: EvidenceImage;
  handleUpdateMatchScore: (
    matchIdx: number,
    ourScore: number,
    otherScore: number
  ) => void;
};

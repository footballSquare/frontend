type CreateChampionMatchModalProps = {
  onClose: () => void;
  teamList: ChampionshipTeamInfo[];
  handleAddMatch: (match: ChampionshipMatchInfo) => void;
};

type CreateChampionMatchFormValues = {
  teams: number[];
  matchDate: string;
  startTime: string;
};

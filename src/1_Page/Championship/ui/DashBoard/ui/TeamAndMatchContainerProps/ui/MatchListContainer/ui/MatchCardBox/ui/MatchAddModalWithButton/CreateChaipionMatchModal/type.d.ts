type CreateChampionMatchModalProps = {
  onClose: () => void;
  teamList: ChampionshipTeamInfo[];
};

type CreateChampionMatchFormValues = {
  teams: number[];
  matchDate: string;
  startTime: string;
};

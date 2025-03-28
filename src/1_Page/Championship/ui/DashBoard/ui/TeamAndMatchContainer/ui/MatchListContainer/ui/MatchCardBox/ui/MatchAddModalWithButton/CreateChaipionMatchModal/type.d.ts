type CreateChampionMatchModalProps = {
  onClose: () => void;
  teamList: ChampionshipTeamInfo[];
  refetch: () => void;
};

type CreateChampionMatchFormValues = {
  teams: number[];
  matchDate: string;
  startTime: string;
};

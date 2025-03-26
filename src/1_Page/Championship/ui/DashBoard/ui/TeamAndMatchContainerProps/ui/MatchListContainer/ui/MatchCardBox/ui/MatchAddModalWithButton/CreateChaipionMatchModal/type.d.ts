type CreateChampionMatchModalProps = {
  onClose: () => void;
  teamList: ChampionshipTeamInfo[];
};

type FormValues = {
  team: string;
  matchDate: string;
  startTime: string;
};

type HandlePostTeamStatProps = {
  match_match_idx: number;
  data: PlayerStatsFormValues;
};

type UseTeamStatFormReturn = {
  methods: UseFormReturn<PlayerStatsFormValues>;
  cancelEdit: () => void;
  setBackupPlayerStats: (data: PlayerStatsFormValues) => void;
};

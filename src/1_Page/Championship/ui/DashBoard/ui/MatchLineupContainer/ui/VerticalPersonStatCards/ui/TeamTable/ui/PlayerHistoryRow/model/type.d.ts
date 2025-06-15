type HandlePostPlayerStatProps = {
  match_match_idx: number;
  data: PlayerStatsFormValues;
};

type UsePlayerStatFormReturn = {
  methods: UseFormReturn<PlayerStatsFormValues>;
  cancelEdit: () => void;
  setBackupPlayerStats: (data: PlayerStatsFormValues) => void;
};

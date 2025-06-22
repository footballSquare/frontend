type HandlePostPlayerStatProps = {
  matchIdx: number;
  data: PlayerStatsFormValues;
};

type UsePlayerStatFormReturn = {
  methods: UseFormReturn<PlayerStatsFormValues>;
  cancelEdit: () => void;
  setBackupPlayerStats: (data: PlayerStatsFormValues) => void;
};

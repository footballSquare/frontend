type PlayerStatsFormValuesWithIdx = PlayerStatsFormValues & {
  player_list_idx: number;
};

type HandlePostPlayerStatProps = {
  matchIdx: number;
  data: PlayerStatsFormValuesWithIdx;
};

type UsePlayerStatFormReturn = {
  methods: UseFormReturn<PlayerStatsFormValues>;
  cancelEdit: () => void;
  setBackupPlayerStats: (data: PlayerStatsFormValues) => void;
};

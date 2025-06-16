type UseTeamStatFormReturn = {
  methods: UseFormReturn<PostTeamStatsForm>;
  cancelEdit: () => void;
  setBackupTeamStats: (data: PostTeamStatsForm) => void;
};

type HandlePostTeamStatProps = {
  matchIdx: number;
  data: PostTeamStatsForm;
};

type UseTeamStatFormReturn = {
  methods: UseFormReturn<PostTeamStatsForm>;
  cancelEdit: () => void;
  setBackupTeamStats: (data: PostTeamStatsForm) => void;
};

type HandlePostTeamStatProps = {
  matchIdx: number;
  data: PostTeamStatsForm;
};

type UsePostTeamStatsHandlerProps = {
  cancelEdit: () => void;
  setBackupTeamStats: (data: PostTeamStatsForm) => void;
  toggleIsEditing: () => void;
  handleUpdateMatchScore: (
    matchIdx: number,
    ourScore: number,
    otherScore: number
  ) => void;
};

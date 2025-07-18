type PlayerStatsDetailInputProps = {
  label: string;
  name: keyof PlayerStatsFormValues;
  register: ReturnType<typeof useForm<PlayerStatsFormValues>>["register"];
  errors: FieldErrors<PlayerStatsFormValues>;
  isEditing: boolean;
  children?: React.ReactNode;
};

type PlayerStatsFormValues = {
  match_player_stats_goal: number;
  match_player_stats_assist: number;
  match_player_stats_successrate_pass: number;
  match_player_stats_successrate_dribble: number;
  match_player_stats_successrate_tackle: number;
  match_player_stats_possession: number;
  match_player_stats_standing_tackle: number;
  match_player_stats_sliding_tackle: number;
  match_player_stats_cutting: number;
  match_player_stats_saved: number;
  match_player_stats_successrate_saved: number;
};

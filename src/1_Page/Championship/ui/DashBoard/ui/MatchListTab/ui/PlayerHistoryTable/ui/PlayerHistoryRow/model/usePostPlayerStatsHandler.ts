import usePostPlayerStats from "../../../../../../../../../../../3_Entity/Match/usePostPlayerStats";

const usePostPlayerStatsHandler = (
  cancelEdit: () => void,
  setBackupPlayerStats: (data: PlayerStatsFormValues) => void,
  toggleIsEditing: () => void,
  handleUpdatePlayer: (
    playerListIdx: number,
    updatedStats: Partial<PlayerStats>
  ) => void
) => {
  const [postPlayerStats] = usePostPlayerStats();

  const handlePostPlayerStats = async ({
    matchIdx,
    data,
  }: HandlePostPlayerStatProps) => {
    toggleIsEditing();
    const status = await postPlayerStats({
      playerStat: data,
      matchIdx,
    });

    switch (status) {
      case 200:
        setBackupPlayerStats(data);
        handleUpdatePlayer(data.player_list_idx, {
          match_player_stats_goal: data.match_player_stats_goal,
          match_player_stats_assist: data.match_player_stats_assist,
          match_player_stats_successrate_pass:
            data.match_player_stats_successrate_pass,
          match_player_stats_successrate_dribble:
            data.match_player_stats_successrate_dribble,
          match_player_stats_successrate_tackle:
            data.match_player_stats_successrate_tackle,
          match_player_stats_possession: data.match_player_stats_possession,
          match_player_stats_standing_tackle:
            data.match_player_stats_standing_tackle,
          match_player_stats_sliding_tackle:
            data.match_player_stats_sliding_tackle,
          match_player_stats_cutting: data.match_player_stats_cutting,
          match_player_stats_saved: data.match_player_stats_saved,
          match_player_stats_successrate_saved:
            data.match_player_stats_successrate_saved,
        });
        break;
      default:
        cancelEdit();
        break;
    }
  };

  return [handlePostPlayerStats];
};
export default usePostPlayerStatsHandler;

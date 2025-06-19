import React from "react";
import { useForm } from "react-hook-form";
import { playerDetailHistoryInputSchema } from "../../../../../../../../../../../../../../../4_Shared/hookForm/PlayerDetailHistoryInput/schema";
import { yupResolver } from "@hookform/resolvers/yup";

const usePlayerStatForm = (player: PlayerStats): UsePlayerStatFormReturn => {
  const methods = useForm<PlayerStatsFormValues>({
    resolver: yupResolver(playerDetailHistoryInputSchema),
  });
  const { reset } = methods;

  const backupPlayerStatsRef = React.useRef<PlayerStatsFormValues | null>(null);

  React.useEffect(() => {
    const initialValues: PlayerStatsFormValues = {
      match_player_stats_goal: player.match_player_stats_goal ?? 0,
      match_player_stats_assist: player.match_player_stats_assist ?? 0,
      match_player_stats_successrate_pass:
        player.match_player_stats_successrate_pass ?? 0,
      match_player_stats_successrate_dribble:
        player.match_player_stats_successrate_dribble ?? 0,
      match_player_stats_successrate_tackle:
        player.match_player_stats_successrate_tackle ?? 0,
      match_player_stats_possession: player.match_player_stats_possession ?? 0,
      match_player_stats_standing_tackle:
        player.match_player_stats_standing_tackle ?? 0,
      match_player_stats_sliding_tackle:
        player.match_player_stats_sliding_tackle ?? 0,
      match_player_stats_cutting: player.match_player_stats_cutting ?? 0,
      match_player_stats_saved: player.match_player_stats_saved ?? 0,
      match_player_stats_successrate_saved:
        player.match_player_stats_successrate_saved ?? 0,
    };
    backupPlayerStatsRef.current = initialValues;
    reset(initialValues);
  }, [player]);

  const cancelEdit = () => {
    reset(backupPlayerStatsRef.current || {});
  };
  const setBackupPlayerStats = (data: PlayerStatsFormValues) => {
    backupPlayerStatsRef.current = data;
  };

  return {
    methods,
    cancelEdit,
    setBackupPlayerStats,
  };
};

export default usePlayerStatForm;

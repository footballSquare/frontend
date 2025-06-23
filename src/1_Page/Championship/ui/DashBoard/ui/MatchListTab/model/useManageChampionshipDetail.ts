import React from "react";
import useGetChampionshipDetail from "../../../../../../../3_Entity/Championship/useGetChampionshipDetail";

const useManageChampionshipDetail = (
  selectChampionshipMatchIdx: number
): UseManageChampionshipDetailReturn => {
  const [fetchedDetail] = useGetChampionshipDetail(selectChampionshipMatchIdx);

  const [displayMatchDetail, setDisplayMatchDetail] =
    React.useState<ChampionshipMatchDetail | null>(null);

  React.useEffect(() => {
    if (fetchedDetail && Object.keys(fetchedDetail).length > 0) {
      setDisplayMatchDetail(fetchedDetail);
    }
  }, [fetchedDetail]);

  const handleUpdateTeamStats = (
    teamIdx: number,
    formData: PostTeamStatsForm
  ) => {
    if (!displayMatchDetail) return;

    const newDetail: ChampionshipMatchDetail = {
      ...displayMatchDetail,
      match_info: {
        ...displayMatchDetail.match_info,
      },
      first_team: {
        ...displayMatchDetail.first_team,
        stats: {
          ...displayMatchDetail.first_team.stats,
        },
        player_stats: displayMatchDetail.first_team.player_stats.map((p) => ({
          ...p,
        })),
      },
      second_team: {
        ...displayMatchDetail.second_team,
        stats: {
          ...displayMatchDetail.second_team.stats,
        },
        player_stats: displayMatchDetail.second_team.player_stats.map((p) => ({
          ...p,
        })),
      },
    };

    const { first_team, second_team } = newDetail;

    const allPlayers = [
      ...first_team.player_stats,
      ...second_team.player_stats,
    ];
    const momPlayer = allPlayers.find(
      (p) => p.player_list_idx === formData.mom_player_idx
    );
    const momPlayerNickname = momPlayer ? momPlayer.player_list_nickname : null;

    first_team.stats.mom_player_idx = formData.mom_player_idx;
    second_team.stats.mom_player_idx = formData.mom_player_idx;
    first_team.stats.mom_player_nickname = momPlayerNickname;
    second_team.stats.mom_player_nickname = momPlayerNickname;

    const targetTeam =
      first_team.team_list_idx === teamIdx ? first_team : second_team;
    const otherTeam =
      first_team.team_list_idx === teamIdx ? second_team : first_team;

    targetTeam.stats.match_team_stats_our_score =
      formData.match_team_stats_our_score;
    targetTeam.stats.match_team_stats_other_score =
      formData.match_team_stats_other_score;
    targetTeam.stats.match_team_stats_possession =
      formData.match_team_stats_possession;
    targetTeam.stats.match_team_stats_total_shot =
      formData.match_team_stats_total_shot;
    targetTeam.stats.match_team_stats_total_pass =
      formData.match_team_stats_total_pass;
    targetTeam.stats.match_team_stats_total_tackle =
      formData.match_team_stats_total_tackle;
    targetTeam.stats.match_team_stats_success_tackle =
      formData.match_team_stats_success_tackle;
    targetTeam.stats.match_team_stats_expected_goal =
      formData.match_team_stats_expected_goal;
    targetTeam.stats.match_team_stats_saved = formData.match_team_stats_saved;
    targetTeam.stats.match_team_stats_cornerkick =
      formData.match_team_stats_cornerkick;
    targetTeam.stats.match_team_stats_freekick =
      formData.match_team_stats_freekick;
    targetTeam.stats.match_team_stats_penaltykick =
      formData.match_team_stats_penaltykick;

    // Update the opponent's score based on the target team's score
    otherTeam.stats.match_team_stats_our_score =
      formData.match_team_stats_other_score;
    otherTeam.stats.match_team_stats_other_score =
      formData.match_team_stats_our_score;

    // Update the state with the new details
    setDisplayMatchDetail(newDetail);
  };

  return {
    displayMatchDetail,
    handleUpdateTeamStats,
  };
};

export default useManageChampionshipDetail;

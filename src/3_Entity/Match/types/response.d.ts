type MatchInfo = {
  match_match_idx: number;
  match_match_name: string;
  match_type_idx: number;
  team_list_idx: number | null;
  team_list_name: string | null;
  team_list_emblem: string | null;
  match_match_attribute: number;
  match_match_participation_type: number;
  player_list_idx: number;
  player_list_nickname: string;
  player_list_profile_image: string | null;
  match_match_start_time: string;
  common_status_idx: number;
  match_match_duration: { hours: number; minutes: number };
};

type StandbyPlayerInfo = {
  player_list_idx: number;
  player_list_nickname: string;
  player_list_profile_image: string | null;
  match_position_idx: number;
  team_list_idx: number;
  team_list_short_name: string;
  team_list_emblem: string | null;
};

type MatchDetail = {
  match_match_idx: number;
  match_match_name: string;
  player_list_idx: number;
  player_list_nickname: string;
  player_list_profile_image: string | null;
  match_formation_idx: number;
  match_position_idxs: number[];
  match_match_participation_type: number;
  match_type_idx: number;
  match_match_attribute: number;
  common_status_idx: number;
  match_match_start_time: string;
  match_match_duration: { hours: number; minutes?: number };
};

type MatchParticipant = {
  match_position_idx: number;
  player_list_idx: number;
  player_list_nickname: string;
  player_list_url: string;
};

type MatchWaitList = {
  match_waitlist: {
    [key: string]: {
      player_list_idx: number;
      player_list_nickname: string;
      player_list_url: string;
      match_waitlist_created_at: string;
    }[];
  };
};

type MatchFormData = {
  match_formation_idx: number;
  match_match_participation_type: number;
  match_type_idx: number;
  match_match_attribute: number;
  match_match_start_time: string;
  match_match_duration: string;
};

type MatchPlayerStat = {
  match_match_idx: number;
  player_list_idx: number;
  player_list_nickname: string;
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
  match_player_stats_evidence_img: string;
};
type MatchTeamStat = {
  match_team_stats_our_score: number | null;
  match_team_stats_other_score: number | null;
  match_team_stats_possession: number | null;
  match_team_stats_total_shot: number | null;
  match_team_stats_expected_goal: number | null;
  match_team_stats_total_pass: number | null;
  match_team_stats_total_tackle: number | null;
  match_team_stats_success_tackle: number | null;
  match_team_stats_saved: number | null;
  match_team_stats_cornerkick: number | null;
  match_team_stats_freekick: number | null;
  match_team_stats_penaltykick: number | null;
  mom_player_idx: number | null;
  mom_player_nickname: string | null;
};
type MatchStats = {
  team_stats: MatchTeamStat;
  player_stats: MatchPlayerStat[];
};

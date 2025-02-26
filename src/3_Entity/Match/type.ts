export type MatchInfo = {
  match_match_idx: number;
  match_type_idx: number;
  team_list_idx: number | null;
  match_match_attribute: number;
  match_match_participation_type: number;
  player_list_nickname: string;
  match_match_start_time: string;
  match_match_duration: string;
  common_status_idx: number;
};

export type WaitingPlayerInfo = {
  player_list_idx: number;
  player_list_platform: number;
  player_list_profile_img: string;
  player_list_nickname: string;
  player_prefer_position: string;
};

export type MatchDetail = {
  match_match_idx: number;
  match_type_idx: number;
  team_list_idx: number | null;
  match_match_attribute: number;
  match_match_participation_type: number;
  player_list_nickname: string;
  match_match_start_time: string;
  match_match_duration: string;
  common_status_idx: number;
  match_formation_idx: number;
  match_formation_position: number[];
  match_participant: {
    player_list_idx: number;
    player_list_nickname: string;
    match_position_idx: number;
    player_list_url: string;
  }[];
  match_waitlist: {
    [key: string]: {
      player_list_idx: number;
      player_list_nickname: string;
      player_list_url: string;
    }[];
  } | null;
  match_team_stats: {
    match_team_stats_our_score: number;
    match_team_stats_other_score: number;
    match_team_stats_possesion: number;
  } | null;
  match_player_stats: {
    [key: string]: {
      match_player_stats_goal: number;
      match_player_stats_assist: number;
    };
  } | null;
};

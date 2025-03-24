type ChampionshipInfo = {
  championship_type_name: string;
  championship_list_name: string;
  championship_list_description: string;
  match_type_idx: number;
  championship_list_throphy_img: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  common_status_idx: number;
  championship_list_color: string;
  winner_team_idx: number | null;
  winner_team_name: string | null;
  winner_team_emblem: string | null;
  winner_team_color: string | null;
};

type ChampionshipTeamInfo = {
  team_list_idx: number;
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_emblem: string;
};

type ChampionshipMatchList = {
  championship_match_idx: number;
  championship_match_first: {
    team_list_idx: number;
    championship_match_first_idx: number;
    team_list_name: string;
    team_list_short_name: string;
    team_list_color: string;
    team_list_emblem: string;
    match_team_stats_our_score: number;
    match_team_stats_other_score: number;
    common_status_idx: number;
  };
  championship_match_second: {
    team_list_idx: number;
    championship_match_second_idx: number;
    team_list_name: string;
    team_list_short_name: string;
    team_list_color: string;
    team_list_emblem: string;
    match_team_stats_our_score: number;
    match_team_stats_other_score: number;
    common_status_idx: number;
  };
};

type PlayerStats = {
  match_player_stats_idx: number;
  player_list_nickname: string;
  match_player_stats_goal: number;
  match_player_stats_assist: number;
  match_player_stats_successrate_pass: number;
  match_player_stats_successrate_dribble: number;
  match_player_stats_successrate_tackle: number;
  match_player_stats_possession: number;
  match_player_stats_evidence_img: string;
  match_player_stats_standing_tackle: number;
  match_player_stats_sliding_tackle: number;
  match_player_stats_cutting: number;
  match_player_stats_saved: number;
  match_player_stats_successrate_saved: number;
  championship_match_idx: number;
  championship_list_idx: number;
  match_match_idx: number;
  player_list_idx: number;
  match_player_stats_possition: number;
};

type TeamStat = {
  match_team_stats_our_score: number;
  match_team_stats_other_score: number;
  match_team_stats_possession: number;
  match_team_stats_total_shot: number;
  match_team_stats_expected_goal: number;
  match_team_stats_total_pass: number;
  match_team_stats_total_tackle: number;
  match_team_stats_success_tackle: number;
  match_team_stats_saved: number;
  match_team_stats_cornerkick: number;
  match_team_stats_freekick: number;
  match_team_stats_penaltykick: number;
  mom_player_idx: number;
  mom_player_nickname: string;
};

type ChampionshipDetail = {
  championship_match_idx: number;
  championship_list_idx: number;
  match_info: {
    match_match_start_time: string;
    match_match_duration: {
      minutes: number;
    };
  };
  first_team: {
    team_list_idx: number;
    team_formation_idx: number;
    stats: TeamStat;
    player_stats: PlayerStats[];
  };
  second_team: {
    team_list_idx: number;
    team_formation_idx: number;
    stats: TeamStat;
    player_stats: PlayerStats[];
  };
};

type EvidenceImage = {
  championship_match_idx: number;
  first_match_idx: number;
  second_match_idx: number;
  first_team_evidence: {
    match_match_idx: number;
    team_list_idx: number;
    match_team_stats_evidence_img: string;
  }[];
  second_team_evidence: {
    match_match_idx: number;
    team_list_idx: number;
    match_team_stats_evidence_img: string;
  }[];
  player_evidence: {
    match_match_idx: number;
    player_list_idx: number;
    player_list_nickname: string;
    match_player_stats_evidence_img: string;
  }[];
};

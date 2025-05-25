type ChampionshipInfo = {
  community_list_idx: number;
  championship_type_idx: number;
  championship_list_name: string;
  championship_list_description: string;
  match_type_idx: number;
  championship_list_throphy_img: string | null;
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

type ChampionshipMatchFirst = {
  match_match_idx: number;
  team_list_idx: number;
  championship_match_first_idx: number;
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_emblem: string;
  match_team_stats_our_score: number | null;
  match_team_stats_other_score: number | null;
  common_status_idx: number;
};
type ChampionshipMatchSecond = {
  match_match_idx: number;
  team_list_idx: number;
  championship_match_second_idx: number;
  team_list_name: string;
  team_list_short_name: string;
  team_list_color: string;
  team_list_emblem: string;
  match_team_stats_our_score: number | null;
  match_team_stats_other_score: number | null;
  common_status_idx: number;
};

type ChampionshipMatchList = {
  championship_match_idx: number;
  championship_match_first: ChampionshipMatchFirst;
  championship_match_second: ChampionshipMatchSecond;
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

type ChampionshipMatchDetail = {
  championship_match_idx: number;
  championship_list_idx: number;
  match_info: {
    match_match_start_time: string;
    match_match_duration: {
      minutes: number;
    };
    first_match_formation_idx: number;
    second_match_formation_idx: number;
  };
  first_team: {
    team_list_idx: number | null;
    stats: TeamStats;
    player_stats: PlayerStats[];
  };
  second_team: {
    team_list_idx: number | null;
    stats: TeamStats;
    player_stats: PlayerStats[];
  };
};

type TeamStats = {
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

type PlayerStats = {
  championship_match_idx: number;
  championship_list_idx: number;
  match_player_stats_idx: number;
  match_match_idx: number;
  player_list_idx: number;
  player_list_nickname: string;
  match_position_idx: number;
  match_player_stats_evidence_img: string | null;
  match_player_stats_goal: number | null;
  match_player_stats_assist: number | null;
  match_player_stats_successrate_pass: number | null;
  match_player_stats_successrate_dribble: number | null;
  match_player_stats_successrate_tackle: number | null;
  match_player_stats_possession: number | null;
  match_player_stats_standing_tackle: number | null;
  match_player_stats_sliding_tackle: number | null;
  match_player_stats_cutting: number | null;
  match_player_stats_saved: number | null;
  match_player_stats_successrate_saved: number | null;
};

type ChampionshipEndData = {
  teams: EndTeamInfo[];
  players: EndPlayerStatas[];
  awards: EndAwards[];
};

type EndPlayerStatas = {
  team_list_idx: number;
  player_list_idx: number;
  player_list_nickname: string;
};

type EndAwards = {
  championship_award_idx: number;
  championship_award_name: string;
  championship_award_throphy_image: string;
};

type EndTeamInfo = { team_list_idx: number; team_list_name: string };

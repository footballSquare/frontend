type useGetMatchDetailProps = {
  matchIdx: number;
};

type useGetMatchParticipantsProps = {
  matchIdx: number;
};

type uesGetMatchWaitListProps = {
  matchIdx: number;
};

type UseGetOpenMatchListProps = {
  page: number;
};

type UseGetMatchStatsProps = {
  matchIdx: number;
};

type UseGetStandbyListProps = {
  page: number;
};

type useGetTeamMatchListProps = {
  page: number;
  teamIdx: number;
};

type UsePostTeamMatchProps = {
  teamIdx: number | null;
};

type PostTeamMatchProps = {
  match_formation_idx: number;
  match_match_participation_type: number;
  match_type_idx: number;
  match_match_start_time: string;
  match_match_duration: { hours: number; minutes: number };
};

type PostOpenMatchProps = {
  match_formation_idx: number;
  match_match_participation_type: number;
  match_type_idx: number;
  match_match_start_time: string;
  match_match_duration: { hours: number; minutes: number };
};

type PutMatchEndProps = {
  matchIdx: number;
};

type DeleteMatchProps = {
  matchIdx: number;
};

type PutOpenMatchJoinProps = {
  matchIdx: number;
  matchPositionIdx: number;
};

type DeleteMatchJoinProps = {
  matchIdx: number;
  userIdx: number;
};

type PostMatchApprovalProps = {
  matchIdx: number;
  userIdx: number;
  matchPositionIdx: number;
};

type PutTeamMatchJoinProps = {
  matchIdx: number;
  matchPositionIdx: number;
  teamIdx: number;
};

type PostTeamStatProps = {
  matchIdx: number;
  teamStat: {
    match_team_stats_our_score: number;
    match_team_stats_other_score: number;
    match_team_stats_possesion: number;
    match_team_stats_total_shot: number;
    match_team_stats_expected_goal: number;
    match_team_stats_total_pass: number;
    match_team_stats_total_tackle: number;
    match_team_stats_success_tackle: number;
    match_team_stats_saved: number;
    match_team_stats_cornerkick: number;
    match_team_stats_freekick: number;
    match_team_stats_penaltykick: number;
    file: file;
    mom: number;
  };
};

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
  teamIdx: number;
};

type PostTeamMatchProps = {
  match_formation_idx: number;
  match_match_participation_type: number;
  match_type_idx: number;
  match_match_attribute: number;
  match_match_start_time: string;
  match_match_duration: string;
};

type PostOpenMatchProps = {
  match_formation_idx: number;
  match_match_participation_type: number;
  match_type_idx: number;
  match_match_start_time: string;
  match_match_duration: string;
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

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

type PutTeamMatchJoinProps = {
  matchIdx: number;
  matchPositionIdx: number;
  teamIdx: number;
}
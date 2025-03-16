export type useGetMatchDetailProps = {
  matchIdx: number;
};

export type useGetMatchParticipantsProps = {
  matchIdx: number;
};

export type uesGetMatchWaitListProps = {
  matchIdx: number;
};

export type PostTeamMatchProps = {
  match_formation_idx: number;
  match_match_participation_type: number;
  match_type_idx: number;
  match_match_attribute: number;
  match_match_start_time: string;
  match_match_duration: string;
};

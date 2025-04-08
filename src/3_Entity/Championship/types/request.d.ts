type UsePostCreateChampionshipMatchProps = {
  first_team_idx: number;
  second_team_idx: number;
  match_match_start_time: string;
};

type UsePutChampionshipEndProps = {
  winner_team_idx: number;
  awards: PutChampionshipEndAward[];
};

type PutChampionshipEndAward = {
  championship_award_idx: number;
  championship_winner_idxs: number[];
};

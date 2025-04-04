type UsePostCreateChampionshipMatchProps = {
  first_team_idx: number;
  second_team_idx: number;
  match_match_start_time: string;
};

type UsePutChampionshipEndProps = {
  team_list_idx: number;
  player_list_idx: number;
};

type ee = {
  winner_team_idx: STRING;
  award: [
    {
      championship_award_idx: INT;
      championship_winner_idxs: ARRAY;
    },
    {
      championship_award_idx: INT;
      championship_winner_idxs: ARRAY;
    }
  ];
};

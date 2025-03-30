type UsePostCreateChampionshipMatchProps = {
  first_team_idx: number;
  second_team_idx: number;
  match_match_start_time: string;
};

type UsePutChampionshipEndProps = {
  championship_list_name: number;
  championship_list_description: number;
  championship_list_throphy_img: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  championship_list_color: string;
  participation_team: number[];
};

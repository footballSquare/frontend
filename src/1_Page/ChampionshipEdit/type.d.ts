type Award = {
  name: string;
};

type ChampionshipFormValues = {
  championship_type_idx: number;
  championship_list_name: string;
  championship_list_description: string;
  championship_list_throphy_img: (File | undefined)[];
  championship_list_color: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  participation_team_idxs: number[];
  community_list_idx: number;
};

type ChampionshipEditTab = "basic" | "teams" | "awards" | "dates";

type Award = {
  name: string;
};

type ChampionshipFormValues = {
  community_list_idx: number;
  championship_type_idx: number;
  championship_list_name: string;
  championship_list_description: string;
  championship_list_color: string;
  championship_list_start_date: string;
  championship_list_end_date: string;
  participation_team_idxs: number[];
  championship_award_name: { value: string }[];
  file: File[];
};

type ChampionshipEditTab = "basic" | "teams" | "awards" | "dates";

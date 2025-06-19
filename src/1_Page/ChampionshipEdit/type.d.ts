type Award = {
  name: string;
};

type AwardForm = {
  championship_award_name: string;
  files: File;
};

// 수정된 ChampionshipFormValues 타입
type ChampionshipFormValues = {
  // basic tab
  championship_list_name: string;
  championship_type_idx: number;
  championship_trophy_img: File;
  championship_list_color: string;
  championship_list_description: string;

  // 수상 탭
  championship_award: AwardForm[]; // 어워드 항목을 배열로 관리

  // 팀 탭
  participation_team_idxs: number[];
  team_all_success: boolean;

  // 데이트 탭
  championship_list_start_date: string;
  championship_list_end_date: string;
};

type ChampionshipEditTab = "basic" | "teams" | "awards" | "dates";

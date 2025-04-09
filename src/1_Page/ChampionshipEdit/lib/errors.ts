import { FieldErrors } from "react-hook-form";

export const errorLocationDetector = (
  errors: FieldErrors<ChampionshipFormValues>
) => {
  const errorKeys = Object.keys(errors);
  if (errorKeys.length > 0) {
    const firstErrorKey = errorKeys[0]; // 애러 스택중 가장 첫번째
    const firstErrorTab =
      fieldTabMap[firstErrorKey as keyof ChampionshipFormValues];
    return firstErrorTab;
  }
};

const fieldTabMap: Record<keyof ChampionshipFormValues, ChampionshipEditTab> = {
  // -- 기본 정보 (basic)
  championship_type_idx: "basic",
  championship_list_name: "basic",
  championship_list_description: "basic",
  championship_list_color: "basic",
  championship_trophy_img: "basic",

  // -- 팀 선택 (teams)
  participation_team_idxs: "teams",
  team_all_success: "teams",

  // -- 수상 항목 (awards)
  championship_award: "awards",
  // -- 일정/설정 (dates)
  championship_list_start_date: "dates",
  championship_list_end_date: "dates",
};

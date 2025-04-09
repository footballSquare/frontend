export const CHAMPIONSHIP_EDIT_TAB = {
  BASIC: "basic",
  TEAMS: "teams",
  AWARDS: "awards",
  DATES: "dates",
} as const;

export const fieldTabMap: Record<
  keyof ChampionshipFormValues,
  ChampionshipEditTab
> = {
  // -- 기본 정보 (basic)
  community_list_idx: "basic",
  championship_type_idx: "basic",
  championship_list_name: "basic",
  championship_list_description: "basic",
  championship_list_color: "basic",

  // -- 팀 선택 (teams)
  participation_team_idxs: "teams",

  // -- 수상 항목 (awards)
  championship_award: "awards",
  // -- 일정/설정 (dates)
  championship_list_start_date: "dates",
  championship_list_end_date: "dates",
};

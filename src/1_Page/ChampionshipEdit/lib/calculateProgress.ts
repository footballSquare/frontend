import { UseFormWatch } from "react-hook-form";

import { FieldArrayWithId } from "react-hook-form";

type FieldsType = FieldArrayWithId<
  ChampionshipFormValues,
  "championship_award",
  "id"
>[];

// 진행 상태 계산
export const calculateProgress = (
  watch: UseFormWatch<ChampionshipFormValues>,
  fields: FieldsType
) => {
  let steps = 0;
  let completed = 0;

  // 기본 정보 확인
  steps++;
  if (
    watch("championship_list_name") &&
    watch("championship_type_idx") &&
    watch("championship_list_color")
  ) {
    completed++;
  }

  // 팀 선택 확인
  steps++;
  if (watch("participation_team_idxs").length > 0) {
    completed++;
  }

  // 수상 항목 확인
  steps++;
  if (fields.length > 0) {
    completed++;
  }

  // 날짜 설정 확인
  steps++;
  if (
    watch("championship_list_start_date") &&
    watch("championship_list_end_date")
  ) {
    completed++;
  }

  return Math.floor((completed / steps) * 100);
};

export type MatchInfoProps = {
  match_match_idx: number; // 경기 식별자 (ID)
  match_type_idx: number; // 경기 유형 식별자
  team_list_idx: number; // 팀 목록 식별자
  match_match_attribute: number; // 경기 속성
  match_match_participation_type: number; // 참여 유형
  player_list_nickname: string; // 플레이어 닉네임
  match_match_start_time: string; // 경기 시작 시간 (ISO 날짜 문자열)
  match_match_duration: string; // 경기 지속 시간 (예: '2 hours')
  common_status_idx: number; // 공통 상태 식별자
};

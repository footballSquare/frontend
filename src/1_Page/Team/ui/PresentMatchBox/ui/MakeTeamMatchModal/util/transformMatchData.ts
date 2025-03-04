import { MatchDataInput } from "../type";
import {
  MatchFormData,
  MatchInfo,
} from "../../../../../../../3_Entity/Match/type";

export const transformMatchData = (data: MatchDataInput): MatchFormData => {
  const {
    match_match_start_date,
    match_match_start_hour,
    match_match_start_min,
    match_type_idx_radio,
    match_match_participation_type_radio,
    ...rest
  } = data;

  return {
    ...rest,
    match_formation_idx: Number(data.match_formation_idx),
    match_match_participation_type: Number(
      match_match_participation_type_radio
    ),
    match_type_idx: Number(match_type_idx_radio),
    match_match_attribute: Number(data.match_match_attribute),
    match_match_start_time: `${match_match_start_date} ${match_match_start_hour}:${match_match_start_min}`,
  };
};

export const transformMatchInfo = (
  data: MatchDataInput,
  {
    player_list_nickname,
    team_list_idx,
    match_match_idx,
  }: {
    player_list_nickname: string;
    team_list_idx: number;
    match_match_idx: number;
  }
): MatchInfo => {
  const {
    match_match_start_date,
    match_match_start_hour,
    match_match_start_min,
    match_type_idx_radio,
    match_match_participation_type_radio,
    match_match_duration, // 지속 시간도 필요하다고 가정합니다.
    ...rest
  } = data;

  return {
    ...rest,
    match_match_idx: Number(match_match_idx), // 매치 고유 ID
    match_type_idx: Number(match_type_idx_radio), // 매치 타입
    team_list_idx: Number(team_list_idx), // 팀 리스트 ID
    match_match_attribute: Number(data.match_match_attribute), // 매치 특성
    match_match_participation_type: Number(
      match_match_participation_type_radio
    ), // 참가 타입
    player_list_nickname, // 플레이어의 닉네임
    match_match_start_time: `${match_match_start_date} ${match_match_start_hour}:${match_match_start_min}`, // 매치 시작 시간
    match_match_duration, // 매치 지속 시간
    common_status_idx: 0, // 매치 상태
  };
};

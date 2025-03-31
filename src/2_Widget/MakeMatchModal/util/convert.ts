import { matchDuration } from "../../../4_Shared/constant/matchDuration";
import { toFormattedDate } from "../../../4_Shared/lib/dateFormatter";

export const convertToPostMatchProps = (
  data: MatchDataForm
): PostTeamMatchProps => {
  const {
    match_match_start_date,
    match_match_start_hour,
    match_match_start_min,
    match_match_duration,
    match_match_participation_type_radio,
    match_formation_idx,
    match_type_idx_radio,
  } = data;

  return {
    match_formation_idx,
    match_type_idx: Number(match_type_idx_radio),
    match_match_participation_type: Number(
      match_match_participation_type_radio
    ),
    match_match_duration,
    match_match_start_time: `${match_match_start_date} ${match_match_start_hour}:${match_match_start_min}`,
  };
};

export const convertToPostOpenMatchProps = (
  data: MatchDataForm
): PostOpenMatchProps => {
  const {
    match_match_start_date,
    match_match_start_hour,
    match_match_start_min,
    match_type_idx_radio,
    match_match_participation_type_radio,
    match_match_duration,
    match_formation_idx,
  } = data;
  return {
    match_formation_idx,
    match_match_participation_type: Number(
      match_match_participation_type_radio
    ),
    match_type_idx: Number(match_type_idx_radio),
    match_match_start_time: `${match_match_start_date} ${match_match_start_hour}:${match_match_start_min}`,
    match_match_duration,
  };
};

export const convertToMatchInfo = (props: MatchDataFormWithIdx): MatchInfo => {
  const {
    match_match_start_date,
    match_match_start_hour,
    match_match_start_min,
    match_type_idx_radio,
    match_match_participation_type_radio,
    match_match_duration,
    team_list_idx,
  } = props;

  return {
    match_match_idx: 0,
    match_type_idx: Number(match_type_idx_radio),
    team_list_idx,
    team_list_name: "",
    team_list_emblem: null,
    match_match_attribute: 0,
    match_match_participation_type: Number(
      match_match_participation_type_radio
    ),
    player_list_idx: 0,
    player_list_nickname: "",
    player_list_profile_image: null,
    match_match_start_time: `${match_match_start_date} ${match_match_start_hour}:${match_match_start_min}`,
    common_status_idx: 0,
    match_match_duration,
  };
};

export const convertToMatchDataForm = (
  today: Date,
  hour: string,
  min: string
): MatchDataForm => {
  return {
    match_match_start_date: toFormattedDate(today),
    match_match_start_time: `${hour}:${min}`,
    match_match_start_hour: hour,
    match_match_start_min: min,
    match_type_idx_radio: "0",
    match_match_participation_type_radio: "1",
    match_match_duration: matchDuration[1],
    match_formation_idx: 0,
  };
};

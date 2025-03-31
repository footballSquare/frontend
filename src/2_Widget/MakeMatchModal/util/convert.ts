export const convertToPostMatchProps = (
  data: MatchDataForm
): PostTeamMatchProps => {
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

import { matchDuration } from "../../../4_Shared/constant/matchDuration";
import { toFormattedDate } from "../../../4_Shared/lib/dateFormatter";

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
    match_match_attribute: 0,
    match_type_idx_radio: "0",
    match_match_participation_type_radio: "1",
    match_match_duration: matchDuration[1],
    match_formation_idx: 0,
  };
};

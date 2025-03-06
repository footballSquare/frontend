import { matchDuration } from "../../../../../../../4_Shared/constant/matchDuration";
import { toFormattedDate } from "../../../../../../../4_Shared/lib/dateFormatter";
import { MatchDataInput } from "../type";

export const createMatchDefault = (
  today: Date,
  hour: string,
  min: string
): MatchDataInput => {
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

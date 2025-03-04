import { MatchDatIaInput } from "../type";
import { MatchFormData } from "../../../../../../../3_Entity/Match/type";

const transformMatchData = (data: MatchDatIaInput): MatchFormData => {
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
export default transformMatchData;

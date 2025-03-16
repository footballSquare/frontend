import * as yup from "yup";
import { isPastTimeValidation } from "../../../../../../../4_Shared/util/inputValidator";

export const schema = yup.object().shape({
  match_match_start_date: yup
    .string()
    .required("날짜를 선택해야 합니다.")
    .test("is-not-past-date", "과거 날짜는 선택할 수 없습니다.", (date) =>
      date
        ? isPastTimeValidation({
            key: "match_match_start_date",
            value: date,
          }) === null
        : false
    ),

  match_match_start_hour: yup.string().required("시간을 선택해야 합니다."),

  match_match_start_min: yup.string().required("분을 선택해야 합니다."),

  match_match_start_time: yup
    .string()
    .required("시간을 선택해야 합니다.")
    .test(
      "is-not-past-time",
      "과거 시간은 선택할 수 없습니다.",
      (_, { parent }) => {
        const {
          match_match_start_date,
          match_match_start_hour,
          match_match_start_min,
        } = parent;
        if (
          !match_match_start_date ||
          !match_match_start_hour ||
          !match_match_start_min
        )
          return false;

        return (
          isPastTimeValidation(
            { key: "match_match_start_date", value: match_match_start_date },
            {
              key: "match_match_start_time",
              value: `${match_match_start_hour}:${match_match_start_min}`,
            }
          ) === null
        );
      }
    ),

  match_match_attribute: yup.number().required("매치 속성을 선택해야 합니다."),

  match_type_idx_radio: yup.string().required("매치 종류를 선택해야 합니다."),

  match_match_participation_type_radio: yup
    .string()
    .required("참여 방식을 선택해야 합니다."),

  match_match_duration: yup
    .string()
    .required("매치 지속 시간을 선택해야 합니다."),

  match_formation_idx: yup.number().required("포메이션을 선택해야 합니다."),
});

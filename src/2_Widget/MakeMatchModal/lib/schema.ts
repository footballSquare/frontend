import * as yup from "yup";
import { isPastTime } from "../../../4_Shared/lib/timeChecker";

export const schema = yup.object().shape({
  match_match_start_date: yup
    .string()
    .required("날짜를 선택해야 합니다.")
    .test("is-valid-date", "과거 날짜는 선택할 수 없습니다.", function (value) {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      // 오늘 날짜의 00:00:00으로 세팅
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),

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
        ) {
          return false;
        }
        const givenTime = `${match_match_start_date} ${match_match_start_hour}:${match_match_start_min}`;
        return !isPastTime(givenTime);
      }
    ),

  match_type_idx_radio: yup.string().required("매치 종류를 선택해야 합니다."),

  match_match_participation_type_radio: yup
    .string()
    .required("참여 방식을 선택해야 합니다."),

  match_match_duration: yup
    .string()
    .required("매치 지속 시간을 선택해야 합니다."),

  match_formation_idx: yup.number().required("포메이션을 선택해야 합니다."),

  match_match_name: yup
    .string()
    .required("매치 제목을 입력해야 합니다.")
    .max(30, "매치 제목은 30자 이하여야 합니다."),
});

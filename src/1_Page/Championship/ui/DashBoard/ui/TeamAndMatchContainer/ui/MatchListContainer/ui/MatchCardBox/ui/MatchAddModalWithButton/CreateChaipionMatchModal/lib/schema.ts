import * as yup from "yup";
import { isPastTime } from "../../../../../../../../../../../../../../4_Shared/lib/timeChecker";

export const schema = yup.object().shape({
  teams: yup
    .array()
    .of(yup.number().required())
    .min(2, "팀 두개 필수입니다.")
    .required(),
  matchDate: yup
    .string()
    .required("날짜 선택은 필수입니다.")
    .test(
      "is-date",
      "유효한 날짜를 입력해주세요",
      (value) => !!value && !isNaN(Date.parse(value)) && isPastTime(value)
    ),
  startTime: yup
    .string()
    .required("시작 시각 선택은 필수입니다.")
    .test("is-valid-time", "과거 시간은 선택할 수 없습니다.", function (value) {
      const { matchDate } = this.parent;
      if (!matchDate || !value) return false;
      const combinedTime = new Date(`${matchDate}T${value}:00`);
      // 결합한 날짜/시간이 현재 시간보다 미래여야 유효
      return combinedTime >= new Date();
    }),
});

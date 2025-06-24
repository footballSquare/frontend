import * as yup from "yup";

export const postChampionshipMatchSchema = yup.object().shape({
  teams: yup
    .array()
    .of(yup.number().required())
    .min(2, "팀 두개 필수입니다.")
    .required(),
  matchDate: yup
    .string()
    .required("날짜 선택은 필수입니다.")
    .test("is-valid-date", "과거 날짜는 선택할 수 없습니다.", function (value) {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      // 오늘 날짜의 00:00:00으로 세팅
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
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

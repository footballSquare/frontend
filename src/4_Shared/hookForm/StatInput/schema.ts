import * as yup from "yup";

const statInputschema = yup.object().shape({
  evidence: yup.string().required("증빙자료는 필수 항목입니다."),
  goals: yup.number().required("득점은 필수 항목입니다.").min(0),
  assists: yup
    .number()
    .required("어시스트는 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요.")
    .max(100, "0~100 사이의 숫자만 입력해주세요."),
  passAccuracy: yup
    .number()
    .required("패스 정확도는 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요.")
    .max(100, "0~100 사이의 숫자만 입력해주세요."),
  tackleAccuracy: yup
    .number()
    .required("태클 정확도는 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요.")
    .max(100, "0~100 사이의 숫자만 입력해주세요."),
  possession: yup
    .number()
    .required("볼 점유율은 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요.")
    .max(100, "0~100 사이의 숫자만 입력해주세요."),
  standingTackles: yup
    .number()
    .required("스탠딩 태클 성공은 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요."),
  slidingTackles: yup
    .number()
    .required("슬라이딩 태클 성공은 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요."),
  interceptions: yup
    .number()
    .required("가로채기는 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요."),
  saves: yup
    .number()
    .required("선방은 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요."),
  saveSuccessRate: yup
    .number()
    .required("선방 성공률은 필수 항목입니다.")
    .min(0, "0~100 사이의 숫자만 입력해주세요.")
    .max(100, "0~100 사이의 숫자만 입력해주세요."),
});

export default statInputschema;

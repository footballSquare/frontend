import * as Yup from "yup";
// Yup validation schema
export const autoMatchScehma = Yup.object({
  autoMatch: Yup.boolean().required(),
  matchAttribute: Yup.number().required("매치 속성을 선택하세요."),
  gameType: Yup.string().required("게임 종류를 선택하세요."),
  startTime: Yup.string().required("시작 시간을 선택하세요."),
  duration: Yup.string().required("진행 시간을 선택하세요."),
  participationMode: Yup.number().required("참여 방식을 선택하세요."),
  formation: Yup.number().required("포메이션을 선택하세요."),
});

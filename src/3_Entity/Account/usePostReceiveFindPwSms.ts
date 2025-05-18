import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostReceiveFindPwSms = (): [
  (props: PostReceiveFindPwSmsProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postReceiveFindPwSms = (props: PostReceiveFindPwSmsProps) => {
    const { phone } = props;
    request("POST", `/account/sms/search_pw/send`, { phone }, false);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("인증번호가 발송되었습니다.");
          break;
        case 400:
          alert("전화번호를 다시 입력해주세요.");
          break;
        case 429:
          alert("하루 인증 가능 횟수를 초과했습니다.");
          break;
        default:
          alert("잠시후에 다시 시도해 주세요.");
      }
    }
  }, [loading, serverState]);

  return [postReceiveFindPwSms];
};

export default usePostReceiveFindPwSms;

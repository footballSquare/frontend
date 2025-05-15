import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostReceiveAuthSms = (): [
  Record<string, unknown> | null,
  boolean,
  (props: PostReceiveAuthSmsProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postReceiveAuthSms = (props: PostReceiveAuthSmsProps) => {
    const { phone } = props;
    request("POST", `/account/sms/signup/send`, { phone }, false);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("인증번호가 발송되었습니다.");
          break;
        case 409:
          alert("이미 가입된 전화번호입니다.");
          break;
        case 429:
          alert("하루 인증 가능 횟수를 초과했습니다.");
          break;
        default:
          alert("잠시후에 다시 시도해 주세요.");
      }
    }
  }, [loading, serverState]);

  return [serverState, loading, postReceiveAuthSms];
};

export default usePostReceiveAuthSms;

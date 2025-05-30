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
        default:
          alert(serverState.message || "알 수 없는 오류가 발생했습니다.");
      }
    }
  }, [loading, serverState]);

  return [serverState, loading, postReceiveAuthSms];
};

export default usePostReceiveAuthSms;

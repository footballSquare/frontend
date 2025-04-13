import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostReceiveAuthSms = (): [
  (props: PostReceiveAuthSmsProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postReceiveAuthSms = (props: PostReceiveAuthSmsProps) => {
    const { phone } = props;
    request("POST", `account/sms/sen`, { phone }, false);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          break;
        default:
          alert("잠시후에 다시 시도해 주세요.");
      }
    }
  }, [loading, serverState]);

  return [postReceiveAuthSms];
};

export default usePostReceiveAuthSms;

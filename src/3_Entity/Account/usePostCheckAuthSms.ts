import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCheckAuthSms = (): [
  boolean,
  (props: PostCheckAuthSmsProps) => void
] => {
  const [serverState, request, loading] = useFetchData();
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const postCheckAuthSms = (props: PostCheckAuthSmsProps) => {
    const { phone, code } = props;
    request("POST", `/account/sms/signup/verify`, { phone, code }, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          setIsValid(true);
          alert("확인 되었습니다!");
          break;
        case 400:
          alert("인증번호가 유효하지 않습니다. 인증번호 재발급을 해주세요.");
          break;
        default:
          setIsValid(false);
          alert("다시 시도해주세요.");
      }
    }
  }, [loading, serverState]);

  return [isValid, postCheckAuthSms];
};

export default usePostCheckAuthSms;

import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostCheckFindIdSms = (): [
  (props: PostCheckFindIdSmsProps) => void
] => {
  const [serverState, request, loading] = useFetchData();

  const postCheckFindIdSms = (props: PostCheckFindIdSmsProps) => {
    const { phone, code } = props;
    request("POST", `/account/sms/search_id/verify`, { phone, code }, true);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert(`ID: ${(serverState as FoundId).data.id}`);
          break;
        case 400:
          alert("인증번호가 유효하지 않습니다.");
          break;
        case 404:
          alert("등록되지 않은 유저입니다.");
          break;
        default:
          alert("다시 시도해주세요.");
      }
    }
  }, [loading, serverState]);

  return [postCheckFindIdSms];
};

export default usePostCheckFindIdSms;

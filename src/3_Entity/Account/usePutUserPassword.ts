import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePutUserPassword = (): [
  (userInfo: PutUserPasswordProps) => void,
  Record<string, unknown> | null,
  boolean
] => {
  const [serverState, request, loading] = useFetchData();

  const putUserPassword = (props: PutUserPasswordProps) => {
    const { phone, id, password } = props;
    request("PUT", "/account/user/password", { phone, id, password }, false);
  };

    React.useEffect(() => {
      if (!loading && serverState) {
        switch (serverState.status) {
          case 200:
            alert("비밀번호 수정이 완료되었습니다.");
            break;
          default:
            alert("비밀번호 수정에 실패했습니다.");
        }
      }
    }, [loading, serverState]);

  return [putUserPassword, serverState, loading];
};

export default usePutUserPassword;

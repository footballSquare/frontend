import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useCookies } from "react-cookie";

const usePostTemporalSignUp = (): [
  (props: PostTemporalSignUpProps) => void
] => {
  const [serverState, request, loading] = useFetchData();
  const [, setCookie] = useCookies(["access_token"]);

  const postTemporalSignUp = (props: PostTemporalSignUpProps) => {
    const { id, password } = props;
    request("POST", `account/signup/logininfo`, { id, password }, false);
  };

  const options = { path: "/signup", maxAge: 86400 / 24 / 6 };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          if (
            typeof serverState.data === "object" &&
            serverState.data !== null &&
            "access_token_temporary" in serverState.data
          ) {
            setCookie(
              "access_token",
              serverState.data.access_token_temporary as string,
              options
            );
            console.log(serverState.data.access_token_temporary);
          } else {
            console.error("Unexpected serverState.data format");
          }
          alert("추가 정보를 입력해야 서비스를 이용할 수 있습니다.")
          break;
        default:
          alert("잠시후에 다시 시도해 주세요.");
      }
    }
  }, [loading, serverState]);

  return [postTemporalSignUp];
};

export default usePostTemporalSignUp;

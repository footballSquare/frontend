import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const usePostSignUp = (): [(props: PostSignUpProps) => void] => {
  const [serverState, request, loading] = useFetchData();

  const postSignUp = (props: PostSignUpProps) => {
    const {
      phone,
      nickname,
      platform,
      common_status_idx,
      message,
      discord_tag,
      match_position_idx,
    } = props;
    request(
      "POST",
      `account/signup/playerinfo`,
      {
        phone,
        nickname,
        platform,
        common_status_idx,
        message,
        discord_tag,
        match_position_idx,
      },
      true
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      switch (serverState.status) {
        case 200:
          alert("회원가입 완료!");
          break;
        default:
          alert("잠시후에 다시 시도해 주세요.");
      }
    }
  }, [loading, serverState]);

  return [postSignUp];
};

export default usePostSignUp;

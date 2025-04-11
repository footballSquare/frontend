import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
import { useCookies } from "react-cookie";

const usePostSignIn = (): [(props: PostSignInProps) => void] => {
  const [serverState, request, loading] = useFetchData();
  const { login } = useAuthStore();
  const postSignIn = (props: PostSignInProps) => {
    const { id, password } = props;
    request(
      "POST",
      `/account/signin`,
      {
        id: id,
        password: password,
      },
      false
    );
  };
  const [, setCookie] = useCookies(["access_token"]);

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState.status === 200) {
        const {
          player_status,
          access_token,
          user_idx,
          profile_image,
          team_idx,
          team_role_idx,
          community_role_idx,
        } = serverState.data as SignInData;
        login({
          playerStatus: player_status,
          accessToken: access_token,
          userIdx: user_idx,
          communityRoleIdx: community_role_idx,
          teamRoleIdx: team_role_idx,
          teamIdx: team_idx,
          profileImg: profile_image,
          nickname: null,
        });
        const options = { path: "/", maxAge: 86400 };
        setCookie("access_token", access_token, options);

        window.history.back();
      } else if (serverState.status === 400 || serverState.status === 404) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    }
  }, [loading, serverState]);

  return [postSignIn];
};

export default usePostSignIn;

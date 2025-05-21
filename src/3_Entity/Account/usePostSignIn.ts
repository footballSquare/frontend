import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState.status === 200) {
        const {
          player_status,
          user_idx,
          access_token_temporary,
          access_token,
          //nickname,
          //platform,
          //commmon_status_idx,
          //message,
          //discord_tag,
          profile_image,
          team_idx,
          team_role_idx,
          community_role_idx,
          community_list_idx,
        } = serverState.data as SignInData;

        if (player_status === "active") {
          login({
            playerStatus: player_status,
            accessToken: access_token || null,
            userIdx: user_idx,
            communityRoleIdx: community_role_idx || null,
            communityListIdx: community_list_idx || null,
            teamRoleIdx: team_role_idx || null,
            teamIdx: team_idx || null,
            profileImg: profile_image || null,
            nickname: null,
          });
          const options = { path: "/", maxAge: 86400 };
          setCookie("access_token", access_token, options);
          navigate("/");
        } else if (player_status === "pending") {
          const options = { path: "/signup", maxAge: 86400 / 24 / 6 };
          setCookie("access_token", access_token_temporary, options);
          navigate(`/signup`);
        }
      } else if (serverState.status === 400 || serverState.status === 404) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    }
  }, [loading, serverState]);

  return [postSignIn];
};

export default usePostSignIn;

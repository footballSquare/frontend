import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const usePostSignIn = (): [(props: PostSignInProps) => void] => {
  const [serverState, request, loading] = useFetchData();
  const { login } = useAuthStore();
  const [, setCookie] = useCookies(["access_token", "access_token_temporary"]);
  const navigate = useNavigate();

  const postSignIn = (props: PostSignInProps) => {
    const { id, password, signInPersist, deviceUUID } = props;
    request(
      "POST",
      `/account/signin`,
      signInPersist
        ? {
            id: id,
            password: password,
            persistent: signInPersist,
            device_uuid: deviceUUID,
          }
        : {
            id: id,
            password: password,
          },
      false
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState.status === 200) {
        const {
          player_status,
          user_idx,
          access_token_temporary,
          access_token,
          nickname,
          profile_image,
          team_idx,
          team_role_idx,
          community_role_idx,
          community_list_idx,
        } = serverState.data as SignInData;

        if (player_status === "active") {
          login({
            playerStatus: player_status,
            accessToken: access_token,
            userIdx: user_idx,
            communityRoleIdx: community_role_idx,
            communityListIdx: community_list_idx,
            teamRoleIdx: team_role_idx,
            teamIdx: team_idx,
            profileImg: profile_image,
            nickname: nickname,
          });
          setCookie("access_token", access_token, { path: "/", maxAge: 86400 });
          setTimeout(() => navigate("/"), 100);
        } else if (player_status === "pending") {
          setCookie("access_token_temporary", access_token_temporary, {
            path: "/signup",
            maxAge: 86400 / 24 / 6,
          });
          setTimeout(() => navigate("/signup"), 100);
        }
      } else {
        alert(serverState.message || "로그인에 실패했습니다.");
      }
    }
  }, [loading, serverState, login, setCookie, navigate]);

  return [postSignIn];
};

export default usePostSignIn;

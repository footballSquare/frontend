import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil.ts";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo.ts";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useGetDiscordSiginIn = (): [(props: GetDiscordSiginIn) => void] => {
  const [serverState, request, loading] = useFetchData();
  const { login } = useAuthStore();
  const [, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const getDiscordSiginIn = (props: GetDiscordSiginIn) => {
    const { code, state } = props;
    request(
      "GET",
      `/account/oauth/token/discord?code=${code}&state=${state}`,
      null,
      false
    );
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      console.log("serverState", serverState);
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
          console.log("pending");
          console.log(serverState);
          const options = { path: "/signup", maxAge: 86400 / 24 / 6 };
          setCookie("access_token", access_token_temporary, options);
          if (
            confirm(
              "가입이 완료되지 않았습니다. 가입 페이지로 이동하시겠습니까?"
            )
          ) {
            navigate("/signup");
          }
        }
      } else if (serverState.status === 400 || serverState.status === 404) {
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    }
  }, [loading, serverState]);

  return [getDiscordSiginIn];
};

export default useGetDiscordSiginIn;

import React from "react";
import useGetMyInfo from "../../3_Entity/Account/useGetMyInfo";
import { useAuthStore, useIsLogin } from "../../4_Shared/lib/useMyInfo";
import { useCookies } from "react-cookie";

const useLoadMyInfo = (): [MyInfo] => {
  const [myInfo, loading] = useGetMyInfo();
  const { login } = useAuthStore();
  const [cookies] = useCookies(["access_token"]);
  const [isLogin] = useIsLogin();

  React.useEffect(() => {
    if (!loading && myInfo && isLogin) {
      const {
        player_status,
        user_idx,
        profile_image,
        team_idx,
        community_role_idx,
        team_role_idx,
        nickname,
        community_list_idx,
      } = myInfo;
      login({
        playerStatus: player_status,
        accessToken: cookies.access_token,
        userIdx: user_idx,
        communityRoleIdx: community_role_idx,
        communityListIdx: community_list_idx,
        teamRoleIdx: team_role_idx,
        teamIdx: team_idx,
        profileImg: profile_image,
        nickname: nickname,
      });
    }
  }, [myInfo, loading, login, cookies.access_token, isLogin]);

  return [myInfo];
};

export default useLoadMyInfo;

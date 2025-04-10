import React from "react";
import useGetMyInfo from "../../3_Entity/Account/useGetMyInfo";
import { useAuthStore } from "../../4_Shared/lib/useMyInfo";
import { useCookies } from "react-cookie";

const useLoadMyInfo = (): [MyInfo] => {
  const [myInfo, loading] = useGetMyInfo();
  const { login } = useAuthStore();
  const [cookies] = useCookies(["access_token"]);

  React.useEffect(() => {
    if (!loading && myInfo) {
      const { player_status, user_idx, profile_image, team_idx, community_role_idx, team_role_idx } = myInfo;
      login({
        playerStatus: player_status,
        accessToken: cookies.access_token,
        userIdx: user_idx,
        communityRoleIdx: community_role_idx,
        teamRoleIdx: team_role_idx,
        teamIdx: team_idx,
        profileImg: profile_image,
      });
    }
  }, [myInfo, loading, login, cookies.access_token]);

  return [myInfo];
};

export default useLoadMyInfo;

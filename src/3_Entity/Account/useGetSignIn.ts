import React from "react";
import { useCookies } from "react-cookie";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { SignInEventProps } from "./types/request";

const useGetSignIn = (): [(props: SignInEventProps) => void] => {
  const [serverState, request, loading] = useFetchData();
  const [, setCookie] = useCookies([
    "player_status",
    "access_token",
    "user_idx",
    "profile_image",
    "team_idx",
    "team_role_idx",
    "community_role_idx",
  ]);

  const signInEvent = (props: SignInEventProps) => {
    const {id, password} = props;
    request("GET", `/account/signin?id=${id}&password=${password}`, null);
  };

  React.useEffect(() => {
    if (!loading && serverState) {
      if(serverState.status === 200){
        const {
          player_status,
          access_token,
          user_idx,
          profile_image,
          team_idx,
          team_role_idx,
          community_role_idx,
        } = serverState;
  
        const options = { path: "/", maxAge: 86400 };
  
        setCookie("player_status", player_status, options);
        setCookie("access_token", access_token, options);
        setCookie("user_idx", user_idx, options);
        setCookie("profile_image", profile_image, options);
        setCookie("team_idx", team_idx, options);
        setCookie("team_role_idx", team_role_idx, options);
        setCookie("community_role_idx", community_role_idx, options);
  
        window.history.back();
      } else if(serverState.status === 400 || serverState.status === 404){
        alert("아이디 또는 비밀번호를 확인해주세요.");
      }
    }
  }, [loading, serverState, setCookie]);

  return [signInEvent];
};

export default useGetSignIn;

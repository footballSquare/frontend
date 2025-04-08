import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const useIsLogin = (): [boolean] => {
  const [cookies] = useCookies(["access_token"]);
  return [!!cookies.access_token];
};

export const useMyCommunityRoleIdx = (): [number | null] => {
  const [cookies] = useCookies(["community_role_idx"]);
  return [cookies.community_role_idx];
};

export const useMyTeamRoleIdx = (): [number | null] => {
  const [cookies] = useCookies(["team_role_idx"]);
  return [cookies.team_role_idx];
};

export const useMyTeamIdx = (): [number | null] => {
  const [cookies] = useCookies(["team_idx"]);
  return [cookies.team_idx];
};

export const useMyUserIdx = (): [number | null] => {
  const [cookies] = useCookies(["user_idx"]);
  return [cookies.user_idx];
};

export const useLogout = (): [() => void] => {
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies([
    "access_token",
    "community_role_idx",
    "team_role_idx",
    "team_idx",
    "user_idx",
  ]);

  return [
    () => {
      removeCookie("access_token");
      removeCookie("community_role_idx");
      removeCookie("team_role_idx");
      removeCookie("team_idx");
      removeCookie("user_idx");
      navigate("/");
    },
  ];
};

export const useRemoveAllCookie = () => {
  const [, , removeCookie] = useCookies([
    "access_token",
    "community_role_idx",
    "team_role_idx",
    "team_idx",
    "user_idx",
    "profile_image",
    "player_status",
  ]);

  return [
    () => {
      removeCookie("access_token", { path: "/" });
      removeCookie("community_role_idx", { path: "/" });
      removeCookie("team_role_idx", { path: "/" });
      removeCookie("team_idx", { path: "/" });
      removeCookie("user_idx", { path: "/" });
      removeCookie("profile_image", { path: "/" });
      removeCookie("player_status", { path: "/" });
    },
  ];
};

export const useRemoveTeamCookie = (): [() => void] => {
  const [, , removeCookie] = useCookies(["team_role_idx", "team_idx"]);
  return [
    () => {
      removeCookie("team_role_idx", { path: "/" });
      removeCookie("team_idx", { path: "/" });
    },
  ];
};

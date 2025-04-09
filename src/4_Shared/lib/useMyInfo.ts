import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";

type AuthState = {
  playerStatus: string | null;
  accessToken: string | null;
  userIdx: number | null;
  communityRoleIdx: number | null;
  teamRoleIdx: number | null;
  teamIdx: number | null;
  profileImg: string | null;
  login: (data: {
    accessToken: string;
    userIdx: number;
    communityRoleIdx: number | null;
    teamRoleIdx: number | null;
    teamIdx: number | null;
    playerStatus: string;
    profileImg: string | null;
  }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  userIdx: null,
  communityRoleIdx: null,
  teamRoleIdx: null,
  teamIdx: null,
  playerStatus: null,
  profileImg: null,
  login: (data) => set({ ...data }),
  logout: () =>
    set({
      accessToken: null,
      userIdx: null,
      communityRoleIdx: null,
      teamRoleIdx: null,
      teamIdx: null,
      profileImg: null,
      playerStatus: null,
    }),
}));


// 로그인 여부 확인
export const useIsLogin = (): [boolean] => {
  const [cookies] = useCookies(["access_token"]);
  const accessToken = cookies.access_token;
  return [!!accessToken];
};

// 유저 인덱스
export const useMyUserIdx = (): [number | null] => {
  const userIdx = useAuthStore((state) => state.userIdx);
  return [userIdx];
};

// 커뮤니티 역할 인덱스
export const useMyCommunityRoleIdx = (): [number | null] => {
  const roleIdx = useAuthStore((state) => state.communityRoleIdx);
  return [roleIdx];
};

// 팀 역할 인덱스
export const useMyTeamRoleIdx = (): [number | null] => {
  const roleIdx = useAuthStore((state) => state.teamRoleIdx);
  return [roleIdx];
};

// 팀 인덱스
export const useMyTeamIdx = (): [number | null] => {
  const teamIdx = useAuthStore((state) => state.teamIdx);
  return [teamIdx];
};

export const useLogout = (): [() => void] => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["access_token"]);

  return [
    () => {
      logout();
      removeCookie("access_token", { path: "/" });
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

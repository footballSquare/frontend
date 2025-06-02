import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { encryptedStorage } from "./encryptedStorage";

type AuthState = {
  accessToken: string | null;
  userIdx: number | null;
  communityRoleIdx: number | null;
  teamRoleIdx: number | null;
  teamIdx: number | null;
  profileImg: string | null;
  nickname: string | null;
  communityListIdx: number | null;
  isHydrated: boolean; // persist 상태 확인용
  login: (data: {
    accessToken: string | null;
    userIdx: number;
    communityRoleIdx: number | null;
    communityListIdx: number | null;
    teamRoleIdx: number | null;
    teamIdx: number | null;
    playerStatus: string;
    profileImg: string | null;
    nickname: string | null;
  }) => void;
  logout: () => void;
  leaveTeam: () => void;
  setTeamRoleIdx: (teamRoleIdx: number | null) => void;
  setTeamIdx: (teamIdx: number | null) => void;
  setHydrated: () => void;
};

// 암호화된 storage 구현
const encryptedPersistStorage = createJSONStorage(() => ({
  getItem: (name: string) => encryptedStorage.getItem(name),
  setItem: (name: string, value: string) => encryptedStorage.setItem(name, value),
  removeItem: (name: string) => encryptedStorage.removeItem(name),
}));

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userIdx: null,
      communityRoleIdx: null,
      teamRoleIdx: null,
      teamIdx: null,
      profileImg: null,
      nickname: null,
      communityListIdx: null,
      isHydrated: false,
      login: (data) => set({ ...data }),
      logout: () =>
        set({
          accessToken: null,
          userIdx: null,
          communityRoleIdx: null,
          teamRoleIdx: null,
          teamIdx: null,
          profileImg: null,
          nickname: null,
          communityListIdx: null,
        }),
      leaveTeam: () =>
        set({
          teamRoleIdx: null,
          teamIdx: null,
        }),
      setTeamRoleIdx: (teamRoleIdx) => set({ teamRoleIdx }),
      setTeamIdx: (teamIdx) => set({ teamIdx }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'auth-storage',
      storage: encryptedPersistStorage,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
      // 민감하지 않은 정보만 저장
      partialize: (state) => ({
        userIdx: state.userIdx,
        communityRoleIdx: state.communityRoleIdx,
        teamRoleIdx: state.teamRoleIdx,
        teamIdx: state.teamIdx,
        profileImg: state.profileImg,
        nickname: state.nickname,
        communityListIdx: state.communityListIdx,
        // accessToken은 여전히 쿠키에만 저장
      }),
    }
  )
);

// 로그인 여부 확인
export const useIsLogin = (): [boolean] => {
  const [cookies] = useCookies(["access_token"]);
  const accessToken = cookies.access_token;
  const isCookieValid = document.cookie.includes("access_token=");
  if (location.pathname.startsWith("/signup")) return [false];
  return [!!accessToken && isCookieValid];
};

// 유저 인덱스
export const useMyUserIdx = (): [number | null] => {
  const userIdx = useAuthStore((state) => state.userIdx);
  return [userIdx];
};

// 유저 닉네임
export const useMyNickname = (): [string | null] => {
  const nickname = useAuthStore((state) => state.nickname);
  return [nickname];
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

export const useMyProfileImg = (): [string | null] => {
  const profileImg = useAuthStore((state) => state.profileImg);
  return [profileImg];
};

export const useMyCommunityListIdx = (): [number | null] => {
  const communityListIdx = useAuthStore((state) => state.communityListIdx);
  return [communityListIdx];
};

// hydration 상태 확인
export const useIsHydrated = (): [boolean] => {
  const isHydrated = useAuthStore((state) => state.isHydrated);
  return [isHydrated];
};

export const useLogout = (): [() => void] => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["access_token"]);

  return [
    () => {
      logout();
      removeCookie("access_token", { path: "/" });
      encryptedStorage.clear(); // 암호화된 storage도 클리어
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
      encryptedStorage.clear();
    },
  ];
};

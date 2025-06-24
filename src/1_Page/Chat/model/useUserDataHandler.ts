import { useAuthStore, useIsLogin } from "../../../4_Shared/lib/useMyInfo";

const useUserDataHandler = () => {
  const [isLogin] = useIsLogin();
  const profileImg = useAuthStore((state) => state.profileImg);
  const nickname = useAuthStore((state) => state.nickname);

  return {
    profileImg,
    nickname,
  };
};

export default useUserDataHandler;

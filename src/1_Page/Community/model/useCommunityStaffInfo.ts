import React from "react";
import {
  useIsLogin,
  useMyCommunityListIdx,
  useMyCommunityRoleIdx,
} from "../../../4_Shared/lib/useMyInfo";

const useCommunityStaffInfo = (
  props: UseCommunityStaffInfoProps
): [
  isCommunityStaff: boolean,
  myCommunityRoleIdx: number | null,
  myCommunityIdx: number | null
] => {
  const { communityIdx } = props;
  const [myCommunityRoleIdx] = useMyCommunityRoleIdx();
  const [myCommunityIdx] = useMyCommunityListIdx();
  const [isCommunityStaff, setIsCommunityStaff] =
    React.useState<boolean>(false);
  const [isLogin] = useIsLogin();

  React.useEffect(() => {
    /*
      커뮤니티 스태프 여부를 판단하는 로직
      - 현재 커뮤니티 인덱스와 내 커뮤니티 인덱스가 같고,
      - 내 커뮤니티 역할 인덱스가 0(관리자) 또는 1(운영진)일 때 스태프로 간주
      - 로그인 상태여야 함
    */
    setIsCommunityStaff(
      myCommunityIdx === communityIdx &&
        (myCommunityRoleIdx === 0 || myCommunityRoleIdx === 1) &&
        isLogin
    );
  }, [communityIdx, myCommunityIdx, myCommunityRoleIdx, isLogin]);
  return [isCommunityStaff, myCommunityRoleIdx, myCommunityIdx];
};

export default useCommunityStaffInfo;

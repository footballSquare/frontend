import React from "react";
import {
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

  React.useEffect(() => {
    setIsCommunityStaff(
      myCommunityIdx === communityIdx &&
        (myCommunityRoleIdx === 0 || myCommunityRoleIdx === 1)
    );
    console.log(isCommunityStaff, myCommunityRoleIdx, myCommunityIdx);
  }, [communityIdx, myCommunityIdx, myCommunityRoleIdx]);
  return [isCommunityStaff, myCommunityRoleIdx, myCommunityIdx];
};

export default useCommunityStaffInfo;

import React from "react";
import useIsCommunityStaffStore from "../../../../../4_Shared/zustand/useIsCommunityStaffStore";
import { useMyUserIdx } from "../../../../../4_Shared/lib/useMyInfo";

const useIsCommunityStaff = (
  communityStaffList: CommunityStaff[]
): [boolean] => {
  const [userIdx] = useMyUserIdx();
  const { isCommunityStaff, setIsCommunityStaff } = useIsCommunityStaffStore();

  React.useEffect(() => {
    setIsCommunityStaff(
      communityStaffList.some(
        (elem) =>
          elem.player_list_idx === userIdx
      )
    );
  }, [communityStaffList, setIsCommunityStaff, userIdx]);

  return [isCommunityStaff];
};

export default useIsCommunityStaff;

import { mockCommunityStaffList } from "../../4_Shared/mock/communityStaffList";
import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetCommunityStaffList = (
  props: UseGetCommunityStaffListProps
): [
  CommunityStaff[],
  React.Dispatch<React.SetStateAction<CommunityStaff[]>>,
  boolean
] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [communityStaffList, setCommunityStaffList] = React.useState<
    CommunityStaff[]
  >(mockCommunityStaffList.community_staff);

  React.useEffect(() => {
    request("GET", `/community/${communityIdx}/staff`, null, false);
  }, [communityIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityStaffList(
        (serverState as { community_staff: CommunityStaff[] }).community_staff
      );
    }
  }, [loading, serverState]);

  return [communityStaffList, setCommunityStaffList, loading];
};

export default useGetCommunityStaffList;

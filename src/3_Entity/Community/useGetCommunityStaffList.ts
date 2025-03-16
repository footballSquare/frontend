import { mockCommunityStaffList } from "../../4_Shared/mock/communityStaffList";
import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";

const useGetCommunityStaffList = (
  props: UseGetCommunityStaffListProps
): [CommunityStaff[], boolean] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetch();
  const [communityStaffList, setCommunityStaffList] = React.useState<
    CommunityStaff[]
  >(mockCommunityStaffList.community_staff);

  React.useEffect(() => {
    request(mockCommunityStaffList);
  }, [communityIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityStaffList(
        (serverState as { community_staff: CommunityStaff[] }).community_staff
      );
    }
  }, [loading, serverState]);

  return [communityStaffList, loading];
};

export default useGetCommunityStaffList;

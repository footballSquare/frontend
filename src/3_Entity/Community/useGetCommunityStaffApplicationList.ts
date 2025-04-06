import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetCommunityStaffApplicationList = (
  props: UseGetCommunityStaffAplicationListProps
): [
  CommunityStaffApplication[],
  React.Dispatch<React.SetStateAction<CommunityStaffApplication[]>>,
  boolean
] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [communityStaffApplicationList, setCommunityStaffApplicationList] =
    React.useState<CommunityStaffApplication[]>([]);

  React.useEffect(() => {
    request("GET", `/community/${communityIdx}/staff/application`, null, false);
  }, [communityIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityStaffApplicationList(
        serverState.access_list as CommunityStaffApplication[]
      );
      console.log(
        serverState.access_list as CommunityStaffApplication[],
        "staff application list"
      );
    }
  }, [loading, serverState]);

  return [
    communityStaffApplicationList,
    setCommunityStaffApplicationList,
    loading,
  ];
};

export default useGetCommunityStaffApplicationList;

import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { mockCommunityInfo } from "../../4_Shared/mock/communityInfo";

const useGetCommunityInfo = (
  props: UseGetCommunityInfoProps
): [Community, boolean] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [communityInfo, setCommunityInfo] =
    React.useState<Community>(mockCommunityInfo);

  React.useEffect(() => {
    request("GET", `/community/${communityIdx}`, null, false);
  }, [communityIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      if (serverState?.community && Array.isArray(serverState.community)) {
        setCommunityInfo(serverState.community[0] as Community);
      } else{
        setCommunityInfo(serverState.community as Community);
      }
    }
  }, [loading, serverState]);

  return [communityInfo, loading];
};

export default useGetCommunityInfo;

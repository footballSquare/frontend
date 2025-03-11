import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockCommunityInfo } from "../../4_Shared/mock/communityInfo";
import { Community } from "./types/response";
import { useGetCommunityInfoProps } from "./types/request";
const useGetCommunityInfo = (
  props: useGetCommunityInfoProps
): [Community, boolean] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetch();
  const [communityInfo, setCommunityInfo] =
    React.useState<Community>(mockCommunityInfo);

  React.useEffect(() => {
    request(mockCommunityInfo);
  }, [communityIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityInfo(serverState.community as Community);
    }
  }, [loading, serverState]);

  return [communityInfo, loading];
};

export default useGetCommunityInfo;

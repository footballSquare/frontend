import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockCommunityInfo } from "../../4_Shared/mock/communityInfo";
import { CommunityInfo } from "./type";
const useGetCommunityInfo = (communutyIdx: number) => {
  const [serverState, request, loading] = useFetch();
  const [communityInfo, setCommunityInfo] = React.useState<CommunityInfo>();

  React.useEffect(() => {
    request(mockCommunityInfo);
  }, [communutyIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityInfo(serverState.community as CommunityInfo);
    }
  }, [loading, serverState]);

  return [communityInfo, loading];
};

export default useGetCommunityInfo;

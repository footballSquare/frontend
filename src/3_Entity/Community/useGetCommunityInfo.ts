import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetCommunityInfo = (
  props: UseGetCommunityInfoProps
): [Community, boolean, React.Dispatch<React.SetStateAction<Community>>] => {
  const { communityIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [communityInfo, setCommunityInfo] = React.useState<Community>(
    {} as Community
  );

  React.useEffect(() => {
    request("GET", `/community/${communityIdx}`, null, false);
  }, [communityIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setCommunityInfo(serverState.community as Community);
    }
  }, [loading, serverState]);

  return [communityInfo, loading, setCommunityInfo];
};

export default useGetCommunityInfo;

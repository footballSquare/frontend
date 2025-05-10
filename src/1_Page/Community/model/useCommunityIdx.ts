import React from "react";
import useCurrentCommunityInfo from "../../../4_Shared/zustand/useCurrentCommunityInfoStore";

const useCommunityIdx = (props: UseCommunityIdxProps): [number] => {
  const { currentCommunityIdx } = props;
  const { communityIdx, setCommunityIdx } = useCurrentCommunityInfo();

  React.useEffect(() => {
    if (currentCommunityIdx !== -1) {
      setCommunityIdx(currentCommunityIdx);
    }
  }, [currentCommunityIdx, setCommunityIdx]);

  return [communityIdx];
};

export default useCommunityIdx;

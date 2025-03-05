import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockMatchDetail } from "../../4_Shared/mock//matchDetail";
import { MatchDetail } from "./type";
import useMatchModalStore from "../../4_Shared/zustand/useMatchModal";

const useGetMatchDetail = (
  matchIdx: number
): [
  MatchDetail,
  React.Dispatch<React.SetStateAction<MatchDetail>>,
  boolean
] => {
  const [serverState, request, loading] = useFetch();
  const [matchDetail, setMatchDetail] =
    React.useState<MatchDetail>(mockMatchDetail);
  const { setIsMatchEnd } = useMatchModalStore();

  React.useEffect(() => {
    request(mockMatchDetail);
  }, [matchIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchDetail(serverState as MatchDetail);
      setIsMatchEnd((serverState as MatchDetail).match.common_status_idx === 2);
    }
  }, [loading, serverState]);

  return [matchDetail, setMatchDetail, loading];
};

export default useGetMatchDetail;

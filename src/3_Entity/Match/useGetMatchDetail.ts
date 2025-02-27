import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockMatchDetail } from "../../4_Shared/mock//matchDetail";
import { MatchDetail } from "./type";

const useGetMatchDetail = (matchIdx: number): [MatchDetail, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [matchDetail, setMatchDetail] =
    React.useState<MatchDetail>(mockMatchDetail);

  React.useEffect(() => {
    request(mockMatchDetail);
  }, [matchIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchDetail(serverState as MatchDetail);
    }
  }, [loading, serverState]);

  return [matchDetail, loading];
};

export default useGetMatchDetail;

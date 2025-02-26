import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockMatchDetail } from "../../4_Shared/mock//matchDetail";
import { MatchDetail } from "./type";

const useGetOpenMatchDetail = (): [MatchDetail, boolean, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [openMatchList, setOpenMatchList] = React.useState<MatchDetail>(mockMatchDetail);

  React.useEffect(() => {
    request(mockMatchDetail);
  }, []);

  React.useEffect(() => {
    if (!loading && serverState && "match" in serverState) {
      setOpenMatchList((prev) => [
        ...prev,
        ...(serverState as { match: MatchInfo[] }).match,
      ]);
    }
  }, [loading, serverState]);

  return [openMatchList, hasMoreContent, loading];
};

export default useGetOpenMatchDetail;

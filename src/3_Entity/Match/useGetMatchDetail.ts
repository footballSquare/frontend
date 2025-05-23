import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetMatchDetail = (
  props: useGetMatchDetailProps
): [
  MatchDetail,
  React.Dispatch<React.SetStateAction<MatchDetail>>,
  boolean
] => {
  const { matchIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [matchDetail, setMatchDetail] = React.useState<MatchDetail>(
    {} as MatchDetail
  );

  React.useEffect(() => {
    request("GET", `/match/${matchIdx}`, null, false);
  }, [matchIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchDetail(serverState.match as MatchDetail);
    }
  }, [loading, serverState]);

  return [matchDetail, setMatchDetail, loading];
};

export default useGetMatchDetail;

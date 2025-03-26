import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";
import { mockMatchDetail } from "../../4_Shared/mock//matchDetail";
import useMatchModalStore from "../../4_Shared/zustand/useMatchModal";

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
    mockMatchDetail.match
  );
  const { setIsMatchEnd } = useMatchModalStore();

  React.useEffect(() => {
    request("GET", `/match/${matchIdx}`, null);
  }, [matchIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchDetail(serverState.match as MatchDetail);
      setIsMatchEnd((serverState.match as MatchDetail).common_status_idx === 2);
    }
  }, [loading, serverState]);

  return [matchDetail, setMatchDetail, loading];
};

export default useGetMatchDetail;

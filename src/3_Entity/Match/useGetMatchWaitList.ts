import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { MatchWaitList } from "./types/response";
import { mockMatchWaitList } from "../../4_Shared/mock/matchWaitList";

const useGetMatchWaitlist = (
  matchIdx: number
): [
  MatchWaitList,
  React.Dispatch<React.SetStateAction<MatchWaitList>>,
  boolean
] => {
  const [serverState, request, loading] = useFetch();
  const [matchWaitList, setMatchWaitList] =
    React.useState<MatchWaitList>(mockMatchWaitList);

  React.useEffect(() => {
    request(mockMatchWaitList);
  }, [matchIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchWaitList(serverState as MatchWaitList);
    }
  }, [loading, serverState]);

  return [matchWaitList, setMatchWaitList, loading];
};

export default useGetMatchWaitlist;

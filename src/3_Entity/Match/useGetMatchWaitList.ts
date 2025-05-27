import React from "react";
import { useFetchData } from "../../4_Shared/util/apiUtil";

const useGetMatchWaitlist = (
  props: uesGetMatchWaitListProps
): [
  MatchWaitList,
  React.Dispatch<React.SetStateAction<MatchWaitList>>,
  boolean
] => {
  const { matchIdx } = props;
  const [serverState, request, loading] = useFetchData();
  const [matchWaitList, setMatchWaitList] =
    React.useState<MatchWaitList>({} as MatchWaitList);

  React.useEffect(() => {
    request("GET", `/match/${matchIdx}/waitlist`, null, false);
  }, [matchIdx, request]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchWaitList(serverState as MatchWaitList);
    }
  }, [loading, serverState]);

  return [matchWaitList, setMatchWaitList, loading];
};

export default useGetMatchWaitlist;

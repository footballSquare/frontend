import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { mockMatchWaitList } from "../../4_Shared/mock/matchWaitList";

const useGetMatchWaitlist = (
  props: uesGetMatchWaitListProps
): [
  MatchWaitList,
  React.Dispatch<React.SetStateAction<MatchWaitList>>,
  boolean
] => {
  const { matchIdx } = props;
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

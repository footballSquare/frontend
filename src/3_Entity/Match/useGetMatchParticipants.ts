import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { MatchPatricipants } from "./type";
import { mockMatchParticipants } from "../../4_Shared/mock/matchPatricipants";

const useGetMatchParticipants = (matchIdx: number): [MatchPatricipants, boolean] => {
  const [serverState, request, loading] = useFetch();
  const [matchPaticipants, setMatchPaticipants] =
    React.useState<MatchPatricipants>(mockMatchParticipants);

  React.useEffect(() => {
    request(mockMatchParticipants);
  }, [matchIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchPaticipants(serverState as MatchPatricipants);
    }
  }, [loading, serverState]);

  return [matchPaticipants, loading];
};

export default useGetMatchParticipants;

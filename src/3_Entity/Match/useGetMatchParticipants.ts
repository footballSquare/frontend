import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { MatchParticipants } from "./type";
import { mockMatchParticipants } from "../../4_Shared/mock/matchParticipants";

const useGetMatchParticipants = (
  matchIdx: number
): [
  MatchParticipants,
  React.Dispatch<React.SetStateAction<MatchParticipants>>,
  boolean
] => {
  const [serverState, request, loading] = useFetch();
  const [matchPaticipants, setMatchPaticipants] =
    React.useState<MatchParticipants>(mockMatchParticipants);

  React.useEffect(() => {
    request(mockMatchParticipants);
  }, [matchIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchPaticipants(serverState as MatchParticipants);
    }
  }, [loading, serverState]);

  return [matchPaticipants, setMatchPaticipants, loading];
};

export default useGetMatchParticipants;

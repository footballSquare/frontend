import React from "react";
import { useFetch } from "../../4_Shared/util/apiUtil";
import { MatchParticipant } from "./types/response";
import { mockMatchParticipants } from "../../4_Shared/mock/matchParticipants";

const useGetMatchParticipants = (
  matchIdx: number
): [
  MatchParticipant[],
  React.Dispatch<React.SetStateAction<MatchParticipant[]>>,
  boolean
] => {
  const [serverState, request, loading] = useFetch();
  const [matchPaticipants, setMatchPaticipants] = React.useState<
    MatchParticipant[]
  >(mockMatchParticipants.match_participant);

  React.useEffect(() => {
    request(mockMatchParticipants);
  }, [matchIdx]);

  React.useEffect(() => {
    if (!loading && serverState) {
      setMatchPaticipants(
        (serverState as { match_participant: MatchParticipant[] })
          .match_participant
      );
    }
  }, [loading, serverState]);

  return [matchPaticipants, setMatchPaticipants, loading];
};

export default useGetMatchParticipants;
